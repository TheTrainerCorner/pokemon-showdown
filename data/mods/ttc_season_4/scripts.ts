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

		//#region Pokemon Changes

		//#region Gen 1
		// FE
		new ModifyPokemon('Blastoise', this)
			.learnset
				.remove('Hydro Steam');
		new ModifyPokemon('Clefable', this)
			.types
				.setType('Cosmic', 'Fairy')
			.pokemon.abilities
				.setAbility0('Cosmic Surge')
			.pokemon.learnset
				.add('Lunar Dance')
				.add('Vacuum Wave')
				.add('Stardust Trail');
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
		new ModifyPokemon('Clefairy', this)
			.types
				.setType('Cosmic');
		new ModifyPokemon('Wartortle', this)
			.learnset
				.remove('Hydro Steam');

		// LC
		new ModifyPokemon('Cleffa', this)
			.types
				.setType('Cosmic');

		//#region Gen 2
		
		new ModifyPokemon('Bellossom', this)
			.abilities
				.setAbility1('Sun Dance');
		new ModifyPokemon('Politoed', this)
			.types
				.setType('Water', 'Normal');

		//#endregion

		//#region Gen 3

		// FE
		new ModifyPokemon('Deoxys', this)
			.types
				.setType('Cosmic');
		new ModifyPokemon('Deoxys-Attack', this)
			.types
				.setType('Cosmic');
		new ModifyPokemon('Deoxys-Defense', this)
			.types
				.setType('Cosmic')
			.pokemon.learnset
				.add('Lunar Dance')
				.add('Swift')
				.add('Vacuum Wave');
		new ModifyPokemon('Deoxys-Speed', this)
			.types
				.setType('Cosmic')
			.pokemon.learnset
				.add('Lunar Dance')
				.add('Swift')
				.add('Vacuum Wave');
		new ModifyPokemon('Gardevoir', this)
			.types
				.setType('Psychic', 'Cosmic')
			.pokemon.learnset
				.add('Lunar Dance');
		new ModifyPokemon('Jirachi', this)
			.types
				.setType('Cosmic', 'Psychic')
			.pokemon.learnset
				.add('Lunar Dance');
		new ModifyPokemon('Lunatone', this)
			.types
				.setType('Water', 'Cosmic')
			.pokemon.learnset
				.add('Lunar Tides')
				.add('Hydro Pump')
				.add('Chilling Water')
				.add('Water Pulse')
				.add('Lunar Dance')
				.add('Wish')
				.add('Stardust Trail');
		new ModifyPokemon('Solrock', this)
			.types
				.setType('Fire', 'Cosmic')
			.pokemon.learnset
				.add('Solar Flare')
				.add('Astro Force')
				.add('Sunsteel Strike')
				.add('Lunar Dance')
				.add('Stardust Trail')
				.add('Wish')
				.add('Blazing Torque')
				.add('Raging Fury');

		// NFE
		new ModifyPokemon('Kirlia', this)
			.types
				.setType('Psychic', 'Cosmic');
		new ModifyPokemon('Roselia', this)
			.abilities
				.setAbility0('Dazzling');

		// LC
		new ModifyPokemon('Ralts', this)
			.types
				.setType('Psychic', 'Cosmic');

		//#endregion

		//#region Gen 4
		
		new ModifyPokemon('Cresselia', this)
			.types
				.setType('Cosmic')
			.pokemon.abilities
				.setHiddenAbility('Cosmic Surge')
			.pokemon.learnset
				.add('Vacuum Wave')
				.add('Stardust Trail');
		new ModifyPokemon('Palkia', this)
			.types
				.setType('Cosmic', 'Dragon');
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
		
		// FE
		new ModifyPokemon('Beheeyem', this)
			.types
				.setType('Cosmic')
			.pokemon.learnset
				.add('Lunar Dance')
				.add('Swift')
				.add('Vacuum Wave');
		new ModifyPokemon('Durant', this)
			.learnset
				.add('Lunge');
		new ModifyPokemon('Gothitelle', this)
			.types
				.setType('Cosmic', 'Dark')
			.pokemon.learnset
				.add('Moonblast')
				.add('Lunar Dance')
				.add('Doom Desire');
		new ModifyPokemon('Jellicent', this)
			.baseStats
				.setSPA(80)
				.setSPD(110);
		new ModifyPokemon('Lilligant', this)
			.abilities
				.setHiddenAbility('Costar');
		
		// NFE
		new ModifyPokemon('Gothorita', this)
			.types
				.setType('Cosmic', 'Dark');

		// LC
		new ModifyPokemon('Elgyem', this)
			.types
				.setType('Cosmic');
		new ModifyPokemon('Gothita', this)
			.types
				.setType('Cosmic', 'Dark');

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
		new ModifyPokemon('Hoopa', this)
			.types
				.setType('Cosmic', 'Ghost')
			.pokemon.learnset
				.add('Lunar Dance')
				.add('Stardust Trail')
				.add('Astro Force')
				.add('Vacuum Wave');
		new ModifyPokemon('Hoopa-Unbound', this)
			.types
				.setType('Cosmic', 'Dark')
			.pokemon.learnset
				.add('Lunar Dance')
				.add('Stardust Trail')
				.add('Astro Force')
				.add('Vacuum Wave');

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

		// FE
		new ModifyPokemon('Comfey', this)
			.abilities
				.setAbility0('Aroma Veil');
		new ModifyPokemon('Lunala', this)
			.types
				.setType('Cosmic', 'Ghost')
			.pokemon.learnset
				.add('Lunar Tides')
				.add('Lunar Dance');
		new ModifyPokemon('Minior', this)
			.types
				.setType('Rock', 'Cosmic')
			.pokemon.learnset
				.add('Lunar Dance')
				.add('Meteor Assault')
				.add('Stardust Trail');
		new ModifyPokemon('Necrozma', this)
			.types
				.setType('Cosmic')
			.pokemon.learnset
				.add('Lunar Dance')
				.add('Swift')
				.add('Vacuum Wave')
				.add('Astro Force')
				.add('Stardust Trail');
		new ModifyPokemon('Nihilego', this)
			.types
				.setType('Cosmic', 'Poison')
			.pokemon.learnset
				.add('Lunar Dance')
				.add('Moonblast')
				.add('Vacuum Wave')
				.add('Swift')
				.add('Gravity')
				.add('Stardust Trail');
		new ModifyPokemon('Passimian', this)
			.learnset
				.add('High Jump Kick')
				.add('Rolling Kick');
		new ModifyPokemon('Solgaleo', this)
			.types
				.setType('Cosmic', 'Psychic') // Subject to change
			.pokemon.learnset
				.add('Lunar Dance')
				.add('Solar Flare');

		// NFE
		new ModifyPokemon('Cosmoem', this)
			.types
				.setType('Cosmic');

		// LC
		new ModifyPokemon('Cosmog', this)
			.types
				.setType('Cosmic');

		//#endregion

		//#region Gen 8

		// FE
		new ModifyPokemon('Boltund', this)
			.learnset
				.add('Supercell Slam')
				.add('Zing Zap')
				.remove('Bolt Strike')
				.remove('Volt Tackle');
		new ModifyPokemon('Dracozolt', this)
			.learnset
				.add('Supercell Slam');
		new ModifyPokemon('Eternatus', this)
			.types
				.setType('Poison', 'Cosmic')
			.pokemon.learnset
				.add('Lunar Dance');
		new ModifyPokemon('Inteleon', this)
			.learnset
				.remove('Hydro Steam');
		new ModifyPokemon('Orbeetle', this)
			.types
				.setType('Bug', 'Cosmic')
			.pokemon.learnset
				.add('Lunar Dance')
				.add('Swift')
				.add('Gravity')
				.add('Signal Beam')
				.add('Vacuum Wave')
				.add('Moonblast');

		// NFE
		new ModifyPokemon('Dottler', this)
			.types
				.setType('Bug', 'Cosmic');

		//#endregion

		//#region Gen 9

		// FE
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
		new ModifyPokemon('Espathra', this)
			.types
				.setType('Cosmic')
			.pokemon.learnset
				.add('Lunar Dance');
		new ModifyPokemon('FlutterMane', this)
			.baseStats
				.setHP(69)
				.setATK(69)
				.setDEF(69)
				.setSPA(121)
				.setSPD(121)
				.setSPE(121);
		new ModifyPokemon('IronMoth', this)
			.types
				.setType('Fire', 'Cosmic')
			.pokemon.learnset
				.add('Solar Flare')
				.add('Swift')
				.add('Lunar Dance');
		new ModifyPokemon('Palafin-Hero', this)
			.types
				.setType('Water', 'Cosmic')
			.pokemon.learnset
				.add('Astro Force')
				.add('Lunar Tides')
				.add('Stardust Trail')
				.add('Lunar Dance');
		new ModifyPokemon('SlitherWing', this)
			.baseStats
				.setSPA(59)
				.setSPE(87);
		new ModifyPokemon('RoaringMoon', this)
			.baseStats
				.setATK(135)
				.setSPE(113);
		new ModifyPokemon('Terapagos', this)
			.types
				.setType('Normal', 'Cosmic');

		// NFE
		new ModifyPokemon('Flittle', this)
			.types
				.setType('Cosmic');

		//#endregion

		//#region TTC Fakemons

		new ModifyPokemon('Akumu', this)
			.abilities
				.setAbility0('Grave Counter')
			.pokemon.learnset
				.add('Sheer Cold')
				.add('Encore')
				.add('Taunt');
		new ModifyPokemon('Cerinyx', this)
			.types
				.setType('Cosmic', 'Dark')
			.pokemon.learnset
				.add('Astro Force')
				.add('Swift');
		new ModifyPokemon('Crustocean', this)
			.learnset
				.add('Amnesia')
				.add('Grassy Terrain')
				.add('Spikes');
		new ModifyPokemon('Jirachi-NorthStar', this)
			.types
				.setType('Ice', 'Cosmic')
			.pokemon.learnset
				.add('Stardust Trail')
				.add('Lunar Dance')
				.add('Swift');
		new ModifyPokemon('Farfetchd-Mega', this)
			.baseStats
				.setDEF(84)
				.setSPD(84)
				.setSPE(113);

		//#endregion

		//#endregion
		//#endregion
	
		//#region Basic Move Changes
		
		//#region Physical Moves

		new ModifyMove('Ceaseless Edge', this)
			.setBasePower(60);
		new ModifyMove('Comet Punch', this)
			.setType('Cosmic');
		new ModifyMove('Cut', this)
			.setAccuracy(95);
		new ModifyMove('Fire Fang', this)
			.setBasePower(70)
			.setAccuracy(95);
		new ModifyMove('Hyperspace Fury', this)
			.setType('Cosmic');
		new ModifyMove('Ice Fang', this)
			.setBasePower(70)
			.setAccuracy(95);
		new ModifyMove('Jet Punch', this)
			.setType('Cosmic');
		// new ModifyMove('Leak Lunge', this)
		// 	.setBasePower(65);
		new ModifyMove('Lunge', this)
			.setAccuracy(95);
		new ModifyMove('Meteor Assault', this)
			.setType('Cosmic')
			.setRecoil([1, 2]);
		new ModifyMove('Meteor Mash', this)
			.setType('Cosmic');
		new ModifyMove('Skitter Smack', this)
			.setBasePower(80)
			.setAccuracy(95);
		new ModifyMove('Sunsteel Strike', this)
			.setType('Cosmic');
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

		new ModifyMove('Doom Desire', this)
			.setType('Cosmic');
		new ModifyMove('Dynamax Cannon', this)
			.setType('Cosmic');
		new ModifyMove('Ecliptic Punishment', this)
			.setType('Cosmic');
		new ModifyMove('Eternabeam', this)
			.setType('Cosmic')
			.flags
				.add('cantusetwice')
			.move.setBasePower(145)
			.descriptions
				.setLongDesc()
				.setShortDesc("Can't be used 2 times in a row.");
		new ModifyMove('Hyperspace Hole', this)
			.setType('Cosmic')
			.setBasePower(85);
		new ModifyMove('Lumina Crash', this)
			.setType('Cosmic')
			.setBasePower(70);
		new ModifyMove('Meteor Beam', this)
			.setType('Cosmic');
		new ModifyMove('Moonblast', this)
			.setType('Cosmic');
		new ModifyMove('Moongeist Beam', this)
			.setType('Cosmic');
		new ModifyMove('Photon Geyser', this)
			.setType('Cosmic');
		new ModifyMove('Prismatic Laser', this)
			.setType('Cosmic')
			.flags
				.add('cantusetwice')
			.move.setBasePower(145);
		new ModifyMove('Signal Beam', this)
			.setType('Cosmic');
		new ModifyMove('Swift', this)
			.setType('Cosmic');
		new ModifyMove('Tera Starstorm', this)
			.setType('Cosmic');
		new ModifyMove('Vacuum Wave', this)
			.setType('Cosmic')
			.setOverrideDefensiveStat('def')
			.setBasePower(70)
			.setPriority(0)
			.descriptions
				.setLongDesc()
				.setShortDesc('Damage Target based on Defense');

		//#endregion

		//#region Status Moves

		new ModifyMove('Cosmic Power', this)
			.setType('Cosmic')
			.setPowerPoint(8);
		new ModifyMove('Gravity', this)
			.setType('Cosmic');
		new ModifyMove('Lunar Blessing', this)
			.setType('Cosmic');
		new ModifyMove('Lunar Dance', this)
			.setType('Cosmic');
		new ModifyMove('Moonlight', this)
			.setType('Cosmic');
		new ModifyMove('Morning Sun', this)
			.setType('Cosmic');
		new ModifyMove('Wish', this)
			.setType('Cosmic');
		//#endregion
		
		
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