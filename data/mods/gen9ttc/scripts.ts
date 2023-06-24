import { ModdedDex } from '../../../sim/dex';
import { Learnset } from '../../../sim/dex-species';

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
		
		//#region Functions
		let learnsetRemove = (pokemon: string, moves: string[]) => {
			for(let move of moves) {
				this.modData('Learnsets', pokemon.toLowerCase()).learnset[move.toLowerCase()] = [];
			}
		}

		let learnsetAdd = (pokemon: string, moves: [string, number][]) => {
			for(let move of moves) {
				// Example: this.modData('Learnset', 'furret').learset['playrough'] = ['9M'];
				this.modData('Learnsets', pokemon.toLowerCase()).learnset[move[0].toLowerCase()] = [`${move[1]}M`];
			}
		}

		//#endregion

		//#region Modify Pokemon
		//#region Gen 1
		modifyPokemon('venusaur')
			.baseStat()
				.setHp(90)
				.setAtk(77)
				.setDef(90)
				.setSpA(95)
				.setSpD(105)
			.pokemon.learnset()
				.addMove('Sludge Wave')
				.addMove('Acid Spray')
				.addMove('Gastro acid');

		modifyPokemon('charizard')
			.baseStat()
				.setAtk(94)
				.setSpe(105)
			.pokemon.learnset()
				.addMove('Fire Lash')
				.addMove('U Turn')
				.addMove('Burn up');

		modifyPokemon('charizardmegax')
			.baseStat()
				.setAtk(135)
				.setSpe(105);
		
		modifyPokemon('charizardmegay')
			.baseStat()
				.setSpe(110);
		
		modifyPokemon('blastoise')
			.ability()
				.set1('Shell Armor')
			.pokemon.baseStat()
				.setAtk(63)
				.setDef(120)
			.pokemon.learnset()
				.addMove('Hydro Steam', 9)
				.addMove('Stream Eruption');

		modifyPokemon('butterfree')
			.changeType('Bug', 'Psychic')
			.baseStat()
				.setHp(75)
				.setDef(75)
				.setSpA(100)
				.setSpD(100)
				.setSpe(50)
			.pokemon.learnset()
				.addMove('lightscreen')
				.addMove('aromatherapy')
				.addMove('stickyweb')
				.addMove('psyshock')
				.addMove('luminacrash')
				.addMove('trickroom');
		
		modifyPokemon('beedrill')
			.ability()
				.set1('Merciless')
			.pokemon.baseStat()
				.setAtk(100)
				.setSpA(20)
				.setSpe(105)
			.pokemon.learnset()
				.addMove('crosspoison')
				.addMove('dualwingbeat')
				.addMove('firstimpression');
		
		modifyPokemon('pidgeot')
			.ability()
				.set0('Frisk')
				.set1('Early Bird')
				.setH('Defiant')
			.pokemon.baseStat()
				.setAtk(95)
				.setDef(85)
				.setSpA(80)
				.setSpe(96)
			.pokemon.learnset()
				.addMove('hypervoice')
				.addMove('bulkup')
				.addMove('extremespeed')
				.addMove('aurasphere')
				.addMove('dualwingbeat');

		modifyPokemon('raticate')
			.ability()
				.set0('Strong Jaw')
			.pokemon.baseStat()
				.setHp(65)
				.setAtk(96)
				.setSpe(102)
			.pokemon.learnset()
				.addMove('closecombat')
				.addMove('firefang')
				.addMove('icefang')
				.addMove('psychicfang');
			
		modifyPokemon('raticatealola')
			.ability()
				.set1('Cheek Pouch')
			.pokemon.baseStat()
				.setHp(100)
				.setAtk(90)
				.setSpD(90)
				.setSpe(60)
			.pokemon.learnset()
				.addMove('closecombat')
				.addMove('firefang')
				.addMove('icefang')
				.addMove('psychicfang')
				.addMove('partingshot');

		modifyPokemon('fearow')
			.changeType('Dark', 'Flying')
			.ability()
				.set0('Frisk')
			.pokemon.baseStat()
				.setHp(80)
				.setAtk(100)
				.setDef(55)
				.setSpD(51)
				.setSpe(105)
			.pokemon.learnset()
				.addMove('swordsdance')
				.addMove('dualwingbeat')
				.addMove('beakblast')
				.addMove('foulplay')
				.addMove('nightslash')
				.addMove('falsesurrender');

		modifyPokemon('arbok')
			.ability()
				.setH('Strong Jaw')
			.pokemon.baseStat()
				.setHp(80)
				.setDef(89)
				.setSpD(99)
				.setSpe(75)
			.pokemon.learnset()
				.addMove('Jaw Lock')
				.addMove('Shed Tail');

		modifyPokemon('pikachu')
			.baseStat()
				.setAtk(60)
				.setSpA(60)
				.setSpe(100)
			.pokemon.learnset()
				.addMove('zippyzap');

		modifyPokemon('raichu')
			.ability()
				.set1('Galvanize')
			.pokemon.baseStat()
				.setAtk(100)
				.setSpA(100)
			.pokemon.learnset()
				.addMove('zippyzap');

		modifyPokemon('raichualola')
			.baseStat()
				.setSpA(105);

		modifyPokemon('sandslash')
			.ability()
				.set0('Rough Skin')
			.pokemon.baseStat()
				.setHp(85)
				.setAtk(105)
				.setSpD(75)
			.pokemon.learnset()
				.addMove('spikyshield')
				.addMove('spinout');
			
		modifyPokemon('sandslashalola')
			.ability()
				.set0('Rough Skin')
			.pokemon.learnset()
				.addMove('spikyshield')
				.addMove('icespinner', 9);

		modifyPokemon('nidoqueen')
			.baseStat()
				.setHp(100)
				.setAtk(72)
				.setSpA(95)
				.setSpD(95)
				.setSpe(60);
		
		modifyPokemon('nidoking')
			.baseStat()
				.setAtk(112)
				.setSpA(75)
				.setSpe(95)
			.pokemon.learnset()
				.addMove('gunkshot')
				.addMove('precipiceblades');

		modifyPokemon('clefable');

		modifyPokemon('ninetales')
			.changeType('Fire', 'Ghost')
			.ability()
				.set1('Cursed Body')
				.setH('Bad Dreams')
			.pokemon.baseStat()
				.setSpA(91)
			.pokemon.learnset()
				.addMove('lavaplume')
				.addMove('darkvoid')
				.addMove('destinybond')
				.addMove('nightmare')
				.addMove('bittermalice')
				.addMove('nightdaze')
				.removeMove('nastyplot');

		modifyPokemon('ninetalesalola')
			.baseStat()
				.setHp(83)
				.setDef(85)
				.setSpD(110)
			.pokemon.learnset()
				.addMove('haze')
				.addMove('chillyreception')
				.addMove('glaciate');

		modifyPokemon('wigglytuff')
			.ability()
				.set0('Fluffy')
				.setH('Thick Fat')
			.pokemon.baseStat()
				.setDef(55)
				.setSpD(60)
				.setSpe(55)
			.pokemon.learnset()
				.addMove('moonblast');

		modifyPokemon('crobat')
			.ability()
				.set1('Infiltrator')
				.setH('Vampire') // New Ability
			.pokemon.learnset()
				.addMove('poisonjab')
				.addMove('toxicspikes')
				.addMove('firefang')
				.addMove('thunderfang')
				.addMove('icefang');

		modifyPokemon('vileplume')
			.ability()
				.set0('Lingering Aroma')
				.set1('Neutralizing Gas')
			.pokemon.learnset()
				.addMove('appleacid')
				.addMove('trailblaze', 9)
				.addMove('acidspray');

		modifyPokemon('parasect')
			.ability()
				.set0('Regenerator')
			.pokemon.baseStat()
				.setHp(70)
				.setAtk(105)
				.setDef(100)
				.setSpe(55)
			.pokemon.learnset()
				.addMove('crabhammer')
				.addMove('grassyglide')
				.addMove('spore')
				.addMove('uturn')
				.addMove('leafblade')
				.addMove('pounce')
				.addMove('trailblaze', 9);

		modifyPokemon('venomoth')
			.ability()
				.setH('Compound Eyes')
			.pokemon.learnset()
				.addMove('hex');
		
		modifyPokemon('dugtrio')
			.ability()
				.set1('Emergency Exit')
			.pokemon.learnset()
				.addMove('headlongrush');

		modifyPokemon('dugtrioalola')
			.ability()
				.set0('Emergency Exit')
			.pokemon.baseStat()
				.setAtk(105)
			.pokemon.learnset()
				.addMove('headlongrush');

		modifyPokemon('persian')
			.ability()
				.setH('Intimidate')
			.pokemon.baseStat()
				.setAtk(90)
				.setSpA(70)
			.pokemon.learnset()
				.addMove('dazzlinggleam')
				.addMove('suckerpunch');

		modifyPokemon('persianalola')
			.ability()
				.setH('Prankster')
			.pokemon.baseStat()
				.setAtk(65)
				.setSpA(90)
			.pokemon.learnset()
				.addMove('suckerpunch')
				.addMove('nightdaze');

		modifyPokemon('golduck')
			.changeType('Water', 'Psychic')
			.baseStat()
				.setHp(75)
				.setDef(73)
				.setSpA(100)
			.pokemon.learnset()
				.addMove('teleport')
				.addMove('expandingforce');

		modifyPokemon('primeape')
			.ability()
				.setH('Gorilla Tactics')
			.pokemon.learnset()
				.addMove('knockoff');

		modifyPokemon('arcanine')
			.ability()
				.setH('Strong Jaw')
			.pokemon.learnset()
				.addMove('thunderwave')
				.addMove('icefang');

		modifyPokemon('poliwrath')
			.baseStat()
				.setAtk(85)
			.pokemon.learnset()
				.addMove('surgingstrikes')
				.addMove('flipturn')
				.addMove('jetpunch', 9);

		modifyPokemon('politoed')
			.baseStat()
				.setHp(95)
				.setAtk(65)
				.setDef(70)
				.setSpA(105)
				.setSpD(95)
			.pokemon.learnset()
				.addMove('flipturn')
				.addMove('lifedew');

		modifyPokemon('alakazam')
			.learnset()
				.removeMove('counter')
				.removeMove('barrier');

		modifyPokemon('machamp')
			.baseStat()
				.setHp(100)
				.setDef(90)
				.setSpD(95)
			.pokemon.learnset()
				.addMove('drainpunch')
				.addMove('combattorque');

		modifyPokemon('victreebel')
			.ability()
				.set0('Liquid Ooze')
				.setH('Fly Trap') // New Ability
			.pokemon.baseStat()
				.setDef(70)
				.setSpe(75)
			.pokemon.learnset()
				.addMove('solarblade');
		//#endregion
		//#endregion
		
	},
};