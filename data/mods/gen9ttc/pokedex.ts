import { stats } from '../../../server/chat-plugins/randombattles/winrates';
export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	venusaur: {
		inherit: true,
		baseStats: {hp: 90, atk: 77, def: 90, spa: 95, spd: 105, spe: 80},
	},
	charizard: {
		inherit: true,
		baseStats: {hp: 78, atk: 94, def: 78, spa: 109, spd: 85, spe: 105},
	},
	charizardmegax: {
		inherit: true,
		baseStats: {hp: 78, atk: 135, def: 111, spa: 130, spd: 85, spe: 105},
	},
	charizardmegay: {
		inherit: true,
		baseStats: {hp: 78, atk: 104, def: 78, spa: 159, spd: 115, spe: 110},
	},
	blastoise: {
		inherit: true,
		baseStats: {hp: 79, atk: 63, def: 120, spa: 85, spd: 105, spe: 78},
		abilities: {0: "Torrent", 1: "Shell Armor", H: "Rain Dish"},
	},
	butterfree: {
		inherit: true,
		types: ["Bug", "Psychic"],
		baseStats: {hp: 75, atk: 45, def: 75, spa: 100, spd: 100, spe: 50},
	},
	beedrill: {
		inherit: true,
		baseStats: {hp: 65, atk: 100, def: 40, spa: 20, spd: 80, spe: 105},
		abilities: {0: "Swarm", 1: "Merciless", H: "Sniper"},
	},
	pidgeot: {
		inherit: true,
		baseStats: {hp: 83, atk: 95, def: 85, spa: 80, spd: 70, spe: 96},
		abilities: {0: "Frisk", 1: "Early Bird", H: "Defiant"},
	},
	raticate: {
		inherit: true,
		baseStats: {hp: 65, atk: 96, def: 60, spa: 50, spd: 70, spe: 102},
		abilities: {0: "Strong Jaw", 1: "Guts", H: "Hustle"},
	},
	raticatealola: {
		inherit: true,
		baseStats: {hp: 100, atk: 90, def: 70, spa: 40, spd: 90, spe: 60},
		// FAT RAT O<O
		abilities: {0: "Gluttony", 1: "Cheek Pouch", H: "Thick Fat"},
	},
	fearow: {
		inherit: true,
		types: ["Dark", "Flying"],
		baseStats: {hp: 75, atk: 100, def: 55, spa: 61, spd: 51, spe: 105},
		abilities: {0: "Frisk", H: "Sniper"},
	},
	arbok: {
		inherit: true,
		baseStats: {hp: 80, atk: 95, def: 89, spa: 65, spd: 99, spe: 75},
		abilities: {0: "Intimidate", 1: "Shed Skin", H: "Strong Jaw"},
	},
	pikachu: {
		inherit: true,
		baseStats: {hp: 35, atk: 60, def: 40, spa: 60, spd: 50, spe: 100},
	},
	raichu: {
		inherit: true,
		baseStats: {hp: 60, atk: 100, def: 55, spa: 100, spd: 80, spe: 110},
		abilities: {0: "Static", 1: "Galvanize", H: "Lightning Rod"},
	},
	raichualola: {
		inherit: true,
		baseStats: {hp: 60, atk: 85, def: 50, spa: 105, spd: 85, spe: 110},
	},
	sandslash: {
		inherit: true,
		baseStats: {hp: 85, atk: 105, def: 110, spa: 45, spd: 75, spe: 65},
		abilities: {0: "Sand Veil", 1: "Rough Skin", H: "Sand Rush"},
	},
	sandslashalola: {
		inherit: true,
		abilities: {0: "Snow Cloak", 1: "Rough Skin", H: "Slush Rush"},
	},
	nidoqueen: {
		inherit: true,
		baseStats: {hp: 100, atk: 72, def: 87, spa: 95, spd: 95, spe: 60},
	},
	nidoking: {
		inherit: true,
		baseStats: {hp: 81, atk: 112, def: 77, spa: 75, spd: 75, spe: 95},
	},
	ninetales: {
		inherit: true,
		types: ["Fire", "Ghost"],
		baseStats: {hp: 73, atk: 76, def: 75, spa: 91, spd: 100, spe: 100},
		abilities: {0: "Flash Fire", 1: "Cursed Body", H: "Bad Dreams"},
	},
	ninetalesalola: {
		inherit: true,
		baseStats: {hp: 83, atk: 67, def: 85, spa: 81, spd: 110, spe: 109},
	},
	wigglytuff: {
		inherit: true,
		baseStats: {hp: 140, atk: 70, def: 55, spa: 85, spd: 60, spe: 55},
		abilities: {0: "Fluffy", 1: "Competitive", H: "Thick Fat"},
	},
	crobat: {
		inherit: true,
		abilities: {0: "Inner Focus", 1: "Infiltrator",  H: "Vampire"},
	},
	vileplume: {
		inherit: true,
		abilities: {0: "Lingering Aroma", 1: "Neutralizing Gas", H: "Effect Spore"},
	},
	parasect: {
		inherit: true,
		baseStats: {hp: 70, atk: 105, def: 100, spa: 60, spd: 80, spe: 55},
		abilities: {0: "Regenerator", 1: "Dry Skin", H: "Damp"},
	},
	venomoth: {
		inherit: true,
		abilities: {0: "Shield Dust", 1: "Tinted Lens", H: "Compound Eyes"},
	},
	dugtrio: {
		inherit: true,
		abilities: {0: "Sand Veil", 1: "Emergency Exit", H: "Sand Force"},
	},
	dugtrioalola: {
		inherit: true,
		baseStats: {hp: 35, atk: 105, def: 60, spa: 50, spd: 70, spe: 110},
		abilities: {0: "Emergency Exit", 1: "Tangling Hair", H: "Sand Force"},
	},
	persian: {
		inherit: true,
		baseStats: {hp: 65, atk: 90, def: 60, spa: 70, spd: 65, spe: 115},
		abilities: {0: "Limber", 1: "Technician", H: "Intimidate"},
	},
	persianalola: {
		inherit: true,
		baseStats: {hp: 65, atk: 65, def: 60, spa: 90, spd: 65, spe: 115},
		abilities: {0: "Fur Coat", 1: "Technician", H: "Prankster"},
	},
	golduck: {
		inherit: true,
		types: ["Water", "Psychic"],
		baseStats: {hp: 75, atk: 82, def: 73, spa: 100, spd: 80, spe: 85},
	},
	machamp: {
		inherit: true,
		baseStats: {hp: 100, atk: 130, def: 90, spa: 65, spd: 95, spe: 55},
	},
	victreebel: {
		inherit: true,
		baseStats: {hp: 80, atk: 105, def: 65, spa: 100, spd: 70, spe: 70},
		abilities: {0: "Chlorophyll", 1: "Liquid Ooze", H: "Fly Trap"},
	},
	primeape: {
		inherit: true,
		abilities: {0: "Vital Spirit", 1: "Anger Point", H: "Gorilla Tactics"},
	},
	arcanine: {
		inherit: true,
		abilities: {0: "Intimidate", 1: "Flash Fire", H: "Strong Jaw"},
	},
};