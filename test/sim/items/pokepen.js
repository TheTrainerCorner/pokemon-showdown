'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('PokePen', () => {
	beforeEach(() => {
		battle = common.createBattle();
		battle.setPlayer('p1', {team: [
			{species: 'Gliscor', item: 'pokepen', moves: ['taunt']},
		]});
		battle.setPlayer('p2', {team: [
			{species: 'Deoxys-Speed', ability: 'pressure', moves: ['calmmind']},
		]})
	});
	afterEach(() => {
		battle.destroy();
	});

	// it("should increase taunt's priority to +1", () => {
	// 	assert(battle.p1.active[0].hasItem('pokepen'));
	// 	battle.makeChoices('move taunt', 'move calmmind');
	// 	assert.statStage(battle.p2.active[0], 'spa', 0);
	// 	assert.false(battle.p1.active[0].hasItem('pokepen'));
	// });
});