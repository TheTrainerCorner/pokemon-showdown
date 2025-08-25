import { ModifyPokemon } from "../../../tools/utils/modifyPokemon";
import { ModifyMove } from "../../../tools/utils/modifyMove";

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'ttc_season_4',
	init() {

		// Pokemon Changes
		new ModifyPokemon('Abomasnow', this)
			.baseStats
				.setDEF(85)
			.pokemon.learnset
				.add('icehammer');
		new ModifyPokemon('Abomasnow-Mega', this)
			.baseStats
				.setDEF(110)
				.setSPD(115);
		new ModifyPokemon('Absol', this)
			.abilities
				.setAbility0('Magic Bounce')
			.pokemon.learnset
				.add('Doom Desire');
		new ModifyPokemon('Absol-Mega', this)
			.abilities
				.setAbility0('Suresight');
		new ModifyPokemon('Accelgor', this)
			.abilities
				.setAbility0('Dry Skin')
				.setAbility1('Stakeout')
			.pokemon.learnset
				.add('Quick Guard')
				.add('Counter')
				.add('Strange Steam')
				.add('Razor Wind')
				.remove('Signal Beam');
		new ModifyPokemon('Acudraco', this);
		new ModifyPokemon('Aerodactyl', this)
			.baseStats
				.setHP(90)
				.setATK(120)
				.setDEF(73)
				.setSPE(132)
			.pokemon.learnset
				.add('Metal Claw')
				.add('Mighty Cleave')
				.remove('Rock Slide');
		new ModifyPokemon('Aerodactyl-Mega', this)
			.baseStats
				.setHP(90)
				.setATK(140)
				.setDEF(93)
				.setSPE(152);
		new ModifyPokemon('Aggron', this)
			.types
				.setType('Steel')
			.pokemon.learnset
				.add('Steel Spikes')
				.remove('Cut');
		new ModifyPokemon('Alakazam', this)
			.baseStats
				.setHP(75)
				.setATK(49)
				.setSPE(121);
		new ModifyPokemon('Alakazam-Mega', this)
			.abilities
				.setAbility0("Mind's Eye")
			.pokemon.baseStats
				.setHP(75)
				.setATK(59)
				.setSPE(136);
		new ModifyPokemon('Alcremie', this)
			.learnset
				.add('Pixie Burst')
				.remove('Moonblast');
		new ModifyPokemon('Alomomola', this)
			.baseStats
				.setSPA(50)
			.pokemon.learnset
				.add('Charm');
		new ModifyPokemon('Altaria', this)
			.baseStats
				.setATK(65)
				.setDEF(75)
				.setSPA(105)
				.setSPE(70)
			.pokemon.learnset
				.add('Pixie Burst')
				.remove('Moonblast');
		new ModifyPokemon('Ambipom', this)
			.learnset
				.add('Crag Blast')
				.add('Rock Blast')
				.add('Follow Me');
		new ModifyPokemon('Amoonguss', this)
			.baseStats
				.setHP(108)
				.setATK(89)
				.setDEF(89)
				.setSPA(89)
				.setSPD(94)
			.pokemon.learnset
				.add('Teeter Dance')
				.add('Chloroblast');
		new ModifyPokemon('Ampharos', this)
			.abilities
				.setHiddenAbility('Illuminate')
			.pokemon.baseStats
				.setATK(80)
				.setDEF(90);
		new ModifyPokemon('Ampharos-Mega', this)
			.baseStats
				.setDEF(110)
				.setSPE(50);
		
	},
 };