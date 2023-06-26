import { ModdedDex } from '../../../sim/dex';
import { Learnset } from '../../../sim/dex-species';

// Generations Files
import Gen1 from './gens/gen1';
import Gen2 from './gens/gen2';

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen9',
	init() {
		//#region Add Kick Move Flag to moves
		let kickMoves: string[] = [
			"blazekick",
			"doublekick",
			"highhorsepower",
			"highjumpkick",
			"jumpkick",
			"lowsweep",
			"megakick",
			"rollingkick",
			"stomp",
			"tripleaxel",
			"triplekick",
			"tropkick",
		];

		for(let move of kickMoves) {
			this.modData('Moves', move).flags.kick = 1;
		}
		//#endregion

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
				this.modData('Pokedex', pokemon.toLowerCase()).types = type2 ? [type1, type2] : [type1];
				return modifyPokemon(pokemon);
			}

			let addMove = (name: string, gen: number = 8) => {
				this.modData('Learnsets', pokemon.toLowerCase()).learnset[name.toLowerCase().replace(/ +/g, '')] = [`${gen}M`];
				return learnset();
			}

			let removeMove = (name: string) => {
				this.modData('Learnsets', pokemon.toLowerCase()).learnset[name.toLowerCase().replace(/ +g/, '')] = [];
				return learnset();
			}

			let setHp = (stat: number) => {
				this.modData('Pokedex', pokemon.toLowerCase()).baseStats['hp'] = stat;
				return baseStat();
			}

			let setAtk = (stat: number) => {
				this.modData('Pokedex', pokemon.toLowerCase()).baseStats['atk'] = stat;
				return baseStat();
			}
			
			let setDef = (stat: number) => {
				this.modData('Pokedex', pokemon.toLowerCase()).baseStats['def'] = stat;
				return baseStat();
			}

			let setSpA = (stat: number) => {
				this.modData('Pokedex', pokemon.toLowerCase()).baseStats['spa'] = stat;
				return baseStat();
			}

			let setSpD = (stat: number) => {
				this.modData('Pokedex', pokemon.toLowerCase()).baseStats['spd'] = stat;
				return baseStat();
			}

			let setSpe = (stat: number) => {
				this.modData('Pokedex', pokemon.toLowerCase()).baseStats['spe'] = stat;
				return baseStat();
			}

			let set0 = (name: string) => {
				this.modData('Pokedex', pokemon.toLowerCase()).abilities['0'] = name;
				return ability();
			}

			let set1 = (name: string) => {
				this.modData('Pokedex', pokemon.toLowerCase()).abilities['1'] = name;
				return ability();
			}

			let setH = (name: string) => {
				this.modData('Pokedex', pokemon.toLowerCase()).abilities['H'] = name;
				return ability();
			}

			let setS = (name: string) => {
				this.modData('Pokedex', pokemon.toLowerCase()).abilities['S'] = name;
				return ability();
			}

			return {
				learnset,
				baseStat,
				changeType,
				ability,
			}
		}

		//#region Modify Pokemon

		// Generation 1
		Gen1(this);
		// Generation 2
		Gen2(this);
		
	},
};