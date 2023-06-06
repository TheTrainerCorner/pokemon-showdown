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
		// Gen 1
		learnsetAdd('venusaur', [
			['sludgewave', 8],
			['acidspray', 8],
			['gastroacid', 8],
		]);
		learnsetAdd('charizard', [
			['firelash', 8],
			['uturn', 8],
			['burnup', 8],
		]);
		learnsetAdd('blastoise', [
			['hydrosteam', 9],
			['steameruption', 8],
		]);
		learnsetAdd('butterfree', [
			['lightscreen', 8],
			['aromatherapy', 8],
			['stickyweb', 8],
			['psyshock', 8],
			['luminacrash', 9],
			['trickroom', 8],
		]);
		learnsetAdd('beedrill', [
			['crosspoison', 8],
			['dualwingbeat', 8],
			['firstimpression', 8],
		]);
		learnsetAdd('pidgeot', [
			['bulkup', 8],
			['extremespeed', 8],
			['aurasphere', 8],
			['hypervoice', 8],
		]);
		learnsetAdd('raticate', [
			['closecombat', 8],
			['firefang', 8],
			['icefang', 8],
			['psychicfang', 8],
		]);
		learnsetAdd('raticatealola', [
			['closecombat', 8],
			['firefang', 8],
			['icefang', 8],
			['psychicfang', 8],
			['partingshot', 8],
		]);
		learnsetAdd('fearow', [
			['swordsdance', 8],
			['dualwingbeat', 8],
			['beakblast', 8],
			['foulplay', 8],
			['nightslash', 8],
			['falsesurrender', 8],
		]);
		learnsetAdd('arbok', [
			['jawlock', 8],
			['shedtail', 9],
		]);
		learnsetAdd('pikachu', [
			['zippyzap', 8],
		]);
		learnsetAdd('raichu', [
			['zippyzap', 8],
		]);
		learnsetAdd('sandslash', [
			['spikyshield', 8],
			['spinout', 9],
		]);
		learnsetAdd('sandslashalola', [
			['spikyshield', 8],
			['icespinner', 9],
		]);
		learnsetAdd('nidoking', [
			['gunkshot', 8],
			['precipiceblades', 8],
		]);
		learnsetAdd('ninetales', [
			['lavaplume', 8],
			['darkvoid', 8],
			['destinybond', 8],
			['nightmare', 8],
			['bittermalice', 8],
			['nightdaze', 8],
		]);
		this.modData('Learnsets', 'ninetales').learnset.nastyplot = [];
		// Gen 2
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
		learnsetAdd('ampharos', [
			['paraboliccharge', 8],
			['slackoff', 8],
			['dazzlinggleam', 8],
		]);
		learnsetAdd('bellossom', [
			['drainingkiss', 8],
			['fleurcannon', 8],
			['teeterdance', 8],
			['pollenpuff', 8],
			['rapidspin', 8],
			['revelationdance', 8],
		]);
		learnsetAdd('azumarill', [
			['drainpunch', 8],
		]);
		learnsetAdd('sudowoodo', [
			['firstimpression', 8],
			['grassyglide', 8],
		]);
	},
}