import { ModdedDex } from "./../../../../sim/dex";
export default function Gen6 (dex: ModdedDex) {
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
			delete dex.modData('Learnsets', pokemon.toLowerCase()).learnset[name.toLowerCase().replace(/ +g/, '')];
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
	modifyPokemon('chesnaught')
		.ability()
			.set1('Rough Skin')
			.setH('Dauntless Shield')
		.pokemon.baseStat()
			.setHp(108)
			.setSpA(34)
			.setSpD(95)
		.pokemon.learnset()
			.addMove('Behemoth Bash')
			.addMove('Rapid Spin')
			.addMove('Stealth Rock')
			.addMove('Horn Leech');
	modifyPokemon('delphox')
		.ability()
			.setH('Magic Guard')
		.pokemon.baseStat()
			.setAtk(49)
			.setSpD(110)
			.setSpe(114)
		.pokemon.learnset()
			.addMove('Magic Powder')
			.addMove('Moonblast');
	modifyPokemon('greninja');
	modifyPokemon('Diggersby')
		.ability()
			.set0('Iron Fist')
		.pokemon.baseStat()
			.setHp(90)
			.setDef(87)
			.setSpA(30)
			.setSpD(87)
			.setSpe(83)
		.pokemon.learnset()
			.addMove('Belly Drum')
			.addMove('Poison Jab')
			.addMove('Shadow Punch');
	modifyPokemon('talonflame')
		.ability()
			.set1('Libero')
		.pokemon.baseStat()
			.setHp(88)
			.setAtk(96)
			.setDef(76)
			.setSpA(79)
			.setSpD(74)
		.pokemon.learnset()
			.addMove('Wild Charge');
	modifyPokemon('vivillon')
		.ability()
			.setH('Serene Grace')
		.pokemon.baseStat()
			.setHp(90)
			.setDef(65)
			.setSpA(95)
			.setSpD(65)
			.setSpe(94)
		.pokemon.learnset()
			.addMove('Dazzling Gleam');
	modifyPokemon('pyroar')
		.ability()
			.set0('Solar Power')
			.setH('Adaptability')
		.pokemon.baseStat()
			.setAtk(93)
		.pokemon.learnset()
			.addMove('Night Slash')
			.addMove('Lunge')
			.addMove('Burn Up');
	modifyPokemon('florges')
		.changeType('Fairy', 'Grass')
		.ability()
			.setH('Grassy Surge')
		.pokemon.baseStat()
			.setHp(83)
			.setAtk(88)
			.setDef(88)
		.pokemon.learnset()
			.addMove('Draining Kiss')
			.addMove('Pollen Puff');
	modifyPokemon('gogoat')
		.changeType('Grass', 'Ground')
		.baseStat()
			.setAtk(115)
			.setDef(82)
			.setSpe(78)
		.pokemon.learnset()
			.addMove('Close Combat')
			.addMove('High Jump Kick')
			.addMove('Accelerock')
			.addMove('Drill Run')
			.addMove('Stone Edge');
	modifyPokemon('pangoro')
		.baseStat()
			.setAtk(124)
			.setDef(88)
			.setSpD(81)
			.setSpe(68)
		.pokemon.learnset()
			.addMove('Wicked Blow')
			.addMove('Sucker Punch');
	modifyPokemon('furfrou')
		.ability()
			.set1('Inner Focus')
			.setH('Guard Dog')
		.pokemon.baseStat()
			.setHp(95)
			.setAtk(85)
			.setDef(80)
		.pokemon.learnset()
			.addMove('Play Rough')
			.addMove('Rapid Spin')
			.addMove('Body Slam')
			.addMove('Body Press');
	modifyPokemon('meowsticf')
		.baseStat()
			.setDef(66)
			.setSpA(113)
			.setSpD(61)
			.setSpe(114)
		.pokemon.learnset()
			.addMove('Ice Beam');
	modifyPokemon('meowstic')
		.baseStat()
			.setHp(94)
			.setDef(94)
			.setSpA(65)
			.setSpD(96)
		.pokemon.learnset()
			.addMove('Ice Beam');
	modifyPokemon('doublade')
		.ability()
			.set1('Cursed Body')
			.setH('Levitate');
	modifyPokemon('aegislash')
		.learnset()
			.addMove('Behemoth Bash')
			.addMove('Behemoth Blade')
	modifyPokemon('aromatisse')
		.ability()
			.set0('Pastel Veil')
			.setH('Fluffy')
		.pokemon.baseStat()
			.setHp(111)
			.setDef(82)
			.setSpA(109);
	modifyPokemon('slurpuff')
		.ability()
			.set1('Gooey')
		.pokemon.baseStat()
			.setHp(92)
			.setAtk(90);
	modifyPokemon('malamar')
		.ability()
			.set1('Compound Eyes')
		.pokemon.baseStat()
			.setHp(96)
			.setAtk(97)
			.setSpe(83)
		.pokemon.learnset()
			.addMove('Glare')
			.addMove('Sucker Punch');
	modifyPokemon('barbaracle')
		.changeType('Fighting', 'Rock')
		.baseStat()
			.setAtk(125)
		.pokemon.learnset()
			.addMove('Drain Punch');
	modifyPokemon('dragalge')
		.changeType('Water', 'Poison')
		.ability()
			.set1("Dragon's Maw")
		.pokemon.baseStat()
			.setSpA(102)
		.pokemon.learnset()
			.addMove('Ice Beam')
			.addMove('Snipe Shot');
	modifyPokemon('clawitzer')
		.ability()
			.set1('Sniper')
		.pokemon.baseStat()
			.setHp(81)
			.setSpe(69)
		.pokemon.learnset()
			.addMove('Snipe Shot')
			.addMove('Origin Pulse');
	modifyPokemon('heliolisk')
		.changeType('Ground', 'Electric')
		.learnset()
			.addMove('Scorching Sands');
	modifyPokemon('tyrantrum')
		.ability()
			.set1('Sheer Force')
		.pokemon.baseStat()
			.setHp(87)
			.setAtk(126)
			.setDef(129)
			.setSpD(69)
		.pokemon.learnset()
			.addMove('Dragon Hammer');
	modifyPokemon('aurorus')
		.changeType('Ice', 'Dragon')
		.ability()
			.set1('Ice Scales')
		.pokemon.baseStat()
			.setDef(72)
			.setSpD(92)
		.pokemon.learnset()
			.addMove('Scale Shot')
			// .addMove('Clanging Scales')
			.addMove('Dragon Pulse')
			.addMove('Dragon Energy')
			.addMove('Draco Meteor');
	modifyPokemon('sylveon')
		.baseStat()
			.setDef(75)
			.setSpD(120)
			.setSpe(75)
		.pokemon.learnset()
			.addMove('Thunderbolt')
			.addMove('Ice Beam')
			.addMove('Energy Ball')
			.addMove('Dark Pulse')
			.addMove('Psychic')
			.addMove('Flamethrower')
			.addMove('Surf');
	modifyPokemon('hawlucha')
		.baseStat()
			.setSpe(100);
	modifyPokemon('dedenne')
		.ability()
			.set1('Static')
			.setH('Lightning Rod')
		.pokemon.baseStat()
			.setHp(77)
			.setAtk(63)
			.setDef(77)
			.setSpA(91)
			.setSpD(77)
		.pokemon.learnset()
			.addMove('Misty Explosion')
			.addMove('Belch')
			.addMove('Moonblast')
			.addMove('Sparkly Swirl')
			.addMove('Recycle')
			.addMove('Snuggle');
	modifyPokemon('carbink')
		.baseStat()
			.setHp(75)
			.setAtk(60)
			.setSpA(60)
		.pokemon.learnset()
			.addMove('Recover');
	modifyPokemon('goodra')
		.changeType('Dragon', 'Poison')
		.ability()
			.set0('Gooey')
			.set1('Corrosion')
			.setH('Multiscale')
		.pokemon.baseStat()
			.setAtk(105)
			.setDef(90)
			.setSpA(105)
			.setSpD(130)
			.setSpe(80)
		.pokemon.learnset()
			// .addMove('Recover')
			.addMove('Scald')
			// .addMove('Calm Mind')
			.addMove('Toxic Spikes')
			.addMove('Baneful Bunker')
			.addMove('Coil')
			.addMove('Dragon Hammer')
			.addMove('Gunk Shot');
	modifyPokemon('goodrahisui')
		.ability()
			.set0('Water Absorb')
			.set1('Gooey')
			.setH('Mirror Armor')
		.pokemon.learnset()
			.addMove('Shell Smash')
			.addMove('Draco Hammer')
			.addMove('Scald');
	modifyPokemon('klefki')
		.learnset()
			.addMove('Stealth Rock');
	modifyPokemon('Trevenant')
		.ability()
			.set1('Cursed Body')
		.pokemon.baseStat()
			.setHp(100)
			.setAtk(120)
			.setDef(96)
			.setSpA(55)
			.setSpD(95)
			.setSpe(51)
		.pokemon.learnset()
			.addMove('Synthesis');
	modifyPokemon('gourgeist')
		.ability()
			.set0('Flash Fire')
			.set1('Cursed Body')
			.setH('Perish Body')
		.pokemon.baseStat()
			.setHp(90)
			.setAtk(55)
			.setDef(92)
			.setSpA(108)
			.setSpD(95)
			.setSpe(54);
	modifyPokemon('avalugg')
		.ability()
			.set0('Oblivious')
		.pokemon.learnset()
			.addMove('Glacial Lance')
			.addMove('Mountain Gale');
	modifyPokemon('avalugghisui')
		.ability()
			.set1('Solid Rock')
		.pokemon.learnset()
			.addMove('Glacial Lance');
	modifyPokemon('noivern')
		.ability()
			.set0('Scrappy')
			.setH('Aerilate')
		.pokemon.baseStat()
			.setSpA(107);
	modifyPokemon('xerneas');
	modifyPokemon('yveltal');
	modifyPokemon('diancie')
		.ability()
			.setH('Solid Rock');
	modifyPokemon('dianciemega');
	modifyPokemon('hoopa')
		.ability()
			.setH('Prankster')
		.pokemon.baseStat()
			.setAtk(100)
			.setSpe(80);
	modifyPokemon('hoopaunbound')
		.ability()
			.setH('Prankster')
		.pokemon.baseStat()
			.setSpA(160)
			.setSpe(90);
	modifyPokemon('volcanion')
		.ability()
			.setH('Steam Engine')
		.pokemon.baseStat()
			.setAtk(90)
			.setSpD(100)
			.setSpe(80)
		.pokemon.learnset()
			.addMove('Misty Explosion')
			.addMove('Eruption')
			.addMove('Water Spout');
}