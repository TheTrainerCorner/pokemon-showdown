import { ModdedDex } from "./../../../../sim/dex";
export default function Gen2 (dex: ModdedDex) {
	let modifyPokemon = (pokemon: string) => {
			
		let baseStat = () => {
			return {
				setHp,
				setAtk,
				setDef,
				setSpA,
				setSpD,
				setSpe,
				pokemon: modifyPokemon(pokemon)
			};
		};

		let learnset = () => {
			return {
				addMove,
				removeMove,
				pokemon: modifyPokemon(pokemon)
			};
		}

		let ability = () => {
			return {
				set0,
				set1,
				setH,
				setS,
				pokemon: modifyPokemon(pokemon)
			}
		}

		let changeType = (type1: string, type2?: string) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).types = type2 ? [type1, type2] : [type1];
			return modifyPokemon(pokemon);
		}

		let addMove = (name: string, gen: number = 8) => {
			dex.modData('Learnsets', pokemon.toLowerCase()).learnset[name.toLowerCase().replace(/ +/g, '')] = [`${gen}M`];
			return learnset();
		}

		let removeMove = (name: string) => {
			dex.modData('Learnsets', pokemon.toLowerCase()).learnset[name.toLowerCase().replace(/ +g/, '')] = [];
			return learnset();
		}

		let setHp = (stat: number) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).baseStats['hp'] = stat;
			return baseStat();
		}

		let setAtk = (stat: number) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).baseStats['atk'] = stat;
			return baseStat();
		}
		
		let setDef = (stat: number) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).baseStats['def'] = stat;
			return baseStat();
		}

		let setSpA = (stat: number) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).baseStats['spa'] = stat;
			return baseStat();
		}

		let setSpD = (stat: number) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).baseStats['spd'] = stat;
			return baseStat();
		}

		let setSpe = (stat: number) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).baseStats['spe'] = stat;
			return baseStat();
		}

		let set0 = (name: string) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).abilities['0'] = name;
			return ability();
		}

		let set1 = (name: string) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).abilities['1'] = name;
			return ability();
		}

		let setH = (name: string) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).abilities['H'] = name;
			return ability();
		}

		let setS = (name: string) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).abilities['S'] = name;
			return ability();
		}

		return {
			learnset,
			baseStat,
			changeType,
			ability,
		}
	}

modifyPokemon('meganium')
	.changeType('Grass', 'Fairy')
	.ability()
		.setH('Serene Grace')
		.set1('Regenerator')
	.pokemon.baseStat()
		.setHp(100)
		.setAtk(60)
		.setSpA(95)
		.setSpe(65)
	.pokemon.learnset()
		.addMove('Moonblast')
		.addMove('Draining Kiss')
		.addMove('Wish')
		.addMove('Springtide Storm', 9)
		.addMove('Roar');

modifyPokemon('typhlosion')
	.changeType('Fire', 'Ground')
	.ability()
		.set1('Anger Point')
	.pokemon.baseStat()
		.setAtk(109)
		.setDef(69)
		.setSpD(72)
		.setSpe(111)
	.pokemon.learnset()
		.addMove('Earth Power')
		.addMove('Trailblaze');

modifyPokemon('typhlosionhisui')
	.ability()
		.setH('Shadow Shield')
		.set1('Perish Body')
	.pokemon.learnset()
		.addMove('Bitter Malice')
		.addMove('Energy Ball')
		.addMove('Night Daze');

modifyPokemon('feraligatr')
	.changeType('Water', 'Dark')
	.ability()
		.set1('Rough Skin')
	.pokemon.learnset()
		.addMove('Jaw Lock')
		.addMove('Lunge')
		.addMove('Scale Shot')
		.addMove('Flip Turn')
		.addMove('Rapid Spin')
		.addMove('Knock Off')
		.addMove('Sucker Punch');

modifyPokemon('furret')
	.ability()
		.set0('Pickpocket')
		.set1('Fur Coat')
		.setH('Speed Boost')
	.pokemon.baseStat()
		.setHp(90)
		.setAtk(81)
		.setDef(74)
	.pokemon.learnset()
		.addMove('Play Rough');

modifyPokemon('noctowl')
	.changeType('Psychic', 'Flying')
	.ability()
		.set1('Trace')
	.pokemon.baseStat()
		.setDef(60)
		.setSpe(85)
	.pokemon.learnset()
		.addMove('Moongeist Beam')
		.addMove('Psyshock');

modifyPokemon('Ledian')
	.changeType('Bug', 'Fighting')
	.baseStat()
		.setHp(80)
		.setAtk(100)
		.setDef(75)
		.setSpA(15)
		.setSpe(95)
	.pokemon.learnset()
		.addMove('Sucker Punch')
		.addMove('Fire Punch');

modifyPokemon('ariados')
	.baseStat()
		.setHp(60)
		.setAtk(100)
		.setSpA(80)
		.setSpe(90)
	.pokemon.learnset()
		.addMove('Skitter Smack')
		.addMove('Nasty Plot')
		.addMove('Taunt')
		.addMove('Torment')
		.addMove('U Turn')
		.addMove('Knock Off');

modifyPokemon('lanturn')
	.ability()
		.set1('Hydration')
	.pokemon.baseStat()
		.setDef(68)
		.setSpA(81)
		.setSpD(81)
	.pokemon.learnset()
		.addMove('Parabolic Charge')
		.addMove('Flip Turn')
		.addMove('Flash Cannon')
		.addMove('Reflect')
		.addMove('Light Screen');

modifyPokemon('togekiss')
	.learnset()
		.addMove('Moonblast')
		.addMove('Ice Beam');

modifyPokemon('xatu')
	.ability()
		.set0('Magic Guard')
		.set1('Tinted Lens')
	.pokemon.baseStat()
		.setHp(75);

modifyPokemon('ampharos')
	.ability()
		.set1('Lightning Rod')
		.setH('Cotton Down')
	.pokemon.learnset()
		.addMove('Parabolic Charge')
		.addMove('Slack Off')
		.addMove('Dazzling Gleam');

modifyPokemon('ampharosmega')
	.ability()
		.set0("Dragon's Maw");

modifyPokemon('bellossom')
	.changeType('Grass', 'Fairy')
	.ability()
		.setH('Dancer')
	.pokemon.baseStat()
		.setHp(80)
		.setSpA(105)
		.setSpe(80)
	.pokemon.learnset()
		.addMove('Draining Kiss')
		.addMove('Fleur Cannon')
		.addMove('Teeter Dance')
		.addMove('Pollen Puff')
		.addMove('Rapid Spin')
		.addMove('Revelation Dance');

modifyPokemon('azumarill')
	.learnset()
		.addMove('Drain Punch');

modifyPokemon('sudowoodo')
	.changeType('Rock', 'Grass')
	.ability()
		.setH('Grassy Surge')
	.pokemon.baseStat()
		.setHp(75)
		.setAtk(115)
		.setSpD(85)
	.pokemon.learnset()
		.addMove('First Impression')
		.addMove('Grassy Glide');

modifyPokemon('jumpluff')
	.ability()
		.set1('Cotton Down')
		.set0('Speed Boost')
	.pokemon.baseStat()
		.setHp(85)
		.setAtk(75)
		.setDef(85)
	.pokemon.learnset()
		.addMove('Pollen Puff')
		.addMove('Floaty Fall');

modifyPokemon('ambipom')
	.ability()
		.set1('Armor Tail')
	.pokemon.baseStat()
		.setAtk(115)
	.pokemon.learnset()
		.addMove('Triple Axel')
		.addMove('Mach Punch')
		.addMove('Sucker Punch')
		.addMove('Quick Attack')
		.addMove('Storm Throw');

modifyPokemon('sunflora')
	.changeType('Grass', 'Fire')
	.ability()
		.setH('Drought')
	.pokemon.baseStat()
		.setHp(95)
		.setAtk(30)
		.setDef(85)
		.setSpA(120)
		.setSpe(55)
	.pokemon.learnset()
		.addMove('Weather Ball')
		.addMove('Fire Blast')
		.addMove('Flamethrower')
		.addMove('Heat Wave')
		.addMove('Sizzly Slide');

modifyPokemon('unown')
	.changeType('Psychic', 'Ghost')
	.baseStat()
		.setHp(55)
		.setSpe(98)
	.pokemon.learnset()
		.addMove('Extrasensory')
		.addMove('Stored Power')
		.addMove('Cosmic Power')
		.addMove('Moonlight')
		.addMove('Ancient Power')
		.addMove('Moonblast')
		.addMove('Signal Beam')
		.addMove('Tri Attack')
		.addMove('Judgement')
		.addMove('Psychic')
		.addMove('Roar Of Time')
		.addMove('Spacial Rend')
		.addMove('Shadow Force')
		.addMove('Aura Sphere');

modifyPokemon('yanmega')
	.changeType('Bug', 'Dragon')
	.ability()
		.setH('Compound Eyes')
	.pokemon.baseStat()
		.setAtk(96)
	.pokemon.learnset()
		.addMove('Dragon Rush')
		.addMove('Dragon Pulse')
		.addMove('Dragon Claw')
		.addMove('Outrage');

modifyPokemon('quagsire')
	.baseStat()
		.setSpD(85);

modifyPokemon('honchkrow')
	.ability()
		.set0('Intimidate')
		.set1('Shadow Shield')
	.pokemon.learnset()
		.addMove('Parting Shot')
		.addMove('Oblivion Wing')
		.addMove('Switcheroo');

modifyPokemon('mismagius')
	.changeType('Ghost', 'Fairy')
	.ability()
		.setH('Magic Guard')
	.pokemon.baseStat()
		.setHp(75)
		.setSpA(115)
		.setSpe(110)
	.pokemon.learnset()
		.addMove('Psyshock')
		.addMove('Magic Powder')
		.addMove('Moonblast')
		.addMove('Moonlight');

modifyPokemon('girafarig')
	.ability()
		.set0('Inner Focus')
		.set1('Lightning Rod')
		.setH('Scrappy')
	.pokemon.baseStat()
		.setHp(90)
		.setAtk(90)
		.setSpA(100)
		.setSpe(95)
	.pokemon.learnset()
		.addMove('Tri Attack')
		.addMove('Focus Blast')
		.addMove('Dazzling Gleam')
		.addMove('Jump Kick')
		.addMove('U Turn');

modifyPokemon('Forretress')
	.baseStat()
		.setSpA(45)
		.setSpD(90);

modifyPokemon('dunsparce')
	.changeType('Normal', 'Ground')
	.ability()
		.set1('Levitate')
		.setH('Super Luck')
	.pokemon.baseStat()
		.setAtk(75)
		.setDef(75)
		.setSpA(75)
		.setSpD(75)
		.setSpe(65);

modifyPokemon('gligar')
	.learnset()
		.addMove('Dual Wingbeat');

modifyPokemon('gliscor')
	.learnset()
		.addMove('Dual Wingbeat');

modifyPokemon('granbull')
	.changeType('Fairy', 'Dark')
	.ability()
		.set1('Guts')
		.setH('Justified')
	.pokemon.baseStat()
		.setSpe(85)
	.pokemon.learnset()
		.addMove('Drain Punch')
		.addMove('Knock Off');

modifyPokemon('qwilfish')
	.ability()
		.set1('Iron Barbs')
	.pokemon.baseStat()
		.setHp(75)
		.setSpD(85)
	.pokemon.learnset()
		.addMove('Baneful Bunker')
		.addMove('Spiky Shield');

modifyPokemon('qwilfishhisui')
	.ability()
		.set1('Corrosion')
	.pokemon.baseStat()
		.setHp(85)
		.setAtk(75)
		.setSpD(85)
		.setSpe(75);

modifyPokemon('overqwil')
	.ability()
		.set0('Poison Touch')
	.pokemon.baseStat()
		.setHp(100)
		.setSpA(80)
		.setSpD(90);

modifyPokemon('shuckle');

modifyPokemon('heracross')
	.ability()
		.set0('Sap Sipper')
	.pokemon.learnset()
		.addMove('First Impression')
		.addMove('Drain Punch');

modifyPokemon('weavile')
	.ability()
		.setH('Infiltrator')
	.pokemon.learnset()
		.addMove('Sucker Punch');

modifyPokemon('ursaring')
	.baseStat()
		.setDef(95)
		.setSpD(80);

modifyPokemon('ursaluna')
	.baseStat()
		.setHp(110)
		.setAtk(130);

modifyPokemon('magcargo')
	.ability()
		.setH('Desolate Land')
		.set0('Sturdy')
	.pokemon.baseStat()
		.setHp(80)
		.setSpA(115)
		.setSpD(100)
		.setSpe(60)
	.pokemon.learnset()
		.addMove('Slack Off')
		.addMove('Power Gem')
		.addMove('Meteor Beam')
		.addMove('Magma Storm');

modifyPokemon('mamoswine')
	.ability()
		.set1('Thick Fat')
		.setH('Gluttony')
	.pokemon.learnset()
		.addMove('Headlong Rush');

modifyPokemon('corsola')
	.ability()
		.set0('Rock Head')
	.pokemon.baseStat()
		.setAtk(95)
		.setSpe(50)
	.pokemon.learnset()
		.addMove('Flip Turn');

modifyPokemon('corsolagalar')
	.changeType('Ghost', 'Rock')
	.ability()
		.set0('Cursed Body')
		.setH('Regenerator')
	.pokemon.baseStat()
		.setHp(80)
		.setDef(90)
		.setSpD(90)
	.pokemon.learnset()
		.addMove('Teleport')
		.addMove('Shadow Sneak')
		.addMove('Toxic');

modifyPokemon('cursola')
	.changeType('Ghost', 'Rock')
	.ability()
		.set0('Perish Body')
		.setH('Regenerator')
	.pokemon.baseStat()
		.setHp(90)
		.setDef(90)
		.setSpD(90)
	.pokemon.learnset();
	// Corsola-Galar already has the following:
	// Teleport, Shadow Sneak, and Toxic
	// Cursola will gain these moves through
	// Inheritances

modifyPokemon('octillery')
	.ability()
		.setH('Artillery')
		.set0('Mega Launcher')
	.pokemon.baseStat()
		.setHp(100)
		.setAtk(50)
		.setDef(100)
		.setSpA(150)
		.setSpD(100)
		.setSpe(15)
	.pokemon.learnset()
		.addMove('Aqua Ring')
		.addMove('Thunderbolt')
		.addMove('Meteor Beam')
		.addMove('Aura Sphere')
		.addMove('Shadow Ball')
		.addMove('Aeroblast')
		.addMove('Dark Pulse')
		.addMove('Moonblast')
		.addMove('Dragon Pulse')
		.addMove('Origin Pulse');

modifyPokemon('delibird')
	.changeType('Ice', 'Fairy')
	.ability()
		.setH('Refrigerate')
		.set1('Slush Rush')
	.pokemon.baseStat()
		.setHp(80)
		.setAtk(80)
		.setDef(75)
		.setSpA(80)
		.setSpD(80)
		.setSpe(90)
	.pokemon.learnset()
		.addMove('Dazzling Gleam')
		.addMove('Play Rough');

modifyPokemon('mantine')
	.learnset()
		.addMove('Flip Turn');

modifyPokemon('skarmory')
	.ability()
		.set0('Light Metal')
		.setH('Intimidate');

modifyPokemon('houndoom')
	.baseStat()
		.setSpA(120)
		.setSpe(100)
	.pokemon.learnset()
		.addMove('Fiery Wrath')
		.addMove('Scorching Sands');

modifyPokemon('houndoommega')
	.ability()
		.set0('Intimidate')
	.pokemon.baseStat()
		.setSpA(150)
	.pokemon.learnset()
		// Houndoom gets the following:
		// Fiery Wrath, and Scorching Sands
		// Houndoom-Mega will gain these through
		// Inheritance

modifyPokemon('donphan')
	.ability()
		.setH('Sand Rush')
		.set1('Technician')
	.pokemon.baseStat()
		.setSpD(90)
	.pokemon.learnset()
		.addMove('Flame Wheel')
		.addMove('Spin Out', 9);

modifyPokemon('stantler')
	.baseStat()
		.setDef(82)
		.setSpD(85);

modifyPokemon('wyrdeer')
	.ability()
		.setH('Stamina')
	.pokemon.baseStat()
		.setAtk(115)
		.setDef(92)
		.setSpA(110)
		.setSpD(95)
		.setSpe(105)
	.pokemon.learnset()
		.addMove('Recover');

modifyPokemon('smeargle')
	.ability()
		.set1('Inner Focus')
		.setH('Color Change')
	.pokemon.baseStat()
		.setAtk(50)
		.setDef(55)
		.setSpA(50)
		.setSpD(55);

modifyPokemon('miltank')
	.ability()
		.setH('Cud Chew')
	.pokemon.baseStat()
		.setAtk(90)
		.setSpD(85)
	.pokemon.learnset()
		.addMove('Recycle');

modifyPokemon('raikou')
	.changeType('Electric', 'Normal')
	.ability()
		.setH('Radiating Light')
	.pokemon.baseStat()
		.setHp(100)
		.setDef(100)
	.pokemon.learnset()
		.addMove('Fire Fang')
		.addMove('Ice Fang')
		.addMove('Play Rough')
		.addMove('Hyper Voice');

modifyPokemon('entei')
	.changeType('Fire', 'Ground')
	.ability()
		.setH('Mighty Fire')
	.pokemon.baseStat()
		.setHp(110)
		.setAtk(100)
		.setSpA(100)
		.setSpD(80)
		.setSpe(105)
	.pokemon.learnset()
		.addMove('Earthquake')
		.addMove('Earth Power');

modifyPokemon('suicune')
	.changeType('Water', 'Ice')
	.ability()
		.setH('Silent Water')
	.pokemon.baseStat()
		.setAtk(50)
		.setSpA(100)
		.setSpe(100)
	.pokemon.learnset()
		.addMove('Hyper Voice')
		.addMove('Round')
		.addMove('Echoed Voice')
		.addMove('Thunderbolt');

modifyPokemon('tyranitar')
	.learnset()
		.addMove('Sucker Punch')
		.addMove('Tar Shot');

modifyPokemon('tyranitarmega');

modifyPokemon('celebi')
	.ability()
		.setH('Magic Bounce')
	.pokemon.baseStat()
		.setHp(110)
		.setSpA(110);

modifyPokemon('lugia');

modifyPokemon('hooh');


}