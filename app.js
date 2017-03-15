var http = require('http');
var fs = require('fs');
var request = require("request");
var jsdom = require("jsdom");
// var credential = require("./credential/credential");

var host = "http://www.dota2.com/heroes/?l=english";

var callback = function(err, resp, body) {
	var img_sources = jsdom.env(body, function (errors, window) {
		var imgs = window.document.getElementsByClassName('heroHoverLarge');
			for (var i = 0; i < imgs.length; i++) {
				var id = imgs[i].getAttribute('id');
				var hero_id = id.substring(id.indexOf("_") + 1);
				console.log(hero_id);

				var src = imgs[i].getAttribute('src');
				if (src ){
					if (src.indexOf("http") == 0 || src.indexOf("https") == 0){
						request.get(src).pipe(fs.createWriteStream('downloaded/' + hero_id + ".jpg"));
					}
					
				} 
			}
	});
}

// var proxyUrl = "http://" + credential.username + ":" + credential.password + "@" + credential.proxy + ":" + credential.port + "/";
// var proxiedRequest = request.defaults({'proxy': proxyUrl});
// proxiedRequest.get(host, callback);

request.get(host, callback);

