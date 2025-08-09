'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;
describe('Suresight', () => {
	afterEach(() => {
		battle.destroy();
	});

	it('should bounce Growl', () => {
		battle = common.createBattle();
		battle.setPlayer('p1', {team: [{species: 'Bulbasaur', ability: 'overgrow', moves: ['growl']}]});
		battle.setPlayer('p2', {team: [{species: 'Espeon', ability: 'suresight', moves: ['sleeptalk']}]});
		battle.makeChoices('move growl', 'move sleeptalk');
		assert.statStage(battle.p1.active[0], 'atk', -1);
		assert.statStage(battle.p2.active[0], 'atk', 0);
	});

	it('should bounce once when target and source share the ability', () => {
		battle = common.createBattle();
		battle.setPlayer('p1', { team: [{ species: "Xatu", ability: 'suresight', moves: ['roost'] }] });
		battle.setPlayer('p2', { team: [{ species: "Espeon", ability: 'suresight', moves: ['growl'] }] });
		assert.doesNotThrow(() => battle.makeChoices('move roost', 'move growl'));
		assert.statStage(battle.p1.active[0], 'atk', 0);
		assert.statStage(battle.p2.active[0], 'atk', -1);
	});
});