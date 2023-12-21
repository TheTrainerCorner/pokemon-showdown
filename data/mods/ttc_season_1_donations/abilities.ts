export const Abilities: {[k: string]: ModdedAbilityData} = {
	shieldsdown: {
		inherit: true,
		// onStart
		// onResidualOrder
		// onResidual
		// onSetStatus
		// onTryAddVolatile
		onFoeTryMove(target, source, move) {
			const targetAllExceptions = ['perishsong', 'flowershield', 'rototiller'];
			if (move.target === 'foeSide' || (move.target === 'all' && !targetAllExceptions.includes(move.id))) {
				return;
			}
			const shieldsDownHolder = this.effectState.target;
			if (target.species.fullname !== 'Minior-Meteor' && move.priority > 0.1) {
				this.attrLastMove('[still]');
				this.add('cant', shieldsDownHolder, 'ability: Shields Down', move, '[of] ' + target);
			}
		},
		shortDesc: "If Minior, at 1/2 max hp, changes to Core and is immune to priority moves; else Meteor forme",
	},
};