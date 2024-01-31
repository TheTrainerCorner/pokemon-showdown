import { ModifyPokemon } from "../../../tools/utils/modifyPokemon";

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'ttc_season_2_0',
	init() {
		// Version 2.1.0
		new ModifyPokemon('Uxie', this)
			.types
				.setType('Steel');
	},
}