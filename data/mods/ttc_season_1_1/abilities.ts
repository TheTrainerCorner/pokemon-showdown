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
	},
	rkssystem: {
		inherit: true,
		onPrepareHit(source, target, move) {
			if(source.baseSpecies.name !== 'Silvally') return;
			if(this.effectState.rkssystem) return;
			if(move.hasBounced || move.flags['futuremove'] || move.sourceEffect !== 'snatch') return;
			const type = move.type;
			if(type && type !== '???' && source.getTypes().join() !== type) {
				if(!source.formeChange(`Silvally-${type}`, this.effect, true)) return;
				this.effectState.rkssystem = true;
			}
		},
		onSwitchIn(pokemon) {
			delete this.effectState.rkssystem;
		},
		desc: "If this Pokemon is Silvally; Silvally will change its form to match the type of the move it is about to use. This effect comes after all effects that change a move's type. This effect can only happen once per switch-in, and only if this Pokemon is not Terastallized.",
		shortDesc: "If Silvally; Changes Form based on the type of the move about to use.",
	},
};
