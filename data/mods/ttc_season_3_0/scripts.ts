import { ModifyPokemon } from "../../../tools/utils/modifyPokemon";

export const Scripts: ModdedBattleScriptsData = {
	inherit: "ttc_season_2",
	init() {
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
		//#region Gen 1
		new ModifyPokemon("Arbok", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Alakazam-Mega", this)
			.baseStats
				.setATK(60)
				.setDEF(62)
				.setSPD(113)
		new ModifyPokemon("Dragonite", this)
			.baseStats
				.setHP(101)
				.setSPA(80)
				.setSPD(95)
				.setSPE(75);
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
				.remove("Baddy Bad").remove("Bouncy Bubble").remove("Buzzy Buzz").remove("Freezy Frost").remove("Glitzy Glow")
				.remove("Sappy Seed").remove("Sizzly Slide").remove("Sparkly Swirl").remove("Veevee Volley");
		new ModifyPokemon("Machamp", this)
			.baseStats
				.setSPA(55);
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

		//#endregion	
		//#region Gen 2
		new ModifyPokemon("Crobat", this)
			.baseStats
				.setHP(80)
				.setATK(119)
				.setDEF(84)
				.setSPE(144);
		new ModifyPokemon("Entei", this)
			.baseStats
				.setATK(100)
				.setDEF(80)
				.setSPA(100)
				.setSPD(80);
		new ModifyPokemon("Kingdra", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Lanturn", this)
			.learnset
				.add("Thunderclap");
		new ModifyPokemon("Tyranitar", this)
			.baseStats
				.setSPA(75)
			.pokemon.learnset
				.add("Dragon Cheer");
		new ModifyPokemon("Tyranitar-Mega", this)
			.baseStats
				.setSPA(75)
		new ModifyPokemon("Smeargle", this)
			.abilities
				.setHiddenAbility("Trace")
		//#endregion
		//#region Gen 3
		new ModifyPokemon("Altaria", this)
			.baseStats
				.setDEF(85)
				.setSPD(100)
				.setSPE(75);
		new ModifyPokemon("Altaria-Mega", this)
			.baseStats
				.setATK(70);	
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
				.add("Extreme Speed");
		new ModifyPokemon("Huntail", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Kecleon", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Metagross", this)
			.baseStats
				.setATK(145)
				.setSPA(65);
		new ModifyPokemon("Metagross-Mega", this)
			.baseStats
				.setSPA(95);	
		new ModifyPokemon("Regice", this)
			.abilities
				.setAbility0("Absolute Zero")
				.setAbility1("undefined")
				.setHiddenAbility("Filter")
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
		new ModifyPokemon("Seviper", this)
			.learnset
				.add("Shed Tail")
			//.pokemon.learnset
			//	.add("Dragon Cheer")
		new ModifyPokemon("Shiftry", this)
			.learnset
				.add("Ivy Cudgel")
		//new ModifyPokemon("Tropius", this)
		//	.learnset
		//		.add("Dragon Cheer")
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
				.add("Grassy glide")
		new ModifyPokemon("Chatot", this)
			.learnset
				.add("Alluring Voice")
		new ModifyPokemon("Lucario-Mega", this)
			.baseStats
				.setDEF(92)
				.setSPD(91)
		new ModifyPokemon("Luxray", this)
			.baseStats
				.setDEF(89)
				.setSPA(78)
				.setSPD(89);
		new ModifyPokemon("Garchomp", this)
			.baseStats
				.setSPA(65)
				.setSPE(97);
		new ModifyPokemon("Garchomp-Mega", this)
			.baseStats
				.setSPA(105)
				.setSPE(97);
		new ModifyPokemon("Mesprit", this)
			.baseStats
				.setATK(105)
				.setDEF(95)
				.setSPA(110)
				.setSPD(95);
		new ModifyPokemon("Shaymin", this)
			.baseStats
				.setSPA(100)
				.setSPD(105)
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
		new ModifyPokemon("Hydreigon", this)
			.baseStats
				.setHP(82)
				.setATK(110)
				.setDEF(85)
				.setSPA(120)
				.setSPD(85)
			.pokemon.learnset
				.add("Fickle Beam")
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
		//#endregion
		//#region Gen 6
		new ModifyPokemon("Aurorus", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Clawitzer", this)
			.baseStats
				.setDEF(95)
				.setSPE(80)
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
				.setSPE(50);
		new ModifyPokemon("Heliolisk", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Tyrantrum", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Zygarde", this)
			.learnset
				.add("Dragon Cheer")
		//#endregion
		//#region Gen 7
		new ModifyPokemon("Drampa", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Exeggutor-Alola", this)
			.learnset
				.add("Fickle Beam")
		new ModifyPokemon("Kommoo", this)
			.baseStats
				.setHP(70)
				.setATK(105)
				.setDEF(115)
		new ModifyPokemon("Marshadow", this)
			.learnset
				.remove("Poltergeist")
		new ModifyPokemon("Muk-Alola", this)
			.learnset
				.add("Dire Claw")
		new ModifyPokemon("Naganadel", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Salazzle", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Toucannon", this)
			.learnset
				.add("Floaty Fall")
		new ModifyPokemon("Vikavolt", this)
			.baseStats
				.setATK(65)
				.setSPA(165)
		//#endregion
		//#region Gen 8
		new ModifyPokemon("Appletun", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Arctozolt", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Alcremie", this)
			.learnset
				.add("Syrup Bomb");
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
		new ModifyPokemon("Flapple", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Hatterene", this)
			.baseStats
				.setATK(100)
				.setDEF(95)
				.setSPE(44)
			.pokemon.learnset
				.add("Alluring Voice");
		new ModifyPokemon("Inteleon", this)
			.learnset
				.add("Hydro Steam");
		new ModifyPokemon("Lilligant-Hisui", this)
			.learnset
				.add("Thunderous Kick");
		new ModifyPokemon("MrMime-Galar", this)
			.baseStats
				.setSPE(120);
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
		new ModifyPokemon("Toxtricity-Low-Key", this)
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
				.setHP(90)
				.setATK(50)
				.setSPE(105)
		new ModifyPokemon("Baxcalibur", this)
			.baseStats
				.setDEF(82)
				.setSPA(65)	
		new ModifyPokemon("Ceruledge", this)
			.baseStats
				.setATK(125)
				.setSPA(60)
		new ModifyPokemon("Dudunsparce", this)
			.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("FlutterMane", this)
			.learnset
				.add("Earth Power")
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
		new ModifyPokemon('IronCrown', this)
			.abilities
				.setHiddenAbility('Emulate')
			.pokemon.learnset
				.add("Twin Beam")
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
		new ModifyPokemon("Okidogi", this)
			.learnset
				.add("Mach Punch")
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
		new ModifyPokemon("SlitherWing", this)
			.baseStats
				.setDEF(109)
			.pokemon.learnset
				.add("Heat Crash")
		new ModifyPokemon("WoChien", this)
			.learnset
				.add("Spore")
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
		new ModifyPokemon("Metadraco", this)
			.baseStats
				.setATK(120)	
			.pokemon.learnset
				.add("Dragon Cheer")
		new ModifyPokemon("Sotanaht", this)
			.learnset
				.add("Dragon Cheer")
		//#endregion		
	},
};