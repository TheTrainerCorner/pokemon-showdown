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
		new ModifyPokemon('Archeops', this)
			.baseStats
				.setHP(68)
			.pokemon.learnset
				.add('Crest Rush');
		new ModifyPokemon('Arctovish', this)
			.baseStats
				.setSPA(90)
				.setSPD(95)
				.setSPE(75)
			.pokemon.learnset
				.add('Cold Snap')
				.add('Sheer Cold');
		new ModifyPokemon('Arctozolt', this)
			.baseStats
				.setSPA(100)
				.setSPD(85)
				.setSPE(75)
			.pokemon.learnset
				.add('Cold Snap')
				.add('Sheer Cold');
		new ModifyPokemon('Armaldo', this)
			.types
				.setType('Steel','Bug')
			.pokemon.abilities
				.setHiddenAbility('Tough Claws')
			.pokemon.baseStats
				.setHP(70)
				.setDEF(105)
				.setSPA(85)
				.setSPD(100)
				.setSPE(55)
			.pokemon.learnset
				.add('Steel Wing')
				.add('Iron Head')
				.add('Tachyon Cutter')
				.add('Lunge')
				.add('Pounce')
				.add('Crabhammer')
				.add('Aqua Cutter')
				.remove('Earth Power')
				.remove('Cross Poison');
		new ModifyPokemon('Aromatisse', this)
			.learnset
				.add('Eeerie Spell')
				.add('Pixie Burst')
				.remove('Moonblast');
		new ModifyPokemon('Articuno-Galar', this)
			.baseStats
				.setHP(100)
				.setATK(60);
		new ModifyPokemon('Audino', this)
			.baseStats
				.setHP(114)
				.setATK(64)
				.setSPA(100)
			.pokemon.learnset
				.add('Pixie Burst')
				.remove('Moonblast');
		new ModifyPokemon('Audino-Mega', this)
			.baseStats
				.setHP(114)
				.setATK(64)
				.setSPA(110);
		new ModifyPokemon('Aurorus', this)
			.baseStats
				.setHP(123)
				.setSPA(108)
				.setSPD(102)
			.pokemon.learnset
				.add('Cold Snap');
		new ModifyPokemon('Azumarill', this)
			.baseStats
				.setATK(60)
				.setDEF(95)
				.setSPD(95)
				.setSPE(60)
			.pokemon.learnset
				.add('Aquatic Kick')
				.add('Flip Turn');
		new ModifyPokemon('Barbaracle', this)
			.learnset
				.add('Geodude Gatling')
				.add('Crag Blast')
				.add('Hammer Arm')
				.remove('Cut')
				.remove('Meteor Beam');
		new ModifyPokemon('Barraskewda', this)
			.baseStats
				.setATK(133)
			.pokemon.learnset
				.add('Triple Dive');
		new ModifyPokemon('Basculegion', this)
			.baseStats
				.setATK(122)
				.setSPA(75)
				.setSPE(73)
			.pokemon.learnset
				.add('Soul Fang');
		new ModifyPokemon('Basculegion-F', this)
			.abilities
				.setHiddenAbility('Cursed Body')
			.pokemon.baseStats
				.setATK(75)
				.setSPA(122)
				.setSPE(73)
			.pokemon.learnset
				.add('Soul Fang');
		new ModifyPokemon('Basculin',this)
			.learnset
				.remove('Cut');
		new ModifyPokemon('Bastiodon', this)
			.abilities
				.setHiddenAbility('Rock Head')
			.pokemon.baseStats
				.setDEF(153)
			.pokemon.learnset
				.add('Steel Spikes')
				.add('Head Smash');
		new ModifyPokemon('Baxcalibur', this)
			.abilities
				.setAbility1('Ice Scales')
			.pokemon.baseStats
				.setDEF(87)
				.setSPA(75)
				.setSPD(66)
				.setSPE(92);
		new ModifyPokemon('Beartic', this)
			.types 
				.setType('Ice','Fighting')
			.pokemon.learnset
				.add('Crush Claw');
		new ModifyPokemon('Beautifly', this)
			.abilities
				.setAbility1('Aroma Veil')
			.pokemon.baseStats
				.setDEF(70)
				.setSPD(70)
				.setSPE(93)
			.pokemon.learnset
				.add('Giga Drain')
				.add('Pixie Burst')
				.remove('Moonblast');
		new ModifyPokemon('Beedrill', this)
			.baseStats
				.setHP(70)
				.setATK(135)
				.setDEF(55)
				.setSPD(85)
				.setSPE(115)
			.pokemon.learnset
				.add('Piercing Doom');
		new ModifyPokemon('Beedrill-Mega', this)
			.baseStats
				.setHP(70)
				.setATK(165)
				.setDEF(65)
				.setSPD(105)
				.setSPE(155);
		new ModifyPokemon('Beeheeyem', this)
			.abilities
				.setHiddenAbility('Enlightenment')
			.pokemon.baseStats
				.setHP(110)
				.setSPD(100)
			.pokemon.learnset
				.add('Freezing Glare');
		new ModifyPokemon('Bellibolt', this)
			.learnset
				.add('Overdrive')
				.add('Stockpile')
				.add('Swallow')
				.add('Scald');
		new ModifyPokemon('Bellossom', this)
			.baseStats
				.setATK(50)
				.setSPA(110)
				.setSPE(75)
			.pokemon.learnset
				.add('Aromatherapy')
				.add('Pixie Burst')
				.remove('Moonblast')
				.remove('Cut');
		new ModifyPokemon('Bewear', this)
			.baseStats
				.setATK(130)
				.setSPE(55)
			.pokemon.learnset
				.add('Upper Hand')
				.add('Snuggle');
		new ModifyPokemon('Blacephalon', this)
			.baseStats
				.setHP(58)
				.setATK(107)
				.setDEF(63)
				.setSPD(84)
			.pokemon.learnset
				.add('Burning Jealousy');
		new ModifyPokemon('Blastoise', this)
			.baseStats
				.setSPA(95)
			.pokemon.learnset
				.add('Snipe Shot')
				.add('Soak')
				.add('Hard Press');
		new ModifyPokemon('Blastoise-Mega', this)
			.baseStats
				.setSPA(145);
		new ModifyPokemon('Blaziken', this)
			.abilities
				.setAbility1('Leg Day')
			.pokemon.learnset
				.remove('Cut');
		new ModifyPokemon('Bombirdier', this)
			.baseStats
				.setHP(92)
				.setATK(118)
			.pokemon.learnset
				.add('Smackdown')
				.add('Fling')
				.add('Defog')
				.add('Sky Drop')
				.add('Crest Rush');
		new ModifyPokemon('Bouffalant', this)
			.abilities
				.setAbility1('Fluffy')
			.pokemon.baseStats
				.setATK(155)
				.setSPA(10)
			.pokemon.learnset
				.remove('Cut')
				.remove('Poison Jab');
		new ModifyPokemon('Braviary', this)
			.learnset
				.add('Crest Rush');
		new ModifyPokemon('Braviary-Hisui', this)
			.learnset
				.add('Crest Rush')
				.remove('Dazzling Gleam');
		new ModifyPokemon('Breloom', this)
			.learnset
				.add('Sappy Seed')
				.add('Ivy Cudgel')
				.remove('Cut');
		new ModifyPokemon('Bronzong', this)
			.baseStats
				.setATK(79)
				.setSPA(89)
			.pokemon.learnset
				.remove('Recover');
		new ModifyPokemon('Bruxish', this)
			.learnset
				.add('Play Rough');
		new ModifyPokemon('Buzzwole', this)
			.abilities
				.setHiddenAbility('No Guard')
			.pokemon.learnset
				.add('Quantum Stance');
	},
 };