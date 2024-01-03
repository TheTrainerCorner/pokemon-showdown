import { Pokemon } from '../../../sim';
import { ModifyPokemon } from '../../../tools/utils/modifyPokemon';

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'ttc_season_1_winners',
	init() {
		// #region 2.0.0
		// Modify Pokemon
			//#region LC Pokemon
			new ModifyPokemon('Pidgey', this)
				.abilities
					.setAbility0('Frisk')
					.setAbility1('Early Bird')
				.pokemon.baseStats
					.setHP(46)
					.setATK(52);
			new ModifyPokemon('Paras', this)
				.abilities
					.setAbility1('Mycelium Might')
				.pokemon.baseStats
					.setHP(40)
					.setSPA(40);
			new ModifyPokemon('Diglett', this)
				.abilities
					.setAbility1('Emergency Exit')
				.pokemon.baseStats
					.setHP(12);
			new ModifyPokemon('Diglett-Alola', this)
				.abilities
					.setAbility1('Emergency Exit')
				.pokemon.baseStats
					.setHP(12);
			new ModifyPokemon('Zubat', this)
				.abilities
					.setAbility0('Unnerve')
					.setHiddenAbility('Vampire')
				.pokemon.baseStats
					.setHP(55)
					.setATK(60)
					.setDEF(50)
					.setSPA(20)
					.setSPD(50)
					.setSPE(65)
				.pokemon.learnset
					.add('Fire Fang')
					.add('Thunder Fang')
					.add('Ice Fang')
					.add('Toxic Spikes');
			new ModifyPokemon('Geodude', this)
				.abilities
					.setHiddenAbility('Solid Rock')
				.pokemon.learnset
					.add('Rapid Spin')
					.add('Body Press');
			new ModifyPokemon('Geodude-Alola', this)
				.learnset
					.add('Power Gem')
					.add('Steel Beam')
					.add('Zap Cannon')
					.add('Flash Cannon');
			new ModifyPokemon('Ponyta', this)
				.types
					.setType('Normal', 'Fire')
				.pokemon.abilities
					.setAbility0('Reckless')
				.pokemon.learnset
					.add('Fire Lash')
					.add('Jump Kick')
					.add('Blaze Kick');
			new ModifyPokemon('Ponyta-Galar', this)
				.abilities
					.setAbility0('Fairy Aura')
					.setHiddenAbility('Magic Guard')
				.pokemon.learnset
					.add('Fire Lash')
					.add('Moonblast')
					.add('Psyblade');
			new ModifyPokemon('Magnemite', this)
				.abilities
					.setAbility1('Levitate');
			new ModifyPokemon('Doduo', this)
				.types
					.setType('Ground', 'Flying')
				.pokemon.abilities
					.setAbility0('Tangled Feet')
					.setHiddenAbility('Wind Rider');
			new ModifyPokemon('Seel', this)
				.abilities
					.setHiddenAbility('Slush Rush')
				.pokemon.baseStats
					.setSPA(60)
				.pokemon.learnset
					.add('Scald')
					.add('Megahorn')
					.add('Flip Turn')
					.add('Hydro Pump')
					.add('Freeze Dry')
					.add('Chilling Water');
			new ModifyPokemon('Grimer', this)
				.abilities
					.setAbility0('Regenerator')
					.setAbility1('Gooey')
					.setHiddenAbility('Stench');
			new ModifyPokemon('Grimer-Alola', this)
				.abilities
					.setHiddenAbility('Corrosion')
				.pokemon.learnset
					.add('Parting Shot');
			new ModifyPokemon('Voltorb', this)
				.types
					.setType('Electric', 'Steel')
				.pokemon.abilities
					.setAbility1('Baller')
				.pokemon.learnset
					.add('Weather Ball')
					.add('Flash Cannon')
					.add('Focus Blast')
					.add('Shadow Ball')
					.add('Aura Sphere')
					.add('Magnet Bomb');
			new ModifyPokemon('Voltorb-Hisui', this)
				.abilities
					.setAbility1('Baller')
				.pokemon.learnset
					.add('Weather Ball')
					.add('Energy Ball')
					.add('Sappy Seed')
					.add('Giga Drain')
					.add('Mist Ball');
			new ModifyPokemon('Exeggutor', this)
				.abilities
					.setAbility1('Sap Sipper')
				.pokemon.learnset
					.add('Earth Power');
			new ModifyPokemon('Cubone', this)
				.abilities
					.setAbility1('Technician')
				.pokemon.learnset
					.add('Head Smash')
					.add('Headlong Rush');
			new ModifyPokemon('Porygon', this)
				.types
					.setType('Noraml', 'Electric');
			new ModifyPokemon('Hoothoot', this)
				.types
					.setType('Psychic', 'Flying')
				.pokemon.abilities
					.setAbility0('Early Bird')
				.pokemon.learnset
					.add('Moongeist Beam')
					.add('Psyshock');
			new ModifyPokemon('Ledyba', this)
				.types
					.setType('Bug', 'Fighting')
				.pokemon.baseStats
					.setHP(50)
					.setATK(50)
					.setSPA(10)
					.setSPE(68);
			new ModifyPokemon('Natu', this)
				.abilities
					.setAbility0('Forewarn')
					.setAbility1('Tinted Lens');
			new ModifyPokemon('Mareep', this)
				.abilities
					.setAbility1('Lightning Rod')
					.setHiddenAbility('Cotton Down');
			new ModifyPokemon('Yanma', this)
				.types
					.setType('Bug', 'Dragon')
				.pokemon.abilities
					.setAbility1('Tinted Lens')
					.setHiddenAbility('Compound Eyes')
				.pokemon.learnset
					.add('Outrage')
					.add('Dragon Pulse')
					.add('Dragon Claw')
					.add('Dragon Rush');
			new ModifyPokemon('Swinub', this)
				.abilities
					.setAbility1('Thick Fat')
					.setHiddenAbility('Gluttony');
			new ModifyPokemon('Phanpy', this)
				.abilities
					.setAbility1('Technician')
					.setHiddenAbility('Sand Rush')
				.pokemon.baseStats
					.setSPD(60);
			new ModifyPokemon('Taillow', this)
				.abilities
					.setAbility1('Scrappy')
					.setHiddenAbility('Aerilate')
				.pokemon.learnset
					.add('Tidy Up')
					.add('Extreme Speed');
			new ModifyPokemon('Skitty', this)
				.types
					.setType('Normal', 'Fairy')
				.pokemon.abilities
					.setAbility0('Normalize')
					.setAbility1('Pixilate')
					.setHiddenAbility('Versatility');
			new ModifyPokemon('Gulpin', this)
				.abilities
					.setAbility1('Gluttony')
					.setHiddenAbility('Regenerator')
				.pokemon.baseStats
					.setATK(53)
					.setSPA(53);
			new ModifyPokemon('Barboach', this)
				.abilities
					.setAbility1('Unaware')
					.setHiddenAbility('Water Bubble')
				.pokemon.baseStats
					.setHP(55)
					.setATK(43)
					.setDEF(49)
					.setSPA(40);
			new ModifyPokemon('Baltoy', this)
				.learnset
					.add('Shore Up');
			new ModifyPokemon('Shuppet', this)
				.abilities
					.setAbility0('Cursed Body')
					.setHiddenAbility('Prankster')
				.pokemon.baseStats
					.setDEF(40)
					.setSPD(38);
			new ModifyPokemon('Bidoof', this)
				.types
					.setType('Normal', 'Water')
				.pokemon.abilities
					.setHiddenAbility('Water Compaction')
				.pokemon.baseStats
					.setSPA(45)
					.setSPE(38);
			new ModifyPokemon('Shinx', this)
				.baseStats
					.setHP(52)
					.setATK(68)
					.setDEF(42)
					.setSPD(42)
					.setSPE(56);
			new ModifyPokemon('Cranidos', this)
				.abilities
					.setAbility0('Rock Head')
					.setAbility1('Sand Rush')
					.setHiddenAbility('Mold Breaker');
			new ModifyPokemon('Shieldon', this)
				.types
					.setType('Ground', 'Steel')
				.pokemon.abilities
					.setAbility0('Dauntless Shield')
					.setAbility1('Heavy Metal');
			new ModifyPokemon('Combee', this)
				.baseStats
					.setHP(45)
					.setATK(40)
					.setSPA(40)
					.setSPE(80)
				.pokemon.learnset
					.add('Wish')
					.add('Leech Life');
			new ModifyPokemon('Croagunk', this)
				.baseStats
					.setDEF(46)
					.setSPD(46);
			new ModifyPokemon('Lillipup', this)
				.types
					.setType('Normal', 'Ground')
				.pokemon.abilities
					.setAbility0('Ball Fetch')
					.setHiddenAbility('Guard Dog')
				.pokemon.baseStats
					.setHP(58)
					.setATK(72)
					.setDEF(50)
					.setSPA(15)
					.setSPD(50);
			new ModifyPokemon('Pansage', this)
				.abilities
					.setAbility0('Overgrow')
					.setHiddenAbility('Grassy Surge')
				.pokemon.baseStats
					.setATK(68)
					.setSPA(38)
				.pokemon.learnset
					.add('U Turn')
					.add('Grassy Glide')
					.add('Pursuit')
					.add('Trick');
			new ModifyPokemon('Pansear', this)
				.abilities
					.setAbility0('Blaze')
					.setHiddenAbility('Drought')
				.pokemon.baseStats
					.setATK(58)
					.setDEF(58)
					.setSPA(58)
					.setSPD(43)
				.pokemon.learnset
					.add('U Turn')
					.add('Scorching Sands')
					.add('Pursuit')
					.add('Trick');
			new ModifyPokemon('Panpour', this)
				.abilities
					.setAbility0('Torrent')
					.setHiddenAbility('Drizzle')
				.pokemon.baseStats
					.setATK(38)
					.setSPA(68)
				.pokemon.learnset
					.add('Flip Turn')
					.add('Pursuit')
					.add('Trick')
					.add('Glare');
			new ModifyPokemon('Munna', this)
				.abilities
					.setAbility0('Unaware')
					.setAbility1('Levitate')
					.setHiddenAbility('Misty Surge')
				.pokemon.learnset
					.add('Slack Off')
					.add('Haze')
					.add('Draining Kiss');
			new ModifyPokemon('Pidove', this)
				.types
					.setType('Flying')
				.pokemon.abilities
					.setAbility0('Rivalry')
					.setAbility1('Big Pecks');
			new ModifyPokemon('Timburr', this)
				.types
					.setType('Fighting', 'Grass')
				.pokemon.learnset
					.add('Wood Hammer');
			new ModifyPokemon('Tirtouga', this)
				.abilities
					.setAbility0('Strong Jaw')
					.setHiddenAbility('Analytic');
			new ModifyPokemon('Archen', this)
				.abilities
					.setAbility1('Emergency Exit')
					.setHiddenAbility('Early Bird');
			new ModifyPokemon('Zorua', this)
				.types
					.setType('Dark', 'Psychic')
				.pokemon.abilities
					.setHiddenAbility('Dark Aura');
			new ModifyPokemon('Minccino', this)
				.types
					.setType('Normal', 'Fairy')
				.pokemon.abilities
					.setAbility0('Clean Up')
				.pokemon.learnset
					.add('Tailwind')
					.add('Dragon Tail');
			new ModifyPokemon('Gothita', this)
				.types
					.setType('Psychic', 'Dark')
				.pokemon.abilities
					.setHiddenAbility('Shadow Shield')
				.pokemon.learnset
					.add('Baddy Bad')
					.add('Glitzy Glow')
					.add('Sparkly Swirl');
			new ModifyPokemon('Solosis', this)
				.types
					.setType('Psychic', 'Poison')
				.pokemon.learnset
					.add('Sludge Wave')
					.add('Sludge Bomb')
					.add('WilloWisp');
			new ModifyPokemon('Deerling-Winter', this)
				.types
					.setType('Grass', 'Ice')
				.pokemon.abilities
					.setAbility0('Snow Cloak')
					.setAbility1('Refrigerate')
				.pokemon.baseStats
					.setATK(35)
					.setSPA(65)
					.setSPE(80)
				.pokemon.learnset
					.add('Ice Beam')
					.add('Blizzard')
					.add('Bitter Malice')
					.add('Snowscape')
					.add('Chilly Reception')
					.add('Calm Mind')
					.add('Frost Breath')
					.add('Icy Wind');
			// Deerling-Spring
			new ModifyPokemon('Deerling', this)
				.types
					.setType('Grass', 'Fairy')
				.pokemon.abilities
					.setAbility0('Misty Surge')
					.setAbility1('Seed Sower')
				.pokemon.baseStats
					.setHP(70)
					.setATK(35)
					.setDEF(55)
					.setSPA(60)
					.setSPD(55)
					.setSPE(70)
				.pokemon.learnset
					.add('Dazzling Gleam')
					.add('Draining Kiss')
					.add('Calm Mind');
			new ModifyPokemon('Deerling-Summer', this)
				.types
					.setType('Grass', 'Fire')
				.pokemon.abilities
					.setAbility1('Heatproof')
				.pokemon.baseStats
					.setATK(75)
					.setDEF(55)
					.setSPA(20)
					.setSPD(55)
					.setSPE(80)
				.pokemon.learnset
					.add('Flame Charge')
					.add('Blaze Kick')
					.add('Leaf Blade')
					.add('Trop Kick')
					.add('Tri-Attack');
			new ModifyPokemon('Deerling-Autumn', this)
				.types
					.setType('Grass', 'Fighting')
				.pokemon.abilities
					.setAbility1('Guts')
				.pokemon.baseStats
					.setHP(70)
					.setDEF(60)
					.setSPA(25)
					.setSPD(60)
					.setSPE(70)
				.pokemon.learnset
					.add('Bulk Up')
					.add('HighJumpKick')
					.add('Leaf Blade')
					.add('Trop Kick');
			new ModifyPokemon('Klink', this)
				.types
					.setType('Steel', 'Electric')
				.pokemon.abilities
					.setAbility0('Levitate')
					.setAbility1('Motor Drive')
					.setHiddenAbility('Steelworker')
				.pokemon.baseStats
					.setHP(35)
					.setDEF(65)
					.setSPA(55);
			new ModifyPokemon('Tynamo', this)
				.types
					.setType('Electric', 'Water')
				.pokemon.abilities
					.setAbility1('Volt Absorb')
					.setHiddenAbility('Swift Swim')
				.pokemon.learnset
					.add('Scald')
					.add('Flip Turn')
					.add('Surf')
					.add('Aqua Jet')
					.add('Waterfall')
					.add('Hydro Pump');
			new ModifyPokemon('Helioptile', this)
				.types
					.setType('Ground', 'Electric')
				.pokemon.learnset
					.add('Scorching Sands');
			new ModifyPokemon('Goomy', this)
				.types
					.setType('Dragon', 'Poison')
				.pokemon.abilities
					.setAbility0('Gooey')
					.setHiddenAbility('Corrosion')
			new ModifyPokemon('Pikipek', this)
				.types
					.setType('Flying')
				.pokemon.abilities
					.setAbility0('Oblivious');
			new ModifyPokemon('Flabebe', this)
				.types
					.setType('Fairy', 'Grass')
				.pokemon.abilities
					.setAbility1('Symbiosis')
					.setHiddenAbility('Grassy Surge')
				.pokemon.learnset
					.add('Draining Kiss')
					.add('Pollen Puff');
			new ModifyPokemon('Cutiefly', this)
				.abilities
					.setAbility0('Sweet Veil')
					.setAbility1('Compound Eyes')
					.setHiddenAbility('Honey Gather')
				.pokemon.learnset
					.add('Leech Seed')
					.add('Earth Power');
			new ModifyPokemon('Grubbin', this)
				.types
					.setType('Bug', 'Electric')
				.pokemon.abilities
					.setAbility1('Motor Drive')
					.setHiddenAbility('Electromorphosis');
			new ModifyPokemon('Fomantis', this)
				.types
					.setType('Grass', 'Bug')
				.pokemon.abilities
					.setAbility1('Chlorophyll');
			new ModifyPokemon('Morelull', this)
				.abilities
					.setAbility1('Poison Point')
					.setHiddenAbility('Poison Heal')
				.pokemon.learnset
					.add('Synthesis')
					.add('Clear Smog')
					.add('Misty Terrain')
					.remove('Drain Punch');
			new ModifyPokemon('Skwovet', this)
				.abilities
					.setAbility1('Harvest')
				.pokemon.baseStats
					.setSPA(25)
					.setSPD(45)
				.pokemon.learnset
					.add('Recycle')
					.add('Toxic')
					.add('Hyper Fang');
			new ModifyPokemon('Nickit', this)
				.abilities
					.setAbility0('Emergency Exit')
					.setAbility1('Run Away')
				.pokemon.baseStats
					.setDEF(41)
					.setSPA(59)
					.setSPE(70);
			new ModifyPokemon('Wooloo', this)
				.abilities
					.setAbility1('Cotton Down')
					.setHiddenAbility('Simple')
				.pokemon.baseStats
					.setHP(52)
				.pokemon.learnset
					.add('Head Smash')
					.add('Head Charge')
					.add('Iron Head')
					.add('Milk Drink')
					.add('False Surrender')
					.add('Knock Off')
					.add('Superpower')
					.add('Stomping Tantrum')
					.add('High Horsepower')
					.add('Bulldoze');
			new ModifyPokemon('Silicobra', this)
				.abilities
					.setHiddenAbility('Intimidate')
				.pokemon.learnset
					.add('Toxic')
					.add('Body Slam');
			new ModifyPokemon('Clobbopus', this)
				.types
					.setType('Water', 'Fighting')
				.pokemon.learnset
					.add('Arm Thrust')
					.add('Low Sweep')
					.add('Mach Punch')
					.add('Flip Turn');
			new ModifyPokemon('Hatenna', this)
				.baseStats
					.setHP(52)
					.setATK(53)
					.setSPA(73)
				.pokemon.learnset
					.add('Teleport')
					.add('Moonblast')
					.add('Toxic')
					.add('Eerie Spell');
			new ModifyPokemon('Milcery', this)
				.abilities
					.setAbility0('Triage')
					.setAbility1('Aroma Veil')
					.setHiddenAbility('Fairy Aura');
			new ModifyPokemon('Lechonk', this)
				.abilities
					.setAbility0('Pig Out')
				.pokemon.baseStats
					.setHP(64)
					.setSPE(41);
			new ModifyPokemon('Charcadet', this)
				.abilities
					.setAbility1('Quick Draw')
				.pokemon.baseStats
					.setATK(65)
					.setSPA(65)
					.setSPE(50);
			new ModifyPokemon('Bramblin', this)
				.abilities
					.setAbility1('Sand Rush')
				.pokemon.baseStats
					.setSPD(50);
			new ModifyPokemon('Rellor', this)
				.abilities
					.setAbility1('Psychic Surge')
					.setHiddenAbility('Levitate')
				.pokemon.baseStats
					.setSPA(46);
			new ModifyPokemon('Wiglett', this)
				.types
					.setType('Water', 'Rock')
				.pokemon.abilities
					.setAbility1('Skill Link')
					.setHiddenAbility('Technician')
				.pokemon.learnset
					.add('Rock Slide')
					.add('Smack Down')
					.add('Rock Slide')
					.add('Toxic');
			//#endregion
			//#region NFE Pokemon
			// Gen 1
			new ModifyPokemon('Ivysaur', this)
				.baseStats
					.setHP(75)
					.setDEF(68)
					.setSPD(85)
				.pokemon.learnset
					.add('Sludge Wave')
					.add('Acid Spray')
					.add('Gastro Acid');
			new ModifyPokemon('Charmeleon', this)
				.baseStats
					.setATK(79)
					.setSPA(90)
				.pokemon.learnset
					.add('Fire Lash')
					.add('Burn Up');
			new ModifyPokemon('Wartortle', this)
				.baseStats
					.setHP(69)
					.setSPA(80)
				.pokemon.abilities
					.setAbility1('Shell Armor')
				.pokemon.learnset
					.add('Hydro Stream');
			new ModifyPokemon('Pidgeotto', this)
				.abilities
					.setAbility0('Frisk')
					.setAbility1('Early Bird')
					.setHiddenAbility('Defiant')
				.pokemon.baseStats
					.setHP(68)
					.setATK(70)
					.setDEF(65)
					.setSPA(70)
					.setSPE(76);
			new ModifyPokemon('Nidorina', this)
				.abilities
					.setHiddenAbility('Sheer Force')
				.pokemon.baseStats
					.setHP(80)
					.setDEF(72)
					.setSPA(75)
					.setSPD(65);
			new ModifyPokemon('Nidorino', this)
				.baseStats
					.setHP(66)
					.setATK(92)
					.setDEF(62)
					.setSPD(60)
					.setSPE(70);
			new ModifyPokemon('Clefairy', this)
				.baseStats
					.setHP(75)
					.setDEF(58)
					.setSPA(65)
					.setSPD(75);
			new ModifyPokemon('Jigglypuff', this)
				.abilities
					.setAbility0('Fluffy')
				.pokemon.baseStats
					.setDEF(40)
					.setSPA(65)
					.setSPD(45)
				.pokemon.learnset
					.add('Moonblast');
			new ModifyPokemon('Golbat', this)
				.baseStats
					.setHP(85)
					.setATK(85)
					.setDEF(80)
					.setSPA(40)
					.setSPD(80);
			new ModifyPokemon('Gloom', this)
				.abilities
					.setAbility1('Neutralizing Gas')
				.pokemon.baseStats
					.setHP(70)
					.setDEF(75)
					.setSPA(95)
					.setSPD(80)
				.pokemon.learnset
					.add('Acid Spray')
					.add('Trailblaze');
			new ModifyPokemon('Poliwhirl', this)
				.baseStats
					.setHP(75)
					.setSPA(60)
					.setSPD(70)
				.pokemon.learnset
					.add('Flip Turn');
			new ModifyPokemon('Machoke', this)
				.baseStats
					.setHP(90)
					.setATK(110)
					.setDEF(80)
					.setSPD(75)
					.setSPE(55);
			new ModifyPokemon('Weepinbell', this)
				.abilities
					.setAbility0('Liquid Ooze')
					.setHiddenAbility('Fly Trap')
				.pokemon.baseStats
					.setHP(70)
					.setDEF(60)
					.setSPD(60)
				.pokemon.learnset
					.add('Solar Blade');
			new ModifyPokemon('Graveler', this)
				.abilities
					.setHiddenAbility('Solid Rock')
				.pokemon.baseStats
					.setHP(70)
					.setATK(100)
					.setSPD(60)
				.pokemon.learnset
					.add('Body Press');
			new ModifyPokemon('Graveler-Alola', this)
				.baseStats
					.setHP(70)
					.setATK(100)
					.setSPD(60)
				.pokemon.learnset
					.add('Body Press');
			new ModifyPokemon('Haunter', this)
				.baseStats
					.setHP(50)
					.setSPA(118)
					.setSPE(97);
			new ModifyPokemon('Seadra', this)
				.types
					.setType('Water', 'Dragon')
				.pokemon.abilities
					.setAbility0('Water Veil')
				.pokemon.baseStats
					.setHP(65)
					.setSPD(65)
			new ModifyPokemon('Electabuzz', this)
				.abilities
					.setHiddenAbility('Iron Fist')
				.pokemon.baseStats
					.setATK(93)
				.pokemon.learnset
					.add('Mach Punch');
			new ModifyPokemon('Magmar', this)
				.baseStats
					.setSPA(105)
				.pokemon.learnset
					.add('Scald')
					.add('Dark Pulse')
					.add('Magma Storm')
					.add('Burning Bulwark');
			new ModifyPokemon('Dragonair', this)
				.abilities
					.setHiddenAbility('Power of Alchemy')
				.pokemon.baseStats
					.setHP(76)
					.setDEF(70)
					.setSPD(75)
					.setSPA(85);
			// Gen 2
			new ModifyPokemon('Bayleef', this)
				.abilities
					.setAbility1('Regenrator')
				.pokemon.baseStats
					.setDEF(90)
					.setSPA(85)
					.setSPD(90);
			new ModifyPokemon('Quilava', this)
				.abilities
					.setAbility1('Anger Point')
				.pokemon.baseStats
					.setATK(84)
					.setSPE(85);
			new ModifyPokemon('Croconaw', this)
				.baseStats
					.setHP(75)
					.setATK(90)
					.setDEF(85);
			new ModifyPokemon('Togetic', this)
				.baseStats
					.setHP(70)
					.setSPA(95);
			new ModifyPokemon('Flaaffy', this)
				.abilities
					.setAbility1('Lightning Rod')
					.setHiddenAbility('Cotton Down')
				.pokemon.baseStats
					.setHP(75)
					.setDEF(65)
					.setSPA(95)
					.setSPD(75)
				.pokemon.learnset
					.add('Parabolic Charge')
					.add('Dazzling Gleam');
			new ModifyPokemon('Aipom', this)
				.abilities
					.setAbility1('Armor Tail')
				.pokemon.baseStats
					.setHP(65)
					.setATK(85)
					.setSPE(90)
				.pokemon.learnset
					.add('Sucker Punch')
					.add('Mach Punch')
					.add('Quick Attack');
			new ModifyPokemon('Murkrow', this)
				.abilities
					.setAbility0('Early Bird')
				.pokemon.baseStats
					.setHP(70)
					.setDEF(52)
					.setSPD(52)
				.pokemon.learnset
					.add('Parting Shot');
			new ModifyPokemon('Misdreavus', this)
				.types
					.setType('Ghost', 'Fairy')
				.pokemon.abilities
					.setHiddenAbility('Magic Guard')
				.pokemon.learnset
					.add('Moonlight')
					.add('Magic Powder')
					.add('Psyshock');
			new ModifyPokemon('Gligar', this)
				.baseStats
					.setATK(80)
					.setDEF(110);
			new ModifyPokemon('Sneasel', this)
				.baseStats
					.setATK(105)
					.setDEF(65);
			new ModifyPokemon('Sneasel-Hisui', this)
				.baseStats
					.setATK(105)
					.setDEF(65);
			new ModifyPokemon('Piloswine', this)
				.baseStats
					.setATK(110);
			new ModifyPokemon('Pupitar', this)
				.abilities
					.setAbility0('Solid Rock')
					.setHiddenAbility('Sand Stream')
				.pokemon.baseStats
					.setHP(75)
					.setATK(89)
					.setDEF(90)
					.setSPD(90);
			// Gen 3
			new ModifyPokemon('Grovyle', this)
				.baseStats
					.setHP(55)
					.setATK(80)
					.setDEF(50)
				.pokemon.learnset
					.add('Trailblaze');
			new ModifyPokemon('Combusken', this)
				.baseStats
					.setHP(65)
					.setATK(95)
					.setSPA(95);
			new ModifyPokemon('Marshtomp', this)
				.baseStats
					.setHP(80)
					.setDEF(75)
					.setSPD(80)
				.pokemon.learnset
					.add('Chilling Water')
					.add('Triple Dive');
			new ModifyPokemon('Lombre', this)
				.abilities
					.setHiddenAbility('Dancer')
				.pokemon.baseStats
					.setHP(70)
					.setSPA(70)
					.setSPE(60)
				.pokemon.learnset
					.add('Teeter Dance')
					.add('Quiver Dance');
			new ModifyPokemon('Nuzleaf', this)
				.abilities
					.setAbility1('Wind Rider')
				.pokemon.baseStats
					.setATK(90)
					.setSPA(80)
					.setSPE(70)
				.pokemon.learnset
					.add('Parting Shot');
			new ModifyPokemon('Kirlia', this)
				.abilities
					.setHiddenAbility('Dancer')
				.pokemon.baseStats
					.setHP(53)
					.setDEF(50)
					.setSPA(95)
					.setSPD(85)
					.setSPE(70)
				.pokemon.learnset
					.add('Recover');
			new ModifyPokemon('Vigoroth', this)
				.abilities
					.setAbility0('Berserk')
				.pokemon.baseStats
					.setSPD(65)
				.pokemon.learnset
					.add('Knock Off');
			new ModifyPokemon('Loudred', this)
				.abilities
					.setAbility1('Punk Rock')
				.pokemon.baseStats
					.setSPA(76)
					.setSPD(58)
					.setSPE(53)
				.pokemon.learnset
					.add('Overdrive');
			new ModifyPokemon('Lairon', this)
				.types
					.setType('Steel')
				.pokemon.abilities
					.setHiddenAbility('Filter')
				.pokemon.baseStats
					.setHP(65)
					.setATK(100)
					.setSPD(60)
				.pokemon.learnset
					.add('Work Up');
			new ModifyPokemon('Roselia', this)
				.abilities
					.setHiddenAbility('Technician')
				.pokemon.baseStats
					.setDEF(55)
					.setSPA(105)
					.setSPD(95)
					.setSPE(75)
				.pokemon.learnset
					.add('Sludge Wave')
					.add('Draining Kiss');
			new ModifyPokemon('Vibrava', this)
				.types
					.setType('Bug', 'Dragon')
				.pokemon.abilities
					.setHiddenAbility('Tinted Lens')
				.pokemon.baseStats
					.setHP(70)
					.setDEF(60)
					.setSPA(75)
					.setSPD(60)
					.setSPE(80)
				.pokemon.learnset
					.add('Pounce')
					.add('Skitter Smack');
			new ModifyPokemon('Sealeo', this)
				.abilities
					.setHiddenAbility('Ball Fetch')
				.pokemon.learnset
					.add('Scald')
					.add('Flip Turn')
					.add('Slack Off');
			new ModifyPokemon('Shelgon', this)
				.abilities
					.setAbility0('Weak Armor')
				.pokemon.baseStats
					.setHP(80)
					.setATK(100)
					.setSPA(70)
					.setSPD(60);
			new ModifyPokemon('Metang', this)
				.baseStats
					.setHP(70)
					.setATK(90)
					.setSPA(65)
					.setSPD(85);
			// Gen 4
			new ModifyPokemon('Grotle', this)
				.types
					.setType('Grass', 'Ground')
				.pokemon.abilities
					.setAbility1('Thick Fat')
				.pokemon.baseStats
					.setHP(85)
					.setDEF(90)
					.setSPD(70)
					.setSPE(41)
				.pokemon.learnset
					.add('Rapid Spin')
					.add('Earthquake');
			new ModifyPokemon('Monferno', this)
				.abilities
					.setAbility1('Steadfast')
				.pokemon.baseStats
					.setHP(69)
					.setATK(83)
					.setDEF(57)
					.setSPA(83)
					.setSPD(57)
				.pokemon.learnset
					.add('Sucker Punch')
					.add('Ice Punch');
			new ModifyPokemon('Prinplup', this)
				.abilities
					.setAbility1('Pressure')
				.pokemon.baseStats
					.setHP(74)
					.setDEF(73)
					.setSPD(81)
					.setSPE(55)
				.pokemon.learnset
					.add('Dual Wingbeat')
					.add('Ice Shard')
					.add('Icicle Crash');
			new ModifyPokemon('Staravia', this)
				.abilities
					.setAbility1('Guts')
				.pokemon.baseStats
					.setATK(85)
					.setSPD(50)
					.setSPE(90);
			new ModifyPokemon('Luxio', this)
				.types
					.setType('Electric', 'Dark')
				.pokemon.abilities
					.setAbility0('Strong Jaw')
				.pokemon.baseStats
					.setHP(75)
					.setATK(100)
					.setDEF(74)
					.setSPA(70)
					.setSPD(74)
					.setSPE(77);
			new ModifyPokemon('Gabite', this)
				.baseStats
					.setHP(78)
					.setATK(105)
					.setDEF(75)
					.setSPD(60);
			// Gen 5
			new ModifyPokemon('Servine', this)
				.abilities
					.setAbility1('Chlorophyll')
				.pokemon.baseStats
					.setHP(67)
					.setSPA(70);
			new ModifyPokemon('Pignite', this)
				.abilities
					.setAbility1('Thick Fat')
					.setHiddenAbility('Reckless')
				.pokemon.baseStats
					.setATK(95)
					.setDEF(60)
					.setSPD(60)
				.pokemon.learnset
					.add('Submission');
			new ModifyPokemon('Dewott', this)
				.abilities
					.setAbility1('Lightning Rod')
				.pokemon.baseStats
					.setHP(80)
					.setATK(82)
					.setSPE(65)
				.pokemon.learnset
					.add('Psycho Cut');
			new ModifyPokemon('Herdier', this)
				.types
					.setType('Normal', 'Ground')
				.pokemon.baseStats
					.setHP(85)
					.setATK(95)
					.setDEF(80)
					.setSPA(45)
					.setSPD(90)
					.setSPE(75);
			new ModifyPokemon('Tranquill', this)
				.types
					.setType('Flying')
				.pokemon.abilities
					.setAbility0('Rivalry')
					.setAbility1('Big Pecks')
					.setHiddenAbility('Gale Wings')
				.pokemon.baseStats
					.setHP(67)
					.setSPA(77)
					.setSPE(72)
				.pokemon.learnset
					.add('Flame Charge')
					.add('Superpower')
					.add('Oblivion Wing');
			new ModifyPokemon('Boldore', this)
				.baseStats
					.setSPD(70)
				.pokemon.learnset
					.add('Knock Off');
			new ModifyPokemon('Gurdurr', this)
				.types
					.setType('Fighting', 'Steel')
				.pokemon.baseStats
					.setSPD(60)
				.pokemon.learnset
					.add('Hard Press');
			new ModifyPokemon('Palpitoad', this)
				.baseStats
					.setHP(90)
					.setDEF(65)
					.setSPD(65)
				.pokemon.learnset
					.add('Thunder Wave')
					.add('Liquidation');
			new ModifyPokemon('Krokorok', this)
				.baseStats
					.setATK(97)
					.setDEF(55)
					.setSPD(55)
					.setSPE(79);
			new ModifyPokemon('Gothorita', this)
				.types
					.setType('Psychic', 'Dark')
				.pokemon.abilities
					.setHiddenAbility('Shadow Shield')
				.pokemon.baseStats
					.setHP(75)
					.setDEF(75)
					.setSPA(85)
					.setSPD(90)
				.pokemon.learnset
					.add('Baddy Bad')
					.add('Glitzy Glow')
					.add('Sparkly Swirl');
			new ModifyPokemon('Duosion', this)
				.types
					.setType('Psychic', 'Poison')
				.pokemon.baseStats
					.setHP(85)
					.setDEF(65)
					.setSPD(75)
				.pokemon.learnset
					.add('Sludge Wave')
					.add('Sludge Bomb')
					.add('WilloWisp');
			new ModifyPokemon('Vanillish', this)
				.baseStats
					.setHP(61)
					.setDEF(75)
					.setSPA(95)
					.setSPD(85)
				.pokemon.learnset
					.add('Freezy Frost')
					.add('Sparkly Swirl')
					.add('Salt Cure');
			new ModifyPokemon('Klang', this)
				.types
					.setType('Steel', 'Electric')
				.pokemon.abilities
					.setAbility0('Levitate')
					.setAbility1('Motor Drive')
					.setHiddenAbility('Steelworker');
			new ModifyPokemon('Eelektrik', this)
				.types
					.setType('Electric', 'Water')
				.pokemon.abilities
					.setAbility1('Volt Absorb')
					.setHiddenAbility('Swift Swim')
				.pokemon.learnset
					.add('Scald')
					.add('Flip Turn')
					.add('Surf')
					.add('Aqua Jet')
					.add('Waterfall')
					.add('Rising Voltage')
					.add('Hydro Pump');
			new ModifyPokemon('Lampent', this)
				.baseStats
					.setHP(65)
					.setSPA(100)
					.setSPD(70)
					.setSPE(75);
			new ModifyPokemon('Fraxure', this)
				.abilities
					.setAbility0('Mold Breaker')
					.setAbility1('Rough Skin')
					.setHiddenAbility('Tough Claws');
			new ModifyPokemon('Zweilous', this)
				.baseStats
					.setHP(82)
					.setATK(100)
					.setSPE(73);
			// Gen 6
			new ModifyPokemon('Quilladin', this)
				.abilities
					.setAbility1('Rough Skin')
					.setHiddenAbility('Leaf Guard')
				.pokemon.baseStats
					.setHP(66)
					.setSPD(78)
				.pokemon.learnset
					.add('Stealth Rock')
					.add('Horn Leech')
					.add('Rapid Spin');
			new ModifyPokemon('Braixen', this)
				.types
					.setType('Fire', 'Psychic')
				.pokemon.abilities
					.setAbility1('Magician')
					.setHiddenAbility('Magic Guard')
				.pokemon.baseStats
					.setHP(64)
					.setDEF(63)
					.setSPA(96)
					.setSPE(78)
				.pokemon.learnset
					.add('Magic Powder')
					.add('Moonblast');
			new ModifyPokemon('Frogadier', this)
				.types
					.setType('Water', 'Dark')
				.pokemon.baseStats
					.setHP(59)
					.setATK(78)
					.setDEF(57);
			new ModifyPokemon('Fletchinder', this)
				.abilities
					.setAbility1('Libero')
				.pokemon.baseStats
					.setHP(77)
					.setATK(81)
					.setSPE(91);
			new ModifyPokemon('Floette', this)
				.types
					.setType('Fairy', 'Grass')
				.pokemon.abilities
					.setAbility1('Symbiosis')
					.setHiddenAbility('Grassy Surge')
				.pokemon.baseStats
					.setHP(78)
					.setDEF(68)
					.setSPA(89)
					.setSPD(118)
					.setSPE(62);
			new ModifyPokemon('Sliggoo', this)
				.types
					.setType('Dragon', 'Poison')
				.pokemon.baseStats
					.setDEF(61);
			new ModifyPokemon('Sliggoo-Hisui', this)
				.baseStats
					.setHP(66);
			// Gen 7
			new ModifyPokemon('Dartrix', this)
				.abilities
					.setAbility1('Keen Eye')
				.pokemon.baseStats
					.setSPE(62);
			new ModifyPokemon('Torracat', this)
				.abilities
					.setAbility1('Defiant')
				.pokemon.baseStats
					.setHP(70)
					.setATK(90);
			new ModifyPokemon('Brionne', this)
				.types
					.setType('Water', 'Fairy')
				.pokemon.abilities
					.setAbility1('Thick Fat')
				.pokemon.baseStats
					.setDEF(74)
					.setSPE(55)
				.pokemon.learnset
					.add('Eerie Spell');
			new ModifyPokemon('Trumbeak', this)
				.types
					.setType('Flying')
				.pokemon.baseStats
					.setHP(65)
					.setATK(95)
					.setDEF(65)
					.setSPD(65);
			new ModifyPokemon('Charjabug', this)
				.abilities
					.setHiddenAbility('Electromorphosis')
				.pokemon.baseStats
					.setHP(77)
					.setDEF(105)
					.setSPA(75)
					.setSPD(85);
			new ModifyPokemon('Steenee', this)
				.types
					.setType('Grass', 'Fighting')
				.pokemon.abilities
					.setHiddenAbility('Leg Day')
				.pokemon.baseStats
					.setHP(62)
					.setATK(80)
					.setDEF(63)
					.setSPD(63)
					.setSPE(72)
				.pokemon.learnset
					.add('Triple Kick');
			new ModifyPokemon('Hakamoo', this)
				.baseStats
					.setATK(85)
					.setSPA(80)
					.setSPE(80);
			// Gen 8
			new ModifyPokemon('Thwackey', this)
				.baseStats
					.setHP(75)
					.setSPD(65)
				.pokemon.learnset
					.add('Jungle Healing');
			new ModifyPokemon('Raboot', this)
				.baseStats
					.setHP(70)
					.setATK(91);
			new ModifyPokemon('Drizzile', this)
				.abilities
					.setAbility1('Quick Draw')
				.pokemon.baseStats
					.setDEF(60)
					.setSPD(60)
				.pokemon.learnset
					.add('Flip Turn');
			new ModifyPokemon('Corvisquire', this)
				.baseStats
					.setHP(78)
					.setATK(72)
					.setDEF(60)
					.setSPD(60)
					.setSPE(87);
			new ModifyPokemon('Carkoal', this)
				.baseStats
					.setATK(65)
					.setSPA(65);
			new ModifyPokemon('Hattrem', this)
				.baseStats
					.setHP(72)
					.setATK(70)
					.setDEF(85)
					.setSPA(101)
					.setSPD(83);
			new ModifyPokemon('Morgrem', this)
				.baseStats
					.setHP(75)
					.setATK(75)
					.setDEF(55)
					.setSPD(65);
			new ModifyPokemon('Drakloak', this)
				.baseStats
					.setATK(95)
					.setSPA(95);
			new ModifyPokemon('Floragato', this)
				.abilities
					.setAbility1('Magician')
				.pokemon.baseStats
					.setHP(66)
					.setATK(85)
					.setDEF(68)
					.setSPD(68)
				.pokemon.learnset
					.add('Grassy Glide');
			new ModifyPokemon('Crocalor', this)
				.abilities
					.setAbility1('Punk Rock')
				.pokemon.baseStats
					.setHP(86)
					.setATK(59)
					.setSPD(63)
					.setSPE(54)
				.pokemon.learnset
					.add('Dragon Pulse');
			new ModifyPokemon('Quaxwell', this)
				.types
					.setType('Water', 'Fighting')
				.pokemon.abilities
					.setAbility1('Dancer')
				.pokemon.baseStats
					.setHP(75)
					.setDEF(70)
					.setSPA(70)
					.setSPD(65);
			new ModifyPokemon('Pawmo', this)
				.baseStats
					.setHP(70)
					.setATK(85)
					.setDEF(55)
					.setSPD(55)
				.pokemon.learnset
					.add('Plasma Fists')
					.add('Volt Tackle');
			new ModifyPokemon('Dolliv', this)
				.abilities
					.setAbility0('Seed Sower')
				.pokemon.baseStats
					.setHP(68)
					.setDEF(75)
					.setSPA(93)
					.setSPD(83)
				.pokemon.learnset
					.add('Draining Kiss');
			new ModifyPokemon('Naclstack', this)
				.baseStats
					.setHP(75)
					.setATK(80)
					.setSPD(75);
			new ModifyPokemon('Tinkatuff', this)
				.abilities
					.setHiddenAbility('Hammer Down')
				.pokemon.baseStats
					.setHP(70)
					.setATK(65)
					.setDEF(65)
				.pokemon.learnset
					.add('Wood Hammer')
					.add('Crab Hammer');
			new ModifyPokemon('Arctibax', this)
				.baseStats
					.setATK(105)
					.setDEF(78)
					.setSPD(75)
					.setSPE(67);
			//#endregion
			//#region FE Pokemon
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
			new ModifyPokemon('Pikachu', this)
				.learnset
					.add('Thunderclap');
			new ModifyPokemon('Raichu', this)
				.learnset
					.add('Thunderclap')
			new ModifyPokemon('Sandslash-Alola', this)
				.abilities
					.setAbility1('Battle Armor')
				.pokemon.baseStats
					.setHP(85)
					.setATK(105)
				.pokemon.learnset
					.add('Spin Out')
					.add('Glacier');
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
					.setAbility1('Ball Fetch')
				.pokemon.learnset
					.add('Burning Bulwark');
			new ModifyPokemon('Arcanine-Hisui', this)
				.learnset
					.add('Burning Bulwark');
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
					.setHiddenAbility('Turboblaze')
				.pokemon.learnset
					.add('Burning Bulwark');
			new ModifyPokemon('Leafeon', this)
				.learnset
					.add('Sappy Seed');
			new ModifyPokemon('Glaceon', this)
				.learnset
					.add('Cold Snap');
			new ModifyPokemon('Kabutops', this)
				.learnset
					.add('Mighty Cleave');
			new ModifyPokemon('Snorlax', this)
				.abilities
					.setAbility0('Toxic Boost');
			new ModifyPokemon('Articuno', this)
				.baseStats
					.setATK(60)
					.setSPD(135)
				.pokemon.learnset
					.add('Cold Snap');
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
					.setAbility0('Magma Armor')
				.pokemon.learnset
					.add('Burning Bulwark');
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
					.add('Thunderclap')
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
			new ModifyPokemon('Hariyama', this)
				.learnset
					.add('Hard Press');
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
					.setHiddenAbility('Ball Fetch')
				.pokemon.learnset
					.add('Thunderclap');
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
			new ModifyPokemon('Altaria-Mega', this)
				.baseStats
					.setDEF(115)
					.setSPA(125)
					.setSPD(115)
					.setSPE(90);
			new ModifyPokemon('Seviper', this)
				.abilities
					.setAbility1('Cold-Blooded');
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
			new ModifyPokemon('Cradily', this)
				.learnset
					.add('Sappy Seed');
			new ModifyPokemon('Armaldo', this)
				.learnset
					.add('Mighty Cleave');
			new ModifyPokemon('Absol-Mega', this)
				.baseStats
					.setSPA(125);
			new ModifyPokemon('Glalie', this)
				.learnset
					.add('Glacier')
					.add('Cold Snap');
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
			new ModifyPokemon('Regice', this)
				.learnset
					.add('Cold Snap');
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
					.setAbility1('Snow Cloak')
				.pokemon.learnset
					.add('Glacier')
					.add('Cold Snap');
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
					.setAbility1('Magma Armor')
				.pokemon.learnset
					.add('Burning Bulwark');
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
					.setATK(130)
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
					.setHiddenAbility('Teravolt')
				.pokemon.learnset
					.add('Thunderclap');
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
			new ModifyPokemon('Vanilluxe', this)
				.learnset
					.add('Cold Snap');
			new ModifyPokemon('Sawsbuck-Winter', this)
				.abilities
					.setAbility0('Snow Cloak')
				.pokemon.baseStats
					.setHP(80)
					.setDEF(75)
					.setSPA(130)
					.setSPD(75)
					.setSPE(110)
				.pokemon.learnset
					.add('Cold Snap');
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
			new ModifyPokemon('Cryogonal', this)
				.learnset
					.add('Cold Snap');
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
					.setAbility1('Cloud Nine')
				.pokemon.learnset
					.add('Electro Shot');
			// Thundurus-Therian gains Electro Shot due to inheritence from formes.
			new ModifyPokemon('Landorus', this)
				.abilities
					.setAbility1('Cloud Nine');
			new ModifyPokemon('Kyurem', this)
				.learnset
					.add('Glacier')
					.add('Cold Snap');
			new ModifyPokemon('Kyurem-Black', this)
				.learnset
					.add('Glacier')
					.add('Cold Snap');
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
		new ModifyPokemon('Gogoat', this)
			.learnset
				.add('Sappy Seed');
		new ModifyPokemon('Furfrou', this)
			.abilities
				.setAbility1('Receiver');
		new ModifyPokemon('Aegislash', this)
			.learnset
				.add('Tachyon Cutter');
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
				.setHiddenAbility('Solid Rock')
			.pokemon.learnset
				.add('Snowscape');
		new ModifyPokemon('Goodra', this)
			.abilities
				.setAbility1('Hydration')
				.setHiddenAbility('Corrosion');
		new ModifyPokemon('Avalugg', this)
			.learnset
				.add('Glacier');
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
				.setSPE(122)
			.pokemon.learnset
				.add('Mighty Cleave');
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
		new ModifyPokemon('Turtonator', this)
			.learnset
				.add('Burning Bulwark');
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
		new ModifyPokemon('Guzzlord', this)
			.learnset
				.add('Hard Press');
		new ModifyPokemon('Naganadel', this)
			.baseStats
				.setSPA(127)
				.setSPE(121);
		new ModifyPokemon('Melmetal', this)
			.abilities
				.setHiddenAbility('Full Metal Body')
			.pokemon.learnset
				.add('Meteor Mash')
				.add('Hard Press');
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
		new ModifyPokemon('Coalossal', this)
			.learnset
				.add('Burning Bulwark');
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
				.setHP(120)
				.setATK(145)
				.setSPD(90)
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
		new ModifyPokemon('Glastrier', this)
			.learnset
				.add('Glacier');
		new ModifyPokemon('Ursaluna', this)
			.abilities
				.setHiddenAbility('Vital Spirit');
		new ModifyPokemon('Kleavor', this)
			.learnset
				.add('Mighty Cleave');
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
				.setHP(90)
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
		new ModifyPokemon('Cetitan', this)
			.learnset
				.add('Glacier');
		new ModifyPokemon('Veluza', this)
			.baseStats
				.setATK(109)
				.setSPE(110);
		new ModifyPokemon('FlutterMane', this)
			.baseStats
				.setHP(70)
				.setATK(70)
				.setDEF(70)
				.setSPA(120)
				.setSPD(120)
				.setSPE(120);
		new ModifyPokemon('BruteBonnet', this)
			.learnset
				.add('Sappy Seed');
		new ModifyPokemon('Chi-Yu', this)
			.baseStats
				.setSPA(115);
		new ModifyPokemon('RoaringMoon', this)
			.baseStats
				.setATK(134)
				.setSPE(114);
		new ModifyPokemon('IronValiant', this)
			.baseStats
				.setATK(125)
				.setSPE(111);
		new ModifyPokemon('WalkingWake', this)
			.baseStats
				.setHP(94)
				.setSPA(120);
		new ModifyPokemon('Ogerpon', this)
			.abilities
				.setHiddenAbility('Stalwart');
		new ModifyPokemon('Ogerpon-Cornerstone', this)
			.abilities
				.setAbility0('Rivalry');
		//#endregion
		// Modify Moves
		const lightMoves = ['Dazzling Gleam', 'Freezing Glare', 'LightofRuin', 'Photon Geyser', 'Charge Beam', 'Prismatic Laser'];
		for(const move of lightMoves) {
			this.modData('Moves', move.includes(' ') ? move.toLowerCase().replace(' ', '') : move.toLowerCase()).flags['light'] = 1;
		}
		const weightMoves = ['Grass Knot', 'Heavy Slam'];
		for(const move of weightMoves) {
			this.modData('Moves', move.includes(' ') ? move.toLowerCase().replace(' ', '') : move.toLowerCase()).flags['weight'] = 1;
		}
		const peckMoves = ['Peck', 'Pluck', 'Drill Peck', 'Beak Blast', 'Bolt Beak'];
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
