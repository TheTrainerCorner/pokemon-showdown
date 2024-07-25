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
	swarmterrain: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source.hasItem('terrainextender')) return 8;
				return 5;
			},
			onTryBoost(boost, target, source, effect) {
				if(source && target === source) {
					let showMsg = false;
					let i: BoostID;
					for(i in boost) {
						if (boost[i]! > 0) {
							delete boost[i];
							showMsg = true;
						}
					}
					if (showMsg && !(effect as ActiveMove).boosts) {
						this.add("-fail", target, 'boost', "[from] move: Swarm Terrain", "[of] " + target);
					}
				}
			},
			onFieldStart(field, source, effect) {
				if (effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Swarm Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Swarm Terrain');
				}
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					const move = this.dex.moves.get(moveSlot.id);
					if (move.selfBoost) {
						pokemon.disableMove(moveSlot.id);
					}
					if(move.boosts){
						pokemon.disableMove(moveSlot.id)
					}
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Swarm Terrain');
			},
		},
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
		pp: 5,
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
		desc: "Has a 50% chance to burn the target.",
		shortDesc: "50% chance to burn the target. Thaws user.",
	},
	//#endregion
	//#region Beach Fakemon
	aquatickick: {
		num: -3002,
		name: 'Aquatic Kick',
		basePower: 90,
		accuracy: 100,
		pp: 10,
		priority: 0,
		critRatio: 2,
		type: "Water",
		category: "Physical",
		flags: {contact: 1, kick: 1, protect: 1},
		secondary: null,
		target: "normal",
		contestType: "Cool",
		shortDesc: "High critical hit ratio.",
	},
	//#endregion
	//#region Healthy Fakemon
	fantasytongue: {
		num: -3011,
		name: "Fantasy Tongue",
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		pp: 10,
		flags: {bite: 1, contact: 1},
		priority: 0,
		type: "Fairy",
		target: 'any',
		onHit(target, source) {
			let success = false;
			if (target.isAlly(source)) {
				success = !!this.heal(Math.ceil(target.baseMaxhp * 0.5));
			} else {
				target.addVolatile('taunt');
				success = true;
			}
			if (!success) {
				this.add('-fail', target, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
		desc: "Taunts the target; Heals 50% if used on allies",
	},
	//#endregion

	//#region Staff Addition
	resentfulscreech: {
		num: -3003,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Resentful Screech",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		basePowerCallback(pokemon, target, move) {
			if (pokemon.species.id === 'wishiwashiresentful') return 100;
			return 50;
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
	eclipticpunishment: {
		num: -3006,
		name: "Ecliptic Punishment",
		accuracy: 90,
		basePower: 110,
		category: "Physical",
		priority: 0,
		pp: 10,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true) && pokemon.ability!='dawnoflunacy') move.category = 'Special';
		},
		onModifyType(move, pokemon) {
			if(pokemon.ability=== 'dawnoflunacy' && pokemon.activeTurns % 2==0){
				move.type = 'Psychic';
				move.category = 'Special';
			}
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Cool",
		desc: "Deals the respective damage & type based on Dawn of Lunacy; Takes highest offensive stat otherwise",
		shortDesc: "Not sig. ability = uses highest offensive stat"
	},
	peekaboo: {
		num: -3007,
		name: "Peek-a-Boo",
		accuracy: 100,
		basePower: 0,
		category: "Status",
		priority: 0,
		pp: 10,
		flags: {failencore: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failmimic: 1},
		onTryHit(pokemon) {
			return pokemon.status === 'slp' || pokemon.hasAbility('comatose');
		},
		onHit(pokemon) {
			if (pokemon.status === 'slp') {
				pokemon.cureStatus();
			}
		},
		boosts: {
			atk: -1,
			def: -1,
			spa: -1,
			spd: -1,
			spe: -1,
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Scary",
		desc: "If the target is sleeping, then the move will cause the target to lose 1 stage to all stats. Target will wake up from it's sleep.",
		shortDesc: "If the target is asleep; -1 Stage to all stats. Cause target to wake up.",
	},
	shellstorm: {
		num: -3008,
		name: "Shell Storm",
		accuracy: 70,
		basePower: 90,
		category: "Special",
		priority: 0,
		pp: 10,
		flags: {protect: 1, mirror: 1, distance: 1, wind: 1},
		critRatio: 2,
		onModifyMove(move, pokemon, target) {
			switch (target?.effectiveWeather()) {
			case 'raindance':
			case 'primordialsea':
				move.accuracy = true;
				break;
			}
		},
		target: "any",
		type: "Rock",
		desc: "High crit chance. This move can hit a target using Bounce, Fly, or Sky Drop, or is under the effect of Sky Drop. If the weather is Primordial Sea or Rain Dance, this move does not check accuracy. If the weather is Desolate Land or Sunny Day, this move's accuracy is 50%. If this move is used against a Pokemon holding Utility Umbrella, this move's accuracy remains at 70%.",
		shortDesc: "High crit chance. Can't miss in rain.",
	},
	geodudegatling: {
		num: -3009,
		name: "Geodude Gatling",
		accuracy: 90,
		basePower: 25,
		category: "Special",
		priority: 0,
		pp: 10,
		flags: {protect: 1, mirror: 1, bullet: 1},
		multihit: [2, 5],
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: 'normal',
		type: 'Rock',
		desc: "Hits 2-5 times; 10% chance to burn on each hit",
		shortDesc: "Hits 2-5 times; 10% chance to burn on each hit",
	},
	sheercold: {
		inherit: true,
		accuracy: 85,
		basePower: 0,
		category: "Status",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		status: 'frb',
		secondary: null,
		target: "normal",
		onModifyMove(move, pokemon, target) {
			if (pokemon.types.includes('Ice')) move.accuracy = true;
		},
		desc: "Inflicts a frostbite on the target if used by a ice type. 85% accuracy if another type",
		shortDesc: "Frostbites the target. Can't miss if ice type.",
	},
	snipeshot: {
		inherit: true,
		basePower: 40,
		critRatio: 2,
		tracksTarget: true,
		basePowerCallback(pokemon, target, move) {
			// You can't get here unless the pursuit succeeds
			if (target.beingCalledBack || target.switchFlag) {
				this.debug('Snipe Shot damage boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		beforeTurnCallback(pokemon) {
			for (const side of this.sides) {
				if (side.hasAlly(pokemon)) continue;
				side.addSideCondition('snipeshot', pokemon);
				const data = side.getSideConditionData('snipeshot');
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onModifyMove(move, source, target) {
			if (target?.beingCalledBack || target?.switchFlag) move.accuracy = true;
		},
		onTryHit(target, pokemon) {
			target.side.removeSideCondition('snipeshot');
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('Snipe Shot start');
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectState.sources) {
					if (!source.isAdjacent(pokemon) || !this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Snipe Shot');
						alreadyAdded = true;
					}
					// Run through each action in queue to check if the Pursuit user is supposed to Mega Evolve this turn.
					// If it is, then Mega Evolve before moving.
					if (source.canMegaEvo || source.canUltraBurst) {
						for (const [actionIndex, action] of this.queue.entries()) {
							if (action.pokemon === source && action.choice === 'megaEvo') {
								this.actions.runMegaEvo(source);
								this.queue.list.splice(actionIndex, 1);
								break;
							}
						}
					}
					this.actions.runMove('Snipe Shot', source, source.getLocOf(pokemon));
				}
			},
			desc: "If an opposing Pokemon switches out this turn, this move hits that Pokemon before it leaves the field, even if it was not the original target. If the user moves after an opponent using Flip Turn, Parting Shot, Teleport, U-turn, or Volt Switch, but not Baton Pass, it will hit that opponent before it leaves the field. Power doubles and no accuracy check is done if the user hits an opponent switching out, and the user's turn is over; if an opponent faints from this, the replacement Pokemon does not become active until the end of the turn.",
			shortDesc: "If a foe is switching out, hits it at 2x power.",
		},
	},
	blink: {
			num: -3010,
			accuracy: true,
			basePower: 0,
			category: "Status",
			name: "Blink",
			pp: 0.625,
			priority: 0,
			flags: {recharge: 1, protect: 1, mirror: 1},
			self: {
				volatileStatus: 'mustrecharge',
			},
			onHit(target, source, move) {
				const result = target.setStatus('mustrecharge', source, move);
				if (!result) return result;
				target.setBoost({
					atk: 1,
					def: 1,
					spa: 1,
					spd: 1,
					spe: 1,
				});
			},
			secondary: null,
			target: "self",
			type: "Psychic",
			zMove: {effect: 'clearnegativeboost'},
			contestType: "Cute",
			shortDesc: "User recharges for a turn, +1 to every stat (excluding evasion and accuracy)"
		},
		cometpunch: {
			inherit: true,
			basePower: 18,
			accuracy: 100,
			category: "Physical",
			pp: 10,
			priority: 0,
			willCrit: true,
			multihit: 4,
			secondary: null,
			target: "normal",
			type: "Bug",
			desc: "Hits four times. This move is always a critical hit unless the target is under the effect of Lucky Chant or has the Battle Armor or Shell Armor Abilities.",
			shortDesc: "Always results in a critical hit. Hits 4 times.",
		},
		cheaterstrick: {
			num: -7777,
			accuracy: 100,
			basePower: 120,
			category: "Special",
			name: "Cheater's Trick",
			desc: "This move's type changes based on the ability Gambler's Luck",
			shortDesc: "Changes its type based on Gamblers Luck",
			pp: 10,
			priority: 0,
			flags: {protect: 1, mirror: 1},
			onModifyType(move, pokemon, target) {
				if (pokemon.hasAbility('gamblersluck')) {
					move.type = pokemon.abilityState.gamblersluck || 'Normal';
				}
			},
			secondary: null,
			target: "normal",
			type: "Normal",
			zMove: {basePower: 185},
			maxMove: {basePower: 95},
			contestType: "Tough",
		},
		rollingkick: {
			inherit: true,
			accuracy: 90,
			basePower: 65,
			selfSwitch: true,
			desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button or through the effect of the Emergency Exit or Wimp Out Abilities. Has a 50% chance to lower the target's Defense by 1 stage.",
			shortDesc: "User switches out after damaging the target. 50% lower the target's Defense",
			category: "Physical",
			name: "Rolling Kick",
			pp: 15,
			priority: 0,
			flags: {contact: 1, protect: 1, mirror: 1},
			secondary: {
				chance: 50,
				boosts: {
					def: -1,
				},
			},
			target: "normal",
			type: "Fighting",
			contestType: "Cool",
		},
	//#endregion
};