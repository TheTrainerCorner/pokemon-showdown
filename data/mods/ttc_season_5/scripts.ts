import { ModifyPokemon } from "../../../tools/utils/modifyPokemon";
import { ModifyMove } from "../../../tools/utils/modifyMove";

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'ttc_season_4',
	init() {
		// Move Changes
		new ModifyMove('Ivy Cudgel', this)
			.flags
				.add('hammer');
		new ModifyMove('Twineedle', this)
			.secondaries
				.setStatusCondition('tox', 20)
			.move
				.descriptions
					.setLongDesc("Hits 2 times. Has a 20% chance to badly poison the target.")
					.setShortDesc("Hits 2 times. 20% chance to badly poison.");
		new ModifyMove('Fly', this)
			.setBasePower(120);
		new ModifyMove('Dig', this)
			.setBasePower(120);
		new ModifyMove('Dive', this)
			.setBasePower(120);
		new ModifyMove('Skull Bash', this)
			.setBasePower(150)
			.secondaries
				.setVolatileStatus('flinch', 10)
			.move.descriptions
				.setLongDesc("Raises User's Defense by 1 on turn 1. Hits turn 2. Has a 10% chance to flinch the target.")
				.setShortDesc("Raises user's Def by 1 on turn 1. Hits Turn 2. 10% chance to flinch.");
		new ModifyMove('Sky Drop', this)
			.setBasePower(80);
		new ModifyMove('Blaze Kick', this)
			.setBasePower(100)
			.setAccuracy(90);
		new ModifyMove('Meditate', this)
			.setPowerPoint(32)
			.secondaries.setSelfBoost({ atk: 1, spa: 1 });
		new ModifyMove('Stone Edge', this)
			.setAccuracy(85);
		new ModifyMove('Rock Slide', this)
			.setAccuracy(95);
		new ModifyMove('Rock Blast', this)
			.setAccuracy(95);
		new ModifyMove('Tail Slap', this)
			.setAccuracy(90);
		new ModifyMove('Bone Rush', this)
			.setAccuracy(95);
		new ModifyMove('Pin Missile', this)
			.setAccuracy(95);
		new ModifyMove('Mortal Spin', this)
			.setBasePower(50);
		new ModifyMove('Feint', this)
			.setBasePower(45);
		new ModifyMove('Sand Tomb', this)
			.setAccuracy(90);
		new ModifyMove('Bonemerang', this)
			.setAccuracy(90);
		new ModifyMove('Rock Tomb', this)
			.setAccuracy(95);
		new ModifyMove('Bone Club', this)
			.setAccuracy(90)
			.setBasePower(75);
		new ModifyMove('Razor Shell', this)
			.setAccuracy(95);
		new ModifyMove('Play Rough', this)
			.setAccuracy(95);
		new ModifyMove('Heat Wave', this)
			.setAccuracy(95);
		new ModifyMove('Meteor Beam', this)
			.setAccuracy(95);
		new ModifyMove('Charge Beam', this)
			.setBasePower(55);
		new ModifyMove('Icicle Crash', this)
			.setAccuracy(95);
		new ModifyMove('Focus Blast', this)
			.secondaries
				.setTargetBoosts({ spd: -1}, 10)
			.move.descriptions
				.setLongDesc("10% chance to lower the target's Special Defense by 1 stage.")
				.setShortDesc("10% chance to lower the target's Sp. Def by 1.");
		new ModifyMove('Snipe Shot', this)
			.flags
				.add('pulse');
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
		new ModifyPokemon('Aegislash', this)
			.learnset
				.add('Zen Headbutt');
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
				.setDEF(90)
			.pokemon.learnset
				.add('Flash Cannon');
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
				.add('Heal Block')
				.add('Hypnosis')
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
		new ModifyPokemon('Avalugg-Hisui', this)
			.learnset
				.add('Hydro Pump');
		new ModifyPokemon('Azumarill', this)
			.baseStats
				.setATK(60)
				.setDEF(95)
				.setSPD(95)
				.setSPE(60)
			.pokemon.learnset
				.add('Aquatic Kick')
				.add('Flip Turn');
		new ModifyPokemon('Banette', this)
			.learnset
				.add('Slash')
				.add('Heal Block')
				.add('Zen Headbutt');
		new ModifyPokemon('Barbaracle', this)
			.learnset
				.add('Geodude Gatling')
				.add('Crag Blast')
				.add('Hammer Arm')
				.add('Close Combat')
				.add('Waterfall')
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
				.add('Piercing Doom')
				.add('Bug Buzz')
				.add('Lunge');
		new ModifyPokemon('Beedrill-Mega', this)
			.baseStats
				.setHP(70)
				.setATK(165)
				.setDEF(65)
				.setSPD(105)
				.setSPE(155);
		new ModifyPokemon('Beheeyem', this)
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
				.setHP(57)
				.setATK(103)
				.setDEF(63)
				.setSPD(89)
			.pokemon.learnset
				.add('Burning Jealousy');
		new ModifyPokemon('Blastoise', this)
			.baseStats
				.setSPA(95)
			.pokemon.learnset
				.add('Snipe Shot')
				.add('Soak')
				.add('Hard Press')
				.add('Iron Head');
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
		new ModifyPokemon('Cacturne', this)
			.abilities
				.setAbility1('Rough Skin')
				.setHiddenAbility('Petrifying Gaze')
			.pokemon.baseStats
				.setATK(80)
				.setDEF(105)
				.setSPA(80)
				.setSPD(105)
				.setSPE(60)
			.pokemon.learnset
				.add('Life Dew')
				.add('Muddy Water')
				.add('Snarl')
				.add('Acid Spray')
				.add('Aerial Ace')
				.add('Chilling Water')
				.add('Camouflage');
		new ModifyPokemon('Calyrex', this)
			.abilities
				.setAbility0('Telepathy')
			.pokemon.baseStats
				.setATK(100)
				.setDEF(100)
				.setSPA(110)
				.setSPD(100)
				.setSPE(90)
			.pokemon.learnset
				.add('Luster Purge')
				.add('Teleport')
				.add('Chloroblast')
				.add('Healing Wish');
		new ModifyPokemon('Camerupt', this)
			.abilities
				.setHiddenAbility('Artillery');
		new ModifyPokemon('Carbink', this)
			.learnset
				.add('Pixie Burst')
				.add('Self-Destruct')
				.remove('Moonblast')
				.remove('Recover');
		new ModifyPokemon('Carnivine', this)
			.types
				.setType('Grass')
			.pokemon.abilities
				.setAbility0('Gluttony')
			.pokemon.baseStats
				.setATK(108)
				.setDEF(92)
				.setSPA(80)
				.setSPD(92)
				.setSPE(66);
		new ModifyPokemon('Carracosta', this)
			.types
				.setType('Water','Steel')
			.pokemon.baseStats
				.setHP(94)
				.setSPD(90)
			.pokemon.learnset
				.add('Wave Crash')
				.add('Fishous Rend')
				.add('Trick Room');
		new ModifyPokemon('Castform', this)
			.baseStats
				.setHP(90)
				.setATK(90)
				.setDEF(90)
				.setSPA(90)
				.setSPD(90)
				.setSPE(90);
		new ModifyPokemon('Celebi', this)
			.learnset
				.add('Forests Curse')
				.add('Flower Trick')
				.add('Teleport')
				.remove('Cut');
		new ModifyPokemon('Celesteela', this)
			.learnset	
				.add('Armor Cannon')
				.add('Clear Smog')
				.add('Corrosive Gas')
				.add('Lift Off');
		new ModifyPokemon('Centiskorch', this)
			.baseStats
				.setSPA(80)
				.setSPE(85)
			.pokemon.learnset
				.add('Flame Charge')
				.add('Temper Flare')
				.add('Sizzly Slide')
				.remove('Heat Crash');
		new ModifyPokemon('Ceruledge', this)
			.abilities
				.setHiddenAbility('Blaze');
		new ModifyPokemon('Cetitan', this)
			.baseStats
				.setHP(160)
				.setSPD(65);
		new ModifyPokemon('Chandelure', this)
			.baseStats
				.setHP(75)
				.setATK(65)
				.setDEF(75)
				.setSPA(150)
				.setSPD(80)
				.setSPE(90)
			.pokemon.learnset
				.add('Torch Song')
				.add('Heal block')
				.add('Flame Wheel');
		new ModifyPokemon('Chatot', this)
			.baseStats
				.setDEF(55)
				.setSPA(97)
				.setSPD(52)
			.pokemon.learnset
				.add('Metronome')
				.add('Roaring Bellow')
				.add('Crest Rush');
		new ModifyPokemon('Cherrim', this)
			.abilities
				.setAbility1('None')
			.pokemon.baseStats
				.setHP(80)
				.setATK(79)
				.setDEF(72)
				.setSPA(102)
				.setSPD(75)
				.setSPE(82)
			.pokemon.learnset
				.add('Chloroblast')
				.add('Fiery Dance')
				.add('Flower Trick')
				.add('Heat Wave')
				.add('Overheat')
				.add('Temper Flare')
				.remove('Morning Sun')
				.remove('Moonblast');
		new ModifyPokemon('Cherrim-Sunshine', this)
			.types
				.setType('Grass','Fire')
			.pokemon.baseStats
				.setHP(80)
				.setATK(79)
				.setDEF(72)
				.setSPA(102)
				.setSPD(75)
				.setSPE(82);
		new ModifyPokemon('Chesnaught', this)
			.learnset
				.add('Growth');
		new ModifyPokemon('Chi-Yu', this)
			.learnset
			.add('Lava Tsunami');
		new ModifyPokemon('Clawitzer', this)
			.learnset
				.remove('Cut');
		new ModifyPokemon('Claydol', this)
			.learnset
				.add('Synchronoise')
				.add('Psychic Noise')
				.remove('Rain Dance');
		new ModifyPokemon('Clefable', this)
			.learnset
				.add('Psychic Noise')
				.add('Pixie Burst')
				.add('Air Slash')
				.add('Heal Block');
		new ModifyPokemon('Clodsire', this)
			.abilities	
				.setAbility0('Gooey')
			.pokemon.learnset
				.add('Corrosive Gas');
		new ModifyPokemon('Cloyster', this)
			.types
				.setType('Water', 'Rock')
			.pokemon.abilities
				.setHiddenAbility('Rough Skin')
			.pokemon.learnset
				.add('Head Smash')
				.add('Stealth Rock')
				.add('Power Gem')
				.remove('Signal Beam');
		new ModifyPokemon('Coalossal', this)
			.learnset
				.add('Searing Shot')
				.add('Crag Blast');
		new ModifyPokemon('Cobalion', this)
			.learnset
				.add('Psyshield Bash');
		new ModifyPokemon('Cofagrigus', this)
			.learnset
				.add('Bitter Malice');
		new ModifyPokemon('Conkeldurr', this)
			.learnset
				.add('Bestow');
		new ModifyPokemon('Copperajah', this)
			.learnset
				.add('Steel Spikes')
				.add('Toxic');
		new ModifyPokemon('Corsola', this)
			.abilities
				.setAbility0('Rough Skin');
		new ModifyPokemon('Corsola-Galar', this)
			.baseStats
				.setHP(85)
				.setDEF(95)
				.setSPA(105)
				.setSPD(95)
				.setSPE(35);
		new ModifyPokemon('Corviknight', this)
			.learnset
				.add('Spikes')
				.add('Crest Rush');
		new ModifyPokemon('Crabominable', this)
			.baseStats
				.setATK(137)
				.setDEF(87)
				.setSPD(82);
		new ModifyPokemon('Cradily', this)
			.baseStats
				.setHP(116)
				.setATK(91)
				.setSPE(23);
		new ModifyPokemon('Cramorant', this)
			.baseStats
				.setATK(110)
				.setSPA(110)
			.pokemon.learnset
				.add('Crest Rush');
		new ModifyPokemon('Crawdaunt', this)
			.baseStats
				.setHP(73)
				.setSPD(65)
			.pokemon.learnset
				.add('Flip Turn');
		new ModifyPokemon('Cryogonal', this)
			.baseStats
				.setATK(50)
				.setSPD(150)
				.setSPE(110);
		new ModifyPokemon('Darkrai', this)
			.learnset
				.remove('Cut');
		new ModifyPokemon('Darmanitan', this)
			.baseStats
				.setATK(130)
				.setSPE(105)
			.pokemon.learnset
				.add('Psychic Noise', 8);
		new ModifyPokemon('Darmanitan-Zen', this)
			.baseStats
				.setDEF(85)
				.setSPA(130)
				.setSPD(85)
				.setSPE(45);
		new ModifyPokemon('Darmanitan-Galar', this)
			.baseStats
				.setATK(130)
				.setSPE(105)
			.pokemon.learnset
				.remove('Belly Drum');
		new ModifyPokemon('Darmanitan-GalarZen', this)
			.baseStats
				.setATK(130)
				.setDEF(50)
				.setSPD(50)
				.setSPE(115);
		new ModifyPokemon('Decidueye', this)
			.abilities
				.setHiddenAbility('Bellligerent Quills')
			.pokemon.learnset
				.add('Crest Rush');
		new ModifyPokemon('Decidueye-Hisui', this)
			.baseStats
				.setSPA(70)
				.setSPE(95)
			.pokemon.learnset
				.add('Crest Rush');
		new ModifyPokemon('Dedenne', this)
			.baseStats
				.setATK(53)
				.setDEF(85)
				.setSPA(91)
				.setSPD(93)
			.pokemon.learnset
				.add('Pixie Burst')
				.remove('Cut')
				.remove('Moonblast');
		new ModifyPokemon('Delcatty', this)
			.learnset
				.add('Pixie Burst')
				.remove('Moonblast');
		new ModifyPokemon('Delphox', this)
			.learnset
				.remove('Cut');
		new ModifyPokemon('Delphox-Speed', this)
			.learnset
				.remove('Cut');
		new ModifyPokemon('Dewgong', this)
			.learnset
				.add('Chilly Reception');
		new ModifyPokemon('Dhelmise', this)
			.learnset
				.add('Hard Press');
		new ModifyPokemon('Dodrio', this)
			.learnset
				.add('Crest Rush');
		new ModifyPokemon('Dondozo', this)
			.learnset
				.add('Flip Turn')
				.add('Clamp');
		new ModifyPokemon('Donphan', this)
			.abilities
				.setHiddenAbility('Stamina');
		new ModifyPokemon('Dracovish', this)
			.baseStats
				.setHP(100)
				.setDEF(105)
				.setSPA(90);
		new ModifyPokemon('Dracozolt', this)
			.abilities
				.setHiddenAbility('Electromorphasis')
			.pokemon.baseStats
				.setHP(100)
				.setATK(110)
				.setDEF(95);
		new ModifyPokemon('Dragalge', this)
			.baseStats
				.setHP(75)
			.pokemon.learnset	
				.add('Poison Jab');
		new ModifyPokemon('Dragonite', this)
			.learnset
				.remove('Cut')
				.add('Whirlwind');
		new ModifyPokemon('Drampa', this)
			.learnset
				.add('Body Slam')
				.add('Parabolic Charge')
				.add('Whirlwind')
				.add('Earth Power');
		new ModifyPokemon('Drapion', this)
			.types
				.setType('Bug','Dark')
			.pokemon.baseStats
				.setATK(106)
			.pokemon.learnset
				.add('First Impression');
		new ModifyPokemon('Dubwool', this)
			.abilities
				.setHiddenAbility('Rock Head')
			.pokemon.baseStats
				.setATK(110)
				.setSPA(40)
				.setSPE(78);
		new ModifyPokemon('Dugtrio', this)
			.learnset
				.remove('Cut');
		new ModifyPokemon('Dusknoir', this)
			.learnset
				.add('Rage Fist');
		new ModifyPokemon('Dustox', this)
			.baseStats
				.setATK(65)
				.setDEF(90)
				.setSPA(65);
		new ModifyPokemon('Eiscue', this)
			.learnset
				.add('Chilly Reception');
		new ModifyPokemon('Eiscue-Noice', this)
			.learnset
				.add('Chilly Reception');
		new ModifyPokemon('Eldegoss', this)
			.abilities
				.setHiddenAbility('Wind Rider')
			.pokemon.learnset
				.add('Sappy Seed')
				.add('Floaty Fall');
		new ModifyPokemon('Electrode', this)
			.baseStats
				.setSPA(95);
		new ModifyPokemon('Electrode-Hisui', this)
			.baseStats
				.setDEF(85)
				.setSPA(95)
				.setSPD(85);
		new ModifyPokemon('Emboar', this)
			.learnset
				.add('Flame Wheel');
		new ModifyPokemon('Emolga', this)
			.baseStats
				.setSPA(100)
			.pokemon.learnset
				.add('Crest Rush');
		new ModifyPokemon('Empoleon', this)
			.abilities
				.setAbility1('Kingly Presence');
		new ModifyPokemon('Enamorus', this)
			.learnset
				.add('Pixie Burst')
				.remove('Moonblast');
		new ModifyPokemon('Enamorus-Therian', this)
			.learnset
				.add('Pixie Burst')
				.remove('Moonblast');
		new ModifyPokemon('Entei', this)
			.abilities
				.setAbility0('White Smoke');
		new ModifyPokemon('Escavalier', this)
			.abilities
				.setAbility1('Steadfast')
			.pokemon.learnset
				.add('Lunge');
		new ModifyPokemon('Espathra', this)
			.baseStats
				.setDEF(65)
				.setSPD(65);
		new ModifyPokemon('Espeon', this)
			.baseStats
				.setDEF(70)
				.setSPA(135)
			.pokemon.learnset
				.add('Heal Block')
				.add('Safeguard')
				.remove('Cut');
		new ModifyPokemon('Excadrill', this)
			.learnset
				.add('Megahorn')
				.add('Agility');
		new ModifyPokemon('Exploud', this)
			.baseStats
				.setHP(106)
				.setDEF(71)
			.pokemon.learnset
				.add('Roaring Bellows');
		new ModifyPokemon('Falinks', this)
			.baseStats
				.setSPD(80)
				.setSPE(80);
		new ModifyPokemon('Farfetchd-Mega', this)
			.abilities
				.setAbility0('Sharpness');
		new ModifyPokemon('Farigiraf', this)
			.baseStats
				.setDEF(85)
				.setSPE(55);
		new ModifyPokemon('Fearow', this)
			.baseStats
				.setATK(110)
				.setDEF(70)
				.setSPA(51)
				.setSPD(66)
			.pokemon.learnset
				.add('Crest Rush');
		new ModifyPokemon('Fezandipiti', this)
			.learnset
				.add('Pixie Burst')
				.remove('Moonblast');
		new ModifyPokemon('Flamigo', this)
			.learnset
				.add('Axe Kick')
				.add('Aquatic Kick')
				.add('Crest Rush');
		new ModifyPokemon('Flareon', this)
			.learnset	
				.add('Flame Wheel')
				.add('Swords Dance')
				.add('Taunt');
		new ModifyPokemon('Floette', this)
			.learnset
				.add('Pixie Burst')
				.remove('Moonblast');
		new ModifyPokemon('Floette-Eternal', this)
			.abilities
				.setAbility0('Oblivious')
				.setAbility1('Symbiosis')
				.setHiddenAbility('Grassy Surge')
			.pokemon.learnset
				.add('Pixie Burst')
				.remove('Moonblast');
		new ModifyPokemon('Florges', this)
			.learnset
				.add('Pixie Burst')
				.remove('Moonblast');
		new ModifyPokemon('Flutter Mane', this)
			.learnset
				.add('Pixie Burst')
				.remove('Moonblast');
		new ModifyPokemon('Flygon', this)
			.abilities
				.setAbility1('Overcoat')
			.pokemon.learnset
				.add('Clanging Scales');
		new ModifyPokemon('Forretress', this)
			.learnset
				.add('Steel Spikes');
		new ModifyPokemon('Frosslass', this)
			.learnset
				.add('Phantom Force')
				.add('Nasty Plot')
				.add('Heal Block');
		new ModifyPokemon('Furfrou', this)
			.abilities
				.setAbility1('Ball Fetch')
			.pokemon.learnset
				.add('Fire Fang')
				.add('Ice Fang')
				.add('Thunder Fang')
				.add('Crunch')
				.add('Double-Edge')
				.add('Hyper Beam');
		new ModifyPokemon('Furret', this)
			.baseStats	
				.setATK(86)
				.setSPD(65)
			.pokemon.learnset
				.add('Extreme Speed')
				.remove('Cut');
		new ModifyPokemon('Galvantula', this)
			.abilities
				.setAbility1('Tinted Lens')
			.pokemon.learnset
				.remove('Cut')
				.remove('Swift');
		new ModifyPokemon('Garbodor', this)
			.baseStats
				.setHP(100)
				.setDEF(97)
			.pokemon.learnset
				.add('Hard Press')
				.add('Steel Spikes')
				.add('Heal Block')
				.add('Bullet Seed');
		new ModifyPokemon('Gardevoir-Mega', this)
			.types
				.setType('Psychic', 'Cosmic')
			.pokemon.abilities	
				.setAbility0('Dawn Of Lunacy')
			.pokemon.baseStats
				.setATK(75)
				.setDEF(80)
			.pokemon.learnset
				.add('Pixie Burst');
		new ModifyPokemon('Gengar', this)
			.baseStats
				.setSPA(135)
				.setSPE(115)
			.pokemon.learnset
				.add('Shadow Sneak');
		new ModifyPokemon('Gengar-Mega', this)
			.baseStats
				.setSPA(150)
				.setSPE(125);
		new ModifyPokemon('Gigalith', this)
			.baseStats
				.setSPA(80)
			.pokemon.learnset
				.remove('Gravity');
		new ModifyPokemon('Glaceon', this)
			.learnset
				.add('Chilly Reception')
				.add('Taunt');
		new ModifyPokemon('Gogoat', this)
			.learnset
				.add('Megahorn');
		new ModifyPokemon('Golduck', this)
			.abilities
				.setHiddenAbility('Telepathy')
			.pokemon.baseStats
				.setATK(102)
				.setSPA(92)
				.setSPE(90)
			.pokemon.learnset
				.add('Meditate')
				.add('Twin Beam');
		new ModifyPokemon('Golurk', this)
			.learnset
				.add('Rage Fist');
		new ModifyPokemon('Goodra', this)
			.learnset
				.add('Giga Drain');
		new ModifyPokemon('Goodra-Hisui', this)
			.learnset
				.add('Iron Defense');
		new ModifyPokemon('Gorebyss', this)
			.learnset
				.add('Wish')
				.add('Bouncy Bubble')
				.add('Pixie Burst')
				.remove('Moonblast');
		new ModifyPokemon('Gourgeist', this)
			.learnset
				.add('Hypnosis')
				.add('Fire Spin')
				.add('Self-Destruct')
				.add('Shadow Claw');
		new ModifyPokemon('Grafaiai', this)
			.learnset
				.add('Gastro Acid')
				.add('Assist')
				.add('Snatch');
		new ModifyPokemon('Granbull', this)
			.abilities	
				.setHiddenAbility('Friend Guard');
		new ModifyPokemon('Grapploct', this)
			.learnset
				.add('Aqua Jet')
				.remove('Jet Punch');
		new ModifyPokemon('Greedent', this)
			.baseStats
				.setHP(130)
				.setDEF(95)
			.pokemon.learnset
				.add('Barrage')
				.add('Population Bomb');
		new ModifyPokemon('Greninja', this)
			.learnset
				.add('Nasty Plot')
				.add('Psyshock')
				.add('Flip Turn')
				.remove('Cut');
		new ModifyPokemon('Grumpig', this)
			.abilities
				.setAbility1('Pig Out');
		new ModifyPokemon('Gumshoos', this)
			.baseStats
				.setDEF(73)
				.setSPA(40)
				.setSPD(75)
				.setSPE(42);
		new ModifyPokemon('Guzzlord', this)
			.learnset
				.add('Darkest Lariat')
				.add('Obstruct');
		new ModifyPokemon('Hariyama', this)
			.baseStats
				.setHP(154)
				.setDEF(85)
				.setSPD(88)
			.pokemon.learnset
				.add('Play Rough');
		new ModifyPokemon('Hatterene', this)
			.abilities
				.setAbility0('Synchronize')
			.pokemon.learnset
				.add('Freezing Glare')
				.add('Pixie Burst')
				.remove('Moonblast');
		new ModifyPokemon('Hawlucha', this)
			.abilities
				.setAbility0('Early Bird')
			.pokemon.baseStats
				.setATK(97)
				.setSPA(69)
			.pokemon.learnset
				.add('Air Slash');
		new ModifyPokemon('Haxorus', this)
			.learnset
				.add('Dragon Hammer');
		new ModifyPokemon('Heliolisk', this)
			.abilities
				.setAbility1('Sand Force')
			.pokemon.baseStats
				.setATK(59)
				.setSPE(114)
			.pokemon.learnset
				.add('Flash Cannon')
				.add('Mornging Sun');
		new ModifyPokemon('Heracross', this)
			.abilities
				.setAbility0('Battle Armor')
			.pokemon.learnset
				.add('Outrage');
		new ModifyPokemon('Hitmonlee', this)
			.learnset
				.add('Aquatic Kick');
		new ModifyPokemon('Honchkrow', this)
			.learnset
				.add('Population Bomb')
				.add('Crest Rush');
		new ModifyPokemon('Hoopa', this)
			.learnset
				.add('Heal Block');
		new ModifyPokemon('Houndoom', this)
			.abilities
				.setHiddenAbility('Drought');
		new ModifyPokemon('Houndstone', this)
			.abilities
				.setAbility0('Grave Counter')
				.setHiddenAbility('Fluffy')
			.pokemon.learnset
				.add('Shadow Bone');
		new ModifyPokemon('Hydrapple', this)
			.learnset
				.add('Apple Acid');
		new ModifyPokemon('Hypno', this)
			.baseStats
				.setATK(76)
				.setDEF(85)
				.setSPE(74);
		new ModifyPokemon('Illumise', this)
			.learnset
				.add('Powder');
		new ModifyPokemon('Indeedee', this)
			.learnset
				.add('Revival Blessing');
		new ModifyPokemon('Infernape', this)
			.abilities
				.setHiddenAbility('Turboblaze')
			.pokemon.learnset
				.add('Fiery Dance')
				.add('Burn Up');
		new ModifyPokemon('Inteleon', this)
			.learnset
				.add('Frost Breath');
		new ModifyPokemon('Iron Boulder', this)
			.learnset
				.add('Psyblade');
		new ModifyPokemon('Iron Bundle', this)
			.baseStats
				.setATK(72)
			.pokemon.learnset
				.add('Frost Breath');
		new ModifyPokemon('Iron Crown', this)
			.learnset
				.add('Psyblade');
		new ModifyPokemon('Iron Explorer', this)
			.baseStats
				.setATK(92)
				.setSPA(112)
				.setSPD(52);
		new ModifyPokemon('Iron Leaves', this)
			.learnset
				.add('U-Turn');
		new ModifyPokemon('Iron Moth', this)
			.learnset
				.add('Searing Shot')
				.remove('Sludge Wave')
				.remove('Toxic')
				.remove('Toxic Spikes');
		new ModifyPokemon('Iron Thorns', this)
			.learnset
				.add('Shift Gear')
				.add('Plasma Fists')
				.remove('Bolt Strike');
		new ModifyPokemon('Iron Treads', this)
			.abilities
				.setHiddenAbility('Screen Cleaner');
		new ModifyPokemon('Iron Valiant', this)
			.learnset
				.add('Pixie Burst')
				.add('Secret Sword')
				.remove('Moonblast');
		new ModifyPokemon('Jirachi', this)
			.abilities
				.setHiddenAbility('Cosmic Surge')
			.pokemon.learnset
				.add('Rock Slide');
		new ModifyPokemon('Jolteon', this)
			.baseStats
				.setATK(60)
				.setDEF(65)
			.pokemon.learnset
				.add('Electro Shot');
		new ModifyPokemon('Jumpluff', this)
			.abilities
				.setAbility0('Unburden')
				.setAbility1('Wind Rider')
			.pokemon.baseStats
				.setSPA(70)
			.pokemon.learnset
				.add('Spore')
				.add('Sappy Seed')
				.remove('Pay Day');
		new ModifyPokemon('Jynx', this)
			.learnset
				.add('Dazzling Gleam');
	},
 };