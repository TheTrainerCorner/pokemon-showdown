export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	infrochick: {
		num: -4001,
		name: "Infrochick",
		types: ["Fire"],
		genderRatio: {M:0.875, F: 0.125},
		baseStats: {hp: 35, atk: 35, def: 40, spa: 70, spd: 75, spe: 60},
		abilities: {0: "Blaze", H: "Early Bird"},
		heightm: 0.4,
		weightkg: 2.5,
		color: "Red",
		evos: ["Pyrogrif"],
		eggGroups: ["Field"],
		tags: ["Fakemon"],
	},
	pyrogrif: {
		num: -4002,
		name: "Pyrogrif",
		types: ["Fire", "Flying"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 65, atk: 55, def: 65, spa: 85, spd: 90, spe: 70},
		abilities: {0: "Blaze", H: "Early Bird"},
		heightm: 0.9,
		weightkg: 6,
		color: "Red",
		prevo: "Infrochick",
		evoLevel: 16,
		evos: ["Phextender"],
		eggGroups: ["Field"],
		tags: ["Fakemon"],
	},
	phextender: {
		num: -4003,
		name: "Phextender",
		types: ["Fire", "Cosmic"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 85, atk: 75, def: 75, spa: 100, spd: 115, spe: 85},
		abilities: {0: "Blaze", H: "Early Bird"},
		heightm: 1.9,
		weightkg: 17,
		color: "Red",
		prevo: "Pyrogrif",
		evoLevel: 36,
		eggGroups: ["Field"],
		tags: ["Fakemon"],
	},
	floralith: {
		num: -4004,
		name: "Floralith",
		types: ["Grass"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 80, atk: 55, def: 55, spa: 25, spd: 45, spe: 55},
		abilities: { 0: "Overgrow", H: "Gatherer's Bounty" },
		heightm: 0.4,
		weightkg: 9,
		color: "Green",
		evos: ["Harcrown"],
		tags: ["Fakemon"],
		eggGroups: ["Field"],
	},
	harcrown: {
		num: -4005,
		name: "Harcrown",
		types: ["Grass", "Fairy"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 115, atk: 75, def: 75, spa: 35, spd: 65, spe: 65},
		abilities: {0: "Overgrow", H: "Gatherer's Bounty"},
		heightm: 0.7,
		weightkg: 29,
		color: "Green",
		prevo: "Floralith",
		evoLevel: 16,
		evos: ["Demetrilith"],
		tags: ["Fakemon"],
		eggGroups: ['Field'],
	},
	demetrilith: {
		num: -4006,
		name: "Demetrilith",
		types: ["Grass", "Fairy"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 165, atk: 95, def: 95, spa: 45, spd: 70, spe: 65},
		abilities: {0: "Overgrow", H: "Gatherer's Bounty"},
		heightm: 1.6,
		weightkg: 90,
		color: "Green",
		prevo: "Harcrown",
		evoLevel: 36,
		tags: ["Fakemon"],
		eggGroups: ["Field"],
	},
	blubblin: {
		num: -4007,
		name: "Blubblin",
		types: ["Water"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 60, atk: 60, def: 40, spa: 60, spd: 70, spe: 25},
		abilities: {0: "Torrent", H: "Luminous Wrath"},
		heightm: 1.6,
		weightkg: 60,
		color: "Navy",
		evos: ["Whaluma"],
		tags: ["Fakemon"],
		eggGroups: ["Water 1"],
	},
	whaluma: {
		num: -4008,
		name: "Whaluma",
		types: ["Water", "Ghost"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 85, atk: 70, def: 65, spa: 80, spd: 105, spe: 25},
		abilities: {0: "Torrent", H: "Luminous Wrath"},
		heightm: 2.5,
		weightkg: 90,
		color: "Navy",
		prevo: "Blubblin",
		evoLevel: 16,
		evos: ["Echowalisp"],
		tags: ["Fakemon"],
		eggGroups: ["Water 1"],
	},
	echowhalisp: {
		num: -4009,
		name: "Echowhalisp",
		types: ["Water", "Ghost"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 103, atk: 95, def: 69, spa: 110, spd: 126, spe: 32},
		abilities: {0: "Torrent", H: "Luminous Wrath"},
		heightm: 13,
		weightkg: 120,
		color: "Navy",
		prevo: "Whaluma",
		evoLevel: 31,
		tags: ["Fakemon"],
		eggGroups: ["Water 1"],
	},
	scaleslash: {
		num: -4010,
		name: "Scaleslash",
		types: ["Ground", "Fairy"],
		baseStats: {hp: 95, atk: 115, def: 130, spa: 55, spd: 75, spe: 105},
		abilities: {0: "Rough Skin", H: "Spin Ability"},
		heightm: 1.9,
		weightkg: 46,
		color: "Orange",
		prevo: "Sandslash",
		evoType: "other",
		evoCondition: "Faint a dragon type pokemon and level-up",
		eggGroups: ["Field"],
		tags: ["Fakemon"],
	},
	ironexplorer: {
		num: -4011,
		name: "Iron Explorer",
		types: ['Cosmic', 'Ghost'],
		baseStats: { hp: 76, atk: 96, def: 94, spa: 116, spd: 54, spe: 144 },
		abilities: { 0: 'Quark Drive', H: 'Clear Body'},
		heightm: 3,
		weightkg: 50,
		color: "Green",
		tags: ['Fakemon', 'Paradox', "Has Back Sprite"],
		eggGroups: ["Undiscovered"],
	},
	tapupuaa: {
		num: -4012,
		name: "Tapu Pua'a",
		types: ["Dark", "Fairy"],
		gender: "N",
		baseStats: {hp: 70, atk: 115, def: 105, spa: 95, spd: 105, spe: 80},
		abilities: {0: "Calamity Surge", H: "Telepathy"},
		heightm: 1.9,
		weightkg: 45.5,
		eggGroups: ["Undiscovered"],
		color: "Gray",
		tags: ["Fakemon", "Sub-Legendary", "Has Back Sprite"]
	},
	tapunalo: {
		num: -4013,
		name: "Tapu Nalo",
		types: ["Bug", "Fairy"],
		gender: "N",
		baseStats: {hp: 70, atk: 85, def: 115, spa: 80, spd: 110, spe: 110},
		abilities: {0: "Myriad Surge", H: "Telepathy"},
		heightm: 1.9,
		weightkg: 21.5,
		color: "Green",
		tags: ["Fakemon", "Sub-Legendary", "Has Back Sprite"],
		eggGroups: ["Undiscovered"],
	},
	galaxeon: {
		num: -4014,
		name: "Galaxeon",
		types: ["Cosmic"],
		baseStats: {hp: 75, atk: 120, def: 110, spa: 95, spd: 75, spe: 65},
		abilities: {0: "Pressure", 1: "Forewarn", H: "Illuminate"},
		heightm: 1.2,
		weightkg: 32,
		color: "Purple",
		evoCondition: "SHOT UP IN SPACE",
		prevo: "Eevee",
		tags: ["Fakemon", 'Has Back Sprite'],
		eggGroups: ["Field"],
	},
	gogoatmega: {
		num: 673,
		name: "Gogoat-Mega",
		baseSpecies: "Gogoat",
		forme: "Mega",
		types: ["Grass", "Cosmic"],
		baseStats: {hp: 123, atk: 100, def: 62, spa: 97, spd: 81, spe: 68},
		abilities: {0: "Sap Sipper"},
		heightm: 1.7,
		weightkg: 91,
		color: "Teal",
		eggGroups: ["Field"],
		requiredItem: "Gogoatite",
		tags: ["Fakemon", "Has Back Sprite"],
	},
	pachirisumega: {
		num: 417,
		name: "Pachirisu-Mega",
		baseSpecies: "Pachirisu",
		forme: "Mega",
		types: ["Electric", "Cosmic"],
		baseStats: {hp: 60, atk: 45, def: 70, spa: 45, spd: 90, spe: 95},
		abilities: {0: "Volt Absorb"},
		heightm: 0.4,
		weightkg: 3.9,
		color: "White",
		eggGroups: ["Field", "Fairy"],
		requiredItem: "Pachirisite",
		tags: ["Fakemon", "Has Back Sprite"],
	},

};