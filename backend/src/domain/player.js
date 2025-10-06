const { generateUsername } = require("unique-username-generator");
const uuid = require('uuid');
const ERR_MSGS = require('../util/error_messages.js');
const util = require('../util/util.js');

const players = [];
const create = (name) => {
    const player = {
        id: uuid.v4(),
        name: (!name)?generateUsername():name
    };
    players.push(player);
    return player;
}

const update = () => {
    
}

const remove = () => {
    
}

const findById = (id) => {
    if(!id) throw ERR_MSGS.ERR_INVALID_PLAYER_ID;
    const player = players.find((user) => user.id === id);
    return player;
}

const getAll = () => {
    return players;
}

module.exports = {create, update, remove, findById, getAll}