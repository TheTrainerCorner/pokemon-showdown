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
import { Config } from "../server/config-loader";
export const Formats: FormatList = [
	// {
	// 	section: "TTC Season 2 Offseason",
	// },
	// {
	// 	name: "[Gen 9] National Dex Monotype",
	// 	mod: Config.ttcseason,
	// 	ruleset: [
	// 		'Standard Natdex', 'Terastal Clause',
	// 		'Species Clause', 'OHKO Clause', 'Evasion Clause',
	// 		'Sleep Clause Mod',

	// 		'Season Complex Bans', 'Season Unbanlist', 'Season Banlist',
	// 		'Offseason Complex Bans', 'Offseason Banlist',
	// 	],
	// },
	{
		section: "TTC Cherish Ball Division",
	},
	{
		name: "[Gen 9] National Dex Cherish Ball",
		desc: "This format is for Cherish Ball Division.",
		mod: Config.ttcseason,
		ruleset: [
			'Standard NatDex', 'OHKO Clause', 'Evasion Clause',
			'Species Clause', 'Sleep Clause Mod', 'Z-Move Clause',
			'Dynamax Clause', 'Terastal Clause',
			'Season Complex Bans', 'Season Unbanlist', 'Season Banlist'
		],
	},
	{
		section: "TTC Luxury Ball Division",
	},
	{
		name: "[Gen 9] National Dex Luxury Ball",
		desc: "This format is for Luxury Ball Division.",
		mod: Config.ttcseason,
		ruleset: [
			'Standard NatDex', 'OHKO Clause', 'Evasion Clause',
			'Species Clause', 'Sleep Clause Mod', 'Z-Move Clause',
			'Dynamax Clause', 'Terastal Clause',
			'Season Complex Bans', 'Season Unbanlist', 'Season Banlist'
		],
	},
	{
		section: "TTC Pokeball Division",
	},
	{
		name: "[Gen 9] National Dex Pokeball",
		desc: "This format is for Pokeball Division.",
		mod: Config.ttcseason,
		ruleset: [
			'Standard NatDex', 'OHKO Clause', 'Evasion Clause',
			'Species Clause', 'Sleep Clause Mod', 'Z-Move Clause',
			'Dynamax Clause', 'Terastal Clause',
			'Season Complex Bans', 'Season Unbanlist', 'Season Banlist'
		],
	},
	{
		section: "TTC Love Ball Division",
	},
	{
		name: "[Gen 9] National Dex Love Ball",
		desc: "This format is for Love Ball Division.",
		mod: Config.ttcseason,
		ruleset: [
			'Standard NatDex', 'OHKO Clause', 'Evasion Clause',
			'Species Clause', 'Sleep Clause Mod',
			'Z-Move Clause', 'Dynamax Clause', 'Terastal Clause',
			'Season Complex Bans', 'Season Unbanlist', 'Season Banlist',
		],
	},
	{
		section: "TTC Speed Tour",
	},
	{
		name: "[Gen 9] National Dex Speed Tour",
		desc: "This format is for Speed TOur.",
		mod: Config.ttcseason,
		ruleset: [
			'Standard NatDex', 'OHKO Clause', 'Evasion Clause',
			'Species Clause', 'Sleep Clause Mod', 'Z-Move Clause',
			'Dynamax Clause', 'Terastal Clause',
			'Season Complex Bans', 'Season Unbanlist', 'Season Banlist'
		],
	},
	{
		section: "TTC Department of Testing",
	},
	{
		name: "[Gen 9] National Dex DoT",
		desc: "This format is for Department of Testing.",
		mod: Config.ttcseason,
		ruleset: [
			'Standard NatDex', 'OHKO Clause', 'Evasion Clause',
			'Species Clause', 'Sleep Clause Mod', 'Z-Move Clause',
			'Dynamax Clause', 'Terastal Clause',
			'Season Complex Bans', 'Season Unbanlist', 'Season Banlist'
		],
	},
	{
		name: "[Gen 9] Custom Test",

		mod: Config.ttcseason,
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},
	{
		section: "Other Draft Leagues",
	},
	{
		name: "[Gen 9] Other National Dex Draft",
		desc: "This version of the National Dex Draft is for other leagues to use. Since TTC NatDex Draft format is a bit more stricter, it might be flexible with other leagues.",
		mod: Config.ttcseason,
		ruleset: [
			'Standard NatDex', 'OHKO Clause', 'Evasion Clause',
			'Species Clause', 'Sleep Clause Mod', 'Z-Move Clause',
			'Dynamax Clause', 'Terastal Clause',
			'Season Complex Bans', 'Season Unbanlist', 'Season Banlist'
		],
	},
	{
		name: "[Gen 9] Custom Battle",
		mod: Config.ttcseason,
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},
	{
		name: "[Gen 9] Free-For-All",
		mod: Config.ttcseason,
		gameType: 'freeforall',
		rated: false,
		tournamentShow: false,
		ruleset: [
			'OHKO Clause', 'Evasion Clause',
			'Species Clause', 'Sleep Clause Mod', 'Z-Move Clause',
			'Dynamax Clause', 'Terastal Clause',
			'Season Complex Bans', 'Season Unbanlist', 'Season Banlist'
		],
	},
];
