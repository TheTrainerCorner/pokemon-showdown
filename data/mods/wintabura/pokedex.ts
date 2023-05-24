import { stats } from '../../../server/chat-plugins/randombattles/winrates';
export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	blastoise: {
		inherit: true,
		abilities: {0: "Torrent", 1: "Shell Armor", H: "Rain Dish"},
	},
	raticate: {
		inherit: true,
		baseStats: {hp: 65, atk: 91, def: 60, spa: 50, spd: 70, spe: 97},
	},
	raticatealola: {
		inherit: true,
		baseStats: {hp: 75, atk: 81, def: 70, spa: 40, spd: 80, spe: 77},
	},
	arbok: {
		inherit: true,
		baseStats: {hp: 75, atk: 95, def: 74, spa: 65, spd: 79, spe: 80},
	},
	raichu: {
		inherit: true,
		baseStats: {hp: 70, atk: 95, def: 55, spa: 75, spd: 80, spe: 110},
		abilities: {0: "Static", 1: "Galvanize", H: "Lightning Rod"},
	},
	nidoqueen: {
		inherit: true,
		baseStats: {hp: 100, atk: 72, def: 87, spa: 85, spd: 85, spe: 76},
	},
	nidoking: {
		inherit: true,
		baseStats: {hp: 81, atk: 92, def: 77, spa: 95, spd: 75, spe: 85},
	},
	wigglytuff: {
		inherit: true,
		baseStats: {hp: 140, atk: 70, def: 45, spa: 85, spd: 65, spe: 55},
		// Going to add fluffy but idk what is being replaced
		abilities: {0: "Cute Charm", 1: "Competitive", H: "Frisk"},
	}
};