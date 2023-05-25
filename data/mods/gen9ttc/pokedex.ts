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

	primeape: {
		inherit: true,
		abilities: {0: "Vital Spirit", 1: "Anger Point", H: "Gorilla Tactics"},
	},
	arcanine: {
		inherit: true,
		abilities: {0: "Intimidate", 1: "Flash Fire", H: "Strong Jaw"},
	}
};