import { ModdedDex } from "./../../../../sim/dex";
export default function Gen8 (dex: ModdedDex) {
	let modifyPokemon = (pokemon: string) => {
		console.log(dex.modData('FormatsData', pokemon.toLowerCase()).tier);
		if(dex.modData('FormatsData', pokemon.toLowerCase()).tier !== undefined && dex.modData('FormatsData', pokemon.toLowerCase()).tier === "Illegal") {
			dex.modData('FormatsData', pokemon.toLowerCase()).tier = "OU";
		}	
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
	modifyPokemon('rillaboom')
		.learnset()
			.addMove('Jungle Healing')
			.addMove('Grav Apple');
	modifyPokemon('cinderace');
	modifyPokemon('inteleon')
		.ability()
			.set1('Quick Draw')
		.pokemon.baseStat()
			.setAtk(80)
			.setDef(75)
			.setSpA(120)
			.setSpD(75)
		.pokemon.learnset()
			.addMove('Nasty Plot')
			.addMove('Flip Turn');
	modifyPokemon('greedent')
		.ability()
			.set1('Harvest')
		.pokemon.baseStat()
			.setDef(90)
			.setSpA(45)
			.setSpD(85)
			.setSpe(25)
		.pokemon.learnset()
			.addMove('Recycle')
			.addMove('Heat Crash')
			.addMove('Toxic')
			.addMove('Hyper Fang');
	modifyPokemon('corviknight')
		.baseStat()
			.setHp(102);
	modifyPokemon('orbeetle')
		.ability()
			.setH('Levitate')
		.pokemon.learnset()
			.addMove('Teleport')
			.addMove('Toxic')
			.addMove('Cosmic Power')
			.addMove('Freezing Glare');
	modifyPokemon('thievul')
		.ability()
			.set0('Emergency Exit')
		.pokemon.baseStat()
			.setDef(68)
			.setSpA(97)
			.setSpe(110)
		.pokemon.learnset()
			.addMove('Mystical Fire')
			.addMove('Snatch')
			.addMove('Switcheroo');
	modifyPokemon('eldegoss')
		.baseStat()
			.setHp(73)
			.setSpA(88)
		.pokemon.learnset()
			.addMove('Feather Dance')
			.addMove('Tailwind')
			.addMove('Air Slash')
			.addMove('Hurricane');
	modifyPokemon('dubwool')
		.ability()
			.set1('Cotton Down')
		.pokemon.baseStat()
			.setHp(82)
		.pokemon.learnset()
			.addMove('Head Smash')
			.addMove('Head Charge')
			.addMove('Iron Head')
			.addMove('Milk Drink')
			.addMove('False Surrender')
			.addMove('Knock Off')
			.addMove('Lash Out')
			.addMove('Superpower')
			.addMove('Stomping Tantrum')
			.addMove('High Horsepower')
			.addMove('Bulldoze');
	modifyPokemon('drednaw')
		.ability()
			.set1('Anger Shell')
		.pokemon.baseStat()
			.setSpD(73)
		.pokemon.learnset()
			.addMove('Aqua Jet')
			.addMove('Flip Turn')
			.addMove('Brick Break')
			.addMove('Wave Crash');
	modifyPokemon('boltund')
		.ability()
			.set1('Teravolt')
			.setH('Static')
		.pokemon.baseStat()
			.setAtk(100)
			.setSpA(80)
		.pokemon.learnset()
			.addMove('Zippy Zap')
			.addMove('Aura Wheel')
			.addMove('Bolt Strike')
			.addMove('Volt Tackle')
			.addMove('Jaw Lock')
			.addMove('Foul Play')
			.addMove('Pursuit');
	modifyPokemon('coalossal')
		.baseStat()
			.setHp(120)
			.setSpe(25)
		.pokemon.learnset()
			.addMove('Flash Cannon')
			.addMove('Power Gem');
	modifyPokemon('flapple')
		.ability()
			.set1('Harvest')
			.setH('Bug Out')
		.pokemon.baseStat()
			.setSpA(100)
			.setSpD(70)
		.pokemon.learnset()
			.addMove('Scale Shot')
			.addMove('Apple Acid')
			.addMove('Lunge')
			.addMove('Leech Life');
	modifyPokemon('appletun')
		.ability()
			.set1('Well-Baked Body')
		.pokemon.baseStat()
			.setDef(95)
			.setSpA(110)
			.setSpD(90)
		.pokemon.learnset()
			.addMove('Grav Apple');
	modifyPokemon('sandaconda')
		.ability()
			.setH('Intimidate')
		.pokemon.baseStat()
			.setHp(82)
			.setDef(128)
		.pokemon.learnset()
			.addMove('Double Edge')
			.addMove('Toxic')
			.addMove('Body Slam')
			.addMove('Poison Fang');
	modifyPokemon('cramorant')
		.ability()
			.set1('Water Absorb')
			.setH('Fish Buffet')
		.pokemon.baseStat()
			.setHp(80)
			.setAtk(100)
			.setDef(70)
			.setSpA(100)
			.setSpe(100)
		.pokemon.learnset()
			.addMove('Waterfall')
			.addMove('Tailwind')
			.addMove('Chilling Water')
			.addMove('Flip Turn')
			.addMove('Triple Dive')
			.addMove('Whirlwind');
	modifyPokemon('barraskewda')
		.learnset()
			.addMove('Aqua Tail')
			.addMove('Fillet Away');
	modifyPokemon('toxtricity')
		.ability()
			.set1('Volt Absorb')
		.pokemon.baseStat()
			.setSpe(90)
		.pokemon.learnset()
			.addMove('Nasty Plot')
			.addMove('Dark Pulse')
			.addMove('Knock Off')
			.addMove('Pursuit');
	modifyPokemon('toxtricitylowkey')
		.ability()
			.set1('Volt Absorb')
		.pokemon.baseStat()
			.setAtk(114)
			.setSpA(98)
			.setSpe(90)
		.pokemon.learnset()
			.addMove('Knock Off')
			.addMove('Shift Gear')
			.addMove('Nasty Plot')
			.addMove('Dark Pulse')
			.addMove('Pursuit');
	modifyPokemon('centiskorch')
		.ability()
			.setH('Adaptability')
		.pokemon.baseStat()
			.setDef(75)
			.setSpe(75)
		.pokemon.learnset()
			.addMove('Pounce')
			.addMove('Twineedle');
	modifyPokemon('grapploct')
		.changeType('Water', 'Fighting')
		.baseStat()
			.setSpe(47)
		.pokemon.learnset()
			.addMove('Arm Thrust')
			.addMove('Low Sweep')
			.addMove('Mach Punch')
			.addMove('Flip Turn')
			.addMove('Jet Punch');
	modifyPokemon('polteageist')
		.learnset()
			.addMove('Toxic');
	modifyPokemon('hatterene')
		.ability()
			.set1('Magician')
		.pokemon.baseStat()
			.setHp(87)
			.setAtk(110)
			.setDef(100)
			.setSpA(146)
			.setSpD(108)
			.setSpe(49)
		.pokemon.learnset()
			.addMove('Teleport')
			.addMove('Toxic')
			.addMove('Moonblast')
			.addMove('Eerie Spell');
	modifyPokemon('grimmsnarl')
		.baseStat()
			.setDef(85)
			.setSpD(95)
		.pokemon.learnset()
			.addMove('Power Up Punch')
			.addMove('Toxic');
	modifyPokemon('perrserker')
		.changeType('Steel', 'Dark')
		.baseStat()
			.setHp(75)
			.setSpA(42)
			.setSpD(67)
			.setSpe(46)
		.pokemon.learnset()
			.addMove('Meteor Mash');
	modifyPokemon('Runerigus')
		.ability()
			.set1('Perish Body')
			.setH('Shadow Shield')
		.pokemon.baseStat()
			.setHp(68)
			.setSpA(45)
			.setSpD(110)
			.setSpe(20);
	modifyPokemon('alcremie')
		.ability()
			.set0('Triage')
			.setH('Fairy Aura')
		.pokemon.baseStat()
			.setAtk(55)
			.setSpA(100)
		.pokemon.learnset()
			.addMove('Moonblast')
			.addMove('Toxic');
	modifyPokemon('falinks')
		.changeType('Bug', 'Fighting')
		.ability()
			.set0('Defiant')
			.setH('Battle Pride')
		.pokemon.baseStat()
			.setAtk(85)
			.setDef(80)
			.setSpA(55)
			.setSpD(70)
			.setSpe(70)
		.pokemon.learnset()
			.addMove('Toxic')
			.addMove('Behemoth Bash')
			.addMove('Thousand Arrows')
			.addMove('False Surrender')
			.addMove('Foul Play')
			.addMove("Kings Shield");
	modifyPokemon('pincurchin')
		.changeType('Electric', ' Water')
		.baseStat()
			.setHp(68)
			.setAtk(81)
		.pokemon.learnset()
			.addMove('Zippy Zap')
			.addMove('Bouncy Bubble')
			.addMove('Volt Switch')
			.addMove('Toxic')
			.addMove('Parabolic Charge');
	modifyPokemon('frosmoth')
		.baseStat()
			.setDef(75)
		.pokemon.learnset()
			.addMove('Freeze Dry')
			.addMove('Energy Ball');
	modifyPokemon('stonjourner')
		.ability()
			.set1('Sturdy')
			.setH('Sand Spit')
		.pokemon.baseStat()
			.setSpD(50)
			.setSpe(80)
		.pokemon.learnset()
			.addMove('Toxic')
			.addMove('Drill Run')
			.addMove('Head Smash')
			.addMove('High Horsepower')
			.addMove('Zen Headbutt');
	modifyPokemon('eiscue')
		.changeType('Ice', 'Water')
		.baseStat()
			.setAtk(95)
			.setSpA(45)
		.pokemon.learnset()
			.addMove('Ice Shard')
			.addMove('Toxic')
			.addMove('Drill Peck')
			.addMove('Iron Head')
			.addMove('Triple Axel')
			.addMove('Roost')
			.addMove('Play Rough');
	modifyPokemon('eiscuenoice')
		.changeType('Ice', 'Water')
		.baseStat()
			.setAtk(95)
			.setSpA(45);
	modifyPokemon('indeedee')
		.learnset()
			.addMove('Teleport');
	modifyPokemon('indeedeef')
		.learnset()
			.addMove('Teleport');
	modifyPokemon('morpeko')
		.baseStat()
			.setAtk(115)
		.pokemon.learnset()
			.addMove('Zippy Zap');
	modifyPokemon('copperajah')
		.ability()
			.set1('Full Metal Body')
		.pokemon.baseStat()
			.setDef(79)
			.setSpD(79)
		.pokemon.learnset()
			.addMove('Double Iron Bash')
			.addMove('Flamethrower')
			.addMove('Fire Blast')
			.addMove('Focus Blast');
	modifyPokemon('dracozolt');
	modifyPokemon('arctozolt')
		.baseStat()
			.setSpe(65);
	modifyPokemon('dracovish');
	modifyPokemon('arctovish')
		.baseStat()
			.setSpe(65)
		.pokemon.learnset()
			.addMove('Flip Turn');
	modifyPokemon('duraludon')
		.ability()
			.set0('Lightning Rod')
			.setH('Full Metal Body')
		.pokemon.baseStat()
			.setSpD(65)
		.pokemon.learnset()
			.addMove('Flamethrower')
			.addMove('Armor Cannon')
			.addMove('Fire Blast');
	modifyPokemon('dragapult')
		.learnset()
			.addMove('Aqua Tail')
			.addMove('Toxic');
	modifyPokemon('zacian');
	modifyPokemon('zaciancrowned');
	modifyPokemon('zamazenta')
	modifyPokemon('zamazentacrowned');
	modifyPokemon('urshifu')
		.baseStat()
			.setSpD(65);
	modifyPokemon('urshifurapidstrike')
		.baseStat()
			.setSpD(65)
		.pokemon.learnset()
			.addMove('Jet Punch');
	modifyPokemon('zarude')
		.ability()
			.set1('Defiant')
		.pokemon.learnset()
			.addMove('Sucker Punch')
			.addMove('Pursuit')
			.addMove('Knock Off');
	modifyPokemon('regieleki')
		.baseStat()
			.setHp(95);
	modifyPokemon('regidrago')
		.learnset()
			.addMove('Core Enforcer')
			.addMove('Flamethrower');
	modifyPokemon('glastrier')
		.learnset()
			.addMove('Ice Hammer');
	modifyPokemon('spectrier')
		.learnset()
			.addMove('Extrasensory')
			.addMove('Psychic');
	modifyPokemon('calyrex')
		.baseStat()
			.setAtk(95)
			.setDef(95)
			.setSpA(105)
			.setSpD(95)
			.setSpe(85);
	modifyPokemon('calyrexice');
	modifyPokemon('calyrexshadow');
	modifyPokemon('kleavor')
		.learnset()
			.addMove('Accelrock')
			.addMove('Ceaseless Edge');
	modifyPokemon('Sneasler')
		.ability()
			.set0('Merciless')
		.pokemon.learnset()
			.addMove('Drain Punch')
			.addMove('Superpower')
			.addMove('Thunder Punch')
			.addMove('Darkest Lariat')
			.addMove('Cross Poison')
			.removeMove('Shadow Ball');
	modifyPokemon('enamorus')
		.baseStat()
			.setSpA(125)
		.pokemon.learnset()
			.addMove('Brick Break')
			.addMove('Bulk Up')
			.addMove('Crunch')
			.addMove('Defog')
			.addMove('Hammer Arm')
			.addMove('Psyshock')
			.addMove('Sludge Bomb')
			.addMove('Sludge Wave')
			.addMove('Toxic')
			.addMove('U Turn')
			.addMove('Weather Ball');
	modifyPokemon('enamorustherian')
		.ability()
			.setH('Misty Surge');
}