import {ModdedDex} from '../../../sim/dex';
import {Learnset} from '../../../sim/dex-species';

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
		// #region Functions
		const changeNatDexTier = (pokemon: string, tier: string) => {
			this.modData('FormatsData', pokemon.toLowerCase().replace(/ +/g, '').replace('-', '')).natDexTier = tier.toUpperCase();
		};
		const changeTier = (pokemon: string, tier: string) => {
			this.modData('FormatsData', pokemon.toLowerCase().replace(/ +/g, '').replace('-', '')).tier = tier.toUpperCase();
		};
		// #endregion
		// #region Add Kick Move Flag to moves
		const kickMoves: string[] = [
			"axekick",
			"blazekick",
			"doublekick",
			"highhorsepower",
			"highjumpkick",
			"jumpkick",
			"lowsweep",
			"megakick",
			"rollingkick",
			"stomp",
			"thunderouskick",
			"triplearrows",
			"tripleaxel",
			"triplekick",
			"tropkick",
			"lowkick",
		];

		for (const move of kickMoves) {
			this.modData('Moves', move).flags.kick = 1;
		}
		// #endregion
		// #region Add Explosion Move Flag to moves
		const explosionMoves: string[] = [
			"explosion",
			"mindblown",
			"selfdestruct",
			"mistyexplosion",
			"shelltrap",
			"eruption",
			"eggbomb",
			"magnetbomb",
			"sludgebomb",
			"seedbomb",
			"steameruption",
			"rockblast",
			"mudbomb",
			"metalburst",
			"syrupbomb",
			"chloroblast",
			"cragblast",
		];

		for (const move of explosionMoves) {
			this.modData('Moves', move).flags.explosion= 1;
		}
		// #endregion
		// #region Hammer Moves
		const hammerMoves: string[] = [
			"hammerarm",
			"crabhammer",
			"dragonhammer",
			"gigatonhammer",
			"icehammer",
			"woodhammer",
			"terahammer",
		];
		for (const move of hammerMoves) {
			this.modData('Moves', move).flags.hammer = 1;
		}
		// #endregion
		// #region Modifying Tiers
		changeNatDexTier('alakazammega', 'OU');
		changeNatDexTier('annihilape', 'OU');
		changeNatDexTier('blazikenmega', 'OU');
		changeNatDexTier('chienpao', 'OU');
		changeNatDexTier('chiyu', 'OU');
		changeNatDexTier('darmanitangalar', 'OU');
		changeNatDexTier('espathra', 'OU');
		changeNatDexTier('dracovish', 'OU');
		changeNatDexTier('fluttermane', 'OU');
		changeNatDexTier('gengarmega', 'OU');
		changeNatDexTier('houndstone', 'OU');
		changeNatDexTier('ironbundle', 'OU');
		changeNatDexTier('kangaskhanmega', 'OU');
		changeNatDexTier('kyuremblack', 'OU');
		changeNatDexTier('landorus', 'OU');
		changeNatDexTier('lucariomega', 'OU');
		changeNatDexTier('melmetal', 'OU');
		changeNatDexTier('metagrossmega', 'OU');
		changeNatDexTier('naganadel', 'OU');
		changeNatDexTier('palafin', 'OU');
		changeNatDexTier('palafinhero', 'OU');
		changeNatDexTier('regieleki', 'OU');
		changeNatDexTier('roaringmoon', 'OU');
		changeNatDexTier('salamencemega', 'OU');
		changeNatDexTier('spectrier', 'OU');
		changeNatDexTier('urshifu', 'OU');
		changeNatDexTier('walkingwake', 'OU');
		changeNatDexTier('zygarde', 'OU');
		// #endregion

		// #region Modifying Pokemon
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
		// #endregion
	},
};
