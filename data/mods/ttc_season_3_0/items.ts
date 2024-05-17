export const Items: {[k: string]: ModdedItemData} = {
	meowthite: {
		name: "Meowthite",
		spritenum: -100,
		megaStone: "Meowth-Mega",
		megaEvolves: "Meowth",
		itemUser: ["Meowth"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true; 
		},
		num: -3001,
		gen: 9,
		isNonstandard: "Past",
	},
	eeveeite: {
		name: "Eeveeite",
		spritenum: -100,
		megaStone: "Eevee-Mega",
		megaEvolves: "Eevee-Starter",
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
	},
	gourgeisite: {
		inherit: true,
		spritenum: -100,
	},
	inteleonite: {
		inherit: true,
		spritenum: -100,
	},
	empoleonite: {
		name: "Empoleonite",
		spritenum: -100,
		megaStone: "Empoleon-Mega",
		megaEvolves: "Empoleon",
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		}
	},
}