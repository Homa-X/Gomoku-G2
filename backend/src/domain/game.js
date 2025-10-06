//https://en.wikipedia.org/wiki/Go_(game)
const { environments, ENV, logger } = require('../config');
const { emptyGame, fullGame, whiteGame, blackGame } = require('../test_data/loader');

const uuid = require('uuid');
const gomokuHandler = require('./gomoku.js');
const playerHandler = require('./player.js');
const ERR_MSGS = require('../util/error_messages.js');

let numGames = 0;
const COLS = 10;
const ROWS = 10;
const games = [];


const createGame = (name) => {
    if(!name){
        name = "game_" + numGames++;
    }
    const board = gomokuHandler.createBoard()
    const game = {
        id: uuid.v4(),
        name: name,
        round: 0,
        player: 0,
        player1: null,
        player2: null,
        board: board
    };
    games.push(game);
    return game;
}

if(ENV === environments.DEV || ENV === environments.TEST){
    games.push(emptyGame);
    games.push(fullGame);
    games.push(whiteGame);
    games.push(blackGame);
    createGame("ramdom game 1");
    createGame("ramdom game 2");
}

const saveGame = (game) => {
    return game;
}
const getGames = () => {
    return games;
}

const addPlayer = (id, playerName) => {
    const game = findGameById(id);
    if(game.player2) {
        throw ERR_MSGS.ERR_GAME_FULL;
    }
    const player = playerHandler.create(playerName)
    if(game.player1==null){
        game.player1 = player;
    }else{
        game.player2 = player;
    }
    return game;
}

const play = (id, playerId, col, row) => {
    if(!id) throw ERR_MSGS.ERR_GAME_NOT_FOUND;
    const game = findGameById(id);
    if(!game) throw ERR_MSGS.ERR_GAME_NOT_FOUND;
    if(!playerId) throw ERR_MSGS.ERR_PLAYER_NOT_FOUND;

    game.round++;
    game.player = (game.round % 2) + 1;
    game.board.tiles[col][row] = game.player;
    return game;
}

const findGamesByName = (name) => {
    return games.filter( game => game.name === name );
}

const findGameById = (id) => {
    console.log(games);
    if(!id) throw ERR_MSGS.ERR_GAME_NOT_FOUND;
    const game = games.find( game => game.id === id );
    if(!game) {
        console.log("No game found!");
        throw ERR_MSGS.ERR_GAME_NOT_FOUND;
    }
    return game;
}

const joinGame = (gameId, playerId) => {

    if (!gameId) throw ERR_MSGS.ERR_GAME_NOT_FOUND;
    if (!playerId) throw ERR_MSGS.ERR_INVALID_PLAYER_ID;

    const game = findGameById(gameId);
    const player = playerHandler.findById(playerId); // throws if invalid/not found
    // already in game → no-op
    if (game.player1?.id === player.id || game.player2?.id === player.id) return game;

    if (game.player1 == null) {
        game.player1 = player;
    } else if (game.player2 == null) {
        game.player2 = player;
    } else {
        throw ERR_MSGS.ERR_GAME_FULL;
    }

    return game;
};


module.exports = {
    play,
    createGame,
    saveGame,
    getGames,
    findGameById,
    findGamesByName,
    addPlayer,
    joinGame
}