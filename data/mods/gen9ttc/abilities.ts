export const Abilities: {[k: string]: ModdedAbilityData} = {
	// Mod Abilities
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
	forecast: {
		inherit: true,
		onStart(pokemon) {
			if(pokemon.hasItem('damprock')) this.field.setWeather('raindance');
			else if(pokemon.hasItem('heatrock')) this.field.setWeather('sunnyday');
			else if(pokemon.hasItem('smoothrock')) this.field.setWeather('sandstorm');
			else if(pokemon.hasItem('icyrock')) this.field.setWeather('snow');
		},
		desc: "If this pokemon is a Castorm, its type changes to the current weather, as well as summons weather depending on the weather rock it is holding.",
		shortDesc: "Summons weather based on held weather rock, then changes types to match the weather."
	},
	// New Abilities
	vampire: {
		onModifyMove(move, pokemon, target) {
			if(move.flags['bite']) {
				move.drain = [1, 8];
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
		desc: "Prevents opposing Bug-type Pokemon from choosing to switch out, unless they are holding a Shed Shell.",
		shortDesc: "Prevents opposing Bug-type Pokemon from choosin to switch out.",
		rating: 3,
		num: -101
	},
	baller: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if(move.flags['bullet']) {
				this.debug('Baller boost');
				return this.chainModify(1.3);
			}
		},
		shortDesc: "This Pokemon's bullet moves have their power multiplied by 1.3.",
		name: "Baller",
		rating: 3.5,
		num: -102,
	},
	legday: {
		onBasePowerPriority: 43,
		onBasePower(basePower, attacker, defender, move) {
			if(move.flags['kick']) {
				this.debug('Leg Day Boost');
				return this.chainModify([5325, 4096]);
			}
		},
		name: "Leg Day",
		rating: 3,
		gen: 8,
		desc: "",
		shortDesc: "",
	}
};