'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('No Guard', () => {
	afterEach(() => {
		battle.destroy();
	});

	it("should raise atk by 1 stage and lower def by 1 stage when hit", () => {
		battle = common.createBattle();

		battle.setPlayer('p1', {team: [
			{species: 'Machamp', ability: 'noguard', moves: ['focusblast', 'return']}
		]});

		battle.setPlayer('p2', {
			team: [
				{species: 'Lopunny', ability: 'limber', moves: ['icepunch']}
			]
		});

		battle.makeChoices('move return', 'move icepunch');
		assert.statStage(battle.p1.active[0], 'atk', 1);
		assert.statStage(battle.p1.active[0], 'def', -1);

	});
})