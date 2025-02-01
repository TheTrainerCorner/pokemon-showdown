'use strict';


const assert = require('../assert');
const common = require('../common');
const { Utils } = require('../../dist/lib');
const {testTeam, assertSetValidity, validateLearnset } = require('./tools');
const { default: Dex } = require('../../dist/sim/dex');

describe('Season 4 Battle Factory', () => {
	it ('ttc_season_4/factory-sets.json should be valid', () => {
		const setsJSON = require(`../../data/mods/ttc_season_4/factory-sets.json`);
		const dex = Dex.mod('ttc_season_4');
		for (const speciesName of Object.keys(setsJSON['OU'])) {
			assert(dex.species.get(speciesName).exists, `invalid species tag "${speciesName}"`);
			for (const set of setsJSON['OU'][speciesName].sets) {
				const species = dex.species.get(set.species);
				assert(species.exists, `invalid species "${set.species}" of ${speciesName}`);
				assert.equal(species.name, set.species, `miscapitalized species "${set.species}" of ${species}`);

				assert(species.id.startsWith(toID(species.baseSpecies)), `non-matching species "${set.species}" of ${species}`)
				
				for (const itemName of [].concat(set.item)) {
					if (!itemName) continue;
					const item = dex.items.get(itemName);
					assert(item.exists, `invalid item "${itemName}" of ${species}`);
					assert.equal(item.name, itemName, `miscapitalized item "${itemName}" of ${species}`);
				}

				for (const abilityName of [].concat(set.ability)) {
					if (!abilityName) continue;
					const ability = dex.abilities.get(abilityName);
					assert(ability.exists, `invalid ability "${abilityName}" of ${species}`);
					assert.equal(ability.name, abilityName, `miscapitalized ability "${abilityName}" of ${species}`);
					const allowedAbilities = new Set(Object.values((species.battleOnly && !species.requiredAbility) ? dex.species.get(species.battleOnly).abilities : species.abilities));
					if (species.unreleasedHidden) allowedAbilities.delete(species.abilities.H);
					assert(allowedAbilities.has(abilityName), `${species.name} can't have ${abilityName}`);
				}

				// We don't do natures

				for (const moveSpec of set.moves) {
					for (const moveName of [].concat(moveSpec)) {
						const move = dex.moves.get(moveName);
						assert(move.exists, `invalid move "${moveName}" of ${species}`);
						assert.equal(move.name, moveName, `miscapitalized move "${moveName}" of ${species}`);
						assert(validateLearnset(move, set), `illegal move "${moveName}" of ${species}`);
					}
				}
			}	
		}
	});
})