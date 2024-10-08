export const Abilities: {[k: string]: ModdedAbilityData} = {
	//#region Cosmic Abilities
	cosmicsurge: {
		onStart(source) {
			this.field.setTerrain("cosmicterrain");
		},
		name: "Cosmic Surge",
		rating: 4,
		num: -4001,
		desc: "On Switch-In, starts Cosmic Terrain.",
		shortDesc: 'On switch-in, starts Cosmic Terrain.',
	},
	//#endregion
};