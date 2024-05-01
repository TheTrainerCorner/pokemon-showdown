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
			if (move.id === "payday") return;
			if(source !== target) {
				source.addVolatile('hailthecoin');
			}
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				let rand = Math.floor(Math.random() * 10);
				this.effectState.amount = rand || 1;
				this.add('-start', target, `hailthecoinx${this.effectState.amount}`, '[silent]');
			},
			onSourceAfterMove(source, target, move) {
				if (move.id !== "payday") return;
				let deductAmount = this.effectState.amount;
				for (let i = 0; i < this.effectState.amount; i++) {
					deductAmount--;
					this.damage(move.basePower * 0.05, target, source);
					this.add('-start', source, `hailthecoinx${deductAmount}`, '[silent]');
				}
				source.removeVolatile('hailthecoin');
			},
		},
		desc: "When Meowth uses Payday, it shoots up between 1 to 10 coins in the air. Each coin impacts the opponent with 5% (4 damage) of Payday’s damage. Also has Mind's Eye implemented in this ability.",
		shortDesc: "Move Not Payday; Gains 1-5 Coins (Max of 20); When using Payday, each coin does 5% of Payday!",
	}

	//#endregion
};