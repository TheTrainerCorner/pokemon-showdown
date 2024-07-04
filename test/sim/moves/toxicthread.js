'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe("Toxic Thread", () => {
	beforeEach(() => {
		battle = common.createBattle();
		battle.setPlayer('p1', {team: [
			{species: 'Ariados', moves: ['toxicthread']},
		]});
		battle.setPlayer('p2', {team: [
			{species: 'Melmetal', moves: ['sleeptalk']},
		]});
	})
	afterEach(() => {
		battle.destroy();
	})

	it("should poison melmetal", () => {
		battle.makeChoices('move toxicthread', 'move sleeptalk');

		assert(battle.p2.active[0].status === 'psn')
	})
});