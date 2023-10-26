export const Moves: {[k: string]: ModdedMoveData} = {
	// Physical Moves
	armthrust: {
		inherit: true,
		basePower: 25,
	},
	furyattack: {
		inherit: true,
		basePower: 25,
		accuracy: 100,
	},
	nuzzle: {
		inherit: true,
		basePower: 40,
	},
	rockblast: {
		inherit: true,
		accuracy: 100,
	},
	tailslap: {
		inherit: true,
		accuracy: 100,
	},
	bonerush: {
		inherit: true,
		accuracy: 100,
	},
	pinmissile: {
		inherit: true,
		accuracy: 100,
	},
	mortalspin: {
		inherit: true,
		basePower: 60,
	},
	feint: {
		inherit: true,
		basePower: 60,
	},
	doublekick: {
		inherit: true,
		basePower: 40,
	},
	doublehit: {
		inherit: true,
		basePower: 40,
		accuracy: 100,
	},
	iceball: {
		inherit: true,
		basePower: 40,
		accuracy: 95,
	},
	rollout: {
		inherit: true,
		basePower: 40,
		accuracy: 95,
	},
	sandtomb: {
		inherit: true,
		basePower: 40,
		accuracy: 100,
	},
	snaptrap: {
		inherit: true,
		type: 'Steel',
		basePower: 80,
	},
	poweruppunch: {
		inherit: true,
		basePower: 50,
	},
	rocksmash: {
		inherit: true,
		basePower: 60,
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		desc: "Has a 100% chance to lower the target's Def.",
		shortDesc: "100% chance to lower the target's Def.",
	},
	bonemerang: {
		inherit: true,
		basePower: 60,
		accuracy: 100,
	},
	geargrind: {
		inherit: true,
		accuracy: 90,
	},
	cut: {
		inherit: true,
		type: 'Grass',
		basePower: 75,
		accuracy: 100,
		onEffectiveness(typeMod, target, type) {
			if (['Grass', 'Bug'].includes(type)) return 1;
		},
		desc: "This move's type effectiveness against Grass and Bug is changed to be super effective no matter what this move's type is.",
		shortDesc: "Super effective on Grass and Bug.",
	},
	poisonfang: {
		inherit: true,
		basePower: 65,
	},
	rockthrow: {
		inherit: true,
		accuracy: 100,
	},
	razorleaf: {
		inherit: true,
		basePower: 65,
		accuracy: 100,
	},
	visegrip: {
		inherit: true,
		basePower: 60,
		volatileStatus: 'partiallytrapped',
		shortDesc: "Traps and damages the target for 4-5 turns.",
	},
	covet: {
		inherit: true,
		type: 'Fairy',
	},
	flipturn: {
		inherit: true,
		basePower: 65,
	},
	uturn: {
		inherit: true,
		basePower: 65,
	},
	magnetbomb: {
		inherit: true,
		basePower: 80,
	},
	needlearm: {
		inherit: true,
		basePower: 85,
	},
	pluck: {
		inherit: true,
		basePower: 75,
	},
	rocktomb: {
		inherit: true,
		basePower: 65,
		accuracy: 100,
	},
	wingattack: {
		inherit: true,
		basePower: 75,
	},
	firefang: {
		inherit: true,
		accuracy: 100,
	},
	icefang: {
		inherit: true,
		accuracy: 100,
	},
	thunderfang: {
		inherit: true,
		accuracy: 100,
	},
	boneclub: {
		inherit: true,
		basePower: 90,
		accuracy: 95,
		secondary: {
			chance: 30,
			volatileStatus: "flinch",
		},
		desc: "Has a 30% chance to flinch the target.",
		shortDesc: "30% chance to flinch the target.",
	},
	steamroller: {
		inherit: true,
		basePower: 80,
	},
	crosspoison: {
		inherit: true,
		basePower: 90,
	},
	dizzypunch: {
		inherit: true,
		basePower: 150,
		accuracy: 60,
		secondary: {
			chance: 100,
			volatileStatus: 'confusion',
		},
		desc: "Has a 100% chance to confuse the target.",
		shortDesc: "100% chance to confuse the target.",
	},
	skittersmack: {
		inherit: true,
		accuracy: 100,
	},
	steelwing: {
		inherit: true,
		accuracy: 100,
	},
	vitalthrow: {
		inherit: true,
		basePower: 100,
	},
	razorshell: {
		inherit: true,
		accuracy: 100,
	},
	rockslide: {
		inherit: true,
		accuracy: 100,
	},
	crushclaw: {
		inherit: true,
		accuracy: 100,
	},
	zenheadbutt: {
		inherit: true,
		accuracy: 100,
	},
	dig: {
		inherit: true,
		basePower: 100,
	},
	dive: {
		inherit: true,
		basePower: 100,
	},
	hyperfang: {
		inherit: true,
		basePower: 120,
		accuracy: 85,
	},
	megapunch: {
		inherit: true,
		accuracy: 100,
		secondary: {
			chance: 20,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		desc: "Has a 20% chance to increase Attack.",
		shortDesc: "20% chance to increase Atk by 1 stage.",
	},
	slam: {
		inherit: true,
		accuracy: 100,
		secondaries: [
			{
				chance: 10,
				volatileStatus: 'flinch',
			},
			{
				chance: 10,
				status: 'par',
			},
		],
	},
	submission: {
		inherit: true,
		basePower: 130,
		accuracy: 100,
		recoil: [33, 100],
		desc: "Takes 1/3 recoil damage",
		shortDesc: '1/3 recoil damage',
	},
	blazekick: {
		inherit: true,
		basePower: 90,
		accuracy: 100,
	},
	bounce: {
		inherit: true,
		basePower: 100,
		accuracy: 100,
	},
	iciclecrash: {
		inherit: true,
		accuracy: 100,
	},
	skyuppercut: {
		inherit: true,
		accuracy: 100,
	},
	aquatail: {
		inherit: true,
		accuracy: 100,
	},
	meteormash: {
		inherit: true,
		accuracy: 100,
	},
	playrough: {
		inherit: true,
		accuracy: 100,
	},
	ragingbull: {
		inherit: true,
		basePower: 110,
	},
	fly: {
		inherit: true,
		basePower: 110,
		accuracy: 100,
	},
	phantomforce: {
		inherit: true,
		basePower: 110,
	},
	rockclimb: {
		inherit: true,
		accuracy: 100,
		secondaries: [
			{
				chance: 20,
				volatileStatus: 'confusion',
			},
			{
				chance: 10,
				volatileStatus: 'flinch',
			},
		],
	},
	highhorsepower: {
		inherit: true,
		accuracy: 100,
	},
	crabhammer: {
		inherit: true,
		accuracy: 95,
	},
	crosschop: {
		inherit: true,
		accuracy: 95,
	},
	hammerarm: {
		inherit: true,
		accuracy: 100,
	},
	icehammer: {
		inherit: true,
		accuracy: 100,
	},
	mountaingale: {
		inherit: true,
		accuracy: 90,
	},
	stoneedge: {
		inherit: true,
		accuracy: 90,
	},
	dynamicpunch: {
		inherit: true,
		basePower: 120,
		accuracy: 60,
	},
	eggbomb: {
		inherit: true,
		basePower: 160,
		accuracy: 90,
		flags: {protect: 1, bullet: 1, distance: 1, heal: 1, allyanim: 1},
		onHit(target, source) {
			let success = false;
			if (this.randomChance(1, 4) && !target.isAlly(source)) {
				success = !!this.heal(Math.ceil(target.baseMaxhp * 0.25));
			} else { success = false; }
			if (success && !target.isAlly(source)) {
				target.staleness = 'external';
			}
			if (!success) {
				this.add('-fail', target, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
		desc: "Has a 25% chance of healing the opposing pokemon 1/4 of their max hp.",
		shortDesc: "25% chance of healing the opposing pokemon 1/4 of their max hp.",
	},
	dragonrush: {
		inherit: true,
		basePower: 120,
		accuracy: 100,
		recoil: [33, 100],
		secondary: {
			chance: 10,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		desc: "Takes 1/3 Recoil Damage. Has a 10% chance to increase Speed.",
		shortDesc: "1/3 Recoil Damage; 10% chance to increase Spe by 1 stage.",
	},
	irontail: {
		inherit: true,
		accuracy: 90,
	},
	megahorn: {
		inherit: true,
		accuracy: 90,
	},
	powerwhip: {
		inherit: true,
		accuracy: 90,
	},
	precipiceblades: {
		inherit: true,
		accuracy: 90,
	},
	megakick: {
		inherit: true,
		accuracy: 90,
	},
	skyattack: {
		inherit: true,
		accuracy: 100,
	},
	headsmash: {
		inherit: true,
		accuracy: 90,
	},
	gigaimpact: {
		inherit: true,
		accuracy: 100,
	},
	rockwrecker: {
		inherit: true,
		accuracy: 100,
	},
	// Special Moves
	infestation: {
		inherit: true,
		basePower: 40,
	},
	smog: {
		inherit: true,
		basePower: 40,
		accuracy: 100,
		secondary: {
			chance: 100,
			status: 'psn',
		},
		desc: "Always poisons the target.",
		shortDesc: "Always poisons the target.",
	},
	firespin: {
		inherit: true,
		accuracy: 100,
	},
	whirlpool: {
		inherit: true,
		accuracy: 100,
	},
	acidspray: {
		inherit: true,
		basePower: 50,
	},
	vacuumwave: {
		inherit: true,
		basePower: 50,
	},
	clearsmog: {
		inherit: true,
		basePower: 70,
	},
	chargebeam: {
		inherit: true,
		basePower: 60,
		accuracy: 100,
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		desc: "Always raises the user's Sp.Atk by 1 stage.",
		shortDesc: "Increases Sp.Atk by 1 stage.",
	},
	snore: {
		inherit: true,
		basePower: 60,
	},
	strugglebug: {
		inherit: true,
		basePower: 60,
	},
	electroweb: {
		inherit: true,
		accuracy: 100,
	},
	icywind: {
		inherit: true,
		accuracy: 100,
	},
	mudshot: {
		inherit: true,
		accuracy: 100,
	},
	snarl: {
		inherit: true,
		accuracy: 100,
	},
	aircutter: {
		inherit: true,
		accuracy: 100,
	},
	frostbreath: {
		inherit: true,
		accuracy: 100,
	},
	syrupbomb: {
		inherit: true,
		accuracy: 100,
	},
	glaciate: {
		inherit: true,
		accuracy: 100,
	},
	leaftornado: {
		inherit: true,
		basePower: 90,
		accuracy: 95,
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
		desc: "Has a 20% chance to flinch",
		shortDesc: "20% chance to flinch",
	},
	mirrorshot: {
		inherit: true,
		basePower: 90,
		accuracy: 95,
		secondary: {
			chance: 20,
			boosts: {
				spd: -1,
			},
		},
		desc: "Has a 20% chance to lower the target's Sp.Def by 1 stage.",
		shortDesc: "20% chance to lower Sp.Def by 1 stage.",
	},
	mudbomb: {
		inherit: true,
		basePower: 90,
		accuracy: 95,
		secondary: {
			chance: 20,
			boosts: {
				spe: -1,
			},
		},
		desc: "Has a 20% chance to lower the target's Speed by 1 stage.",
		shortDesc: "20% chance to lower Spe by 1 stage.",
	},
	octazooka: {
		inherit: true,
		basePower: 150,
		accuracy: 100,
		self: {
			volatileStatus: 'mustrecharge',
		},
	},
	paraboliccharge: {
		inherit: true,
		basePower: 75,
	},
	airslash: {
		inherit: true,
		accuracy: 100,
	},
	signalbeam: {
		inherit: true,
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
	},
	aurasphere: {
		inherit: true,
		basePower: 90,
	},
	eeriespell: {
		inherit: true,
		basePower: 90,
	},
	esperwing: {
		inherit: true,
		basePower: 75,
	},
	extrasensory: {
		inherit: true,
		basePower: 100,
	},
	matchagotcha: {
		inherit: true,
		basePower: 90,
		accuracy: 95,
	},
	triattack: {
		inherit: true,
		basePower: 90,
	},
	razorwind: {
		inherit: true,
		basePower: 110,
	},
	muddywater: {
		inherit: true,
		basePower: 80,
		accuracy: 100,
		secondary: {
			chance: 30,
			boosts: {
				spe: -1,
			},
		},
		desc: "Has a 30% chance to lower the target's Speed by 1 stage.",
		shortDesc: "30% chance to lower the target's Spe by 1 stage.",
	},
	heatwave: {
		inherit: true,
		accuracy: 100,
	},
	magmastorm: {
		inherit: true,
		accuracy: 80,
		onModifyMove(move) {
			if (this.field.isWeather(['sunnyday', 'desolateland'])) move.accuracy = true;
		},
		shortDesc: "Cannot miss in Sun.",
		desc: "Can't miss in Sun.",
	},
	inferno: {
		inherit: true,
		basePower: 120,
		accuracy: 60,
	},
	fireblast: {
		inherit: true,
		accuracy: 90,
	},
	hydropump: {
		inherit: true,
		accuracy: 90,
		secondary: {
			chance: 10,
			boosts: {
				spd: -1,
			},
		},
		desc: "Has a 10% chance to lower the target's Sp.Def by 1 stage.",
		shortDesc: "10% chance to lower the target's SpD by 1 stage.",
	},
	thunder: {
		inherit: true,
		accuracy: 80,
	},
	focusblast: {
		inherit: true,
		accuracy: 80,
	},
	belch: {
		inherit: true,
		accuracy: 100,
	},
	meteorbeam: {
		inherit: true,
		accuracy: 100,
	},
	zapcannon: {
		inherit: true,
		accuracy: 60,
	},
	dracometeor: {
		inherit: true,
		accuracy: 95,
	},
	fleurcannon: {
		inherit: true,
		accuracy: 95,
	},
	leafstorm: {
		inherit: true,
		accuracy: 95,
	},
	overheat: {
		inherit: true,
		accuracy: 95,
	},
	bloodmoon: {
		inherit: true,
		basePower: 150,
	},
	psychoboost: {
		inherit: true,
		accuracy: 95,
	},
	chloroblast: {
		inherit: true,
		accuracy: 100,
	},
	blastburn: {
		inherit: true,
		accuracy: 100,
	},
	frenzyplant: {
		inherit: true,
		accuracy: 100,
	},
	hydrocannon: {
		inherit: true,
		accuracy: 100,
	},
	hyperbeam: {
		inherit: true,
		accuracy: 100,
	},
	roaroftime: {
		inherit: true,
		accuracy: 100,
	},
	enternabeam: {
		inherit: true,
		accuracy: 100,
	},
	naturesmadness: {
		inherit: true,
		accuracy: 100,
	},
	ruination: {
		inherit: true,
		accuracy: 100,
	},
	// Status Moves
	darkvoid: {
		inherit: true,
		accuracy: 75,
	},
	grasswhistle: {
		inherit: true,
		accuracy: 75,
	},
	sing: {
		inherit: true,
		accuracy: 75,
	},
	hypnosis: {
		inherit: true,
		accuracy: 75,
	},
	metalsound: {
		inherit: true,
		accuracy: 100,
	},
	screech: {
		inherit: true,
		accuracy: 100,
	},
	willowisp: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (pokemon.types.includes('Fire')) move.accuracy = true;
		},
	},
	thunderwave: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (pokemon.types.includes('Electric')) move.accuracy = true;
		},
	},
	leechseed: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (pokemon.types.includes('Grass')) move.accuracy = true;
		},
		onTryImmunity(target) {
			let sources = target.adjacentFoes()
			for(let source of sources) {
				// This is for the ability Mycelium Might
				if(source.hasAbility('myceliummight')) {
					return false;
				} else return !target.hasType('Grass');
			}
		}
	},
	poisongas: {
		inherit: true,
		accuracy: 100,
	},
	stringshot: {
		inherit: true,
		accuracy: 100,
	},
	strengthsap: {
		inherit: true,
		accuracy: 100,
	},
	// New Moves
	cragblast: {
		num: -1,
		accuracy: 100,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		category: "Physical",
		name: "Crag Blast",
		pp: 16,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, bullet: 1},
		multihit: 3,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Rock",
		zMove: {basePower: 120},
		maxMove: {basePower: 140},
		desc: "Hits three times. Power increases to 40 for the second hit and 60 for the third. This move checks accuracy for each hit, and the attack ends if the target avoids a hit. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit three times.",
		shortDesc: "Hits 3 times. Each hit can miss, but power rises.",
	},
};
