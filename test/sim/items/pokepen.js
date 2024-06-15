'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('PokePen', () => {
	beforeEach(() => {
		battle = common.createBattle();
		battle.setPlayer('p1', {team: [
			{species: 'Cinccino', item: 'pokepen', moves: ['hypervoice']},
		]});
		battle.setPlayer('p2', {team: [
			{species: 'Kecleon', ability: 'colorchange', moves: ['sleeptalk']}
		]});
	});
	afterEach(() => {
		battle.destroy();
	});
});