import { Learnset } from '../../../sim/dex-species';
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

		let learnsetAdd = (pokemon: string, moves: [string, number][]) => {
			for(let move of moves) {
				// Example: this.modData('Learnset', 'furret').learset['playrough'] = ['9M'];
				this.modData('Learnsets', pokemon.toLowerCase()).learnset[move[0].toLowerCase()] = [`${move[1]}M`];
			}
		}

		// New Learnsets
		learnsetAdd('furret', [
			['playrough', 8]
		]);
		learnsetAdd('noctowl', [
			['moongeistbeam', 8],
			['psyshock', 8],
		]);
		learnsetAdd('ledian', [
			['suckerpunch', 8],
			['firepunch', 8],
		]);
		learnsetAdd('ariados', [
			['skittersmack', 8],
			['nastyplot', 8],
			['taunt', 8],
			['torment', 8],
			['uturn', 8],
			['knockoff', 8],
		]);
		learnsetAdd('lanturn', [
			['paraboliccharge', 8],
		]);
		learnsetAdd('togekiss', [
			['moonblast', 8],
			['icebeam', 8],
		]);
		
	},
}