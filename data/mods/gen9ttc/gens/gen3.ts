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
}