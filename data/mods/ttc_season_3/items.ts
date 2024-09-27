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
				this.add('-activate', this.effectState.user, 'item: Lax Incense');
			}
			}
		},
		desc: "If hit by a a contact move, the attacker becomes drowsy. Single Use"
	},
	oddincense: {
		inherit: true,
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if(move.category== "Special") {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
			desc: "If the holder is hit by a special move, the attacker loses 1/8th of its max HP."
	},
	rockincense: {
		inherit: true,
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if(move.type== "Rock"){
				source.side.addSideCondition('stealthrock');
				target.useItem();
				this.add('-activate', this.effectState.user, 'item: Rock Incense');
			}
		},
		desc: "If hit by a rock move, automatically set up stealth rocks to the attacker's side. Single Use"
	},
	roseincense: {
		inherit: true,
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			for (const side of target.side.foeSidesWithConditions()) {
				source.side.addSideCondition('spikes');
				target.useItem();
				this.add('-activate', this.effectState.user, 'item: Rose Incense');
			}
		},
		desc: "If hit by attacking move, automatically set up 1 layer of spikes. Single Use"
	},
	seaincense: {
		inherit: true,
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if(move.type== "Water"){
				this.heal(target.baseMaxhp / 4);
				target.useItem();
				this.add('-activate', this.effectState.user, 'item: Sea Incense');
			}
		},
		desc: "If hit by a water type move, the holder is healed for 25% max HP. Single Use"
	},
	waveincense: {
		inherit: true,
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if (move.category !== 'Special') return;
			if (target.itemState.activated) return;
			const whirlpool = this.dex.moves.get('whirlpool');

			this.actions.useMove(whirlpool, target);
			target.useItem();
			// Should prevent the item from proccing more than once.
			target.itemState.activated = true;
		},
		desc: "If hit by a Special move, the attacker will be trapped in a whirlpool (One time use)"
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
				this.add('-activate', this.effectState.user, 'item: Full Incense');
			}
		},
		desc: "The first time the opposing pokemon restores HP, the holder of this item steals 25% of that healing and heals itself at the end of the turn."
	},
	pokepen: {
		name: "PokePen",
		spritenum: -100,
		desc: "Holder's first status move will go first in the priority bracket. Fails against dark types. Single Use",
		fling: {
			basePower: 10,
		},
		onFractionalPriorityPriority: -2,
		onFractionalPriority(priority, pokemon, _, move) {
			if(move.category !== 'Status') return;
			let canProc = true;
			for(let target of pokemon.foes()) {
				if (target.hasType('Dark')) canProc = false;
			}

			if (!canProc) {
				this.add('-fail', pokemon, 'item: PokePen')
				return;
			}
			this.add('-activate', pokemon, 'item: PokePen');
			pokemon.useItem();
			return 0.1;

		}
	},
	//wantedposter: {
		//name: "Wanted Poster",
		//spritenum: -100,
		//desc: "If an opposing Pokemon were to switch out prior to using a damaging move, they will be attacked before switching.",
		//shortDesc: "If a foe is switching out, hits it using a damaging move before. Single use",
		//fling: {
		//	basePower: 10,
		//},
		//onBeforeTurn(pokemon) {
		//	for (const side of this.sides) {
		//		if(side.hasAlly(pokemon)) continue;
		//		side.addSideCondition('wantedposter', pokemon);
		//		const data = side.getSideConditionData('wantedposter');
		//		if (!data.sources) {
		//			data.sources = [];
		//		}
		//		
		//		pokemon.itemState.wantedPosterActive = true;
		//		let action = this.queue.willMove(pokemon);
		//		if (action?.choice !== 'move') return;
		//		let move = action.move;
		//		if (!move) return;
		//		pokemon.itemState.wantedPosterMove = move;
		//		data.sources.push(pokemon);
		//	}
		//},
		//onModifyMove(move, source, target) {
		//	if (target?.beingCalledBack || target?.switchFlag) move.accuracy = true;
		//},
		//onTryHit(target, pokemon) {
		//	target.side.removeSideCondition('wantedposter');
		//},
		//condition: {
		//	duration: 1,
		//	onBeforeSwitchOut(pokemon) {
		//		this.debug('Wanted Poster start');
		//		let activated = false;
		//		for (const source of pokemon.foes()) {
		//			if (activated) continue;
		//			if (source.moveThisTurn) break;
		//			if (!source.hasItem('wantedposter')) continue;
		//			if (!source.itemState.wantedPosterActive) continue;
		//			if (!source.itemState.wantedPosterMove) continue;
		//			let move = source.itemState.wantedPosterMove as Move;
		//			if (move.category === "Status") continue;
		//			this.add('-activate', pokemon, `move: ${move}`);
		//			this.actions.runMove(move, source, source.getLocOf(pokemon));
		//			activated = true;
		//			source.useItem();
		//		}
		//	}
		//}
		// onBeforeTurn(pokemon) {
		// 	pokemon.itemState.wantedPosterActive = true;
		// 	let action = this.queue.willMove(pokemon);
		// 	if (action?.choice !== 'move') return;

		// 	let move = action.move;
		// 	if (!move) return;

		// 	pokemon.itemState.wantedPosterMove = move;
		// },
		// onTryMove(source, target, move) {
		// 	source.itemState.wantedPosterActive = false;
		// },
		// onFoeBeforeSwitchOut(pokemon) {
		// 	let activated = false;
		// 	for (const source of pokemon.foes()) {
		// 		if (activated) continue;
		// 		if (source.moveThisTurn) break;
		// 		if (!source.hasItem('wantedposter')) continue;
		// 		if (!source.itemState.wantedPosterActive) continue;
		// 		if (!source.itemState.wantedPosterMove) continue;
		// 		let move = source.itemState.wantedPosterMove as Move;
		// 		if (move.category === "Status") continue;
		// 		console.debug(this.actions);
		// 		this.actions.runMove(move, source, source.getLocOf(pokemon));
		// 		activated = true;
		// 		source.useItem();
		// 	}
		// }
	//},
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
	},
	frostorb: {
		name: "Frost Orb",
		desc: "At the end of every turn, this item attempts to frosbite the holder.",
		spritenum: -100,
		fling: {
			basePower: 30,
			status: 'frb',
		},
		onResidualOrder: 28,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			pokemon.trySetStatus('frb', pokemon);
		},
		num: -273,
	},
	armorplate: {
		name: "Armor Plate",
		desc: "Gives holder 1.2x boost to both defenses for 3 hits. Multi-hit moves are affected.",
		fling: {
			basePower: 80,
		},
		onStart(pokemon) {
			if (pokemon.itemState.armorPlateHits) return;
			pokemon.itemState.armorPlateHits = 3;
			this.add('-start', pokemon, `armorplatex3`);
		},
		onFoeAfterMove(source, target, move) {
			if (this.effectState.didHit) {
				if (move.category === "Status" || !target.runImmunity(move.type)) return;
				this.add('-end', target, `armorplatex${target.itemState.armorPlateHits}`);
				target.itemState.armorPlateHits -= 1;
				if (target.itemState.armorPlateHits <= 0) {
					this.add('-start', target, `armorplatexend`);
					target.useItem();
					this.add('-end', target, `armorplatexend`, '[silent]');
				} else {
					this.add('-start', target, `armorplatex${target.itemState.armorPlateHits}`);
				}
			}
		},
		onDamagingHit(damage, target, source, move) {
			if(!target.hp) return;
			this.effectState.didHit = true;
		},
		onModifyDef(def, pokemon) {
			if (pokemon.itemState.armorPlateHits > 0) {
				return this.chainModify([4915, 4096]);
			}
		},
		onModifySpD(def, pokemon) {
			if (pokemon.itemState.armorPlateHits > 0) {
				return this.chainModify([4915, 4096]);
			}
		},
	},
}