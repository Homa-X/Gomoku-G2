const { environments, ENV, logger } = require('../config');
const fs = require('fs');
const path = require('path');

const fullGame = JSON.parse(fs.readFileSync(path.join(__dirname, 'full_game.json'), 'utf8'));
const emptyGame = JSON.parse(fs.readFileSync(path.join(__dirname, 'empty_game.json'), 'utf8'));
const whiteGame = JSON.parse(fs.readFileSync(path.join(__dirname, 'white_game.json'), 'utf8'));
const blackGame = JSON.parse(fs.readFileSync(path.join(__dirname, 'black_game.json'), 'utf8'));


if(ENV === environments.DEV || ENV === environments.TEST){
    
}

module.exports = {
    fullGame,
    emptyGame,
    whiteGame,
    blackGame
};
