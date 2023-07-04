import { ModdedDex } from "./../../../../sim/dex";
export default function Gen3 (dex: ModdedDex) {
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

modifyPokemon('sceptile')
	.changeType('Grass', 'Dragon')
	.baseStat()
		.setAtk(95)
		.setSpA(85)
	.pokemon.learnset()
		.addMove('Trailblaze', 9)
		.addMove('Power Whip');

modifyPokemon('sceptilemega')
	.ability()
		.set0('Technician')
	.pokemon.baseStat()
		.setAtk(125)
		.setSpA(110);

modifyPokemon('blaziken')
	.ability()
		.setH('No Guard')
	.pokemon.learnset()
		.addMove('Blazing Torque', 9);

modifyPokemon('blazikenmega')
	.ability()
		.set0('Leg Day')
	.pokemon.baseStat()
		.setAtk(145)
		.setSpe(90);

modifyPokemon('swampert')
	.ability()
		.set1('Dry Skin')
	.pokemon.learnset()
		.addMove('Chilling Water', 9)
		.addMove('Triple Dive', 9);

modifyPokemon('swampertmega');

modifyPokemon('mightyena')
	.ability()
		.set1('Strong Jaw')
	.pokemon.baseStat()
		.setAtk(98)
		.setDef(75)
		.setSpD(65)
		.setSpe(85)
	.pokemon.learnset()
		.addMove('Jaw Lock')
		.addMove('Psychic Fangs')
		.addMove('Knock Off')
		.addMove('Lash Out')
		.addMove('Pursuit')
		.addMove('Crush Claw');

modifyPokemon('linoone')
	.ability()
		.set0('Quick Feet')
		.setH('Technician')
	.pokemon.baseStat()
		.setAtk(75)
	.pokemon.learnset()
		.addMove('Bullet Seed');

modifyPokemon('linoonegalar')
	.baseStat()
		.setAtk(80);

modifyPokemon('obstagoon')
	.learnset()
		.addMove('Pursuit')
		.addMove('Sucker Punch')
		.addMove('Toxic');

modifyPokemon('beautifly')
	.changeType('Bug', 'Fairy')
	.ability()
		.set0('Compound Eyes')
		.setH('Serene Grace')
	.pokemon.baseStat()
		.setDef(65)
		.setSpD(65)
		.setSpe(82)
	.pokemon.learnset()
		.addMove('Air Slash')
		.addMove('Spore')
		.addMove('Moonblast')
		.addMove('Draining Kiss')
		.addMove('Hurricane');

modifyPokemon('dustox')
	.changeType('Bug', 'Electric')
	.ability()
		.set1('Compund Eyes')
		.setH('Phototaxis')
	.pokemon.baseStat()
		.setHp(90)
		.setAtk(60)
		.setDef(85)
		.setSpA(60)
		.setSpD(100)
	.pokemon.learnset()
		.addMove('Spore')
		.addMove('Volt Switch')
		.addMove('Parabolic Charge')
		.addMove('Lunge')
		.addMove('Leech Life')
		.addMove('Defend Order')
		.addMove('Skitter Smack')
		.addMove('Hurricane');

modifyPokemon('ludicolo')
	.ability()
		.setH('Dancer')
	.pokemon.learnset()
		.addMove('Quiver Dance')
		.addMove('Teeter Dance');

modifyPokemon('shiftry')
	.baseStat()
		.setAtk(110)
		.setSpA(100)
	.pokemon.learnset()
		.addMove('Parting Shot');

modifyPokemon('swellow')
	.ability()
		.set1('Scrappy')
		.setH('Aerilate')
	.pokemon.baseStat()
		.setHp(65)
		.setSpA(85)
		.setSpD(60)
	.pokemon.learnset()
		.addMove('Dual Wingbeat')
		.addMove('Bleakwind Storm')
		.addMove('Tidy Up')
		.addMove('Tera Blast', 9)
		.addMove('Extreme Speed');
	
modifyPokemon('pelipper')
	.learnset()
		.addMove('Flip Turn');

modifyPokemon('gardevoir')
	.baseStat()
		.setDef(70)
	.pokemon.learnset()
		.addMove('Recover');

modifyPokemon('gardevoirmega')
	.baseStat()
		.setDef(70)
	.pokemon.learnset();
		// Gardevoir gets the following:
		// Recover
		// Gardevoir-Mega will gain these through
		// Inheritance

modifyPokemon('masquerain')
	.changeType('Bug', 'Water')
	.baseStat()
		.setHp(80)
		.setDef(72)
		.setSpe(85)
	.pokemon.learnset()
		.addMove('Flip Turn')
		.addMove('Muddy Water')
		.addMove('Psychic');

modifyPokemon('breloom')
	.baseStat()
		.setHp(65)
		.setAtk(120)
		.setSpA(50)
		.setSpD(65)
	.pokemon.learnset()
		.addMove('Grassy Glide')
		.addMove('Power Whip')
		.addMove('Trailblaze');

modifyPokemon('slaking')
	.baseStat()
		.setHp(140)
		.setAtk(150)
		.setSpA(75)
		.setSpD(70)
		.setSpe(95)
	.pokemon.learnset()
		.addMove('Knock Off');

modifyPokemon('ninjask')
	.baseStat()
		.setHp(71)
		.setDef(50)
	.pokemon.learnset()
		.addMove('First Impression')
		.addMove('Drill Run')
		.addMove('Lunge')
		.addMove('Fell Stinger')
		.addMove('Pounce')
		.addMove('Infestation');

modifyPokemon('shedinja')
	.learnset()
		.addMove('Fly');

modifyPokemon('exploud')
	.ability()
		.set1('Punk Rock')
	.pokemon.baseStat()
		.setAtk(71)
		.setSpe(73)
	.pokemon.learnset()
	.addMove('Overdrive');

modifyPokemon('hariyama')
	.baseStat()
		.setAtk(130)
		.setDef(75)
		.setSpD(98)
	.pokemon.learnset()
		.addMove('High Horsepower');

modifyPokemon('probopass')
	.ability()
		.setH('Levitate')
	.pokemon.baseStat()
		.setHp(65)
		.setAtk(45)
		.setSpA(70)
	.pokemon.learnset()
		.addMove('Rising Voltage');
	
modifyPokemon('delcatty')
	.changeType('Normal', 'Fairy')
	.ability()
		.setH('Versatility')
		.set1('Pixilate')
		.set0('Wonder Skin')
	.pokemon.baseStat()
		.setHp(75)
		.setAtk(65)
		.setSpA(65)
		.setSpD(60)
		.setSpe(95)
	.pokemon.learnset()
		.addMove('Moonblast')
		.addMove('Dazzling Gleam')
		.addMove('Extreme Speed')
		.addMove('Moonlight')
		.addMove('Morning Sun')
		.addMove('Iron Head')
		.addMove('Draining Kiss')
		.addMove('Flamethrower');

modifyPokemon('sableye')
	.learnset()
		.addMove('Baddy Bad')
		.addMove('Night Daze')
		.addMove('Night Slash');

modifyPokemon('sableyemega')
	.baseStat()
		.setSpe(30);

modifyPokemon('mawile')
	.ability()
		.set0('Strong Jaw')
	.pokemon.baseStat()
		.setSpD(85)
		.setSpe(60)
	.pokemon.learnset()
		.addMove('Hyper Fang')
		.addMove('Jaw Lock');

modifyPokemon('mawilemega')
	.baseStat()
		.setSpD(105)
		.setSpe(60);

modifyPokemon('aggron')
	.baseStat()
		.setDef(185)
	.pokemon.learnset()
		.addMove('Dragon Hammer')
		.addMove('Hammer Arm')
		.addMove('Power Whip');

modifyPokemon('aggronmega')
	.baseStat()
		.setDef(235);

modifyPokemon('medicham')
	.baseStat()
		.setAtk(65)
		.setSpe(85)
	.pokemon.learnset()
		.addMove('Expanding Force')
		.addMove('Teleport')
		.addMove('Triple Axel');

modifyPokemon('medichammega')
	.baseStat()
		.setAtk(95);

modifyPokemon('manectric')
	.learnset()
		.addMove('Dark Pulse')
		.addMove('Thunder Cage')
		.addMove('Work Up')
		.addMove('Wildbolt Storm');

modifyPokemon('manectricmega')
	.baseStat()
		.setSpA(130)
		.setSpe(140);

modifyPokemon('plusle')
	.ability()
		.set1('Lightning Rod')
		.setH('Transistor')
	.pokemon.baseStat()
		.setSpe(110)
	.pokemon.learnset()
		.addMove('Weather Ball')
		.addMove('Knock Off')
		.addMove('Rising Voltage');

modifyPokemon('minun')
	.ability()
		.set1('Volt Absorb')
		.setH('Galvanize')
	.pokemon.baseStat()
		.setAtk(85)
		.setDef(75)
		.setSpA(50)
		.setSpD(45)
		.setSpe(110)
	.pokemon.learnset()
		.addMove('Extreme Speed')
		.addMove('Knock Off')
		.addMove('Rising Voltage');

modifyPokemon('volbeat')
	.changeType('Bug', 'Electric')
	.baseStat()
		.setHp(80)
		.setAtk(47)
		.setSpA(90)
		.setSpe(100)
	.pokemon.learnset()
		.addMove('Volt Switch')
		.addMove('Parabolic Charge')
		.addMove('Weather Ball');

modifyPokemon('illumise')
	.changeType('Bug', 'Fairy')
	.baseStat()
		.setHp(80)
		.setAtk(73)
		.setSpA(47)
		.setSpe(100)
	.pokemon.learnset()
		.addMove('Pollen Puff')
		.addMove('Lunge')
		.addMove('Dual Wingbeat')
		.addMove('First Impression')
		.addMove('Skitter Smack');

modifyPokemon('roserade')
	.learnset()
		.addMove('Apple Acid')
		.addMove('Sludge Wave')
		.addMove('Draining Kiss');

modifyPokemon('swalot')
	.ability()
		.setH('Regenerator')
		.set1('Gluttony')
	.pokemon.baseStat()
		.setAtk(93)
		.setSpA(93)
	.pokemon.learnset()
		.addMove('Earth Power')
		.addMove('Hydro Pump')
		.addMove('Focus Blast')
		.addMove('Blizzard')
		.addMove('Poison Jab');

modifyPokemon('sharpedo')
	.ability()
		.set1('Reckless')
	.pokemon.learnset()
		.addMove('Wave Crash')
		.addMove('Fishious Rend');

modifyPokemon('sharpedomega');

modifyPokemon('wailord')
	.ability()
		.set0('Filter')
		.setH('Primordial Sea')
	.pokemon.baseStat()
		.setHp(155)
		.setAtk(70)
		.setDef(70)
		.setSpA(95)
		.setSpD(70)
		.setSpe(45)
	.pokemon.learnset()
		.addMove('Bouncy Bubble')
		.addMove('Origin Pulse')
		.addMove('Focus Blast')
		.addMove('Wave Crash');
	
modifyPokemon('camerupt')
	.baseStat()
		.setHp(90)
	.pokemon.learnset()
		.addMove('Scorching Sands')
		.addMove('Slack Off')
		.addMove('Magma Storm')
		.addMove('Scald')
		.addMove('Steam Eruption');

modifyPokemon('cameruptmega')
	.baseStat()
		.setHp(95)
		.setAtk(100)
		.setDef(105)
		.setSpD(110);

modifyPokemon('torkoal')
	.baseStat()
		.setAtk(70)
		.setSpA(95)
	.pokemon.learnset()
		.addMove('Magma Storm');

modifyPokemon('grumpig')
	.ability()
		.set1('Limber')
		.setH('Cud Chew')
	.pokemon.baseStat()
		.setHp(90)
		.setDef(70)
		.setSpA(95)
		.setSpD(115)
	.pokemon.learnset()
		.addMove('Slack Off')
		.addMove('Expanding Force')
		.addMove('Nasty Plot');
}