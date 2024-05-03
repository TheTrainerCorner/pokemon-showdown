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
		//testregion
		//new ModifyPokemon('Eternatus', this)
		//	.abilities
		//		.setAbility0('Absolute Zero')
		//		.setAbility1('Granite Storm')
		//		.setHiddenAbility('Iron Technician');
		new ModifyPokemon('IronCrown', this)
			.abilities
				.setHiddenAbility('Emulate');
	},
};