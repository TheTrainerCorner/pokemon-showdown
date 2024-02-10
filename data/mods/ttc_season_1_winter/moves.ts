export const Moves: {[k: string]: ModdedMoveData} = {
	guidingblessing: {
		num: -15001,
		name: "Guiding Blessing",
		accuracy: 100,
		basePower: 0,
		pp: 5,
		category: "Status",
		priority: 0,
		flags: {snatch: 1, heal: 1},
		slotCondition: "Guiding Blessing",
		condition: {
			duration: 2,
			onStart(pokemon, source) {
				this.effectState.multiplier = 1.5;
				this.add('-singleturn', pokemon, 'Guiding Blessing', '[of] ' + source);
				this.effectState.hp = source.maxhp /2;
			},
			onRestart(target, source) {
				this.effectState.multiplier *= 1.5;
				this.add('-singleturn', target, 'Helping Hand', '[of] ' + source);
			},
			onBasePowerPriority: 10,
			onBasePower(basePower) {
				this.debug('Boosting from Guiding Blessing: ' + this.effectState.multiplier);
				return this.chainModify(this.effectState.multiplier);
			},
			onResidualOrder: 4,
			onEnd(target) {
				if (target && !target.fainted) {
					const damage = this.heal(this.effectState.hp, target, target);
					if (damage) {
						this.add('-heal', target, target.getHealth, '[from] move: Guiding Blessing', '[blesser] ' + this.effectState.source.name);
					}
				}
			}
		},
		secondary: null,
		target: "self",
		type: "Fairy",
		contestType: "Cute",
		desc: "When the move is used, its effects take place at the end of the next turn (like wish). It heals the recipient for 50% (ala pre gen 5 wish) and gives them a helping hand boost on their next attack",
		shortDesc: "Next Turn; Heal 1/2 of max hp, and the effects of Helping Hand."
	},
	snowtimesong: {
		num: -15002,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Snowtime Song",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1},
		secondary: null,
		onModifyMove(move, pokemon) {
			if (pokemon.species.baseSpecies === "Meloetta" && pokemon.species.forme === "Caroler") {
				move.category = "Special";
			} else if (pokemon.species.baseSpecies === "Meloetta" && pokemon.species.forme === "Aurora") {
				move.category = "Physical";
			} else move.category = "Special";
		},
		onHit(target, pokemon, move) {
			if (pokemon.baseSpecies.baseSpecies === 'Meloetta' && pokemon.species.forme === "Caroler" && !pokemon.transformed) {
				move.willChangeForme = true;
			}
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.willChangeForme) {
				const meloettaFrome = pokemon.species.id === "meloettaaurora" ? '-Caroler' : '-Aurora';
				pokemon.formeChange('Meloetta' + meloettaFrome, this.effect, false, '[msg]');
			}
		},
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Beautiful",
	},
};