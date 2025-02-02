'use strict';

const { testSet, testNotBothMoves, testHasSTAB, testAlwaysHasMove} = require('./tools');
const assert = require('../assert');

describe('TTC Random Battles', () => {
	const options = {format: 'gen9nationaldexrandoms'};
	const dataJSON = require('../../dist/data/mods/ttc_season_4/random-sets.json');
	const dex = Dex.forFormat(options.format);
	const generator = Teams.getGenerator(options.format);

	it ('All moves on all sets should be obtainable', (done) => {
		const rounds = 500;
		for (const pokemon of Object.keys(dataJSON)) {
			const species = dex.species.get(pokemon);
			const data = dataJSON[pokemon];
			if (!data.moves || species.isNonstandard) continue;
			const remainingMoves = new Set(data.moves);
			for (let i = 0; i < rounds; i++) {
				// Test lead 1/6 of the time
				const set = generator.randomSet(species, {}, i % 6 === 0);
				for (const move of set.moves) remainingMoves.delete(move);
				if (!remainingMoves.size) break;
			}
			assert.false(remainingMoves.size,
				`The following moves on ${species.name} are unused: ${[...remainingMoves].join(', ')}`);
		}
		done();
	}).timeout(10000);

	it ('should not generate Golisopod without Bug STAB', () => {
		testSet('golisopod', options, set => {
			assert(set.moves.some(m => {
				const move = Dex.moves.get(m);
				return move.type === 'Bug' && move.category !== 'Status';
			}), `Golisopod should get Bug STAB (got ${set.moves})`);
		});
	});

	it('should not generate Shift Gear + U-turn Genesect', () => {
		testNotBothMoves('Genesect', options, 'shiftgear', 'uturn');
	});

	it('should not generate Flame Charge + Flare Blitz Solgaleo', () => {
		testNotBothMoves('solgaleo', options, 'flamecharge', 'flareblitz');
	});

	it('should not generate Knock Off + Sucker Punch Toxicroak', () => {
		testNotBothMoves('toxicroak', options, 'knockoff', 'suckerpunch');
	});

	it('should not generate Swords Dance + Fire Blast Garchomp', () => {
		testNotBothMoves('garchomp', options, 'swordsdance', 'fireblast');
	});

	it('should give 4 Attacks Scyther a Choice Band', () => {
		testSet('scyther', options, set => {
			if (!set.moves.includes('roost') && !set.moves.includes('swordsdance')) {
				assert.equal(set.item, "Choice Band");
			}
		});
	});

	it('should give Solid Rock + Shell Smash Carracosta a Weakness Policy', () => {
		testSet('carracosta', options, set => {
			if (set.moves.includes('shellsmash') && set.ability === 'Solid Rock') {
				assert.equal(set.item, "Weakness Policy");
			}
		});
	});

	it('should not generate 3-attack Alcremie-Gmax', () => {
		testSet('alcremiegmax', options, set => assert(
			!['psychic', 'dazzlinggleam', 'mysticalfire'].every(move => set.moves.includes(move)),
			`Alcremie-Gmax should not get three attacks (got ${set.moves})`
		));
	});

	it('should always give Doublade Swords Dance', () => {
		testAlwaysHasMove('doublade', options, 'swordsdance');
	});

	it('Dragonite and Salamence should always get Outrage', () => {
		for (const pkmn of ['dragonite', 'salamence']) {
			testAlwaysHasMove(pkmn, options, 'outrage');
		}
	});

	it('should give Sticky Web Pokémon Sticky Web unless they have setup', () => {
		for (const pkmn of ['shuckle', 'araquanid']) {
			testSet(pkmn, options, set => {
				if (set.moves.some(move => Dex.moves.get(move).boosts)) return; // Setup
				assert(
					set.moves.includes('stickyweb'),
					`${pkmn} should always generate Sticky Web (generated moveset: ${set.moves})`
				);
				if (pkmn === 'shuckle') assert(set.moves.includes('stealthrock'));
			});
		}
	});

	it('should give Throat Spray to Shift Gear Toxtricity sets', () => {
		testSet('toxtricity', options, set => {
			if (!set.moves.includes('shiftgear')) return;
			assert.equal(set.item, "Throat Spray", `got ${set.item} instead of Throat Spray`);
		});
	});

	it('Toxapex should always have Scald', () => testAlwaysHasMove('toxapex', options, 'scald'));

	it('Shiinotic should always have Moonblast', () => testAlwaysHasMove('shiinotic', options, 'moonblast'));

	it('should prevent Dragon Dance and Extreme Speed from appearing together', () => {
		testNotBothMoves('dragonite', options, 'dragondance', 'extremespeed');
	});

	it('Rapidash with Swords Dance should have at least two attacks', () => {
		testSet('rapidash', options, set => {
			if (!set.moves.includes('swordsdance')) return;
			assert(set.moves.filter(m => dex.moves.get(m).category !== 'Status').length > 1, `got ${JSON.stringify(set.moves)}`);
		});
	});

	it('Celesteela should not get Leech Seed or Protect on Autotomize sets', () => {
		testNotBothMoves('celesteela', options, 'leechseed', 'autotomize');
		testNotBothMoves('celesteela', options, 'protect', 'autotomize');
	});

	it('Landorus-Therian should not get Fly and Stealth Rock on the same set', () => {
		testNotBothMoves('landorustherian', options, 'fly', 'stealthrock');
	});

	it('should give Scyther the correct item', () => {
		testSet('scyther', options, set => {
			let item;
			if (set.moves.every(move => Dex.moves.get(move).category !== 'Status')) {
				item = 'Choice Band';
			} else if (set.moves.includes('uturn')) {
				item = 'Heavy-Duty Boots';
			} else {
				// Test interface currently doesn't tell us if we're testing in the lead slot or not
				// But FTR it should be Eviolite if it's the lead, Boots otherwise
				return;
			}
			assert.equal(set.item, item, `set=${JSON.stringify(set)}`);
		});
	});

	it('should guarantee Poison STAB on all Grass/Poison types', function () {
		// This test takes more than 2000ms
		this.timeout(0);

		const pokemon = Object.keys(dataJSON)
			.filter(pkmn =>
				dataJSON[pkmn].moves &&
				dex.species.get(pkmn).types.includes('Grass') && dex.species.get(pkmn).types.includes('Poison'));
		for (const pkmn of pokemon) {
			testHasSTAB(pkmn, options, ['Poison']);
		}
	});

	it('should not allow Swords Dance + Dragon Dance Rayquaza', () => {
		testNotBothMoves('rayquaza', options, 'swordsdance', 'dragondance');
	});

	it('should not allow Extreme Speed + Dragon Dance Rayquaza', () => {
		testNotBothMoves('rayquaza', options, 'extremespeed', 'dragondance');
	});

	it('should not generate Noctowl with three attacks and Roost', () => {
		testSet('noctowl', options, set => {
			const attacks = set.moves.filter(m => dex.moves.get(m).category !== 'Status');
			assert(
				!(set.moves.includes('roost') && attacks.length === 3),
				`Noctowl should not get three attacks and Roost (got ${set.moves})`
			);
		});
	});

	it(`should minimize Chansey's attack stat`, () => {
		testSet('chansey', options, set => {
			const [atkIV, atkEV] = [set.ivs.atk, set.evs.atk];
			assert(atkIV === 0 && atkEV === 0, `Chansey should have minimum attack (Atk IV: ${atkIV}, Atk EV: ${atkEV})`);
		});
	});

	it('should always give Palossand Shore Up', () => testAlwaysHasMove('palossand', options, 'shoreup'));
	it('should always give Azumarill Aqua Jet', () => testAlwaysHasMove('azumarill', options, 'aquajet'));


	it('should forbid a certain Togekiss set', () => {
		testSet('togekiss', options, set => {
			assert.notDeepEqual(
				[...set.moves].sort(),
				['airslash', 'aurasphere', 'fireblast', 'roost'],
				`got ${set.moves}`
			);
		});
	});

	it ('should not allow castform to have blizzard, hurricane, and fire blast on the same set.', () => {
		testNotBothMoves('castform', options, 'blizzard', 'hurricane');
		testNotBothMoves('castform', options, 'blizzard', 'fireblast');
		testNotBothMoves('castform', options, 'hurricane', 'fireblast');
	});

	it ('should force slaking to have slack off', () => {
		testAlwaysHasMove('slaking', options, 'slackoff');
	});

	it ('should give megastone to Venusaur-Mega', () => {
		testSet('venusaurmega', options, (set) => {
			assert(set.item === 'Venusaurite', `Venusaur-Mega does not have its mega stone. (Got ${set.item})`);
		});
	});

	it ('should always give Snowtime Song to Meloetta-Caroler', () => {
		testAlwaysHasMove('meloettacaroler', options, 'snowtimesong');
	})
});