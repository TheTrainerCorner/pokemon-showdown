export const Items: {[itemid: string]: ModdedItemData} = {
	gourgeisite: {
		name: "Gourgeisite",
		spritenum: 575,
		megaStone: "Gourgeist-Mega",
		megaEvolves: "Gourgeist",
		itemUser: ["Gourgeist"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1001,
		gen: 6,
		isNonstandard: "Past",
	}
}