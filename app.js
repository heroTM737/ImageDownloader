const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

var download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        console.log('');
        console.log('url:', uri);
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

var url = "http://sachvui.com/doc-sach/o-long-vien-tron-bo-au-yao-hsing/tap-1-thay-gioi-tro-gioi-phan-3.html";
request(url, function (error, response, body) {
    if (error) {
        console.log('error:', error); // Print the error if one occurred
        return;
    }

    // console.log(body);

    var $ = cheerio.load(body);
    var allImg = $('img');
    var length = $('img').length;
    for (var i = 0; i < length; i++) {
        var src = allImg[i].attribs.src;
        var nameIndex = src.lastIndexOf('/');
        var name = src.substr(nameIndex + 1);
        // console.log();
        download(src, 'tap1/' + name, () => { });
    }

});