import { stats } from '../../../server/chat-plugins/randombattles/winrates';
export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	venusaur: {
		inherit: true,
		baseStats: {hp: 90, atk: 77, def: 90, spa: 95, spd: 105, spe: 80},
	},
	charizard: {
		inherit: true,
		baseStats: {hp: 78, atk: 94, def: 78, spa: 109, spd: 85, spe: 105},
	}
};