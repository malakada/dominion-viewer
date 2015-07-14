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
  
  var allCards = {};
  
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

  var moveList = game.enumerateMoves();

  sendText('allCards', allCards);
  sendText('playerHand', game.players[0].hand);
  sendText('possibleMoves', moveList);
  sendText('gameLoaded');

  console.log('move list: ', moveList);

  function chooseMove(dominion, state, moveList, callback) {
    var myHand = state.players[0].hand;
  }

  function sendText(name, args) {
    ws.sendText(JSON.stringify({
      name: name,
      args: args,
    }));
  }

  ws.on('textMessage', function(data) {
    var msg;
    try {
      msg = JSON.parse(data);
    } catch(er) {
      console.error("received invalid JSON  from web socket: ", er.message);
      return;
    }
    // do things with this, like returning new state :P
  });
});

app.use('/', serveStatic(path.join(__dirname, 'public/'))); // magic?

