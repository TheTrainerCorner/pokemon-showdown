export const Moves: {[k: string]: ModdedMoveData} = {
	shedtail: {
		inherit: true,
		pp: 1,
	},
	present: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			const rand = this.random(10);
			if(rand < 2) {
				move.heal = [1, 4];
				move.infiltrates = true;
			} else if (rand < 6) {
				move.basePower = 50;
			} else if (rand < 9) {
				move.basePower = 100;
			} else {
				move.basePower = 150;
			}
		}
	},
	diamondstorm: {
		inherit: true,
		category: "Special"
	},
	beakblast: {
		inherit: true,
		priority: 0,
	},
	wickedblow: {
		inherit: true,
		basePower: 70,
	},
	snuggle: {
		num: -1,
		category: "Physical",
		name: "Snuggle",
		shortDesc: "Traps and damages the target for 4-5 turns.",
		priority: 0,
		accuracy: 90,
		basePower: 30,
		type: "Fairy",
		pp: 20,
		flags: { contact: 1, protect: 1, mirror: 1},
		volatileStatus: 'partiallytrapped',
		secondary: null,
		target: "normal",
		contestType: "Tough",
	},
	shelter: {
		inherit: true,
		volatileStatus: 'protect',
		stallingMove: true,
		boosts: {
			def: 1,
		},
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if(!move.flags['protect']) {
					if(['gmaxoneblow', 'gmaxrapidflow'].includes(move.id)) return;
					if(move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if(move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Shelter');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if(lockedmove) {
					// Outrage counter is reset
					if(source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				return this.NOT_FAIL;
			}
		},
		shortDesc: "Protects the user and raises Defense by 1 stage"
	},
	filletaway: {
		inherit: true,
		onHit(pokemon) {
			this.directDamage(pokemon.maxhp / 4);
		},
		desc: "Raises the user's Attack, Special Attack, and Speed by 2 stages in exchange for the user losing 1/4 of its maximum HP, rounded down. Fails if the user would faint or if its Attack, Special Attack, and Speed stat stages would not change.",
		shortDesc: "+2 Attack, Sp. Atk, Speed for 1/4 user's max HP.",
	},
	terahammer: {
		num: -2,
		accuracy: 90,
		basePower: 80,
		category: "Physical",
		name: "Tera Hammer",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, hammer: 1},
		onModifyType(move, pokemon) {
			move.type = pokemon.teraType || 'Normal';
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
	sushityphoon: {
		num: -3,
		accuracy: 100,
		basePower: 150,
		category: "Special",
		name: "Sushi Typhoon",
		pp: 1,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTry() {
			return this.field.isWeather('raindance') || this.field.isWeather('primordialsea');
		},
		onAfterMove(source, target, move) {
			source.faint();
			this.debug('Fainted due to Sushi Typhoon');
			this.field.clearWeather();
			this.debug('Weather Cleared due to Sushi Typhoon');
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Clever",
	},
};