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
  var playerMoveCallback = null;

  ws.on('textMessage', onTextMessage);

  mainLoop();

  function mainLoop() {
    printGameState(game);
    
    var player = game.getCurrentPlayer();
    var moveList = game.enumerateMoves();

    printPossibleMoves(moveList);

    player.ai.chooseMove(dominionGame.dominion, game, moveList, onMoveChosen);

    function onMoveChosen(er, move) {
      if (er) throw er;
      console.error(dominionGame.playerName(player) + ' chooses: ' + dominionGame.moveToString(move));

      game.performMove(move);
      setImmediate(function(){
        mainLoop(game);
      });
    }
  }

  function sendText(name, args) {
    ws.sendText(JSON.stringify({
      name: name,
      args: args,
    }));
  }

  function chooseMove(dominion, state, moveList, callback) {
    sendState();
    playerMoveCallback = callback;
  }

  function sendState() {
    var allCards = {};
    var moveList = game.enumerateMoves();

    printGameState(game);
    printPossibleMoves(moveList);
    
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
    sendText('inPlayCards', game.players[0].inPlay);
    sendText('gameLoaded');
  }

  function onTextMessage(text) {
    var msg;
    
    try {
      msg = JSON.parse(text);
    } catch(er) {
      console.error("received invalid JSON from web socket: ", er.message);
      return;
    }

    if (msg.name === 'move') {
      playerMoveCallback(null, msg.args);
    }
  };
});

app.use('/', serveStatic(path.join(__dirname, 'public/'))); // magic?

function printPossibleMoves(moveList) {
  console.log("Possible moves:");
  for (var i = 0; i < moveList.length; i += 1) {
    var move = moveList[i];
    console.log("(" + (i + 1) + ") " + dominionGame.moveToString(move));
  }
  if (moveList.length === 0) {
    console.log("(none)");
  }
}

function printGameState(state) {
  console.log("");
  console.log("Round " + (state.roundIndex + 1) + ", turn " + (state.turnIndex + 1));
  var i;
  for (i = 0; i < state.cardList.length; i += 1) {
    var gameCard = state.cardList[i];
    console.log("(" + gameCard.card.cost + ") " + gameCard.count + "_" + gameCard.card.name);
  }
  console.log("Trash: " + deckToString(state.trash, true));
  for (i = 0; i < state.players.length; i += 1) {
    var player = state.players[i];
    var vp = state.calcVictoryPoints(player);
    var cardCount = state.playerCardCount(player);
    console.log(dominionGame.playerName(player) + " (" + vp + " victory points, " + cardCount + " cards):");
    console.log("      revealed: " + deckToString(player.revealedCards, false));
    console.log("       in play: " + deckToString(player.inPlay, false));
    console.log("          deck: " + deckToString(player.deck, true));
    console.log("          hand: " + deckToString(player.hand, true));
    console.log("  discard pile: " + deckToString(player.discardPile, true));
  }
  console.log("Waiting for " + dominionGame.playerName(state.getCurrentPlayer()) + " to " + state.stateIndexToString());
  console.log("Actions: " + state.actionCount +
           "   Buys: " + state.buyCount +
           "   Treasure: " + state.treasureCount);
}

function deckToString(deck, compress) {
  if (deck.length === 0) return "(empty)";
  if (!compress) {
    return deck.map(dominionGame.getCardName).join(" ");
  }
  var counts = {};
  for (var i = 0; i < deck.length; i += 1) {
    var card = deck[i];
    counts[card.name] = (counts[card.name] == null) ? 1 : (counts[card.name] + 1);
  }
  var names = Object.keys(counts);
  names.sort(compare);
  for (i = 0; i < names.length; i += 1) {
    var count = counts[names[i]];
    if (count > 1) {
      names[i] = counts[names[i]] + "_" + names[i];
    }
  }
  return names.join(" ");
}

function compare(a, b){
  if (a === b) {
    return 0;
  } else if (a < b) {
    return -1;
  } else {
    return 1;
  }
}
