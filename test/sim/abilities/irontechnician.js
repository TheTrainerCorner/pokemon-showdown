'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Iron Technician', () => {
	afterEach(() => {
		battle.destroy();
	});

	it('should set G-Max Steel Surge on the other side when switching in', () => {
		battle = common.createBattle();
		battle.setPlayer('p1', {team: [
			{species: 'Registeel', ability: 'irontechnician', moves: ['bulletpunch']},
		]});
		battle.setPlayer('p2', {team: [
			{species: 'Lopunny', moves: ['icepunch']},
		]});

		assert(battle.p2.sideConditions.gmaxsteelsurge);
	})
});