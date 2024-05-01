export const Conditions: {[k: string]: ModdedConditionData} = {
	psn: {
		inherit: true,
		onResidual(pokemon) {
			if(!pokemon.hasAbility('pastelveil')) {
				this.damage(pokemon.baseMaxhp / 8);
			}
		},
	},
	tox: {
		inherit: true,
		onResidual(pokemon) {
			if(!pokemon.hasAbility('pastelveil')) {
				if(this.effectState.stage < 15) {
					this.effectState.stage++;
				}
				this.damage(this.clampIntRange(pokemon.baseMaxhp / 16, 1) * this.effectState.stage);
			}
		}
	},

	// Weather
	raindance: {
		inherit: true,
		duration: 5,
		durationCallback(source, effect) {
			if (source.hasItem('damprock') || source.hasAbility('fieldsupport')) return 8;
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Water') {
				this.debug('rain water boost');
				return this.chainModify(1.5);
			}
			if(move.type === 'Fire' && !attacker.hasAbility('turboblaze')) {
				this.debug('rain fire suppress');
				return this.chainModify(0.5);
			}
		},
	},
	sunnday: {
		inherit: true,
		duration: 5,
		durationCallback(source, effect) {
			if (source.hasItem('heatrock') || source.hasAbility('fieldsupport')) return 8;
			return 5;
		},
	},
	sandstorm: {
		inherit: true,
		duration: 5,
		durationCallback(source, effect) {
			if (source.hasItem('smoothrock') || source.hasAbility('fieldsupport')) return 8;
			return 5;
		},
	},
	snow: {
		inherit: true,
		duration: 5,
		durationCallback(source, effect) {
			if (source.hasItem('icyrock') || source.hasAbility('fieldsupport')) return 8;
			return 5;
		}
	}
};