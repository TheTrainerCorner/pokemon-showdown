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
	}
};