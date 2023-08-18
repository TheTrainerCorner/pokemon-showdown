export const Rulesets: {[k: string]: ModdedFormatData} = {
	ttcsingle: {
		effectType: 'ValidatorRule',
		name: 'TTC Single',
		desc: "The Trainer's Corner Single Battle ruleset.",
		ruleset: [
			'Standard', 'Dynamax Clause', 'Gems Clause',
		],
		banlist: [
			'Uber', 'AG',
			'Moody', 'Power Construct', 'Shadow Tag', 'Arena Trap', 'Centiskorch-Sevii + Shed Skin', 'Centiskorch-Sevii + Mold Breaker',
			'Swagger', 'Dark Hole', 'Hydro Cannon', 'Blast Burn', 'Frenzy Plant', 'Shed Tail', 'Last Respects',
			'Eevium Z', "Mewnium Z",
		],
		unbanlist: [

		],
	}
}