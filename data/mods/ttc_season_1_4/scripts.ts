import { ModifyPokemon } from "../../../tools/utils/modifyPokemon";

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'ttc_season_1_winners',
	init() {
		new ModifyPokemon('altaria', this)
			.types
				.setType('Dragon', 'Flying')
			.pokemon.baseStats
				.setATK(70)
				.setDEF(90)
				.setSPA(70)
				.setSPD(105)
				.setSPE(80)
	}
};