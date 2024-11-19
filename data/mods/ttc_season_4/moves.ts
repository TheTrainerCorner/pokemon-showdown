export const Moves: {[k: string]: ModdedMoveData} = {
	//#region Cosmic Moves

	meteorbeam: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (this.field.isTerrain('cosmicterrain')) {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, move.name, defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		desc: "This attack charges on the first turn and executes on the second. If the user is holding a Power Herb or the terrain is Cosmic Terrain, the move completes in one turn.",
		shortDesc: "Charges turn 1. Hits turn 2. No charge in Cosmic Terrain.",
	},
	swift: {
		inherit: true,
		onModifyPriority(priority, source, target, move) {
			if (this.field.isTerrain('cosmicterrain')) {
				return priority + 1;
			}
		},
	},
	lunardance: {
		inherit: true,
		terrain: 'cosmicterrain',
		onTryHit: undefined,
		selfdestruct: undefined,
		slotCondition: undefined,
		condition: undefined,
		target: 'all',
	},
	eclipticpunishment: {
		inherit: true,
		onModifyType: undefined,
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('spa', false, true) < pokemon.getStat('atk', false, true)) move.category ='Physical';
		},
		desc: undefined,
		shortDesc: "uses highest offensive stat.",
	},
	appleacid: {
		inherit: true,
		secondary: undefined,
		onHit(target) {
			target.setType(target.getTypes(true).map(type => type === "Steel" ? "???" : type));
			this.add('-start', target, 'typechange', target.getTypes().join('/'), '[from] move: Apple Acid');
		},
		desc: undefined,
		shortDesc: 'Removes steel typing off of the opponent pokemon.',
	},
	gravapple: {
		inherit: true,
		secondary: undefined,
		accuracy: 95,
		onHit(target) {
			this.field.addPseudoWeather('gravity');
		},
		desc: undefined,
		shortDesc: "Sets up gravity when hits opposing Pokemon",
	},
	// New Moves
	cosmicterrain: {
		num: -4001,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Cosmic Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'cosmicterrain',
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
			onModifyWeight(weighthg) {
				return Math.max(1, weighthg - 1000);
			},
			onFieldEnd() {
				this.add('-fieldend', 'move: Cosmic Terrain');
			}
		},
		secondary: null,
		target: "all",
		type: "Cosmic",
		contestType: "Beatiful",
	},
	solarflare: {
		num: -4002,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Solar Flare",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1},
		thawsTarget: true,
		secondary: {
			chance: 20,
			status: 'brn',
		},
		target: "normal",
		type: "Cosmic",
		contestType: "Tough",
		desc: "Has a 20% chance to burn the target. The target thaws out if it is frozen.",
		shortDesc: "20% chance to burn the target. Thaws target.",
	},
	lunartides: {
		num: -4003,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Lunar Tides",
		pp: 10,
		flags: {protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Water', type);
		},
		priority: 0,
		secondary: null,
		target: "normal",
		type: "Cosmic",
		contestType: "Tough",
		desc: "This move combines Water in its type effectiveness against the target.",
		shortDesc: "Combines Water in its type effectiveness.",
	},
	astroforce: {
		num: -4004,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Astro Force",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		volatileStatus: 'smackdown',
		secondary: null,
		target: 'normal',
		type: "Cosmic",
		desc: "This move forces the target to be grounded",
		shortDesc: "Grounds adjacent foes.",
	},
	stardusttrail: {
		num: -4005,
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		name: "Stardust Trail",
		pp: 32,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Cosmic",
		desc: "Has a 100% chance to raise the user's Speed by 1 stage.",
		shortDesc: "100% chance to raise the user's Speed by 1.",
	},
	gravitationalslam: {
		num: -4006,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Gravitational Slam",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1},
		onBasePower(basePower, source) {
			if (this.field.getPseudoWeather('gravity') && source.isGrounded()) {
				return this.chainModify(1.5);
			}
		},
		secondary: null,
		target: "normal",
		type: "Cosmic",
	},
	rebirth: {
		num: -4007,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Rebirth",
		pp: 0.625,
		priority: 0,
		flags: { heal: 1, noassist: 1, nosleeptalk: 1, noparentalbond: 1 },
		boosts: {
			atk: -2,
			spa: -2,
		},
		onHit(target, source, move) {
			source.addVolatile('rebirth');
		},
		condition: {
			onStart(pokemon) {
				this.directDamage(pokemon.maxhp, pokemon);
			},
			onBeforeFaint(pokemon, effect) {
				this.add('-activate', pokemon, 'move: Rebirth', pokemon);
				pokemon.hp = this.trunc(pokemon.maxhp / 2);
				pokemon.clearStatus();
				this.add('-sethp', pokemon, pokemon.getHealth, '[silent]');
				pokemon.clearBoosts();
				this.add('-clearboost', pokemon, '[silent]');
				for (const moveSlot of pokemon.moveSlots) {
					moveSlot.pp = moveSlot.maxpp;
				}
				pokemon.switchFlag = true;
				return false;
			},
		},
		target: "normal",
		type: "Cosmic",
		desc: "Lowers target's Attack and Special Attack by 2. User Faints. User Revives with 50% Max HP the following turn.",
	},
	flowerveil: {
		num: -4008,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: 'Flower Veil',
		pp: 20,
		priority: 0,
		flags: { snatch: 1 },
		sideCondition: "flowerveil",
		onTry() {
			return this.field.isWeather(['sunnyday']);
		},
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('lightclay')) {
					return 8;
				}
				return 5;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && this.effectState.target.hasAlly(target)) {
					if ((target.side.getSideCondition('reflect') && this.getCategory(move) === "Physical") ||
							(target.side.getSideCondition('lightscreen') && this.getCategory(move) === "Special")) {
								return;
							}
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Flower Veil weaken');
						if (this.activePerHalf > 1) return this.chainModify([2732, 4096]);
						return this.chainModify(0.5);
					}
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Flower Veil');
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 10,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Flower Veil');
			}
		},
		secondary: null,
		target: "allySide",
		type: "Grass",
		zMove: { boost: {spe: 1}},
		contestType: "Beautiful",
		desc: "For 5 turns, the user and its party members take 0.5x damage from physical and special attacks, or 0.66x damage if in a Double Battle; does not reduce damage further with Reflect or Light Screen. Critical hits ignore this protection. It is removed from the user's side if the user or an ally is successfully hit by Brick Break, Psychic Fangs, or Defog. Brick Break and Psychic Fangs remove the effect before damage is calculated. Lasts for 8 turns if the user is holding Light Clay. Fails unless the weather is Sun.",
		shortDesc: "For 5 turns, damage allies halved. Sun only.",
	},
	royalpledge: {
		num: -4009,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Royal Pledge",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		sideCondition: "royalpledge",
		condition: {
			duration: 4,
			name: "Royal's Garden",
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Royal Pledge');
			},
			onResidualOrder: 2,
			onResidualSubOrder: 26,
			onResidual(target, source, effect) {
				if (target.hasType('Grass')) return;

				this.damage(target.maxhp / 16, target);
			},
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Royal Pledge');
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		desc: "Creates the Royal's Garden on the target's side of the field for 4 turns. This damages all non-Grass type Pokemon on that side of the field for 1/16 of their maximum HP at the end of each turn. Targets are not trapped.",
		shortDesc: "Royal's Garden;Damages Foe's Non-Grass Type for 1/16 of Max HP; Does not Trap",
	},
	ushiromotare: {
		num: -4010,
		accuracy: 90,
		basePower: 25,
		name: "Ushiromotare",
		category: "Physical",
		pp: 5,
		priority: -6,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 3,
		multiaccuracy: true,
		secondary: {
			chance: 30,
			onHit(target, source, move) {
				switch(move.hit) {
					case 1:
						this.boost({ spe: -1}, target);
						break;
					case 2:
						if (this.runEvent('DragOut', target, source, move)) {
							target.forceSwitchFlag = true;
						}
						break;
					case 3:
						this.boost({ atk: 1}, source);
						break;
				}
			}
		},
		target: "normal",
		type: "Fighting",
		desc: "Hits target 3 times, First Hit has a 30% chance to slow the opponent by 1 stage, Hit 2 has a 30% chance to switch out the opponent & Hit 3 has a 30% chance to boost the user's attack by 1 stage. This move always goes last.",
		shortDesc: "Hits 3 Times; 30% on Each hit can do the following in order of hit, -1 Spd to Target; Force switch out the Target; +1 Atk to User",
	},
	bushidoscode: {
		num: -4011,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Bushido's Code",
		pp: 0.625,
		priority: 0,
		flags: { snatch: 1},
		volatileStatus: 'bushidoscode',
		condition: {
			onStart(target, source, effect) {
				if (target.volatiles['dragoncheer']) return false;
				this.add('-start', target, "move: Bushido's Code");
			},
			onModifyCritRatio(critRatio) {
				return critRatio + 2;
			},
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			},
			onBasePower(basePower, source, target, move) {
				if (source.speciesState.bushidosCode) return;
				// Boost the power for one turn to 1.3x for damaging move
				if (move.basePower !== 0) {
					source.speciesState.bushidosCode = true;
					this.debug("Bushido's Code buffed");
					return this.modify(basePower, 1.3);
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Steel",
		desc: "Gives the user +2 to their crit rate, and next attacking move used by the user has a 1.3x damage boost. This user cannot swap out of battle.",
		shortDesc: "Gives Status to user; +2 to Crit Rate; Next attacking move does 1.3x more damage; Cannot switch out",
	},
	liftoff: {
		num: -800,
		accuracy: 100,
		basePower: 110,
		category: "Physical",
		name: "Lift Off",
		pp: 10,
		priority: 0,
		flags: { charge: 1, protect: 1, mirror: 1 },
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) return;

			this.add('-prepare', attacker, move.name);
			this.boost({atk: 1}, attacker, attacker, move);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) return;

			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Cosmic"
	},

	//#endregion

	//#region Field Support
	healblock: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Heal Block');
					return 7;
				}
				// Removing Field Support
				return 5;
			},
			onStart(pokemon, source) {
				this.add('-start', pokemon, 'move: Heal Block');
				source.moveThisTurnResult = true;
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.moves.get(moveSlot.id).flags['heal']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (move.flags['heal'] && !move.isZ && !move.isMax) {
					this.add('cant', pokemon, 'move: Heal Block', move);
					return false;
				}
			},
			onModifyMove(move, pokemon, target) {
				if (move.flags['heal'] && !move.isZ && !move.isMax) {
					this.add('cant', pokemon, 'move: Heal Block', move);
					return false;
				}
			},
			onResidualOrder: 20,
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Heal Block');
			},
			onTryHeal(damage, target, source, effect) {
				if ((effect?.id === 'zpower') || this.effectState.isZ) return damage;
				return false;
			},
			onRestart(target, source) {
				this.add('-fail', target, 'move: Heal Block'); // Succeeds to supress downstream messages
				if (!source.moveThisTurnResult) {
					source.moveThisTurnResult = false;
				}
			},
		},
	},
	magicroom: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Magic Room');
					return 7;
				}
				else if (source?.hasAbility('fieldsupport')) {
					this.add('-activate', source, 'ability: Field Support', '[move] Magic Room');
					return 7;
				}
				return 5;
			},
			onFieldStart(target, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-fieldstart', 'move: Magic Room', '[of] ' + source, '[persistent]');
				} else if (source.hasAbility('fieldsupport')) {
					this.add('-fieldstart', 'move: Magic Room', '[of] ' + source, '[fieldsupport]');
				}else {
					this.add('-fieldstart', 'move: Magic Room', '[of] ' + source);
				}
				for (const mon of this.getAllActive()) {
					this.singleEvent('End', mon.getItem(), mon.itemState, mon);
				}
			},
			onFieldRestart(target, source) {
				this.field.removePseudoWeather('magicroom');
			},
			// Item suppression implemented in Pokemon.ignoringItem() within sim/pokemon.js
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 6,
			onFieldEnd() {
				this.add('-fieldend', 'move: Magic Room', '[of] ' + this.effectState.source);
			},
		},
	},
	magnetrise: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source.hasAbility('fieldsupport')) {
					this.add('-activate', source, 'ability: Field Support', '[move] Magnet Rise');
					return 7;
				}
				return 5;
			},
			onStart(target) {
				this.add('-start', target, 'Magnet Rise');
			},
			onImmunity(type) {
				if (type === 'Ground') return false;
			},
			onResidualOrder: 18,
			onEnd(target) {
				this.add('-end', target, 'Magnet Rise');
			},
		},
	},
	safeguard: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Safeguard');
					return 7;
				}
				else if (source?.hasAbility('fieldsupport')) {
					this.add('-activate', source, 'ability: Field Support', '[move] Safeguard');
					return 7;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (!effect || !source) return;
				if (effect.id === 'yawn') return;
				if (effect.effectType === 'Move' && effect.infiltrates && !target.isAlly(source)) return;
				if (target !== source) {
					this.debug('interrupting setStatus');
					if (effect.name === 'Synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) {
						this.add('-activate', target, 'move: Safeguard');
					}
					return null;
				}
			},
			onTryAddVolatile(status, target, source, effect) {
				if (!effect || !source) return;
				if (effect.effectType === 'Move' && effect.infiltrates && !target.isAlly(source)) return;
				if ((status.id === 'confusion' || status.id === 'yawn') && target !== source) {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Safeguard');
					return null;
				}
			},
			onSideStart(side, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-sidestart', side, 'Safeguard', '[persistent]');
				} else if (source.hasAbility('fieldsupport')) {
					this.add('-sidestart', side, 'Safeguard', '[fieldsupport');
				} else {
					this.add('-sidestart', side, 'Safeguard');
				}
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 3,
			onSideEnd(side) {
				this.add('-sideend', side, 'Safeguard');
			},
		},
	},
	tailwind: {
		inherit: true,
		condition: {
			duration: 4,
			durationCallback(target, source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Tailwind');
					return 6;
				}
				else if (source?.hasAbility('fieldsupport')) {
					this.add('-activate', source, 'ability: Field Support', '[move] Tailwind');
					return 6;
				}
				return 4;
			},
			onSideStart(side, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-sidestart', side, 'move: Tailwind', '[persistent]');
				} else if (source.hasAbility('fieldsupport')) {
					this.add('-sidestart', side, 'move: Tailwind', '[fieldsupport]');
				} else {
					this.add('-sidestart', side, 'move: Tailwind');
				}
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(2);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 5,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Tailwind');
			},
		},
	},
	telekinesis: {
		inherit: true,
		condition: {
			duration: 3,
			durationCallback(target, source, effect) {
				if (source.hasAbility('fieldsupport')) {
					this.add('-activate', source, 'ability: Field Support', '[move] Telekinesis');
					return 6;
				}
				return 3;
			},
			onStart(target) {
				if (['Diglett', 'Dugtrio', 'Palossand', 'Sandygast'].includes(target.baseSpecies.baseSpecies) ||
						target.baseSpecies.name === 'Gengar-Mega') {
					this.add('-immune', target);
					return null;
				}
				if (target.volatiles['smackdown'] || target.volatiles['ingrain']) return false;
				this.add('-start', target, 'Telekinesis');
			},
			onAccuracyPriority: -1,
			onAccuracy(accuracy, target, source, move) {
				if (move && !move.ohko) return true;
			},
			onImmunity(type) {
				if (type === 'Ground') return false;
			},
			onUpdate(pokemon) {
				if (pokemon.baseSpecies.name === 'Gengar-Mega') {
					delete pokemon.volatiles['telekinesis'];
					this.add('-end', pokemon, 'Telekinesis', '[silent]');
				}
			},
			onResidualOrder: 19,
			onEnd(target) {
				this.add('-end', target, 'Telekinesis');
			},
		},
	},
	wonderroom: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Wonder Room');
					return 7;
				}
				else if (source?.hasAbility('fieldsupport')) {
					this.add('-activate', source, 'ability: Field Support', '[move] Wonder Room');
					return 7;
				}
				return 5;
			},
			onModifyMove(move, source, target) {
				// This code is for moves that use defensive stats as the attacking stat; see below for most of the implementation
				if (!move.overrideOffensiveStat) return;
				const statAndBoosts = move.overrideOffensiveStat;
				if (!['def', 'spd'].includes(statAndBoosts)) return;
				move.overrideOffensiveStat = statAndBoosts === 'def' ? 'spd' : 'def';
				this.hint(`${move.name} uses ${statAndBoosts === 'def' ? '' : 'Sp. '}Def boosts when Wonder Room is active.`);
			},
			onFieldStart(field, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-fieldstart', 'move: Wonder Room', '[of] ' + source, '[persistent]');
				} else if (source.hasAbility('fieldsupport')) {
					this.add('-fieldstart', 'move: Wonder Room', '[of] ' + source, '[fieldsupport]');
				} else {
					this.add('-fieldstart', 'move: Wonder Room', '[of] ' + source);
				}
			},
			onFieldRestart(target, source) {
				this.field.removePseudoWeather('wonderroom');
			},
			// Swapping defenses partially implemented in sim/pokemon.js:Pokemon#calculateStat and Pokemon#getStat
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 5,
			onFieldEnd() {
				this.add('-fieldend', 'move: Wonder Room');
			},
		},
	},
	//#endregion

	// The basic Move changes have been moved to the scripts.ts file since they are simple and can make a class builder for it.
	//#region Complex Physical Move Changes
	// gravapple: {
	// 	inherit: true,
	// 	accuracy: 95,
	// 	volatileStatus: 'smackdown',
	// 	desc: "100% chance to lower Defense by 1 stage; Does 1.5x more damage when used against a target under the effects of Gravity; Grounds the target.",
	// 	shortDesc: "-1 Def; 1.5x against target in Gravity; Grounds the Target.",
	// },
	metalclaw: {
		inherit: true,
		basePower: 60,
		self: {
			chance: 50,
			boosts: {
				atk: 1,
			}
		},
		desc: "Has a 50% chance to raise Attack by 1 stage.",
		shortDesc: '50% chance to +1 Atk.',
	},
	//#endregion

	//#region New Terrains
	myriadterrain: {
		num: -4001,
		accuracy: true,
		basePower: 0,
		category: 'Status',
		name: "Myriad Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: "myriadterrain",
		condition: {
			duration: 5,
			onStart() {
				this.add('-clearallboost');
				for (const pokemon of this.getAllActive()) {
					pokemon.clearBoosts();
				}
			},
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onTryBoost(boost, target, source, effect) {
				// Prevent the activation of boosting by moves
				if (!target.isGrounded || target.isSemiInvulnerable()) return;
				// Items and Abilities are not restricted by the terrain.
				if (effect.effectType === "Item" || effect.effectType === "Ability") return;
				this.add('-activate', target, 'move: Electric Terrain');
				return null;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Bug' && attacker.isGrounded()) {
					this.debug('myriad terrain boost');
					return this.chainModify([5325, 4096]);
				}
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Myriad Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Electric Terrrain');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Electric Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Bug",
		desc: "For 5 turns, the terrain becoms Myriad Terrain. At the start of the effect, resets all stat boosts. During the effect, the power of Bug-type attacks made by grounded Pokemon is multipled by 1.3 and grounded Pokemon cannot gain any stat boosts from moves. Items and Abilities are not under this affect. Fails if the current terrain is Myriad Terrain.",
		shortDesc: "5 turns. Grounded: +Bug power, resets all stat boosts, cannot gain stat boost via moves.",
	},
	calamityterrain: {
		num: -4001,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Calamity Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: "calamityterrain",
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === "Dark" && attacker.isGrounded()) {
					this.debug('calamity terrain boost');
					return this.chainModify([5325, 4096]);
				}
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === "Ability") {
					this.add('-fieldstart', 'move: Calamity Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Calamity Terrain');
				}
			},
			onTryHeal(heal, target, source, effect) {
				if (!target.isGrounded() || effect.effectType === "Item") return heal;
				this.damage(target.maxhp / 8); // Deals damage first
				return false;
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Calamity Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Dark",
		desc: "For 5 turns, the terrain becomes Calamity Terrain. During the effect, the power of Dark-type attacks used by grounded Pokemon is multipled by 1.3, upon the activation of healing will take 1/8 of their max hp before healing (Items are excluded from this). Fails if the current terrain is Calamity Terrain.",
		shortDesc: "5 turns. Grounded: +Dark power, takes 1/8 of max hp upon activation of healing not from items."
	},
	//#endregion
};