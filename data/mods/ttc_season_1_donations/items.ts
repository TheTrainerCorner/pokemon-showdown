export const Items: {[k: string]: ModdedItemData} = {
	stick: {
		name: "Stick",
		spritenum: 475,
		megaStone: "Farfetch\u2019d-Mega",
		megaEvolves: "Farfetch\u2019d",
		itemUser: ["Farfetch\u2019d"],
		onTakeItem(item, source) {
			if (item.megaStone === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 674,
		gen: 8,
		isNonstandard: "Past",
	}
};