import {ModdedDex} from "./../../../../sim/dex";
export default function Gen5(dex: ModdedDex) {
	const modifyPokemon = (pokemon: string) => {
		const baseStat = () => ({
			setHp,
			setAtk,
			setDef,
			setSpA,
			setSpD,
			setSpe,
			pokemon: modifyPokemon(pokemon),
		});

		const learnset = () => ({
			addMove,
			removeMove,
			pokemon: modifyPokemon(pokemon),
		});

		const ability = () => ({
			set0,
			set1,
			setH,
			setS,
			pokemon: modifyPokemon(pokemon),
		});

		const changeType = (type1: string, type2?: string) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).types = type2 ? [type1, type2] : [type1];
			return modifyPokemon(pokemon);
		};

		const addMove = (name: string, gen = 8) => {
			dex.modData('Learnsets', pokemon.toLowerCase()).learnset[name.toLowerCase().replace(/ +/g, '')] = [`${gen}M`];
			return learnset();
		};

		const removeMove = (name: string) => {
			delete dex.modData('Learnsets', pokemon.toLowerCase()).learnset[name.toLowerCase().replace(/ +/g, '')];
			return learnset();
		};

		const setHp = (stat: number) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).baseStats['hp'] = stat;
			return baseStat();
		};

		const setAtk = (stat: number) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).baseStats['atk'] = stat;
			return baseStat();
		};

		const setDef = (stat: number) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).baseStats['def'] = stat;
			return baseStat();
		};

		const setSpA = (stat: number) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).baseStats['spa'] = stat;
			return baseStat();
		};

		const setSpD = (stat: number) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).baseStats['spd'] = stat;
			return baseStat();
		};

		const setSpe = (stat: number) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).baseStats['spe'] = stat;
			return baseStat();
		};

		const set0 = (name: string) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).abilities['0'] = name;
			return ability();
		};

		const set1 = (name: string) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).abilities['1'] = name;
			return ability();
		};

		const setH = (name: string) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).abilities['H'] = name;
			return ability();
		};

		const setS = (name: string) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).abilities['S'] = name;
			return ability();
		};

		return {
			learnset,
			baseStat,
			changeType,
			ability,
		};
	};

	modifyPokemon('victini')
		.baseStat()
		.setHp(105)
		.setDef(90)
		.setSpD(90)
		.setSpe(115);

	modifyPokemon('serperior')
		.ability()
		.set1('Chlorophyll')
		.pokemon.learnset()
		.addMove('Draco Meteor');

	modifyPokemon('emboar')
		.ability()
		.set1('Thick Fat')
		.pokemon.baseStat()
		.setDef(85)
		.setSpD(85)
		.setSpe(80)
		.pokemon.learnset()
		.addMove('Close Combat')
		.addMove('Drain Punch')
		.addMove('Submission');

	modifyPokemon('samurott')
		.changeType('Water', 'Fighting')
		.ability()
		.set1('Lightning Rod')
		.setH('Sniper')
		.pokemon.baseStat()
		.setAtk(110)
		.setSpA(118)
		.setSpe(80)
		.pokemon.learnset()
		.addMove('Psycho Cut')
		.addMove('Secret Sword');

	modifyPokemon('samurotthisui')
		.baseStat()
		.setAtk(118)
		.setSpe(90)
		.pokemon.learnset()
		.addMove('Psycho Cut');

	modifyPokemon('watchog')
		.changeType('Normal', 'Psychic')
		.ability()
		.set0('Frisk')
		.set1('Stakeout')
		.setH('Compound Eyes')
		.pokemon.baseStat()
		.setHp(70)
		.setDef(74)
		.setSpA(85)
		.setSpD(74)
		.setSpe(85)
		.pokemon.learnset()
		.addMove('Psychic');

	modifyPokemon('stoutland')
		.changeType('Normal', 'Ground')
		.learnset()
		.addMove('Earthquake')
		.addMove('Swords Dance')
		.addMove('Double Edge')
		.addMove('Body Slam');

	modifyPokemon('liepard')
		.ability()
		.set0('Tough Claws')
		.pokemon.baseStat()
		.setAtk(98);

	modifyPokemon('simisage')
		.ability()
		.set0('Overgrow')
		.setH('Grassy Surge')
		.pokemon.baseStat()
		.setAtk(118)
		.setDef(85)
		.setSpA(78)
		.setSpe(104)
		.pokemon.learnset()
		.addMove('Close Combat')
		.addMove('Grassy Glide')
		.addMove('Stomping Tantrum')
		.addMove('U Turn')
		.addMove('Pursuit')
		.addMove('Trick')
		.addMove('Boomburst');

	modifyPokemon('simisear')
		.ability()
		.set0('Blaze')
		.setH('Drought')
		.pokemon.baseStat()
		.setAtk(105)
		.setSpA(105)
		.setSpe(112)
		.pokemon.learnset()
		.addMove('Eruption')
		.addMove('Scorching Sands')
		.addMove('U Turn')
		.addMove('Pursuit')
		.addMove('Trick')
		.addMove('Parting Shot');

	modifyPokemon('simipour')
		.ability()
		.set0('Torrent')
		.setH('Drizzle')
		.pokemon.baseStat()
		.setHp(90)
		.setAtk(78)
		.setSpA(118)
		.setSpD(85)
		.setSpe(104)
		.pokemon.learnset()
		.addMove('Water Spout')
		.addMove('Flip Turn')
		.addMove('Pursuit')
		.addMove('Trick')
		.addMove('Freeze Dry')
		.addMove('Glare');

	modifyPokemon('musharna')
		.ability()
		.set0('Unaware')
		.set1('Levitate')
		.setH('Misty Surge')
		.pokemon.baseStat()
		.setDef(85)
		.setSpA(110)
		.pokemon.learnset()
		.addMove('Draining Kiss')
		.addMove('Slack Off')
		.addMove('Haze')
		.addMove('Mist Ball')
		.addMove('Lumina Crash');
	modifyPokemon('unfezant')
		.changeType('Flying')
		.ability()
		.set0('Rivalry')
		.setH('Gale Wings')
		.pokemon.baseStat()
		.setHp(70)
		.setAtk(100)
		.setSpA(100)
		.setSpe(110)
		.pokemon.learnset()
		.addMove('Superpower')
		.addMove('Flame Charge')
		.addMove('Oblivion Wing');
	modifyPokemon('zebstrika')
		.ability()
		.set1('Reckless')
		.setH('Rock Head')
		.pokemon.baseStat()
		.setHp(90)
		.pokemon.learnset()
		.addMove('Jump Kick')
		.addMove('Head Smash')
		.addMove('Flare Blitz')
		.addMove('Volt Tackle')
		.addMove('Thunderous Kick')
		.addMove('Lash Out')
		.addMove('Rising Voltage')
		.addMove('High Horsepower');
	modifyPokemon('gigalith')
		.ability()
		.setH('Solar Power')
		.pokemon.learnset()
		.addMove('Shore Up')
		.addMove('Knock Off')
		.addMove('Diamond Storm');
	modifyPokemon('swoobat')
		.ability()
		.set1('Punk Rock')
		.pokemon.learnset()
		.addMove('Boomburst')
		.addMove('Psycho Boost')
		.addMove('Extreme Speed')
		.addMove('Parting Shot');
	modifyPokemon('excadrill')
		.learnset()
		.addMove('Precipice Blades');
	modifyPokemon('audino')
		.changeType('Fairy')
		.ability()
		.set0('Magic Guard')
		.set1('Klutz')
		.setH('Regenerator')
		.pokemon.baseStat()
		.setSpA(80)
		.pokemon.learnset()
		.addMove('Moonblast')
		.addMove('Recover');
	modifyPokemon('audinomega')
		.ability()
		.set0('Serene Grace')
		.pokemon.baseStat()
		.setSpA(90)
		.setSpe(60);
	modifyPokemon('conkeldurr')
		.changeType('Fighting', 'Rock')
		.baseStat()
		.setAtk(130)
		.pokemon.learnset()
		.addMove('Accelerock')
		.addMove('Head Smash');
	modifyPokemon('seismitoad')
		.ability()
		.set1('Iron Fist')
		.pokemon.baseStat()
		.setHp(125)
		.setDef(85)
		.setSpD(85)
		.pokemon.learnset()
		.addMove('Boomburst')
		.addMove('Thunder Wave')
		.addMove('Dynamic Punch')
		.addMove('Liquidation');
	modifyPokemon('sawk')
		.ability()
		.setH('Contrary');
	modifyPokemon('throh')
		.ability()
		.set1('Thick Fat')
		.setH('Technician')
		.pokemon.learnset()
		.addMove('Close Combat')
		.addMove('Slack Off')
		.addMove('Drain Punch')
		.addMove('Arm Thrust')
		.addMove('Mach Punch')
		.addMove('Final Gambit');
	modifyPokemon('leavanny')
		.ability()
		.set0('Sharpness')
		.setH('Queenly Majesty')
		.pokemon.learnset()
		.addMove('Quiver Dance')
		.addMove('Psycho Cut')
		.addMove('Sacred Sword')
		.addMove('Cross Poison')
		.addMove('First Impression')
		.addMove('UTurn')
		.addMove('Grassy Glide')
		.addMove('Needle Arm')
		.addMove('Horn Leech')
		.addMove('Trop Kick')
		.addMove('Wood Hammer')
		.addMove('Triple Axel')
		.addMove('Air Slash')
		.addMove('Attack Order');
	modifyPokemon('scolipede')
		.learnset()
		.addMove('Gunk Shot');
	modifyPokemon('whimsicott')
		.ability()
		.set1('Cotton Down')
		.pokemon.learnset()
		.addMove('Trick');
	modifyPokemon('lilligant')
		.learnset()
		.addMove('Burning Jealousy')
		.addMove('Weather Ball')
		.addMove('Dazzling Gleam');
	modifyPokemon('lilliganthisui')
		.ability()
		.setH('Dancer');
	modifyPokemon('basculin')
		.changeType('Water', 'Dark')
		.ability()
		.setH('Strong Jaw')
		.pokemon.learnset()
		.addMove('Bulk Up')
		.addMove('No Retreat');
	modifyPokemon('basculegion')
		.ability()
		.setH('Intimidate')
		.pokemon.learnset()
		.addMove('Poltergeist')
		.addMove('Shadow Sneak')
		.removeMove('Last Respects');
	modifyPokemon('basculegionf')
		.ability()
		.setH('Perish Body')
		.pokemon.baseStat()
		.setAtk(80)
		.setSpA(112)
		.pokemon.learnset()
		.addMove('Origin Pulse')
		.addMove('Baddy Bad')
		.addMove('Bouncy Bubble')
		.addMove('Freezy Frost');
	modifyPokemon('krookodile')
		.baseStat()
		.setAtk(117)
		.pokemon.learnset()
		.addMove('Wicked Blow');
	modifyPokemon('darmanitan')
		.learnset()
		.addMove('Thunder Punch')
		.addMove('Rage Fist');
	modifyPokemon('darmanitangalar')
		.ability()
		.set1('Sheer Force');
	modifyPokemon('maractus')
		.ability()
		.set0('Dancer')
		.set1('Sand Rush')
		.pokemon.baseStat()
		.setHp(80)
		.setDef(72)
		.setSpD(72)
		.pokemon.learnset()
		.addMove('Quiver Dance')
		.addMove('Fiery Dance')
		.addMove('Revelation Dance')
		.addMove('Sappy Seed')
		.addMove('Teeter Dance');
	modifyPokemon('crustle')
		.ability()
		.set1('Super Luck')
		.setH('Rough Skin')
		.pokemon.baseStat()
		.setHp(80)
		.setDef(130)
		.setSpD(95)
		.pokemon.learnset()
		.addMove('Shore Up')
		.addMove('Focus Energy')
		.addMove('Lunge')
		.addMove('First Impression')
		.addMove('Attack Order');
	modifyPokemon('scrafty')
		.ability()
		.set1('Filter')
		.pokemon.baseStat()
		.setHp(75)
		.setDef(105)
		.setSpD(105);
	modifyPokemon('sigilyph')
		.ability()
		.set0('Sand Force')
		.pokemon.learnset()
		.addMove('Scorching Sands')
		.addMove('Photon Geyser')
		.addMove('Power Gem')
		.addMove('Moonblast');
	modifyPokemon('Cofagrigus')
		.ability()
		.set1('Cursed Body')
		.setH('Shadow Shield')
		.pokemon.baseStat()
		.setHp(68)
		.setSpe(25);
	modifyPokemon('carracosta')
		.ability()
		.set0('Strong Jaw')
		.setH('Analytic')
		.pokemon.baseStat()
		.setHp(84)
		.setAtk(113)
		.setSpD(85)
		.setSpe(37)
		.pokemon.learnset()
		.addMove('Rapid Spin')
		.addMove('Thunder Fang')
		.addMove('Ice Fang')
		.addMove('Fire Fang')
		.addMove('Poison Fang')
		.addMove('Psychic Fangs')
		.addMove('Bulk Up')
		.addMove('Leech Life')
		.addMove('Earthquake')
		.addMove('Flip Turn');
	modifyPokemon('archeops')
		.ability()
		.set1('Emergency Exit')
		.setH('Early Bird')
		.pokemon.baseStat()
		.setAtk(140)
		.setSpe(110);
	modifyPokemon('garbodor')
		.changeType('Poison', 'Ground')
		.ability()
		.set0('Water Absorb')
		.set1('Corrosion')
		.setH('Filter')
		.pokemon.baseStat()
		.setHp(90)
		.setAtk(100)
		.setDef(87)
		.setSpD(87)
		.pokemon.learnset()
		.addMove('Earthquake')
		.addMove('Poison Jab')
		.addMove('Bulk Up');
	modifyPokemon('zoroark')
		.changeType('Dark', 'Psychic')
		.ability()
		.set1('Moxie')
		.setH('Dark Aura')
		.pokemon.baseStat()
		.setHp(70)
		.setAtk(120)
		.setSpA(120)
		.pokemon.learnset()
		.addMove('Transform')
		.addMove('Psycho Cut')
		.addMove('Zen Headbutt')
		.addMove('Fire Lash');
	modifyPokemon('zoroarkhisui')
		.ability()
		.set1('Dark Aura')
		.setH('Wandering Spirit')
		.pokemon.learnset()
		.addMove('Ice Beam');
	modifyPokemon('cinccino')
		.changeType('Normal', 'Fairy')
		.ability()
		.set0('Clean Up')
		.pokemon.baseStat()
		.setHp(85)
		.setAtk(100)
		.setSpD(55)
		.pokemon.learnset()
		.addMove('Tailwind')
		.addMove('Dragon Tail')
		.addMove('Poison Tail')
		.addMove('Snuggle');
	modifyPokemon('gothitelle')
		.changeType('Psychic', 'Dark')
		.ability()
		.setH('Shadow Shield')
		.pokemon.learnset()
		.addMove('Meteor Beam')
		.addMove('Baddy Bad')
		.addMove('Glitzy Glow')
		.addMove('Sparkly Swirl');
	modifyPokemon('reuniclus')
		.changeType('Psychic', 'Poison')
		.learnset()
		.addMove('Sludge Bomb')
		.addMove('Sludge Wave')
		.addMove('Willowisp');
	modifyPokemon('swanna')
		.ability()
		.set0('Berserk')
		.set1('Anger Point')
		.setH('Drizzle')
		.pokemon.baseStat()
		.setHp(65)
		.setAtk(107)
		.setDef(50)
		.setSpD(50)
		.setSpA(107)
		.setSpD(50)
		.setSpe(118)
		.pokemon.learnset()
		.addMove('Endure')
		.addMove('Hydro Pump')
		.addMove('UTurn')
		.addMove('Flip Turn')
		.addMove('Dual Wingbeat')
		.addMove('Outrage');
	modifyPokemon('vanilluxe')
		.baseStat()
		.setHp(81)
		.setDef(95)
		.setSpe(89)
		.pokemon.learnset()
		.addMove('Freezy Frost')
		.addMove('Sparkly Swirl')
		.addMove('Salt Cure');
	// Base Sawsbuck is Sawsbuck-Spring
	modifyPokemon('sawsbuck')
		.changeType('Fairy', 'Grass')
		.ability()
		.set0('Misty Surge')
		.set1('Cud Chew')
		.pokemon.baseStat()
		.setHp(100)
		.setAtk(60)
		.setDef(90)
		.setSpA(100)
		.setSpD(90)
		.setSpe(90)
		.pokemon.learnset()
		.addMove('Dazzling Gleam')
		.addMove('Draining Kiss')
		.addMove('Sparkly Swirl')
		.addMove('Horn Leech')
		.addMove('Calm Mind');
	modifyPokemon('sawsbuckwinter')
		.changeType('Ice', 'Grass')
		.ability()
		.set0('Slush Rush')
		.set1('Refrigerate')
		.pokemon.baseStat()
		.setHp(85)
		.setAtk(60)
		.setDef(80)
		.setSpA(120)
		.setSpD(80)
		.setSpe(105)
		.pokemon.learnset()
		.addMove('Horn Leech')
		.addMove('Blizzard')
		.addMove('Ice Beam')
		.addMove('Bitter Malice')
		.addMove('Snowscape')
		.addMove('Chilly Reception', 9)
		.addMove('Frost Breath')
		.addMove('Calm Mind')
		.addMove('Ice Shard')
		.addMove('Freezy Frost')
		.addMove('Icy Wind')
		.addMove('Tri Attack');
	modifyPokemon('sawsbucksummer')
		.changeType('Fire', 'Grass')
		.ability()
		.set1('Flash Fire')
		.pokemon.baseStat()
		.setHp(85)
		.setAtk(120)
		.setDef(80)
		.setSpD(80)
		.setSpe(105)
		.pokemon.learnset()
		.addMove('Raging Fury')
		.addMove('Flame Charge')
		.addMove('V Create')
		.addMove('Blaze Kick')
		.addMove('Horn Leech')
		.addMove('Leaf Blade')
		.addMove('Trop Kick');
	modifyPokemon('sawsbuckautumn')
		.changeType('Fighting', 'Grass')
		.ability()
		.set0('Guts')
		.pokemon.baseStat()
		.setHp(100)
		.setDef(90)
		.setSpD(90)
		.setSpe(90)
		.pokemon.learnset()
		.addMove('Horn Leech')
		.addMove('Bulk Up')
		.addMove('Collision Course', 9)
		.addMove('High Jump Kick')
		.addMove('Leaf Blade')
		.addMove('Trop Kick');
	modifyPokemon('emolga')
		.ability()
		.set1('Gale Wings')
		.setH('Technician')
		.pokemon.baseStat()
		.setHp(70)
		.setAtk(90)
		.setDef(70)
		.setSpA(95)
		.setSpD(70)
		.setSpe(113)
		.pokemon.learnset()
		.addMove('Gust')
		.addMove('Parabolic Charge')
		.addMove('Zap Cannon');
	modifyPokemon('escavalier')
		.ability()
		.set0('Bulletproof')
		.pokemon.baseStat()
		.setHp(85)
		.pokemon.learnset()
		.addMove('Double Iron Bash')
		.addMove('Leech Life')
		.addMove('U Turn');
	modifyPokemon('amoonguss')
		.baseStat()
		.setDef(85)
		.setSpD(90)
		.pokemon.learnset()
		.addMove('Transform');
	modifyPokemon('jellicent')
		.ability()
		.setH('Water Bubble')
		.pokemon.baseStat()
		.setDef(85);
	modifyPokemon('alomomola')
		.learnset()
		.addMove('Flip Turn')
		.addMove('Draining Kiss')
		.addMove('Lovely Kiss')
		.addMove('Sweet Kiss')
		.addMove('Heart Swap')
		.addMove('Heart Stamp');
	modifyPokemon('galvantula')
		.baseStat()
		.setAtk(62)
		.setSpA(112)
		.setSpe(118);
	modifyPokemon('ferrothorn')
		.ability()
		.set1('Bulletproof')
		.pokemon.learnset()
		.addMove('Rapid Spin');
	modifyPokemon('klinklang')
		.changeType('Steel', 'Electric')
		.ability()
		.set0('Levitate')
		.set1('Clear Body')
		.setH('Steelworker')
		.pokemon.baseStat()
		.setHp(90)
		.setAtk(105)
		.setDef(105)
		.setSpA(95)
		.setSpD(95)
		.pokemon.learnset()
		.addMove('Volt Tackle')
		.addMove('Superpower')
		.addMove('Iron Head')
		.addMove('Heavy Slam');
	modifyPokemon('eelektross')
		.changeType('Electric', 'Water')
		.ability()
		.set1('Volt Absorb')
		.setH('Swift Swim')
		.pokemon.learnset()
		.addMove('Scald')
		.addMove('Flip Turn')
		.addMove('Surf')
		.addMove('Aqua Jet')
		.addMove('Waterfall')
		.addMove('Rising Voltage')
		.addMove('Hydro Pump')
		.addMove('Ice Punch');
	modifyPokemon('elgyem')
		.learnset()
		.removeMove('Cosmic Power');
	modifyPokemon('beheeyem')
		.changeType('Psychic', 'Steel')
		.ability()
		.set0('Analytic')
		.set1('Psychic Surge')
		.setH('Magic Bounce')
		.pokemon.baseStat()
		.setHp(90)
		.setDef(90)
		.setSpe(30)
		.pokemon.learnset()
		.removeMove('Cosmic Power')
		.addMove('Doom Desire')
		.addMove('Autotomize');
	modifyPokemon('chandelure')
		.baseStat()
		.setSpe(95);
	modifyPokemon('haxorus')
		.changeType('Dragon', 'Steel')
		.ability()
		.set0('Anger Point')
		.set1('Rough Skin')
		.setH('Tough Claws')
		.pokemon.baseStat()
		.setAtk(137)
		.pokemon.learnset()
		.addMove('Iron Head');
	modifyPokemon('beartic')
		.ability()
		.set0('Sheer Force')
		.pokemon.baseStat()
		.setHp(105)
		.setDef(85)
		.setSpD(85)
		.setSpe(75)
		.pokemon.learnset()
		.addMove('Fire Punch')
		.addMove('Thunder Punch');
	modifyPokemon('cryogonal')
		.changeType('Ice', 'Flying')
		.ability()
		.set0('Refrigerate')
		.set1('Ice Body')
		.setH('Snow Warning')
		.pokemon.baseStat()
		.setAtk(60)
		.setDef(75)
		.pokemon.learnset()
		.addMove('Floaty Fall')
		.addMove('Hurricane')
		.addMove('Power Gem')
		.addMove('Gust');
	modifyPokemon('accelgor')
		.changeType('Bug', 'Dark')
		.ability()
		.set1('Opportunist')
		.setH('Infiltrator')
		.pokemon.learnset()
		.addMove('Dark Pulse')
		.addMove('Sticky Web')
		.addMove('Snarl')
		.addMove('Taunt')
		.addMove('Switcheroo');
	modifyPokemon('stunfisk')
		.ability()
		.set1('Lightning Rod')
		.setH('Water Absorb')
		.pokemon.baseStat()
		.setHp(119)
		.setAtk(56)
		.setDef(89)
		.setSpA(96)
		.setSpD(114)
		.pokemon.learnset()
		.addMove('Parabolic Charge')
		.addMove('Rising Voltage')
		.addMove('Thunder Cage');
	modifyPokemon('stunfiskgalar')
		.ability()
		.set1('Strong Jaw')
		.setH('Arena Trap')
		.pokemon.baseStat()
		.setHp(119)
		.setAtk(96)
		.setDef(114)
		.setSpA(56)
		.setSpD(89)
		.pokemon.learnset()
		.addMove('Fire Fang')
		.addMove('Thunder Fang')
		.addMove('Psychic Fangs')
		.addMove('Jaw Lock')
		.addMove('Steel Roller')
		.addMove('Iron Head')
		.addMove('Gyro Ball')
		.addMove('Play Rough');
	modifyPokemon('mienshao')
		.ability()
		.setH('Long Reach')
		.pokemon.baseStat()
		.setSpe(115)
		.pokemon.learnset()
		.addMove('Zen Headbutt')
		.addMove('Thunder Punch');
	modifyPokemon('druddigon')
		.changeType('Dragon', 'Rock')
		.ability()
		.set1('Solid Rock')
		.setH("Dragon's Maw")
		.pokemon.baseStat()
		.setHp(97)
		.setDef(100)
		.setSpD(100)
		.setSpe(63)
		.pokemon.learnset()
		.addMove('Accelerock')
		.addMove('Stone Edge');
	modifyPokemon('golurk')
		.baseStat()
		.setHp(94)
		.setDef(90)
		.setSpD(90)
		.pokemon.learnset()
		.addMove('Bulk Up')
		.addMove('Double Iron Bash');
	modifyPokemon('bisharp')
		.baseStat()
		.setSpe(80);
	modifyPokemon('bouffalant')
		.changeType('Normal', 'Fighting')
		.ability()
		.setH('Rock Head')
		.pokemon.baseStat()
		.setHp(110)
		.setAtk(125)
		.setSpe(75)
		.pokemon.learnset()
		.addMove('Combat Torque', 9)
		.addMove('Horn Leech');
	modifyPokemon('braviary')
		.changeType('Fighting', 'Flying')
		.ability()
		.set0('Gale Wings')
		.pokemon.baseStat()
		.setHp(125)
		.setAtk(125)
		.setDef(90)
		.setSpA(40)
		.setSpD(90)
		.setSpe(95);
	modifyPokemon('braviaryhisui')
		.ability()
		.set0('Competitive')
		.pokemon.baseStat()
		.setHp(85)
		.setAtk(60)
		.setSpA(125)
		.setSpe(85)
		.pokemon.learnset()
		.addMove('Ice Beam')
		.addMove('Oblivion Wing')
		.addMove('Mystical Fire')
		.addMove('Future Sight');
	modifyPokemon('mandibuzz')
		.ability()
		.set0('Fluffy')
		.setH('Berserk')
		.pokemon.baseStat()
		.setHp(110)
		.setDef(105)
		.setSpA(95)
		.setSpD(105);
	modifyPokemon('heatmor')
		.ability()
		.set0('Long Reach')
		.pokemon.baseStat()
		.setAtk(117)
		.setDef(76)
		.setSpA(117)
		.setSpD(76)
		.setSpe(80);
	modifyPokemon('durant')
		.ability()
		.set0('Strong Jaw')
		.set1('Sturdy')
		.setH('Heatproof')
		.pokemon.baseStat()
		.setHp(68)
		.setAtk(114)
		.setDef(122)
		.pokemon.learnset()
		.addMove('No Retreat')
		.addMove('Jaw Lock')
		.addMove('U Turn')
		.addMove('Ice Fang');
	modifyPokemon('hydreigon')
		.ability()
		.set1('Dark Aura')
		.setH("Dragon's Maw")
		.pokemon.baseStat()
		.setHp(97)
		.setDef(95)
		.setSpA(110)
		.setSpD(95);
	modifyPokemon('volcarona');
	modifyPokemon('cobalion')
		.ability()
		.setH('Steelworker')
		.pokemon.baseStat()
		.setHp(101)
		.setAtk(90)
		.setSpA(90)
		.setSpD(112)
		.setSpe(88)
		.pokemon.learnset()
		.addMove('Body Press')
		.addMove('Steel Roller')
		.addMove('Aura Sphere')
		.addMove('Thunderous Kick')
		.addMove('Bulk Up');
	modifyPokemon('Terrakion')
		.ability()
		.setH('Solid Rock')
		.pokemon.baseStat()
		.setHp(71)
		.setAtk(134)
		.setDef(80)
		.setSpD(80)
		.setSpe(118)
		.pokemon.learnset()
		.addMove('Accelerock');
	modifyPokemon('virizion')
		.ability()
		.setH('Honey Gather')
		.pokemon.baseStat()
		.setHp(96)
		.setAtk(75)
		.setDef(81)
		.setSpA(139)
		.setSpD(119)
		.setSpe(108)
		.pokemon.learnset()
		.addMove('Horn Leech')
		.addMove('Aura Sphere')
		.addMove('Signal Beam')
		.addMove('Extrasensory')
		.addMove('Apple Acid');
	modifyPokemon('tornadus')
		.ability()
		.setH('Competitive');
	modifyPokemon('tornadustherian');
	modifyPokemon('thundurus');
	modifyPokemon('thundurustherian');
	modifyPokemon('landorus');
	modifyPokemon('landorustherian');
	modifyPokemon('reshiram');
	modifyPokemon('zekrom');
	modifyPokemon('kyurem')
		.learnset()
		.addMove('Ice Shard');
	modifyPokemon('kyuremwhite');
	modifyPokemon('kyuremblack')
		.baseStat()
		.setAtk(160)
		.setSpe(90)
		.pokemon.learnset()
		.removeMove('Dragon Dance');
	modifyPokemon('keldeo')
		.baseStat()
		.setHp(81)
		.setAtk(101)
		.setSpe(118);
	modifyPokemon('meloetta')
		.baseStat()
		.setAtk(72)
		.setSpe(95)
		.pokemon.learnset()
		.addMove('Parting Shot')
		.addMove('Future Sight');
	modifyPokemon('keldeo')
		.baseStat()
		.setHp(81)
		.setAtk(101)
		.setSpe(118);
	modifyPokemon('keldeoresolute')
		.baseStat()
		.setHp(81)
		.setAtk(101)
		.setSpe(118);
}
