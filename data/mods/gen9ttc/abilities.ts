export const Abilities: {[k: string]: ModdedAbilityData} = {
	solarpower: {
		inherit: true,
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if(['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		desc: "If Sunny Day is active, this Pokemon's Special Attack and Attack is multiplied by 1.5 and it loses 1/8 of its maximum HP, rounded down, at the end of each turn. These effects are prevented if the Pokemon is holding a Utility Umbrella.",
		shortDesc: "If Sunny Day is active, this Pokemon's Sp. Atk and Atk is 1.5x; loses 1/8 max HP per turn."
	},
	surgesurfer: {
		inherit: true,
		onModifySpe(spe) {
			if(this.field.isTerrain(['electricterrain', 'psychicterrain', 'mistyterrain', 'grassyterrain']))
				return this.chainModify(1.3);
		}
	},
	vampire: {
		onTryHit(source, target, move) {
			if(move.flags['bite']) {
				this.heal(source.baseMaxhp / 8);
				this.debug('Vampire successfully triggered');
			}
		},
		desc: "When this user uses a bite move, it will heal 1/8 of the damage that was dealt to the target",
		shortDesc: "Using Bite moves will heal the user 1/8 of the damage dealt.",
		name: 'Vampire',
		rating: 4.5,
		num: -100,
	},
	flytrap: {
		onFoeTrapPokemon(pokemon) {
			if(pokemon.hasType('Bug') && pokemon.isAdjacent(this.effectState.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if(!source) source = this.effectState.target;
			if(!source || !pokemon.isAdjacent(source)) return;
			if(!pokemon.knownType || pokemon.hasType('Bug')) {
				pokemon.maybeTrapped = true;
			}
		},
		name: 'Fly Trap',
		rating: 3,
		num: -101
	},
};