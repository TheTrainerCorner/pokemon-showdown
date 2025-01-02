export const Rulesets: {[k: string]: ModdedFormatData} = {
	seasoncomplexbans: {
		inherit: true,
		desc: "All of the Complex Bans for Season 3",
		ruleset: [
			'No Shell Smash Mega Toise',
			'No Calm Mind For The Patio Set',
			'No Dragon Dance for the Patio Set',
		],
	},
	seasonbanlist: {
		inherit: true,
		desc: "Everything that is ban during Season 3",
		banlist: [
			// Tiers
			'ND Uber', 'ND AG',
			// Abilities
			'Moody', 'Power Construct', 'Shadow Tag',
			// Items
			'King\'s Rock', 'Quick Claw', 'Razor Fang',
			// Moves
			'Assist', 'Last Respects',
		],
	}
};