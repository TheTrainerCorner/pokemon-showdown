'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Frost Orb', () => {
	beforeEach(() => {
		battle = common.createBattle();

		battle.setPlayer('p2', {team: [
			{species: 'Glaceon', ability: 'snowcloak', moves: ['sleeptalk']},
		]});
	});
	afterEach(() => {
		battle.destroy();
	});

	// it('should not trigger when entering battle', () => {
	// 	battle.setPlayer('p1', {team: [
	// 		{species: 'Cinccino', moves: ['sleeptalk']},
	// 		{species: 'Jolteon', ability: 'quickfeet', item: 'frostorb', moves: ['sleeptalk']},
	// 	]});

	// 	battle.makeChoices('move sleeptalk', 'move sleeptalk');
	// 	battle.makeChoices('switch 2', 'move sleeptalk');
	// 	assert.notEqual(battle.p1.active[0].status, 'frb');
	// });

	it('should trigger after one turn', () => {
		battle.setPlayer('p1', {team: [
			{species: 'Jolteon', ability: 'quickfeet', item: 'frostorb', moves: ['sleeptalk']},
		]});
		const target = battle.p1.active[0];
		assert.sets(() => target.status, 'frb', () => battle.makeChoices('move sleeptalk', 'move sleeptalk'));
	});
});