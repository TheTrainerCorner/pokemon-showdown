export const Rulesets: {[k: string]: ModdedFormatData} = {
	seasoncomplexbans: {
		inherit: true,
		desc: "All of the complex bans for Offseason",
		ruleset: [],
	},
	seasonunbanlist: {
		inherit: true,
		desc: "All of the unbans during Offseason",
		unbanlist: [
			'ND Ubers',
			'Burn Drive',
			'Chill Drive',
			'Douse Drive',
			'Shock Drive'
		],
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