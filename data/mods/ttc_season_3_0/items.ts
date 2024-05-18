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
		// Source doesn't actually exist when it comes to Foe Healing
		// Target is the foe
		onStart(target) {
			this.effectState.target = target;
		},
		// Trying to see if i can make it to be a once per turn item if that will work.
		onBeforeTurn(pokemon) {
			this.effectState.triggered = false;
		},
		onFoeTryHeal(healing: number, target: Pokemon, _: Pokemon, effect: Effect) {
			if (!this.effectState.triggered) {
				this.effectState.triggered = true;
				this.heal(this.effectState.target.maxHp / 4, this.effectState.target);
				return healing * 0.75;
			}	
		},
	},
}