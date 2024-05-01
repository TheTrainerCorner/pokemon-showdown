export const Abilities: {[k: string]: ModdedAbilityData} = {
	hailthecoin: {
		name: "Hail The Coin",
		onSourceAfterMove(source, target, move) {
			if (move.id === "payday") return;
			if(source !== target) {
				source.addVolatile('hailthecoin');
			}
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				let rand = Math.floor(Math.random() * 5);
				this.effectState.amount = rand || 1;
			},
			onRestart(target) {
				let rand = Math.floor(Math.random() * 5);
				if (this.effectState.amount === 20) return false;
				this.effectState.amount += rand || 1;
				if (this.effectState.amount > 20) this.effectState.amount = 20;
			},
			onSourceAfterMove(source, target, move) {
				if (move.id !== "payday") return;
				// This is assuming the move is payday!
				// If the amount is 0 or under 0, then we don't want anything to happen.
				if (this.effectState.amount <= 0) return;

				for (let i = 0; i < this.effectState.amount; i++) {
					this.damage(move.basePower * 0.05, target, source);
				}
				
				source.removeVolatile('payday');
			}
		},
		desc: "When Meowth-Mega uses any move that isn't payday, they will gain either 1-5 coins up to a max of 20 coins. When Meowth-Mega uses payday, for each coin, the opponent will take 4 damage (5% of the base power of payday).",
		shortDesc: "Move Not Payday; Gains 1-5 Coins (Max of 20); When using Payday, each coin does 5% of Payday!",
	}
};