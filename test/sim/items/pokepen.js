'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('PokePen', () => {
	beforeEach(() => {
		battle = common.createBattle();
	});
	afterEach(() => {
		battle.destroy();
	});

	it("should increase taunt's priority to +1", () => {
		battle.setPlayer('p1', {team: [
			{species: 'Gigachelonian', item: 'pokepen', moves: ['taunt']},
		]});
		battle.setPlayer('p2', {team: [
			{species: 'Inteleon', moves: ['calmmind']},
		]});

		battle.makeChoices('move taunt', 'move calmmind');
		assert.statStage(battle.p2.active[0], 'spa', 0);
		assert.false(battle.p1.active[0].item === 'pokepen');
	});

	it("should fail against a dark type", () => {
		battle.setPlayer('p1', {team: [
			{species: 'Gigachelonian', item: 'pokepen', moves: ['taunt']},
		]});
		battle.setPlayer('p2', {team: [
			{species: 'Sneasel', moves: ['calmmind']},
		]});
		
		battle.makeChoices('move taunt', 'move calmmind');
		assert.statStage(battle.p2.active[0], 'spa', 1);
	});
});