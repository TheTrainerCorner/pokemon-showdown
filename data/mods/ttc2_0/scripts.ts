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
		new ModifyPokemon('Charizard-MegaX', this)
			.baseStats
				.setDEF(116);
		new ModifyPokemon('Charizard-MegaY', this)
			.baseStats
				.setDEF(83);
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
				.add('Infernal Parade', 9);
		new ModifyPokemon('Crobat', this)
			.abilities
				.setAbility0('Inner Focus');
		new ModifyPokemon('Vileplume', this)
			.abilities
				.setAbility0('Flower Veil');
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
		new ModifyPokemon('Tentacruel', this)
			.abilities
				.setAbility0('Rain Dish');
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
		new ModifyPokemon('Dewgong', this)
			.abilities
				.setAbility1('Hydration');
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
		new ModifyPokemon('Marowak', this)
			.abilities
				.setHiddenAbility('Battle Armor');
		new ModifyPokemon('Hitmonlee', this)
			.baseStats
				.setSPE(66);
		new ModifyPokemon('Hitmonchan', this)
			.baseStats
				.setSPE(77);
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
		// Gen 2
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
				.setAbility1('Flower Veil');
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
		new ModifyPokemon('Entei', this)
			.baseStats
				.setDEF(100)
				.setSPA(85)
				.setSPD(85)
				.setSPE(100)
			.pokemon.learnset
				.remove('Eruption');
		new ModifyPokemon('Suicune', this);
		
		new ModifyPokemon('Raikou', this)
			.learnset
				.remove('Rising Voltage');
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
		new ModifyPokemon('Gardevoir', this)
			.abilities
				.setHiddenAbility('Aura Break');
		new ModifyPokemon('Delcatty', this)
			.abilities
				.setAbility0('Normalize');
		new ModifyPokemon('Sableye-Mega', this)
			.baseStats
				.setSPE(40);
		new ModifyPokemon('Mawile-Mega', this)
			.baseStats
				.setSPA(75);
		new ModifyPokemon('Medicham-Mega', this)
			.baseStats
				.setSPA(90)
				.setSPE(105);
		new ModifyPokemon('Manectric', this)
			.abilities
				.setHiddenAbility('Ball Fetch');
		new ModifyPokemon('Illumise', this)
			.baseStats
				.setATK(90);
		new ModifyPokemon('Roselia', this)
			.abilities
				.setAbility0('Flower Veil');
		new ModifyPokemon('Roserade', this)
			.abilities
				.setAbility0('Flower Veil');
		new ModifyPokemon('Camerupt-Mega', this)
			.baseStats
				.setHP(90);
		new ModifyPokemon('Cacturne', this)
			.abilities
				.setAbility1('Sand Veil');
		new ModifyPokemon('Seviper', this)
			.abilities
				.setAbility1('Cold-Blooded');
		new ModifyPokemon('Chimecho', this)
			.baseStats
				.setSPE(108);
		new ModifyPokemon('Whiscash', this)
			.abilities
				.setAbility1('Anticipation')
			.pokemon.baseStats
				.setATK(78)
				.setSPD(81)
				.setSPE(75);
		new ModifyPokemon('Absol-Mega', this)
			.baseStats
				.setSPA(125);
		new ModifyPokemon('Glalie-Mega', this)
			.baseStats
				.setDEF(80)
		new ModifyPokemon('Gorebyss', this)
			.baseStats
				.setSPD(85);
		new ModifyPokemon('Salamence-Mega', this)
			.baseStats
				.setATK(110)
				.setDEF(135)
				.setSPD(100)
				.setSPE(115);
		new ModifyPokemon('Metagross', this)
			.abilities
				.setHiddenAbility('Full Metal Body')
			.pokemon.baseStats
				.setSPA(70);
		new ModifyPokemon('Metagross-Mega', this)
			.baseStats
				.setATK(155)
				.setSPA(100)
				.setSPD(110);
		new ModifyPokemon('Latias-Mega', this)
			.baseStats
				.setATK(110)
				.setSPD(160);
		new ModifyPokemon('Latios-Mega', this)
			.baseStats
				.setATK(140)
				.setDEF(100);
		// Gen 4
		new ModifyPokemon('Bibarel', this)
			.baseStats
				.setHP(89)
				.setDEF(80)
				.setSPD(80);
		new ModifyPokemon('Rampardos', this)
			.abilities
				.setHiddenAbility('Mold Breaker');
		new ModifyPokemon('Ambipom', this)
			.abilities
				.setAbility1('Pickup');
		new ModifyPokemon('Drifblim', this)
			.abilities
				.setAbility0('Rocky Payload');
		new ModifyPokemon('Lopunny', this)
			.abilities
				.setHiddenAbility('Pickup');
		new ModifyPokemon('Lopunny-Mega', this)
			.baseStats
				.setATK(136)
				.setSPE(135);
		new ModifyPokemon('Purugly', this)
			.baseStats
				.setSPE(102);
		new ModifyPokemon('Skuntank', this)
			.abilities
				.setHiddenAbility('Power of Alchemy')
			.pokemon.baseStats
				.setSPE(74);
		new ModifyPokemon('Chatot', this);
		// Implemented in pokedex.ts
		new ModifyPokemon('Garchomp', this)
			.baseStats
				.setSPE(92);
		new ModifyPokemon('Garchomp-Mega', this)
			.baseStats
				.setDEF(110)
				.setSPD(90);
		new ModifyPokemon('Lucario', this)
			.abilities
				.setAbility0('Aura Break');
		new ModifyPokemon('Lucario-Mega', this)
			.baseStats
				.setATK(125)
				.setDEF(93)
				.setSPA(135)
				.setSPE(112);
		new ModifyPokemon('Lumineon', this)
			.learnset
				.add('Recover');
		new ModifyPokemon('Abomasnow', this)
			.abilities
				.setAbility1('Snow Cloak');
		new ModifyPokemon('Abomasnow-Mega', this)
			.baseStats
				.setATK(142)
				.setSPA(137)
				.setSPD(110)
				.setSPE(40);
		new ModifyPokemon('Magmortar', this)
			.abilities
				.setAbility1('Magma Armor');
		new ModifyPokemon('Mamoswine', this);
		new ModifyPokemon('Gallade', this)
			.baseStats
				.setATK(115)
				.setSPD(95)
				.setSPE(80);
		new ModifyPokemon('Gallade-Mega', this)
			.baseStats
				.setATK(135);
		new ModifyPokemon('Rotom-Heat', this)
			.baseStats
				.setHP(75);
		new ModifyPokemon('Rotom-Frost', this)
			.baseStats
				.setHP(70);
		new ModifyPokemon('Rotom-Fan', this)
			.learnset
				.remove('Boomburst');
		new ModifyPokemon('Uxie', this)
			.abilities
				.setHiddenAbility('Knowledge')
			.pokemon.baseStats
				.setHP(105)
				.setATK(60)
				.setSPA(100)
				.setSPE(75)
			.pokemon.learnset;
		new ModifyPokemon('Mesprit', this)
			.types
				.setType('Psychic', 'Fairy')
			.pokemon.abilities
				.setHiddenAbility('Emotion')
			.pokemon.baseStats
				.setATK(115)
				.setDEF(100)
				.setSPA(115)
				.setSPD(100)
				.setSPE(90)
			.pokemon.learnset;
		new ModifyPokemon('Azelf', this)
			.types
				.setType('Psychic', 'Fighting')
			.pokemon.abilities
				.setHiddenAbility('Willpower')
			.pokemon.baseStats
				.setATK(130)
				.setDEF(75)
				.setSPA(130)
				.setSPD(75)
			.pokemon.learnset
				.add('Focus Punch')
				.add('Focus Blast');
		// Gen 5
		new ModifyPokemon('Garbodor', this)
			.abilities
				.setAbility0('Toxic Debris');
		new ModifyPokemon('Swanna', this)
			.baseStats
				.setDEF(60)
				.setSPD(60);
		new ModifyPokemon('Cobalion', this)
			.abilities
				.setHiddenAbility('Inner Focus')
			.pokemon.baseStats
				.setATK(85)
				.setSPA(85);
		new ModifyPokemon('Terrakion', this)
			.abilities
				.setHiddenAbility('Rocky Payload')
			.pokemon.baseStats
				.setATK(129)
				.setDEF(90)
				.setSPD(90)
			.pokemon.learnset
				.add('Stone Axe');
		new ModifyPokemon('Virizion', this)
			.baseStats
				.setSPA(131)
				.setSPD(109);
		new ModifyPokemon('Keldeo', this)
			.baseStats
				.setATK(96)
				.setSPE(114);
		new ModifyPokemon('Keldeo-Resolute', this)
			.baseStats
				.setATK(96)
				.setSPE(114);
		// Gen 6
		new ModifyPokemon('Tyrantrum', this)
			.baseStats
				.setDEF(134)
				.setSPE(76);
		new ModifyPokemon('Aurorus', this)
			.baseStats
				.setHP(118)
				.setSPA(104)
				.setSPD(87);
		new ModifyPokemon('Hawlucha', this)
			.abilities
				.setHiddenAbility('Costar');
		new ModifyPokemon('Noivern', this)
			.abilities
				.setAbility0('Frisk')
				.setHiddenAbility('Delta Stream')
			.pokemon.baseStats
				.setSPA(97);
		new ModifyPokemon('Melmetal', this);
		// Gen 8

		// Gen 9
		new ModifyPokemon('Chi-Yu', this)
			.baseStats
				.setSPA(115);
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
