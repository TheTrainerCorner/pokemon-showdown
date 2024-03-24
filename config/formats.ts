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

	{
		section: "TTC Cherish Ball Division",
	},
	{
		name: "[Gen 9] National Dex Cherish Ball",
		desc: "This format is for Cherish Ball Division.",
		mod: "ttc_current",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod', 'No Shell Smash Mega Toise', 'Z-Move Clause', 'Dynamax Clause', 'Terastal Clause', 'No Calm Mind For The Patio Set', 'No Dragon Dance For The Patio Set'],
		banlist: [
			'ND Uber', 'ND AG', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock',
			'Quick Claw', 'Razor Fang', 'Assist', 'Last Respects',
		],
		unbanlist: [
			'Unreleased',
			// Unobtainable Moves
			'Barb Barrage',
			'Blazing Torque',
			'Ceaseless Edge',
			'Chloroblast',
			'Combat Torque',
			'Dire Claw',
			"Dragon's Maw",
			'Esper Wing',
			'Infernal Parade',
			'Magical Torque',
			'Mountain Gale',
			'Noxious Torque',
			'Psyshield Bash',
			'Raging Fury',
			'Shelter',
			'Springtide Storm',
			'Stone Axe',
			'Triple Arrows',
			'Victory Dance',
			'Wicked Torque',
			'Custap Berry',
			// LGPE
			'LGPE',
			'Baton Pass',
			// Items
			'Thick Club'
		],
	},
	{
		section: "TTC Luxury Ball Division",
	},
	{
		name: "[Gen 9] National Dex Luxury Ball",
		desc: "This format is for Luxury Ball Division.",
		mod: "ttc_current",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod', 'No Shell Smash Mega Toise', 'Z-Move Clause', 'Dynamax Clause', 'Terastal Clause', 'No Calm Mind For The Patio Set', 'No Dragon Dance For The Patio Set'],
		banlist: [
			'ND Uber', 'ND AG', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock',
			'Quick Claw', 'Razor Fang', 'Assist', 'Last Respects',
		],
		unbanlist: [
			'Unreleased',
			// Unobtainable Moves
			'Barb Barrage',
			'Blazing Torque',
			'Ceaseless Edge',
			'Chloroblast',
			'Combat Torque',
			'Dire Claw',
			"Dragon's Maw",
			'Esper Wing',
			'Infernal Parade',
			'Magical Torque',
			'Mountain Gale',
			'Noxious Torque',
			'Psyshield Bash',
			'Raging Fury',
			'Shelter',
			'Springtide Storm',
			'Stone Axe',
			'Triple Arrows',
			'Victory Dance',
			'Wicked Torque',
			'Custap Berry',
			// LGPE
			'LGPE',
			'Baton Pass',
			// Items
			'Thick Club'
		],
	},
	{
		section: "TTC Pokeball Division",
	},
	{
		name: "[Gen 9] National Dex Pokeball",
		desc: "This format is for Pokeball Division.",
		mod: "ttc_current",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod', 'No Shell Smash Mega Toise', 'Z-Move Clause', 'Dynamax Clause', 'Terastal Clause', 'No Calm Mind For The Patio Set', 'No Dragon Dance For The Patio Set'],
		banlist: [
			'ND Uber', 'ND AG', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock',
			'Quick Claw', 'Razor Fang', 'Assist', 'Last Respects',
		],
		unbanlist: [
			'Unreleased',
			// Unobtainable Moves
			'Barb Barrage',
			'Blazing Torque',
			'Ceaseless Edge',
			'Chloroblast',
			'Combat Torque',
			'Dire Claw',
			"Dragon's Maw",
			'Esper Wing',
			'Infernal Parade',
			'Magical Torque',
			'Mountain Gale',
			'Noxious Torque',
			'Psyshield Bash',
			'Raging Fury',
			'Shelter',
			'Springtide Storm',
			'Stone Axe',
			'Triple Arrows',
			'Victory Dance',
			'Wicked Torque',
			'Custap Berry',
			// LGPE
			'LGPE',
			'Baton Pass',
			// Items
			'Thick Club'
		],
	},
	{
		section: "TTC Speed Tour",
	},
	{
		name: "[Gen 9] National Dex Speed Tour",
		desc: "This format is for Speed TOur.",
		mod: "ttc_current",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod', 'No Shell Smash Mega Toise', 'Z-Move Clause', 'Dynamax Clause', 'Terastal Clause', 'No Calm Mind For The Patio Set', 'No Dragon Dance For The Patio Set'],
		banlist: [
			'ND Uber', 'ND AG', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock',
			'Quick Claw', 'Razor Fang', 'Assist', 'Last Respects',
		],
		unbanlist: [
			'Unreleased',
			// Unobtainable Moves
			'Barb Barrage',
			'Blazing Torque',
			'Ceaseless Edge',
			'Chloroblast',
			'Combat Torque',
			'Dire Claw',
			"Dragon's Maw",
			'Esper Wing',
			'Infernal Parade',
			'Magical Torque',
			'Mountain Gale',
			'Noxious Torque',
			'Psyshield Bash',
			'Raging Fury',
			'Shelter',
			'Springtide Storm',
			'Stone Axe',
			'Triple Arrows',
			'Victory Dance',
			'Wicked Torque',
			'Custap Berry',
			// LGPE
			'LGPE',
			'Baton Pass',
			// Items
			'Thick Club'
		],
	},
	{
		section: "TTC Department of Testing",
	},
	{
		name: "[Gen 9] National Dex DoT",
		desc: "This format is for Department of Testing.",
		mod: "ttc_current",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod', 'No Shell Smash Mega Toise', 'Z-Move Clause', 'Dynamax Clause', 'Terastal Clause', 'No Calm Mind For The Patio Set', 'No Dragon Dance For The Patio Set'],
		banlist: [
			'ND Uber', 'ND AG', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock',
			'Quick Claw', 'Razor Fang', 'Assist', 'Last Respects',
		],
		unbanlist: [
			'Unreleased',
			// Unobtainable Moves
			'Barb Barrage',
			'Blazing Torque',
			'Ceaseless Edge',
			'Chloroblast',
			'Combat Torque',
			'Dire Claw',
			"Dragon's Maw",
			'Esper Wing',
			'Infernal Parade',
			'Magical Torque',
			'Mountain Gale',
			'Noxious Torque',
			'Psyshield Bash',
			'Raging Fury',
			'Shelter',
			'Springtide Storm',
			'Stone Axe',
			'Triple Arrows',
			'Victory Dance',
			'Wicked Torque',
			'Custap Berry',
			// LGPE
			'LGPE',
			'Baton Pass',
			// Items
			'Thick Club'
		],
	},
	{
		section: "Other Draft Leagues",
	},
	{
		name: "[Gen 9] Other National Dex Draft",
		desc: "This version of the National Dex Draft is for other leagues to use. Since TTC NatDex Draft format is a bit more stricter, it might be flexible with other leagues.",
		mod: "ttc_current",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod', 'No Shell Smash Mega Toise', 'Z-Move Clause', 'Dynamax Clause', 'Terastal Clause', 'No Calm Mind For The Patio Set', 'No Dragon Dance For The Patio Set'],
		banlist: [
			'ND Uber', 'ND AG', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock',
			'Quick Claw', 'Razor Fang', 'Assist', 'Last Respects',
		],
		unbanlist: [
			'Unreleased',
			// Unobtainable Moves
			'Barb Barrage',
			'Blazing Torque',
			'Ceaseless Edge',
			'Chloroblast',
			'Combat Torque',
			'Dire Claw',
			"Dragon's Maw",
			'Esper Wing',
			'Infernal Parade',
			'Magical Torque',
			'Mountain Gale',
			'Noxious Torque',
			'Psyshield Bash',
			'Raging Fury',
			'Shelter',
			'Springtide Storm',
			'Stone Axe',
			'Triple Arrows',
			'Victory Dance',
			'Wicked Torque',
			'Custap Berry',
			// LGPE
			'LGPE',
			'Baton Pass',
			// Items
			'Thick Club'
		],
	},
];
