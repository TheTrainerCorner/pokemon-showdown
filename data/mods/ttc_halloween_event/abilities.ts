export const Abilities: {[k: string]: ModdedAbilityData} = {
	// New Ability
	hauntedlight: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ghost') {
				this.debug('Haunted Light boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ghost') {
				this.debug('Haunted Light boost');
				return this.chainModify(1.5);
			}
		},
		name: "Haunted Light",
		rating: 3.5,
		num: -200,
		shortDesc: "This Pokemon's offensive stat is multiplied by 1.5 while using a Ghost-type attack.",
	},
	eeriecry: {
		// Trick or Treat
		onStart(pokemon) {
			for (const target of pokemon.adjacentFoes()) {
				if (target.hasType('Ghost')) return false;
				if (!target.addType('Ghost')) return false;
				this.add('-start', target, 'typeadd', 'Ghost', '[from] ability: Eerie Cry');

				if(target.side.active.length === 2 && target.position === 1) {
					// Curse Glitch
					const action = this.queue.willMove(target);
					if(action && action.move.id === 'curse') {
						action.targetLoc = -1;
					}
				}
			}
		},
		// Tangling Hair
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.add('-ability', target, 'Tangling Hair');
				this.boost({spe: -1}, source, target, null, true);
			}
		},
		name: "Eerie Cry",
		rating: 3.5,
		num: -201,
		shortDesc: "When this Pokemon is sent out automatically activates trick or treat. Also combine tangling hair into this ability.",
	}
}