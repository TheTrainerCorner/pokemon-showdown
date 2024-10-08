export const Conditions: {[k: string]: ModdedConditionData} = {
	phc: {
		name: "Phoenix's Curse",
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.id === 'phoenixsfeather') {
				this.add('-status', target, 'phc', "[from] item: Phoenix's Feather");
			} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'phc');
			} else {
				this.add('-status', target, 'phc');
			}
		},
		onResidualOrder: 10,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 16);
		}
	}
};