export const Items: {[k: string]: ModdedItemData} = {
	stick: {
		inherit: true,
		onModifyCritRatio: undefined,
	},
	blukberry: {
		name: "Bluk Berry",
		spritenum: -100,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Cosmic",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Cosmic' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6 );
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() {},
		num: -5001,
		gen: 9,
		desc: "Halves damage taken from a supereffective Cosmic-type attack. Single use.",
	},
	cosmicseed: {
		name: "Cosmic Seed",
		spritenum: -100,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain('cosmicterrain')) {
				pokemon.useItem();
			}
		},
		onTerrainChange(pokemon) {
			if (this.field.isTerrain('cosmicterrain')) {
				pokemon.useItem();
			}
		},
		boosts: {
			spa: 1,
		},
		num: -5002,
		gen: 9,
		desc: "Raises the holder's Sp. Atk by 1 stage when Cosmic Terrain is active. Single use.",
	},
	stardust: {
		name: "Stardust",
		spritenum: -100,
		fling: {
			basePower: 30,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Cosmic') {
				return this.chainModify([4915, 4096]);
			}
		},
		num: -5003,
		gen: 9,
	},
	barbaricite: {
		name: "Barbaricite",
		spritenum: -100,
		megaStone: "Barbaracle-Mega",
		megaEvolves: "Barbaracle",
		itemUser: ["Barbaracle"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num:-5001,
		gen: 10,
		isNonstandard: "Past",	
	},
	chandelurite: {
		name: "Chandelurite",
		spritenum: -100,
		megaStone: "Chandelure-Mega",
		megaEvolves: "Chandelure",
		itemUser: ["Chandelure"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num:-5002,
		gen: 10,
		isNonstandard: "Past",
	},
	chesnaughtite: {
		name: "Chesnaughtite",
		spritenum: -100,
		megaStone: "Chesnaught-Mega",
		megaEvolves: "Chesnaught",
		itemUser: ["Chesnaught"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num:-5003,
		gen: 10,
		isNonstandard: "Past",
	},
	clefablite: {
		name: "Clefablite",
		spritenum: -100,
		megaStone: "Clefable-Mega",
		megaEvolves: "Clefable",
		itemUser: ["Clefable"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num:-5004,
		gen: 10,
		isNonstandard: "Past",
	},
	delphoxite: {
		name: "Delphoxite",
		spritenum: -100,
		megaStone: "Delphox-Mega",
		megaEvolves: "Delphox",
		itemUser: ["Delphox"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num:-5005,
		gen: 10,
		isNonstandard: "Past",
	},
	dragalgite: {
		name: "Dragalgite",
		spritenum: -100,
		megaStone: "Dragalge-Mega",
		megaEvolves: "Dragalge",
		itemUser: ["Dragalge"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num:-5006,
		gen: 10,
		isNonstandard: "Past",
	},
	dragoninite: {
		name: "Dragoninite",
		spritenum: -100,
		megaStone: "Dragonite-Mega",
		megaEvolves: "Dragonite",
		itemUser: ["Dragonite"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num:-5007,
		gen: 10,
		isNonstandard: "Past",
	},
	drampanite: {
		name: "Drampanite",
		spritenum: -100,
		megaStone: "Drampa-Mega",
		megaEvolves: "Drampa",
		itemUser: ["Drampa"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num:-5008,
		gen: 10,
		isNonstandard: "Past",
	},
	elektrossite: {
		name: "Elektrossite",
		spritenum: -100,
		megaStone: "Elektross-Mega",
		megaEvolves: "Elektross",
		itemUser: ["Elektross"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num:-5009,
		gen: 10,
		isNonstandard: "Past",
	},	
	emboarite: {
		name: "Emboarite",
		spritenum: -100,
		megaStone: "Emboar-Mega",
		megaEvolves: "Emboar",
		itemUser: ["Emboar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num:-5010,
		gen: 10,
		isNonstandard: "Past",
	},
	excradrite: {
		name: "Excradrite",
		spritenum: -100,
		megaStone: "Excadrill-Mega",
		megaEvolves: "Excadrill",
		itemUser: ["Excadrill"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num:-5011,
		gen: 10,
		isNonstandard: "Past",
	},
	falinksite: {
		name: "Falinksite",
		spritenum: -100,
		megaStone: "Falinks-Mega",
		megaEvolves: "Falinks",
		itemUser: ["Falinks"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num:-5012,
		gen: 10,
		isNonstandard: "Past",
	},
	feraligite: {
		name: "Feraligite",
		spritenum: -100,
		megaStone: "Feraligatr-Mega",
		megaEvolves: "Feraligatr",
		itemUser: ["Feraligatr"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num:-5013,
		gen: 10,
		isNonstandard: "Past",
	},
	floettite: {
		name: "Floettite",
		spritenum: -100,
		megaStone: "Floette-Mega",
		megaEvolves: "Floette",
		itemUser: ["Floette"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num:-5014,
		gen: 10,
		isNonstandard: "Past",
	},
	froslassite: {
		name: "Froslassite",
		spritenum: -100,
		megaStone: "Froslass-Mega",
		megaEvolves: "Froslass",
		itemUser: ["Froslass"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num:-5015,
		gen: 10,
		isNonstandard: "Past",
	},
	greninjite: {
		name: "Greninjite",
		spritenum: -100,
		megaStone: "Greninja-Mega",
		megaEvolves: "Greninja",
		itemUser: ["Greninja"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num:-5016,
		gen: 10,
		isNonstandard: "Past",
	},
	hawluchinite: {
		name: "Hawluchinite",
		spritenum: -100,
		megaStone: "Hawlucha-Mega",
		megaEvolves: "Hawlucha",
		itemUser: ["Hawlucha"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num:-5017,
		gen: 10,
		isNonstandard: "Past",
	},
	malamarite: {
		name: "Malamarite",
		spritenum: -100,
		megaStone: "Malamar-Mega",
		megaEvolves: "Malamar",
		itemUser: ["Malamar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num:-5018,
		gen: 10,
		isNonstandard: "Past",
	},
	meganiumite: {
		name: "Meganiumite",
		spritenum: -100,
		megaStone: "Meganium-Mega",
		megaEvolves: "Meganium",
		itemUser: ["Meganium"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num:-5019,
		gen: 10,
		isNonstandard: "Past",
	},
	pyroarite: {
		name: "Pyroarite",
		spritenum: -100,
		megaStone: "Pyroar-Mega",
		megaEvolves: "Pyroar",
		itemUser: ["Pyroar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num:-5020,
		gen: 10,
		isNonstandard: "Past",
	},
	scolipite: {
		name: "Scolipite",
		spritenum: -100,
		megaStone: "Scolipede-Mega",
		megaEvolves: "Scolipede",
		itemUser: ["Scolipede"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num:-5021,
		gen: 10,
		isNonstandard: "Past",
	},
	scraftinite: {
		name: "Scraftinite",
		spritenum: -100,
		megaStone: "Scrafty-Mega",
		megaEvolves: "Scrafty",
		itemUser: ["Scrafty"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num:-5022,
		gen: 10,
		isNonstandard: "Past",
	},
	skarmorite: {
		name: "Skarmorite",
		spritenum: -100,
		megaStone: "Skarmory-Mega",
		megaEvolves: "Skarmory",
		itemUser: ["Skarmory"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num:-5023,
		gen: 10,
		isNonstandard: "Past",
	},
	starminite: {
		name: "Starminite",
		spritenum: -100,
		megaStone: "Starmie-Mega",
		megaEvolves: "Starmie",
		itemUser: ["Starmie"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num:-5024,
		gen: 10,
		isNonstandard: "Past",
	},
	victreebelite: {
		name: "Victreebelite",
		spritenum: -100,
		megaStone: "Victreebel-Mega",
		megaEvolves: "Victreebel",
		itemUser: ["Victreebel"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num:-5025,
		gen: 10,
		isNonstandard: "Past",
	},
};