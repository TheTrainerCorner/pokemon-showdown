import { ModdedDex } from '../../../sim/dex';
import { Learnset } from '../../../sim/dex-species';

// Generations Files
import Gen1 from './gens/gen1';
import Gen2 from './gens/gen2';
import Gen3 from './gens/gen3';
import Gen4 from './gens/gen4';
import Gen5 from './gens/gen5';
import Gen6 from './gens/gen6';
import Gen7 from './gens/gen7';
import Gen8 from './gens/gen8';
import Gen9 from './gens/gen9';

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen9',
	init() {
		//#region Add Kick Move Flag to moves
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
		//#endregion
		//#region Fixing tiers
		this.modData('FormatsData', 'gengarmega').natDexTier = 'OU';
		//#endregion

		//#region Modifying Pokemon
		// Generation 1
		Gen1(this);
		// Generation 2
		Gen2(this);
		// Generation 3
		Gen3(this);
		// Generation 4
		Gen4(this);
		// Generation 5
		Gen5(this);
		// Generation 6
		Gen6(this);
		// Generation 7
		Gen7(this);
		// Generation 8
		Gen8(this);
		// Generation 9
		Gen9(this);
		//#endregion
		
	},
};