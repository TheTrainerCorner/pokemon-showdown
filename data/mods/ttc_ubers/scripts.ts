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
		new ModifyPokemon('Gengar', this)
			.abilities
				.setAbility0('Levitate');
		new ModifyPokemon('Gengar-Mega', this)
			.abilities
				.setAbility0('Keen Eye');
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
		new ModifyPokemon('Lugia', this)
			.abilities
				.setAbility0('Power Of Alchemy')
			.pokemon.learnset
				.add('Thunderbolt')
				.add('Ice Beam')
				.add('Flamethrower')
				.add('Flip Turn');
		new ModifyPokemon("Ho-oh", this)
			.abilities
				.setAbility0('Drought')
			.pokemon.learnset
				.add('U-Turn')
				.add('Solar Blade');
		// Gen 3
		new ModifyPokemon('Luvdisc', this)
			.abilities
				.setAbility0('Stalwart')
			.pokemon.baseStats
				.setHP(88)
				.setDEF(75)
				.setSPD(85)
			.pokemon.learnset
				.add('Geomancy')
				.add('Electro Shot')
				.add('Meteor Beam');
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
		new ModifyPokemon('Rayquaza', this)
			.baseStats
				.setHP(100)
				.setATK(145)
				.setSPA(145)
				.setSPE(110)
			.pokemon.learnset
				.add('Dragon Rush');
		new ModifyPokemon('Manectric-Mega', this)
			.abilities
				.setAbility0('Teravolt');
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
		new ModifyPokemon('Lucario-Mega', this)
			.abilities
				.setAbility0('Adaptability')
			.pokemon.baseStats
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
		new ModifyPokemon('Victini', this)
			.learnset
				.add('Victory Dance');
		// Gen 6
		new ModifyPokemon('Aegislash', this)
			.baseStats
				.setDEF(150)
				.setSPD(150);
		new ModifyPokemon('Aegislash-Blade', this)
			.baseStats
				.setATK(150)
				.setSPA(150);
		new ModifyPokemon('Xerneas', this);
		new ModifyPokemon('Yveltal', this);
		new ModifyPokemon('Zygarde-Complete', this)
			.baseStats
				.setHP(206)
				.setATK(120)
			.pokemon.learnset
				.add('Supercell Slam');
		new ModifyPokemon('Hoopa', this)
			.abilities
				.setAbility0('Illusion')
			.pokemon.baseStats
				.setATK(70)
				.setSPD(100)
				.setSPE(140)
			.pokemon.learnset
				.add('Moongeist Beam')
				.add('Psystrike')
				.add('Aura Sphere')
				.add('Parting Shot')
				.add('Swords Dance')
				.add('Bulk Up')
				.add('Sludge Bomb');
		new ModifyPokemon('Hoopa-Unbound', this)
			.abilities
				.setAbility0('Wandering Spirit')
			.pokemon.baseStats
				.setDEF(100)
				.setSPE(50)
			.pokemon.learnset
				.add('Moongeist Beam')
				.add('Psystrike')
				.add('Aura Sphere')
				.add('Parting Shot')
				.add('Swords Dance')
				.add('Bulk Up')
				.add('Sludge Bomb');
		new ModifyPokemon('Pangoro', this)
			.baseStats
				.setHP(110)
				.setDEF(93)
				.setSPD(86);
		// Gen 7
		new ModifyPokemon('TapuKoko', this)
			.learnset
				.add('Rising Voltage')
				.add('Electro Shot')
				.add('Bulk Up');
		new ModifyPokemon('TapuLele', this)
			.learnset
				.add('Expanding Force')
				.add('Teleport')
				.add('Mystical Fire')
				.add('Quiver Dance');
		new ModifyPokemon('TapuBulu', this)
			.learnset
				.add('Grassy Glide')
				.add('Trailblaze')
				.add('Headlong Rush')
				.add('Victory Dance');
		new ModifyPokemon('TapuFini', this)
			.learnset
				.add('Misty Explosion')
				.add('Wish')
				.add('Chilly Reception');
		new ModifyPokemon('Solgaleo', this);
		new ModifyPokemon('Lunala', this);
		new ModifyPokemon('Celesteela', this)
			.abilities
				.setHiddenAbility('Illuminate')
			.pokemon.learnset
				.add('Signal Beam')
				.add('Dazzling Gleam')
				.add('Lunar Blessing');
		new ModifyPokemon('Naganadel', this)
			.abilities
				.setHiddenAbility('Queenly Majesty')
			.pokemon.baseStats
				.setHP(73)
				.setDEF(73)
				.setSPA(127)
				.setSPE(121)
			.pokemon.learnset
				.add('Toxic Thread');
		new ModifyPokemon('Melmetal', this)
			.learnset
				.add('Trick Room');
		// Gen 8
		new ModifyPokemon('Dragapult', this)
			.abilities
				.setAbility0('Technician')
			.pokemon.learnset
				.add('Metal Claw')
				.add('Charge Beam')
				.add('Flame Charge')
				.add('Ominous Wind')
				.add('Incinerate')
				.add('Pin Missile');
		new ModifyPokemon('Zacian', this);
		new ModifyPokemon('Zamazenta', this);
		new ModifyPokemon('Eternatus', this);
		new ModifyPokemon('Calyrex-Ice', this);
		new ModifyPokemon('Calyrex-Shadow', this);
		// Gen 9
		new ModifyPokemon('Wo-Chien', this)
			.abilities
				.setHiddenAbility('Grass Pelt')
			.pokemon.baseStats
				.setHP(105)
				.setATK(90)
				.setDEF(105)
				.setSPA(90)
				.setSPE(45)
			.pokemon.learnset
				.add('Synthesis')
				.add('Grassy Glide')
				.add('Cotton Guard')
				.add('Sappy Seed')
				.add('Parting Shot');
		new ModifyPokemon('Chien-Pao', this)
			.abilities
				.setHiddenAbility('Sharpness')
			.pokemon.baseStats
				.setATK(120)
			.pokemon.learnset
				.add('Bitter Blade');
		new ModifyPokemon('Ting-Lu', this)
			.abilities
				.setHiddenAbility('Mold Breaker')
			.pokemon.learnset
				.add('Headlong Rush')
				.add('Pain Split')
				.add('Pursuit')
				.add('Stockpile')
				.add('Spit Up')
				.add('Swallow')
				.add('Parting Shot');
		new ModifyPokemon('Chi-Yu', this)
			.abilities
				.setHiddenAbility('Magma Armor')
			.pokemon.baseStats
				.setSPA(135)
				.setSPD(120)
			.pokemon.learnset
				.add('Fiery Wrath');
		new ModifyPokemon('Koriadon', this);
		new ModifyPokemon('Miraidon', this);
		new ModifyPokemon('Okidogi', this)
			.abilities
				.setAbility1('Ball Fetch')
			.pokemon.baseStats
				.setSPD(95)
				.setSPE(96)
			.pokemon.learnset
				.add('Hammer Arm')
				.add('Meteor Mash')
				.add('Psycho Shift');
		new ModifyPokemon('Munkidori', this)
			.baseStats
				.setATK(105)
			.pokemon.learnset
				.add('Knock Off')
				.add('Zen Headbutt')
				.add('Low Kick')
				.add('Skill Swap');
		new ModifyPokemon('Fezandipiti', this)
			.abilities
				.setHiddenAbility('Opportunist')
			.pokemon.baseStats
				.setHP(88)
				.setDEF(89)
				.setSPA(106)
			.pokemon.learnset
				.add('Sparkly Swirl')
				.add('Court Change')
				.add('Clear Smog');
	// TTC Fakemons
		new ModifyPokemon('Pangoro-Mega', this)
			.baseStats
				.setHP(110)
				.setDEF(123)
				.setSPD(116);
		new ModifyPokemon('Cerinyx', this)
			.baseStats
				.setHP(109)
				.setATK(136)
				.setDEF(91)
				.setSPA(136)
				.setSPD(86)
			.pokemon.learnset
				.add('Trailblaze')
				.add('Nasty Plot')
				.add('Baddy Bad')
				.add('Ceaseless Edge');
	}
};