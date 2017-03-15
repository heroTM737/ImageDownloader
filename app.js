var http = require('http');
var fs = require('fs');
var request = require("request");
var jsdom = require("jsdom");

var proxyUrl = "http://tiennx1:123!%40%23qwe@fsoft-proxy:8080/";
var proxiedRequest = request.defaults({'proxy': proxyUrl});

var imgUrl = "http://znews-photo.d.za.zdn.vn/w1024/Uploaded/rik_rdcvcvwt_wc/2016_04_05/Lamborghini_1.jpg";
proxiedRequest.get(imgUrl).pipe(fs.createWriteStream('doodle.png'));

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

