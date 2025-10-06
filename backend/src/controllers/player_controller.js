// controllers/player_controller.js
const playerHandler = require('../domain/player');
const ERR_MSGS = require('../util/error_messages');

exports.createPlayer = (req, res) => {
    const user = playerHandler.create();
    res.status(201).json(user); // Created
};

exports.listPlayers = (req, res) => {
    const players = playerHandler.getAll();
    res.status(200).json(players);
};

exports.findPlayerById = (req, res) => {
    try {
        const player = playerHandler.findById(req.params.id);
        res.status(200).json(player);
    } catch (err) {
        if (err === ERR_MSGS.ERR_INVALID_PLAYER_ID) {
            return res.status(400).json({ error: 'Invalid player id' }); // Bad Request
        }
        if (err === ERR_MSGS.ERR_PLAYER_NOT_FOUND) {
            return res.status(404).json({ error: 'Player not found' }); // Not Found
        }
        res.status(500).json({ error: 'Internal server error' }); // Fallback
    }
};
