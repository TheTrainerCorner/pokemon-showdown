export const Rulesets: {[k: string]: ModdedFormatData} = {
	ttcsingle: {
		effectType: 'ValidatorRule',
		name: 'TTC Single',
		desc: "The Trainer's Corner Single Battle ruleset.",
		ruleset: [
			'Standard', 'Dynamax Clause', 'Gems Clause', '+Past', '+Unobtainable'
		],
		banlist: [
			'Uber', 'AG',
		],
		unbanlist: [

		],
	},
	ttcptr: {
		effectType: 'ValidatorRule',
		name: 'TTC PTR',
		desc: "The Trainer's Corner PTR ruleset.",
		ruleset: [
			'Standard', 'Dynamax Clause', 'Gems Clause', '+Past', '+Unobtainable',
		],
		banlist: [
			'AG',
		],
		unbanlist: [
			'Uber',
		]
	}
}