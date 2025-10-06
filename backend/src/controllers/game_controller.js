const gameHandler = require('../domain/game.js');
const playerHandler = require('../domain/player.js');
const { logger } = require('../config');

exports.getGames = (req, res) => {
    const games = gameHandler.getGames();
    const ids = games.map(({ id }) => id);
    res.status(200).json(ids);
};

exports.findGameById = (req, res) => {
    const g = gameHandler.findGameById(req.params.id);
    if (!g) return res.status(404).json({ error: 'Not found' });
    res.status(200).json(g);
};

exports.createGame = (req, res) => {
    const game = gameHandler.createGame();
    res.status(201).json(game);
};

exports.joinGame = (req, res) => {
    const { game: gameId, player } = req.params;
    const g = gameHandler.joinGame?.(gameId, player);
    if (!g) return res.status(404).json({ error: 'Not found' });
    logger.info(g);
    res.status(200).json(g);
};

exports.play = (req, res) => {
    const { game, player, col, row } = req.params;
    const result = gameHandler.play(game, player, Number(col), Number(row));
    if (result?.error) return res.status(409).json(result);
    res.status(200).json(result);
};

exports.play = (req, res) => {
    const { game, player, col, row } = req.params;
    const result = gameHandler.play(game, player, Number(col), Number(row));
    if (result?.error) return res.status(409).json(result);
    res.status(200).json(result);
};
