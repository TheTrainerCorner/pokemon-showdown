export const Moves: {[k: string]: ModdedMoveData} = {
	swarmterrain: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source.hasItem('terrainextender')) return 8;
				return 5;
			},
			onFieldStart(field, source, effect) {
				if (effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Swarm Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Swarm Terrain');
				}
			},
			onBeforeMovePriority: 5,
			onBeforeMove(attacker, defender, move) {
				if (!move.isZ && !move.isMax && move.selfBoost) {
					this.add('cant', attacker, 'move: Swarm Terrain', move);
					return false;
				}
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					const move = this.dex.moves.get(moveSlot.id);
					if (move.selfBoost) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Swarm Terrain');
			},
		},
	},
	synchronoise: {
		inherit: true,
		pp: 5,
	},
	leechlife: {
		inherit: true,
		flags: {bite: 1, contact: 1, mirror: 1, heal: 1},
	},
	glacier: {
		inherit: true,
		pp: 15,
	},
	coldsnap: {
		inherit: true,
		pp: 15,
	},
	guidingblessing: {
		inherit: true,
		condition: {
			duration: 2,
			onStart(pokemon, source) {
				this.add('-singleturn', pokemon, 'Guiding Blessing', '[of]' + source);
				this.effectState.hp = source.maxhp / Math.floor(3/4);
			},
			onResidualOrder: 4,
			onEnd(target) {
				if (target && !target.fainted) {
					const damage = this.heal(this.effectState.hp, target, target);
					if (damage) {
						this.add('-heal', target, target.getHealth, '[from] move: Guiding Blessing', '[blesser]' + this.effectState.source.name);
					}
				}
			}
		},
		desc: "When the move is used, its effects take place at the end of the next turn (like wish). It heals the recipient for 75% of their hp.",
		shortDesc: "Next Turn; Heal 3/4 of max hp",
	}
};