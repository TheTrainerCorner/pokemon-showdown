export const Abilities: {[k: string]: ModdedAbilityData} = {
	//#region Modify Abilities
	wanderingspirit: { // [NERFED]
		inherit: true,
		onStart(pokemon) {
			if (pokemon.abilityState.wanderingSpiritTriggered) return;
			this.field.addPseudoWeather('trickroom');
			pokemon.abilityState.wanderingSpiritTriggered = true;
		},
		desc: "Upon switch-in, Trick Room is activated! Can only be used once per battle!",
		shortDesc: "Upon switch-in, Trick Room is activated! Can only be used once per battle!",
	},
	sharpenedleek: { // [NERFED]
		inherit: true,
		onModifyAtk(atk, pokemon, target, move) {
			return this.chainModify([4506, 4096]);
		},
		desc: "Sharpness + Attack increased by 1.1x",
		shortDesc: "Sharpness + Attack increased by 1.1x",
	},
	vampire: { // [BUFFED] + [CHANGE]
		inherit: true,
		onBasePowerPriority: 5,
		onBasePower(basePower, source, target, move) {
			if (move.flags.bite) return this.chainModify([5120, 4096]);
		},
		onSourceDamagingHit(damage, target, source, move) {
			if (move.flags.bite) {
				this.heal((damage / 5), source, target, "drain");
			}
		},
		desc: "[BUFFED] Bite moves have 1.25 more damage and user heals 1/5 of the damage dealt by bite moves.",
		shortDesc: "Bite moves; 1.25x Damage + 1/5 Healing",
	},
	noguard: { // [NERFED]
		inherit: true,
		onAnyInvulnerabilityPriority: undefined,
		onAnyInvulnerability: undefined,
		onAnyAccuracy: undefined,
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if (target === source) return;

			if(!target.hp) return; // Adding this as we don't want anything to happened if the target is dead!

			this.boost({atk: 1, def: -1}, target);
		},
		desc: "Every move used by or against this Pokemon always hit.If hit, Attack raises by 1 stage, Defense lowers by 1 stage.",
		shortDesc: "Every move used by or against this Pokemon always hit. If Hit, +1 Attack & -1 Defense",
	},
	emulate: {
		inherit:true,
		// This should trigger upon switching in.
		// onSwitchIn(pokemon) {
		// 	// Assuming that this happens before the current pokemon switches out
		// 	this.debug(this.effectState.lastSwitch);
		// 	const currentPokemon = this.effectState.lastSwitch[pokemon.side.id];
		// 	// There is a chance of a pokemon not being active like the first turn.
		// 	if (!currentPokemon) return;
		// 	// We will inject the ability of the assumed current pokemon into effectState to be used in a different event.
		// 	this.effectState.emulateAbility = currentPokemon.ability;
		// 	// This is added so we don't hurt ourselves on turn 1.
		// 	if (!this.effectState.emulateAbility) return;
		// 	if (pokemon.setAbility(this.effectState.emulateAbility)) {
		// 		this.add('-ability', pokemon, this.effectState.emulateAbility, '[from] ability: Emulate', `[of] ${pokemon}`);
		// 	}
		// }
	},
	//#endregion

	//#region New Abilities
	hailthecoin: {
		name: "Hail The Coin",
		// Mind's Eye
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.accuracy && boost.accuracy < 0) {
				delete boost.accuracy;
				if (!(effect as ActiveMove).secondaries) {
					this.add('-fail', target, 'unboost', 'accuracy', '[from] ability: Hail The Coin', `[of] ${target}`);
				}
			}
		},
		onModifyMovePriority: -5,
		onModifyMove(move) {
			move.ignoreEvasion = true;
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
			}
		},
		// Hail The Coin Actual Implementation
		onAfterMove(source, target, move) {
			if (move.name !== "Pay Day") return; 
			let rand = Math.floor(Math.random() * 9);
			this.effectState.paydayAmount = rand + 1 || 1;
			this.add('-start', source, `hailthecoinx${this.effectState.paydayAmount}`, '[silent]');
			this.effectState.paydayTriggered = true;
		},
		onDamage(damage, target, source, effect) {
			if (this.effectState.paydayTriggered! = true) return; 
			let deductAmount = this.effectState.paydayAmount;
			let taxpay = damage;
			for (let i = 0; i < this.effectState.paydayAmount; i++) {
				this.damage( taxpay * 0.05, target);
				this.add('-end', source, `hailthecoinx${deductAmount}`, '[silent]');
				deductAmount--;
				this.add('-start', source, `hailthecoinx${deductAmount}`, '[silent]');
			}

			this.add('-end', source, `hailthecoinx0`, '[silent]');
		},
		num: -3001,
		desc: "When Meowth uses Payday, it shoots up between 1 to 10 coins in the air. Each coin impacts the opponent with 5% (4 damage) of Payday’s damage. Also has Mind's Eye implemented in this ability.",
		shortDesc: "Move Not Payday; Gains 1-5 Coins (Max of 20); When using Payday, each coin does 5% of Payday!",
	},
	gamblersluck: {
		name: "Gambler's Luck",
		onStart(pokemon) {
			const types = this.dex.types.names();
			const randomIndex = Math.floor(Math.random() * types.length);
			let type = types[randomIndex];
			if (type === '???') type = 'Normal';
			this.effectState.gamblersluck = type;
			pokemon.abilityState.gamblersluck = type;
			this.add('-start', pokemon, `gamblersluck${type.toLowerCase()}`, '[silent]');
		},
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (this.effectState.gamblersluck) {
				this.add('-end', pokemon, `gamblersluck${this.effectState.gamblersluck.toLowerCase()}`, '[silent]');
			}
			const types = this.dex.types.names();
			const randomIndex = Math.floor(Math.random() * types.length);
			let type = types[randomIndex];
			if (type === '???') type = 'Normal';
			this.effectState.gamblersluck = type;
			this.add('-start', pokemon, `gamblersluck${type.toLowerCase()}`, '[silent]');
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (!this.effectState.gamblersluck) this.effectState.gamblersluck = 'Normal';

			if (move.type === this.effectState.gamblersluck) return this.chainModify([4915, 4096]);
		},
		rating: 4,
		num: -3002,
		desc: "This Pokemon, at the beginning of each turn, will randomize a type to give a 1.2x damage buff.",
		shortDesc: 'At the start of each turn, this pokemon will gain a 1.2x damage buff to a specific type.',
	},
	absolutezero: {
		name: "Absolute Zero",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				// We will add some logic to make sure that the ability doesn't break on us.
				if (['hail', 'snow'].includes(source.effectiveWeather())) {
					source.side.addSideCondition('auroraveil');
				} else {
					this.field.setWeather('snow');
				}
				this.boost({spa: length}, source);
			}
		},
		num: -3003,
		desc: "This Pokemon's Special Attack is raised by 1 stage, sets Aurora Veil and Snow, if it attacks and knocks out another Pokemon.",
		shortDesc: "This Pokemon's Sp. Atk is raised by 1 stage and sets Aurora veil and Snow, if it attacks and KOes another Pokemon.",
	},
	granitestorm: {
		name: "Granite Storm",
		onDamagingHit(damage, target, source, move) {
			if(move.category === "Physical") {
				this.field.setWeather('sandstorm');
				this.boost({ atk: -1}, source);
				target.side.foe.addSideCondition('stealthrock');
				this.add('-activate', target, 'ability: Granite Storm');
			}
		},
		num: -3004,
		desc: "If the user gets hit by a Physical move, a sandstorm is created, the attacker's Attack will drop by 1 stage, and stealth rocks will be added to it's side",
		shortDesc: "If hit by a Physical Move; Creates a Sandstorm; Lowers the Attacker's Attack by 1 stage;sets rocks.",
	},
	irontechnician: {
		name: "Iron Technician",
		onBasePowerPriority: 30,
		onBasePower(basePower, attacker, defender, move) {
			const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
			this.debug('Base Power: ' + basePowerAfterMultiplier);
			if (basePowerAfterMultiplier <= 60) {
				this.debug('Iron Technician boost');
				return this.chainModify(1.5);
			}
		},
		onStart(pokemon) {
			for (const foe of pokemon.side.foes()) {
				foe.side.addSideCondition('gmaxsteelsurge');
				this.add('-activate', pokemon, 'ability: Iron Technician');
			}
		},
		num: -3005,
		desc: "On switch-in, this Pokemon adds the steelsurge hazard on the opponent's side. This Pokemon also has a 1.5x damage boost to moves with less than 60 base power.",
		shortDesc: "Steelsurge spikes are placed on the opposing Side; This Pokemon's moves of 60 power or less have 1.5x power, including Struggle.",
	},
	
	//#region Firework Event

	lavasurfer: { // PT333
		name: "Lava Surfer",
		onTryHit(target, source, move) {
			if (target !== source && (move.secondaries?.find(x => x.status === "brn") || move.secondary?.status === "brn")) {
				if (!this.boost({spe: 1})) this.add('-immune', target, '[from] ability: Lava Surfer');
				return null;
			}
		},
		desc: "Moves with a chance to burn, deal no damage to this Pokemon and raise it's speed by 1 stage.",
		shortDesc: "Immune to moves that have a chance to burn, and gains +1 Spe.",
		rating: 3,
		num: -3006,
	},

	//#endregion

	//#region Champion Fakemons
	sweettooth: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fairy') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Sweet Tooth');
				}
				return null;
			}
		},
		name: "Sweet Tooth",
		isBreakable: true,
		rating: 3.5,
		num: -3010,
		desc: "This Pokemon is immune to Fairy-type moves and restores 1/4 of its maximum HP, rounded down, when hit by an Fairy-type move.",
		shortDesc: "This Pokemon heals 1/4 of its max HP when hit by Fairy moves; Fairy immunity.",
	},
	//#endregion

	//#endregion

	//#region Staff Addition
	vengefuldesire: {
		name: "Vengeful Desire",
		onTryHit(pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[from] ability: Vengeful Desire');
				return null;
			}
		},
		onDamagePriority: -30,
		onDamage(damage, target, source, effect) {
			if (target.species.id === 'wishiwashisoulless' && target.hp && damage >= target.hp && effect) {
				this.effectState.triggered = true;
				return target.hp - 1;
			}
		},
		onResidualOrder: 29,
		//onResidual(pokemon) {
			//if (pokemon.species.id !== 'wishiwashisoulless') return;
			//if (!this.effectState.triggered) return;
			//this.add('-activate', pokemon, 'ability: Vengeful Desire');
			//pokemon.formeChange('Wishiwashi-Resentful', this.effect, true);
			//this.heal(pokemon.maxhp * 0.75);
		//},
		// Original concept
		onTryMovePriority: 29,
		onTryMove(source, target, move) {
			if (source.species.id !== 'wishiwashisoulless') return;
			if (!this.effectState.triggered) return;
			if(this.effectState.triggered = true){
				this.add('-activate', source, 'ability: Vengeful Desire');
				source.formeChange('Wishiwashi-Resentful', this.effect, true);
				this.heal(source.maxhp * 0.75);
			}
		},
		desc: "If Soulless Wishiwashi were to be knocked out, the fatal damage is negated, it heals 3/4 HP and transforms into Resentful Wishiwashi.",
		shortDesc: "If wishiwashi-Soulless. On knockout, negate damage and transforms into Resentful form",

	},
	emperorscommand: {
		name: "Emperor's Command",
		// The user's +10% atk for moves
		onModifyAtk(atk, source, target, move) {
			return this.chainModify([4506, 4096]);
		},
		// The user's +10% spa for moves
		onModifySpA(atk, source, target, move) {
			return this.chainModify([4506, 4096]);
		},
		// The damage reduction on foes by -10%
		onFoeBasePower(basePower, source, target, move) {
			return this.chainModify([3687, 4096]);
		},
		desc: "Reduces the damage that allied Pokémon receive from attacks (from any Pokémon) by 10%. This pokemon deals 10% more damage with it's attacks.",
		shortDesc: "Reduces the damage allies take by 1/10, Ups damage by 1/10"
	},
	pallesthesia: {
		name: "Pallesthesia",
		onSourceModifyDamage(damage, target, source, effect) {
			const action = this.queue.willMove(source);
			const move = action?.choice === 'move' ? action.move : null;
			if (!move || (move.category === 'Status')) return damage;
			// Assuming that the move does exist and is either a special or physical move, which is a damaging move.
			this.add('-activate', target, 'ability: Pallesthesia');
			return this.chainModify([2868, 4096]);
		},
		onModifyAtk(atk, source, target, move) {
			const action = this.queue.willMove(target);
			const _move = action?.choice === 'move' ? action.move : null;
			if (!_move || (_move.category === 'Physical' || _move.category === 'Special')) return;
			this.add('-activate', source, 'ability: Pallesthesia');
			return this.chainModify([5325, 4096]);
		},
		onModifySpA(atk, source, target, move) {
			const action = this.queue.willMove(target);
			const _move = action?.choice === 'move' ? action.move : null;
			if (!_move || (_move.category === 'Physical' || _move.category === 'Special')) return;
			this.add('-activate', source, 'ability: Pallesthesia');
			return this.chainModify([5325, 4096]);
		},
		desc: "If the target is using a non-damaging move, then the user does 30% more damage; if the target is using a damaging move, then the user will take 30% less damage. The user can also hit Ghost types with Normal and Fighting type moves.",
		shortDesc: "Target: Non-Damaging Move; User does 30% more damage, else takes 30% less damage. Scrappy included.",
	},
	cloakofnightmares: {
		name: "Cloak Of Nightmares",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.boost({atk: -1}, source, target)
			}
		},
		desc: "If a pokemon makes contact with Akumu, Their Attack is dropped by 1 stage.",
		shortDesc: "If a pokemon makes contact with Akumu, Their Attack is dropped by 1 stage.",
	},
	combustion: {
		name: "Combustion",
		onBasePowerPriority: 43,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['explosion']) {
				this.debug('Combustion boost');
				return this.chainModify(1.5);
			}
		},
		shortDesc: "Explosive moves used by this pokemon are 1.5x stronger.",
	},
	dawnoflunacy: {
		name: "Dawn Of Lunacy",
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (pokemon.species.baseSpecies !== 'Cerinyx') return;
		},
		desc: "Switches its signature move between Dark & Attack or Psychic and Special Attack each turn its on the field;",
		shortDesc: "Affects sig. move; Dark/Physical or Psychic/Special each turn",
	},
	allseeing: {
		name: "All Seeing",
		onStart(pokemon) {
			for (const target of pokemon.foes()) {
				if (target.item) {
					this.add('-item', target, target.getItem().name, '[from] ability: All Seeing', '[of] ' + pokemon, '[identify]');
				}
				const item = target.getItem();
				if (pokemon.hp && item.isBerry && target.takeItem(pokemon)) {
					this.add('-enditem', target, item.name, '[from] stealeat', '[ability] All Seeing', '[of] ' + pokemon, '[identify]');
					if (this.singleEvent('Eat', item, null, pokemon, null, null)) {
						this.runEvent('EatItem', pokemon, null, null, item);
						if (item.id === 'leppaberry') target.staleness = 'external';
					}
					if (item.onEat) pokemon.ateBerry = true;
				}
			}
		},
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Psychic'] = true;
			}
		},
		shortDesc: "Psychic-type moves can hit Dark-types. Also Frisks on Switch-In",
	},
	belligerentquills: {
		onAfterMove(source, target, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.damage(target.maxhp / 8, target, source);
			}
		},
		name: "Belligerent Quills",
		desc: "Pokemon taking contact from this Pokemon lose 1/8 of their maximum HP, rounded down.",
		shortDesc: "Pokemon taking contact from this Pokemon lose 1/8 of their maximum HP",
	},
	//#endregion

	//#region Donations
	venomhielaman: {
		name: "Venom Hielaman",
		desc: "This pokemon takes half damage from poisoned foes",
		onSourceModifyDamage(damage, source, target, move) {
			if (['tox', 'psn'].includes(source.status)) {
				this.debug('Venom Hielaman neutralize');
				return this.chainModify(0.50);
			}
		}
	},
	phantasm: {
		name: "Phantasm",
		desc: "Upon switch-in, loses 75% of max HP to create a substitute. Fails if user is under 75% hp.",
		onStart(pokemon) {
			// In case of baton passing actually happened for some reason.
			if (pokemon.volatiles['substitute']) {
				this.add('-fail', pokemon, 'ability: Phantasm');
				return this.NOT_FAIL;
			}

			if (
				// Due to math, we can times the hp by 0.75 to get 75% of the hp.
				(pokemon.hp <= (pokemon.maxhp * 0.75) ) || 
				// Shedinja Case
				(pokemon.maxhp === 1)
			) {
				this.add('-fail', pokemon, 'ability: Substitute', '[weak]');
				return this.NOT_FAIL;
			}
			// This should deal exactly 75% of the damage to the user.
			this.add('-activate', pokemon, 'ability: Phantasm');

			this.directDamage(pokemon.maxhp * 0.75);
			
			pokemon.addVolatile('substitute');
		}
	}

	//#endregion
};