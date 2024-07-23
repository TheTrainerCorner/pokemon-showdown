const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Phantasm', () => {
	beforeEach(() => {
		battle = common.createBattle();
	});

	afterEach(() => {
		battle.destroy();
	});

	it("should deal 75% of the damage to plushadow and setup substitute", () => {
		battle.setPlayer('p1', {team: [
			{species: 'Plushadow', ability: 'phantasm', moves: ["sleeptalk"]},
		]});
		battle.setPlayer('p2', {team: [
			{species: 'marshadow', moves: ['sleeptalk']},
		]});

		battle.makeChoices('move sleeptalk', 'move sleeptalk');

		assert.false.fullHP(battle.p1.active[0]);
		assert(battle.p1.active[0].volatiles['substitute']);
	});

	it("should not proc if plushadow is below 75%", () => {
		battle.setPlayer('p1', {team: [
			{species: 'Plushadow', ability: 'phantasm', moves: ['sleeptalk']},
			{species: 'Lopunny', moves: ['sleeptalk']},
		]});
		battle.setPlayer('p2', {team: [
			{species: 'Marshadow', moves: ['sleeptalk']},
		]});

		// We need to use the ability to lower Plushadow's hp to be below 75%
		// We then can switch out then swap in to see if it works.

		battle.makeChoices('switch 2', 'move sleeptalk');
		battle.makeChoices('switch 2', 'move sleeptalk');
		// We should be at plushadow with reduce hp.

		assert.false.fullHP(battle.p1.active[0]);
		assert.false(battle.p1.active[0].volatiles['substitute']);
	})
});