'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Roaring Bellow', () => {
	beforeEach(() => {
		battle = common.createBattle();
		battle.setPlayer('p1', {team: [
			{species: 'Drampa', moves: ['roaringbellow']}
		]});
		battle.setPlayer('p2', {team: [
			{species: 'cinccino', moves: ['sleeptalk']},
		]});
	});
	afterEach(() => {
		battle.destroy();
	});
	it("should lower the opponent's attack by 1 stage", () => {
		battle.makeChoices('move roaringbellow', 'move sleeptalk');
		assert.statStage(battle.p2.active[0], 'atk', -1);
	});
})