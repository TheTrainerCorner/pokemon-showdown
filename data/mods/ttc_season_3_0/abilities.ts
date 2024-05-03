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
	noguard: {
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
		desc: "If hit, Attack raises by 1 stage, Defense lowers by 1 stage.",
		shortDesc: "If Hit, +1 Attack & -1 Defense",
	},
	emulate: {
		inherit:true,
		onAllyAfterSwitchInSelf(pokemon) {
			if (!this.effectState.target.hp) return;
			const ability = pokemon.getAbility();
			const additionalBannedAbilities = [
				'noability'
			];
			if (pokemon.getAbility().isPermanent || additionalBannedAbilities.includes(pokemon.ability)) return;
			if (this.effectState.target.setAbility(ability)) {
				this.add('-ability', this.effectState.target, ability, '[from] ability: Emulate', '[of] ' + pokemon);
			}
		},
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
		onResidual(pokemon) {
			if (!this.effectState.paydayTriggered) return;

			let deductAmount = this.effectState.paydayAmount;
			for (let i = 0; i < this.effectState.paydayAmount; i++) {
				for (const target of pokemon.foes()) {
					this.damage(80 * 0.05, target, pokemon);
				}
				this.add('-end', pokemon, `hailthecoinx${deductAmount}`, '[silent]');
				deductAmount--;
				this.add('-start', pokemon, `hailthecoinx${deductAmount}`, '[silent]');
			}

			this.add('-end', pokemon, `hailthecoinx0`, '[silent]');
			this.effectState.paydayTriggered = false;
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
				this.boost({spa: length}, source);
				this.field.setWeather('snow');
				target.side.addSideCondition('auroraveil', source);
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

	//#endregion
};