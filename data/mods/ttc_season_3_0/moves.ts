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
	synchronoise: {
		inherit: true,
		secondary: null,
		shortDesc: "Super effective on Psychic types.",
		desc: "Super effective on Psychic types.",
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
	//#endregion
	//#region Other Moves
	celebrate: {
		inherit: true,
		category: "Status",
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, bypasssub: 1, failencore: 1},
		volatileStatus: 'encore',
		condition: {
			duration: 3,
			noCopy: true, // doesn't get copied by Z-Baton Pass
			onStart(target) {
				let move: Move | ActiveMove | null = target.lastMove;
				if (!move || target.volatiles['dynamax']) return false;

				if (move.isMax && move.baseMove) move = this.dex.moves.get(move.baseMove);
				const moveIndex = target.moves.indexOf(move.id);
				if (move.isZ || move.flags['failencore'] || !target.moveSlots[moveIndex] || target.moveSlots[moveIndex].pp <= 0) {
					// it failed
					return false;
				}
				this.effectState.move = move.id;
				this.add('-start', target, 'Encore');
				if (!this.queue.willMove(target)) {
					this.effectState.duration++;
				}
			},
			onOverrideAction(pokemon, target, move) {
				if (move.id !== this.effectState.move) return this.effectState.move;
			},
			onResidualOrder: 16,
			onResidual(target) {
				if (!target.moves.includes(this.effectState.move) ||
					target.moveSlots[target.moves.indexOf(this.effectState.move)].pp <= 0) {
					// early termination if you run out of PP
					target.removeVolatile('encore');
				}
			},
			onEnd(target) {
				this.add('-end', target, 'Encore');
			},
			onDisableMove(pokemon) {
				if (!this.effectState.move || !pokemon.hasMove(this.effectState.move)) {
					return;
				}
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.id !== this.effectState.move) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
		},
		onHit(target, source, move) {
			const success = this.boost({def: -1, spd: -1}, target, source);
			if (!success && !target.hasAbility('mirrorarmor')) {
				delete move.selfSwitch;
			}
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {boost: {spe: 1}},
		contestType: "Cute",
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
	burningjealousy:{
		inherit: true,
		priority: 1,
		onTry(source, target) {
			const action = this.queue.willMove(target);
			const move = action?.choice === 'move' ? action.move : null;
			if (!move || (move.category === 'Status' && move.id !== 'mefirst') || target.volatiles['mustrecharge']) {
				return false;
			}
		},
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
}