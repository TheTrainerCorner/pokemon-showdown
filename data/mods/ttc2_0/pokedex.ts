export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	inteleon: {
		inherit: true,
		otherFormes: ["Inteleon-Mega"],
		formeOrder: ["Inteleon", "Inteleon-Mega"],
	},
	inteleonmega: {
		num: 818,
		name: "Inteleon-Mega",
		baseSpecies: "Inteleon",
		forme: "Mega",
		types: ["Water"],
		baseStats: {hp: 70, atk: 105, def: 85, spa: 151, spd: 95, spe: 134},
		abilities: {0: "Sniper"},
		heightm: 3,
		weightkg: 0,
		color: "Blue",
		eggGroups: ["Water 1", "Field"],
		requiredItem: "Inteleonite",
	}
};
