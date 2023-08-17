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
};