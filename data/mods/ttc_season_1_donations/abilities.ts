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
	colorchange: {
		inherit: true,
		onAfterMoveSecondary: undefined,
		onFoeBeforeMove(source, target, move) {
			if (!target.hp) return;
			const type = move.type
			if (target.isActive && move.effectType === 'Move' && move.category !== 'Status' && type !== '???') {
				let _type = this.dex.types.get(type);
			
				let types = this.dex.types.allCache;
				// 2 = Resistance.
				let resultType = types?.find(x => _type.damageTaken[x.id] === 2);

				if (!target.hasType(resultType!.name)) return false;
				this.add('-start', target, 'typechange', type, '[from] ability: Color Change');

				if (target.side.active.length === 2 && target.position === 1) {
					const action = this.queue.willMove(target);
					if (action && action.move.id === 'curse') {
						action.targetLoc = -1;
					}
				}
			}
		},
		desc: "The user's type changes to resist the oncoming move from the opposing pokemon.",
		shortDesc: "Changes type based on the oncoming move to resist it.",
	},
	sharpenedleek: {
		num: -2001,
		name: "Sharpened Leek",
		// Sharpness
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['slicing']) {
				this.debug('Sharpened Leek boost');
				return this.chainModify(1.5);
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon, target, move) {
			return this.chainModify(1.2);
		},
		desc: "Sharpness + Attack increased by 1.2x",
		shortDesc: "Sharpness + Attack increased by 1.2x",
	},
	petrifyinggaze: {
		num: -2002,
		name: "Petrifying Gaze",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Petrifying Gaze', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) this.add('-immune', target);
				else this.boost({spe: -1}, target, pokemon, null, true);
			}
		},
		desc: "Lowers the opponent's speed stat by 1 stage on Switch-In",
		shortDesc: "On Switch-In; Lowers opposing side's Speed by 1 stage.",
		rating: 3.5,
	},

};