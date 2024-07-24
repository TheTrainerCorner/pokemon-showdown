import { ModifyPokemon } from "../../../tools/utils/modifyPokemon";
import { formatOrder } from '../../../lib/utils';

export const Scripts: ModdedBattleScriptsData = {
	inherit: "ttc_season_2",
	init() {

		// Giving Tindraco and Devdraco the tag to use their back sprite
		this.modData("Pokedex", "tindraco").tags = ["Fakemon", "Has Back Sprite"];
		this.modData("Pokedex", "devdraco").tags = ["Fakemon", "Has Back Sprite"];
		// Adjusting Meowth's data to include Meowth-Mega
		this.modData("Pokedex", "meowth").otherFormes = ["Meowth-Alola", "Meowth-Galar", "Meowth-Mega"];
		this.modData("Pokedex", "meowth").formeOrder = ["Meowth", "Meowth-Alola", "Meowth-Galar", "Meowth-Mega"];
		// Adjusting Eevee-Starter's data to include Eevee-Mega
		this.modData("Pokedex", "eevee").otherFormes = undefined;
		this.modData("Pokedex", "eevee").formeOrder = undefined;
		this.modData("Pokedex", "eeveestarter").baseSpecies = undefined;
		this.modData("Pokedex", "eeveestarter").forme = undefined;
		this.modData("Pokedex", "eeveestarter").otherFormes = ["Eevee-Mega"];
		this.modData("Pokedex", "eeveestarter").formeOrder = ["Eevee-Starter", "Eevee-Mega"];
		this.modData("Pokedex", "eeveestarter").tags = ["Fakemon", "Has Back Sprite"];
		this.modData("Pokedex", "eeveestarter").natDexTier = "OU";
		// Adjusting Empoleon's data to include Empoleon-Mega
		this.modData("Pokedex", "empoleon").otherFormes = ["Empoleon-Mega"];
		this.modData("Pokedex", "empoleon").formeOrder = ["Empoleon", "Empoleon-Mega"];
		// Adjusting Pangoro's data to include Pangoro-Mega
		this.modData("Pokedex", "pangoro").otherFormes = ["Pangoro-Mega"];
		this.modData('Pokedex', "pangoro").formeOrder = ["Pangoro", "Pangoro-Mega"];
		// Adjusting Lickitung's data to include Lickitung-Hisui
		this.modData("Pokedex", "lickitung").otherFormes = ["Lickitung-Hisui"];
		this.modData("Pokedex", "lickitung").formeOrder = ["Lickitung", "Lickitung-Hisui"];
		//#region Gen 1
		new ModifyPokemon("Aerodactyl", this)
			.learnset
				.remove("Celebrate")
			.pokemon.baseStats
				.setSPA(50)
		new ModifyPokemon("Arbok", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Aerodactyl-Mega", this)
			.baseStats
				.setHP(80)
		new ModifyPokemon("Alakazam-Mega", this)
			.baseStats
				.setATK(60)
				.setDEF(62)
				.setSPD(113)
		new ModifyPokemon("Blastoise", this)
			.learnset
				.remove("Celebrate")
				.remove("Steam Eruption")
		new ModifyPokemon("Charizard", this)
			.learnset
				.remove("Celebrate")
		new ModifyPokemon("Chansey", this)
			.learnset
				.remove("Celebrate")
		new ModifyPokemon("Dragonite", this)
			.baseStats
				.setHP(101)
				.setSPA(80)
				.setSPD(95)
				.setSPE(75);
		new ModifyPokemon("Eevee", this)
			.learnset
				.remove("Celebrate")
		new ModifyPokemon("Eevee-Starter", this)
			.learnset
				// Coverage Moves For this FRICKIN POKEMON WTF AM I LOOKING AT
				// Bug
				.add("U Turn")
				// Dark
				.add("Brutal Swing").add("Crunch").add("Snarl").add("Foul Play")
				.add("Knock Off").add("Lash Out").add("Pursuit").add("Thief")
				// Dragon
				.add("Dragon Claw").add("Dragon Tail")
				// Electric
				.add("Nuzzle").add("Thunder Fang").add("Wild Charge").add("Zing Zap")
				// Fairy
				.add("Play Rough").add("Draining Kiss")
				// Fighting
				.add("Aura Sphere").add("Body Press").add("Flying Press").add("Focus Blast")
				// Fire
				.add("Fire Fang").add("Blaze Kick").add("Fire Lash").add("Flame Charge").add("Temper Flare")
				// Flying
				.add("Bounce").add("Acrobatics")
				// Ghost
				.add("Shadow Claw").add("Shadow Punch").add("Lick")
				// Grass
				.add("Cut").add("Power Whip").add("Bullet Seed").add("Grass Knot").add("Grassy Glide").add("Trop Kick")
				// Ground
				.add("Mud Bomb").add("Bulldoze").add("Stomping Tantrum").add("High Horsepower")
				// Ice
				.add("Ice Fang").add("Ice Ball").add("Ice Beam").add("Avalanche").add("Icy Wind")
				// Normal
				.add("Tail Slap").add("Crush Claw").add("Encore").add("Fake Out").add("Play Nice")
				.add("Slash").add("Super Fang").add("Thrash").add("Dire Claw")
				// Psychic
				.add("Zen Headbutt").add("Extrasensory").add("Psychic Fangs").add("Mirror Coat").add("Magic Coat")
				// Rock
				.add("Rollout").add("Rock Slide").add("Rock Tomb").add("Smack Down").add("Tar Shot").add("Ancient Power")
				// Steel
				.add("Hard Press").add("Iron Head").add("Metal Claw").add("Smart Strike").add("Spin Out")
				// Water
				.add("Muddy Water").add("Aqua Tail").add("Surf").add("Waterfall").add("Chilling Water")
				// Eevee Starter moves removal
				.remove("Baddy Bad").remove("Bouncy Bubble").remove("Buzzy Buzz").remove("Calm Mind").remove("Freezy Frost").remove("Glitzy Glow")
				.remove("Sappy Seed").remove("Sizzly Slide").remove("Stored Power").remove("Sparkly Swirl").remove("Veevee Volley")
			.pokemon.baseStats
				.setATK(65)
				.setDEF(65)
				.setSPA(45)
				.setSPD(75)
				.setSPE(70)
		new ModifyPokemon("Flareon", this)
			.learnset
				.remove("Celebrate")
		new ModifyPokemon("Gyarados", this)
			.learnset
				.remove("Celebrate")
		new ModifyPokemon("Hitmonchan", this)
			.learnset
				.remove("Comet Punch")
		new ModifyPokemon("Jolteon", this)
			.learnset
				.remove("Celebrate")
		new ModifyPokemon("Jynx", this)
			.learnset
				.remove("Psycho Boost")
				.add("Sheer Cold")
		new ModifyPokemon("Machamp", this)
			.baseStats
				.setSPA(55)
			.pokemon.learnset
				.add("Comet Punch")
		new ModifyPokemon("Marowak", this)
			.baseStats
				.setATK(85);
		new ModifyPokemon("Meowth", this)
			.learnset
				.add("Synchronoise")
				.add("Zen Headbutt")
				.add("Eerie Spell")
				.add("Psychic")
				.add("Psyshock")
				.add("Future Sight")
				.add("Flying Press")
				.add("Body Press")
				.add("Focus Blast")
				.add("Vacuum Wave")
				.add("Aura Sphere")
				.add("Wake Up Slap")
				.add("Force Palm");
		new ModifyPokemon("Mew", this)
			.learnset
				.add("Sheer Cold")
		new ModifyPokemon("Muk", this)
			.learnset
				.add("Dire Claw")
		new ModifyPokemon("Nidoking", this)
			.abilities
				.setHiddenAbility("Hustle")
			.pokemon.learnset
				.add("Dire Claw")
				.remove("Precipice Blades")
		new ModifyPokemon("Poliwrath", this)
			.baseStats
				.setHP(110)
				.setATK(95)
				.setSPD(95)
				.setSPE(75)
		new ModifyPokemon("Snorlax", this)
			.learnset
				.remove("Celebrate")
		new ModifyPokemon("Vaporeon", this)
			.learnset
				.remove("Celebrate")
				.add("Sheer Cold")
		new ModifyPokemon("Venusaur", this)
			.learnset
				.remove("Celebrate")
		new ModifyPokemon("Wigglytuff", this)
			.abilities
				.setAbility1("Field Support")
			.pokemon.baseStats
				.setHP(148)
				.setDEF(60)
				.setSPA(90)
				.setSPD(65)
		//#endregion	
		//#region Gen 2
		new ModifyPokemon("Crobat", this)
			.baseStats
				.setHP(80)
				.setATK(119)
				.setDEF(84)
				.setSPE(144);
		new ModifyPokemon("Delibird", this)
			.learnset
				.add("Sheer Cold")
		new ModifyPokemon("Entei", this)
			.baseStats
				.setATK(100)
				.setDEF(80)
				.setSPA(100)
				.setSPD(80);
		new ModifyPokemon("Espeon", this)
			.learnset
				.remove("Celebrate")
		new ModifyPokemon("Kingdra", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Lanturn", this)
			.learnset
				.add("Thunderclap");
		new ModifyPokemon("Ledian",  this)
			.abilities
				.setAbility0("Motor Drive")
			.pokemon.baseStats
				.setHP(85)
				.setDEF(55)
				.setATK(104)
				.setSPA(23)
				.setSPD(113)
			.pokemon.learnset
				.add("Bullet Punch")
				.add("Electrify")
				.add("Ion Deluge")
				.add("Meteor Mash")
				.add("Trailblaze")
				.add("Victory Dance")
				.add("Volt Tackle")
		new ModifyPokemon("Magcargo", this)
			.learnset	
				.remove("Magma Storm")
		new ModifyPokemon("Tyranitar", this)
			.baseStats
				.setSPA(75)
			.pokemon.learnset
				.add("Dragon Cheer");
		new ModifyPokemon("Tyranitar-Mega", this)
			.baseStats
				.setSPA(75)
		new ModifyPokemon("Piloswine", this)
			.learnset
				.add("Sheer Cold")
		new ModifyPokemon("Umbreon", this)
			.learnset
				.remove("Celebrate")
		new ModifyPokemon("Politoed", this)
			.baseStats
				.setHP(125)
				.setSPA(115)
		new ModifyPokemon("Sneasel", this)
			.learnset
				.add("Sheer Cold")
		new ModifyPokemon("Smeargle", this)
			.abilities
				.setHiddenAbility("Trace")
		new ModifyPokemon("Suicune", this)
			.learnset
				.add("Calm Mind")
				.add("Chilly Reception")
				.add("Teleport")
		//#endregion
		//#region Gen 3
		new ModifyPokemon("Aggron", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Altaria", this)
			.baseStats
				.setDEF(85)
				.setSPD(100)
				.setSPE(75);
		new ModifyPokemon("Altaria-Mega", this)
			.baseStats
				.setATK(70);
		new ModifyPokemon("Banette", this)
			.learnset
				.add("Celebrate")	
		new ModifyPokemon("Blaziken-Mega", this)
			.baseStats
				.setATK(145)
				.setDEF(83)	
				.setSPD(83)
				.setSPE(104);
		new ModifyPokemon("Camerupt-Mega", this)
			.baseStats
				.setATK(105)
				.setSPD(115)
		new ModifyPokemon("Chimecho", this)
			.learnset
				.add("Boomburst")
				.add("Buzzy Buzz");
		new ModifyPokemon("Delcatty", this)
			.learnset
				.add("Alluring Voice")
		new ModifyPokemon("Exploud", this)
			.learnset
				.add("Alluring Voice");
		new ModifyPokemon("Glalie", this)
			.learnset
				.add("Extreme Speed")
			.pokemon.abilities
				.setAbility0("Levitate")
		new ModifyPokemon("Huntail", this)
			.learnset
				.add("Dragon Cheer")	
		new ModifyPokemon("Illumise", this)
			.learnset
				.add("Celebrate")
		new ModifyPokemon("Kecleon", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Latias", this)
			.learnset
				.add("Recover")
				.add("Roost")
				.remove("Lumina Crash")
		new ModifyPokemon("Latios" , this)
			.learnset
				.add("Recover")
				.add("Roost")
		new ModifyPokemon("Manectric", this)
			.learnset	
				.remove("Wildbolt Storm")
		new ModifyPokemon("Metagross", this)
			.baseStats
				.setDEF(125)
				.setSPA(85)
				.setSPD(85);
		new ModifyPokemon("Metagross-Mega", this)
			.baseStats
				.setSPA(95);	
		new ModifyPokemon("Regice", this)
			.abilities
				.setAbility0("Absolute Zero")
				.setAbility1("undefined")
				.setHiddenAbility("Filter")
			.pokemon.learnset
				.add("Sheer Cold")
		new ModifyPokemon("Regirock", this)
			.abilities
				.setAbility0("Granite Storm")
				.setAbility1("undefined")
				.setHiddenAbility("Filter")
		new ModifyPokemon("Registeel", this)
			.baseStats
				.setATK(100)
				.setSPA(50)
			.pokemon.abilities
				.setAbility0("Iron Technician")
				.setHiddenAbility("Filter")	
		new ModifyPokemon("Sableye", this)
			.baseStats
				.setSPA(75)
				.setSPD(75)
		new ModifyPokemon("Salamence", this)
			.baseStats
				.setATK(100)
				.setDEF(75)
				.setSPD(75)			
		new ModifyPokemon("Salamence-Mega", this)
			.baseStats
				.setATK(100)
				.setDEF(125)
		new ModifyPokemon("Sceptile", this)
			.learnset
				.add("Pin Missile")
		new ModifyPokemon("Seviper", this)
			.learnset
				.add("Shed Tail")
			.pokemon.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Shiftry", this)
			.learnset
				.add("Ivy Cudgel")
			.pokemon.baseStats	
				.setHP(105)
				.setATK(120)
		new ModifyPokemon("Tropius", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Volbeat", this)
			.learnset
				.add("Celebrate")
		//#endregion
		//#region Gen 4
		new ModifyPokemon("Azelf", this)
			.baseStats
				.setATK(120)
				.setSPA(120);
		new ModifyPokemon("Bibarel", this)
			.baseStats
				.setHP(99)
				.setATK(92)
				.setDEF(87)
				.setSPD(87)
			.pokemon.learnset
				.add("Flip Turn")
				.add("Aqua Cutter")
				.add("Trailblaze")
		new ModifyPokemon("Chatot", this)
			.learnset
				.add("Alluring Voice")
		new ModifyPokemon("Drapion", this)
			.learnset
				.add("Dire Claw")
		new ModifyPokemon("Glaceon", this)
			.learnset
				.remove("Celebrate")
				.add("Sheer Cold")
		new ModifyPokemon("Leafeon", this)
			.learnset
				.remove("Celebrate")
		new ModifyPokemon("Lucario-Mega", this)
			.baseStats
				.setDEF(92)
				.setSPD(91)
		new ModifyPokemon("Luxray", this)
			.baseStats
				.setDEF(89)
				.setSPA(78)
				.setSPD(89)
			.pokemon.learnset
				.remove("Wild Charge")
		new ModifyPokemon("Garchomp", this)
			.baseStats
				.setSPA(65)
				.setSPE(97);
		new ModifyPokemon("Garchomp-Mega", this)
			.baseStats
				.setSPA(105)
				.setSPE(97);
		new ModifyPokemon("Magmortar", this)
			.learnset	
				.remove("Steam Eruption")
		new ModifyPokemon("Mesprit", this)
			.baseStats
				.setATK(105)
				.setDEF(95)
				.setSPA(110)
				.setSPD(95);
		new ModifyPokemon("Pachirisu", this)
			.learnset
				.add("Celebrate")
		new ModifyPokemon("Rotom-Fan", this)
			.learnset	
				.remove("Aeroblast")
				.remove("Bleakwind Storm")
				.remove("Wildbolt Storm")
		new ModifyPokemon("Rotom-Frost", this)
			.learnset
				.add("Sheer Cold")
		new ModifyPokemon("Shaymin", this)
			.baseStats
				.setSPA(100)
				.setSPD(105)
			.pokemon.learnset
				.remove("Celebrate")
		new ModifyPokemon("Spiritomb", this)
			.learnset
				.add("Sheer Cold")
		new ModifyPokemon("Uxie", this)
			.baseStats
				.setATK(50)
				.setDEF(125)
				.setSPD(125);
		//#endregion
		//#region Gen 5
		new ModifyPokemon("Druddigon", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Genesect", this)
			.learnset
				.remove('Shift Gear');
		new ModifyPokemon("Gothitelle", this)
			.baseStats
				.setHP(85)
				.setDEF(105)
			.pokemon.learnset
				.add("Alluring Voice")
				.add("Sheer Cold")
		new ModifyPokemon("Hydreigon", this)
			.baseStats
				.setHP(82)
				.setATK(110)
				.setDEF(85)
				.setSPA(120)
				.setSPD(85)
			.pokemon.learnset
				.add("Fickle Beam")
		new ModifyPokemon("Meloetta", this)
			.learnset
				.remove("Celebrate")
		new ModifyPokemon("Mienshao", this)
			.abilities
				.setHiddenAbility("Reckless")
		new ModifyPokemon("Musharna", this)
			.learnset
				.remove("Lumina Crash")
		new ModifyPokemon("Sawsbuck-Winter", this)
			.learnset
				.add("Sheer Cold")
		new ModifyPokemon("Serperior", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Stoutland", this)
			.baseStats
				.setHP(116)
				.setATK(118)
				.setSPA(51)
				.setSPE(76)
		new ModifyPokemon("Unfezant", this)
			.learnset
				.add("Floaty Fall")
		new ModifyPokemon("Victini", this)
			.learnset
				.remove("Celebrate")
		new ModifyPokemon("Zebstrika", this)
			.baseStats
				.setSPA(100)
		new ModifyPokemon("Zoroark", this)
			.learnset
				.add("Sheer Cold")
		//#endregion
		//#region Gen 6
		new ModifyPokemon("Aegislash", this)
			.learnset
				.add("Bitter Blade")
		new ModifyPokemon("Aurorus", this)
			.learnset
				.add("Dragon Cheer")
				.add("Sheer Cold")
		new ModifyPokemon("Barbaracle", this)
			.learnset
				.add("Comet Punch")
		new ModifyPokemon("Carbink", this)
			.learnset	
				.add("Diamond Storm")
		new ModifyPokemon("Clawitzer", this)
			.baseStats
				.setDEF(97)
				.setSPE(79)
		new ModifyPokemon("Dragalge", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Florges", this)
			.baseStats
				.setATK(73)
				.setSPE(70);
		new ModifyPokemon("Goodra", this)
			.baseStats
				.setHP(85)
				.setATK(100)
				.setDEF(85)
				.setSPE(75);
		new ModifyPokemon("Goodra-Hisui", this)
			.baseStats
				.setHP(75)
				.setDEF(95)
				.setSPE(50)
			.pokemon.learnset
				.remove("Shell Smash")
		new ModifyPokemon("Heliolisk", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Pangoro", this)
			.learnset
				.remove("Comet Punch")
		new ModifyPokemon("Sylveon", this)
			.learnset
				.remove("Celebrate")
		new ModifyPokemon("Tyrantrum", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Zygarde", this)
			.learnset
				.add("Dragon Cheer")
		//#endregion
		//#region Gen 7
		new ModifyPokemon("Buzzwole", this)
			.learnset
				.remove("Comet Punch")
		new ModifyPokemon("Comfey", this)
			.learnset
				.remove("Celebrate")
		new ModifyPokemon("Drampa", this)
			.learnset
				.add("Dragon Cheer")
				.add("Alluring Voice")
				.add("Temper Flare")
				.add("Roaring Bellow")
				.remove("Roar")
				.remove("Dragon Tail")
			.pokemon.baseStats
				.setHP(118)
			.pokemon.abilities
				.setAbility1("Berserk")
				.setHiddenAbility("Comatose")
		new ModifyPokemon("Exeggutor-Alola", this)
			.learnset
				.add("Fickle Beam")
			.pokemon.learnset
			.remove("Celebrate")
		new ModifyPokemon("Golem-Alola", this)
			.abilities
				.setAbility0('Magnet Pull')
				.setAbility1('Teravolt')
				.setHiddenAbility('Baller')
			.pokemon.baseStats
				.setATK(50)
				.setSPD(80)
				.setSPE(50)
			.pokemon.learnset
				.add('Thunder Clap')
				.add('Aura Sphere')
				.add('Weather Ball')
				.add('Energy Ball')
				.add('Shadow Ball')
				.add('Geodude Gatling')
				.remove("Thousand Arrows")
		new ModifyPokemon("Kommoo", this)
			.baseStats
				.setHP(70)
				.setATK(105)
				.setDEF(115)
		new ModifyPokemon("Marshadow", this)
			.learnset
				.remove("Poltergeist")
		new ModifyPokemon("Mimikyu", this)
			.baseStats
				.setHP(65)
				.setATK(95)
				.setDEF(83)
			.pokemon.learnset
				.add("Foul Play")
				.add("Night Slash")
				.add("Torment")
				.add("Spirit Break")
		new ModifyPokemon("Muk-Alola", this)
			.learnset
				.add("Dire Claw")
		new ModifyPokemon("Naganadel", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Ninetales-Alola", this)
			.learnset
				.remove("Celebrate")
		new ModifyPokemon("Oranguru", this)
			.abilities
				.setAbility0("Unaware")
				.setHiddenAbility("Oblivious")
			.pokemon.learnset
				.add("Teleport")
				.add("Slack Off")
		new ModifyPokemon("Salazzle", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("TapuKoko", this)
			.learnset
				.add("Supercell Slam")
				.remove("Wild Charge")
		new ModifyPokemon("Toucannon", this)
			.learnset
				.add("Floaty Fall")
		new ModifyPokemon("Turtonator", this)
			.baseStats
				.setHP(85)
				.setDEF(124)
				.setSPD(96)
			.pokemon.learnset
				.add("Burning Bulwark")
				.add("Dragon Cheer")
				.add("Morning Sun")
				.add("Shelter")
		new ModifyPokemon("Vikavolt", this)
			.baseStats
				.setATK(80)
				.setSPA(155)
				.setSPE(88)
		//#endregion
		//#region Gen 8
		new ModifyPokemon("Appletun", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Arctozolt", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Articuno-Galar", this)
			.learnset
				.add("Sheer Cold")
		new ModifyPokemon("Alcremie", this)
			.learnset
				.add("Syrup Bomb")
				.add("Matcha Gotcha")
			.pokemon.learnset
				.remove("celebrate")
		new ModifyPokemon("Basculegion-F", this)
			.learnset
				.remove("Origin Pulse")
		new ModifyPokemon("Coalossal", this)
			.baseStats
				.setATK(90)
				.setSPA(90);
		new ModifyPokemon("Dracozolt", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Dracovish", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Dragapult", this)
			.baseStats
				.setHP(85)
				.setATK(108)
				.setDEF(70)
				.setSPA(105)
				.setSPD(70);
		new ModifyPokemon("Eiscue", this)
			.learnset
				.add("Sheer Cold")
		new ModifyPokemon("Flapple", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Hatterene", this)
			.baseStats
				.setATK(100)
				.setDEF(95)
				.setSPE(44)
			.pokemon.learnset
				.add("Alluring Voice")
				.add("Sheer Cold")
		new ModifyPokemon("Inteleon", this)
			.learnset
				.add("Hydro Steam");
		new ModifyPokemon("Lilligant-Hisui", this)
			.learnset
				.add("Thunderous Kick");
		new ModifyPokemon("MrMime-Galar", this)
			.baseStats
				.setSPE(120)
			.pokemon.learnset
				.add("Sheer Cold")
		new ModifyPokemon("MrRime", this)
			.baseStats
				.setHP(100)
				.setDEF(85)
				.setSPA(120)
				.setSPE(80)
			.pokemon.learnset
				.add("Chilly Reception");
		new ModifyPokemon("Orbeetle", this)
			.abilities
				.setAbility0("Super Luck")
			.pokemon.baseStats
				.setHP(95)
			.pokemon.learnset
				.add("Psystrike")
				.add("Mystical Power");
		new ModifyPokemon("Perrserker", this)
			.baseStats
				.setHP(77)
				.setATK(121)
				.setDEF(91)
				.setSPA(30)
				.setSPD(102)
				.setSPE(19)
			.pokemon.abilities
				.setAbility0("Intimidate")
				.setAbility1("Vital Spirit")
			.pokemon.learnset
				.add("Bulk Up")
				.add("Parting Shot")
				.add("Psychic Fangs")
				.add("Spikes")
				.remove("Stealth rock")
				.remove("Swords Dance")
		new ModifyPokemon("Runerigus", this)
			.baseStats
				.setHP(88)
			.pokemon.learnset
				.add("Chilly Reception")
				.add("Haze")
				.add("Memento")
				.add("Taunt")
				.add("Topsy-Turvy");
		new ModifyPokemon("Toxtricity", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("ToxtricityLowKey", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Zapdos-Galar", this)
			.learnset
				.remove("Wild Charge")
				.add("Bolt Beak");
		//#endregion
		//#region Gen 9
		new ModifyPokemon("Armarouge", this)
			.baseStats
				.setHP(100)
				.setATK(90)
				.setSPE(75)
			.pokemon.learnset
				.remove("Celebrate")
		new ModifyPokemon("Baxcalibur", this)
			.baseStats
				.setDEF(82)
				.setSPA(65)	
		new ModifyPokemon("Ceruledge", this)
			.baseStats
				.setATK(125)
				.setSPA(60)
			.pokemon.learnset
				.remove("Celebrate")
		new ModifyPokemon("Dudunsparce", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Fezandipiti", this)
			.abilities
				.setAbility1("Corrosion")
			.pokemon.baseStats
				.setHP(85)
				.setATK(87)
				.setDEF(79)
				.setSPA(80)
			.pokemon.learnset
				.add("Aura Sphere")
				.add("Malignant Chain")
		new ModifyPokemon("FlutterMane", this)
			.learnset
				.add("Earth Power")
		new ModifyPokemon("Grafaiai", this)
			.learnset
				.add("Celebrate")
		new ModifyPokemon("GreatTusk", this)
			.learnset
				.add("Roar")
		new ModifyPokemon("GougingFire", this)
			.abilities
				.setHiddenAbility("Turboblaze")
		new ModifyPokemon("IronBoulder", this)
			.abilities
				.setHiddenAbility("Reckless")
			.pokemon.learnset
				.add("Head Smash")
		new ModifyPokemon("IronBundle", this)
			.baseStats
				.setHP(66)
				.setSPA(124)
				.setSPD(70)
				.setSPE(124)
			.pokemon.learnset
				.add("Bouncy Bubble")
				.add("Sheer Cold")
		new ModifyPokemon('IronCrown', this)
			.abilities
				.setHiddenAbility('Anticipation')
			.pokemon.learnset
				.add("Twin Beam")
		new ModifyPokemon("IronHands", this)	
			.learnset
				.remove("Wild Charge")
		new ModifyPokemon("IronJugulis", this)
			.learnset
				.add("Fickle Beam")
		new ModifyPokemon("IronThorns", this)
			.baseStats
				.setSPA(50)
				.setSPD(104)
			.pokemon.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("IronValiant", this)
			.baseStats
				.setHP(70)
				.setATK(120)
				.setSPA(118)
				.setSPE(112)
		new ModifyPokemon("Kilowattrel", this)
			.learnset
				.add("Defog")
		new ModifyPokemon("Klawf", this)
			.learnset
				.add("Shore Up")
		new ModifyPokemon("Munkidori", this)
			.abilities
				.setAbility1("Gorilla Tactics")
			.pokemon.baseStats
				.setATK(80)
				.setSPA(125)
			.pokemon.learnset
				.add("Malignant Chain")
		new ModifyPokemon("Okidogi", this)
			.learnset
				.add("Mach Punch")
				.add("Malignant Chain")
			.pokemon.abilities
				.setAbility1("Unnerve")
		new ModifyPokemon("Pecharunt", this)
			.learnset
				.add("Bitter Malice")
				.add("Baneful Bunker")
		new ModifyPokemon("RagingBolt", this)
			.abilities
				.setHiddenAbility("Rivalry")
		new ModifyPokemon("Revavroom", this)
			.learnset
				.add("Blazing Torque")
		new ModifyPokemon("ScreamTail", this)
			.learnset
				.add("Teleport")
		new ModifyPokemon("Sinistcha", this)
			.learnset
				.add("WillOWisp")
		new ModifyPokemon("Skeledirge", this)
			.learnset
				.add("Infernal Parade")
		new ModifyPokemon("WoChien", this)
			.learnset
				.add("Spore")
			new ModifyPokemon('SlitherWing', this)
				.baseStats
					.setDEF(109)
				.pokemon.learnset
					.add('Heat Crash');
		//#endregion

		//#region Fakemon
		new ModifyPokemon("Acudraco", this)
			.baseStats
				.setDEF(95)
				.setSPD(95)
			.pokemon.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Farfetchd-Mega", this)
			.baseStats
				.setATK(118)
				.setSPA(81)
				.setSPE(117)
		new ModifyPokemon("Thundraco", this)
			.baseStats
				.setSPA(124)
			.pokemon.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("MeloettaAurora", this)
			.learnset
				.remove("Celebrate")
		new ModifyPokemon("MeloettaCaroler", this)
			.learnset
				.remove("Celebrate")
				.add("Sheer Cold")
		new ModifyPokemon("Metadraco", this)
			.baseStats
				.setATK(120)	
			.pokemon.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Sotanaht", this)
			.abilities
				.setHiddenAbility('Shed Skin')
			.pokemon.baseStats
				.setATK(106)
				.setSPE(96)
			.pokemon.learnset
				.add("Dragon Cheer")
				.add("Super Fang")
				.add("Flame Charge")
				.add("Poison Fang")
				.add("Tail Glow")
				.add("Fire Spin")
				.add("Shadow Sneak");

		//#endregion	
		
		//#region NFE
		new ModifyPokemon("Nidorino", this)
			.baseStats
				.setDEF(67)
		new ModifyPokemon("Pikachu", this)
			.learnset
				.remove("Celebrate")	
		new ModifyPokemon("Murkrow", this)
			.learnset
				.add("Celebrate")	
		new ModifyPokemon("Morgrem", this)
			.learnset
				.add("Sheer Cold")
		new ModifyPokemon("Luxio", this)
			.learnset
				.remove("Wild Charge")
		//#endregion	

		//#region LC
		new ModifyPokemon("Bergmite", this)
			.learnset
				.add("Sheer Cold")
		new ModifyPokemon("Bulbasaur", this)
			.learnset
				.remove("Celebrate")
		new ModifyPokemon("Cetoddle", this)
			.learnset
				.add("Sheer Cold")
		new ModifyPokemon("Cubchoo", this)
			.learnset
				.add("Sheer Cold")
		new ModifyPokemon("Charcadet", this)
			.learnset
				.remove("Celebrate")
		new ModifyPokemon("Charmander", this)
			.learnset
				.remove("Celebrate")
		new ModifyPokemon("Gastly", this)
			.learnset
				.add("Sheer Cold")
		new ModifyPokemon("Greavard", this)
			.learnset
				.add("Sheer Cold")
		new ModifyPokemon("Magikarp", this)
			.learnset
				.remove("Celebrate")
		new ModifyPokemon("Meowth-Galar", this)
			.learnset
				.remove("Swords Dance")
				.remove("Stealth Rock")
		new ModifyPokemon("Milcery", this)
			.learnset
				.remove("Celebrate")
				.add("Sheer Cold")
		new ModifyPokemon("Munchlax", this)
			.learnset
				.remove("Celebrate")
		new ModifyPokemon("Nidoran-F", this)	
			.abilities
				.setHiddenAbility("Sheer Force")
		new ModifyPokemon("Nidoran-M", this)
			.baseStats
				.setDEF(42)
		new ModifyPokemon("Oshawott", this)
			.learnset	
				.add("Sheer Cold")
		new ModifyPokemon("Pawmi", this)
			.learnset
				.remove("Celebrate")
		new ModifyPokemon("Pancham", this)
			.learnset
				.remove("Comet Punch")
		new ModifyPokemon("Piplup", this)
			.learnset
				.add("Sheer Cold")	
		new ModifyPokemon("Shinx", this)
			.learnset
				.remove("Wild Charge")
		new ModifyPokemon("Snom", this)
			.learnset
				.add("Sheer Cold")
		new ModifyPokemon("Snorunt", this)
			.learnset
				.add("Sheer Cold")
		new ModifyPokemon("Squirtle", this)
			.learnset
				.remove("Celebrate")
		new ModifyPokemon("Timburr", this)
			.learnset
				.remove("Comet Punch")
		new ModifyPokemon("Vulpix-Alola", this)
			.learnset
				.remove("Celebrate")
		//#endregion	
		//#region Donation Mod
		new ModifyPokemon("Ariados", this)
			.abilities
				.setAbility0("Venom Hielaman")
				.setAbility1("Hustle")
				.setHiddenAbility("Sniper")
			.pokemon.baseStats
				.setHP(95)
				.setDEF(75)
				.setSPA(50)
				.setSPD(75)
				.setSPE(80)
			.pokemon.learnset
				.add("Baneful Bunker")
				.add("Poison Fang");
		//#endregion
		//#region Modifying Moves

		//#region Adding Frostbite to moves
		// Ice Fang
		this.modData("Moves", "icefang").secondaries = [
			{
				chance: 10,
				status: 'frb',
			},
			{
				chance: 10,
				volatileStatus: 'flinch',
			},
		];
	
		// Aurora Beam
		this.modData("Moves", "aurorabeam").secondary = undefined;
		this.modData("Moves", "aurorabeam").secondaries = [
			{
				chance: 10,
				status: 'frb',
			},
			{
				chance: 10,
				boosts: {
					atk: -1,
				},
			},
		];
		// Icy Wind
		this.modData("Moves", "icywind").secondary = undefined;
		this.modData("Moves", "icywind").secondaries = [
			{
				chance: 10,
				status: 'frb',
			},
			{
				chance: 100,
				boosts: {
					spe: -1,
				},
			},
		];
		// Ice Punch
		this.modData("Moves", "icepunch").secondary = { chance: 10, status: 'frb' };
		// Powder Snow
		this.modData("Moves", "powdersnow").secondary = { chance: 10, status: 'frb' };

		//#endregion


		// #region Add Explosion Move Flag to moves
		const explosionMoves: string[] = [
			"explosion",
			"mindblown",
			"selfdestruct",
			"mistyexplosion",
			"shelltrap",
			"eruption",
			"eggbomb",
			"magnetbomb",
			"sludgebomb",
			"seedbomb",
			"steameruption",
			"rockblast",
			"mudbomb",
			"metalburst",
			"syrupbomb",
			"chloroblast",
			"cragblast",
		];

		for (const move of explosionMoves) {
			this.modData('Moves', move).flags.explosion= 1;
		}
		// #endregion

		//#region Give Paradox Formes without dex sprite to use gen 5 sprite
		this.modData('Pokedex', 'ironboulder').tags.push('Use Gen 5');
		this.modData('Pokedex', 'ironcrown').tags.push('Use Gen 5');
		this.modData('Pokedex', 'ragingbolt').tags.push('Use Gen 5');
		this.modData('Pokedex', 'gougingfire').tags.push('Use Gen 5');
		this.modData('Pokedex', 'terapagos').tags.push('Use Gen 5');
		this.modData('Pokedex', 'terapagosstellar').tags.push('Use Gen 5');
		this.modData('Pokedex', 'terapagosterastal').tags.push('Use Gen 5');
		//#endregion
	},
};