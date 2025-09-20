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
				.add('Ice Hammer');
		new ModifyPokemon('Abomasnow-Mega', this)
			.baseStats
				.setDEF(110)
				.setSPD(115);
		new ModifyPokemon('Absol', this)
			.abilities
				.setAbility0('Magic Bounce')
			.pokemon.baseStats
				.setDEF(58)
				.setSPD(50)
			.pokemon.learnset
				.add('Doom Desire')
				.add('Heat Wave')
				.add('Earthquake')
				.add('Hurricane')
				.remove('Fire Blast');
		new ModifyPokemon('Absol-Mega', this)
			.abilities
				.setAbility0('Disaster Zone')
			.pokemon.baseStats
				.setATK(140)
				.setSPA(115);
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
				.setDEF(73)
				.setSPA(55)
				.setSPE(132)
			.pokemon.learnset
				.add('Metal Claw')
				.add('Mighty Cleave')
				.remove('Rock Slide');
		new ModifyPokemon('Aerodactyl-Mega', this)
			.baseStats
				.setHP(90)
				.setDEF(93)
				.setSPA(75)
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
		new ModifyPokemon('Annihilape', this)
			.abilities
				.setAbility1('Grave Counter');
		new ModifyPokemon('Appletun', this)
			.baseStats
				.setHP(120)
				.setATK(65)
				.setDEF(100)
				.setSPD(95)
			.pokemon.learnset
				.add('Syrup Bomb');
		new ModifyPokemon('Araquanid', this)
			.baseStats
				.setHP(86)
				.setATK(83)
			.pokemon.learnset
				.add('Silk Trap');
		new ModifyPokemon('Arbok', this)
			.types
				.setType('Poison', 'Ground')
			.pokemon.baseStats
				.setHP(104)
				.setATK(106)
				.setDEF(93)
				.setSPA(54)
				.setSPD(91)
				.setSPE(96)
			.pokemon.learnset
				.add('Noxious Torque')
				.add('Wicked Torque');
		new ModifyPokemon('Arboliva', this)
			.abilities
				.setAbility1('Leaf Guard')
			.pokemon.baseStats
				.setHP(93)
				.setATK(59)
				.setDEF(104)
				.setSPD(118)
				.setSPE(31)
			.pokemon.learnset
				.add('Syrup Bomb')
				.add('Morning Sun')
				.add('Revival Blessing')
				.add('Natural Gift');
		new ModifyPokemon('Arcanine', this)
			.abilities
				.setHiddenAbility('Kingly Presence')
			.pokemon.learnset
				.add('Sacred Fire');
		new ModifyPokemon('Arcanine-Hisui', this)
			.baseStats
				.setHP(115)
				.setATK(120)
				.setDEF(95)
				.setSPA(85)
				.setSPD(90)
				.setSPE(95)
			.pokemon.learnset
				.add('Sacred Fire');
	},
 };