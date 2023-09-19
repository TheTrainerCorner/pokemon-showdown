export const Scripts: ModdedBattleScriptsData = {
	inherit: 'ttc1_1',
	init() {
		// This folder shouldn't be touched. It is only used to direct the pointers to the correct place.
		this.modData('FormatsData', 'kingambit').natDexTier = 'OU';
		this.modData('FormatsData', 'blastoisemega').natDexTier = 'OU';
		this.modData('FormatsData', 'ursaluna').natDexTier = 'OU';
	},
};
