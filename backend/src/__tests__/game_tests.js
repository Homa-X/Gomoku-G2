/**
 * @group unit
 */

const { faker } = require('@faker-js/faker'); // Vi använder faker för att skapa testdata.
const gameHandler = require('../domain/game.js'); // Objekt under test
const isUuid = require('uuid-validate');

const ID_EMPTY_GAME = "015cdc04-4d22-46f7-8d8e-f1879bb9bf1b";
const ID_FULL_GAME = "88aaf28d-7fef-4028-9e94-7fdbbbd662a0";
const ID_BLACK_GAME = "ebdf150a-4740-42ea-a5a7-dfce2f6f3725";
const ID_WHITE_GAME = "6d3e9d43-9d19-4fb5-a684-b8514f0e4810";

/**
 * Tests determined from state diagram.
 */
describe('given a gameHandler', () => {
  describe('when creating ', () => {
    it('should have expected properties', () => {
      expect(gameHandler).toHaveProperty('play');
      expect(gameHandler).toHaveProperty('addPlayer');
      expect(gameHandler).toHaveProperty('createGame');
    });
  });
});

/**
 * Tests determined from sequence diagram.
 */
describe('given a gameHandler', () => {
  describe('when creating ', () => {
    it('should have expected properties', () => {
      expect(gameHandler).toHaveProperty('findGameById');
      expect(gameHandler).toHaveProperty('saveGame');
      expect(gameHandler).toHaveProperty('getGames');
    });
  });
});

/**
 * Tests determined from mockup.
 */
describe('given a gameHandler', () => {
  describe('when creating game', () => {
    it('should have expected properties', () => {
      const game = gameHandler.createGame();
      expect(game).toHaveProperty('id');
      expect(game).toHaveProperty('name');
      expect(game).toHaveProperty('round');
      expect(game).toHaveProperty('board');
      expect(game).toHaveProperty('player1');
      expect(game).toHaveProperty('player2');
      expect(game.board).toHaveProperty('minInRow');
      expect(game.board).toHaveProperty('cols');
      expect(game.board).toHaveProperty('rows');
      expect(game.board).toHaveProperty('tiles');
      expect(Array.isArray(game.board.tiles)).toBe(true);
      for( const row of game.board.tiles){
        expect(Array.isArray(row)).toBe(true);
        for( const tile of row){
          expect(tile).toBe(0);
        }
      }
    });
  });
});

/**
 * Test storage of games.
 */
describe('given a gameHandler', () => {
  describe('when creating game', () => {
    it('then should add one game', () => {
      const expectedNumberOfGames = gameHandler.getGames().length + 1;
      const game = gameHandler.createGame();
      expect(gameHandler.getGames().length).toBe(expectedNumberOfGames);
      expect(game.round).toBe(0);
      expect(isUuid(game.id, 4)).toBe(true);
    });
  });

  describe('when creating a game with name', () => {
    it('then should have correct name', () => {
      const expectedName = faker.name.lastName();
      const game = gameHandler.createGame(expectedName);
      expect(game.name).toBe(expectedName);
      expect(game.round).toBe(0);
    });
  });

});

/**
 * Test listing games!
 */
describe('given gameHandler', () => {
  describe('when listing games', () => {
    it('then should return array', () => {
      const game = gameHandler.createGame();
      const games = gameHandler.getGames();
      expect.arrayContaining(games);
    });
  });
});

/**
 * Test retrieving a game by id.
 */
describe('given gameHandler', () => {
  describe('when finding game', () => {
    const game = gameHandler.createGame();
    it('then should find game by id', () => {
      const foundGame = gameHandler.findGameById(game.id);
      expect(foundGame.id).toBe(game.id);
    });
  });
});

/**
 * Test adding a player to a game.
 */
describe('given gameHandler and a game', () => {
  let game = gameHandler.createGame();

  describe('when adding no players', () => {
    it('then should have game with no players', () => {
      expect(game.player1).toBe(null);
      expect(game.player2).toBe(null);
    });
  });

  describe('when adding player with no name', () => {
    it('then should have correct attributes', () => {
      game = gameHandler.addPlayer(game.id);
      expect(game.player1).not.toBe(null);
      expect(game.player1).toHaveProperty("id");
      expect(game.player1).toHaveProperty("name");
      expect(isUuid(game.player1.id, 4)).toBe(true);
      expect(game.player1.name).not.toBe(null);
    });
  });

  describe('when adding another player with no name', () => {
    it('then should have correct attributes', () => {
      game = gameHandler.addPlayer(game.id);
      expect(game.player2).not.toBe(null);
      expect(game.player2.name).not.toBe(null);
      expect(game.player1.id).not.toBe(game.player2.id);
    });
  });

});

/**
 * Testing to play game.
 */
describe.skip('given gameHandler with active game', () => {
  let game = gameHandler.createGame();

  describe('when adding player turn', () => {
    it('then should add stone to game', () => {
      game = gameHandler.play(game);
      expect(game.round).toBe(0);
    });
  });
});