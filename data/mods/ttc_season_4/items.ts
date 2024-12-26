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
		desc: "If the opposing pokemon is at a type disadvantage, consumes the item, and prevents the target from escaping. descrease the damage they take by 20%",
		shortDesc: "If the opposing pokemon is at a type disadvantage, prevents target from escaping, descreases damage by 20% to the target. Single use.",
		fling: {
			basePower: 10,
		},
		onBeforeTurn(source) {
			for(const target of source.side.foes()) {
				for (const sourceType of source.types) {
					if (this.dex.getImmunity(sourceType, target)) continue;
					if (this.dex.getEffectiveness(sourceType, target) < 1) continue;
					this.effectState.wantedPoster = true;
				}

				if (!this.effectState.wantedPoster) return;
				target.addVolatile('trapped', target);
				target.addVolatile('wantedposter', target);
				source.useItem();
				return;
			}
		},
		condition: {
			onSourceModifyAtk(atk, attacker, defender, move) {
				this.debug('Wanted Poster Atk weaken');
				return this.chainModify([3413, 4096]);
			},
			onSourceModifySpA(atk, attacker, defender, move) {
				this.debug(' Wanted Poster spa weaken');
				return this.chainModify([3413, 4096]);
			}
		}
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