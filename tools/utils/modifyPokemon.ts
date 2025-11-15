import { ModdedDex } from '../../sim/dex';

export class ModifyPokemon {
	private _name: string;
	private _dex: ModdedDex;

	constructor(name: string, dex: ModdedDex) {
		this._name = name.includes("-") ? name.toLowerCase().replace('-' , '') : name.toLowerCase();
		this._name = this._name.includes(" ") ? this._name.replace(/ +/g, '') : this._name;
		this._dex = dex;
		console.log(this._name);
	}

	public get types() {
		return new class ModifyTypes {
			private _name: string;
			private _dex: ModdedDex;
			private _pokemon: ModifyPokemon;
			constructor(name: string, dex: ModdedDex, pokemon: ModifyPokemon) {
				this._name = name;
				this._dex = dex;
				this._pokemon = pokemon;
			}

			setType(type1: string, type2?: string) {
				let tempTypes = [];
				if (type1) tempTypes.push(type1);
				if (type2) tempTypes.push(type2);
				this._dex.modData('Pokedex', this._name).types = tempTypes;
				return this;
			}

			public get pokemon() { return this._pokemon; };
			
		} (this._name, this._dex, this);
	}

	public get abilities() {
		return new class ModifyAbilities {
			private _name: string;
			private _dex: ModdedDex;
			private _pokemon: ModifyPokemon;
			constructor(name: string, dex: ModdedDex, pokemon: ModifyPokemon) {
				this._name = name;
				this._dex = dex;
				this._pokemon = pokemon;
			}

			setAbility0(name: string | undefined) {
				this._dex.modData('Pokedex', this._name).abilities[0] = name;
				return this;
			}
			setAbility1(name: string | undefined) {
				this._dex.modData('Pokedex', this._name).abilities[1] = name;
				return this;
			}
			setHiddenAbility(name: string | undefined) {
				this._dex.modData('Pokedex', this._name).abilities['H'] = name;
				return this;
			}
			public get pokemon() { return this._pokemon; }
		} (this._name, this._dex, this);
	}
	public get baseStats() {
		return new class ModifyBaseStats {
		private _name: string;
		private _dex: ModdedDex;
		private _pokemon: ModifyPokemon;
	constructor(name: string, dex: ModdedDex, pokemon: ModifyPokemon) {
		this._name = name;
		this._dex = dex;
		this._pokemon = pokemon;
	}
	public setHP(value: number) {
		this._dex.modData('Pokedex', this._name).baseStats.hp = value;
		return this;
	}
	public setATK(value: number) {
		this._dex.modData('Pokedex', this._name).baseStats.atk = value;
		return this;
	}
	public setDEF(value: number) {
		this._dex.modData('Pokedex', this._name).baseStats.def = value;
		return this;
	}
	public setSPA(value: number) {
		this._dex.modData('Pokedex', this._name).baseStats.spa = value;
		return this;
	}
	public setSPD(value: number) {
		this._dex.modData('Pokedex', this._name).baseStats.spd = value;
		return this;
	}
	public setSPE(value: number) {
		this._dex.modData('Pokedex', this._name).baseStats.spe = value;
		return this;
	}
	public get pokemon () { return this._pokemon; }
		}(this._name, this._dex, this);
	}
	public get learnset() {
		return new class ModifyLearnset {
			private _name: string;
			private _dex: ModdedDex;
			private _pokemon: ModifyPokemon
			constructor(name: string, dex: ModdedDex, pokemon: ModifyPokemon) {
				this._name = name;
				this._dex = dex;
				this._pokemon = pokemon;
			}
		
			add(move: string, gen: number = 8) {
				move = move.toLowerCase().replace(' ', '');
				this._dex.modData('Learnsets', this._name).learnset[move.toLowerCase().replace(/ +/g, '')] = [`${gen}M`];
				return this;
			}
			remove(move: string) {
				move = move.toLowerCase().replace(' ', '');
				delete this._dex.modData('Learnsets', this._name).learnset[move];
				this.removeFromPrevos(move);
				return this;
			}

			private removeFromPrevos(move: string) {
				const prevo = this._dex.modData('Pokedex', this._name).prevo;

				if (!prevo) return;
				
				let prevoName = prevo.includes("-") ? prevo.toLowerCase().replace('-' , '') : prevo.toLowerCase();
				prevoName = prevoName.includes(" ") ? prevoName.replace(/ +/g, '') : prevoName;
				const prevoLearnset = this._dex.modData('Learnsets', prevoName).learnset;

				if (!prevoLearnset[move]) return;
				
				delete prevoLearnset[move];
				this.removeFromPrevos(move);
			}
			
			public get pokemon() {
				return this._pokemon;
			}
		} (this._name, this._dex, this);
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