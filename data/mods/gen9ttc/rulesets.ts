export const Rulesets: {[k: string]: ModdedFormatData} = {
	ttcdraft: {
		effectType: "ValidatorRule",
		name: "TTC Draft",
		desc: "The custom draft league ruleset",
		ruleset: [
			'Obtainable', 'Team Preview', 'Sleep Clause Mod', 'OHKO Clause', 'Evasion Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod'
		],
		banlist: ['Banned'],
		
	}
}