/**
 * @group unit
 */

const { faker } = require('@faker-js/faker'); // Vi använder faker för att skapa testdata.
const gameHandler = require('../domain/game.js'); // Objekt under test

/**
 * 
 */
describe.skip('given a gameHandler', () => {
  describe('when using ', () => {
    it('should have expected properties', () => {
      expect(gameHandler).toHaveProperty('play');
      expect(gameHandler).toHaveProperty('addPlayer');
      expect(gameHandler).toHaveProperty('createGame');
    });
  });
});

/**
 * 
 */
describe.skip('given a gameHandler', () => {
  describe('when using ', () => {
    it('should have expected properties', () => {
      expect(gameHandler).toHaveProperty('findGameById');
      expect(gameHandler).toHaveProperty('saveGame');
      expect(gameHandler).toHaveProperty('getGames');
    });
  });
});

/**
 * 
 */
describe.skip('given a gameHandler', () => {
  describe('when creating game', () => {
    it('should have expected properties', () => {
      const expectedNumberOfGames = gameHandler.getGames().length + 1;
      const game = gameHandler.createGame();
      expect(game).toHaveProperty('id');
      expect(game).toHaveProperty('name');
      expect(game).toHaveProperty('round');
      expect(game).toHaveProperty('players');
      expect(Array.isArray(game.players)).toBe(true);
    });
  });
});

/**
 * 
 */
describe.skip('given a gameHandler', () => {
  describe('when creating game', () => {
    it('should add one game', () => {
      const expectedNumberOfGames = gameHandler.getGames().length + 1;
      const game = gameHandler.createGame();
      expect(gameHandler.getGames().length).toBe(expectedNumberOfGames);
    });
  });
});

/**
 * 
 */
describe.skip('given gameHandler', () => {
  describe('when listing games', () => {
    it('then should return array', () => {
      const game = gameHandler.createGame();
      const games = gameHandler.getGames();
      expect.arrayContaining(games);
    });
  });
});

describe.skip('given gameHandler', () => {
  describe('when finding game', () => {
    const game = gameHandler.createGame();
    it('then should find game by id', () => {
      const foundGame = gameHandler.findGameById(game.id);
      expect(foundGame.id).toBe(game.id);
    });
  });
});

describe.skip('given gameHandler', () => {
  describe('when adding game with name', () => {
    it('then should have correct name', () => {
      const expectedName = faker.name.lastName();  
      const game = gameHandler.createGame(expectedName);
      expect(game.name).toBe(expectedName);
      expect(game.round).toBe(0);
    });
  });
});

describe.skip('given gameHandler', () => {
  describe('when add adding player with name by game id', () => {
    it('then should add player with correct name', () => {
      const game = gameHandler.createGame();
      gameHandler.addPlayerToGameById(game.id, faker.name.lastName());
    });
  });
});


describe.skip('given gameHandler with active game', () => {  
  let game = gameHandler.createGame();
  describe('when playing turn', () => {
    it('then should add stone to game', () => {
      game = gameHandler.play(game);
      expect(game.round).toBe(1);
    });
  });
});