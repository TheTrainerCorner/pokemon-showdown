export const Moves: {[k: string]: ModdedMoveData} = {
	//#region Physical Moves
	direclaw:{
		inherit:true,
		secondary:{
			chance: 20,
			onHit(target, source) {
				const result = this.random(3);
				if (result === 0) {
					target.trySetStatus('psn', source);
				} else if (result === 1) {
					target.trySetStatus('par', source);
				} else {
					target.trySetStatus('slp', source);
				}
			},
		},
		desc: "Has a 20% chance to cause the target to either fall asleep, become poisoned, or become paralyzed.",
		shortDesc: "20% chance to sleep, poison, or paralyze target.",
	},
	hardpress:{
		inherit: true,
		basePower: 0,
		basePowerCallback(pokemon, target) {
			const ratio = Math.max(Math.floor(pokemon.hp * 48 / pokemon.maxhp), 1);
			let bp;
			if (ratio < 2) {
				bp = 130;
			} else if (ratio < 5) {
				bp = 110;
			} else if (ratio < 10) {
				bp = 88;
			} else if (ratio < 17) {
				bp = 66;
			} else if (ratio < 33) {
				bp = 44;
			} else {
				bp = 22;
			}
			this.debug('BP: ' + bp);
			return bp;
		},
		desc: "The power of this move is 22 if X is 33 to 48, 44 if X is 17 to 32, 88 if X is 10 to 16, 110 if X is 5 to 9, 130 if X is 2 to 4, where X is equal to (user's current HP * 48 / user's maximum HP), rounded down.",
		shortDesc: "More power the less HP the user has left.",
	},
	icefang:{
		inherit:true,
		desc: "Has a 10% chance to frostbite the target and a 10% chance to make it flinch.",
		shortDesc: "10% chance to frostbite. 10% chance to flinch.",
	},
	icepunch:{
		inherit:true,
		desc: "Has a 10% chance to frostbite the target.",
		shortDesc: "10% chance to frostbite.",
	},
	payday: {
		inherit: true,
		basePower: 80,
	},
	pounce:{
		inherit: true,
		basePower: 70,
	},
	spectralthief: {
		inherit: true,
		basePower: 70,
	},
	supercellslam:{
		inherit: true,
		basePower: 105,
	},
	wildcharge: {
		inherit: true,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		multihit: [2, 5],
		recoil: [0,0],
		desc: "Hits two to five times. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
		shortDesc: "Hits 2-5 times in one turn.",
	},
	//#endregion
	//#region Special Moves
	aurorabeam:{
		inherit:true,
		desc: "Has a 10% chance to frostbite the target.",
		shortDesc: "10% chance to frostbite.",
	},
	burningjealousy:{
		inherit: true,
		basePower:75,
		secondary: {
			chance: 100,
			volatileStatus: 'burningjealousy',
		},
		condition: {
			onStart(target, source, effect) {
				this.add('-start', target, 'move: Burning Jealousy');
			},
			onAfterBoost(boost, target, source, effect) {
				let i: BoostID
				for(i in boost) {
					if (boost[i]! > 0) {
						target.trySetStatus('brn', source);
						target.removeVolatile('burningjealousy');
						return;
					}
				}
			},
			onEnd(target) {
				this.add('-end', target, 'move: Burning Jealousy', '[silent]');
			},
		},
		desc: "Marks the opponent; When the opponent gains a stat buff, they are burned and removes the mark.",
		shortDesc: "Marks the opponent; When the opponet gains a stat buff, they are burned!",
	},
	icywind:{
		inherit: true,
		desc: "Has a 100% chance to lower the target's Speed by 1 stage. Has a 10% chance to frostbite the target.",
		shortDesc: "100% chance to lower the foe(s) Speed by 1. 10% chance to frostbite",
	},
	synchronoise: {
		inherit: true,
		secondary: null,
		shortDesc: "Super effective on Psychic types.",
		desc: "Super effective on Psychic types.",
	},
	powdersnow:{
		inherit:true,
		desc: "Has a 10% chance to frostbite the target.",
		shortDesc: "10% chance to frostbite.",
	},
	psystrike: {
		inherit: true,
		critRatio: 2,
		desc: "Deals damage to the target based on its Defense instead of Special Defense. Has a higher chance for a critical hit",
		shortDesc: "Damages target based on Defense, not Sp. Def. High critical hit ratio",
	},
	mistyexplosion: {
		inherit: true,
		basePower: 150,
	},
	originpulse: {
		inherit: true,
		basePower: 120,
		accuracy: 90,
	},
	//#endregion
	//#region Other Moves
	celebrate: {
		inherit: true,
		category: "Status",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		slotCondition: 'Celebrate',
		condition: {
			duration: 2,
			onResidualOrder: 4,
			onEnd(target) {
				if (target && !target.fainted) {
					this.boost({atk: 1, spa: 1}, target, target);
					this.add('-boost', target, '[from] move: Celebrate', '[Celebrator] ' + this.effectState.source.name);
				}
			},
		},
		secondary: null,
		target: "self",
		desc: "When the move is used, its effects take place at the end of the next turn (like wish). It boosts the recipient attack and special attack stats by 1 stage",
		shortDesc: "Next Turn; Raises Attack and Sp. Atk by 1."
	},
	dragoncheer: {
		inherit: true,
		condition: {
			onStart(target, source, effect) {
				if (target.volatiles['focusenergy']) return false;
				if (effect && (['costar', 'imposter', 'psychup', 'transform'].includes(effect.id))) {
					this.add('-start', target, 'move: Dragon Cheer', '[silent]');
				} else {
					this.add('-start', target, 'move: Dragon Cheer');
				}
			},
			onModifyCritRatio(critRatio, source) {
				return critRatio + 1;
			},
		},
		target: "allies",
		desc: "Raises the allies chance for a critical hit by 1 stage.Fails if the target already has a crit rate boosting effect. Baton Pass can be used to transfer this effect to an ally.",
		shortDesc: "User and allies: Crit ratio +1.",
	},
	lifedew: {
		inherit: true,
		heal: [1, 3],
		desc: "Each Pokemon on the user's side restores 1/3 of its maximum HP, rounded half up.",
		shortDesc: "Heals the user and its allies by 1/3 their max HP.",
	},
	coaching: {
		inherit: true,
		volatileStatus: 'coaching',
		condition: {
			onStart(target, source, effect) {
				if (target.volatiles['focusenergy']) return false;
				if (target.volatiles['dragoncheer']) return false;
				if (effect && (['costar', 'imposter', 'psychup', 'transform'].includes(effect.id))) {
					this.add('-start', target, 'move: Coaching', '[silent]');
				} else {
					this.add('-start', target, 'move: Coaching');
				}
			},
			onModifyCritRatio(critRatio, source) {
				return critRatio + 1;
			},
		},
		boosts: {
			def: 1,
		},
		target: "allies",
		desc: "Raises the allies defense by 1 stage and the chance for a critical hit by 1 stage.Fails if the target already has a crit rate boosting effect. Baton Pass can be used to transfer this effect to an ally.",
		shortDesc: "User and allies: Defense +1 Crit ratio +1.",
	},
	//#endregion

	//#region Fakemon Moves
	snowtimesong: {
		inherit: true,
		onHit(target, pokemon, move) {
			if (pokemon.baseSpecies.baseSpecies === 'Meloetta' && !pokemon.transformed) {
				move.willChangeForme = true;
			}

			if (pokemon.species.id === 'meloettacaroler') {
				this.field.setWeather('snow');
			} else if (pokemon.species.id === 'meloettaaurora' && this.field.isWeather(['hail', 'snow'])) {
				pokemon.side.addSideCondition('auroraveil');
			}
		},
		desc: "If Meloetta-Caroler, move will be a special move, and sets snow; If Meloetta-Aurora, move will be physical and sets aurora veil.",
		shortDesc: "Meloetta-Caroler = Special + Snow; Meloetta-Aurora = Physical + Aurora Veil",
	},
	soulfang: {
		inherit: true,
		accuracy: 95,
	},
	//#endregion

	//#region New Moves

	//#region Fireworks Event
	lavatsunami: { // PT333
		num: -3001,
		accuracy: 95,
		basePower: 100,
		category: "Special",
		name: "Lava Tsunami",
		pp: 8,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1},
		thawsTarget: true,
		secondary: {
			chance: 50,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
		contestType: "Tough",
	},
	//#endregion
	//#region Beach Fakemon
	quillrush: {
		num: -3002,
		name: 'Quillrush',
		basePower: 120,
		accuracy: 100,
		pp: 10,
		priority: 0,
		type: "Ground",
		category: "Physical",
		flags: {contact: 1, protect: 1},
		recoil: [33, 100],
		secondary: null,
		target: "normal",
		contestType: "Cool",
		shortDesc: "Has 33% recoil.",
		desc: "If the target lost HP, the user takes recoil damage equal to 33% the HP lost by the target, rounded half up, but not less than 1 HP.",
	},
	//#endregion

	//#region Staff Addition
	resentfulscreech: {
		num: -3003,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Resentful Screech",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		basePowerCallback(pokemon, target, move) {
			if (pokemon.species.id === 'wishiwashiresentful') return 120;
			return 60;
		},
		target: "normal",
		type: "Ghost",
		desc: "If the pokemon is Wishiwashi-Resentful; the base power is double. Else it is default to 60.",
		shortDesc: "If the pokemon is Wishiwashi-Resentful, the base power is double.",
	},
	roaringbellow:{
		num: -3004,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Roaring Bellow",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
			},
		},
		target: "normal",
		type: "Normal",
		desc: "Has a 100% chance to lower the target's Attack by 1 stage.",
		shortDesc: "100% chance to lower the target's Attack by 1.",
	},
	shelltrap: {
		inherit: true,
		basePower: 100,
		pp: 10,
		priority: -4,
		flags: {protect: 1, mirror: 1},
		basePowerCallback(pokemon, target, move) {
			const damagedByTarget = pokemon.attackedBy.some(
				p => p.source === target && p.damage > 0 && p.thisTurn
			);
			if (damagedByTarget) {
				this.debug('BP doubled for getting hit by ' + target);
				return move.basePower * 1.5;
			}
			return move.basePower;
		},
		desc: "Power boosted by 1.5 if the user was hit by the target this turn.",
		shortDesc: "Power boosted by 1.5 if user is damaged by the target.",
	},
	steelspikes: {
		num: -3005,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Steel Spikes",
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Steel Spikes');
			},
		},
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, mustpressure: 1},
		sideCondition: 'gmaxsteelsurge',
		secondary: null,
		target: "foeSide",
		type: "Steel",
		desc: "Sets up a hazard on the opposing side of the field, damaging each opposing Pokemon that switches in. Fails if the effect is already active on the opposing side. Foes lose 1/32, 1/16, 1/8, 1/4, or 1/2 of their maximum HP, rounded down, based on their weakness to the Steel type; 0.25x, 0.5x, neutral, 2x, or 4x, respectively. Can be removed from the opposing side if any opposing Pokemon uses Mortal Spin, Rapid Spin, or Defog successfully, or is hit by Defog.",
		shortDesc: "Hurts foes on switch-in. Factors Steel weakness.",
	},
	//#endregion
}