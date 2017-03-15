var http = require('http');
var fs = require('fs');
var request = require("request");
var jsdom = require("jsdom");
var credential = require("./credential/credential");

var proxyUrl = "http://" + credential.username + ":" + credential.password + "@" + credential.proxy + ":" + credential.port + "/";
var proxiedRequest = request.defaults({'proxy': proxyUrl});

var host = "https://www.google.com.vn/search?q=cat&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiS4vW52NfSAhVEv5QKHeYVBN8Q_AUICCgB&biw=1858&bih=1014";
proxiedRequest.get(host, function(err, resp, body){
	
	var img_sources = jsdom.env(
	  body,
	  function (errors, window) {
		var imgs = window.document.getElementsByTagName('img');
		for (var i = 0; i < imgs.length; i++) {
		  var src = imgs[i].getAttribute('src');
		  if (src ){
			  if (src.indexOf("http") == 0 || src.indexOf("https") == 0){
				  proxiedRequest.get(src).pipe(fs.createWriteStream('downloaded/' + i + ".jpg"));
			  }
			  
		  } 
		}
	  }
	);
});

