var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var mime = require('mime');
var wss = require('./websockets-server');

var handleError = function(err, res) {
    res.writeHead(404);
    res.end();
}

var server = http.createServer(function(req, res) {
    console.log('Resonding to a request.');

    var filePath = extract(req.url);
    var fileType = mime.lookup(filePath);
    fs.readFile(filePath, function(err, data) {
        if (err) {
            handleError(err, res);
            return;
        } else {
            res.setHeader('Content-Type', fileType);
            res.end(data);
        }
    });
});
server.listen(3000);
