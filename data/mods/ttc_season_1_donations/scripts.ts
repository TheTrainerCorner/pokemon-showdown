import { ModifyPokemon } from "../../../tools/utils/modifyPokemon";

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'ttc_season_1_3',
	init() {
		// Flam - $15 donation
		new ModifyPokemon('Altaria', this)
			.types
				.setType('Dragon', 'Fairy')
			.pokemon.abilities
				.setAbility1('Levitate')
				.setHiddenAbility('Fluffy')
			.pokemon.baseStats
				.setATK(45)
				.setDEF(105)
				.setSPA(110)
				.setSPD(110)
				.setSPE(85)
			.pokemon.learnset
				.add('Thunderbolt');
	},
};