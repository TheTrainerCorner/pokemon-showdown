export const Abilities: {[k: string]: ModdedAbilityData} = {
	// Mod Abilities
	solarpower: {
		inherit: true,
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		desc: "If Sunny Day is active, this Pokemon's Special Attack and Attack is multiplied by 1.5 and it loses 1/8 of its maximum HP, rounded down, at the end of each turn. These effects are prevented if the Pokemon is holding a Utility Umbrella.",
		shortDesc: "If Sunny Day is active, this Pokemon's Sp. Atk and Atk is 1.5x; loses 1/8 max HP per turn.",
	},
	surgesurfer: {
		inherit: true,
		onModifySpe(spe) {
			if (this.field.isTerrain(['electricterrain', 'psychicterrain', 'mistyterrain', 'grassyterrain'])) { return this.chainModify(1.3); }
		},
	},
	forecast: {
		inherit: true,
		onStart(pokemon) {
			if (pokemon.hasItem('damprock')) this.field.setWeather('raindance');
			else if (pokemon.hasItem('heatrock')) this.field.setWeather('sunnyday');
			else if (pokemon.hasItem('smoothrock')) this.field.setWeather('sandstorm');
			else if (pokemon.hasItem('icyrock')) this.field.setWeather('snow');
		},
		desc: "If this pokemon is a Castorm, its type changes to the current weather, as well as summons weather depending on the weather rock it is holding.",
		shortDesc: "Summons weather based on held weather rock, then changes types to match the weather.",
	},
	truant: {
		inherit: true,
		onBeforeMove(pokemon, target, move) {
			if (pokemon.removeVolatile('truant')) {
				if (!move.heal) {
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
			if (move.flags['bite']) {
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
			if (pokemon.hasType('Bug') && pokemon.isAdjacent(this.effectState.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectState.target;
			if (!source || !pokemon.isAdjacent(source)) return;
			if (!pokemon.knownType || pokemon.hasType('Bug')) {
				pokemon.maybeTrapped = true;
			}
		},
		name: 'Fly Trap',
		desc: "Prevents opposing Bug-type Pokemon from choosing to switch out, unless they are holding a Shed Shell.",
		shortDesc: "Prevents opposing Bug-type Pokemon from choosing to switch out.",
		rating: 3,
		num: -101,
	},
	baller: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bullet']) {
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
			if (move.flags['kick']) {
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
			if (unawareUser === pokemon) return;
			if (unawareUser === this.activePokemon && pokemon === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (pokemon === this.activePokemon && unawareUser === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['def'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Phototaxis');
				}

				return null;
			}
		},
		isBreakable: true,
		name: "Phototaxis",
		num: -104,
		shortDesc: "Ignores stat changes; Heals 1/4 max HP & immune to Electric type attacks.",
	},
	versatility: {
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			this.debug('Versatility boost');
			return this.chainModify([5325, 4096]);
		},
		shortDesc: "All attacking moves used by this Pokemon are increased by 1.3x",
		name: "Versatility",
		num: -105,
		rating: 5,
	},
	artillery: {
		onAfterMove(source, target, move) {
			if (move.category !== 'Status') {
				source.clearBoosts();
				this.add('-clearboost', source, '[from] ability: Artillery');
			} else {
				this.boost({spa: 1});
			}
		},
		name: "Artillery",
		desc: "When this pokemon doesn't use a damaging move, Special Attack raises by 1 stage; Removes all positive stats after using a damaging move.",
		shortDesc: "Non-Damaging Move = +1 SpA; Damaging Move = Removes all Positive Stat Changes",
		num: -106,
		rating: 4,
	},
	radiatinglight: {
		// #region Lightning Rod
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Radiating Light');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Electric' || move.flags['pledgecombo']) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectState.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectState.target !== target) {
					this.add('-activate', this.effectState.target, 'ability: Radiating Light');
				}
				return this.effectState.target;
			}
		},
		// #endregion
		// #region Electric Surge
		onStart(source) {
			this.field.setTerrain('electricterrain');
		},
		// #endregion
		isBreakable: true,
		name: 'Radiating Light',
		shortDesc: "Lightning Rod + Electric Terrain",
		num: -107,
		rating: 5,
	},
	mightyfire: {
		// #region Drought
		onStart(source) {
			for (const action of this.queue) {
				if (action.choice === 'runPrimal' && action.pokemon === source && source.species.id === 'groudon') return;
				if (action.choice !== 'runSwitch' && action.choice !== 'runPrimal') break;
			}
			this.field.setWeather('sunnyday');
		},
		// #endregion
		// #region Flash Fire
		onTryHit(target, source, move) {
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
		// #endregion
		isBreakable: true,
		name: "Mighty Fire",
		shortDesc: "Drought + Flash Fire",
		num: -108,
		rating: 5,
	},
	silentwater: {
		// #region Storm Drain
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
		// #endregion
		// #region Misty Surge
		onStart(source) {
			this.field.setTerrain('mistyterrain');
		},
		// #endregion
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
			return this.chainModify([4915, 4096]);
		},
		onSourceModifyAccuracyPriority: -1,
		name: "Elemental",
		shortDesc: "STAB moves accuracy are boosted by 1.2x",
		rating: 3,
		num: -110,
	},
	cleanup: {
		onStart(pokemon) {
			this.add('-activate', pokemon, 'ability: Clean Up');
			let success = false;
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			for (const sideCondition of removeAll) {
				if (pokemon.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', pokemon.side, this.dex.conditions.get(sideCondition).name, '[from] ability: Clean Up', '[of] ' + pokemon);
					success = true;
				}
				if (pokemon.adjacentFoes()[0].side.removeSideCondition(sideCondition)) {
					this.add('-sideend', pokemon.adjacentFoes()[0].side, this.dex.conditions.get(sideCondition).name, '[from] ability: Clean Up', '[of] ' + pokemon);
					success = true;
				}
			}
			return success;
		},
		name: "Clean Up",
		shortDesc: "On Switch-In, all hazards are removed",
		rating: 5,
		num: -111,
	},
	grasspelt: {
		inherit: true,
		onModifyDefPriority: 6,
		onModifyDef(pokemon) {
			if (this.field.isTerrain('grassyterrain')) return this.chainModify(1.5);
			else return this.chainModify(1.25);
		},
		onModifySpDPriority: 6,
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
			if (heals.includes(effect.id)) {
				return this.chainModify(1.2);
			}
		},
		shortDesc: "Gains 1.2x more healing when using a move with a recovery secondary effect.",
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
				this.add('-activate', pokemon, 'ability: Emergency Exit');
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
			if (move.type == 'Water') {
				return this.chainModify(0.5);
			}
		},
		desc: "This Pokemon takes 50% less damage from Water-type moves, and its Defense is raised 2 stages after it is hit by one.",
		shortDesc: "Reduces water damage by 50%; +2 def when hit by water move",
	},
	steamengine: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (['Water', 'Fire'].includes(move.type)) {
				return this.chainModify(0.5);
			}
		},
		desc: "This Pokemon's Speed is raised by 6 stage and takes 50% less damage from Water and Fire type Moves.",
		shortDesc: "This Pokemon's Speed is raised by 6 stage and takes 50% less damage when hit by a Water or Fire type move.",
	},
	bugout: {
		onModifyDamage(relayVar, source, target, move) {
			if (move.type == 'Bug') {
				this.debug('Bug Out boost');
				return this.chainModify(1.5);
			}
		},
		name: "Bug Out",
		num: -112,
		desc: "All bug moves are boosted by 1.5x from this pokemon.",
		shortDesc: "All Bug-type Moves are boosted by 1.5x from this Pokemon.",
	},
	gulpmissile: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (!source.hp || !source.isActive || target.transformed || target.isSemiInvulnerable()) return;
			if (['cramorantgulping', 'cramorantgorging'].includes(target.species.id)) {
				this.damage(source.baseMaxhp / 4, source, target);
				if (target.species.id === 'cramorantgulping') {
					this.boost({def: -1}, source, target, null, true);
				} else {
					source.trySetStatus('par', target, move);
				}
				// Refreshing the forme change
				if ((['raindance', 'primordialsea'].includes(target.effectiveWeather()) && this.randomChance(1, 2)) || this.randomChance(1, 4)) {
					const forme = target.hp <= target.maxhp / 2 ? 'cramorantgorging' : 'cramorantgulping';
					target.formeChange(forme);
				} else {
					target.formeChange('cramorant', move);
				}
			}
		},

		shortDesc: 'When hit after gulping/gorging, attacker takes 1/4 max HP and -1 Def or Para; 1/2 Reset in rain, else 1/4.',
	},
	fishbuffet: {
		onModifyDamage(damage, source, target, move) {
			if (target.getTypes().includes('Water') && move.category === 'Physical') {
				this.add('-activate', source, 'ability: Fish Buffet');
				return this.chainModify(1.5);
			}
		},
		name: "Fish Buffet",
		num: -113,
		desc: "All physical moves used will deal Super Effective damage to water types",
		shortDesc: "All phsyical moves used will deal Super Effective damage to water types",
	},
	battlepride: {
		// Intrepid Sword
		onStart(pokemon) {
			if (this.effectState.swordBoost) return;
			if (this.boost({atk: 1}, pokemon)) {
				this.effectState.swordBoost = true;
			}
		},
		// Stamina
		onDamagingHit(damage, target, source, effect) {
			this.boost({def: 1});
		},
		name: "Battle Pride",
		num: -114,
		desc: "Intrepid Sword + Stamina",
		shortDesc: "Intrepid Sword + Stamina",
	},
	pigout: {
		onResidual(pokemon) {
			if (this.randomChance(1, 2)) {
				const rand = this.random(3) + 1;

				switch (rand) {
				case 1:
					// Strius Berry
					this.debug('Consume Strius Berry');
					if (!(this.runEvent('TryHeal', pokemon))) return false;
					this.heal(pokemon.baseMaxhp / 4);
					break;
				case 2:
					// Lum Berry
					this.debug('Consume Lum Berry');
					if (pokemon.status || pokemon.volatiles['confusion']) {
						pokemon.cureStatus();
						pokemon.removeVolatile('confusion');
					}

					break;
				case 3:
					// Straf Berry
					this.debug('Consume Starf Berry');
					const stats: BoostID[] = [];
					let stat: BoostID;
					for (stat in pokemon.boosts) {
						if (stat !== 'accuracy' && stat !== 'evasion' && pokemon.boosts[stat] > 6) {
							stats.push(stat);
						}
					}
					if (stats.length) {
						const randomStat = this.sample(stats);
						const boost: SparseBoostsTable = {};
						boost[randomStat] = 2;
						this.boost(boost);
					}
					break;
				}
			}
		},
		name: "Pig Out",
		num: -115,
		desc: "Every turn, 50% chance to find and immediately consume 1 of 3 potential berries; Sitrus Berry, Lum Berry, or Starf Berry.",
		shortDesc: "50% chance to eat 1 of 3 Berries; Sitrus, Lum, or Starf",
	},
	plunder: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Plunder', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({def: -1}, target, pokemon, null, true);
					this.add('-start', pokemon, 'Plunder');
					target.addVolatile('embargo');
					this.singleEvent('End', target.getItem(), pokemon.itemState, target);
				}
			}
		},
		onResidualOrder: 21,
		onEnd(pokemon) {
			for (const target of pokemon.adjacentFoes()) {
				target.removeVolatile('embargo');
				this.add('-end', target, 'Plunder');
			}
		},
		name: "Plunder",
		num: -116,
		desc: "Upon switch-in, opponet loses access to current item while this pokemon is out and lowers defense by 1 stage.",
		shortDesc: "Upon switch-in, -1 def to target; Adds embargo to target",
	},
	neurophysics: {
		onDamagingHit(damage, target, source, move) {
			this.field.setTerrain('electricterrain');
		},
		name: "Neurophysics",
		num: -117,
		desc: "When this Pokemon is hit by an attack, the effect of Electric Terrain begins.",
		shortDesc: "When this Pokemon is hit by an attack, the effect of Electric Terrain begins.",
	},
	terraforming: {
		onStart(pokemon) {
			this.field.clearTerrain();
			this.field.clearWeather();
		},
		name: "Terraforming",
		num: -118,
		desc: "Upon switch-in, Terrain and/or Weather is removed from the field.",
		shortDesc: "Upon switch-in, Terrain and/or Weather is removed from the field.",
	},
	hammerdown: {
		onBasePowerPriority: 43,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['hammer']) {
				this.debug('Leg Day Boost');
				return this.chainModify([5325, 4096]);
			}
		},
		name: "Hammer Down",
		num: -119,
		desc: "Boosts hammer moves by 1.3x",
		shortDesc: "Boosts hammer moves by 1.3x",
	},
	innersolstice: {
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Fire') {
				this.add('-activate', target, 'ability: Inner Solstice');
				this.boost({atk: 1, def: 1, spd: 1});
				const oldAbility = target.setAbility('fluffy');
				if (oldAbility) {
					this.add('-ability', target, target.getAbility().name, '[from] ability: Inner Solstice');
					return;
				}
				return oldAbility as false | null;
			}
		},
		name: "Inner Solstice",
		num: -120,
		desc: "Upon being hit by a fire move, this Pokemon's Atk, Def & SpDef are raised by one stage; ability is then changed to Fluffy",
		shortDesc: "If hit by a Fire move, + 1 Atk, Def, and SpDef; Ability changes to Fluffy",
	},
	naturesgift: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Grass') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, "[from] ability: Nature's Gift");
				}
				return null;
			}
		},
		isBreakable: true,
		name: "Nature's Gift",
		rating: 3.5,
		num: -121,
		desc: "This Pokemon is immune to Grass-type moves and restores 1/4 of its maximum HP, rounded down, when hit by a Grass-type move.",
		shortDesc: "This Pokemon heals 1/4 of its max HP when hit by Grass moves; Grass immunity.",
	},
	garbagedisposal: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Steel') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, "[from] ability: Garbage Disposal");
				}
				return null;
			}
		},
		isBreakable: true,
		name: "Garbage Disposal",
		rating: 3.5,
		num: -122,
		desc: "This Pokemon is immune to Steel-type moves and restores 1/4 of its maximum HP, rounded down, when hit by a Steel-type move.",
		shortDesc: "This Pokemon heals 1/4 of its max HP when hit by Steel moves; Steel immunity.",
	},
};
