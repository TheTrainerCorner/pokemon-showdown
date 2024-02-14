import { ModifyPokemon } from "../../../tools/utils/modifyPokemon";

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'ttc_season_2_0',
	init() {
		// Version 2.1.0
		new ModifyPokemon('Uxie', this)
			.types
				.setType('Psychic', 'Steel')
			.pokemon.learnset
				.add('Iron Head')
				.add('Flash Cannon')
				.add('Autotomize')
				.add('Doom Desire')
				.add('Smart Strike')
				.add('Ice Beam')
				.add('Icy Wind');
		new ModifyPokemon('Mesprit', this)
			.learnset
				.add('Moonblast')
				.add('Alluring Voice')
				.add('Moonlight')
				.add('Play Rough')
				.add('Misty Explosion');
		new ModifyPokemon('IronValiant', this)
			.baseStats
				.setSPE(114);
		new ModifyPokemon('Entei', this)
			.baseStats
				.setHP(120)
				.setATK(95)
				.setDEF(90)
				.setSPA(95)
	},
}