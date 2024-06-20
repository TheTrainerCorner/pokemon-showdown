'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Berserk', () => {
	beforeEach(() => {
		battle = common.createBattle();
	});
	afterEach(() => {
		battle.destroy();
	});

	it("should only proc once", () => {
		battle.setPlayer('p1',{team: [
			{species: 'Drampa', ability: 'Berserk', moves: ['sleeptalk']},
		]});
		battle.setPlayer('p2', {team: [
			{species: 'lopunny', moves: ['icepunch']},
		]});

		battle.makeChoices('move sleeptalk', 'move icepunch');

		if(!(battle.p1.active[0].hp <= battle.p1.active[0].maxhp / 2))
			battle.makeChoices('move sleeptalk', 'move icepunch');
		// if(!(battle.p1.active[0].hp <= battle.p1.active[0].maxhp / 2))

		assert(battle.p1.active[0].hp <= (battle.p1.active[0].maxhp / 2));
		assert.statStage(battle.p1.active[0], 'atk', 1);
		assert.statStage(battle.p1.active[0], 'spa', 1);
	});
})