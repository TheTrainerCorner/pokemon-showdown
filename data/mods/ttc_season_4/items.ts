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
		desc: "Upon direct kill, restores 1/8 of the user's max HP.",
		shortDesc: "Upon direct kill, restores 1/8 of max HP.",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move' && effect.category !== 'Status') {
				this.heal(source.maxhp / 6, source);
			}
		},
		fling: {
			basePower: 10,
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
	roseincense: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				for (const side of target.side.foeSidesWithConditions()) {
					source.side.addSideCondition('spikes');
					target.useItem();
					this.add('-activate', this.effectState.user, 'item: Rose Incense');
				}
			}
		},
		desc: "If hit by a contact move, automatically set up 1 layer of spikes. Single Use.",
	},
};