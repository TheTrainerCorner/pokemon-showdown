'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Granite Storm', () => {
	beforeEach(() => {
		battle = common.createBattle([[
			{species: 'Regirock', ability: 'granitestorm', moves: ['protect', 'ancientpower']},
		], [
			{species: 'Lopunny', ability: 'limber', moves: ['icepunch']},
		]]);
	});
	afterEach(() => {
		battle.destroy();
	});

	it('should set weather', () => {
		battle.makeChoices('move ancientpower', 'move icepunch');
		assert(battle.p1.active[0].effectiveWeather() === 'sandstorm');
	});

	it('should lower atk of the attacker', () => {
		battle.makeChoices('move ancientpower', 'move icepunch');
		assert.statStage(battle.p2.active[0], 'atk', -1);
	});

	it('should set stealth rock on the opposing side', () => {
		battle.makeChoices('move ancientpower', 'move icepunch');
		assert(battle.p2.sideConditions.stealthrock);
	});
});