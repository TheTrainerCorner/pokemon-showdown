'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Sweet Tooth', () => {
	beforeEach(() => {
		battle = common.createBattle();
		battle.setPlayer('p1', {team: [
			{species: 'Tyrannical Glutton', ability: 'sweettooth', moves: ['sleeptalk']},
		]});
		battle.setPlayer('p2', {team: [
			{species: 'Sylveon', moves: ['fairywind']},
		]});
	});
	afterEach(() => {
		battle.destroy();
	});

	it("should negate damage by fairy moves", () => {

		battle.makeChoices('move sleeptalk', 'move fairywind');
		assert.fullHP(battle.p1.active[0]);
	});

	it("should heal 1/4 of max hp by fairy moves", () => {
		battle.p1.active[0].damage(battle.p1.active[0].maxHp/4);
		battle.makeChoices('move sleeptalk', 'move fairywind');
		assert.fullHP(battle.p1.active[0]);
	});
});