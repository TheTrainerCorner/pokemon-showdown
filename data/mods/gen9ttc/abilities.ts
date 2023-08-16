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
	truant: {
		inherit: true,
		onBeforeMove(pokemon, target, move) {
			if(pokemon.removeVolatile('truant')) {
				if(!move.heal) {
					this.add('cant', pokemon, 'ability: Truant');
					return false;
				}
				return true;
			}
			pokemon.addVolatile('truant');
		},
		shortDesc: "This Pokemon can only use healing moves every other turn.",
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
		shortDesc: "Kicking moves used by this pokemon are 1.3x stronger.",
	},
	phototaxis: {
		onAnyModifyBoost(boosts, pokemon) {
			const unawareUser = this.effectState.target;
			if(unawareUser === pokemon) return;
			if(unawareUser === this.activePokemon && pokemon === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if(pokemon === this.activePokemon && unawareUser === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['def'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		onTryHit(target, source, move) {
			if(target !== source && move.type === 'Electric') {
				if(this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Phototaxis');
				}

				return null;
			}
		},
		isBreakable: true,
		name: "Phototaxis",
		num: -104,
		shortDesc: "Ignores stat changes; Heals 1/4 max HP & immune to Electric type attacks."
	},
	versatility: {
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			this.debug('Versatility boost');
			return this.chainModify([4915, 4096]);
		},
		shortDesc: "All attacking moves used by this Pokemon are increased by 1.2x",
		name: "Versatility",
		num: -105,
		rating: 5,
	},
	artillery: {
		onAfterMove(source, target, move) {
			if(move.category !== 'Status') {
				source.clearBoosts();
				this.add('-clearboost', source, '[from] ability: Artillery');
			} else {
				this.boost({spa: 1});
			}
		},
		name: "Artillery",
		shortDesc: "When this pokemon doesn't use a damaging move, Special Attack raises by 1 stage; Removes all positive stats after using a damaging move.",
		num: -106,
		rating: 4,
	},
	radiatinglight: {
		//#region Lightning Rod
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if(!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Radiating Light');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Electric' || move.flags['pledgecombo']) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if(this.validTarget(this.effectState.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectState.target !== target) {
					this.add('-activate', this.effectState.target, 'ability: Radiating Light');
				}
				return this.effectState.target;
			}
		},
		//#endregion
		//#region Electric Surge
		onStart(source) {
			this.field.setTerrain('electricterrain');
		},
		//#endregion
		isBreakable: true,
		name: 'Radiating Light',
		shortDesc: "Lightning Rod + Electric Terrain",
		num: -107,
		rating: 5,
	},
	mightyfire: {
		//#region Drought
		onStart(source) {
			for (const action of this.queue) {
				if (action.choice === 'runPrimal' && action.pokemon === source && source.species.id === 'groudon') return;
				if (action.choice !== 'runSwitch' && action.choice !== 'runPrimal') break;
			}
			this.field.setWeather('sunnyday');
		},
		//#endregion
		//#region Flash Fire
		onTryHit(target, source, move){
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				if (!target.addVolatile('flashfire')) {
					this.add('-immune', target, '[from] ability: Flash Fire');
				}
				return null;
			}
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('flashfire');
		},
		//#endregion
		isBreakable: true,
		name: "Mighty Fire",
		shortDesc: "Drought + Flash Fire",
		num: -108,
		rating: 5,
	},
	silentwater: {
		//#region Storm Drain
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Storm Drain');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Water' || move.flags['pledgecombo']) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectState.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectState.target !== target) {
					this.add('-activate', this.effectState.target, 'ability: Storm Drain');
				}
				return this.effectState.target;
			}
		},
		//#endregion
		//#region Misty Surge
		onStart(source) {
			this.field.setTerrain('mistyterrain');
		},
		//#endregion
		isBreakable: true,
		name: 'Silent Water',
		shortDesc: 'Storm Drain + Misty Surge',
		num: -109,
		rating: 5,
	},
	elemental: {
		onSourceModifyAccuracy(accuracy, target, source, move) {
			if (!source.types.includes(move.type)) return;
			if (typeof accuracy !== 'number') return;
			this.debug('elemental - enhancing accuracy');
			return this.chainModify([5325, 4096]);
		},
		onSourceModifyAccuracyPriority: -1,
		name: "Elemental",
		shortDesc: "STAB moves accuracy are boosted by 1.3x",
		rating: 3,
		num: -110,
	},
	cleanup: {
		onStart(pokemon) {
			let activated = false;
			for(const sideCondition of ['stealthrocks', 'toxicspikes', 'spikes', 'stickywebs']){
				for(const side of [pokemon.side, ...pokemon.side.foeSidesWithConditions()]) {
					if(side.getSideCondition(sideCondition)) {
						if(!activated) {
							this.add('-activate', pokemon, 'ability: Screen Cleaner');
							activated = true;
						}
						side.removeSideCondition(sideCondition);
					}
				}
			}
		},
		name: "Clean Up",
		shortDesc: "On Switch-In, all hazards are removed",
		rating: 5,
		num: -111,
	},
	grasspelt: {
		inherit: true,
		onModifyDefPriority: 6,
		onModifySpDPriority: 6,
		onModifyDef(pokemon) {
			if (this.field.isTerrain('grassyterrain')) return this.chainModify(1.5);
			else return this.chainModify(1.25);
		},
		onModifySpD(pokemon) {
			if (this.field.isTerrain('grassyterrain')) return this.chainModify(1.5);
			else return this.chainModify(1.25);
		},
		shortDesc: 'If Grassy Terrain, 1.5x boost to Def and Sp.Def;Without Grassy Terrain, 1.25x to Def and Sp.Def.',
	},
	honeygather: {
		inherit: true,
		onTryHeal(damage, target, source, effect) {
			const heals = ['drain', 'leechseed', 'ingrain', 'aquaring', 'strengthsap'];
			if(heals.includes(effect.id)) {
				return this.chainModify(1.2);
			}
		},
		shortDesc: "Gains 1.2x more healing when using a move with a recovery secondary effect."
	},
	emergencyexit: {
		onBeforeTurn(pokemon) {
			pokemon.abilityState.originalHP = pokemon.hp;
		},
		onStart(pokemon) {
			pokemon.abilityState.originalHP = pokemon.hp;
		},
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2 && pokemon.abilityState.originalHP > pokemon.maxhp / 2) {
				if (!this.canSwitch(pokemon.side) || pokemon.forceSwitchFlag || pokemon.switchFlag) return;
				for (const side of this.sides) {
					for (const active of side.active) {
						active.switchFlag = false;
					}
				}
				pokemon.switchFlag = true;
				this.add('-active', pokemon, 'ability: Emergency Exit');
			}
		},
		shortDesc: "If this Pokemon is below 1/2 HP at the end of the turn, it switches out.",
		name: "Emergency Exit",
		rating: 1,
		num: 194,
	},
	watercompaction: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if(move.type == 'Water') {
				return this.chainModify(0.25);
			}
		},
		desc: "This Pokemon takes 25% less damage from Water-type moves, and its Defense is raised 2 stages after it is hit by one.",
		shortDesc: "Reduces water damage by 25%; +2 def when hit by water move",
	}
};