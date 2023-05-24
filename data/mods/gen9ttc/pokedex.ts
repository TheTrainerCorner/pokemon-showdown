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
};