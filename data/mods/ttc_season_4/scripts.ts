import { ModifyPokemon } from "../../../tools/utils/modifyPokemon";
import { ModifyMove } from '../../../tools/utils/modifyMove';

export const Scripts: ModdedBattleScriptsData = {
	inherit: "ttc_season_3",
	init() {
		//#region Cosmic Damage To
		this.modData("TypeChart", "normal").damageTaken["Cosmic"] = 0;
		this.modData("TypeChart", "fire").damageTaken["Cosmic"] = 1;
		this.modData("TypeChart", "water").damageTaken["Cosmic"] = 1;
		this.modData("TypeChart", "grass").damageTaken["Cosmic"] = 0;
		this.modData("TypeChart", "electric").damageTaken["Cosmic"] = 2;
		this.modData("TypeChart", "ice").damageTaken["Cosmic"] = 2;
		this.modData("TypeChart", "fighting").damageTaken["Cosmic"] = 0;
		this.modData("TypeChart", "poison").damageTaken["Cosmic"] = 3;
		this.modData("TypeChart", "ground").damageTaken["Cosmic"] = 1;
		this.modData("TypeChart", "flying").damageTaken["Cosmic"] = 0;
		this.modData("TypeChart", "psychic").damageTaken["Cosmic"] = 1;
		this.modData("TypeChart", "bug").damageTaken["Cosmic"] = 2;
		this.modData("TypeChart", "rock").damageTaken["Cosmic"] = 0;
		this.modData("TypeChart", "ghost").damageTaken["Cosmic"] = 0;
		this.modData("TypeChart", "dragon").damageTaken["Cosmic"] = 0;
		this.modData("TypeChart", "dark").damageTaken["Cosmic"] = 2;
		this.modData("TypeChart", "steel").damageTaken["Cosmic"] = 0;
		this.modData("TypeChart", "fairy").damageTaken["Cosmic"] = 0;
		//#endregion

		//#region Change Moves types to Cosmic

		let cosmicMoveList: string[] = [
			'aurorabeam',
			'auroraveil',
			'cometpunch',
			'cosmicpower',
			'doomdesire',
			'dynamaxcannon',
			'eternabeam',
			'gravity',
			'hyperspacefury',
			'hyperspacehole',
			'jetpunch',
			'luminacrash',
			'lunarblessing',
			'lunardance',
			'meteorassault',
			'meteorbeam',
			'meteormash',
			'moonblast',
			'moongeistbeam',
			'moonlight',
			'morningsun',
			'photongeyser',
			'prismaticlaser',
			'signalbeam',
			'spacialrend',
			'sparklyswirl',
			'sunsteelstrike',
			'swift',
			'terastarstorm',
			'vacuumwave',
			'wish'
		];

		for (let move of cosmicMoveList) {
			switch (move) {
				case 'eternabeam':
					new ModifyMove(move, this)
						.setType('Cosmic')
						.setBasePower(145)
						.flags
							.set({protect: 1, mirror: 1, cantusetwice: 1})
						.move.descriptions
							.setShortDesc("Cannot be selected the turn after it's used.")
							.setLongDesc(undefined);
					this.modData('Moves', move).self = undefined;
					break;
				case 'hyperspacehole':
					new ModifyMove(move, this)
						.setType('Cosmic')
						.setBasePower(85);
					break;
				case 'meteorassault':
					new ModifyMove(move, this)
						.setType('Cosmic')
						.flags
							.set({ protect: 1, mirror: 1, failinstruct: 1})
						.move.setRecoil([1, 2])
						.descriptions
							.setShortDesc('1/2 Recoil Damage')
							.setLongDesc('1/2 Recoil Damage');
					this.modData('Moves', move).self = undefined;
					break;
				case 'prismaticlaser':
					new ModifyMove(move, this)
						.setType('Cosmic')
						.setBasePower(145)
						.flags
							.set({ protect: 1, mirror: 1, cantusetwice: 1})
						.move.descriptions
							.setShortDesc("Cannot be selected the turn after it's used.")
							.setLongDesc(undefined);
					this.modData('Moves', move).self = undefined;
					break;
				case 'swift':
					new ModifyMove(move, this)
						.setType('Cosmic')
						.setBasePower(55)
						.descriptions
							.setLongDesc("If the current terrain is Cosmic Terrain, this move has its priority increased by 1.")
							.setShortDesc("User on Cosmic Terrain: +1 priority.");
					break;
				case 'vacuumwave':
					new ModifyMove(move, this)
						.setType('Cosmic')
						.setBasePower(70)
						.setOverrideDefensiveStat('def')
						.descriptions
							.setLongDesc("Deals damage to ther target based on its Defense instead of Special Defense. +1 Priority.")
							.setShortDesc("Damages Target Based on Def; +1 Priority.");
					break;
				default:
					new ModifyMove(move, this)
						.setType('Cosmic');
					break;
			}
		}

		//#endregion

		//#region Pokemon Changes

		//#region Gen 1
		// FE
		new ModifyPokemon('Blastoise', this)
			.learnset
				.remove('Hydro Steam');
		new ModifyPokemon('Electrode-Hisui', this)
			.learnset
				.remove('Mist Ball');
		new ModifyPokemon('Pidgeot', this)
			.learnset
				.remove('Aeroblast');
		new ModifyPokemon('Vileplume', this)
			.abilities
				.setAbility0('Venom Hielaman');

		// NFE
		new ModifyPokemon('Wartortle', this)
			.learnset
				.remove('Hydro Steam');
		//#region Gen 2
		
		new ModifyPokemon('Bellossom', this)
			.abilities
				.setAbility1('Sun Dance');
		new ModifyPokemon('Politoed', this)
			.types
				.setType('Water', 'Normal');

		//#endregion

		//#region Gen 3

		// NFE
		new ModifyPokemon('Roselia', this)
			.abilities
				.setAbility0('Dazzling');

		//#endregion

		//#region Gen 4

		new ModifyPokemon('Roserade', this)
			.abilities
				.setAbility0('Dazzling');
		new ModifyPokemon('Rotom-Mow', this)
			.learnset
				.add('Supercell Slam')
				.add('Zing Zap')
				.remove('Bolt Strike')
				.remove('Volt Tackle')
				.remove('Fusion Bolt');

		//#endregion

		//#region Gen 5
		
		new ModifyPokemon('Durant', this)
			.learnset
				.add('Lunge');
		new ModifyPokemon('Jellicent', this)
			.baseStats
				.setSPA(80)
				.setSPD(110);
		new ModifyPokemon('Lilligant', this)
			.abilities
				.setHiddenAbility('Costar');

		//#endregion

		//#region  Gen 6
		// FE
		new ModifyPokemon('Aegislash', this)
			.learnset
				.remove('Behemoth Bash')
				.remove('Behemoth Blade');
		new ModifyPokemon('Florges', this)
			.abilities
				.setAbility0('Oblivious');

		// NFE
		new ModifyPokemon('Floette', this)
			.abilities
				.setAbility0('Oblivious');

		// LC
		new ModifyPokemon('Flabebe', this)
			.abilities
				.setAbility0('Oblivious');

		//#endregion

		//#region Gen 7

		new ModifyPokemon('Comfey', this)
			.abilities
				.setAbility0('Aroma Veil');
		new ModifyPokemon('Passimian', this)
			.learnset
				.add('High Jump Kick')
				.add('Rolling Kick');

		//#endregion

		//#region Gen 8

		new ModifyPokemon('Boltund', this)
			.learnset
				.add('Supercell Slam')
				.add('Zing Zap')
				.remove('Bolt Strike')
				.remove('Volt Tackle');
		new ModifyPokemon('Dracozolt', this)
			.learnset
				.add('Supercell Slam');
		new ModifyPokemon('Inteleon', this)
			.learnset
				.remove('Hydro Steam');

		//#endregion

		//#region Gen 9

		new ModifyPokemon('BruteBonnet', this)
			.baseStats
				.setHP(115)
				.setDEF(95)
				.setSPD(95)
				.setSPE(59);
		new ModifyPokemon('Archaludon', this)
			.baseStats
				.setHP(85)
				.setSPD(50)
			.pokemon.learnset
				.remove('Meteor Beam');
		new ModifyPokemon('FlutterMane', this)
			.baseStats
				.setHP(69)
				.setATK(69)
				.setDEF(69)
				.setSPA(121)
				.setSPD(121)
				.setSPE(121);
		new ModifyPokemon('SlitherWing', this)
			.baseStats
				.setSPA(59)
				.setSPE(87);
		new ModifyPokemon('RoaringMoon', this)
			.baseStats
				.setATK(135)
				.setSPE(113);

		//#endregion

		//#region TTC Fakemons

		new ModifyPokemon('Akumu', this)
			.abilities
				.setAbility0('Grave Counter')
			.pokemon.learnset
				.add('Sheer Cold')
				.add('Encore')
				.add('Taunt');
		new ModifyPokemon('Crustocean', this)
			.learnset
				.add('Amnesia')
				.add('Grassy Terrain')
				.add('Spikes');
		new ModifyPokemon('Farfetchd-Mega', this)
			.baseStats
				.setDEF(84)
				.setSPD(84)
				.setSPE(113);

		//#endregion

		new ModifyPokemon('Cleffa', this)
			.types
				.setType('Cosmic');
		new ModifyPokemon('Clefairy', this)
			.types
				.setType('Cosmic', 'Fairy');
		new ModifyPokemon('Clefable', this)
			.types
				.setType('Cosmic', 'Fairy');
		new ModifyPokemon('Ralts', this)
			.types
				.setType('Cosmic', 'Psychic');
		new ModifyPokemon('Kirlia', this)
			.types
				.setType('Cosmic', 'Psychic');
		new ModifyPokemon('Gardevoir', this)
			.types
				.setType('Cosmic', 'Psychic');
		new ModifyPokemon('Lunatone', this)
			.types
				.setType('Cosmic', 'Water');
		new ModifyPokemon('Solrock', this)
			.types
				.setType('Cosmic', 'Fire');
		new ModifyPokemon('Jirachi', this)
			.types
				.setType('Cosmic', 'Psychic');
		new ModifyPokemon('Deoxys', this)
			.types
				.setType('Cosmic');
		new ModifyPokemon('DeoxysAttack', this)
			.types
				.setType('Cosmic');
		new ModifyPokemon('DeoxysDefense', this)
			.types
				.setType('Cosmic');
		new ModifyPokemon('DeoxysSpeed', this)
			.types
				.setType('Cosmic');
		new ModifyPokemon('Palkia', this)
			.types
				.setType('Cosmic', 'Dragon');
		new ModifyPokemon('Cresselia', this)
			.types
				.setType('Cosmic')
			.pokemon.abilities
				.setHiddenAbility('Cosmic Surge');
		new ModifyPokemon('Gothita', this)
			.types
				.setType('Cosmic', 'Dark');
		new ModifyPokemon('Gothorita', this)
			.types
				.setType('Cosmic', 'Dark');
		new ModifyPokemon('Gothitelle', this)
			.types
				.setType('Cosmic', 'Dark');
		new ModifyPokemon('Elgyem', this)
			.types
				.setType('Cosmic');
		new ModifyPokemon('Beheeyem', this)
			.types
				.setType('Cosmic');
		new ModifyPokemon('Hoopa', this)
			.types
				.setType('Cosmic', 'Ghost');
		new ModifyPokemon('Hoopa-Unbound', this)
			.types
				.setType('Cosmic', 'Dark');
		new ModifyPokemon('Minior', this)
			.types
				.setType('Cosmic', 'Rock');
		new ModifyPokemon('Cosmog', this)
			.types
				.setType('Cosmic');
		new ModifyPokemon('Cosmoem', this)
			.types
				.setType('Cosmic');
		new ModifyPokemon('Solgaleo', this)
			.types
				.setType('Cosmic', 'Psychic')
		new ModifyPokemon('Lunala', this)
			.types
				.setType('Cosmic', 'Ghost');
		new ModifyPokemon('Necrozma', this)
			.types
				.setType('Cosmic');
		new ModifyPokemon('Nihilego', this)
			.types
				.setType('Comsic', 'Poison');
		new ModifyPokemon('Dottler', this)
			.types
				.setType('Bug', 'Cosmic');
		new ModifyPokemon('Orbeetle', this)
			.types
				.setType('Bug', 'Cosmic');
		new ModifyPokemon('Eternatus', this)
			.types
				.setType('Cosmic', 'Poison');
		new ModifyPokemon('Flittle', this)
			.types
				.setType('Cosmic');
		new ModifyPokemon('Espathra', this)
			.types
				.setType('Cosmic');
		new ModifyPokemon('PalafinHero', this)
			.types
				.setType('Cosmic', 'Water');
		new ModifyPokemon('IronMoth', this)
			.types
				.setType('Cosmic', 'Fire');
		new ModifyPokemon('Terapagos', this)
			.types
				.setType('Cosmic', 'Normal');

		//#endregion
		//#endregion
	
		//#region Basic Move Changes
		
		//#region Physical Moves

		new ModifyMove('Ceaseless Edge', this)
			.setBasePower(60);
		new ModifyMove('Cut', this)
			.setAccuracy(95);
		new ModifyMove('Fire Fang', this)
			.setBasePower(70)
			.setAccuracy(95);
		new ModifyMove('Ice Fang', this)
			.setBasePower(70)
			.setAccuracy(95);
		new ModifyMove('Leak Lunge', this)
			.setBasePower(65);
		new ModifyMove('Lunge', this)
			.setAccuracy(95);
		new ModifyMove('Skitter Smack', this)
			.setBasePower(80)
			.setAccuracy(95);
		new ModifyMove('Thunder Fang', this)
			.setBasePower(70)
			.setAccuracy(95);

		//#endregion

		//#region Special Moves

		new ModifyMove('Blizzard', this)
			.setAccuracy(80)
			.secondaries
				.setStatusCondition('frz', 20)
			.move.descriptions
				.setLongDesc(undefined)
				.setShortDesc("20% chance to freeze; Can't miss in Snow.");
		new ModifyMove('Fire Blast', this)
			.setAccuracy(80)
			.secondaries
				.setStatusCondition('brn', 20)
			.move.descriptions
				.setLongDesc(undefined)
				.setShortDesc('20% chance to burn.');
		new ModifyMove('Hurricane', this)
			.setAccuracy(80)
			.secondaries
				.setVolatileStatus('confuse', 20)
			.move.descriptions
				.setLongDesc(undefined)
				.setShortDesc("20% chance to confuse; Can't miss in rain");
		new ModifyMove('Hydro Pump', this)
			.setAccuracy(80)
			.secondaries
				.setVolatileStatus('flinch', 20)
			.move.descriptions
				.setLongDesc(undefined)
				.setShortDesc('20% chance to flinch');
		new ModifyMove('Thunder', this)
			.secondaries
				.setStatusCondition('par', 20)
			.move.descriptions
				.setLongDesc(undefined)
				.setShortDesc("20% chance to paralyze; Can't miss in rain.");
		new ModifyMove('Extrasensory', this)
			.setAccuracy(90);

		//#endregion

		//#region Status Moves

		new ModifyMove('Cosmic Power', this)
			.setPowerPoint(8);

		//#endregion
		
		
		//#endregion

		//#region Field Support

		//#region Weather
		this.modData('Conditions', 'raindance').durationCallback = (source: Pokemon, effect: Pokemon) => {
			if (source.hasItem('damprock')) return 8;
			else if (source.hasAbility('fieldsupport')) return 7;
			else return 5;
		};

		this.modData('Conditions', 'sunnyday').durationCallback = (source: Pokemon, effect: Pokemon) => {
			if (source.hasItem('heatrock')) return 8;
			else if (source.hasAbility('fieldsupport')) return 7;
			else return 5;
		};

		this.modData('Conditions', 'sandstorm').durationCallback = (source: Pokemon, effect: Pokemon) => {
			if (source.hasItem('smoothrock')) return 8;
			else if (source.hasAbility('fieldsupport')) return 7;
			else return 5;
		};

		this.modData('Conditions', 'snow').durationCallback = (source: Pokemon, effect: Pokemon) => {
			if (source.hasItem('icyrock')) return 8;
			else if (source.hasAbility('fieldsupport')) return 7;
			else return 5;
		};
		//#endregion

		//#region Terrain

		for (let terrain of ['electricterrain', 'grassyterrain', 'mistyterrain', 'psychicterrain']) {
			this.modData('Moves', terrain).durationCallback = (source: Pokemon, effect: Pokemon) => {
				if (source.hasItem('terrainextender')) return 8;
				else if (source.hasAbility('fieldsupport')) return 7;
				else return 5;
			}
		}

		//#endregion


		//#region Removing Field Support off of certain moves
		for (let move of ['auroraveil', 'reflect', 'lightscreen']) {
			this.modData('Moves', move).durationCallback = (source: Pokemon, effect: Pokemon) => {
				if (source.hasItem('lightclay')) return 8;
				else return 5;
			}
		}

		//#region Other Moves
		// Look at Moves.ts
		//#endregion

		//#endregion
		
		//#endregion
	},
};