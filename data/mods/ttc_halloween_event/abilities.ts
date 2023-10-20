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
}