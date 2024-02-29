export const Items: {[k: string]: ModdedItemData} = {
	//#region Season 1 Donations
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
	},
	//#endregion
	//#region Season 1 Halloween
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
	//#endregion
	
};