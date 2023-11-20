import { ModifyPokemon } from "../../../tools/utils/modifyPokemon";

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'ttc1_2',
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
			new ModifyPokemon('Charizard', this)
				.baseStats
					.setSPE(101);
			new ModifyPokemon('Charizard-MegaX', this)
				.baseStats
					.setDEF(116)
					.setSPE(101);
			new ModifyPokemon('Charizard-MegaY', this)
				.baseStats
					.setDEF(83)
					.setSPE(106);
			new ModifyPokemon('Butterfree', this)
				.abilities
					.setAbility1('Field Support');
			new ModifyPokemon('Beedrill', this)
				.baseStats
					.setATK(125)
					.setDEF(45)
				.pokemon.learnset
					.add('Barb Barrage');
			new ModifyPokemon('Beedrill-Mega', this)
				.baseStats
					.setATK(155)
					.setDEF(55)
					.setSPA(20)
					.setSPD(100);
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
			new ModifyPokemon('Nidoking', this)
				.baseStats
					.setSPD(85)
					.setSPE(85);
			new ModifyPokemon('Nidoqueen', this)
				.baseStats
					.setSPA(101);
			new ModifyPokemon('Clefable', this)
				.abilities
					.setAbility0('Own Tempo');
			new ModifyPokemon('Ninetales', this)
				.baseStats
					.setHP(83)
					.setATK(67)
					.setDEF(85)
					.setSPD(110)
					.setSPE(109)
				.pokemon.learnset
					.add('Nasty Plot')
					.add('Infernal Parade');
			new ModifyPokemon('Crobat', this)
				.abilities
					.setAbility0('Unnerve')
				.pokemon.baseStats
					.setHP(90)
					.setATK(121)
					.setDEF(89)
					.setSPA(60)
					.setSPD(93)
					.setSPE(147);
			new ModifyPokemon('Vileplume', this)
				.abilities
					.setAbility0('Flower Veil')
				.pokemon.baseStats
					.setHP(85)
					.setDEF(95)
					.setSPD(100);
			new ModifyPokemon('Parasect', this)
				.abilities
					.setAbility1('Mycelium Might');
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
		// Modify Moves
		const lightMoves = ['Dazzling Gleam', 'Freezing Glare', 'LightofRuin', 'Photon Geyser', 'Charge Beam', 'Prismatic Laser'];
		for(const move of lightMoves) {
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
		const blastMoves = ['Aeroblast', 'Astral Barrage', 'Barb Barrage', 'Beak Blast', 'Chloroblast', 'Crag Blast', 'Population Bomb', 'Rock Blast', 'Seed Bomb', 'Sludge Bomb', 'Tera Blast', 'Barrage', 'Blast Burn', 'Egg Bomb', 'Magnet Bomb', 'Mud Bomb', 'Octazooka', 'Explosion', 'Self Destruct', 'Syrup Bomb', 'Techno Blast'];
		for (const move of blastMoves) {
			this.modData('Moves', move.includes(' ') ? move.toLowerCase().replace(' ', '') : move.toLowerCase()).flags['blast'] = 1;
		}
		const pivotMoves = ['uturn', 'flipturn', 'voltswitch', 'batonpass', 'partingshot'];
		for (const move of pivotMoves) {
			this.modData('Moves', move.includes(' ') ? move.toLowerCase().replace(' ', '') : move.toLowerCase()).flags['pivot'] = 1;
		}
		// #endregion
	},
};
