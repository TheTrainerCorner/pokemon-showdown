export const Abilities: { [k: string]: ModdedAbilityData} = {
	slowstart: {
		inherit: true,
		condition: {
			duration: 5,
			onResidualOrder: 28,
			onResidualSubOrder: 2,
			onStart(target) {
				this.add('-start', target, 'ability: Slow Start');
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(target) {
				this.add('-end', target, 'Slow Start')
			},
		},
		desc: "On switch-in, this Pokemon's Speed are halved for 5 Turns.",
		shortDesc: "On switch-in, this Pokemon's Speed are halved for 5 Turns.",
	}
};
