import {ModifyPokemon} from "../../../tools/utils/modifyPokemon";

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'ttc1_0',
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
	},
};
