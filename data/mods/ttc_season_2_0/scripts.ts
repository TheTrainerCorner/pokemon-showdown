import { ModifyPokemon } from "../../../tools/utils/modifyPokemon";

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'ttc_season_1_2',
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
			new ModifyPokemon('Dugtrio', this)
				.baseStats
					.setSPE(135);
			new ModifyPokemon('Dugtrio-Alola', this)
				.baseStats
					.setSPE(120);
			new ModifyPokemon('Persian', this)
				.abilities
					.setHiddenAbility('Unnerve');
			new ModifyPokemon('Primeape', this)
				.abilities
					.setAbility1('Berserk')
				.pokemon.baseStats
					.setHP(75)
					.setDEF(70)
					.setSPD(80);
			new ModifyPokemon('Arcanine', this)
				.abilities
					.setAbility1('Ball Fetch');
			new ModifyPokemon('Alakazam', this)
				.abilities
					.setAbility0('Forewarn');
			new ModifyPokemon('Machamp', this)
				.baseStats
					.setHP(118)
					.setATK(145)
					.setDEF(100)
					.setSPA(75)
					.setSPE(67);
			new ModifyPokemon('Tentacruel', this)
				.abilities
					.setAbility0('Rain Dish');
			new ModifyPokemon('Rapidash', this)
				.baseStats
					.setATK(105)
				.pokemon.learnset
					.add('Blazing Torque');
			new ModifyPokemon('Rapidash-Galar', this)
				.baseStats
					.setATK(60)
					.setSPA(105)
				.pokemon.learnset
					.remove('Cosmic Power');
			new ModifyPokemon('Farfetchd', this)
				.abilities
					.setAbility1('Stalwart')
				.pokemon.baseStats
					.setDEF(72);
			new ModifyPokemon('Dodrio', this)
				.abilities
					.setAbility0('Tangled Feet');
			new ModifyPokemon('Dewgong', this)
				.abilities
					.setAbility1('Hydration');
			new ModifyPokemon('Muk', this)
				.abilities
					.setHiddenAbility('Stench')
				.pokemon.baseStats
					.setATK(105)
					.setDEF(85);
			new ModifyPokemon('Muk-Alola', this)
				.baseStats
					.setHP(95);
			new ModifyPokemon('Gengar-Mega', this)
				.baseStats
					.setHP(60)
					.setATK(95)
			new ModifyPokemon('Hypno', this)
				.abilities
					.setAbility0('Forewarn')
				.pokemon.baseStats
					.setSPE(77);
			new ModifyPokemon('Electrode', this)
				.baseStats
					.setHP(80)
					.setDEF(80);
			new ModifyPokemon('Electrode-Hisui', this)
				.baseStats
					.setSPA(100)
					.setSPE(150);
			new ModifyPokemon('Exeggutor-Alola', this)
				.baseStats
					.setSPE(40);
			new ModifyPokemon('Marowak', this)
				.abilities
					.setHiddenAbility('Battle Armor')
				.pokemon.baseStats
					.setATK(90)
					.setDEF(115)
					.setSPE(45);
			new ModifyPokemon('Marowak-Alola', this)
				.baseStats
					.setDEF(110)
					.setSPA(50);
			new ModifyPokemon('Hitmonlee', this)
				.baseStats
					.setHP(80)
					.setATK(128)
					.setDEF(81)
					.setSPE(66);
			new ModifyPokemon('Hitmonchan', this)
				.baseStats
					.setATK(114)
					.setSPE(77);
			new ModifyPokemon('Hitmontop', this)
				.baseStats
					.setATK(107)
					.setSPE(88);
			new ModifyPokemon('Rhydon', this)
				.abilities
					.setAbility0('Sap Sipper')
				.pokemon.baseStats
					.setHP(95)
					.setATK(120)
					.setDEF(110)
					.setSPD(50)
				.pokemon.learnset
					.add('Headlong Rush')
					.add('Head Smash');
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
			new ModifyPokemon('Jynx', this)
				.abilities
					.setAbility0('Snow Cloak');
			new ModifyPokemon('Pinsir', this)
				.abilities
					.setAbility0('Berserk');
			new ModifyPokemon('Gyarados', this)
				.learnset
					.add('Dual Chop')
					.add('Dragon Rush');
			new ModifyPokemon('Jolteon', this)
				.abilities
					.setAbility1('Illuminate');
			new ModifyPokemon('Flareon', this)
				.abilities
					.setHiddenAbility('Turboblaze');
			new ModifyPokemon('Snorlax', this)
				.abilities
					.setAbility0('Toxic Boost');
			new ModifyPokemon('Articuno', this)
				.baseStats
					.setATK(60)
					.setSPD(135);
			new ModifyPokemon('Articuno-Galar', this)
				.baseStats
					.setDEF(90);
			new ModifyPokemon('Moltres', this)
				.baseStats
					.setATK(85)
					.setDEF(100)
					.setSPD(90);
			new ModifyPokemon('Zapdos', this)
				.baseStats
					.setDEF(90);
			new ModifyPokemon('Dragonite', this)
				.abilities
					.setAbility1('Stalwart')
				.pokemon.learnset
					.add('Sky Attack');
			// Gen 2
			new ModifyPokemon('Meganium', this)
				.baseStats
					.setSPA(100);
			new ModifyPokemon('Typhlosion', this)
				.baseStats
					.setATK(104)
					.setSPA(104)
					.setSPE(107);
			new ModifyPokemon('Furret', this)
				.abilities
					.setHiddenAbility('Run Away');
			new ModifyPokemon('Noctowl', this)
				.abilities
					.setAbility0('Early Bird');
			new ModifyPokemon('Ariados', this)
				.abilities
					.setAbility1('Toxic Chain');
			new ModifyPokemon('Xatu', this)
				.abilities
					.setAbility0('Forewarn');
			new ModifyPokemon('Bellossom', this)
				.abilities
					.setAbility1('Flower Veil')
				.pokemon.baseStats
					.setATK(60)
					.setSPE(70);
			new ModifyPokemon('Azumarill', this)
				.baseStats
					.setDEF(90)
					.setSPD(90);
			new ModifyPokemon('Jumpluff', this)
				.abilities
					.setAbility0('Leaf Guard');
			new ModifyPokemon('Sunflora', this)
				.baseStats
					.setSPA(130)
					.setSPE(68);
			new ModifyPokemon('Murkrow', this)
				.abilities
					.setAbility0('Early Bird');
			new ModifyPokemon('Mismagius', this)
				.baseStats
					.setSPE(105);
			new ModifyPokemon('Wobbuffet', this)
				.baseStats
					.setDEF(70)
					.setSPA(34)
					.setSPD(70);
			new ModifyPokemon('Girafarig', this)
				.baseStats
					.setSPE(99);
			new ModifyPokemon('Granbull', this)
				.baseStats
					.setSPE(86);
			new ModifyPokemon('Qwilfish', this)
				.abilities
					.setAbility1('Toxic Debris');
			new ModifyPokemon('Magcargo', this)
				.abilities
					.setAbility0('Magma Armor');
			new ModifyPokemon('Corsola', this)
				.baseStats
					.setHP(85)
					.setSPE(35)
				.pokemon.learnset
					.add('Salt Cure');
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
