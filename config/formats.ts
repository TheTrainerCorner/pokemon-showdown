// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.ts
/*
If you want to add custom formats, create a file in this folder named: "custom-formats.ts"

Paste the following code into the file and add your desired formats and their sections between the brackets:
--------------------------------------------------------------------------------
// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.ts

export const Formats: FormatList = [
];
--------------------------------------------------------------------------------

If you specify a section that already exists, your format will be added to the bottom of that section.
New sections will be added to the bottom of the specified column.
The column value will be ignored for repeat sections.
*/

export const Formats: FormatList = [
	// Singles
	///////////////////////////////////////
	{
		section: "The Trainer Corner's Draft"
	},
	// {
	// 	name: "[Gen 9] Random Battle",
	// 	desc: `Randomized teams of level-balanced Pok&eacute;mon with sets that are generated to be competitively viable.`,
	// 	mod: 'gen9ttc',
	// 	team: 'random',
	// 	ruleset: ['Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod'],
	// },
	// {
	// 	name: "[Gen 9] Wintabura Draft",
	// 	mod: 'wintabura',
	// 	searchShow: false,
	// 	ruleset: ['Standard', 'Dynamax Clause', 'Z-Move Clause'],
	// 	banlist: [],
	// },
	{
		name: "[Gen 9] Draft",
		mod: 'gen9ttc',
		ruleset: ['TTC Draft', 'Standard NatDex'],
		banlist: ['Banned']
	},
	{
		name: "[Gen 9] National Dex",
		mod: 'gen9ttc',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod'],
		banlist: ['ND Uber', 'ND AG', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock', 'Quick Claw', 'Razor Fang', 'Assist', 'Baton Pass', 'Shed Tail'],
	},
	{
		name: "[Gen 9] Ubers",
		mod: "gen9ttc",
		ruleset: ['Standard', 'Dynamax Clause', 'Z-Move Clause'],
		banlist: ['AG', 'Moody'], 
	}
];
