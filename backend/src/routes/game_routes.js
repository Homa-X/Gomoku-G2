// routes/game_routes.js
const router = require('express').Router();
const gameController = require('../controllers/game_controller.js');
const userController = require('../controllers/player_controller.js');

/**
 * @openapi
 * tags:
 *   - name: Games
 *   - name: Players
 */

/**
 * @openapi
 * /api/gomoku/games:
 *   get:
 *     tags: [Games]
 *     summary: List games
 *     responses:
 *       200:
 *         description: Array of UUIDs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 format: uuid
 */
router.get('/games', gameController.getGames);

/**
 * @openapi
 * /api/gomoku/games/add:
 *   get:
 *     tags: [Games]
 *     summary: Create a new game (legacy GET)
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Game' }
 */
router.get('/games/add', gameController.createGame);

/**
 * @openapi
 * /api/gomoku/games/{id}:
 *   get:
 *     tags: [Games]
 *     summary: Get game by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Game found
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Game' }
 *       404:
 *         description: Not found
 */
router.get('/games/:id', gameController.findGameById);

/**
 * @openapi
 * /api/gomoku/players:
 *   get:
 *     tags: [Players]
 *     summary: List players
 *     responses:
 *       200:
 *         description: Array of players
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/players', userController.listPlayers);

/**
 * @openapi
 * /api/gomoku/player/join/{game}/{player}:
 *   get:
 *     tags: [Players]
 *     summary: Join a game (legacy GET)
 *     parameters:
 *       - in: path
 *         name: game
 *         required: true
 *         schema: { type: string, format: uuid }
 *       - in: path
 *         name: player
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Joined
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Game' }
 *       404:
 *         description: Not found
 */
router.get('/player/join/:game/:player', gameController.joinGame);

/**
 * @openapi
 * /api/gomoku/player/play/{game}/{player}/{col}/{row}:
 *   get:
 *     tags: [Players]
 *     summary: Place a piece
 *     parameters:
 *       - in: path
 *         name: game
 *         required: true
 *         schema: { type: string, format: uuid }
 *       - in: path
 *         name: player
 *         required: true
 *         schema: { type: string, format: uuid }
 *       - in: path
 *         name: col
 *         required: true
 *         schema: { type: integer, minimum: 0 }
 *       - in: path
 *         name: row
 *         required: true
 *         schema: { type: integer, minimum: 0 }
 *     responses:
 *       200:
 *         description: Move accepted
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Game' }
 *       409:
 *         description: Illegal move / not your turn / etc.
 */
router.get('/player/play/:game/:player/:col/:row', gameController.play);

/**
 * @openapi
 * /api/gomoku/player/create:
 *   get:
 *     tags: [Players]
 *     summary: Create player (legacy GET)
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/User' }
 */
router.get('/player/create', userController.createPlayer);

module.exports = router;

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required: [id, name]
 *       properties:
 *         id:   { type: string, format: uuid }
 *         name: { type: string }
 *     Board:
 *       type: object
 *       properties:
 *         minInRow: { type: integer }
 *         cols:     { type: integer, default: 16 }
 *         rows:     { type: integer, default: 16 }
 *         tiles:
 *           type: array
 *           minItems: 5
 *           maxItems: 16
 *           items:
 *             type: array
 *             minItems: 5
 *             maxItems: 16
 *             items: { type: integer }
 *     Game:
 *       type: object
 *       required: [id, name, round, player, state, board]
 *       properties:
 *         id:     { type: string, format: uuid }
 *         name:   { type: string }
 *         round:  { type: integer }
 *         player: { type: integer }
 *         player1:
 *           allOf:
 *             - $ref: '#/components/schemas/User'
 *           nullable: true
 *         player2:
 *           allOf:
 *             - $ref: '#/components/schemas/User'
 *           nullable: true
 *         state:
 *           type: string
 *           enum: [waiting, playing, black, white, tie, cancelled]
 *         board:
 *           $ref: '#/components/schemas/Board'
 */

// find-by-id
/**
 * @openapi
 * /api/gomoku/player/{id}:
 *   get:
 *     tags: [Players]
 *     summary: Get player by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Player found
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/User' }
 *       400:
 *         description: Invalid player id
 *       404:
 *         description: Player not found
 */
router.get('/player/:id', userController.findPlayerById);
