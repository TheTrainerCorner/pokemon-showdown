export const Abilities: {[k: string]: ModdedAbilityData} = {
	disasterzone: {
		name: 'Disaster Zone',
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['disaster']) {
				this.debug('Disaster Zone boost');
				return this.chainModify([4915, 4096]);
			}
		},
		desc: "This Pokemon's disaster-based moves have their power multiplied by 1.2x.",
		shortDesc: "This Pokemon's disaster-based moves have 1.2x power. Sucker Punch is not boosted.",
		num: -5001,
		gen: 9,
	},
	kinglypresence: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Kingly Presence', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({ atk: -1 }, target, pokemon, null, true);
					target.addVolatile('embargo', pokemon);
				}
			}
		},
		name: 'Kingly Presence',
		shortDesc: "On switch-in, lowers the target's Atk and places embargo on them for 2 turns.",
		num: -5002,
		gen: 9,
	},
	toxicindulgence: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if ((attacker.status === 'psn' || attacker.status === 'tox') && move.category === 'Physical') {
				return this.chainModify(1.5);
			}
		},
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect.id === 'psn' || effect.id === 'tox') {
				this.heal(target.baseMaxhp / 8);
				return false;
			}
		},
		name: "Toxic Indulgence",
		shortDesc: "If poisoned, Physical Moves deal 1.5x more damage. Heals 1/8 max hp each turn. Immune to Poison.",
		num: -5003,
		gen: 9,
	},
	irondeposit: {
		name: 'Iron Deposit', // Placeholder for right now.
	},
	// Mod Abilities
	rockypayload: {
		inherit: true,
	},
	roughskin: {
		inherit: true,
		onSourceDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				this.damage(target.baseMaxhp / 8, target, source);
			}
		},
		desc: "Contact moves from the user or target causes the target to lose 1/8 of their max HP.",
		shortDesc: "Contact moves from the user or target cause the target to lose 1/8 of their max HP.",
	},
	zenmode: {
		inherit: true,
		onResidual: undefined,
		onResidualOrder: undefined,
		onStart(pokemon) {
			pokemon.addVolatile('zenmode');
		},
		desc: "If this Pokemon is a Darmanitan or Galarian Darmanitan, it changes to its Zen Mode forme when it enters battle.",
		shortDesc: "If this Pokemon is a Darmanitan or Galarian Darmanitan, it changes to its Zen Mode forme when it enters battle.",
	},
	rkssystem: {
		inherit: true,
		onPrepareHit: undefined,
		onSwitchIn: undefined,
		shortDesc: "If this Pokemon is a Silvally, its type changes to match its held Memory.",
		desc: undefined,
	},
	pickpocket: {
		inherit: true,
		onFoeModifyDamage: undefined,
		desc: "Steals the attacking Pokemon's Item if not holding one."
	},
	teravolt: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Electric' && defender.types.includes('Ground')) {
				this.debug('Teravolt nerf damaged');
				return this.chainModify(0.5);
			}
		},
		desc: "Ignores the ability of the opposing Pokemon; Electric-type moves can hit Ground-types, however deals resisted damage.",
		shortDesc: "Ignores the ability of the opposing Pokemon; Electric-type moves can hit Ground-types, with resisted damage."
	},
	defeatist: {
		inherit: true,
		// Not adding this in till we talk about it.
	},
	powerspot: {
		inherit: true,
	},
	ballfetch: {
		inherit: true,
		condition: {
			onModifySpePriority: 6,
			onModifySpe(spe, pokemon) {
				return this.chainModify(1.2);
			},
		},
		shortDesc: "Speed is 1.2x if the Pokemon is holding a ball shaped item!",
		desc: undefined,
	},
	windrider: {
		inherit: true,
		onStart(pokemon) {
			if (pokemon.side.sideConditions['tailwind']) {
				this.boost({ atk: 1, spa: 1 }, pokemon, pokemon);
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.flags['wind']) {
				if (!this.boost({ atk: 1, spa: 1 }, target, target)) {
					this.add('-immune', target, '[from] ability: Wind Rider');
				}
				return null;
			}
		},
		onAllySideConditionStart(target, source, sideCondition) {
			const pokemon = this.effectState.target;
			if (sideCondition.id === 'tailwind') {
				this.boost({ atk: 1, spa: 1 }, pokemon, pokemon);
			}
		},
		desc: "This Pokemon is immune to wind moves and raises its Attack and Special Attack by 1 stage when hit by a wind move or when Tailwind begins on this Pokemon's side.",
		shortDesc: "Atk & Sp. Atk raised by 1 if hit by a wind move or Tailwind begins. Wind move immunity."
	},
	flowergift: {
		inherit: true,
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (this.effectState.target.baseSpecies.name !== 'Cherrim') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onModifyDefPriority: 5,
		onModifyDef(def, pokemon) {
			if (this.effectState.target.baseSpecies.name !== 'Cherrim') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 5,
		onModifySpD(spd, pokemon) {
			if (this.effectState.target.baseSpecies.name !== 'Cherrim') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		desc: "If this Pokemon is a Cherrim and Sunny Day is active, it changes to Sunshine Form and all stats of it and its allies are multiplied by 1.5. These effects are prevented if the Pokemon is holding a Utility Umbrella.",
		shortDesc: "If user is Cherrim and Sunny Day is active, it and allies gain 1.5x boost in all stats.",
	},
	gamblersluck: {
		inherit: true,
		onStart(pokemon) {
			const eeveeTypes = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Psychic', 'Dark', 'Fairy', 'Cosmic'];
			const randomIndex = Math.floor(Math.random() * eeveeTypes.length);
			let type = eeveeTypes[randomIndex];
			this.effectState.gamblersluck = type;
			pokemon.abilityState.gamblersluck = type;
			this.add('-start', pokemon, `gamblersluck${type.toLowerCase()}`, '[silent]');
		},
		onResidual(pokemon) {
			if (this.effectState.gamblersluck) {
				this.add('-end', pokemon, `gamblersluck${this.effectState.gameblersluck.toLowerCase()}`, '[silent]');
			}
			const eeveeTypes = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Psychic', 'Dark', 'Fairy', 'Cosmic'];
			const randomIndex = Math.floor(Math.random() * eeveeTypes.length);
			let type = eeveeTypes[randomIndex];
			this.effectState.gamblersluck = type;
			pokemon.abilityState.gamblersluck = type;
			this.add('-start', pokemon, `gamblersluck${type.toLowerCase()}`, '[silent]');
		},
		desc: "This Pokemon, at the beginning of each turn, will randomize an Eeveelution type to give a 1.2x damage boost.",
		shortDesc: "At the start of each turn, randomizes an Eeveelution type for 1.2x damage boost.",
	},
	sandforce: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isWeather('sandstorm')) {
				if (['Rock', 'Ground', 'Steel'].includes(move.type)) {
					this.debug('Sand Force boost');
					return this.chainModify(1.5);
				}
			}
		},
		desc: "If Sandstorm is active, this Pokemon's Ground-, Rock-, and Steel-type attacks have their power multiplied by 1.5. This Pokemon takes no damage from Sandstorm.",
		shortDesc: "This Pokemon's Ground/Rock/Steel attacks do 1.5x in Sandstorm; immunity to it.",
	},
};