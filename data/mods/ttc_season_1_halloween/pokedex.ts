export const Pokedex: {[speciesid: string]: ModdedSpeciesData} = {
	bulbick: {
		num: -1031,
		name: "Bulbick",
		types: ["Water", "Electric"],
		abilities: {0: "Dazzling", 1: "Illuminate", H: "Haunted Light"},
		baseStats: {hp: 60, atk: 25, def: 40, spa: 75, spd: 65, spe: 10},
		heightm: 0.3,
		weightkg: 3.1,
		color: "White",
		evos: ["Lampoct"],
		tags: ["Fakemon"],
		eggGroups: ["Amorphous"],
	},
	lampoct: {
		num: -1032,
		name: "Lampoct",
		types: ["Water", "Electric"],
		abilities: {0: "Dazzling", 1: "Illuminate", H: "Haunted Light"},
		baseStats: {hp: 70, atk: 40, def: 50, spa: 85, spd: 70, spe: 55},
		heightm: 0.6,
		weightkg: 13,
		color: "White",
		prevo: "Bulbick",
		evoLevel: 41,
		evos: ["Octolure"],
		tags: ["Fakemon"],
		eggGroups: ["Amorphous"],
	},
	octolure: {
		num: -1033,
		name: "Octolure",
		types: ["Water", "Electric"],
		abilities: {0: "Dazzling", 1: "Illuminate", H: "Haunted Light"},
		baseStats: {hp: 82, atk: 50, def: 62, spa: 150, spd: 84, spe: 92},
		heightm: 1,
		weightkg: 34.3,
		color: "White",
		prevo: "Lampoct",
		evoType: "useItem",
		evoItem: "Water Stone",
		tags: ["Fakemon"],
		eggGroups: ["Amorphous"],
	},
	gourgeist: {
		inherit: true,
		otherFormes: ["Gourgeist-Small", "Gourgeist-Large", "Gourgeist-Super", "Gourgeist-Mega"],
		formeOrder: ["Gourgeist", "Gourgeist-Small", "Gourgeist-Large", "Gourgeist-Super", "Gourgeist-Mega"],
	},
	gourgeistmega: {
		num: 0,
		name: "Gourgeist-Mega",
		baseSpecies: "Gourgeist",
		forme: "Mega",
		types: ["Grass", "Ghost"],
		gender: "N",
		baseStats: {hp: 65, atk: 100, def: 122, spa: 133, spd: 105, spe: 54},
		abilities: {0: "Eerie Cry"},
		heightm: 0.9,
		weightkg: 12.5,
		color: "Black",
		tags: ["Fakemon"],
		eggGroups: ["Undiscovered"],
		requiredItem: "Gourgeisite",
	}
}