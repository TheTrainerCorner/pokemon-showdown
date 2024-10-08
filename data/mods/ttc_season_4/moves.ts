export const Moves: {[k: string]: ModdedMoveData} = {
	//#region Cosmic Moves
	aurorabeam: {
		inherit: true,
		type: "Cosmic",
	},
	auroraveil: {
		inherit: true,
		type: "Cosmic",
	},
	cometpunch: {
		inherit: true,
		type: "Cosmic",
	},
	cosmicpower: {
		inherit: true,
		type: "Cosmic",
	},
	doomdesire: {
		inherit: true,
		type: "Cosmic",
	},
	dynamaxcannon: {
		inherit: true,
		type: "Cosmic",
	},
	eternabeam: {
		inherit: true,
		self: undefined,
		basePower: 145,
		flags: { protect: 1, mirror: 1, cantusetwice: 1},
		type: "Cosmic",
		desc: undefined,
		shortDesc: "Cannot be selected the turn after it's used.",
	},
	gravity: {
		inherit: true,
		type: "Cosmic",
	},
	hyperspacefury: {
		inherit: true,
		type: "Cosmic",
	},
	hyperspacehole: {
		inherit: true,
		basePower: 85,
		type: "Cosmic",
	},
	jetpunch: {
		inherit: true,
		type: "Cosmic",
	},
	luminacrash: {
		inherit: true,
		type: "Cosmic",
	},
	lunarblessing: {
		inherit: true,
		type: "Cosmic",
	},
	lunardance: {
		inherit: true,
		type: "Cosmic",
	},
	meteorassault: {
		inherit: true,
		type: "Cosmic",
		self: undefined,
		flags: {protect: 1, mirror: 1, failinstruct: 1},
		recoil: [1, 2],
		desc: "1/2 Recoil Damage",
		shortDesc: "1/2 Recoil Damage",
	},
	meteorbeam: {
		inherit: true,
		type: "Cosmic",
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
	meteormash: {
		inherit: true,
		type: "Cosmic",
	},
	moonblast: {
		inherit: true,
		type: "Cosmic",
	},
	moongeistbeam: {
		inherit: true,
		type: "Cosmic",
	},
	moonlight: {
		inherit: true,
		type: "Cosmic",
	},
	morningsun: {
		inherit: true,
		type: 'Cosmic',
	},
	photongeyser: {
		inherit: true,
		type: "Cosmic",
	},
	prismaticlaser: {
		inherit: true,
		type: "Cosmic",
		flags: { protect: 1, mirror: 1, cantusetwice: 1},
		self: undefined,
		basePower: 145,
		desc: undefined,
		shortDesc: "Cannot be selected the turn after it's used.",
	},
	signalbeam: {
		inherit: true,
		type: "Cosmic",
	},
	spacialrend: {
		inherit: true,
		type: "Cosmic",
	},
	sparklyswirl: {
		inherit: true,
		type: "Cosmic",
	},
	sunsteelstrike: {
		inherit: true,
		type: "Cosmic",
	},
	swift: {
		inherit: true,
		type: "Cosmic",
		onModifyPriority(priority, source, target, move) {
			if (this.field.isTerrain('cosmicterrain')) {
				return priority + 1;
			}
		},
		basePower: 55,
		desc: "If the current terrain is Cosmic Terrain, this move has its priority increased by 1.",
		shortDesc: "User on Cosmic Terrain: +1 priority.",
	},
	terastarstorm: {
		inherit: true,
		type: "Cosmic",
	},
	vacuumwave: {
		inherit: true,
		type: "Cosmic",
		overrideDefensiveStat: 'def',
		basePower: 70,
		desc: "Deals damage to the target based on its Defense instead of Special Defense. +1 Priority",
		shortDesc: "Damages Target Base on Def; +1 Priority",
	},
	wish: {
		inherit: true,
		type: "Cosmic",
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
		shortDesc: "Combines Flying in its type effectiveness.",
	},
	astroforce: {
		num: -4004,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Astro Force",
		pp: 16,
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
	rebirth: {
		num: -4006,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Rebirth",
		pp: 0.625,
		priority: 0,
		flags: { heal: 1 },
		boosts: {
			atk: -2,
			spa: -2,
		},
		onHit(target, source, move) {
			source.addVolatile('rebirth');
			source.sethp(1);
			source.heal(source.baseMaxhp / 2);
		},
		selfSwitch: true,
		target: "normal",
		type: "Cosmic",
		desc: "Lowers target's Attack and Special Attack by 2. User Faints. User Revives with 50% Max HP the following turn.",
	},
	//#endregion
};