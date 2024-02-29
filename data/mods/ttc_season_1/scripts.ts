import {ModifyPokemon, modifyDex} from '../../../tools/utils/modifyPokemon';
export const Scripts: ModdedBattleScriptsData = {
	inherit: 'ttc_base',
	init() {
		// #region 1.1.1
		// Modify Pokemon
		new ModifyPokemon('noivern', this)
			.abilities
			.setHiddenAbility('Rattled')
			.pokemon.baseStats
			.setSPE(116);

		new ModifyPokemon('alakazam', this)
			.learnset
			.remove('Nasty Plot');

		new ModifyPokemon('Girafarig', this)
			.abilities
				.setAbility0('Sap Sipper');

		new ModifyPokemon('Morpeko-Hangry', this)
			.baseStats
				.setATK(115);

		new ModifyPokemon('Sawsbuck', this)
			.learnset
				.add("Swords Dance")
				.add("Grassy Glide")
				.add('High Horsepower');

		new ModifyPokemon('Sawsbuck-Summer', this)
			.learnset
				.add("Swords Dance")
				.add("Grassy Glide")
				.add('High Horsepower');

		new ModifyPokemon('Sawsbuck-Winter', this)
			.learnset
				.add("Swords Dance")
				.add("Grassy Glide")
				.add('High Horsepower');

		new ModifyPokemon('Sawsbuck-Autumn', this)
			.learnset
				.add("Swords Dance")
				.add("Grassy Glide")
				.add('High Horsepower');

		// #endregion
		// #region Changing Tiers
		this.modData('FormatsData', 'kingambit').natDexTier = 'OU';
		this.modData('FormatsData', 'blastoisemega').natDexTier = 'OU';
		this.modData('FormatsData', 'ursaluna').natDexTier = 'OU';
		this.modData('FormatsData', 'dragapult').natDexTier = 'OU';
		// #endregion

		//#region 1.1.2
		let ballMoves = [
			'electroball',
			'energyball',
			'gyroball',
			'iceball',
			'mistball',
			'pyroball',
			'shadowball',
			'weatherball',
		];
		for(let move of ballMoves) {
			this.modData('Moves', move).flags.bullet = 1;
		}
		//#endregion
		//#region Season 1 Donations
		// Flam - $15 donation
		new ModifyPokemon('Altaria', this)
			.types
				.setType('Dragon', 'Fairy')
			.pokemon.abilities
				.setAbility1('Levitate')
				.setHiddenAbility('Fluffy')
			.pokemon.baseStats
				.setATK(45)
				.setDEF(105)
				.setSPA(110)
				.setSPD(110)
				.setSPE(85)
			.pokemon.learnset
				.add('Thunderbolt');
		// Ainka - $50 donation
		new ModifyPokemon('Minior', this)
			.baseStats
				.setATK(110)
				.setDEF(50)
				.setSPA(110)
				.setSPD(50)
			.pokemon.learnset
				.remove('Shell Smash')
				.add('Wish')
				.add('Lunar Blessing')
				.add('Memento')
				.add('Moonlight')
				.add('Work Up')
				.add('Flare Blitz')
				.add('Flame Charge')
				.add('Burn Up')
				.add('Parting Shot')
				.add('Diamond Storm')
				.add('Spikes')
				.add('Encore')
				.add('Stored Power');
		new ModifyPokemon('Minior-Meteor', this)
			.baseStats
				.setDEF(120)
				.setSPD(120)
				.setSPE(80);

		// Apollo Chaoz
		//#region Sychronoise
		const addToPokemon = [
			'mew',
			'jirachi',
			'meloetta',
			'mesprit',
			'uxie',
			'azelf',
			'calyrex',
			'zoroark',
			'espeon',
			'lucario',
			'ralts',
			'kirlia',
			'gardevoir',
			'gallade',
			'girafarig',
			'psyduck',
			'golduck',
			'hoothoot',
			'noctowl',
			'whismur',
			'loudred',
			'exploud',
			'natu',
			'xatu',
			'kecleon',
			'chimecho',
			'chatot',
			'munna',
			'musharna',
			'sigilyph',
			'woobat',
			'swoobat',
			'elgyem',
			'beheeyem',
			'gothita',
			'gothitelle',
			'gothorita',
		];

		for (const pokemon of addToPokemon) {
			this.modData('Learnsets', pokemon).learnset['synchronise'] = ['9M'];
		}
		//#endregion
		new ModifyPokemon('Shaymin', this)
			.types
				.setType('Grass', 'Fairy')
			.pokemon.abilities
				.setAbility1('Sap Sipper')
				.setHiddenAbility('Misty Surge')
			.pokemon.baseStats
				.setHP(120)
				.setATK(80)
				.setDEF(105)
				.setSPA(90)
				.setSPD(115)
				.setSPE(90)
			.pokemon.learnset
				.add('Spikes')
				.add('Sappy Seed')
				.add('Moonblast')
				.add('Draining Kiss')
				.add('Charm')
				.add('Floral Healing')
				.add('Misty Terrain')
				.add('Spiky Shield')
				.add('Wish')
				.add('Encore');
	//#endregion
	},
};
