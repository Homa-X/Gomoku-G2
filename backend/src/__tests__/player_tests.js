/**
 * @group unit
 */

const { faker } = require('@faker-js/faker'); // Vi använder faker för att skapa testdata.
const playerHandler = require('../domain/player.js'); // Objekt under test

/**
 * Tests determined from sequence diagram.
 */
describe('given a playerHandler', () => {
    describe('when using ', () => {
      it('should have expected properties', () => {
        expect(playerHandler).toHaveProperty('create');
        expect(playerHandler).toHaveProperty('update');
        expect(playerHandler).toHaveProperty('remove');
        expect(playerHandler).toHaveProperty('findById');
      });
    });
});

/**
 * Test determined from Mockup.
 */
describe('given a playerHandler', () => {
    describe('when creating player without name', () => {
        const player = playerHandler.create();
        it('should have expected properties', () => {
            expect(player).toHaveProperty('id');
            expect(player).toHaveProperty('name');
            expect(player.id).not.toBeUndefined();
            expect(player.name).not.toBeUndefined();
        });
    });

    describe('when creating player with name', () => {
        const aName = faker.name.lastName();
        const player = playerHandler.create(aName);
        it('should have correct name', () => {
            expect(player.name).toBe(aName);
            expect(player.id).not.toBeUndefined();
        });
    });
});


describe('given a playerHandler and player', () => {
    const name = faker.name.lastName();
    const id = playerHandler.create(name).id;
    describe('when finding by id', () => {
        it('should find correct player', () => {
            const player = playerHandler.findById(id);
            expect(player).not.toBeUndefined();
            expect(player).toHaveProperty('id');
            expect(player).toHaveProperty('name');
            expect(player.id).toBe(id);
            expect(player.name).toBe(name);
        });
    });
});

