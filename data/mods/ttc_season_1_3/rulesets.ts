export const Rulesets: {[k: string]: ModdedFormatData} = {
	lowtierrules: {
		effectType: "ValidatorRule",
		name: "Low Tier Rules",
		desc: "Ruleset for Low Tiers",
		ruleset: [
			'No Weather Rocks in Low Tier', 
			'No Weather in Low Tier', 
			'No Arena Trap For Stunfisk-Galar in Low Tier', 
			'No Speed Boost For Espathra in Low Tier'
		],
		onBegin() {
			this.add('rule', 'Low Tier Rules: This match is under the ruling of our Low Tier Rules.')
		}
	},

	noweatherrocksinlowtier: {
		effectType: "ValidatorRule",
		name: "No Weather Rocks in Low Tier",
		desc: "Doesn't allow the use of weather rocks in Low Tier.",
		onValidateSet(set) {
			const problems = [];
			const weatherRocks = ['Damp Rock', 'Icy Rock', 'Heat Rock', 'Smooth Rock'];

			if (weatherRocks.includes(set.item)) {
				problems.push(`${set.name} can not hold ${set.item} due to it being Low Tiers.`);
			}
		},
	},
	noweatherinlowtier: {
		effectType: "ValidatorRule",
		name: "No Weather in Low Tier",
		desc: "Doesn't allow the use of weather abilities in Low Tier",
		onValidateSet(set) {
			const problems = [];
			const weatherAbilities = [
				'Drizzle',
				'Drought',
				'Snow Warning',
				'Sand Stream',
				'Sand Spit',
				'Chilling Neigh',
				'Delta Stream',
			];

			if(weatherAbilities.includes(set.ability)) {
				problems.push(`${set.name} can not have ${set.ability} due to it being a weather ability in Low Tiers.`);
			}

			return problems;
		}
	},
	noarenatrapforstunfiskgalarinlowtier: {
		effectType: "ValidatorRule",
		name: "No Arena Trap For Stunfisk-Galar in Low Tier",
		desc: "Prevents Stunfisk-Galar from having Arena Trap in Low Tier.",
		onValidateSet(set) {
			const problems = [];
			const stunfiskGalar = this.dex.species.get('Stunfisk-Galar');
			const arenaTrap = this.dex.abilities.get('Arena Trap');
			if (set.species === stunfiskGalar.name) {
				if(set.ability === arenaTrap.name) {
					problems.push(`${set.name} can not have Arena Trap due to it being Low Tiers.`);
				}
			}
			return problems;
		},
	},
	nospeedboostforespathrainlowtier: {
		effectType: "ValidatorRule",
		name: "No Speed Boost For Espathra in Low Tier",
		desc: "Prevents Espathra from having Speed Boost in Low Tier",
		onValidateSet(set) {
			const problems = [];
			const espathra = this.dex.species.get('Espathra');
			const speedBoost = this.dex.abilities.get('Speed Boost');
			
			if (set.species === espathra.name) {
				if (set.ability === speedBoost.name) {
					problems.push(`${set.name} can not have Speed Boost due to it being Low Tiers.`);
				}
			}
			return problems;
		}
	}
};