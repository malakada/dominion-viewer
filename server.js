var express = require('express');
var http = require('http');
var serveStatic = require('serve-static');
var path = require('path');
var yawl = require('yawl');
var dominionGame = require('dominion-game');

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

  sendState();
  sendText('gameLoaded');

  function sendText(name, args) {
    ws.sendText(JSON.stringify({
      name: name,
      args: args,
    }));
  }

  function chooseMove(dominion, state, moveList, callback) {
    var myHand = state.players[0].hand;
  }

  function sendState() {
    var allCards = {};
    var moveList = game.enumerateMoves();
    
    for (var card in game.cardTable) {
      var formattedCard = {
        supply: game.cardTable[card].card.supply,
        cost: game.cardTable[card].card.cost,
        type: game.cardTable[card].card.type,
        includeCondition: game.cardTable[card].card.includeCondition,
        count: game.cardTable[card].count,
      };
      allCards[card] = formattedCard;
    }

    sendText('allCards', allCards);
    sendText('playerHand', game.players[0].hand);
    sendText('possibleMoves', moveList);
  }

  ws.on('textMessage', function(text) {
    var msg;
    
    try {
      msg = JSON.parse(text);
    } catch(er) {
      console.error("received invalid JSON from web socket: ", er.message);
      return;
    }

    if (msg.name === 'move') {
      game.performMove(msg.args);
      sendState();
    }
  });
});

app.use('/', serveStatic(path.join(__dirname, 'public/'))); // magic?
