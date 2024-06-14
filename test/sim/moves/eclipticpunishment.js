'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Ecliptic Punishment', () => {
	beforeEach(() => {
		battle = common.createBattle();
	})
	afterEach(() => {
		battle.destroy();
	});

	it("should change types and move category based on Dawn of Lunacy", () => {
		battle.setPlayer('p1', {team: [
			{species: 'Cerinyx', ability: 'dawnoflunacy', moves: ['eclipticpunishment']}
		]});
		battle.setPlayer('p2', {team: [
			{species: 'Pangoro', moves: ['knockoff']}, // Dark Fighting
			{species: 'Houndoom', moves: ['flamethrower']}, // Dark
		]});

		battle.makeChoices('move eclipticpunishment', 'move knockoff');
		assert.false.fullHP(battle.p2.active[0]); // Move should be a dark type move, so it should do damage
		battle.makeChoices('move eclipticpunishment', 'switch 2');
		assert.fullHP(battle.p2.active[0]); // Move should be Psychic, which sould do no damage to houndoom.
	});
})