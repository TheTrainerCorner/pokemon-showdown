export const Abilities: { [k: string]: ModdedAbilityData} = {
	rivalry: {
		inherit: true,
		onModifyDamage(dmg, source, target, move) {
			if (source === target) return;
			for (const type of target.types) {
				if (source.hasType(type)) {
					// The chain modify was probably not using 1.2 correct, so we will have to be more precise with the math.
					return this.chainModify([4916, 4096]); // 4916/4096 = ~1.2
				}
			}
		}
	},
	rkssystem: {
		inherit: true,
		onPrepareHit(source, target, move) {
			if (source.baseSpecies.name !== 'Silvally') return;
			if (move.hasBounced || move.flags['futuremove'] || move.sourceEffect !== 'snatch') return;
			const type = move.type;
			if (type && type !== '???' && source.species.name === `Silvally-${type}`) {
				source.formeChange(`Silvally-${type}`);
			}
		}
	},

};