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

export class RandomTTCTeams extends RandomGen8Teams {

	randomFactorySets: {[format: string]: {[species: string]: BattleFactorySpecies}} = require('./factory-sets.json');

	randomFactorySet(
		species: Species,
		teamData:RandomTeamsTypes.FactoryTeamDetails,
		tier: string
	): RandomTeamsTypes.RandomFactorySet | null {
		const id = toID(species.name);
		const setList = this.randomFactorySets[tier][id].sets;

		const itemsMax: {[k: string]: number} = { choicespecs: 1, choiceband: 1, choicescarf: 1, lightclay: 1, eviolite: 2};
		const movesMax: {[k: string]: number} = {
			rapidspin: 1,
			batonpass: 1, 
			stealthrock: 1, 
			defog: 1, 
			spikes: 1, 
			toxicspikes: 1,
			ceaselessedge: 1,
			auroraveil: 1,
		};
		const abilitiesMax: {[k: string]: number} = {
			toxicdebris: 1,
			snowcloak: 1,
			drizzle: 1,
		};
		let requiredAbilities: {[k: string]: string} = { drizzle: 'weather' };
		const requiredMoves: {[k: string]: string} = {
			stealthrock: 'hazardSet', rapidspin: 'hazardClear', defog: 'hazardClear'
		};
		const weatherAbilitiesRequire: {[k: string]: string} = {
			hydration: 'raindance', swiftswim: 'raindance', raindish: 'raindance',
			waterveil: 'raindance',
			leafguard: 'sunnyday', solarpower: 'sunnyday', chlorophyll: 'sunnyday',
			flowergift: 'sunnyday',
			sandforce: 'sandstorm', sandrush: 'sandstorm', sandveil: 'sandstorm',
			snowcloak: 'snow', icebody: 'snow', slushrush: 'snow',
		};
		const weatherAbilities = [
			'drizzle',
			'drought', 'sundance',
			'snowwarning', 'chillingneigh', 'asoneglastrier', 'absolutezero',
			'sandstream', 'granitestorm'
		];

		const terrainAbilities: {[k: string]: string} = {
			electricsurge: "electric",
			psychicsurge: "psychic",
			grassysurge: "grassy",
			mistysurge: "misty",
		};

		const terrainAbilitiesRequired: {[k: string]: string} = {
			surgesurfer: "electric",
			grasspelt: "grassy",
		};

		const terrainMovesRequired: {[k: string]: string} = {
			risingvoltage: "electric",
			expandingforce: "psychic",
			grassyglide: "grassy",
			mistyexplosion: "misty",
		};

		const terrainItemsRequire: {[k: string]: string} = {
			electricseed: "electric",
			psychicseed: "psychic",
			grassyseed: "grassy",
			mistyseed: "misty",
		};

		let effectivePool: {set: AnyObject, moveVariants?: number[], itemVariants?: number, abilityVariants?: number}[] = [];
		const priorityPool = [];
		for (const curSet of setList) {
			// if (this.forceMonotype && !species.types.includes(this.forceMonotype)) continue;

			const itemData = this.dex.items.get(curSet.item);
			const abilityState = this.dex.abilities.get(curSet.ability);

			if (teamData.megaCount && teamData.megaCount > 0 && itemData.megaStone) {
				continue; // move to the next set if pokemon contains a mega stone and the team already has a mega stone.
			}
			
			if (itemsMax[itemData.id] && teamData.has[itemData.id] >= itemsMax[itemData.id]) {
				continue; // move to the next set if the pokemon contains an item that has already hit it's limit in the team.
			}

			if (abilitiesMax[abilityState.id] && teamData.has[abilityState.id] >= abilitiesMax[abilityState.id]) {
				continue; // move to the next set if the pokemon contains an ability that has already hit it's limit in the team.
			}

			if (weatherAbilitiesRequire[abilityState.id] && teamData.weather !== weatherAbilitiesRequire[abilityState.id]) {
				continue; // move to the next set if the pokemon's ability requires a weather that is not possible in the team.
			}

			if (teamData.weather && weatherAbilities.includes(abilityState.id)) {
				continue; // reject 2+ weather setters per team.
			}

			if (teamData.terrain && terrainAbilities[abilityState.id]) {
				continue; // reject 2+ terrain setters per team.
			}

			if (terrainItemsRequire[itemData.id] &&  teamData.terrain !== terrainItemsRequire[itemData.id]) {
				continue; // move to the next set if the pokemon's item requires a terrain that is not possible in the team.
			}

			if (terrainAbilitiesRequired[abilityState.id] && teamData.terrain !== terrainAbilitiesRequired[abilityState.id]) {
				continue; // move to the next set if the pokemon's ability requires a terrain that is not possible in the team.
			}

			let reject = false;
			let hasRequiredMove = false;
			let hasRequiredAbility = false;
			let hasRequiredWeather = false;
			const curSetVariants = [];
			for (const move of curSet.moves) {
				const variantIndex = this.random(move.length);
				const moveId = toID(move[variantIndex]);
				if (movesMax[moveId] && teamData.has[moveId] >= movesMax[moveId]) {
					reject = true; // reject any set that has a move that exceed the max limit for the team.
					break;
				}
				if (requiredMoves[moveId] && !teamData.has[requiredMoves[moveId]]) {
					hasRequiredMove = true; // place into the priority pool if they have a required move.
				}

				curSetVariants.push(variantIndex);
			}

			if (requiredAbilities[abilityState.id]) {
				hasRequiredAbility = true; // place into the priority pool if they have a required ability.
			}


			if (reject) continue; // move on to the next set if the set fails the checks.
			effectivePool.push({set: curSet, moveVariants: curSetVariants});
			if (hasRequiredMove || hasRequiredAbility) priorityPool.push({set: curSet, moveVariants: curSetVariants});
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
		const weatherAbilitiesSet: {[k: string]: string} = {
			drizzle: 'raindance',
			drought: 'sunnyday', sundance: 'sunnyday',
			snowwarning: 'snow', chillingneigh: 'snow', asoneglastrier: 'snow',
			absolutezero: 'snow',
			sandstream: 'sandstorm', granitestorm: 'sandstorm',
		};
		const terrainAbilitiesSet: {[k: string]: string} = {
			electricsurge: "electric",
			psychicsurge: "psychic",
			grassysurge: "grassy",
			seedsower: "grassy",
			mistysurge: "misty",
		};
		const resistanceAbilities: {[k: string]: string[]} = {
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
		};

		const requiredAbilityFamilies = ['weather'];
		const requiredAbilities: {[k: string]: string} = {drizzle: 'weather'};
		const requiredMoveFamilies = ['hazardSet', 'hazardClear'];
		const requiredMoves: {[k: string]: string} = {stealthrock: 'hazardSet', rapidspin: 'hazardClear', defog: 'hazardClear'};

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

			if (abilityState.id in weatherAbilitiesSet) {
				teamData.weather = weatherAbilitiesSet[abilityState.id];
			}

			if (abilityState.id in terrainAbilitiesSet) {
				teamData.terrain = terrainAbilitiesSet[abilityState.id];
			}

			teamData.has[abilityState.id] = (teamData.has[abilityState.id] + 1) || 1;
			for (const move of set.moves) {
				const moveId = toID(move);
				teamData.has[moveId] = (teamData.has[moveId] + 1) || 1;
				if (moveId in requiredMoves) {
					teamData.has[requiredMoves[moveId]] = 1;
				}
			}

			if (requiredAbilities[abilityState.id]) {
				teamData.has[requiredAbilities[abilityState.id]] = 1;
			}

			for (const typeName of this.dex.types.names()) {
				// Cover any major weakness (3+) with at least one resistance
				if (teamData.resistances[typeName] >= 1) continue;
				if (resistanceAbilities[abilityState.id]?.includes(typeName) || !this.dex.getImmunity(typeName, types)) {
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
			for (const requiredFamily of requiredAbilityFamilies) {
				if (!teamData.has[requiredFamily]) return this.randomFactoryTeam(side, ++depth);
			}
			for (const requiredFamily of requiredMoveFamilies) {
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