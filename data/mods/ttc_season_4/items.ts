export const Items: {[k: string]: ModdedItemData} = {
	gogoatite: {
		name: "Gogoatite",
		spritenum: -100,
		megaStone: "Gogoat-Mega",
		megaEvolves: "Gogoat",
		itemUser: ["Gogoat"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -4001,
		gen: 9,
		isNonstandard: "Past",
	},
	pachirisite: {
		name: "Pachirisite",
		spritenum: -100,
		megaStone: "Pachirisu-Mega",
		megaEvolves: "Pachirisu",
		itemUser: ["Pachirisu"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -4002,
		gen: 9,
		isNonstandard: "Past",
	},
	wantedposter: {
		name: "Wanted Poster",
		spritenum: -100,
		desc: "Upon switch-in, consumes the item and traps the target. The target will take 30% less damage from the user as a result of consuming the item.",
		shortDesc: "Upon Switch-in, consumes item, traps the target; target takes 30% less damage from user. Single Use.",
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			for (const target of pokemon.side.foes()) {
				if (pokemon.isAdjacent(target)) {
					target.addVolatile('wantedposter');
					target.itemState.wantedPoster = pokemon;
				}
			}
			pokemon.useItem();
		},
		condition: {
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			},
			onMaybeTrapPokemon(pokemon) {
				if (!pokemon.itemState.wantedPoster) return;
				if (!pokemon.isAdjacent(pokemon.itemState.wantedPoster)) return;
				pokemon.maybeTrapped = true;
			},
			onSourceModifyAtk(atk, source, target, move) {
				if (source === target.itemState.wantedPoster) {
					return this.chainModify([2868, 4096]);
				}
			},
			onSourceModifySpA(atk, source, target, move) {
				if (source === target.itemState.wantedPoster) {
					return this.chainModify([2868, 4096]);
				}
			}
		},
	},

	//#region Gatherer's Bounty change to berries
	jabocaberry: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Physical' && source.hp && source.isActive && !source.hasAbility('magicguard')) {
				if (target.eatItem()) {
					this.damage(source.baseMaxhp / ((target.hasAbility('ripen') || target.hasAbility('gatherersbounty')) ? 4 : 8), source, target);
				}
			}
		}
	},
	rowapberry: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (move.category === "Special" && source.hp && source.isActive && source.hasAbility('magicguard')) {
				if (target.eatItem()) {
					this.damage(source.baseMaxhp / ((target.hasAbility('ripen') || target.hasAbility('gatherersbounty')) ? 4 : 8), source, target);
				}
			}
		},
	},
	//#endregion
};