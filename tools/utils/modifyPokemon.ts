import { ModdedDex } from '../../sim/dex';

export class ModdedPokemon{
	private _name: string;
	private _dex: ModdedDex;
	
	constructor(name: string, dex: ModdedDex) {
		this._name = name.includes("-") ? name.toLowerCase().replace('-', '') : name.toLowerCase();
		this._dex = dex;
	}
	public get baseStats() { return new ModBaseStats(this._name, this._dex); }
	public get ability() { return new ModAbility(this._name, this._dex); }
	public get learnset() { return new ModLearnset(this._name, this._dex); }
}

class ModBaseStats {
	private _name: string;
	private _dex: ModdedDex;
	constructor(name: string, dex: ModdedDex) {
		this._name = name;
		this._dex = dex;
	}
	public set HP(value: number) {
		this._dex.modData('Pokedex', this._name).baseStats.hp = value;
	}
	public set ATK(value: number) {
		this._dex.modData('Pokedex', this._name).baseStats.atk = value;
	}
	public set DEF(value: number) {
		this._dex.modData('Pokedex', this._name).baseStats.def = value;
	}
	public set SPA(value: number) {
		this._dex.modData('Pokedex', this._name).baseStats.spa = value;
	}
	public set SPD(value: number) {
		this._dex.modData('Pokedex', this._name).baseStats.spd = value;
	}
	public set SPE(value: number) {
		this._dex.modData('Pokedex', this._name).baseStats.spe = value;
	}
}

class ModAbility {
	private _name: string;
	private _dex: ModdedDex;
	constructor(name: string, dex: ModdedDex) {
		this._name = name;
		this._dex = dex;
	}

	setAbility0(name: string) {
		this._dex.modData('Pokedex', this._name).abilities[0] = name;
	}
	setAbility1(name: string) {
		this._dex.modData('Pokedex', this._name).abilities[1] = name;
	}
	setHiddenAbility(name: string) {
		this._dex.modData('Pokedex', this._name).abilities['H'] = name;
	}
}

class ModLearnset {
	private _name: string;
	private _dex: ModdedDex;
	constructor(name: string, dex: ModdedDex) {
		this._name = name;
		this._dex = dex;
	}

	add(move: string, gen: number = 8) {
		move = move.toLowerCase().replace(' ', '');
		this._dex.modData('Learnsets', this._name)[move.toLowerCase().replace(/ +/g, '')] = [`${gen}M`];
	}
	remove(move: string) {
		move = move.toLowerCase().replace(' ', '');
		delete this._dex.modData('Learnsets', this._name)[move.toLowerCase().replace(/ +/g, '')];
	}
}

export function modifyDex(dex: ModdedDex) {
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
			dex: modifyDex(dex),
		}

	}

	return {
		modifyPokemon
	}
}