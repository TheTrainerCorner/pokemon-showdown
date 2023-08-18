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
	{ section: "TTC Draft" },
	{
		name: "[Gen 9] Official Draft",
		desc: "This is the Official Draft Mod for The Trainer's Corner!",

		mod: 'gen9ttc',
		ruleset: ['TTC Single'],
	},
	{ section: "Other Draft Leagues" },
	{ section: "Public Test Relam" },
	{
		name: "[Gen 9] PTR Format",
		desc: "This is the PTR format to test pokemon changes.",
		mod: 'gen9ttc',
		ruleset: ['TTC PTR'],
	}

];