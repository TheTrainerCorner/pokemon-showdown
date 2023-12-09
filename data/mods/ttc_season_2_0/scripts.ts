import { ModifyPokemon } from '../../../tools/utils/modifyPokemon';

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'ttc_season_1_2',
	init() {
		// #region 2.0.0
		// Modify Pokemon
			// Gen 1
			new ModifyPokemon('Venusaur', this)
				.baseStats
					.setDEF(83)
					.setSPA(100);
			new ModifyPokemon('Venusaur-Mega', this)
				.baseStats
					.setHP(90);
			new ModifyPokemon('Charizard', this)
				.baseStats
					.setSPE(101);
			new ModifyPokemon('Charizard-MegaX', this)
				.baseStats
					.setDEF(116)
					.setSPE(101);
			new ModifyPokemon('Charizard-MegaY', this)
				.baseStats
					.setDEF(83)
					.setSPE(106);
			new ModifyPokemon('Butterfree', this)
				.abilities
					.setAbility1('Field Support');
			new ModifyPokemon('Beedrill', this)
				.baseStats
					.setATK(125)
					.setDEF(45)
				.pokemon.learnset
					.add('Barb Barrage');
			new ModifyPokemon('Beedrill-Mega', this)
				.baseStats
					.setATK(155)
					.setDEF(55)
					.setSPA(20)
					.setSPD(100);
			new ModifyPokemon('Pidgeot', this)
				.baseStats
					.setATK(90)
					.setSPA(95)
				.pokemon.learnset
					.add('Aeroblast');
			new ModifyPokemon('Pidgeot-Mega', this)
				.baseStats
					.setATK(100)
					.setDEF(90)
					.setSPE(131);
			new ModifyPokemon('Fearow', this)
				.abilities
					.setAbility1('Big Pecks')
				.pokemon.baseStats
					.setDEF(65)
					.setSPD(61)
				.pokemon.learnset
					.add('Torment')
					.add('Knock Off');
			new ModifyPokemon('Sandslash-Alola', this)
				.abilities
					.setAbility1('Battle Armor')
				.pokemon.baseStats
					.setHP(85)
					.setATK(105)
				.pokemon.learnset
					.add('Spin Out');
			new ModifyPokemon('Nidoking', this)
				.baseStats
					.setSPD(85)
					.setSPE(85);
			new ModifyPokemon('Nidoqueen', this)
				.baseStats
					.setSPA(101);
			new ModifyPokemon('Clefable', this)
				.abilities
					.setAbility0('Own Tempo');
			new ModifyPokemon('Ninetales', this)
				.baseStats
					.setHP(83)
					.setATK(67)
					.setDEF(85)
					.setSPD(110)
					.setSPE(109)
				.pokemon.learnset
					.add('Nasty Plot')
					.add('Infernal Parade');
			new ModifyPokemon('Crobat', this)
				.abilities
					.setAbility0('Unnerve')
				.pokemon.baseStats
					.setHP(90)
					.setATK(121)
					.setDEF(89)
					.setSPA(60)
					.setSPD(93)
					.setSPE(147);
			new ModifyPokemon('Vileplume', this)
				.abilities
					.setAbility0('Flower Veil')
				.pokemon.baseStats
					.setHP(85)
					.setDEF(95)
					.setSPD(100);
			new ModifyPokemon('Parasect', this)
				.abilities
					.setAbility1('Mycelium Might');
			new ModifyPokemon('Venonat', this)
				.learnset
					// Implemented in learnsets.ts
					//.remove('Sleep Power');
			new ModifyPokemon('Venomoth', this)
				.abilities
					.setHiddenAbility('Toxic Chain')
				.pokemon.baseStats
					.setDEF(70)
					.setSPA(100)
				.pokemon.learnset
					.add('Pollen Puff')
					.add('Sludge Wave')
					.add('Toxic Thread')
					// Implemented in learnsets.ts
					// .remove('Sleep Powder');
			new ModifyPokemon('Dugtrio', this)
				.baseStats
					.setSPE(135);
			new ModifyPokemon('Dugtrio-Alola', this)
				.baseStats
					.setSPE(120);
			new ModifyPokemon('Persian', this)
				.abilities
					.setHiddenAbility('Unnerve');
			new ModifyPokemon('Primeape', this)
				.abilities
					.setAbility1('Berserk')
				.pokemon.baseStats
					.setHP(75)
					.setDEF(70)
					.setSPD(80);
			new ModifyPokemon('Arcanine', this)
				.abilities
					.setAbility1('Ball Fetch');
			new ModifyPokemon('Alakazam', this)
				.abilities
					.setAbility0('Forewarn');
			new ModifyPokemon('Machamp', this)
				.baseStats
					.setHP(118)
					.setATK(145)
					.setDEF(100)
					.setSPA(75)
					.setSPE(67);
			new ModifyPokemon('Tentacruel', this)
				.abilities
					.setAbility0('Rain Dish');
			new ModifyPokemon('Rapidash', this)
				.baseStats
					.setATK(105)
				.pokemon.learnset
					.add('Blazing Torque');
			new ModifyPokemon('Rapidash-Galar', this)
				.baseStats
					.setATK(60)
					.setSPA(105)
				.pokemon.learnset
					.remove('Cosmic Power');
			new ModifyPokemon('Farfetchd', this)
				.abilities
					.setAbility1('Stalwart')
				.pokemon.baseStats
					.setDEF(72);
			new ModifyPokemon('Dodrio', this)
				.abilities
					.setAbility0('Tangled Feet');
			new ModifyPokemon('Dewgong', this)
				.abilities
					.setAbility1('Hydration');
			new ModifyPokemon('Muk', this)
				.abilities
					.setHiddenAbility('Stench')
				.pokemon.baseStats
					.setATK(105)
					.setDEF(85);
			new ModifyPokemon('Muk-Alola', this)
				.baseStats
					.setHP(95);
			new ModifyPokemon('Gengar-Mega', this)
				.baseStats
					.setHP(60)
					.setATK(95)
			new ModifyPokemon('Hypno', this)
				.abilities
					.setAbility0('Forewarn')
				.pokemon.baseStats
					.setSPE(77);
			new ModifyPokemon('Electrode', this)
				.baseStats
					.setHP(80)
					.setDEF(80);
			new ModifyPokemon('Electrode-Hisui', this)
				.baseStats
					.setSPA(100)
					.setSPE(150);
			new ModifyPokemon('Exeggutor-Alola', this)
				.baseStats
					.setSPE(40);
			new ModifyPokemon('Marowak', this)
				.abilities
					.setHiddenAbility('Battle Armor')
				.pokemon.baseStats
					.setATK(90)
					.setDEF(115)
					.setSPE(45);
			new ModifyPokemon('Marowak-Alola', this)
				.baseStats
					.setDEF(110)
					.setSPA(50);
			new ModifyPokemon('Hitmonlee', this)
				.baseStats
					.setHP(80)
					.setATK(128)
					.setDEF(81)
					.setSPE(66);
			new ModifyPokemon('Hitmonchan', this)
				.baseStats
					.setATK(114)
					.setSPE(77);
			new ModifyPokemon('Hitmontop', this)
				.baseStats
					.setATK(107)
					.setSPE(88);
			new ModifyPokemon('Rhydon', this)
				.abilities
					.setAbility0('Sap Sipper')
				.pokemon.baseStats
					.setHP(95)
					.setATK(120)
					.setDEF(110)
					.setSPD(50)
				.pokemon.learnset
					.add('Headlong Rush')
					.add('Head Smash');
			new ModifyPokemon('Rhyperior', this)
				.types
					.setType('Ground', 'Steel')
				.pokemon.abilities
					.setAbility0('Overcoat')
				.pokemon.baseStats
					.setHP(125)
					.setATK(150)
					.setDEF(140)
					.setSPD(60)
				.pokemon.learnset
					.add('Crag Blast');
			new ModifyPokemon('Kangaskhan', this)
				.learnset
					.add('Crush Grip')
					.add('Close Combat');
			new ModifyPokemon('Kangaskhan-Mega', this)
				.abilities
					.setAbility0('Adaptability');
			new ModifyPokemon('Kingdra', this)
				.learnset
					.remove('Origin Pulse');
			new ModifyPokemon('Seaking', this)
				.baseStats
					.setSPE(68);
			new ModifyPokemon('Starmie', this)
				.abilities
					.setAbility0('Illuminate');
			new ModifyPokemon('MrMime', this)
				.abilities
					.setAbility0('Screen Cleaner');
			new ModifyPokemon('Jynx', this)
				.abilities
					.setAbility0('Snow Cloak');
			new ModifyPokemon('Pinsir', this)
				.abilities
					.setAbility0('Berserk');
			new ModifyPokemon('Gyarados', this)
				.learnset
					.add('Dual Chop')
					.add('Dragon Rush');
			new ModifyPokemon('Jolteon', this)
				.abilities
					.setAbility1('Illuminate');
			new ModifyPokemon('Flareon', this)
				.abilities
					.setHiddenAbility('Turboblaze');
			new ModifyPokemon('Snorlax', this)
				.abilities
					.setAbility0('Toxic Boost');
			new ModifyPokemon('Articuno', this)
				.baseStats
					.setATK(60)
					.setSPD(135);
			new ModifyPokemon('Articuno-Galar', this)
				.baseStats
					.setDEF(90);
			new ModifyPokemon('Moltres', this)
				.baseStats
					.setATK(85)
					.setDEF(100)
					.setSPD(90);
			new ModifyPokemon('Zapdos', this)
				.baseStats
					.setDEF(90);
			new ModifyPokemon('Dragonite', this)
				.abilities
					.setAbility1('Stalwart')
				.pokemon.learnset
					.add('Sky Attack');
			// Gen 2
			new ModifyPokemon('Meganium', this)
				.baseStats
					.setSPA(100);
			new ModifyPokemon('Typhlosion', this)
				.baseStats
					.setATK(104)
					.setSPA(104)
					.setSPE(107);
			new ModifyPokemon('Furret', this)
				.abilities
					.setHiddenAbility('Run Away');
			new ModifyPokemon('Noctowl', this)
				.abilities
					.setAbility0('Early Bird');
			new ModifyPokemon('Ariados', this)
				.abilities
					.setAbility1('Toxic Chain');
			new ModifyPokemon('Xatu', this)
				.abilities
					.setAbility0('Forewarn');
			new ModifyPokemon('Bellossom', this)
				.abilities
					.setAbility1('Flower Veil')
				.pokemon.baseStats
					.setATK(60)
					.setSPE(70);
			new ModifyPokemon('Azumarill', this)
				.baseStats
					.setDEF(90)
					.setSPD(90);
			new ModifyPokemon('Jumpluff', this)
				.abilities
					.setAbility0('Leaf Guard');
			new ModifyPokemon('Sunflora', this)
				.baseStats
					.setSPA(130)
					.setSPE(68);
			new ModifyPokemon('Murkrow', this)
				.abilities
					.setAbility0('Early Bird');
			new ModifyPokemon('Mismagius', this)
				.baseStats
					.setSPE(105);
			new ModifyPokemon('Wobbuffet', this)
				.baseStats
					.setDEF(70)
					.setSPA(34)
					.setSPD(70);
			new ModifyPokemon('Girafarig', this)
				.baseStats
					.setSPE(99);
			new ModifyPokemon('Granbull', this)
				.baseStats
					.setSPE(86);
			new ModifyPokemon('Qwilfish', this)
				.abilities
					.setAbility1('Toxic Debris');
			new ModifyPokemon('Magcargo', this)
				.abilities
					.setAbility0('Magma Armor');
			new ModifyPokemon('Corsola', this)
				.baseStats
					.setHP(85)
					.setSPE(35)
				.pokemon.learnset
					.add('Salt Cure');
			new ModifyPokemon('Octillery', this)
				.abilities
					.setAbility1('Suction Cups');
			new ModifyPokemon('Delibird', this)
				.baseStats
					.setSPE(101);
			new ModifyPokemon('Houndoom', this)
				.abilities
					.setAbility0('Ball Fetch');
			new ModifyPokemon('Houndoom-Mega', this)
				.baseStats
					.setSPE(120);
			new ModifyPokemon('Wyrdeer', this)
				.abilities
					.setHiddenAbility('Fur Coat');
			new ModifyPokemon('Smeargle', this)
				.baseStats
					.setHP(75)
					.setATK(60)
					.setDEF(65)
					.setSPA(60)
					.setSPD(65);
			new ModifyPokemon('Entei', this)
				.baseStats
					.setDEF(100)
					.setSPA(85)
					.setSPD(85)
					.setSPE(100)
				.pokemon.learnset
					.remove('Eruption');
			new ModifyPokemon('Suicune', this)
				.learnset
					.add('Recover');
			new ModifyPokemon('Raikou', this)
				.learnset
					.remove('Rising Voltage');
			new ModifyPokemon('Tyranitar', this)
				.abilities
					.setAbility1('Solid Rock');
			// Gen 3
			new ModifyPokemon('Sceptile-Mega', this)
				.baseStats
					.setDEF(80)
					.setSPD(90);
			new ModifyPokemon('Blaziken-Mega', this)
				.baseStats
					.setATK(150)
					.setDEF(85)
					.setSPA(135)
					.setSPD(85)
					.setSPE(95);
			new ModifyPokemon('Mightyena', this)
				.abilities
					.setAbility1('Ball Fetch');
			new ModifyPokemon('Linoone', this)
				.baseStats
					.setSPA(62)
					.setSPE(103);
			new ModifyPokemon('Gardevoir', this)
				.abilities
					.setHiddenAbility('Aura Break');
			new ModifyPokemon('Shedinja', this)
				.baseStats
					.setATK(117)
					.setSPA(45)
					.setSPE(62);
			new ModifyPokemon('Delcatty', this)
				.abilities
					.setAbility0('Normalize')
				.pokemon.baseStats
					.setHP(86)
					.setATK(80)
					.setSPA(85)
					.setSPE(104);
			new ModifyPokemon('Sableye-Mega', this)
				.baseStats
					.setSPE(40);
			new ModifyPokemon('Mawile-Mega', this)
				.baseStats
					.setSPA(75);
			new ModifyPokemon('Medicham', this)
				.baseStats
					.setHP(80);
			new ModifyPokemon('Medicham-Mega', this)
				.baseStats
					.setHP(80)
					.setSPA(90)
					.setSPE(105);
			new ModifyPokemon('Manectric', this)
				.abilities
					.setAbility0('Teravolt')
					.setHiddenAbility('Ball Fetch');
			new ModifyPokemon('Plusle', this)
				.baseStats
					.setDEF(55)
					.setSPA(100);
			new ModifyPokemon('Minun', this)
				.baseStats
					.setATK(100)
					.setSPD(55);
			new ModifyPokemon('Illumise', this)
				.baseStats
					.setATK(90);
			new ModifyPokemon('Roselia', this)
				.abilities
					.setAbility0('Flower Veil');
			new ModifyPokemon('Roserade', this)
				.abilities
					.setAbility0('Flower Veil');
			new ModifyPokemon('Swalot', this)
				.abilities
					.setHiddenAbility('Power of Alchemy');
			new ModifyPokemon('Camerupt-Mega', this)
				.baseStats
					.setHP(90);
			new ModifyPokemon('Cacturne', this)
				.abilities
					.setAbility1('Sand Veil');
			new ModifyPokemon('Seviper', this)
				.abilities
					.setAbility1('Cold Blooded');
			new ModifyPokemon('Tropius', this)
				.baseStats
					.setHP(109)
					.setATK(102)
					.setDEF(88)
					.setSPA(58)
					.setSPD(92)
					.setSPE(91);
			new ModifyPokemon('Chimecho', this)
				.baseStats
					.setSPE(108);
			new ModifyPokemon('Lunatone', this)
				.types
					.setType('Rock', 'Psychic');
			new ModifyPokemon('Whiscash', this)
				.abilities
					.setAbility1('Anticipation')
				.pokemon.baseStats
					.setATK(78)
					.setSPD(81)
					.setSPE(75);
			new ModifyPokemon('Claydol', this)
				.abilities
					.setHiddenAbility('Field Support');
			new ModifyPokemon('Absol-Mega', this)
				.baseStats
					.setSPA(125);
			new ModifyPokemon('Glalie-Mega', this)
				.baseStats
					.setDEF(80);
			new ModifyPokemon('Gorebyss', this)
				.baseStats
					.setSPD(85);
			new ModifyPokemon('Salamence-Mega', this)
				.baseStats
					.setATK(110)
					.setDEF(135)
					.setSPD(100)
					.setSPE(115);
			new ModifyPokemon('Metagross', this)
				.abilities
					.setHiddenAbility('Full Metal Body')
				.pokemon.baseStats
					.setSPA(70);
			new ModifyPokemon('Metagross-Mega', this)
				.baseStats
					.setATK(155)
					.setSPA(100)
					.setSPD(110);
			new ModifyPokemon('Latias-Mega', this)
				.baseStats
					.setATK(110)
					.setSPD(160);
			new ModifyPokemon('Latios-Mega', this)
				.baseStats
					.setATK(140)
					.setDEF(100);
			new ModifyPokemon('Deoxys-Defense', this)
				.abilities
					.setHiddenAbility('Stall');
			new ModifyPokemon('Deoxys-Speed', this)
				.abilities
					.setHiddenAbility('Steadfast');
			// Gen 4
			new ModifyPokemon('Staraptor', this)
				.baseStats
					.setATK(123)
					.setSPE(112);
			new ModifyPokemon('Bibarel', this)
				.baseStats
					.setHP(89)
					.setDEF(80)
					.setSPD(80);
			new ModifyPokemon('Kricketune', this)
				.baseStats
					.setATK(73)
					.setSPA(105)
					.setSPE(93);
			new ModifyPokemon('Luxray', this)
				.baseStats
					.setHP(89)
					.setATK(133)
					.setDEF(94)
					.setSPA(88)
					.setSPD(94)
					.setSPE(102);
			new ModifyPokemon('Rampardos', this)
				.abilities
					.setHiddenAbility('Mold Breaker');
			new ModifyPokemon('Wormadam', this)
				.baseStats
					.setHP(80);
			new ModifyPokemon('Wormadam-Sandy', this)
				.baseStats
					.setHP(80)
					.setSPA(54)
					.setSPD(90);
			new ModifyPokemon('Vespiquen', this)
				.abilities
					.setHiddenAbility('Swarm');
			new ModifyPokemon('Pachirisu', this)
				.baseStats
					.setHP(85);
			new ModifyPokemon('Ambipom', this)
				.abilities
					.setAbility1('Pickup');
			new ModifyPokemon('Drifblim', this)
				.abilities
					.setAbility0('Rocky Payload');
			new ModifyPokemon('Lopunny', this)
				.abilities
					.setHiddenAbility('Pickup');
			new ModifyPokemon('Lopunny-Mega', this)
				.baseStats
					.setATK(136)
					.setSPE(135);
			new ModifyPokemon('Purugly', this)
				.baseStats
					.setSPE(102);
			new ModifyPokemon('Skuntank', this)
				.abilities
					.setHiddenAbility('Power Of Alchemy');
			new ModifyPokemon('Chatot', this)
				.abilities
					.setAbility0('Run Away')
				.pokemon.baseStats
					.setHP(85);
			new ModifyPokemon('Garchomp', this)
				.baseStats
					.setSPE(92);
			new ModifyPokemon('Garchomp-Mega', this)
				.baseStats
					.setDEF(110)
					.setSPD(90);
			new ModifyPokemon('Lucario', this)
				.abilities
					.setAbility0('Aura Break');
			new ModifyPokemon('Lucario-Mega', this)
				.baseStats
					.setATK(125)
					.setDEF(93)
					.setSPA(135)
					.setSPD(85)
					.setSPE(112);
			new ModifyPokemon('Toxicroak', this)
				.baseStats
					.setATK(105)
					.setSPA(102);
			new ModifyPokemon('Carnivine', this)
				.baseStats
					.setHP(94)
					.setDEF(102)
					.setSPD(102)
					.setSPE(36);
			new ModifyPokemon('Lumineon', this)
				.learnset
					.add('Recover');
			new ModifyPokemon('Abomasnow', this)
				.abilities
					.setAbility1('Snow Cloak');
			new ModifyPokemon('Abomasnow-Mega', this)
				.baseStats
					.setATK(142)
					.setSPA(137)
					.setSPD(110)
					.setSPE(40);
			new ModifyPokemon('Electivire', this)
				.abilities
					.setAbility1('Vital Spirit');
			new ModifyPokemon('Magmortar', this)
				.abilities
					.setAbility1('Magma Armor');
			new ModifyPokemon('Mamoswine', this); // TODO Figure out what the hell ??? means
			new ModifyPokemon('Gallade', this)
				.baseStats
					.setATK(115)
					.setSPD(95)
					.setSPE(80);
			new ModifyPokemon('Gallade-Mega', this)
				.baseStats
					.setATK(135);
			new ModifyPokemon('Dusknoir', this)
				.abilities
					.setAbility0('Grave Counter');
			new ModifyPokemon('Rotom-Heat', this)
				.baseStats
					.setHP(75);
			new ModifyPokemon('Rotom-Mow', this)
				.learnset
					.remove('Grassy Glide');
			new ModifyPokemon('Rotom-Frost', this)
				.baseStats
					.setHP(70)
					.setSPA(105)
					.setSPE(96);
			new ModifyPokemon('Rotom-Fan', this)
				.learnset
					.remove('Boomburst');
			new ModifyPokemon('Uxie', this)
				.abilities
					.setAbility0('Knowledge')
				.pokemon.baseStats
					.setHP(105)
					.setATK(60)
					.setSPA(100)
					.setSPE(75);
			new ModifyPokemon('Mesprit', this)
				.types
					.setType('Psychic', 'Fairy')
				.pokemon.abilities
					.setAbility0('Emotion')
				.pokemon.baseStats
					.setATK(115)
					.setDEF(110)
					.setSPA(115)
					.setSPD(100)
					.setSPE(90);
			new ModifyPokemon('Azelf', this)
				.types
					.setType('Psychic', 'Fighting')
				.pokemon.abilities
					.setAbility0('Willpower')
				.pokemon.baseStats
					.setATK(125)
					.setDEF(75)
					.setSPA(130)
					.setSPD(75)
				.pokemon.learnset
					.add('Focus Punch')
					.add('Focus Blast');
			// Gen 5
			new ModifyPokemon('Victini', this)
				.baseStats
					.setDEF(94)
					.setSPD(94)
					.setSPE(107);
			new ModifyPokemon('Emboar', this)
				.baseStats
					.setSPE(40);
			new ModifyPokemon('Samurott', this)
				.baseStats
					.setHP(90)
					.setDEF(80)
					.setSPD(65);
			new ModifyPokemon('Diggersby', this)
				.baseStats
					.setATK(62)
					.setSPE(84);
			new ModifyPokemon('Watchog', this)
				.baseStats
					.setSPE(87);
			new ModifyPokemon('Stoutland', this)
				.abilities
					.setAbility0('Ball Fetch')
					.setAbility1('Guard Dog')
				.pokemon.baseStats
					.setHP(106)
					.setATK(123)
					.setDEF(104)
					.setSPA(61)
					.setSPD(115)
					.setSPE(91);
			new ModifyPokemon('Simipour', this)
				.baseStats
					.setHP(75)
				.pokemon.learnset
					.remove('Water Spout');
			new ModifyPokemon('Simisear', this)
				.learnset
					.remove('Eruption');
			new ModifyPokemon('Unfezant', this)
				.abilities
					.setAbility1('Big Pecks')
				.pokemon.baseStats
					.setSPE(113);
			new ModifyPokemon('Zebstrika', this)
				.abilities
					.setHiddenAbility('Teravolt');
			new ModifyPokemon('Swoobat', this)
				.baseStats
					.setHP(72)
					.setDEF(65);
			new ModifyPokemon('Audino', this)
				.abilities
					.setAbility1('Healer');
			new ModifyPokemon('Leavanny', this)
				.abilities
					.setAbility1('Overcoat');
			new ModifyPokemon('Whimsicott', this)
				.abilities
					.setHiddenAbility('Cloud Nine');
			new ModifyPokemon('Lilligant', this)
				.abilities
					.setHiddenAbility('Flower Veil');
			new ModifyPokemon('Garbodor', this)
				.types
					.setType('Poison', 'Steel')
				.pokemon.abilities
					.setAbility0('Toxic Debris');
			new ModifyPokemon('Cinccino', this)
				.abilities
					.setAbility1('Cute Charm');
			new ModifyPokemon('Swanna', this)
				.baseStats
					.setDEF(60)
					.setSPD(60);
			new ModifyPokemon('Sawsbuck-Winter', this)
				.abilities
					.setAbility0('Snow Cloak')
				.pokemon.baseStats
					.setHP(80)
					.setDEF(75)
					.setSPA(130)
					.setSPD(75)
					.setSPE(110);
			// Sawsbuck-Spring is Sawsbuck
			new ModifyPokemon('Sawsbuck', this)
				.abilities
					.setAbility1('Seed Sower')
				.pokemon.baseStats
					.setATK(50)
					.setDEF(85)
					.setSPA(110)
					.setSPD(85)
					.setSPE(100);
			new ModifyPokemon('Sawsbuck-Summer', this)
				.abilities
					.setAbility1('Heatproof')
				.pokemon.learnset
					.remove('V Create');
			new ModifyPokemon('Escavalier', this)
				.abilities
					.setAbility0('Hustle');
			new ModifyPokemon('Amoonguss', this)
				.abilities
					.setAbility1('Mycelium Might');
			new ModifyPokemon('Jellicent', this)
				.abilities
					.setAbility0('Damp');
			new ModifyPokemon('Ferrothorn', this)
				.abilities
					.setAbility1('Mycelium Might');
			new ModifyPokemon('Klinklang', this)
				.abilities
					.setAbility1('Motor Drive');
			new ModifyPokemon('Haxorus', this)
				.abilities
					.setAbility0('Mold Breaker');
			new ModifyPokemon('Beartic', this)
				.baseStats
					.setSPE(77);
			new ModifyPokemon('Stunfisk', this)
				.abilities
					.setAbility1('Limber');
			new ModifyPokemon('Druddigon', this)
				.baseStats
					.setATK(125)
					.setDEF(105)
					.setSPD(105)
					.setSPE(48)
				.pokemon.learnset
					.add('Spikes');
			new ModifyPokemon('Golurk', this)
				.abilities
					.setAbility1('Grave Counter');
			new ModifyPokemon('Braviary', this)
				.abilities
					.setAbility1('Stalwart')
				.pokemon.baseStats
					.setHP(108)
					.setDEF(81)
					.setSPD(81);
			new ModifyPokemon('Braviary-Hisui', this)
				.baseStats
					.setHP(108)
					.setDEF(76)
					.setSPD(76);
			new ModifyPokemon('Mandibuzz', this)
				.abilities
					.setAbility0('Stall');
			new ModifyPokemon('Heatmor', this)
				.abilities
					.setAbility0('Turoblaze')
				.pokemon.baseStats
					.setSPE(88);
			new ModifyPokemon('Durant', this)
				.abilities
					.setAbility1('Hustle');
			new ModifyPokemon('Cobalion', this)
				.abilities
					.setHiddenAbility('Inner Focus')
				.pokemon.baseStats
					.setHP(96)
					.setATK(85)
					.setDEF(124)
					.setSPA(85)
					.setSPD(107)
					.setSPE(83);
			new ModifyPokemon('Terrakion', this)
				.abilities
					.setHiddenAbility('Rocky Payload')
				.pokemon.baseStats
					.setHP(81)
					.setATK(124)
					.setDEF(90)
					.setSPA(77)
					.setSPD(90)
				.pokemon.learnset
					.add('Stone Axe');
			new ModifyPokemon('Virizion', this)
				.baseStats
					.setHP(91)
					.setATK(65)
					.setSPA(131)
					.setSPD(104);
			new ModifyPokemon('Tornadus', this)
				.abilities
					.setAbility1('Cloud Nine');
			new ModifyPokemon('Thundurus', this)
				.abilities
					.setAbility1('Cloud Nine');
			new ModifyPokemon('Landorus', this)
				.abilities
					.setAbility1('Cloud Nine');
			new ModifyPokemon('Keldeo', this)
				.baseStats
					.setATK(96)
					.setSPE(114);
			new ModifyPokemon('Keldeo-Resolute', this)
				.baseStats
					.setATK(96)
					.setSPE(114);
		// Gen 6
		new ModifyPokemon('Florges', this)
			.abilities
				.setAbility1('Symbiosis');
		new ModifyPokemon('Furfrou', this)
			.abilities
				.setAbility1('Receiver');
		new ModifyPokemon('Aromatisse', this)
			.abilities
				.setAbility1('Aroma Veil');
		new ModifyPokemon('Meowstic', this)
			.baseStats
				.setSPA(79);
		new ModifyPokemon('Meowstic-F', this)
			.baseStats
				.setDEF(73)
				.setSPA(113)
				.setSPD(68)
				.setSPE(119);
		new ModifyPokemon('Malamar', this)
			.abilities
				.setAbility1('Suction Cups');
		new ModifyPokemon('Barbaracle', this)
			.abilities
				.setAbility1('Quick Draw');
		new ModifyPokemon('Clawitzer', this)
			.baseStats
				.setDEF(93)
				.setSPD(94)
			.pokemon.learnset
				.remove('Origin Pulse');
		new ModifyPokemon('Tyrantrum', this)
			.baseStats
				.setDEF(134)
				.setSPE(76);
		new ModifyPokemon('Aurorus', this)
			.baseStats
				.setHP(118)
				.setSPA(104)
				.setSPD(87);
		new ModifyPokemon('Hawlucha', this)
			.abilities
				.setHiddenAbility('Costar')
			.pokemon.baseStats
				.setDEF(85)
				.setSPE(108);
		new ModifyPokemon('Noivern', this)
			.abilities
				.setAbility0('Frisk')
				.setHiddenAbility('Delta Stream')
			.pokemon.baseStats
				.setSPE(123)
				.setSPA(97);
		new ModifyPokemon('Dedenne', this)
			.abilities
				.setAbility1('Pickup')
			.pokemon.baseStats
				.setSPA(105);
		new ModifyPokemon('Carbink', this)
			.abilities
				.setAbility1('Field Support')
				.setHiddenAbility('Solid Rock');
		new ModifyPokemon('Goodra', this)
			.abilities
				.setAbility1('Hydration')
				.setHiddenAbility('Corrosion');
		// Gen 7
		new ModifyPokemon('Decidueye', this)
			.baseStats
				.setDEF(75)
				.setSPD(90);
		new ModifyPokemon('Primarina', this)
			.learnset
				.remove('Boomburst');
		new ModifyPokemon('Gumshoos', this)
			.baseStats
				.setHP(108)
				.setATK(132)
				.setDEF(70)
				.setSPD(70)
				.setSPE(45)
			.pokemon.learnset
				.add('Sucker Punch')
				.add('Parting Shot');
		new ModifyPokemon('Crabominable', this)
			.abilities
				.setAbility0('Berserk');
		new ModifyPokemon('Oricorio', this)
			.baseStats
				.setHP(80)
				.setSPA(108)
				.setSPD(75)
				.setSPE(98);
		new ModifyPokemon('Oricorio-PomPom', this)
			.baseStats
				.setHP(80)
				.setSPA(108)
				.setSPD(75)
				.setSPE(98);
		new ModifyPokemon('Oricorio-Pau', this)
			.baseStats
				.setHP(80)
				.setSPA(108)
				.setSPD(75)
				.setSPE(98);
		new ModifyPokemon('Oricorio-Sensu', this)
			.baseStats
				.setHP(80)
				.setSPA(108)
				.setSPD(75)
				.setSPE(98);
		new ModifyPokemon('Lycanroc', this)
			.baseStats
				.setATK(117)
				.setSPA(58)
				.setSPE(122);
		new ModifyPokemon('Lycanroc-Dusk', this)
			.baseStats
				.setDEF(75)
				.setSPD(75);
		new ModifyPokemon('Lycanroc-Midnight', this)
			.baseStats
				.setATK(117)
				.setDEF(84)
				.setSPA(35)
				.setSPD(84);
		new ModifyPokemon('Shiinotic', this)
			.abilities
				.setAbility0('Illuminate')
			.pokemon.baseStats
				.setHP(80);
		new ModifyPokemon('Bewear', this)
			.abilities
				.setAbility1('Unnerve');
		new ModifyPokemon('Tsareena', this)
			.baseStats
				.setDEF(108)
				.setSPE(72);
		new ModifyPokemon('Oranguru', this)
			.abilities
				.setHiddenAbility('Symbiosis');
		new ModifyPokemon('Passimian', this)
			.abilities
				.setAbility1('Receiver');
		new ModifyPokemon('Silvally', this)
			.abilities
				.setAbility1('Normalize');
		new ModifyPokemon('Drampa', this)
			.abilities
				.setAbility0('Allergies')
				.setAbility1('Power of Alchemy')
			.pokemon.baseStats
				.setHP(98)
				.setSPD(96);
		new ModifyPokemon('Kommoo', this)
			.abilities
				.setAbility0('Unnerve');
		new ModifyPokemon('Celesteela', this)
			.abilities
				.setHiddenAbility('Heavy Metal');
		new ModifyPokemon('Naganadel', this)
			.baseStats
				.setSPA(127)
				.setSPE(121);
		new ModifyPokemon('Melmetal', this)
			.abilities
				.setHiddenAbility('Full Metal Body')
			.pokemon.learnset
				.add('Meteor Mash');
		// Gen 8
		new ModifyPokemon('Inteleon', this)
			.learnset
				.add('Calm Mind');
		new ModifyPokemon('Dubwool', this)
			.abilities
				.setHiddenAbility('Simple');
		new ModifyPokemon('Thievul', this)
			.abilities
				.setAbility1('Run Away');
		new ModifyPokemon('Boltund', this)
			.abilities
				.setHiddenAbility('Ball Fetch');
		new ModifyPokemon('Flapple', this)
			.abilities
				.setAbility1('Hustle')
			.pokemon.baseStats
				.setATK(113)
				.setSPE(87);
		new ModifyPokemon('Hatterene', this)
			.abilities
				.setAbility0('Anticipation');
		new ModifyPokemon('Sirfetchd', this)
			.abilities
				.setAbility0('Stalwart');
		new ModifyPokemon('MrRime', this)
			.abilities
				.setAbility0('Tangled Feet');
		new ModifyPokemon('Alcremie', this)
			.abilities
				.setAbility1('Aroma Veil');
		new ModifyPokemon('Falinks', this)
			.baseStats
				.setHP(85)
				.setATK(100)
				.setDEF(100)
				.setSPE(75);
		new ModifyPokemon('Pincurchin', this)
			.baseStats
				.setHP(88);
		new ModifyPokemon('Stonjourner', this)
			.baseStats
				.setSPE(10);
		new ModifyPokemon('Arctozolt', this)
			.abilities
				.setAbility0('Allergies');
		new ModifyPokemon('Dracozolt', this)
			.abilities
				.setAbility0('Allergies')
			.pokemon.baseStats
				.setSPD(80);
		new ModifyPokemon('Dracovish', this)
			.baseStats
				.setSPA(80);
		new ModifyPokemon('Dragapult', this)
			.abilities
				.setAbility0('Unnerve');
		new ModifyPokemon('Regieleki', this)
			.baseStats
				.setHP(80);
		new ModifyPokemon('Ursaluna', this)
			.abilities
				.setHiddenAbility('Vital Spirit');
		new ModifyPokemon('Enamorus', this)
			.baseStats
				.setSPA(135);
		// Gen 9
		new ModifyPokemon('Spidops', this)
			.abilities
				.setAbility0('Stakeout')
				.setHiddenAbility('Toxic Boost')
			.pokemon.baseStats
				.setATK(95);
		new ModifyPokemon('Pawmot', this)
			.baseStats
				.setDEF(73)
				.setSPE(117);
		new ModifyPokemon('Maushold', this)
			.abilities
				.setAbility1('Pickup');
		new ModifyPokemon('Armarouge', this)
			.abilities
				.setAbility0('Artillery')
				.setHiddenAbility('Quick Draw')
			.pokemon.baseStats
				.setHP(100)
				.setATK(70)
				.setDEF(115)
				.setSPA(135)
				.setSPD(85)
				.setSPE(95);
		new ModifyPokemon('Ceruledge', this)
			.abilities
				.setAbility1('Steadfast')
				.setHiddenAbility('Quick Draw')
			.pokemon.baseStats
				.setHP(89)
				.setATK(135)
				.setDEF(85)
				.setSPA(70)
				.setSPD(115)
				.setSPE(105);
		new ModifyPokemon('Kilowattrel', this)
			.abilities
				.setAbility0('Teravolt');
		new ModifyPokemon('Wugtrio', this)
			.abilities
				.setHiddenAbility('Sand Veil')
			.pokemon.baseStats
				.setSPE(135);
		new ModifyPokemon('bombirdier', this)
			.baseStats
				.setHP(87)
				.setDEF(94)
				.setSPD(94);
		new ModifyPokemon('Revavroom', this)
			.abilities
				.setAbility1('Motor Drive');
		new ModifyPokemon('Orthworm', this)
			.abilities
				.setAbility1('Sand Veil');
		new ModifyPokemon('Houndstone', this)
			.abilities
				.setHiddenAbility('Receiver');
		new ModifyPokemon('Flamigo', this)
			.abilities
				.setHiddenAbility('Tangled Feet');
		new ModifyPokemon('Veluza', this)
			.baseStats
				.setATK(109)
				.setSPE(110);
		new ModifyPokemon('Flutter Mane', this)
			.baseStats
				.setHP(70)
				.setATK(70)
				.setDEF(70)
				.setSPA(120)
				.setSPD(120)
				.setSPE(120);
		new ModifyPokemon('Chi-Yu', this)
			.baseStats
				.setSPA(115);
		new ModifyPokemon('Roaring Moon', this)
			.baseStats
				.setATK(134)
				.setSPE(114);
		new ModifyPokemon('Iron Valiant', this)
			.baseStats
				.setATK(125)
				.setSPE(111);
		new ModifyPokemon('Walking Wake', this)
			.baseStats
				.setHP(94)
				.setSPA(120);
		new ModifyPokemon('Ogerpon', this)
			.abilities
				.setHiddenAbility('Stalwart');
		new ModifyPokemon('Ogerpon-Cornerstone', this)
			.abilities
				.setAbility0('Rivalry');
		// Modify Moves
		const lightMoves = ['Dazzling Gleam', 'Freezing Glare', 'LightofRuin', 'Photon Geyser', 'Charge Beam', 'Prismatic Laser'];
		for(const move of lightMoves) {
			this.modData('Moves', move.includes(' ') ? move.toLowerCase().replace(' ', '') : move.toLowerCase()).flags['light'] = 1;
		}
		const weightMoves = ['Grass Knot', 'Heavy Slam'];
		for(const move of weightMoves) {
			this.modData('Moves', move.includes(' ') ? move.toLowerCase().replace(' ', '') : move.toLowerCase()).flags['weight'] = 1;
		}
		const peckMoves = ['Peck', 'Pluck', 'Drill Peck', 'Beak Blast'];
		for (const move of peckMoves) {
			this.modData('Moves', move.includes(' ') ? move.toLowerCase().replace(' ', '') : move.toLowerCase()).flags['peck'] = 1;
		}
		const disableMoves = ['Taunt', 'Imprison'];
		for (const move of disableMoves) {
			this.modData('Moves', move.includes(' ') ? move.toLowerCase().replace(' ', '') : move.toLowerCase()).flags['disable'] = 1;
		}
		const blastMoves = ['Aeroblast', 'Astral Barrage', 'Barb Barrage', 'Beak Blast', 'Chloroblast', 'Crag Blast', 'Population Bomb', 'Rock Blast', 'Seed Bomb', 'Sludge Bomb', 'Tera Blast', 'Barrage', 'Blast Burn', 'Egg Bomb', 'Magnet Bomb', 'Mud Bomb', 'Octazooka', 'Explosion', 'Self Destruct', 'Syrup Bomb', 'Techno Blast'];
		for (const move of blastMoves) {
			this.modData('Moves', move.includes(' ') ? move.toLowerCase().replace(' ', '') : move.toLowerCase()).flags['blast'] = 1;
		}
		const pivotMoves = ['uturn', 'flipturn', 'voltswitch', 'batonpass', 'partingshot'];
		for (const move of pivotMoves) {
			this.modData('Moves', move.includes(' ') ? move.toLowerCase().replace(' ', '') : move.toLowerCase()).flags['pivot'] = 1;
		}
		// #endregion
	},
};
