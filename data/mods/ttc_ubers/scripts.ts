import { ModifyPokemon } from "../../../tools/utils/modifyPokemon";

export const Scripts: ModdedBattleScriptsData = {
	inherit: "ttc_season_3",
	init() {
		// Gen 1
		new ModifyPokemon('Blastoise', this)
			.baseStats
				.setHP(84)
				.setSPE(88);
		new ModifyPokemon('Blastoise-Mega', this)
			.baseStats
				.setHP(84)
				.setSPE(88);
			// Allow Shell Smash
		new ModifyPokemon('Arcanine', this)
			.types
				.setType('Fire', "Electric")
			.pokemon.baseStats
				.setHP(105)
				.setSPE(125);
		new ModifyPokemon('aerodactyl', this)
			.baseStats
				.setATK(130)
				.setDEF(80)
				.setSPD(90)
			.pokemon.learnset
				.add('Brave Bird');
		new ModifyPokemon('Aerodactyl-Mega', this)
			.baseStats
				.setATK(150)
				.setDEF(100)
				.setSPD(110);
		new ModifyPokemon('Articuno', this)
			.baseStats
				.setSPE(110);
		new ModifyPokemon('Zapdos', this)
			.baseStats
				.setATK(125);
		new ModifyPokemon('Moltres', this)
			.baseStats
				.setSPA(140)
				.setSPE(115);
		new ModifyPokemon('Mew', this)
			.baseStats
				.setHP(110)
				.setATK(110)
				.setDEF(110)
				.setSPA(110)
				.setSPD(110)
				.setSPE(110);
		// Gen 2
		new ModifyPokemon('Heracross', this)
			.baseStats
				.setHP(90)
				.setDEF(95)
				.setSPE(105);
		new ModifyPokemon('Heracross-Mega', this)
			.baseStats
				.setHP(90)
				.setDEF(125)
				.setSPE(105);
		new ModifyPokemon('Kingdra', this)
			.abilities
				.setHiddenAbility('Primordial Sea')
			.pokemon.baseStats
				.setHP(90)
				.setATK(100)
				.setSPA(120)
				.setSPE(100);
		new ModifyPokemon('Raikou', this)
			.baseStats
				.setSPA(135)
				.setSPE(135);
		new ModifyPokemon('Entei', this)
			.baseStats
				.setSPA(120)
				.setSPE(120);
		new ModifyPokemon('Suicune', this)
			.baseStats
				.setHP(130)
				.setSPE(110);
		// Gen 3
		new ModifyPokemon('Blaziken', this)
			.abilities
				.setAbility1('Speed Boost');
		new ModifyPokemon('Blaziken', this)
			.abilities
				.setAbility0('Speed Boost');
		new ModifyPokemon('Slaking', this)
			.abilities
				.setAbility0('Scrappy');
		new ModifyPokemon('Absol', this)
			.baseStats
				.setHP(95)
				.setDEF(68)
				.setSPE(112);
		new ModifyPokemon('Absol-Mega', this)
			.baseStats
				.setHP(95)
				.setDEF(73)
				.setSPE(139);
		new ModifyPokemon('Salamence-Mega', this)
			.abilities
				.setAbility0('Aerilate');
		new ModifyPokemon('Deoxys', this)
			.baseStats
				.setHP(70)
				.setDEF(60)
				.setSPD(60)
				.setSPE(130);
		new ModifyPokemon('Deoxys-Attack', this)
			.baseStats
				.setHP(70);
		new ModifyPokemon('Deoxys-Speed', this)
			.baseStats
				.setHP(70)
				.setSPA(110)
				.setSPE(165);
		new ModifyPokemon('Deoxys-Defense', this)
			.baseStats
				.setHP(70)
				.setSPA(90)
				.setSPE(70);
		// Gen 4
		new ModifyPokemon('Rampardos', this)
			.baseStats
				.setSPE(83);
		new ModifyPokemon('Bastiodon', this)
			.baseStats
				.setHP(95);
		new ModifyPokemon('Lucario', this)
			.baseStats
				.setHP(75)
				.setATK(130)
				.setSPA(135);
		new ModifyPokemon('Lucario', this)
			.baseStats
				.setHP(75)
				.setATK(145)
				.setSPA(155);
		new ModifyPokemon('Electivire', this)
			.baseStats
				.setATK(143)
				.setSPD(100)
				.setSPE(100);
		new ModifyPokemon('Magmortar', this)
			.baseStats
				.setSPA(145)
				.setSPE(103);
		new ModifyPokemon('Dialga-Origin', this)
			.baseStats
				.setATK(80)
				.setSPE(110);
		new ModifyPokemon('Palkia-Origin', this)
			.baseStats
				.setHP(110)
				.setATK(80);
		new ModifyPokemon('Regigigas', this)
			.abilities
				.setAbility0('Unseen Fist');
		new ModifyPokemon('Shaymin-Sky', this)
			.baseStats
				.setHP(110)
				.setATK(83)
				.setSPA(130);
		// Gen 5
		new ModifyPokemon('Audino', this)
			.baseStats
				.setHP(123)
				.setDEF(96)
				.setSPA(90)
				.setSPD(96);
		new ModifyPokemon('Audino-Mega', this)
			.abilities
				.setAbility0('Regenerator')
			.pokemon.baseStats
				.setHP(123)
				.setDEF(136)
				.setSPA(100)
				.setSPD(136);
		new ModifyPokemon('Kyurem-Black', this)
			.baseStats
				.setATK(170)
				.setSPE(95);
		new ModifyPokemon('Genesect', this); // Allow Douses
		// Gen 6
		new ModifyPokemon('Aegislash', this);
		new ModifyPokemon('Xerneas', this);
		new ModifyPokemon('Yveltal', this);
		new ModifyPokemon('Zygarde-Complete', this);
		new ModifyPokemon('Hoopa-Unbound', this);
		// Gen 7
		new ModifyPokemon('TapuKoko', this);
		new ModifyPokemon('TapuLele', this);
		new ModifyPokemon('TapuBulu', this);
		new ModifyPokemon('TapuFini', this);
		new ModifyPokemon('Solgaleo', this);
		new ModifyPokemon('Lunala', this);
		new ModifyPokemon('Naganadel', this);
		// Gen 8
		new ModifyPokemon('Dragapult', this);
		new ModifyPokemon('Zacian', this);
		new ModifyPokemon('Zamazenta', this);
		new ModifyPokemon('Eternatus', this);
		new ModifyPokemon('Calyrex-Ice', this);
		new ModifyPokemon('Calyrex-Shadow', this);
		// Gen 9
		new ModifyPokemon('Wo-Chien', this);
		new ModifyPokemon('Chien-Pao', this);
		new ModifyPokemon('Ting-Lu', this);
		new ModifyPokemon('Chi-Yu', this);
		new ModifyPokemon('Koriadon', this);
		new ModifyPokemon('Miraidon', this);
		new ModifyPokemon('Okidogi', this);
		new ModifyPokemon('Munkidori', this);
		new ModifyPokemon('Fezandipiti', this);
	}
};