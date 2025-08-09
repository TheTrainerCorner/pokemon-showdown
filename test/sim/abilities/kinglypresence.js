'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Kingly Presence', () => {
	afterEach(() => {
		battle.destroy();
	});

	it ('should descrease Atk by 1 stage', () => {
		battle = common.createBattle();
		battle.setPlayer('p1', {team: [{species: 'smeargle', moves: ['sketch']}]});
		battle.setPlayer('p2', {team: [{species: 'bisharp', ability: 'kinglypresence', moves: ['splash']}]});
		assert.statStage(battle.p1.active[0], 'atk', -1);
	});

	it ('should inflict Embargo for 2 turns', () => {
		battle = common.createBattle();
		battle.setPlayer('p1', {team: [{species: 'smeargle', moves: ['sketch']}]});
		battle.setPlayer('p2', {team: [{species: 'bisharp', ability: 'kinglypresence', moves: ['splash']}]});
		assert(battle.p1.active[0].volatiles['embargo']);
		assert.equal(battle.p1.active[0].volatiles['embargo'].duration, 2);
	});
});