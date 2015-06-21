var express = require('express');
var http = require('http');
var serveStatic = require('serve-static');
var path = require('path');

var app = express();

var server = http.createServer(app);

server.listen(25660, '0.0.0.0', function() {
  console.error("Shit is fucking running on port 25660.");
});

app.use('/', serveStatic(path.join(__dirname, 'public/'))); // magic?

