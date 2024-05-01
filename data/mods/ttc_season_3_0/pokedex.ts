export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	meowthmega: {
		num: -3001,
		name: "Meowth-Mega",
		baseSpecies: "Meowth",
		forme: "Mega",
		types: ["Normal", "Psychic"],
		baseStats: {hp: 40, atk: 115, def: 75, spa: 110, spd: 70, spe: 160},
		abilities: {0: "Hail The Coin"},
		heightm: 0.4,
		weightkg: 4.2,
		eggGroups: ["Field"],
		requiredItem: "Meowthite",
	},
	eeveemega: {
		num: -3002,
		name: "Eevee-Mega",
		baseSpecies: "Eevee-Starter",
		forme: "Mega",
		types: ["Normal"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 55, atk: 108, def: 105, spa: 108, spd: 110, spe: 99},
		abilities: {0: "Gambler's Luck"},
		heightm: 0.3,
		weightkg: 6.5,
		eggGroups: ["Undiscovered"],
		requiredItem: "Eeveeite",
	},
};