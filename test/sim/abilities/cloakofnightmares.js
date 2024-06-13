'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe(`Cloak Of Nightmares`, () => {
	afterEach(() => {
		battle.destroy();
	});

	it(`should lower the target's attack by 1 stage.`, () => {
		battle = common.createBattle([[
			{species: 'akumu', ability: 'cloakofnightmares', moves: ['scratch']}
		], [
			{species: 'lopunny', ability: 'limber', moves: ['knockoff']},
		]]);
		const stats = ['atk'];
		for (const [index, stat] of stats.entries()) {
			battle.makeChoices('move scratch', 'move knockoff');
			assert.statStage(battle.p2.active[0], stat, -1);
		}
	})
});