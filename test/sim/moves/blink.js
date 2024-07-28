'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Blink', () => {
	beforeEach(() => {
		battle = common.createBattle();
		battle.setPlayer('p1', {team: [
			{species: 'Jaguaptic', moves: ['blink', 'crunch']},
		]});
		battle.setPlayer('p2', {team: [
			{species: 'Snorlax', moves: ['sleeptalk']},
			{species: 'TapuKoko', ability: 'electricsurge', moves: ['sleeptalk']},
		]});
	});
	afterEach(() => {
		battle.destroy();
	});

	// it("should only put the user to sleep for one turn", () => {
	// 	assert.false(battle.p1.active[0].status === 'slp');
	// 	battle.makeChoices('move blink', 'move sleeptalk');
	// 	assert(battle.p1.active[0].status === 'slp');
	// 	let checkStats = ['atk', 'def', 'spa', 'spd', 'spe'];
	// 	for (const stat of checkStats) {
	// 		assert.statStage(battle.p1.active[0], stat, 1);
	// 	}
	// 	battle.makeChoices('move crunch', 'move sleeptalk');
	// 	assert(battle.p1.active[0].status === 'slp');
	// 	battle.makeChoices('move crunch', 'move sleep talk');
	// 	assert.false(battle.p1.active[0].status === 'slp');
	// });

	// it("should not proc when electric terrain exist", () => {
	// 	battle.makeChoices("move blink", "switch 2");
	// 	let checkStats = ['atk', 'def', 'spa', 'spd', 'spe'];
	// 	for (const stat of checkStats) {
	// 		assert.false.statStage(battle.p1.active[0], stat, 1);
	// 	}
	// 	assert.false(battle.p1.active[0].status === 'slp');
	// 	battle.makeChoices("move crunch", "move sleeptalk");
	// });
});