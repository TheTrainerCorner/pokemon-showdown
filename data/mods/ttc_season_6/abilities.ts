export const Abilities: { [k: string]: ModdedAbilityData; } = {
	spectralfist: {
		onModifyMove(move) {
			if (move.flags['contact'] && move.flags['punch']) delete move.flags['protect'];
		},
		onSourceDamagingHit(damage, target, source, move) {
			let activated = false;
			for (const sideCondition of ['reflect', 'lightscreen', 'auroraveil']) {
				if (target.side.getSideCondition(sideCondition)) {
					if (!activated) {
						this.add('-activate', source, 'ability: Spectral Fist');
						activated = true;
					}
					target.side.removeSideCondition(sideCondition);
				}
			}
		},
		name: "Spectral Fist",
		shortDesc: "This Pokemon's Punching moves that make contact bypass Protect, and destroy Screens.",

	},
	onslaught: {
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! != 0) {
					delete boost[i];
					showMsg = true;
				}
			}

			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add('-ability', source, 'Onslaught');
			}
		},
		name: "Onslaught",
		shortDesc: "This Pokemon cannot have its stats lowered by either the opposing pokemon or itself.",
	},
	overcharged: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.boost({spe: 1})) {
					this.add('-immune', target, '[from] ability: Overcharged');
					this.damage(source.baseMaxhp / 16, source, target);
				}
				return null;

				}
			},
			name : "Overcharged",
			shortDesc: "This Pokemon is immune to Electric-type moves. If hit by an Electric-type move, this pokemons speed increases by one stage and the attacking pokemon takes 1/16th of its max health as damage",
		}
	
	
};