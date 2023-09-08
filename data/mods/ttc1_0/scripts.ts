import { modifyDex } from '../../../tools/utils/modifyPokemon';
export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen9ttc',
	init() {
		//#region 1.0.1
		// Modify Pokemon
		modifyDex(this);
		//#endregion

	}
};