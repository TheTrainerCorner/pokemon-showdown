export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	//#region Megas
	meowthmega: { // TTC Staff
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
		tags: ["Fakemon", "Has Back Sprite"],
		tier: "OU",
		natDexTier: "OU",
		doublesTier: "DOU",
	},
	eeveemega: { // TTC Staff
		num: -3002,
		name: "Eevee-Mega",
		baseSpecies: "Eevee-Starter",
		forme: "Mega",
		types: ["Normal"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 65, atk: 118, def: 115, spa: 118, spd: 120, spe: 99},
		abilities: {0: "Gambler's Luck"},
		heightm: 0.3,
		weightkg: 6.5,
		eggGroups: ["Undiscovered"],
		requiredItem: "Eeveeite",
		tags: ["Fakemon", "Has Back Sprite"],
		tier: "OU",
		natDexTier: "OU",
		doublesTier: "DOU",
	},
	//#endregion

	//#region Firework Event

	goopli: { // PT333
		num: -3003,
		name: "Goopli",
		types: ["Fire"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 60, atk: 50, def: 35, spa: 54, spd: 70, spe: 21},
		abilities: {0: "Illuminate", 1: "Sticky Hold", H: "Liquid Ooze"},
		heightm: 0.2,
		weightkg: 10.0,
		eggGroups: ["Undiscovered"],
		evos: ["Slugoliath"],
		tags: ["Fakemon", "Has Back Sprite"],
		tier: "LC",
		natDexTier: "LC",
		doublesTier: "(DUU)",
	},
	slugoliath: { // PT333
		num: -3004,
		name: "Slugoliath",
		types: ["Fire", "Poison"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 90, atk: 90, def: 85, spa: 94, spd: 120, spe: 51},
		abilities: {0: "Lava Surfer", 1: "Sticky Hold", H: "Liquid Ooze"},
		heightm: 0.3,
		weightkg: 20.0,
		prevo: "Goopli",
		evoLevel: 34,
		eggGroups: ["Undiscovered"],
		tags: ["Fakemon", "Has Back Sprite"],
		tier: "OU",
		natDexTier: "OU",
		doublesTier: "DOU",
	},
	//#endregion

	//#region Beach Fakemon
	penquill: { // Skipprthepenguin
		num: -3005,
		name: "Penquill",
		types: ["Ground", "Water"],
		genderRatio: {M: 0.5, F: 0.5},
		baseStats: {hp: 85, atk: 125, def: 85, spa: 35, spd: 85, spe: 115}, 
		abilities: {0: "Belligerent Quills", 1: "Leg Day", H: "Infiltrator"}, 
		heightm: 0.8, 
		weightkg: 12,  
		eggGroups: ["Field", "Water1"], 
		tags: ["Fakemon", "Has Back Sprite"],
		tier: "OU",
		natDexTier: "OU",
		doublesTier: "DOU",
	},
	crustocean: { // Andy
		num: -3006,
		name: "Crustocean",
		types: ["Water", "Grass"],
		genderRatio:{M: 0.5, F: 0.5},
		baseStats: {hp: 125, atk: 105, def: 85, spa: 45, spd: 95, spe: 70}, 
		abilities: {0: "No Guard", 1: "Water Veil", H: "Clear Body"}, 
		heightm: 0.8, 
		weightkg: 20,  
		eggGroups: ["Water1"], 
		tags: ["Fakemon", "Has Back Sprite"],
		tier: "OU",
		natDexTier: "OU",
		doublesTier: "DOU",
	},

	//#endregion

	//#region Healthy Fakemons
	lickitunghisui: {
		num: -3014,
		name: "Lickitung-Hisui",
		forme: "Hisui",
		baseSpecies: "Lickitung",
		types: ["Dragon"],
		baseStats: {hp: 70, atk: 70, def: 65, spa: 45, spd: 65, spe: 70},
		abilities: {0: "Intimidate", 1: "Thick Fat", H: "Moxie"},
		heightm: 1.3,
		weightkg: 114,
		color: "Purple",
		evos: ["Lickitale"],
		eggGroups: ["Monster"],
		tags: ["Fakemon"],
	},
	lickitale: {
		num: -3015,
		name: "Lickitale",
		types: ["Dragon", "Fairy"],
		baseStats: {hp: 90, atk: 117, def: 80, spa: 55, spd: 80, spe: 93},
		abilities: {0: "Intimidate", 1: "Thick Fat", H: "Moxie"},
		heightm: 1.8,
		weightkg: 165,
		color: "Purple",
		prevo: "Lickitung-Hisui",
		evoType: "levelMove",
		evoMove: "Dragon Rage",
		eggGroups: ["Monster"],
		tags: ["Fakemon"],
	},

	//#endregion

	//#region Champion Fakemon
	tyrannicalglutton: {
		num: -3013,
		name: "Tyrannical Glutton",
		types: ["Dark", "Poison"],
		gender: "N",
		baseStats: {hp: 143, atk: 83, def: 101, spa: 101, spd: 101, spe: 51},
		abilities: {0: "Protosynthesis", H: "Sweet Tooth"},
		heightm: 1.2,
		weightkg: 100,
		color: "Pink",
		tags: ["Fakemon", "Paradox"],
		eggGroups: ["Undiscovered"],
	},
	//#endregion

	//#region Staff Additions
	wishiwashisoulless: {
		num: -3007,
		name: "Wishiwashi-Soulless",
		types: ["Ghost", "Dark"],
		genderRatio: {M: 0.5, F: 0.5},
		baseStats: {hp: 45, atk: 15, def: 15, spa: 25, spd: 15, spe: 60},
		abilities: {0: "Vengeful Desire"},
		heightm: 0.2,
		weightkg: 0.3,
		color: "Gray",
		eggGroups: ["Water 2"],
		otherFormes: ["Wishiwashi-Resentful"],
		formeOrder: ["Wishiwashi-Soulless", "Wishiwashi-Resentful"],
		tags: ["Fakemon"],
		tier: "LC",
		natDexTier: "LC",
		doublesTier: "LC",
	},
	wishiwashiresentful: {
		num: -3007,
		name: "Wishiwashi-Resentful",
		baseSpecies: "Wishiwashi-Soulless",
		forme: "Resentful",
		types: ["Ghost", "Dark"],
		baseStats: {hp: 85, atk: 110, def: 100, spa: 130, spd: 120, spe: 75},
		abilities: {0: "Vengeful Desire"},
		heightm: 8.2,
		weightkg: 78.6,
		color: "Gray",
		eggGroups: ["Water 2"],
		requiredAbility: "Vengeful Desire",
		battleOnly: "Wishiwashi-Soulless",
		tags: ["Fakemon"],
		tier: "OU",
		natDexTier: "OU",
		doublesTier: "DOU",
	},
	empoleonmega: {
		num: 395,
		name: "Empoleon-Mega",
		baseSpecies: "Empoleon",
		forme: "Mega",
		types: ["Water", "Steel"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 84, atk: 101, def: 104, spa: 141, spd: 121, spe: 94},
		abilities: {0: "Emperor's Command"},
		heightm: 1.8,
		weightkg: 90.5,
		color: "Blue",
		eggGroups: ["Water 1", "Field"],
		tags: ["Fakemon"],
		requiredItem: "Empoleonite",
		tier: "OU",
		natDexTier: "OU",
		doublesTier: "DOU",
	},
	pangoromega: {
		num: 675,
		name: "Pangoro-Mega",
		baseSpecies: "Pangoro",
		forme: "Mega",
		types: ["Dark", "Fighting"],
		baseStats: {hp: 95, atk: 154, def: 118, spa: 99, spd: 111, spe: 58},
		abilities: {0: "Pallesthesia"},
		heightm: 2.1,
		weightkg: 167,
		color: "White",
		eggGroups: ["Field", "Human-Like"],
		tags: ["Fakemon", "Has Back Sprite"],
		requiredItem: "Pangoroite",
		tier: "OU",
		natDexTier: "OU",
		doublesTier: "DOU",
	},
	akumu: {
		num: -3008,
		name: "Akumu",
		types: ["Normal", "Ghost"],
		baseStats: {hp: 105, atk: 115, def: 75, spa: 75, spd: 100, spe: 130}, 
		abilities: {0: "Prankster", 1: "Cursed Body", H: "Cloak Of Nightmares"}, 
		heightm: 1.3, 
		weightkg: 14.2,  
		tags: ["Mythical", 'Fakemon'],
		eggGroups: ["Undiscovered"],
		tier: "OU",
		natDexTier: "OU",
		doublesTier: "DOU",
	},
	nyomb: {
		num: -3009,
		name: "Nyomb",
		types: ["Steel"],
		baseStats: {hp: 45, atk: 30, def: 35, spa: 30, spd: 35, spe: 40}, 
		abilities: {0: "Iron Barbs", H: "Aftermath"}, 
		heightm: 0.15, 
		weightkg: 0.91,  
		tags: ['Fakemon'],
		evos: ["Gyrmeow"],
		eggGroups: ["Undiscovered"],
		tier: "LC",
		natDexTier: "LC",
		doublesTier: "(DUU)",
	},
	gyrmeow: {
		num: -3010,
		name: "Gyrmeow",
		types: ["Steel"],
		baseStats: {hp: 70, atk: 70, def: 60, spa: 70, spd: 55, spe: 65}, 
		abilities: {0: "Iron Barbs", H: "Aftermath"}, 
		heightm: 0.61, 
		weightkg: 27.22,  
		tags: ['Fakemon'],
		prevo: "Nyomb",		
		evos: ["Catinator"],
		eggGroups: ["Undiscovered"],
		tier: "NFE",
		natDexTier: "NFE",
		doublesTier: "(DUU)",
	},
	catinator: {
		num: -3011,
		name: "Catinator",
		types: ["Steel", "Fire"],
		baseStats: {hp: 110, atk: 105, def: 90, spa: 105, spd: 80, spe: 50}, 
		abilities: {0: "Iron Barbs", H: "Combustion"}, 
		heightm: 1.22, 
		weightkg: 249.48,  
		prevo: "Gyrmeow",	
		tags: ['Fakemon'],
		eggGroups: ["Undiscovered"],
		tier: "OU",
		natDexTier: "OU",
		doublesTier: "DOU",
	},
	cerinyx: {
		num: -3012,
		name: "Cerinyx",
		types: ["Psychic", "Dark"],
		baseStats: {hp: 86, atk: 131, def: 81, spa: 131, spd: 76, spe: 122}, 
		abilities: {0: "Dawn Of Lunacy", H: "Neuroforce"}, 
		heightm: 2.18, 
		weightkg: 699.5755,  
		tags: ['Fakemon', 'Has Back Sprite'],
		eggGroups: ["Undiscovered"],
		tier: "OU",
		natDexTier: "OU",
		doublesTier: "DOU",
	},
	magcoral: {
		num: -3013,
		name: "Magcoral",
		types: ["Water", "Rock"],
		baseStats: {hp: 80, atk: 50, def: 100, spa: 115, spd: 120, spe: 60},
		abilities: {0: "Sturdy", 1: "Water Absorb", H: "Primordial Sea"},
		heightm: 1,
		weightkg: 300,
		tags: ["Fakemon"],
		eggGroups: ["Water"],
		tier: "OU",
		natDexTier: "OU",
		doublesTier: "DOU",		
	},
	jaguaptic: {
		num: -3014,
		name: "Jaguaptic",
		types: ["Psychic", "Electric"],
		baseStats: {hp: 51, atk: 100, def: 60, spa: 120, spd: 65, spe: 124},
		abilities: {0: "All Seeing", 1: "Volt Absorb", H: "Quick Feet"},
		heightm: 0.75,
		weightkg: 60,
		tags: ["Fakemon"],
		eggGroups: ["Field"],
		tier: "OU",
		natDexTier: "OU",
		doublesTier: "DOU",		
	},
	//#endregion

	//#region Donation Pokemon
	plushadow: {
		num: -3015,
		name: "Plushadow",
		types: ["Ghost", "Normal"],
		gender: "N",
		baseStats: {hp: 90, atk: 58, def: 117, spa: 97, spd: 80, spe: 50},
		abilities: {0: "Phantasm", 1: "Cotton Down", H: "Cursed Body"},
		heightm: 0.2,
		weightkg: 0.9,
		color: "Gree",
		eggGroups: ["Amorphous"],
		tags: ["Fakemon"],
	},
	//#endregion
};