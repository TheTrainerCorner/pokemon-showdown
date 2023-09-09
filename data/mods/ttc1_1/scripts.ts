import { modifyDex } from "../../../tools/utils/modifyPokemon";

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'ttc1_0',
	init() {
		//#region 1.1.1
		// Modify Pokemon
		modifyDex(this)
			.modifyPokemon('Noivern')
				.baseStat()
					.setSpe(116)
		//#endregion
	}
}