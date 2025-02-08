export const Items: {[k: string]: ModdedItemData} = {
	armorplate: {
		inherit: true,
		onFoeAfterMove(source, target, move) {
			if (this.effectState.didHit) {
				if (move.category === "Status" || !target.runImmunity(move.type)) return;
				this.add('-end', target, `armorplatex${target.itemState.armorPlateHits}`);
				target.itemState.armorPlateHits -= 2; // Should skip the second hit and move to the last hit. I don't want to deal with animation stuff.
				if (target.itemState.armorPlateHits <= 0) {
					this.add('-start', target, `armorplatexend`);
					target.useItem();
					this.add('-end', target, `armorplatexend`, '[silent]');
				} else {
					this.add('-start', target, `armorplatex${target.itemState.armorPlateHits}`);
				}
			}
		},
		desc: "Gives holder 1.2x boost to both defenses for 2 hits. Multi-hit moves are affected.",
	},
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