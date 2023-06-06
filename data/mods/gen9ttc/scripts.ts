export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen9',
	init() {
		// Adding the kick flag to moves
		let kickMoves: string[] = [
			"blazekick",
			"doublekick",
			"highhorsepower",
			"highjumpkick",
			"jumpkick",
			"lowsweep",
			"megakick",
			"rollingkick",
			"stomp",
			"tripleaxel",
			"triplekick",
			"tropkick",
		];

		for(let move of kickMoves) {
			this.modData('Moves', move).flags.kick = 1;
		}

		// New Learnsets
		// Furret
		this.modData('Learnsets', 'furret').learnset.playrough = ['8M'];
		// Noctowl
		this.modData('Learnsets', 'noctowl').learnset.moongeistbeam = ['8M'];
		this.modData('Learnsets', 'noctowl').learnset.psyshock = ['8M'];
	},
}