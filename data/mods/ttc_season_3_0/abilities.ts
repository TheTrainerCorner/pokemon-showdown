export const Abilities: {[k: string]: ModdedAbilityData} = {
	//#region Modify Abilities

	//#endregion

	//#region New Abilities
	hailthecoin: {
		name: "Hail The Coin",
		// Mind's Eye
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.accuracy && boost.accuracy < 0) {
				delete boost.accuracy;
				if (!(effect as ActiveMove).secondaries) {
					this.add('-fail', target, 'unboost', 'accuracy', '[from] ability: Hail The Coin', `[of] ${target}`);
				}
			}
		},
		onModifyMovePriority: -5,
		onModifyMove(move) {
			move.ignoreEvasion = true;
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
			}
		},
		// Hail The Coin Actual Implementation
		onSourceAfterMove(source, target, move) {
			if (move.name !== "Pay Day") return; 
			
			this.effectState.paydayTriggered = true;
			let rand = Math.floor(Math.random() * 9);
			this.effectState.paydayAmount = rand + 1 || 1;
			this.add('-start', source, `hailthecoinx${this.effectState.paydayAmount}`, '[silent]');
		},
		onResidual(target, source, effect) {
			if (!this.effectState.paydayTriggered) return;

			let deductAmount = this.effectState.paydayAmount;
			for (let i = 0; i < this.effectState.paydayAmount; i++) {
				this.damage(80 * 0.05, target, source);
				this.add('-end', source, `hailthecoinx${deductAmount}`);
				deductAmount--;
				this.add('-start', source, `hailthecoinx${deductAmount}`, '[silent]');
			}

			this.add('-end', source, `hailthecoinx0`);
			this.effectState.paydayTriggered = false;
		},
		// onSourceAfterMove(source, target, move) {
		// 	if (move.id === "payday") source.addVolatile('hailthecoin');
		// },
		// condition: {
		// 	noCopy: true, // doesn't get copied by Baton Pass
		// 	onStart(target, source) {
		// 		let rand = Math.floor(Math.random() * 10);
		// 		this.effectState.amount = rand || 1;
		// 		this.add('-start', source, `hailthecoinx${this.effectState.amount}`, '[silent]');
		// 	},
		// 	onResidualOrder: 28,
		// 	onResidualSubOrder: 2,
		// 	onResidual(source, target, move) {
		// 		if (move.id !== "payday") return;
		// 		let deductAmount = this.effectState.amount;
		// 		for (let i = 0; i < this.effectState.amount; i++) {
		// 			this.damage(80 * 0.05, target, source);
		// 			this.add('-end', source, `hailthecoinx${deductAmount}`);
		// 			deductAmount--;
		// 			this.add('-start', source, `hailthecoinx${deductAmount}`, '[silent]');
		// 		}
		// 		source.removeVolatile('hailthecoin');
		// 	},
		// 	onEnd(source) {
		// 		this.add('-end', source, 'hailthecoinx0');
		// 	},
		// },
		num: -3001,
		desc: "When Meowth uses Payday, it shoots up between 1 to 10 coins in the air. Each coin impacts the opponent with 5% (4 damage) of Payday’s damage. Also has Mind's Eye implemented in this ability.",
		shortDesc: "Move Not Payday; Gains 1-5 Coins (Max of 20); When using Payday, each coin does 5% of Payday!",
	},
	gamblersluck: {
		name: "Gambler's Luck",
		onStart(pokemon) {
			const types = this.dex.types.names();
			const randomIndex = Math.floor(Math.random() * types.length);
			let type = types[randomIndex];
			if (type === '???') type = 'Normal';
			this.effectState.gamblersluck = type;
			this.add('-start', pokemon, `gamblersluck${type.toLowerCase()}`, '[silent]');
		},
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (this.effectState.gamblersluck) {
				this.add('-end', pokemon, `gamblersluck${this.effectState.gamblersluck.toLowerCase()}`);
			}
			const types = this.dex.types.names();
			const randomIndex = Math.floor(Math.random() * types.length);
			let type = types[randomIndex];
			if (type === '???') type = 'Normal';
			this.effectState.gamblersluck = type;
			this.add('-start', pokemon, `gamblersluck${type.toLowerCase()}`, '[silent]');
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (!this.effectState.gamblersluck) this.effectState.gamblersluck = 'Normal';

			if (move.type === this.effectState.gamblersluck) return this.chainModify([4915, 4096]);
		},
		rating: 4,
		num: -3002,
		desc: "This Pokemon, at the beginning of each turn, will randomize a type to give a 1.2x damage buff.",
		shortDesc: 'At the start of each turn, this pokemon will gain a 1.2x damage buff to a specific type.',
	},

	//#endregion
};