import { ModifyPokemon } from "../../../tools/utils/modifyPokemon";

export const Scripts: ModdedBattleScriptsData = {
	inherit: "ttc_season_2_1",
	init() {
		new ModifyPokemon('Regidrago', this)
			.baseStats
				.setSPE(95);
	},
};