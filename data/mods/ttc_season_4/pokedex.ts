export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	infrochick: {
		// Data is reflecting off of Torchic
		// TODO Update data to reflect real data
		num: -4001,
		name: "Infrochick",
		types: ["Fire"],
		genderRatio: {M:0.875, F: 0.125},
		baseStats: {hp: 45, atk: 60, def: 40, spa: 70, spd: 50, spe: 45},
		abilities: {0: "Blaze", H: "Speed Boost"},
		heightm: 0.4,
		weightkg: 2.5,
		color: "Red",
		evos: ["Pyrogrif"],
		eggGroups: ["Field"],
		tags: ["Fakemon"],
	},
	pyrogrif: {
		// Data being reflected is mostly Combusken
		// TODO: Update data to reflect real data
		num: -4002,
		name: "Pyrogrif",
		types: ["Fire", "Flying"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 60, atk: 85, def: 60, spa: 85, spd: 60, spe: 55},
		abilities: {0: "Blaze", H: "Speed Boost"},
		heightm: 0.9,
		weightkg: 19.5,
		color: "Red",
		prevo: "Infrochick",
		evoLevel: 16,
		evos: ["Phextender"],
		eggGroups: ["Field"],
		tags: ["Fakemon"],
	},
	phextender: {
		// Data reflected is mostly blaziken
		// TODO: Update data to reflect real data
		num: -4003,
		name: "Phextender",
		types: ["Fire", "Flying"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 80, atk: 120, def: 70, spa: 110, spd: 70, spe: 80},
		abilities: {0: "Blaze", H: "Speed Boost"},
		heightm: 1.9,
		weightkg: 52,
		color: "Red",
		prevo: "Pyrogrif",
		evoLevel: 36,
		eggGroups: ["Field"],
		tags: ["Fakemon"],
	},
};