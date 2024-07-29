'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Wanted Poster', () => {
	afterEach(() => battle.destroy());

	it (`should execute before the target switches out`, () => {
		battle = common.createBattle([[
			{species: 'Beedrill', ability: 'swarm', item: 'wantedposter', moves: ['knockoff']},
		], [
			{species: 'Alakazam', level: 50, ability: 'magicguard', moves: ['psyshock']},
			{species: 'Clefable', ability: 'unaware', moves: ['calmmind']},
		]]);
		battle.makeChoices('move knockoff', 'switch 2');
		assert.species(battle.p2.active[0], 'Alakazam');
		assert.fainted(battle.p2.active[0]);
		assert.false(battle.p1.active[0].item === 'wantedposter');
	});

	it (`should deal damage prior to attacker selecting a switch in after u-turn etc `, () => {
		battle = common.createBattle([[
			{species: 'dragapult', item: 'wantedposter', moves: ['knockoff']},
		], [
			{species: 'emolga', moves: ['voltswitch']},
			{species: 'zapdos', moves: ['batonpass']},
		]]);

		battle.makeChoices('move knockoff', 'move voltswitch');
		assert.false.fullHP(battle.p2.pokemon[0]);
		battle.choose('p2', 'switch 2');
		assert.equal(battle.p2.pokemon[0].name, "Zapdos");

		assert(battle.p1.active[0].item === 'wantedposter');
	})
})