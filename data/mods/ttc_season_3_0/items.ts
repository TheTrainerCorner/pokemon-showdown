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
		onTryHeal(damage, target, source, effect) {
			this.debug(`Event: TryHeal | Target: ${target} | source: ${source} | Effect: ${effect}`);
		},
		onAnyTryHeal(damage, target, source, effect) {
			this.debug(`Event: AnyTryHeal | Target: ${target} | source: ${source} | Effect: ${effect}`);
		},
		onSourceTryHeal(damage, target, source, effect) {
			this.debug(`Event: SourceTryHeal | Target: ${target} | source: ${source} | Effect: ${effect}`);
		},
		onFoeTryHeal(damage, target, source, effect) {
			this.debug(`Event: FoeTryHeal | Target: ${target} | source: ${source} | Effect: ${effect}`);
		},
		onAllyTryHeal(damage, target, source, effect) {	
			this.debug(`Event: AllyTryHeal | Target: ${target} | source: ${source} | Effect: ${effect}`);
		},
		// onFoeTryHeal(healing: number, target: Pokemon, source: Pokemon, effect: Effect) {
		// 	if (!this.runEvent('TryHeal', source, null, this.effect, Math.floor((healing/4))))
		// 		return this.chainModify([3072, 4096]);
		// },
	},
}