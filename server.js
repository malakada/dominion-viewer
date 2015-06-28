var express = require('express');
var http = require('http');
var serveStatic = require('serve-static');
var path = require('path');
var yawl = require('yawl');
var dominionGame = require('dominion-game');

require('node-jsx').install({ extension: '.jsx' });

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
  console.error('Error with the websocket: ', er.stack);
});

wss.on('connection', function(ws) {
  var players = [{chooseMove: chooseMove}, dominionGame.ais.naive];
  var seed = Date.now();
  var game = new dominionGame.DominionGame(players, seed);  
  
  console.log('Started a new game with seed ', seed);
  console.log('game: ', game.players[0].hand);
  function chooseMove(dominion, state, moveList, callback) {
    var myHand = state.players[0].hand;
    console.log('my hand: ', myHand);
  }
});

app.use('/', serveStatic(path.join(__dirname, 'public/'))); // magic?

