export const Rulesets: {[k: string]: ModdedFormatData} = {
	ttcDraft: {
		name: "TTC Draft",
		effectType: 'ValidatorRule',
		desc: 'The Draft format for The Trainer Corner',
		ruleset: [
			'Obtainable', '+Unobtainable', '+Past', 'Sketch Post-Gen 7 Moves', 'Team Preview', 'Nickname Clause', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause',
		],
		onValidateSet(set) {
			const species = this.dex.species.get(set.species);

			if(species.draftTier === 'Illegal' || species.draftTier === 'Banned') {
				if (this.ruleTable.has(`+pokemon:${species.id}`)) return;
				return [`${set.name || set.species} does not exist in the Draft Format.`];
			}

			const requireObtainable = this.ruleTable.has('obtainable');
			if(requireObtainable) {
				if(species.draftTier === 'Unreleased') {
					const basePokemon = this.toID(species.baseSpecies);
					if(this.ruleTable.has(`+pokemon:${species.id}`) || this.ruleTable.has(`+basepokemon:${basePokemon}`)) {
						return;
					}
					return [`${set.name || set.species} does not exist in the Draft Format.`];
					
				}
			}

			for (const moveid of set.moves) {
				const move = this.dex.moves.get(moveid);
				if(move.isNonstandard === 'Unobtainable' && move.gen === this.dex.gen || move.id === 'lightofruin') {
					if(this.ruleTable.has(`+move:${move.id}`)) continue;
					const problem = `${set.name}'s move ${move.name} does not exist in the Draft Format.`;
					if(this.ruleTable.has('omunobtainablemoves')) {
						const outOfBattleSpecies = this.getValidationSpecies(set)[0];
						if (this.omCheckCanLearn(move, outOfBattleSpecies, this.allSources(outOfBattleSpecies), set, problem)) continue;
					}
					return [problem];
				}
			}
			// Any item that was legal in Gen 7 (Normal Gem for example) should be usable
			if (!set.item) return;
			let item = this.dex.items.get(set.item);
			let gen = this.dex.gen;
			while (item.isNonstandard && gen >= 7) {
				item = this.dex.forGen(gen).items.get(item.id);
				gen--;
			}
			if (requireObtainable && item.isNonstandard) {
				if (this.ruleTable.has(`+item:${item.id}`)) return;
				return [`${set.name}'s item ${item.name} does not exist in Gen ${this.dex.gen}.`];
			}
		}		
	}
}