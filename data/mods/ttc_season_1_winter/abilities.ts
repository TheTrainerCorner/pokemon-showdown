export const Abilities: {[k: string]: ModdedAbilityData} = {
	frigidinspiration: {
		onModifyAtkPriority: 6,
		onModifyAtk(atk, source, target, move) {
			if (source.species.baseSpecies === "Meloetta" && source.species.forme === "Aurora") {
				return this.chainModify(1.3);
			}
		},
		onModifySpAPriority: 6,
		onModifySpA(atk, source, target, move) {
			if (source.species.baseSpecies === "Meloetta" && source.species.forme === "Caroler") {
				return this.chainModify(1.3);
			}
		},
		num: -15001,
		name: "Frigid Inspiration",
		rating: 5.0,
	}
};