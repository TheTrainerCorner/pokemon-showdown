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
		name: 'Iron Deposit',
		onSwitchIn(pokemon) {
			for (const foe of pokemon.side.foes()) {
				if (pokemon.abilityState.SteelSpikesTriggered) return;
					pokemon.abilityState.SteelSpikesTriggered = true;
					foe.side.addSideCondition('gmaxsteelsurge');
					this.add('-activate', pokemon, 'ability: Iron Technician');
			}
		},
		shortDesc: "On switch-in, sets Steelsurge spikes on the opposing side.",
		desc: "On switch-in, this Pokemon sets Steelsurge spikes on the opposing side. Once per Turn",
	},
	enlightenment: {
		name: 'Enlightenment',
		onSourceModifyDamage(relayVar, source, target, move) {
			let mod = 1;
			if (move.type === 'Dark') mod *= 2;
			if (move.category === 'Special') mod /2;
			return this.chainModify(mod);
		},
		isBreakable: true,
		num: -5004,
		gen: 9,
		shortDesc: "This Pokemon takes 2x damage from Dark moves and 0.5x from Special moves.",
		desc: "This Pokemon takes double damage from Dark-type moves and half damage from Special moves.",
	},
	stormbringer: {
		name: 'Stormbringer',
		onStart(pokemon) {
			this.field.setWeather('raindance');
			this.field.setTerrain('electricterrain');
		},
		isBreakable: true,
		num: -5005,
		gen: 9,
		shortDesc: "On switch-in, sets Rain Dance and Electric Terrain.",
		desc: "On switch-in, this Pokemon sets Rain Dance and Electric Terrain.",
	},
	supremehatred: {
		name: 'Supreme Hatred',
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Dark') {
				this.boost({atk: 1});
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.atk && boost.atk < 0) {
				delete boost.atk;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "Attack", "[from] ability: Hyper Cutter", "[of] " + target);
				}
			}
		},
		shortDesc: "Raises Attack by 1 if hit by a Dark move. Prevents Attack drops.",
		desc: "If this Pokemon is hit by a Dark-type move, its Attack is raised by 1 stage. This Pokemon's Attack cannot be lowered by other Pokemon's moves or abilities.",
	},
	perfectsync: {
		name: 'Perfect Sync',
		onTryHit(target, source, move) {
			if (target !== source && target.isAlly(source) && move.category !== 'Status') {
				this.add('-activate', target, 'ability: Telepathy');
				return null;
			}
		},
		onModifyAccuracyPriority: 10,
		onModifyAccuracy(accuracy, target, source, move) {
			if (move.category === 'Status' && typeof accuracy === 'number') {
				this.debug('Wonder Skin - setting accuracy to 50');
				return 50;
			}
		},
		shortDesc: "This Pokemon's allies cannot be damaged by its moves. Status moves used by allies have 50% accuracy.",
		desc: "This Pokemon's allies cannot be damaged by its moves. Additionally, status moves used by allies have their accuracy set to 50%.",
	},
	// Mod Abilities
	rockypayload: {
		inherit: true,
		onAnyDamage(damage, target, source, effect) {
			if (effect && effect.name === 'Stealth Rock') {
				if (!target.addVolatile('rockypayload')) {
					this.add('-immune', target, '[from] ability: Rocky Payload');
				}
				return false;
			}
		}
	},
	roughskin: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.damage(source.baseMaxhp / 16, source, target);
			}
		},
		onSourceDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				this.damage(target.baseMaxhp / 16, target, source);
			}
		},
		desc: "Contact moves from the user or target causes the target to lose 1/16 of their max HP.",
		shortDesc: "Contact moves from the user or target cause the target to lose 1/16 of their max HP.",
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
		onModifyAtkPriority: undefined,
		onModifyAtk: undefined,
		onModifySpAPriority: undefined,
		onModifySpA: undefined,
		onStart(pokemon) {
			if (pokemon.side.totalFainted) {
				this.add('-ability', pokemon, 'ability: Defeatist');
				const fallen = Math.min(pokemon.side.totalFainted, 5);
				this.add('-start', pokemon, `fallen${fallen}`, '[silent]');
				this.effectState.fallen = fallen;
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, `fallen${this.effectState.fallen}`, '[silent]');
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.effectState.fallen) {
				const powMod = [4915, 4424, 3981, 3583, 3225];
				this.debug(`Defeatist weaken: ${powMod[this.effectState.fallen]}/4096`);
				return this.chainModify(powMod[this.effectState.fallen], 4096);
			}
		},
		desc: "This Pokemon deals 1.2x damage with damaging moves. Lose 10% Attack and Special Attack per ally fainted.",
		shortDesc: "Deals 1.2x damage. Loses 10% Atk & SpA per ally fainted.",
	},
	filter: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && ['Poison', 'Rock'].includes(move.type)) {
				if (!this.heal(target.baseMaxhp / 8)) {
					this.add('-immune', target, '[from] ability: Filter');
				}
			}
		},
		desc: "Takes 3/4 supereffective damage; Poison & Rock attacks heal 1/8 max HP.",
		shortDesc: "Takes 3/4 supereffective damage; Poison & Rock attacks heal 1/8 max HP.",
	},
	powerspot: {
		inherit: true,
		onResidual: undefined,
		onResidualOrder: undefined,
		onResidualSubOrder: undefined,
		onBasePower(basePower, attacker, defender, move) {
			return this.chainModify(1.3);
		},
		onAllyBasePower(basePower, attacker, defender, move) {
			return this.chainModify(1.3);
		},
		desc: "This Pokemon and its allies have their base power multiplied by 1.3x.",
		shortDesc: "This Pokemon and its allies have 1.3x base power.",
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
	steadfast: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (this.effectState.target) {
				const powMod = [4096, 4505, 4915, 5325, 5734, 6144];
				const finalMod = powMod[this.effectState.target.steadfastBoosts] || 4096;
				this.debug(`Steadfast boost: ${finalMod}/4096`);
				return this.chainModify(finalMod, 4096);
			}
		}
	},
};