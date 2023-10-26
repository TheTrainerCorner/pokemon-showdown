export const Conditions: {[k: string]: ModdedConditionData} = {
	psn: {
		inherit: true,
		onResidual(pokemon) {
			if(!pokemon.hasAbility('pastelveil')) {
				this.damage(pokemon.baseMaxhp / 8);
			}
		},
	},
	tox: {
		inherit: true,
		onResidual(pokemon) {
			if(!pokemon.hasAbility('pastelveil')) {
				if(this.effectState.stage < 15) {
					this.effectState.stage++;
				}
				this.damage(this.clampIntRange(pokemon.baseMaxhp / 16, 1) * this.effectState.stage);
			}
		}
	}
};