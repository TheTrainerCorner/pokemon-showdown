import { ModifyPokemon } from "../../../tools/utils/modifyPokemon";

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen9ttc',
	init() {
		// #region 2.0.0
		// Modify Pokemon
		// Gen 1
		new ModifyPokemon('Venusaur', this)
			.baseStats
				.setDEF(83)
				.setSPA(100);
		new ModifyPokemon('Venusaur-Mega', this)
			.baseStats
				.setHP(90);
		new ModifyPokemon('Beedrill', this)
			.baseStats
				.setATK(110)
			.pokemon.learnset
				.add('Barb Barrage');
		new ModifyPokemon('Beedrill-Mega', this)
			.baseStats
				.setDEF(50)
				.setSPA(20)
				.setSPD(90);
		new ModifyPokemon('Pidgeot', this)
			.baseStats
				.setATK(90)
				.setSPA(95)
			.pokemon.learnset
				.add('Aeroblast');
		new ModifyPokemon('Pidgeot-Mega', this)
			.baseStats
				.setATK(100)
				.setDEF(90)
				.setSPE(131);
		new ModifyPokemon('Fearow', this)
			.abilities
				.setAbility1('Big Pecks')
			.pokemon.baseStats
				.setDEF(65)
				.setSPD(61)
			.pokemon.learnset
				.add('Torment')
				.add('Knock Off');
		new ModifyPokemon('Sandslash-Alola', this)
			.abilities
				.setAbility1('Battle Armor')
			.pokemon.baseStats
				.setHP(85)
				.setATK(105)
			.pokemon.learnset
				.add('Spin Out');
		new ModifyPokemon('Ninetales', this)
			.baseStats
				.setHP(83)
				.setATK(67)
				.setDEF(85)
				.setSPD(110)
				.setSPE(109)
			.pokemon.learnset
				.add('Nasty Plot')
				.add('Infernal Parade', 9);
		new ModifyPokemon('Venomoth', this)
			.abilities
				.setHiddenAbility('Toxic Chain')
			.pokemon.baseStats
				.setDEF(70)
				.setSPA(100)
			.pokemon.learnset
				.add('Pollen Puff')
				.add('Sludge Wave')
				.add('Toxic Thread')
				.remove('Sleep Powder');
		new ModifyPokemon('Rapidash', this)
			.baseStats
				.setATK(105)
			.pokemon.learnset
				.add('Blazing Torque', 9);
		new ModifyPokemon('Rapidash-Galar', this)
			.baseStats
				.setATK(60)
				.setSPA(105)
			.pokemon.learnset
				.remove('Cosmic Power');
		new ModifyPokemon('Muk', this)
			.baseStats
				.setATK(105)
				.setDEF(85);
		new ModifyPokemon('Muk-Alola', this)
			.baseStats
				.setHP(95);
		new ModifyPokemon('Gengar-Mega', this)
			.baseStats
				.setHP(60)
				.setATK(95);
		new ModifyPokemon('Hypno', this)
			.baseStats
				.setSPE(77);
		new ModifyPokemon('Electrode', this)
			.baseStats
				.setHP(80)
				.setDEF(80);
		new ModifyPokemon('Electrode-Hisui', this)
			.baseStats
				.setSPA(100)
				.setSPE(150);
		new ModifyPokemon('Rhydon', this)
			.abilities
				.setAbility0('Sap Sipper')
			.pokemon.baseStats
				.setHP(95)
				.setATK(120)
				.setDEF(110)
				.setSPD(50);
		new ModifyPokemon('Rhyperior', this)
			.types
				.setType('Ground', 'Steel')
			.pokemon.abilities
				.setAbility0('Overcoat')
			.pokemon.baseStats
				.setHP(125)
				.setATK(150)
				.setDEF(140)
				.setSPD(60)
			.pokemon.learnset
				.add('Crag Blast');
		new ModifyPokemon('Kangaskhan', this)
			.learnset
				.add('Crush Grip')
				.add('Close Combat');
		new ModifyPokemon('Kangaskhan-Mega', this)
			.abilities
				.setAbility0('Adaptability');
		new ModifyPokemon('Kingdra', this)
			.learnset
				.remove('Origin Pulse');
		new ModifyPokemon('Seaking', this)
			.baseStats
				.setSPE(68);
		new ModifyPokemon('Starmie', this)
			.abilities
				.setAbility0('Illuminate');
		new ModifyPokemon('MrMime', this)
			.abilities
				.setAbility0('Screen Cleaner');
		new ModifyPokemon('Gyarados', this)
			.learnset
				.add('Dual Chop')
				.add('Dragon Rush');
		new ModifyPokemon('Jolteon', this)
			.abilities
				.setAbility1('Illuminate');
		// Gen 2
		new ModifyPokemon('Qwilfish', this)
			.abilities
				.setAbility1('Toxic Debris');
		
		new ModifyPokemon('Magcargo', this)
			.abilities
				.setAbility0('Magma Armor');

		new ModifyPokemon('Corsola', this)
			.learnset
				.add('Salt Cure');
		
		new ModifyPokemon('Houndoom', this)
			.abilities
				.setAbility0('Ball Fetch');
		
		new ModifyPokemon('Houndoom-Mega', this)
			.baseStats
				.setSPE(120);
		
		new ModifyPokemon('Suicune', this);

		// Gen 3

		new ModifyPokemon('Sceptile-Mega', this)
			.baseStats
				.setDEF(80)
				.setSPD(90);
		
		new ModifyPokemon('Blaziken-Mega', this)
			.baseStats
				.setATK(150)
				.setDEF(85)
				.setSPA(135)
				.setSPD(85)
				.setSPE(95);
		
		new ModifyPokemon('Mightyena', this)
			.abilities
				.setAbility1('Ball Fetch');
		
		new ModifyPokemon('Delcatty', this)
			.abilities
				.setAbility0('Pickup');
		
		new ModifyPokemon('Sableye-Mega', this)
			.baseStats
				.setSPE(40);
		// Modify Moves
		// Removed Photon Geyser to test
		const lightMoves = ['Dazzling Gleam', 'Freezing Glare', 'Light of Ruin', 'Charge Beam', 'Prismatic Laser'];
		for(const move of lightMoves) {
			console.log(move);
			this.modData('Moves', move.includes(' ') ? move.toLowerCase().replace(' ', '') : move.toLowerCase()).flags['light'] = 1;
		}
		const weightMoves = ['Grass Knot', 'Heavy Slam'];
		for(const move of weightMoves) {
			this.modData('Moves', move.includes(' ') ? move.toLowerCase().replace(' ', '') : move.toLowerCase()).flags['weight'] = 1;
		}
		const peckMoves = ['Peck', 'Pluck', 'Drill Peck', 'Beak Blast'];
		for (const move of peckMoves) {
			this.modData('Moves', move.includes(' ') ? move.toLowerCase().replace(' ', '') : move.toLowerCase()).flags['peck'] = 1;
		}
		const disableMoves = ['Taunt', 'Imprison'];
		for (const move of disableMoves) {
			this.modData('Moves', move.includes(' ') ? move.toLowerCase().replace(' ', '') : move.toLowerCase()).flags['disable'] = 1;
		}
		// #endregion
	},
};
