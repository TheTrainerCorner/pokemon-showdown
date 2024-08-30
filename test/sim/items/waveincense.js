'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Wave Incense', () => {
	beforeEach(() => {
		battle = common.createBattle();
		battle.setPlayer('p2', { team: [
			{ species: 'Raichu', moves: ['sleeptalk', 'thunderbolt']},
		]});
	});
	afterEach(() => {
		battle.destroy();
	})

	it("it should proc whirlpool and use wave incense", () => {
		battle.setPlayer('p1', { team: [
			{ species: 'Cinccino', item: 'waveincense', moves: ['sleeptalk']},
		]});

		battle.makeChoices('move sleeptalk', 'move thunderbolt');

		assert.false(battle.p1.active[0].hasItem('waveincense'));
		assert(battle.p2.active[0].volatiles['partiallytrapped']);
	})
});