'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Wanted Poster', () => {
	beforeEach(() => {
		battle = common.createBattle();
		battle.setPlayer('p1', {team: [
			{species: 'Cinccino', item: 'wantedposter', moves: ['tailslap', 'sleeptalk']},
			{species: 'Lopunny', item: 'leftovers', moves: ['sleeptalk']},
		]});
		battle.setPlayer('p2', {team: [
			{species: 'Meowth', moves: ['sleeptalk']},
			{species: 'Pikachu', moves: ['sleeptalk']},
		]});
	});
	afterEach(() => {
		battle.destroy();
	});

	it("should proc and deal damage to the meowth", () => {
		assert(battle.p1.active[0].hasItem('wantedposter'));
		battle.makeChoices('move tailslap', 'switch 2');
		assert.fullHP(battle.p1.active[0]);
		assert.fullHP(battle.p2.active[0]);
		assert.false(battle.p1.active[0].hasItem('wantedposter'));
		battle.makeChoices('move sleeptalk', 'switch 2');
		assert.fullHP(battle.p1.active[0]);
		assert.false.fullHP(battle.p2.active[0]);
		battle.makeChoices('move sleeptalk', 'switch 2');
		assert.fullHP(battle.p2.active[0]);
	});
});