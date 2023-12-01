export const Pokedex: {[speciesid: string]: ModdedSpeciesData} = {
	trevenant: {
		inherit: true,
		otherFormes: ["Trevenant-Autumn"],
		formeOrder: ["Trevenant", "Trevenant-Autumn"],
	},
	trevenantautumn: {
		num: 709,
		name: "Trevenant-Autumn",
		baseSpecies: "Trevenant",
		forme: 'Autumn',
		types: ["Grass", "Ghost"],
		baseStats: {hp: 91, atk: 125, def: 83, spa: 65, spd: 82, spe: 56},
		abilities: {0: "Wandering Spirit", 1: "Harvest", H: "Justified"},
		heightm: 1.5,
		weightkg: 71,
		color: "Orange",
		prevo: 'Phantump',
		evoType: "trade",
		eggGroups: ["Grass", "Amorphous"],
	}
}