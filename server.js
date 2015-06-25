var express = require('express');
var http = require('http');
var serveStatic = require('serve-static');
var path = require('path');
var yawl = require('yawl');

var app = express();

var server = http.createServer(app);

server.listen(25660, '0.0.0.0', function() {
  console.error("Running on port 25660.");
});

var wss = yawl.createServer({
  server: server,
  allowTextMessages: true,
  origin: null,
});

wss.on('error', function(er) {
  console.error('Web socket is alllll fucked up: ', er.stack);
});

wss.on('connection', function(ws) {
  console.log('someone is joining the party: ');

  ws.sendText(JSON.stringify({
    name: 'derp',
    args: Date.now(),
  }));
});

app.use('/', serveStatic(path.join(__dirname, 'public/'))); // magic?

