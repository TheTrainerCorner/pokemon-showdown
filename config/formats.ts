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
		section: "Wintabura Singles",
		name: "[Gen 9] Random Battle",
		desc: `Randomized teams of level-balanced Pok&eacute;mon with sets that are generated to be competitively viable.`,
		mod: 'gen9wintabura',
		team: 'random',
		ruleset: ['Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod'],
	},
	// {
	// 	name: "[Gen 9] Wintabura Draft",
	// 	mod: 'wintabura',
	// 	searchShow: false,
	// 	ruleset: ['Standard', 'Dynamax Clause', 'Z-Move Clause'],
	// 	banlist: [],
	// },
	{
		name: "[Gen 9] OU",
		mod: 'gen9wintabura',
		ruleset: ['Standard', 'Dynamax Clause', 'Z-Move Clause'],
		banlist: ['Uber', 'AG', 'Moody', 'Power Construct', 'Shadow Tag', 'Arena Trap', 'Swagger', 'Misty Explosion'],
	},
	{
		name: "[Gen 9] Ubers",
		mod: "gen9wintabura",
		ruleset: ['Standard', 'Dynamax Clause', 'Z-Move Clause'],
		banlist: ['AG', 'Moody'], 
	}
];
