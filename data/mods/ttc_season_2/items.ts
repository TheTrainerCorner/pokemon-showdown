export const Items: {[itemid: string]: ModdedItemData} = {
	inteleonite: {
		name: "Inteleonite",
		spritenum: 575,
		megaStone: "Inteleon-Mega",
		megaEvolves: "Inteleon",
		itemUser: ["Inteleon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1001,
		gen: 6,
		isNonstandard: "Past",
	},
	granbulite: {
		name: "Granbulite",
		spritenum: 575,
		megaStone: "Granbull-Mega",
		megaEvolves: "Granbull",
		itemUser: ["Granbull"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1002,
		gen: 6,
		isNonstandard: "Past",
	},
	frostorb: {
		name: "Frost Orb",
		desc: "At the end of every turn, this item attempts to frosbite the holder.",
		spritenum: -100,
		fling: {
			basePower: 30,
			status: 'frb',
		},
		onResidualOrder: 28,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			pokemon.trySetStatus('frb', pokemon);
		},
		num: -273,
	},
}