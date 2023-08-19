import { ModdedDex } from "./../../../../sim/dex";
export default function Gen9 (dex: ModdedDex) {
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

		let addMove = (name: string, gen: number = 9) => {
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
	modifyPokemon('meowscarada')
		.ability()
			.set1('Magician')
		.pokemon.learnset()
			.addMove('Grassy Glide')
			.addMove('Triple Axel');
	modifyPokemon('Skeledirge')
		.ability()
			.set1('Punk Rock')
		.pokemon.learnset()
			.addMove('Dragon Pulse');
	modifyPokemon('quaquaval')
		.ability()
			.set1('Dancer')
		.pokemon.learnset()
			.addMove('Victory Dance');
	modifyPokemon('oinkologne')
		.ability()
			.set0('Pig Out')
		.pokemon.baseStat()
			.setHp(115)
			.setAtk(90)
			.setDef(95)
			.setSpD(75)
			.setSpe(75)
		.pokemon.learnset()
			.addMove('Frustration')
			.addMove('Return')
			.addMove('Retaliate')
			.addMove('Earthquake');
	modifyPokemon('oinkolognef')
		.ability()
			.set0('Pig Out')
		.pokemon.baseStat()
			.setDef(75)
			.setSpD(95)
			.setSpe(75)
		.pokemon.learnset()
			.addMove('Frustration')
			.addMove('Return')
			.addMove('Retaliate')
			.addMove('Earthquake');
	modifyPokemon('spidops')
		.ability()
			.set1('Shed Skin')
		.pokemon.baseStat()
			.setHp(70)
			.setDef(97)
			.setSpD(91)
		.pokemon.learnset()
			.addMove('Spider Web');
	modifyPokemon('lokix')
		.ability()
			.set1('Leg Day')
		.pokemon.baseStat()
			.setSpD(60)
			.setSpe(97)
		.pokemon.learnset()
			.addMove('Flying Press')
			.addMove('Close Combat')
			.addMove('Thunderous Kick');
	modifyPokemon('pawmot')
		.baseStat()
			.setAtk(110)
			.setSpe(110)
		.pokemon.learnset()
			.addMove('Volt Tackle')
			.addMove('Plasma Fists');
	modifyPokemon('wooperpaldea');
	modifyPokemon('clodsire')
		.baseStat()
			.setSpA(55);
	modifyPokemon('maushold')
		.learnset()
			.addMove('Hyper Fang')
			.addMove('Teeter Dance')
			.addMove('Stuff Cheeks');
	modifyPokemon('mausholdfour')
		.learnset()
			.addMove('Hyper Fang')
			.addMove('Teeter Dance')
			.addMove('Stuff Cheeks');
	modifyPokemon('dachsbun')
		.changeType('Fairy', 'Fire')
		.ability()
			.set1('Flash Fire')
		.pokemon.baseStat()
			.setHp(62)
			.setAtk(85)
			.setDef(120)
			.setSpD(90)
		.pokemon.learnset()
			.addMove('Heal Bell')
			.addMove('Zen Headbutt')
			.addMove('Flare Blitz')
			.addMove('Sizzly Slide');
	modifyPokemon('arboliva')
		.baseStat()
			.setHp(83)
			.setDef(100)
			.setSpD(114)
		.pokemon.learnset()
			.addMove('Draining Kiss');
	// Base Squawkabilly is Squawkabilly-Green
	modifyPokemon('squawkabilly')
		.ability()
			.set1('Sap Sipper')
			.setH('Plunder')
		.pokemon.baseStat()
			.setHp(87)
			.setAtk(101)
			.setDef(56)
			.setSpD(56)
			.setSpe(97)
		.pokemon.learnset()
			.addMove('Dual Wingbeat')
			.addMove('Beak Blast')
			.addMove('Leaf Blade');
	modifyPokemon('squawkabillywhite')
		.ability()
			.set1('Adaptability')
			.setH('Plunder')
		.pokemon.baseStat()
			.setHp(87)
			.setAtk(101)
			.setDef(56)
			.setSpD(56)
			.setSpe(97)
		.pokemon.learnset()
			.addMove('Dual Wingbeat')
			.addMove('Beak Blast')
			.addMove('Head Charge');
	modifyPokemon('squawkabillyyellow')
		.ability()
			.set1('Volt Absorb')
			.setH('Plunder')
		.pokemon.baseStat()
			.setHp(87)
			.setAtk(101)
			.setDef(56)
			.setSpD(56)
			.setSpe(97)
		.pokemon.learnset()
			.addMove('Dual Wingbeat')
			.addMove('Beak Blast')
			.addMove('Wild Charge');
	modifyPokemon('squawkabillyblue')
		.ability()
			.set1('Water Absorb')
			.setH('Plunder')
		.pokemon.baseStat()
			.setHp(87)
			.setAtk(101)
			.setDef(56)
			.setSpD(56)
			.setSpe(97)
		.pokemon.learnset()
			.addMove('Dual Wingbeat')
			.addMove('Beak Blast')
			.addMove('Aqua Cutter');
	modifyPokemon('garganacl')
		.ability()
			.set1('Terraforming')
		.pokemon.learnset()
			.addMove('Steel Roller');
	modifyPokemon('annihilape');
	modifyPokemon('armarouge')
		.ability()
			.set1('Mega Launcher')
		.pokemon.learnset()
			.addMove('Terrain Pulse');
	modifyPokemon('ceruledge')
		.ability()
			.set1('Sharpness')
		.pokemon.learnset()
			.addMove('Sacred Sword');
	modifyPokemon('bellibolt')
		.ability()
			.setH('Neurophysics')
		.pokemon.baseStat()
			.setHp(119)
			.setDef(96)
			.setSpD(88)
		.pokemon.learnset()
			.addMove('Rising Voltage')
			.addMove('Surf');
	modifyPokemon('kilowattrel')
		.baseStat()
			.setSpA(115)
		.pokemon.learnset()
			.addMove('Heat Wave');
	modifyPokemon('dudunsparce')
		.changeType('Normal', 'Ground')
		.ability()
			.set1('Levitate')
			.setH('Super Luck')
		.pokemon.baseStat()
			.setDef(85)
			.setSpD(85)
			.setSpe(65);
	modifyPokemon('farigiraf')
		.baseStat()
			.setAtk(100)
			.setDef(80)
			.setSpA(115)
			.setSpD(85);
	modifyPokemon('mabosstiff')
		.baseStat()
			.setHp(90)
			.setDef(95)
			.setSpD(80);
	modifyPokemon('grafaiai')
		.baseStat()
			.setHp(78)
			.setDef(75)
			.setSpD(82);
	modifyPokemon('taurospaldeacombat')
		.changeType('Fighting', 'Ground')
		.ability()
			.setH('Mold Breaker')
		.pokemon.baseStat()
			.setAtk(120)
			.setDef(115)
			.setSpe(110)
		.pokemon.learnset()
			.addMove('Headlong Rush')
			.addMove('High Horsepower')
			.addMove('Play Rough')
			.addMove('Combat Torque');
	modifyPokemon('taurospaldeablaze')
		.ability()
			.setH('Thermal Exchange')
		.pokemon.baseStat()
			.setAtk(120)
			.setDef(115)
			.setSpe(110)
		.pokemon.learnset()
			.addMove('Headlong Rush')
			.addMove('High Horsepower')
			.addMove('Play Rough')
			.addMove('Blazing Torque');
	modifyPokemon('taurospaldeaaqua')
		.ability()
			.setH('Swift Swim')
		.pokemon.baseStat()
			.setAtk(120)
			.setDef(115)
			.setSpe(110)
		.pokemon.learnset()
			.addMove('Headlong Rush')
			.addMove('High Horsepower')
			.addMove('Play Rough');
	modifyPokemon('brambleghast')
		.ability()
			.set1('Sand Rush')
		.pokemon.baseStat()
			.setDef(77)
			.setSpD(85)
			.setSpe(93)
		.pokemon.learnset()
			.addMove('Poltergeist')
			.addMove('Needle Arm')
			.addMove('Grassy Glide')
			.addMove('Leech Life')
			.addMove('Horn Leech');
	modifyPokemon('toedscruel')
		.ability()
			.set1('Grassy Surge')
			.setH('Poison Heal')
		.pokemon.baseStat()
			.setHp(90)
			.setDef(80)
			.setSpA(85)
		.pokemon.learnset()
			.addMove('Grassy Glide');
	modifyPokemon('klawf')
		.baseStat()
			.setHp(80)
			.setAtk(105)
			.setSpD(70)
		.pokemon.learnset()
			.addMove('Flip Turn');
	modifyPokemon('scovillain')
		.ability()
			.set1('Flash Fire')
			.setH('Solar Power')
		.pokemon.baseStat()
			.setHp(70)
			.setDef(75)
			.setSpD(75);
	modifyPokemon('rabsca')
		.ability()
			.set1('Psychic Surge')
			.setH('Levitate')
		.pokemon.baseStat()
			.setHp(85)
			.setDef(90)
			.setSpA(120)
			.setSpD(110);
	modifyPokemon('espathra');
	modifyPokemon('tinkaton')
		.ability()
			.setH('Hammer Down')
		.pokemon.baseStat()
			.setAtk(85)
			.setDef(82)
		.pokemon.learnset()
			.addMove('Wood Hammer')
			.addMove('Crabhammer')
			.addMove('Tera Hammer');
	modifyPokemon('wugtrio')
		.changeType('Water', 'Rock')
		.ability()
			.set1('Skill Link')
			.setH('Techician')
		.pokemon.learnset()
			.addMove('Rock Blast')
			.addMove('Smack Down')
			.addMove('Rock Slide')
			.addMove('Toxic');
	modifyPokemon('bombirdier')
		.baseStat()
			.setHp(85)
			.setAtk(113)
			.setDef(90)
			.setSpD(90)
		.pokemon.learnset()
			.addMove('Pursuit')
			.addMove('Toxic');
	modifyPokemon('palafin')
	// Can now hold evolite because we made hero forme to be a evo.
	.ability()
		.set0('Swift Swim')
		.set1('Liquid Voice')
		.setH('Emergency Exit')
	.pokemon.baseStat()
		.setAtk(75)
		.setSpA(73)
		.setSpD(72);
	modifyPokemon('palafinhero')
	// Now a evo of palafin
	.ability()
		.set0('Wonder Skin')
		.set1('Water Veil')
		.setH('Emergency Exit')
	.pokemon.baseStat()
		.setAtk(130)
		.setSpA(76)
		.setSpD(97)
	.pokemon.learnset()
		.addMove('Thunder Punch')
		.addMove('Drain Punch');
	modifyPokemon('revavroom')
		.learnset()
			.addMove('U Turn')
			.addMove('Rapid Spin');
	modifyPokemon('cyclizar')
		.learnset()
			.addMove('Nasty Plot');
	modifyPokemon('orthworm')
		.ability()
			.set1('Steelworker')
			.setH('Heatproof')
		.pokemon.baseStat()
			.setHp(80)
			.setSpD(75);
	modifyPokemon('glimmora')
		.ability()
			.set1('Filter')
		.pokemon.learnset()
			.addMove('Rapid Spin');
	modifyPokemon('houndstone')
		.ability()
			.set1('Guard Dog')
		.pokemon.baseStat()
			.setHp(82);
		// Removes last respects
	modifyPokemon('flamigo')
		.ability()
			.set1('Defiant')
			.setH('Anger Point')
		.pokemon.baseStat()
			.setHp(92)
			.setSpD(74)
			.setSpe(95)
		.pokemon.learnset()
			.addMove('Blaze Kick');
	modifyPokemon('cetitan')
		.learnset()
			.addMove('Stealth Rock')
			.addMove('Toxic');
	modifyPokemon('kingambit')
		.baseStat()
			.setHp(80)
			.setAtk(130)
			.setDef(110);
	modifyPokemon('veluza')
		.baseStat()
			.setHp(95)
			.setSpe(105)
		.pokemon.learnset()
			.addMove('Flip Turn');
	modifyPokemon('dondozo');
	// We are combining the formes together.
	modifyPokemon('tatsugiri')
		.baseStat()
			.setHp(78)
			.setDef(75)
		.pokemon.learnset()
			.addMove('Sushi Typhoon');
	modifyPokemon('greattusk')
		.ability()
			.setH('Immunity');
	modifyPokemon('screamtail')
		.ability()
			.setH('Natural Cure')
		.pokemon.baseStat()
			.setAtk(60)
			.setSpA(70)
		.pokemon.learnset()
			.addMove('Moonblast')
			.addMove('Future Sight')
			.addMove('Heal Bell');
	modifyPokemon('brutebonnet')
		.ability()
			.setH('Regenerator')
		.pokemon.baseStat()
			.setHp(116)
			.setDef(94)
			.setSpD(94)
			.setSpe(60)
		.pokemon.learnset()
			.addMove('Knock Off')
			.addMove('Earthquake')
			.addMove('Grassy Glide')
			.addMove('Pursuit');
	modifyPokemon('fluttermane')
		.ability()
			.setH('Cursed Body')
		.pokemon.baseStat()
			.setHp(85)
			.setAtk(85)
			.setDef(85)
			.setSpA(105)
			.setSpD(105)
			.setSpe(105);
	modifyPokemon('slitherwing')
		.ability()
			.setH('Inner Solstice')
		.pokemon.baseStat()
			.setDef(84)
			.setSpA(75)
			.setSpe(86)
		.pokemon.learnset()
			.addMove('Drain Punch')
			.addMove('Pounce')
			.addMove('Skitter Smack');
	modifyPokemon('sandyshocks')
		.ability()
			.setH('Magnet Pull');
	modifyPokemon('irontreads')
		.ability()
			.setH('Weak Armor');
	modifyPokemon('ironbundle')
		.ability()
			.setH('Volt Absorb')
		.pokemon.baseStat()
			.setHp(76)
			.setSpA(104)
			.setSpD(80)
			.setSpe(116);
	modifyPokemon('ironhands')
		.ability()
			.setH('Iron Fist')
		.pokemon.learnset()
			.addMove('Plasma Fists');
	modifyPokemon('ironjugulis')
		.ability()
			.setH('Dragons Maw')
		.pokemon.learnset()
			.addMove('Nasty Plot')
			.addMove('Aeroblast');
	modifyPokemon('ironmoth')
		.ability()
			.setH('Flame Body');
	modifyPokemon('ironthorns')
		.ability()
			.setH('Prism Armor')
		.pokemon.baseStat()
			.setSpD(94)
		.pokemon.learnset()
			.addMove('Accelerock')
			.addMove('Bolt Strike');
	modifyPokemon('baxcalibur');
	modifyPokemon('gholdengo');
	modifyPokemon('wochien');
	modifyPokemon('chienpao')
		.baseStat()
			.setAtk(105)
			.setSpe(120);
	modifyPokemon('tinglu');
	modifyPokemon('chiyu')
		.baseStat()
			.setSpA(110)
			.setSpD(115);
	modifyPokemon('roaringmoon')
		.ability()
			.setH('Levitate')
		.pokemon.baseStat()
			.setAtk(129)
			.setSpe(109);
	modifyPokemon('ironvaliant')
		.ability()
			.setH('Trace')
		.pokemon.baseStat()
			.setAtk(120)
			.setSpe(106);
	modifyPokemon('koraidon');
	modifyPokemon('miraidon');
	modifyPokemon('walkingwake')
		.ability()
			.setH('Storm Drain')
		.pokemon.baseStat()
			.setHp(89)
			.setSpA(115);
	modifyPokemon('ironleaves')
		.ability()
			.setH('Sharpness')
		.pokemon.baseStat()
			.setAtk(120)
			.setSpD(98);
}