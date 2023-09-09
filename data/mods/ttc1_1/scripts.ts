import { ModdedPokemon } from "../../../tools/utils/modifyPokemon";

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'ttc1_0',
	init() {
		//#region 1.1.1
		// Modify Pokemon
		let noivern = new ModdedPokemon('noivern', this);
		noivern.ability.setHiddenAbility('Rattled');
		noivern.baseStats.SPE = 116;
		//#endregion
	}
}