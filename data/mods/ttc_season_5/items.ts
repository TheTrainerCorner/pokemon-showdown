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
	}
};