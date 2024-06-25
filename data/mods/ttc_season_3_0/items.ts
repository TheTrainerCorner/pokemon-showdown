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
	pangoroite: {
		name: "Pangoroite",
		spritenum: -100,
		megaStone: "Pangoro-Mega",
		megaEvolves: "Pangoro",
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		}
	},
	laxincense: {
		inherit: true,
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
			if (source.status || !source.runStatusImmunity('slp')) {
				return false;
			}
			else{
				source.addVolatile('yawn')
				target.useItem();
			}
			}
		},
	},
	oddincense: {
		inherit: true,
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if(move.category== "Special")
				this.damage(source.baseMaxhp / 8, source, target);
			}
	},
	rockincense: {
		inherit: true,
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if(move.type== "Rock"){
				source.side.addSideCondition('stealthrock');
				target.useItem();
			}
		}
	},
	roseincense: {
		inherit: true,
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			for (const side of target.side.foeSidesWithConditions()) {
				source.side.addSideCondition('spikes');
				target.useItem();
			}
		}
	},
	seaincense: {
		inherit: true,
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if(move.type== "Water"){
				this.heal(target.baseMaxhp / 4);
				target.useItem();
			}
		}
	},
	waveincense: {
		inherit: true,
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if(move.category== "Special"){
				source.addVolatile('partiallytrapped')
				target.useItem();
			}
		}
	},
	fullincense: {
		inherit: true,
		onFractionalPriority: undefined,
		// Need to set up a few variables in effectState beforehand.
		onStart(target) {
			this.effectState.triggered = false;
			this.effectState.user = target;
		},
		// Source doesn't actually exist when it comes to Foe Healing
		// Target is the foe
		onFoeTryHeal(healing: number, target: Pokemon, _: Pokemon, effect: Effect) {
			if (!this.effectState.triggered) {
				this.effectState.triggered = true;
				this.effectState.healing = healing;
				this.add('-activate', this.effectState.user, 'item: Full Incense');
				return healing * 0.75;
			}
			return healing;
		},
		onResidualOrder: 23,
		onResidualSubOrder: 2,
		onResidual(target, source, effect) {
			if (this.effectState.triggered) {
				this.heal(this.effectState.healing * 0.25);
				this.effectState.triggered = false;
			}
		}
	},
	pokepen: {
		name: "PokePen",
		spritenum: -100,
		desc: "NOT YET IMPLEMENTED",
		onModifyMove(move, pokemon, target) {
			if (move.category === 'Physical') move.category = "Special";
			if (move.category === 'Special') move.category = "Physical";
		},
	},
	wantedposter: {
		name: "Wanted Poster",
		spritenum: -100,
		desc: "Consumable one time use. If an opposing Pokemon were to switch out prior to using a damaging move, they will be attacked before switching.",
		shortDesc: "If the opposing pokemon switches out",
		onBeforeTurn(pokemon) {
			for (const side of this.sides) {
				if (side.hasAlly(pokemon)) continue;
				side.addSideCondition('pursuit', pokemon);
				const data = side.getSideConditionData('pursuit');
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onModifyMove(move, source, target) {
			if (target?.beingCalledBack || target?.switchFlag) move.accuracy = true;
		},
		onTryHit(target, pokemon) {
			target.side.removeSideCondition('pursuit');
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('Wanted Poster start');
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for(const source of this.effectState.sources) {
					if (!source.isAdjacent(pokemon) || !this.queue.cancelMove(source) || !source.hp) continue;
					if (!source.hasItem('wantedposter')) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'item: Wanted Poster');
						alreadyAdded = true;
					}
					if (source.canMegaEvo || source.canUltraBurst) {
						for(const [actionIndex, action] of this.queue.entries()) {
							if (action.pokemon === source && action.choice === 'megaEvo') {
								this.actions.runMegaEvo(source);
								this.queue.list.splice(actionIndex, 1);
								break;
							}
						}
					}

					let action = this.queue.willMove(source);
					if (action?.choice !== 'move') continue;
					let move = action.move;
					if (move.category === 'Status') continue;
					if (source.useItem())
						this.actions.runMove(move, source, source.getLocOf(pokemon));
				}
			}
		}
	},
	bubbleddome: {
		name: "Bubbled Dome",
		spritenum: -100,
		desc: "Holder's Def is 1.5x, but it can only select damaging moves.",
		fling: {
			basePower: 80,
		},
		onModifyDefPriority: 1,
		onModifyDef(def) {
			return this.chainModify(1.5);
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				if (this.dex.moves.get(moveSlot.move).category === 'Status') {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		num: -640,
		gen: 9,
	}
}