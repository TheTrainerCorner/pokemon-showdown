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
		}
	}
};