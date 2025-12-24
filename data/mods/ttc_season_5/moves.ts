export const Moves: {[k: string]: ModdedMoveData} = {
	piercingdoom: {
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		name: "Piercing Doom",
		pp: 1,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		status: 'tox',
		onHit(target, source, move) {
			source.addVolatile('perishsong', source, move);
			source.addVolatile('trapped', source, move, 'trapper');
		},
		target: "normal",
		type: "Bug",
		desc: "Badly poisons the target. The user is affected by Perish Song and is trapped.",
		shortDesc: "Badly poisons the target; Inflicts Perish Song and Trap on the user.",
	},
	pixieburst: {
		accuracy: 100,
		basePower: 95,
		category: "Special",
		name: "Pixie Burst",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			boosts: {
				spa: -1,
			},
		},
		target: "normal",
		type: "Fairy",
		desc: "Has a 20% chance to lower the target's Special Attack by 1 stage.",
		shortDesc: "20% chance to lower the target's Sp. Atk by 1.",
	},
	gigatonblaster: {
		accuracy: 100,
		basePower: 160,
		category: "Special",
		name: "Gigaton Blaster",
		pp: 8,
		priority: 0,
		flags: { protect: 1, mirror: 1, cantusetwice: 1 },
		secondary: null,
		target: "normal",
		type: "Cosmic",
		shortDesc: "Cannot be used twice in a row.",
	},
	quantumstance: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Quantum Stance",
		pp: 5,
		priority: 0,
		flags: { snatch: 1 },
		condition: {
			onResidual(pokemon) {
				this.directDamage(pokemon.baseMaxhp/4, pokemon, pokemon);
			}
		},
		selfBoost: {
			boosts: {
				atk: 2,
				def: 2,
			}
		},
		self: {
			volatileStatus: 'quantumstance',
		},
		target: "self",
		type: "Fighting",
		desc: "Boosts the user's Attack and Defense by 2 stages. The user takes 1/4 of its max HP at the end of each turn.",
		shortDesc: "Boosts Atk/Def by 2; loses 1/4 max HP each turn.",
	},
	crestrush: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Crest Rush",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		overrideOffensiveStat: 'spe',
		secondary: null,
		target: "normal",
		type: "Flying",
		desc: "Uses the user's Speed stat for damage calculation instead of Attack.",
		shortDesc: "Uses Speed stat instead of Attack for damage.",
	},
	corkscrewcrash: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Corkscrew Crash",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, spin: 1 },
		secondary: null,
		target: "normal",
		type: "Steel",
		shortDesc: "No additional effect.",
	},

	// Move Changes
	gigatonhammer: {
		inherit: true,
		onEffectiveness(typeMod, target, type) {
			if (type === 'Steel') return 1;
		},
		desc: "Super Effective against Steel-type Pokemon. Cannot be used twice in a row.",
		shortDesc: "Super Effective against Steel. Cannot be used twice in a row.",
	},
	fierywarth: {
		inherit: true,
		secondary: null,
		secondaries: [
			{ chance: 20, volatileStatus: 'flinch' },
			{ chance: 10, status: 'brn' },
		],
		desc: "20% chance to flinch the target. 10% chance to burn the target.",
		shortDesc: "20% chance to flinch. 10% chance to burn.",
	},
	powder: {
		inherit: true,
		condition: {
			duration: 2,
			onStart(target) {
				this.add('-singleturn', target, 'Powder');
			},
			onTryMovePriority: -1,
			onTryMove(pokemon, target, move) {
				if (move.type === 'Fire') {
					this.add('-activate', pokemon, 'move: Powder');
					this.damage(this.clampIntRange(Math.round(pokemon.maxhp / 4), 1));
					this.attrLastMove('[still]');
					return false;
				}
			},
			onSourceModifyDamage(damage, source, target, move) {
				let mod = 1;
				if (move.type === 'Fire') mod *= 2;
				if (move.flags['contact']) mod /= 2;
				return this.chainModify(mod);
			},
		},
		desc: undefined,
		shortDesc: "If using a Fire move, target loses 1/4 max HP. Target gains Fluffly effect.",
	},
	sandsearstorm: {
		inherit: true,
		onModifyMove(move) {
			if (this.field.isWeather('sandstorm')) move.accuracy = true;
		},
		desc: "20% chance to burn the target. This move always hits during a sandstorm.",
		shortDesc: "20% chance to burn. Always hits in a sandstorm.",
	},
	celebrate: {
		inherit: true,
		condition: undefined,
		slotCondition: undefined,
		flags: { snatch: 1 },
		secondary: {
			boosts: {
				def: 2,
				spd: 2,
			}
		},
		desc: "Boosts the user's Defense and Special Defense by 2 stages.",
		shortDesc: "Boosts the user's Defense and Sp. Def by 2.",
	},
	razorwind: {
		inherit: true,
		basePower: 140,
		critRatio: 2,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) return;

			this.add('-prepare', attacker, move.name);
			if (attacker.side.sideConditions['tailwind']) {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, move.name, defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) return;

			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		desc: "Charges, then hits foe(s) turn 2. No charge if Tailwind is active. High crit ratio.",
	},
	cosmicterrain: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source.hasItem('terrainextender')) {
					return 8;
				}

				return 5;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Cosmic' || move.type === 'Rock') {
					this.debug('cosmic terrain boost');
					return this.chainModify([5325, 4096]);
				}
			},
			onFieldStart(field, source, effect) {
				if (effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Cosmic Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Cosmic Terrain');
				}
			},
			onModifyWeight(weighthg, pokemon) {
				if (!pokemon.isGrounded) return;
				pokemon.weighthg = Math.max(1, pokemon.weighthg - 1000);
				return pokemon.weighthg;
			},
			onFieldEnd() {
				this.add('-fieldend', 'move: Cosmic Terrain');
			}
		}
	},
	doomdesire: {
		inherit: true,
		onTryHit(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'doomdesire',
				source: source,
				moveData: {
					id: 'doomdesire',
					name: "Doom Desire",
					accuracy: 100,
					basePower: 140,
					category: "Special",
					priority: 0,
					flags: { futuremove: 1 },
					effectType: 'Move',
					type: 'Cosmic',
				},
			});
			this.add('-start', source, 'Doom Desire');
			return this.NOT_FAIL;
		},
		type: 'Cosmic',
	},
};