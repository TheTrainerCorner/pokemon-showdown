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
		desc: "If an opposing Pokemon were to switch out prior to using a damaging move, they will be attacked before switching.",
		shortDesc: "If a foe is switching out, attacks the foe using a damaging move before switch out. Single use.",
		fling: {
			basePower: 10,
		},
		// We are going to try and treat the moves like pursuit.
		// We need to modify the move and apply a beforeTurnCallback to it.
		onModifyMove(move, source, target) {
			if (move.category === "Status") return;
			move.beforeTurnCallback = (pokemon) => {
				for (const side of this.sides) {
					if (side.hasAlly(pokemon)) continue;
					side.addSideCondition('wantedposter', pokemon);
					const data = side.getSideConditionData('wantedposter');
					if(!data.sources) {
						data.sources = [];
					}
					data.sources.push(pokemon);
					this.debug(`wanted poster started`);
				}
			}

			// next we need to set the move's accuracy to true
			if (target?.beingCalledBack || target?.switchFlag) move.accuracy = true;

			// we need to inject the move into an effectState
			this.effectState.wantedPosterMove = move;
		},
		onTryHit(target, pokemon) {
			target.side.removeSideCondition('wantedposter');
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('Wanted Poster start');
				let alreadyAdded = false;
				const move = this.effectState.wantedPosterMove as Move;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectState.sources as Pokemon[]) {
					if (!source.isAdjacent(pokemon) || !this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, `move: ${move.name}`);
						alreadyAdded = true;
					}
					
					if (source.canMegaEvo || source.canUltraBurst) {
						for (const [actionIndex, action] of this.queue.entries()) {
							if (action.pokemon === source && action.choice === 'megaEvo') {
								this.actions.runMegaEvo(source);
								this.queue.list.splice(actionIndex, 1);
								break;
							}
						}
					}
					this.actions.runMove(move, source, source.getLocOf(pokemon));
					source.useItem();
				}
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