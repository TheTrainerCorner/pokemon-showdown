'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Absolute Zero', () => {
	afterEach(() => {
		battle.destroy();
	});

	it("should set weather and add auroraveil", () => {
		battle = common.createBattle([[
			{species: 'Regice', ability: 'absolutezero', moves: ['ancientpower']},
		], [
			{species: 'Shedinja', moves: ['sleeptalk']}, {species: 'Magikarp', moves: ['splash']}
		]]);

		battle.makeChoices('move ancientpower', 'move sleeptalk');
		assert.statStage(battle.p1.active[0], 'spa', 1);
		assert(battle.p1.active[0].effectiveWeather() === "snow");
		assert(battle.p1.sideConditions.auroraveil);	
	})
});