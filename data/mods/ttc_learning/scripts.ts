import { ModifyPokemon } from "../../../tools/utils/modifyPokemon";

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'ttc_season_4',
	init() {
		new ModifyPokemon('Lopunny', this)
			.types
				.setType('Cosmic', 'Fighting');
		new ModifyPokemon('Rabsca', this)
			.types
				.setType('Cosmic', 'Fire');
		new ModifyPokemon('Excadrill', this)
			.types
				.setType('Ground','Cosmic')
			.pokemon.abilities
				.setAbility0('Emergency Exit')
				.setHiddenAbility('Intimidate')
			.pokemon.baseStats
				.setSPE(110)
				.setHP(800)
			.pokemon.learnset
				.add('U Turn')
				.remove('Sand Tomb')
	},
};