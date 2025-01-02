export const Rulesets: {[k: string]: ModdedFormatData} = {
	offseasonbanlist: {
		inherit: true,
		banlist: [],
	},
	seasoncomplexbans: {
		inherit: true,
		desc: "All of the complex bans for Offseason",
		ruleset: [],
	},
	seasonunbanlist: {
		inherit: true,
		desc: "All of the unbans during Offseason",
		unbanlist: [
			'ND Uber',
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
	noshellsmashmegatoise: {
		inherit: true,
		onValidateSet(_) {
			return [];
		}
	},
	nocalmmindforthepatioset: {
		inherit: true,
		onValidateSet(_) {
			return [];
		}
	},
	nodragondanceforkyub: {
		inherit: true,
		onValidateSet(_) {
			return [];
		}
	},
	offseasoncomplexbankyuremblack: {
		inherit: true,
		onValidateSet(_) {
			return [];
		}
	}
};