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
		new ModifyPokemon('Naganadel', this)
			.baseStats
				.setHP(80)
				.setDEF(77)
				.setSPA(120)
				.setSPE(117);
		new ModifyPokemon('Gigachelonian', this)
			.abilities
				.setAbility1('Poison Heal')
			.pokemon.baseStats
				.setHP(60)
				.setATK(70)
				.setDEF(180)
				.setSPA(60)
				.setSPD(170)
				.setSPE(10);
		new ModifyPokemon('Trevenant-Autumn', this)
			.baseStats
				.setATK(110)
				.setSPE(71);
		new ModifyPokemon('Octillery', this)
			.baseStats
				.setHP(76)
				.setATK(127)
				.setDEF(88)
				.setSPA(127)
				.setSPD(82)
			.pokemon.learnset
				.remove('Aeroblast')
				.remove('Origin Pulse');
		new ModifyPokemon('Camerupt-Mega', this)
			.baseStats
				.setATK(110);
	},
}