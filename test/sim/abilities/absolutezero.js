'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Absolute Zero', () => {
	beforeEach(() => {
		battle = common.createBattle();
		battle.setPlayer('p1', {team: [
			{ species: 'Regice', ability: 'absolutezero', moves: ['ancientpower', 'explosion']},
			{ species: 'Ninetales-Alola', ability: 'snowwarning', moves: ['sleeptalk']},
		]});
		battle.setPlayer('p2', {team: [
			{species: 'Shedinja', moves: ['sleeptalk']},
			{species: 'Magikarp', moves: ['splash']},
		]})
	})
	afterEach(() => {
		battle.destroy();
	});

	it("should set snow without triggering auroraveil", () => {
		battle.makeChoices('move ancientpower', 'move sleeptalk');
		assert.statStage(battle.p1.active[0], 'spa', 1);
		assert(battle.p1.active[0].effectiveWeather() === 'snow');
		assert.false(battle.p1.sideConditions.auroraveil);
	});

	it ("should set aurora veil when snow is exist", () => {
		battle.makeChoices('switch 2', 'move sleeptalk');
		assert(battle.p1.active[0].effectiveWeather() === 'snow');
		battle.makeChoices('switch 2', 'move sleeptalk');
		battle.makeChoices('move ancientpower', 'move sleeptalk');
		assert.statStage(battle.p1.active[0], 'spa', 1);
		assert(battle.p1.sideConditions.auroraveil);
	});

	it ("should not set snow if explosion is used", () => {
		battle.makeChoices('move explosion', 'switch 2');
		assert(battle.p2.active[0].hp === 0);
		assert.false(battle.p1.active[0].effectiveWeather() === 'snow');
	})
	// it("should set weather and add auroraveil", () => {
	// 	battle = common.createBattle([[
	// 		{species: 'Regice', ability: 'absolutezero', moves: ['ancientpower']},
	// 	], [
	// 		{species: 'Shedinja', moves: ['sleeptalk']}, {species: 'Magikarp', moves: ['splash']}
	// 	]]);

	// 	battle.makeChoices('move ancientpower', 'move sleeptalk');
	// 	assert.statStage(battle.p1.active[0], 'spa', 1);
	// 	assert(battle.p1.active[0].effectiveWeather() === "snow");
	// 	assert(battle.p1.sideConditions.auroraveil);	
	// })
});