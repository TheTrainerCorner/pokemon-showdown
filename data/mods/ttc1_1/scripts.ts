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
		// #endregion
		// #region Changing Tiers
		this.modData('FormatsData', 'kingambit').natDexTier = 'OU';
		this.modData('FormatsData', 'blastoisemega').natDexTier = 'OU';
		this.modData('FormatsData', 'ursaluna').natDexTier = 'OU';
		// #endregion
	},
};
