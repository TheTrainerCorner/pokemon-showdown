'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Lava Surfer', () => {
	beforeEach(() => {
		battle = common.createBattle();

		battle.setPlayer('p1', {team: [
			{species: 'Slugoliath', ability: 'lavasurfer', moves: ['ember', 'flamethrower']},
		]});
		battle.setPlayer('p2', {team: [
			{species: 'Arcanine', moves: ['willowisp', 'flamethrower', 'flamewheel']},
		]});
	});
	afterEach(() => {
		battle.destroy();
	});

	it('should negate damage from moves with burn.', () => {
		battle.makeChoices('move ember', 'move flamethrower');

		assert.fullHP(battle.p1.active[0]);
	});

	it('should gain +1 to speed from the negation', () => {
		battle.makeChoices('move ember', 'move flamethrower');

		assert.fullHP(battle.p1.active[0]);
		assert.statStage(battle.p1.active[0], 'spe', 1);
	});
});