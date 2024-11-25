export const Rulesets: {[k: string]: ModdedFormatData} = {
	seasoncomplexbans: {
		inherit: true,
		desc: "All of the complex bans for Offseason",
		ruleset: [],
	},
	seasonbanlist: {
		inherit: true,
		desc: "Everything that is ban during Offseason",
		banlist: [
			// Tiers
			'ND AG',
			// Abilities
			'Moody', 'Shadow Tag',
			// Items
			'King\'s Rock', 'Quick Claw', 'Razor Fang',
			// Moves
			'Assist', 'Last Respects',
		],
	},
};