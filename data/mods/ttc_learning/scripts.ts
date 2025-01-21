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
	},
};



export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	neospacianflarescarab: {
		num: -4015
		name: "NeoSpacian Flare Scarab"
		
	}

}
