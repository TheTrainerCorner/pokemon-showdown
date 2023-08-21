import { stats } from '../../../server/chat-plugins/randombattles/winrates';
export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	palafin: {
		inherit: true,
		otherFormes: undefined,
		formeOrder: undefined,
		evos: ['Palafin-Hero'],
		baseForme: undefined,
	},
	palafinhero: {
		inherit: true,
		requiredAbility: undefined,
		battleOnly: undefined,
		prevo: 'Palafin',
		evoLevel: 40,
		baseSpecies: undefined,
		forme: undefined,
	},
	sawsbucksummer: {
		inherit: true,
		abilities: {0: 'Chlorophyll', 1: 'Flash Fire', H: 'Serene Grace'},
	}
};