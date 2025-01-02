export const Rulesets: {[k: string]: ModdedFormatData} = {
	offseasoncomplexbans: {
		inherit: true,
		ruleset: [
			'No Calm Mind For The Patio Set',
			'No Dragon Dance For The Patio Set',
			'No Dragon Dance For Kyurem-Black',
			'No Last Respects For Basculegion',
		],
	},
	offseasonunbanlist: {
		inherit: true,
		unbanlist: [
			// Tier
			'ND Uber',
			// Adding this just in case
			'Unreleased',
			// Tiers
			'LGPE',
			// Moves
			'Barb Barrage', 'Baton Pass','Blazing Torque', 'Ceaseless Edge',
			'Chloroblast', 'Combat Torque', 'Dire Claw',
			"Dragon's Maw", 'Esper Wing', 'Infernal Parade',
			'Magical Torque', 'Mountain Gale', 'Noxious Torque',
			'Psyshield Bash', 'Raging Fury', 'Shelter',
			'Springtide Storm', 'Stone Axe', 'Triple Arrows',
			'Victory Dance', 'Wicked Torque', 'Last Respects',
			// Items
			'Custap Berry', 'Thick Club', 'Full Incense',
			'Lax Incense', 'Odd Incense', 'Rock Incense',
			'Rose Incense', 'Sea Incense', 'Wave Incense',
			'Burn Drive', 'Chill Drive', 'Douse Drive', 'Shock Drive'
		],
	},
	offseasonbanlist: {
		inherit: true,
		banlist: [
			// Tiers
			'ND AG',
			// Abilities
			'Moody', 'Shadow Tag',
			// Items
			'King\'s Rock', 'Quick Claw', 'Razor Fang',
			// Moves
			'Assist',
		],
	},
};