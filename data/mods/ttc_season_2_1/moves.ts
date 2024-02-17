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
	}
};