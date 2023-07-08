import { ModdedDex } from "./../../../../sim/dex";
export default function Gen5 (dex: ModdedDex) {
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

modifyPokemon('mushama')
	.ability()
		.set0('Unaware')
		.set1('Levitate')
		.setH('Misty Surge')
	.pokemon.baseStat()
		.setDef(100)
		.setSpA(110)
	.pokemon.learnset()
		.addMove('Draining Kiss')
		.addMove('Slack Off')
		.addMove('Haze')
		.addMove('Mist Ball')
		.addMove('Lumina Crash');
}