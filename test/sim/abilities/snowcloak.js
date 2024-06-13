'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe(`Snow Cloak`, () => {
	afterEach(() => {
		battle.destroy();
	});

	it(`should set aurora veil due to snow`, () => {
		battle = common.createBattle([[
			{species: 'Glaceon', ability: 'snowcloak', moves: ['protect']},
		], [
			{species: 'Abomasnow', ability: 'snowwarning', moves: ['protect']}
		]]);
		assert(battle.p1.active[0].effectiveWeather() === 'snow');
		assert(battle.p1.sideConditions.auroraveil);
	});

	it('should set aurora veil due to chilly recep', () => {
		battle = common.createBattle();
		battle.setPlayer('p1', {team: [
			{species: 'Ninetales-Alola', ability: 'snowcloak', moves: ['chillyreception']},
		]});
		battle.setPlayer('p2', {team: [
			{species: 'Lopunny', ability: 'limber', moves: ['icepunch']}
		]});

		battle.makeChoices('move chillyreception', 'move icepunch');
		assert(battle.p1.sideConditions.auroraveil);
	})
})