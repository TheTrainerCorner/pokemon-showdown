import { ModifyPokemon } from "../../../tools/utils/modifyPokemon";

export const Scripts: ModdedBattleScriptsData = {
	inherit: "ttc_season_2_2",
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
				.add("Muddy Water").add("Aqua Tail").add("Surf").add("Waterfall").add("Chilling Water");
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
		new ModifyPokemon("Lanturn", this)
			.learnset
				.add("Thunderclap");
		new ModifyPokemon("Tyranitar", this)
			.baseStats
				.setSPA(75);
		//#endregion
		//#region Gen 3
		new ModifyPokemon("Altaria", this)
			.baseStats
				.setDEF(85)
				.setSPD(110)
				.setSPE(75);
		new ModifyPokemon("Altaria-Mega", this)
			.baseStats
				.setATK(110);	
		new ModifyPokemon("Blaziken-Mega", this)
			.baseStats
				.setATK(145)
				.setDEF(83)	
				.setSPD(83)
				.setSPE(104);
		new ModifyPokemon("Chimecho", this)
			.learnset
				.add("Boomburst")
				.add("Buzzy Buzz");
		new ModifyPokemon("Exploud", this)
			.learnset
				.add("Alluring Voice");
		new ModifyPokemon("Glalie", this)
			.learnset
				.add("Extreme Speed");
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
		new ModifyPokemon("Shiftry", this)
			.learnset
				.add("Ivy Cudgel")
		//#endregion
		//#region Gen 4
		new ModifyPokemon("Azelf", this)
			.baseStats
				.setATK(120)
				.setSPA(120);
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
		new ModifyPokemon("Uxie", this)
			.baseStats
				.setATK(50)
				.setDEF(125)
				.setSPD(125);
		//#endregion
		//#region Gen 5
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

		//#region Gen 7
		new ModifyPokemon("Muk-Alola", this)
			.learnset
				.add("Dire Claw")
		new ModifyPokemon("Kommoo", this)
			.baseStats
				.setHP(70)
				.setATK(105)
				.setDEF(115)
		new ModifyPokemon("Marshadow", this)
			.learnset
				.remove("Poltergeist")
		new ModifyPokemon("Toucannon", this)
			.learnset
				.add("Floaty Fall")
		new ModifyPokemon("Vikavolt", this)
			.baseStats
				.setATK(65)
				.setSPA(165)
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
		new ModifyPokemon("FlutterMane", this)
			.learnset
				.add("Earth Power")
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
		new ModifyPokemon("Pecharunt", this)
			.learnset
				.add("Bitter Malice")
				.add("Baneful Bunker")
		new ModifyPokemon("RagingBolt", this)
			.abilities
				.setHiddenAbility("Rivalry")
		new ModifyPokemon("Revaroom", this)
			.learnset
				.add("Blazing Torque")
		new ModifyPokemon("Skeledirge", this)
			.learnset
				.add("Infernal Parade")
		new ModifyPokemon("WoChien", this)
			.learnset
				.add("Spore")
		//#endregion
	},	
};