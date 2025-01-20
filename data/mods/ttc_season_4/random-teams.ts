import { PRNG, Utils, toID } from "../../../sim";
import RandomGen8Teams, { MoveCounter, TeamData } from "../gen8/random-teams";

export interface BattleFactorySpecies {
	flags: {megaOnly?: 1, limEevee?: 1};
	sets: BattleFactorySet[];
};

interface BattleFactorySet {
	species: string;
	item: string;
	ability: string;
	nature: string;
	moves: string[];
	evs?: Partial<StatsTable>;
	ivs?: Partial<StatsTable>;
}

/**
 * This is a list of abilities, items, and moves that should be limited on all teams.
 */
const MAXES: {abilities: {[k: string]: number}, items: {[k: string]: number}, moves: {[k: string]: number}} = {
	abilities: {
		toxicdebris: 1, snowcloak: 1, drizzle: 1,
	},
	items: {
		choicespecs: 1, choiceband: 1, choicescarf: 1, lightclay: 1,
	},
	moves: {
		rapidspin: 1, batonpass: 1, stealthrock: 1, defog: 1, 
		spikes: 1, toxicspikes: 1, ceaselessedge: 1, auroraveil: 1,
	},
};

/**
 * This is a list of abilities, items, and moves that need something in order to work.
 * Weather abilities are placed here instead of the REQUIRED variable due to the ability not 
 * actually be required, but more needed.
 */
const NEEDED: {abilities: {[k: string]: string}, items: {[k: string]: string}, moves: {[k: string]: string}} = {
	abilities: {
		// Weather Related Abilities
		hydration: 'raindance', swiftswim: 'raindance', raindish: 'raindance',
		waterveil: 'raindance',
		leafguard: 'sunnyday', solarpower: 'sunnyday', chlorophyll: 'sunnyday',
		flowergift: 'sunnyday',
		sandforce: 'sandstorm', sandrush: 'sandstorm', sandveil: 'sandstorm',
		snowcloak: 'snow', icebody: 'snow', slushrush: 'snow',

		// Terrain Related Abilites
		surgesurfer: "electric",
		grasspelt: "grassy",
	},
	items: {
		// Weather Related Items

		// Terrain Related Items
		electricseed: "electric",
		psychicseed: "psychic",
		grassyseed: "grassy",
		mistyseed: "misty",
	},
	moves: {
		// Weather Related Moves


		// Terrain Related Moves
		risingvoltage: "electric",
		expandingforce: "psychic",
		grassyglide: "grassy",
		mistyexplosion: "misty",
	},
};

/**
 * This is a list of abilities, items, and moves that are required to be on all teams.
 */
const REQUIRED: {abilities: {[k: string]: string}, items: {[k: string]: string}, moves: {[k: string]: string}, families: {abilities: string[], items: string[], moves: string[]}} = {
	abilities: {},
	items: {},
	moves: {
		stealthrock: 'hazardSet', rapidspin: 'hazardClear', defog: 'hazardClear'
	},
	families: {
		abilities: [],
		items: [],
		moves: ['hazardSet', 'hazardClear'],
	}
};
/**
 * This is a list that defines what abilities, items, and moves are classified as.
 */
const TYPES: {abilities: {[k: string]: string[]}, items: {[k: string]: string[]}, moves: {[k: string]: string[]}} = {
	abilities: {
		weather: [
			'drizzle',
			'drought', 'sundance',
			'snowwarning', 'chillingneigh', 'asoneglastrier', 'absolutezero',
			'sandstream', 'granitestorm'
		],
		terrain: [
			'electric',
			'grassy',
			'psychic',
			'misty',
		],
	},
	items: {},
	moves: {},
};

/**
 * This is a list that defines what abilities, items, and moves really are.
 */
const SETS: {abilities: {[k: string]: {[k: string]: string}}, items: {[k: string]: {[k: string]: string}}, moves: {[k: string]: {[k: string]: string}}} = {
	abilities: {
		weather: {
			drizzle: 'raindance',
			drought: 'sunnyday', sundance: 'sunnyday',
			snowwarning: 'snow', chillingneigh: 'snow', asoneglastrier: 'snow',
			absolutezero: 'snow',
			sandstream: 'sandstorm', granitestorm: 'sandstorm',
		},
		terrain: {
			electricsurge: "electric",
			psychicsurge: "psychic",
			grassysurge: "grassy",
			seedsower: "grassy",
			mistysurge: "misty",
		},
	},
	items: {},
	moves: {},
};

/**
 * This is a list that defines abilities, items, and moves that cause the pokemon to become resistance.
 * NOTE: There is no reason for the moves here, but just for consistence I added it in.
 */
const RESISTANCE: {abilities: {[k: string]: string[]}, items: {[k: string]: string[]}, moves: {[k: string]: string[]}} = {
	abilities: {
		colorchange: [
			'Bug', 'Cosmic', 'Dark', 'Dragon',
			'Electric', 'Fighting', 'Flying',
			'Fire', 'Fairy', 'Grass', 'Ground',
			'Ice', 'Normal', 'Poison', 'Rock',
			'Steel', 'Water'
		],
		aurabreak: ['Dark', 'Psychic', 'Fairy'],
		// Water
		dryskin: ['Water'], waterabsorb: ['Water'], stormdrain: ['Water'],
		silentwater: ['Water'], watercompaction: ['Water'], steamengine: ['Water', 'Fire'],
		magmaarmor: ['Water', 'Fire'],
		// Fire
		flashfire: ['Fire'], heatproof: ['Fire'], mightyfire: ['Fire'],
		// Fairy
		sweettooth: ['Fairy'],
		// Electric
		lightningrod: ['Electric'], motordrive: ['Electric'], voltabsorb: ['Electric'],
		phototaxis: ['Electric'], radiatinglight: ['Electric'],
		// Grass
		sapsipper: ['Grass'], naturesgift: ['Grass'],
		// Ice
		thickfat: ['Ice', 'Fire'],
		// Ground
		levitate: ['Ground'],
		// Steel
		garbagedisposal: ['Steel'],
	},
	items: {},
	moves: {},
};



export class RandomTTCTeams extends RandomGen8Teams {

	handleRejectionLaws(set: BattleFactorySet, teamData: TeamData, dex: ModdedDex): [boolean, boolean] | [boolean, boolean, number[]] {
		const item = dex.items.get(set.item);
		const ability = dex.abilities.get(set.ability);
	
		if (teamData.megaCount && teamData.megaCount > 0 && item.megaStone) {
			return [false, false]; // move to the next set if pokemon contains a mega stone and the team already has a mega stone.
		}
		if (MAXES.items[item.id] && teamData.has[item.id] >=MAXES.items[item.id]) {
			return [false, false]; // move to the next set if the pokemon contains an item that has already hit it's limit in the team.
		}
		if (MAXES.abilities[ability.id] && teamData.has[ability.id] >= MAXES.abilities[ability.id]) {
			return [false, false]; // move to the next set if the pokemon contains an ability that has already hit it's limit in the team.
		}
		if (NEEDED.abilities[ability.id] && teamData.weather !== NEEDED.abilities[ability.id]) {
			return [false, false]; // move to the next set if the pokemon's ability requires a weather that is not possible in the team.
		}
		if (teamData.weather && TYPES.abilities['weather'].includes(ability.id)) {
			return [false, false]; // reject 2+ weather setters per team.
		}
		if (teamData.terrain && TYPES.abilities['terrain'].includes(ability.id)) {
			return [false, false]; // reject 2+ terrain setters per team.
		}
		if (NEEDED.items[item.id] && teamData.terrain !== NEEDED.items[item.id]) {
			return [false, false]; // move to the next set if the pokemon's item requires a terrain that is not possible in the team.
		}
		if (NEEDED.abilities[ability.id] && teamData.terrain !== NEEDED.abilities[ability.id]) {
			return [false, false]; // move to the next set if the pokemon's ability requires a terrain that is not possible in the team.
		}
	
		let reject = false;
		let hasRequiredMove = false;
		let hasRequiredAbility = false;
		let hasRequiredItem = false;
		const curSetVariants = [];
		for (const move of set.moves) {
			const variantIndex = this.random(move.length);
			const moveId = toID(move[variantIndex]);
			if (MAXES.moves[moveId] && teamData.has[moveId] >= MAXES.moves[moveId]) {
				reject = true; // reject any set that has a move that exceed the max limit for the team.
				break;
			}
			if (REQUIRED.moves[moveId] && !teamData.has[REQUIRED.moves[moveId]]) {
				hasRequiredMove = true; // place into the priority pool if they have a required move.
			}
	
			curSetVariants.push(variantIndex);
		}
	
		if (REQUIRED.abilities[ability.id]) {
			hasRequiredAbility = true; // place into the priority pool if they have a required ability.
		}
		if (REQUIRED.items[item.id]) {
			hasRequiredItem = true;
		}	
		
		return [!reject, (hasRequiredAbility || hasRequiredItem || hasRequiredMove), curSetVariants]; // Set passed the laws.
	
	}


	randomFactorySets: {[format: string]: {[species: string]: BattleFactorySpecies}} = require('./factory-sets.json');

	randomFactorySet(
		species: Species,
		teamData:RandomTeamsTypes.FactoryTeamDetails,
		tier: string
	): RandomTeamsTypes.RandomFactorySet | null {
		const id = toID(species.name);
		const setList = this.randomFactorySets[tier][id].sets;

		let effectivePool: {set: AnyObject, moveVariants?: number[], itemVariants?: number, abilityVariants?: number}[] = [];
		const priorityPool = [];
		for (const curSet of setList) {
			// if (this.forceMonotype && !species.types.includes(this.forceMonotype)) continue;
			const isLegal = this.handleRejectionLaws(curSet, teamData, this.dex)

			if (isLegal[0]) continue; // move on to the next set if the set fails the checks.
			effectivePool.push({set: curSet, moveVariants: isLegal[2]});
			if (isLegal[1]) priorityPool.push({set: curSet, moveVariants: isLegal[2]});
		}

		if (priorityPool.length) effectivePool = priorityPool;

		if (!effectivePool.length) {
			if (!teamData.forceResult) return null;
			for (const curSet of setList) {
				effectivePool.push({set: curSet});
			}
		}

		const setData = this.sample(effectivePool);
		const moves = [];
		for (const [i, moveSlot] of setData.set.moves.entries()) {
			moves.push(setData.moveVariants ? moveSlot[setData.moveVariants[i]] : this.sample(moveSlot));
		}

		return {
			name: setData.set.name || species.baseSpecies,
			species: setData.set.species,
			gender: setData.set.gender || species.gender || (this.randomChance(1, 2) ? 'M' : 'F'),
			item: setData.set.item || '',
			ability: setData.set.ability || species.abilities['0'],
			shiny: typeof setData.set.shiny === 'undefined' ? this.randomChance(1, 1024) : setData.set.shiny,
			level: this.adjustLevel || 100,
			happiness: typeof setData.set.happiness === 'undefined' ? 255 : setData.set.happiness,
			evs: setData.set.evs || {hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84},
			ivs: setData.set.ivs || {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
			nature: setData.set.nature || 'Serious',
			moves: moves,
		};
	}

	randomFactoryTeam(side: PlayerOptions, depth = 0): RandomTeamsTypes.RandomFactorySet[] {
		this.enforceNoDirectCustomBanlistChanges();

		const forceResult = depth >= 12;
		if (!this.factoryTier) this.factoryTier = this.sample(['OU']);
		const chosenTier = this.factoryTier;

		const pokemon = [];
		const pokemonPool = Object.keys(this.randomFactorySets[chosenTier]);

		const teamData: TeamData = {
			typeCount: {},
			typeComboCount: {},
			baseFormes: {},
			has: {},
			forceResult: forceResult,
			weaknesses: {},
			resistances: {},
		};

		while(pokemonPool.length && pokemon.length < this.maxTeamSize) {
			const species = this.dex.species.get(this.sampleNoReplace(pokemonPool));
			if (!species.exists) continue;

			let speciesFlags = this.randomFactorySets[chosenTier][species.id].flags;
			if (!speciesFlags) speciesFlags = {};

			// Limit to one of each species (Species Clause)
			if (teamData.baseFormes[species.baseSpecies]) continue;
			
			const limitFactor = Math.round(this.maxTeamSize / 6) || 1;

			// Limit 2 of any type
			const types = species.types;
			let skip = false;
			for (const type of types) {
				if (teamData.typeCount[type] >= 2 * limitFactor && this.randomChance(4, 5)) {
					skip = true;
					break;
				}
			}

			if (skip) continue;

			// Generate the random set
			const set = this.randomFactorySet(species, teamData, chosenTier);
			if (!set) continue;

			// Limit 1 of any type combination
			let typeCombo = types.slice().sort().join();
			if (set.ability === 'Drought' || set.ability === 'Drizzle') {
				// Drought and Drizzle don't count towards the type combo limit
				typeCombo = set.ability;
			}

			if (teamData.typeComboCount[typeCombo] >= 1 * limitFactor) continue;

			// Since the set passed, we can add it to our team.
			pokemon.push(set);

			// Now we need to update the team data
			for (const type of types) {
				teamData.typeCount[type] = (teamData.typeCount[type] + 1) || 1;
			}

			teamData.typeComboCount[typeCombo] = (teamData.typeComboCount[typeCombo] + 1) || 1;
			teamData.baseFormes[species.baseSpecies] = 1;
			const itemData = this.dex.items.get(set.item);
			if (!teamData.megaCount) teamData.megaCount = 0;
			if (itemData.megaStone) teamData.megaCount++;
			teamData.has[itemData.id] = (teamData.has[itemData.id] + 1) || 1;

			const abilityState = this.dex.abilities.get(set.ability);

			if (abilityState.id in SETS.abilities['weather']) {
				teamData.weather = SETS.abilities['weather'][abilityState.id];
			}

			if (abilityState.id in SETS.abilities['terrain']) {
				teamData.terrain = SETS.abilities['terrain'][abilityState.id];
			}

			teamData.has[abilityState.id] = (teamData.has[abilityState.id] + 1) || 1;
			for (const move of set.moves) {
				const moveId = toID(move);
				teamData.has[moveId] = (teamData.has[moveId] + 1) || 1;
				if (moveId in REQUIRED.moves) {
					teamData.has[REQUIRED.moves[moveId]] = 1;
				}
			}

			if (REQUIRED.abilities[abilityState.id]) {
				teamData.has[REQUIRED.abilities[abilityState.id]] = 1;
			}

			for (const typeName of this.dex.types.names()) {
				// Cover any major weakness (3+) with at least one resistance
				if (teamData.resistances[typeName] >= 1) continue;
				if (RESISTANCE.abilities[abilityState.id]?.includes(typeName) || !this.dex.getImmunity(typeName, types)) {
					teamData.resistances[typeName] = (teamData.resistances[typeName] || 0) + 1;
					if (teamData.resistances[typeName] >= 1) teamData.weaknesses[typeName] = 0;
					continue;
				}

				const typeMod = this.dex.getEffectiveness(typeName, types);
				if (typeMod < 0) {
					teamData.resistances[typeName] = (teamData.resistances[typeName] || 0) + 1;
					if (teamData.resistances[typeName] >= 1) teamData.weaknesses[typeName] = 0;
				} else if (typeMod > 0) {
					teamData.weaknesses[typeName] = (teamData.weaknesses[typeName] || 0) + 1;
				}
			}
		}

		if (pokemon.length < this.maxTeamSize) return this.randomFactoryTeam(side, ++depth);
		
		// Quality Control
		if (!teamData.forceResult) { // If the team doesn't pass these checks, then we will need to redo the team again.
			// Double Checking that there is only one pokemon that has a mega stone per team.
			if (teamData.megaCount && teamData.megaCount > 1) return this.randomFactoryTeam(side, ++depth);
			for (const requiredFamily of REQUIRED.families.abilities) {
				if (!teamData.has[requiredFamily]) return this.randomFactoryTeam(side, ++depth);
			}
			for (const requiredFamily of REQUIRED.families.moves) {
				if (!teamData.has[requiredFamily]) return this.randomFactoryTeam(side, ++depth);
			}
			for (const type in teamData.weaknesses) {
				if (teamData.weaknesses[type] >= 3) return this.randomFactoryTeam(side, ++depth);
			}
		}

		return pokemon;
	}
}

export default RandomTTCTeams