// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.ts

export const Formats: FormatList = [
	{
		section: "The Trainer's Corner Draft",
	},
	{
		name: "[Gen 9] Draft",
		mod: 'gen9ttc',
		desc: "The Offical Draft format for TTC! Tiers in this format are different and refelect the league's point tiers. If you are here from a different league, then It is recommended that you use [Gen 9] Other Draft.",
		ruleset: [
			'TTC Draft', 'Obtainable', '+Unreleased', '+CAP', 'Team Preview', 'Sleep Clause Mod', 'OHKO Clause', 'Evasion Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod'
		]
	}
];