import { stats } from '../../../server/chat-plugins/randombattles/winrates';
export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	//#region Gen 1
	venusaur: {
		inherit: true,
		baseStats: {hp: 90, atk: 77, def: 90, spa: 95, spd: 105, spe: 80},
	},
	charizard: {
		inherit: true,
		baseStats: {hp: 78, atk: 94, def: 78, spa: 109, spd: 85, spe: 105},
	},
	charizardmegax: {
		inherit: true,
		baseStats: {hp: 78, atk: 135, def: 111, spa: 130, spd: 85, spe: 105},
	},
	charizardmegay: {
		inherit: true,
		baseStats: {hp: 78, atk: 104, def: 78, spa: 159, spd: 115, spe: 110},
	},
	blastoise: {
		inherit: true,
		baseStats: {hp: 79, atk: 63, def: 120, spa: 85, spd: 105, spe: 78},
		abilities: {0: "Torrent", 1: "Shell Armor", H: "Rain Dish"},
	},
	butterfree: {
		inherit: true,
		types: ["Bug", "Psychic"],
		baseStats: {hp: 75, atk: 45, def: 75, spa: 100, spd: 100, spe: 50},
	},
	beedrill: {
		inherit: true,
		baseStats: {hp: 65, atk: 100, def: 40, spa: 20, spd: 80, spe: 105},
		abilities: {0: "Swarm", 1: "Merciless", H: "Sniper"},
	},
	pidgeot: {
		inherit: true,
		baseStats: {hp: 83, atk: 95, def: 85, spa: 80, spd: 70, spe: 96},
		abilities: {0: "Frisk", 1: "Early Bird", H: "Defiant"},
	},
	raticate: {
		inherit: true,
		baseStats: {hp: 65, atk: 96, def: 60, spa: 50, spd: 70, spe: 102},
		abilities: {0: "Strong Jaw", 1: "Guts", H: "Hustle"},
	},
	raticatealola: {
		inherit: true,
		baseStats: {hp: 100, atk: 90, def: 70, spa: 40, spd: 90, spe: 60},
		// FAT RAT O<O
		abilities: {0: "Gluttony", 1: "Cheek Pouch", H: "Thick Fat"},
	},
	fearow: {
		inherit: true,
		types: ["Dark", "Flying"],
		baseStats: {hp: 75, atk: 100, def: 55, spa: 61, spd: 51, spe: 105},
		abilities: {0: "Frisk", H: "Sniper"},
	},
	arbok: {
		inherit: true,
		baseStats: {hp: 80, atk: 95, def: 89, spa: 65, spd: 99, spe: 75},
		abilities: {0: "Intimidate", 1: "Shed Skin", H: "Strong Jaw"},
	},
	pikachu: {
		inherit: true,
		baseStats: {hp: 35, atk: 60, def: 40, spa: 60, spd: 50, spe: 100},
	},
	raichu: {
		inherit: true,
		baseStats: {hp: 60, atk: 100, def: 55, spa: 100, spd: 80, spe: 110},
		abilities: {0: "Static", 1: "Galvanize", H: "Lightning Rod"},
	},
	raichualola: {
		inherit: true,
		baseStats: {hp: 60, atk: 85, def: 50, spa: 105, spd: 85, spe: 110},
	},
	sandslash: {
		inherit: true,
		baseStats: {hp: 85, atk: 105, def: 110, spa: 45, spd: 75, spe: 65},
		abilities: {0: "Sand Veil", 1: "Rough Skin", H: "Sand Rush"},
	},
	sandslashalola: {
		inherit: true,
		abilities: {0: "Snow Cloak", 1: "Rough Skin", H: "Slush Rush"},
	},
	nidoqueen: {
		inherit: true,
		baseStats: {hp: 100, atk: 72, def: 87, spa: 95, spd: 95, spe: 60},
	},
	nidoking: {
		inherit: true,
		baseStats: {hp: 81, atk: 112, def: 77, spa: 75, spd: 75, spe: 95},
	},
	ninetales: {
		inherit: true,
		types: ["Fire", "Ghost"],
		baseStats: {hp: 73, atk: 76, def: 75, spa: 91, spd: 100, spe: 100},
		abilities: {0: "Flash Fire", 1: "Cursed Body", H: "Bad Dreams"},
	},
	ninetalesalola: {
		inherit: true,
		baseStats: {hp: 83, atk: 67, def: 85, spa: 81, spd: 110, spe: 109},
	},
	wigglytuff: {
		inherit: true,
		baseStats: {hp: 140, atk: 70, def: 55, spa: 85, spd: 60, spe: 55},
		abilities: {0: "Fluffy", 1: "Competitive", H: "Thick Fat"},
	},
	crobat: {
		inherit: true,
		abilities: {0: "Inner Focus", 1: "Infiltrator",  H: "Vampire"},
	},
	vileplume: {
		inherit: true,
		abilities: {0: "Lingering Aroma", 1: "Neutralizing Gas", H: "Effect Spore"},
	},
	parasect: {
		inherit: true,
		baseStats: {hp: 70, atk: 105, def: 100, spa: 60, spd: 80, spe: 55},
		abilities: {0: "Regenerator", 1: "Dry Skin", H: "Damp"},
	},
	venomoth: {
		inherit: true,
		abilities: {0: "Shield Dust", 1: "Tinted Lens", H: "Compound Eyes"},
	},
	dugtrio: {
		inherit: true,
		abilities: {0: "Sand Veil", 1: "Emergency Exit", H: "Sand Force"},
	},
	dugtrioalola: {
		inherit: true,
		baseStats: {hp: 35, atk: 105, def: 60, spa: 50, spd: 70, spe: 110},
		abilities: {0: "Emergency Exit", 1: "Tangling Hair", H: "Sand Force"},
	},
	persian: {
		inherit: true,
		baseStats: {hp: 65, atk: 90, def: 60, spa: 70, spd: 65, spe: 115},
		abilities: {0: "Limber", 1: "Technician", H: "Intimidate"},
	},
	persianalola: {
		inherit: true,
		baseStats: {hp: 65, atk: 65, def: 60, spa: 90, spd: 65, spe: 115},
		abilities: {0: "Fur Coat", 1: "Technician", H: "Prankster"},
	},
	golduck: {
		inherit: true,
		types: ["Water", "Psychic"],
		baseStats: {hp: 75, atk: 82, def: 73, spa: 100, spd: 80, spe: 85},
	},
	primeape: {
		inherit: true,
		abilities: {0: "Vital Spirit", 1: "Anger Point", H: "Gorilla Tactics"},
	},
	arcanine: {
		inherit: true,
		abilities: {0: "Intimidate", 1: "Flash Fire", H: "Strong Jaw"},
	},
	poliwrath: {
		inherit: true,
		baseStats: {hp: 90, atk: 85, def: 95, spa: 70, spd: 90, spe: 70},
	},
	politoed: {
		inherit: true,
		baseStats: {hp: 95, atk: 65, def: 70, spa: 105, spd: 95, spe: 70},
	},
	machamp: {
		inherit: true,
		baseStats: {hp: 100, atk: 130, def: 90, spa: 65, spd: 95, spe: 55},
	},
	victreebel: {
		inherit: true,
		baseStats: {hp: 80, atk: 105, def: 65, spa: 100, spd: 70, spe: 70},
		abilities: {0: "Chlorophyll", 1: "Liquid Ooze", H: "Fly Trap"},
	},
	tentacruel: {
		inherit: true,
		baseStats: {hp: 90, atk: 65, def: 80, spa: 85, spd: 110, spe: 100},
		abilities: {0: "Clear Body", 1: "Toxic Debris", H: "Levitate"},
	},
	golem: {
		inherit: true,
		baseStats: {hp: 90, atk: 120, def: 130, spa: 40, spd: 75, spe: 35},
		abilities: {0: "Rock Head", 1: "Sturdy", H: "Solid Rock"},
	},
	golemalola: {
		inherit: true,
		baseStats: {hp: 85, atk: 55, def: 120, spa: 115, spd: 70, spe: 55},
	},
	rapidash: {
		inherit: true,
		types: ["Normal", "Fire"],
		baseStats: {hp: 65, atk: 100, def: 70, spa: 60, spd: 80, spe: 125},
		abilities: {0: "Reckless", 1: "Flash Fire", H: "Flame Body"},
	},
	rapidashgalar: {
		inherit: true,
		baseStats: {hp: 65, atk: 85, def: 70, spa: 95, spd: 80, spe: 125},
		abilities: {0: "Fairy Aura", 1: "Pastel Veil", H: "Magic Guard"},
	},
	slowbromega: {
		inherit: true,
		baseStats: {hp: 95, atk: 65, def: 170, spa: 130, spd: 90, spe: 30},
	},
	slowbrogalar: {
		inherit: true,
		baseStats: {hp: 95, atk: 80, def: 100, spa: 110, spd: 70, spe: 30},
	},
	magnezone: {
		inherit: true,
		abilities: {0: "Magnet Pull", 1: "Sturdy", H: "Levitate"},
	},
	farfetchd: {
		inherit: true,
		baseStats: {hp: 65, atk: 90, def: 65, spa: 58, spd: 70, spe: 90},
		abilities: {0: "Sharpness", 1: "Inner Focus", H: "Defiant"},
	},
	farfetchdgalar: {
		inherit: true,
		baseStats: {hp: 70, atk: 95, def: 65, spa: 58, spd: 70, spe: 55},
		abilities: {0: "Steadfast", 1: "No Guard", H: "Scrappy"},
	},
	sirfetchd: {
		inherit: true,
		types: ["Fighting", "Flying"],
		baseStats: {hp: 80, atk: 135, def: 95, spa: 68, spd: 82, spe: 65},
		abilities: {0: "Steadfast", 1: "Sharpness", H: "Scrappy"},
	},
	dodrio: {
		inherit: true,
		types: ["Ground", "Flying"],
		abilities: {0: "Sand Force", 1: "Early Bird", H: "Wind Rider"},
	},
	dewgong: {
		inherit: true,
		baseStats: {hp: 90, atk: 55, def: 80, spa: 90, spd: 95, spe: 70},
		abilities: {0: "Thick Fat", 1: "Water Absorb", H: "Slush Rush"},
	},
	muk: {
		inherit: true,
		baseStats: {hp: 105, atk: 85, def: 95, spa: 75, spd: 100, spe: 50},
		abilities: {0: "Regenerator", 1: "Gooey", H: "Poison Touch"},
	},
	mukalola: {
		inherit: true,
		baseStats: {hp: 85, atk: 105, def: 75, spa: 65, spd: 90, spe: 50},
		abilities: {0: "Poison Touch", 1: "Gluttony", H: "Corrosion"},
	},
	gengarmega: {
		inherit: true,
		baseStats: {hp: 65, atk: 65, def: 85, spa: 145, spd: 95, spe: 120},
		abilities: {0: "Perish Body"},
	},
	steelix: {
		inherit: true,
		baseStats: {hp: 75, atk: 85, def: 200, spa: 55, spd: 80, spe: 30},
	},
	steelixmega: {
		inherit: true,
		baseStats: {hp: 75, atk: 125, def: 230, spa: 55, spd: 110, spe: 30},
		abilities: {0: "Steelworker"},
	},
	hypno: {
		inherit: true,
		baseStats: {hp: 85, atk: 73, def: 80, spa: 83, spd: 115, spe: 70},
		abilities: {0: "Insomnia", 1: "Bad Dreams", H: "Psychic Surge"},
	},
	kingler: {
		inherit: true,
		types: ["Water", "Steel"],
		baseStats: {hp: 65, atk: 130, def: 115, spa: 50, spd: 50, spe: 75},
	},
	electrode: {
		inherit: true,
		types: ["Electric", "Steel"],
		baseStats: {hp: 60, atk: 50, def: 70, spa: 100, spd: 80, spe: 150},
		abilities: {0: "Soundproof", 1: "Baller", H: "Galvanize"},
	},
	electrodehisui: {
		inherit: true,
		baseStats: {hp: 80, atk: 50, def: 90, spa: 80, spd: 90, spe: 100},
		abilities: {0: "Soundproof", 1: "Baller", H: "Aftermath"},
	},
	exeggutor: {
		inherit: true,
		baseStats: {hp: 105, atk: 95, def: 90, spa: 125, spd: 80, spe: 40},
		abilities: {0: "Sap Sipper", 1: "Thick Fat", H: "Harvest"},
	},
	exeggutoralola: {
		inherit: true,
		baseStats: {hp: 95, atk: 115, def: 85, spa: 125, spd: 75, spe: 60},
		abilities: {0: "Ripen", 1: "Lightning Rod", H: "Harvest"},
	},
	marowak: {
		inherit: true,
		baseStats: {hp: 75, atk: 80, def: 110, spa: 35, spd: 80, spe: 55},
		abilities: {0: "Rock Head", 1: "Technician", H: "Sand Force"},
	},
	marowakalola: {
		inherit: true,
		baseStats: {hp: 60, atk: 95, def: 95, spa: 35, spd: 80, spe: 45},
		abilities: {0: "Cursed Body", 1: "Technician", H: "Rock Head"},
	},
	hitmonlee: {
		inherit: true,
		baseStats: {hp: 70, atk: 120, def: 53, spa: 35, spd: 110, spe: 60},
		abilities: {0: "Leg Day", 1: "Reckless", H: "Unburden"},
	},
	hitmonchan: {
		inherit: true,
		baseStats: {hp: 75, atk: 105, def: 89, spa: 35, spd: 110, spe: 70},
	},
	hitmontop: {
		inherit: true,
		baseStats: {hp: 60, atk: 100, def: 100, spa: 35, spd: 110, spe: 80},
		abilities: {0: "Intimidate", 1: "Technician", H: "Guts"},
	},
	lickilicky: {
		inherit: true,
		abilities: {0: "Own Tempo", 1: "Unaware", H: "Cloud Nine"},
	},
	weezing: {
		inherit: true,
		baseStats: {hp: 85, atk: 90, def: 120, spa: 85, spd: 70, spe: 60},
	},
	rhyperior: {
		inherit: true,
		abilities: {0: "Sap Sipper", 1: "Solid Rock", H: "Reckless"},
	},
	chansey: {
		inherit: true,
		baseStats: {hp: 230, atk: 5, def: 15, spa: 55, spd: 95, spe: 50},
		abilities: {0: "Natural Cure", 1: "Serene Grace", H: "Curious Medicine"},
	},
	blissey: {
		inherit: true,
		types: ["Normal", "Fairy"],
		baseStats: {hp: 235, atk: 10, def: 25, spa: 95, spd: 120, spe: 55},
		abilities: {0: "Natural Cure", 1: "Misty Surge", H: "Curious Medicine"},
	},
	tangrowth: {
		inherit: true,
		abilities: {0: "Tangling Hair", 1: "Innards Out", H: "Regenerator"},
	},
	kangaskhan: {
		inherit: true,
		abilities: {0: "Adaptability", 1: "Scrappy", H: "Inner Focus"},
	},
	kangaskhanmega: {
		inherit: true,
		baseStats: {hp: 105, atk: 125, def: 105, spa: 60, spd: 105, spe: 90},
		abilities: {0: "Sheer Force"},
	},
	kingdra: {
		inherit: true,
		baseStats: {hp: 75, atk: 85, def: 95, spa: 105, spd: 95, spe: 85},
	},
	seaking: {
		inherit: true,
		baseStats: {hp: 80, atk: 112, def: 65, spa: 65, spd: 80, spe: 48},
		abilities: {0: "Swift Swim", 1: "Supreme Overlord", H: "Lightning Rod"},
	},
	starmie: {
		inherit: true,
		abilities: {0: "Mirror Armor", 1: "Natural Cure", H: "Analytic"},
	},
	mrmime: {
		inherit: true,
		baseStats: {hp: 50, atk: 45, def: 65, spa: 100, spd: 120, spe: 90},
		abilities: {0: "Soundproof", 1: "Filter", H: "Psychic Surge"},
	},
	mrmimegalar: {
		inherit: true,
		abilities: {0: "Snow Warning", 1: "Screen Cleaner", H: "Ice Body"},
	},
	mrrime: {
		inherit: true,
		baseStats: {hp: 80, atk: 65, def: 75, spa: 110, spd: 100, spe: 100},
		abilities: {0: "Snow Warning", 1: "Screen Cleaner", H: "Ice Body"},
	},
	scyther: {
		inherit: true,
		abilities: {0: "Swarm", 1: "Adaptability", H: "Sharpness"},
	},
	scizor: {
		inherit: true,
		abilities: {0: "Swarm", 1: "Technician", H: "Sharpness"},
	},
	jynx: {
		inherit: true,
		baseStats: {hp: 70, atk: 50, def: 55, spa: 115, spd: 95, spe: 100},
		abilities: {0: "Oblivious", 1: "Dazzling", H: "Dry Skin"},
	},
	electivire: {
		inherit: true,
		types: ["Electric", "Fighting"],
		baseStats: {hp: 75, atk: 113, def: 67, spa: 95, spd: 85, spe: 95},
		abilities: {0: "Motor Drive", H: "Iron Fist"},
	},
	magmortar: {
		inherit: true,
		baseStats: {hp: 75, atk: 95, def: 67, spa: 115, spd: 95, spe: 93},
		abilities: {0: "Flame Body", H: "Mega Launcher"},
	},
	pinsir: {
		inherit: true,
		types: ["Bug", "Ground"],
	},
	tauros: {
		inherit: true,
		baseStats: {hp: 75, atk: 100, def: 95, spa: 65, spd: 70, spe: 110},
	},
	gyarados: {
		inherit: true,
		types: ["Water", "Dragon"],
		abilities: {0: "Intimidate", 1: "Anger Point", H: "Moxie"},
	},
	gyaradosmega: {
		inherit: true,
		types: ["Water", "Dragon"],
	},
	lapras: {
		inherit: true,
		baseStats: {hp: 120, atk: 75, def: 95, spa: 90, spd: 80, spe: 60},
		abilities: {0: "Water Absorb", 1: "Drizzle", H: "Rain Dish"},
	},
	ditto: {
		inherit: true,
		abilities: {0: "Limber", 1: "Illusion", H: "Imposter"},
	},
	vaporeon: {
		inherit: true,
		abilities: {0: "Water Absorb", 1: "Rain Dish", H: "Hydration"},
	},
	jolteon: {
		inherit: true,
		abilities: {0: "Volt Absorb", 1: "Electromorphosis", H: "Speed Boost"},
	},
	flareon: {
		inherit: true,
		baseStats: {hp: 110, atk: 130, def: 95, spa: 60, spd: 65, spe: 65},
		abilities: {0: "Flash Fire", 1: "Sheer Force", H: "Guts"},
	},
	leafeon: {
		inherit: true,
		abilities: {0: "Leaf Guard", 1: "Solar Power", H: "Chlorophyll"}
	},
	glaceon: {
		inherit: true,
		abilities: {0: "Slush Rush", 1: "Snow Warning", H: "Ice Body"},
	},
	umbreon: {
		inherit: true,
		abilities: {0: "Synchronize", 1: "Dark Aura", H: "Inner Focus"},
	},
	espeon: {
		inherit: true,
		abilities: {0: "Synchronize", 1: "Magic Guard", H: "Magic Bounce"},
	},
	porygon2: {
		inherit: true,
		types: ["Normal", "Electric"],
	},
	porygonz: {
		inherit: true,
		types: ["Normal", "Electric"],
		baseStats: {hp: 85, atk: 80, def: 75, spa: 125, spd: 80, spe: 90},
	},
	omastar: {
		inherit: true,
		baseStats: {hp: 80, atk: 60, def: 125, spa: 115, spd: 90, spe: 55},
		abilities: {0: "Swift Swim", 1: "Shell Armor", H: "Iron Barbs"},
	},
	kabutops: {
		inherit: true,
		baseStats: {hp: 70, atk: 120, def: 105, spa: 65, spd: 80, spe: 85},
		abilities: {0: "Swift Swim", 1: "Battle Armor", H: "Sharpness"},
	},
	aerodactyl: {
		inherit: true,
		baseStats: {hp: 80, atk: 115, def: 65, spa: 60, spd: 75, spe: 130},
		abilities: {0: "Intimidate", 1: "Pressure", H: "Unnerve"},
	},
	aerodactylmega: {
		inherit: true,
		baseStats: {hp: 90, atk: 135, def: 85, spa: 70, spd: 95, spe: 150},
	},
	articuno: {
		inherit: true,
		baseStats: {hp: 100, atk: 65, def: 110, spa: 105, spd: 140, spe: 70},
		abilities: {0: "Pressure", H: "Snow Warning"},
	},
	articunogalar: {
		inherit: true,
		baseStats: {hp: 90, atk: 70, def: 85, spa: 125, spd: 100, spe: 105},
		abilities: {0: "Competitive", H: "Psychic Surge"},
	},
	zapdos: {
		inherit: true,
		baseStats: {hp: 90, atk: 75, def: 100, spa: 125, spd: 90, spe: 100},
		abilities: {0: "Pressure", H: "Electric Surge"},
	},
	zapdosgalar: {
		inherit: true,
		abilities: {0: "Defiant", H: "Wind Rider"},
	},
	moltres: {
		inherit: true,
		baseStats: {hp: 90, atk: 100, def: 105, spa: 125, spd: 85, spe: 90},
		abilities: {0: "Pressure", H: "Drought"},
	},
	moltresgalar: {
		inherit: true,
		abilities: {0: "Berserk", H: "Dark Aura"},
	},
	mew: {
		inherit: true,
		abilities: {0: "Synchronize", H: "Protean"},
	},
	//#endregion
	//#region Gen 2
	meganium: {
		inherit: true,
		types: ["Grass", "Fairy"],
		baseStats: {hp: 100, atk: 60, def: 100, spa: 95, spd: 100, spe: 65},
		abilities: {0: "Overgrow", 1: "Regenerator", H: "Serene Grace"},
	},
	typhlosion: {
		inherit: true,
		types: ["Fire", "Ground"],
		baseStats: {hp: 78, atk: 109, def: 69, spa: 109, spd: 72, spe: 111},
		abilities: {0: "Blaze", 1: "Anger Point", H: "Flash Fire"},
	},
	typhlosionhisui: {
		inherit: true,
		abilities: {0: "Blaze", 1: "Perish Body", H: "Shadow Shield"},
	},
	feraligatr: {
		inherit: true,
		types: ["Water", "Dark"],
		abilities: {0: "Torrent", 1: "Rough Skin", H: "Sheer Force"},
	},
	furret: {
		inherit: true,
		baseStats: {hp: 90, atk: 81, def: 74, spa: 45, spd: 55, spe: 90},
		abilities: {0: "Pickpocket", 1: "Fur Coat", H: "Speed Boost"},
	},
	noctowl: {
		inherit: true,
		types: ["Psychic", "Flying"],
		baseStats: {hp: 100, atk: 50, def: 60, spa: 86, spd: 96, spe: 85},
		abilities: {0: "Insomnia", 1: "Trace", H: "Tinted Lens"},
	},
	ledian: {
		inherit: true,
		types: ["Bug", "Fighting"],
		baseStats: {hp: 80, atk: 100, def: 75, spa: 15, spd: 110, spe: 95},
	},
	ariados: {
		inherit: true,
		baseStats: {hp: 60, atk: 100, def: 70, spa: 80, spd: 70, spe: 90},
	},
	xatu: {
		inherit: true,
		baseStats: {hp: 75, atk: 75, def: 70, spa: 95, spd: 70, spe: 95},
		abilities: {0: "Magic Guard", 1: "Tinted Lens", H: "Magic Bounce"},
	},
	ampharos: {
		inherit: true,
		abilities: {0: "Static", 1: "Lightning Rod", H: "Cotton Down"},
	},
	ampharosmega: {
		inherit: true,
		abilities: {0: "Dragon's Maw"},
	},
	bellossom: {
		inherit: true,
		types: ["Grass", "Fairy"],
		baseStats: {hp: 80, atk: 80, def: 95, spa: 105, spd: 100, spe: 80},
		abilities: {0: "Chlorophyll", H: "Dancer"},
	},
	sudowoodo: {
		inherit: true,
		types: ["Rock", "Grass"],
		baseStats: {hp: 75, atk: 115, def: 115, spa: 30, spd: 85, spe: 30},
		abilities: {0: "Sturdy", 1: "Rock Head", H: "Grassy Surge"},
	},
	jumpluff: {
		inherit: true,
		baseStats: {hp: 85, atk: 75, def: 85, spa: 55, spd: 95, spe: 110},
		abilities: {0: "Speed Boost", 1: "Cotton Guard", H: "Infiltrator"},
	},
	ambipom: {
		inherit: true,
		baseStats: {hp: 75, atk: 115, def: 66, spa: 60, spd: 66, spe: 115},
		abilities: {0: "Technician", 1: "Armor Tail", H: "Skill Link"},
	},
	sunflora: {
		inherit: true,
		types: ["Grass", "Fire"],
		baseStats: {hp: 95, atk: 30, def: 85, spa: 120, spd: 85, spe: 55},
		abilities: {0: "Chlorophyll", 1: "Solar Power", H: "Drought"},
	},
	unown: {
		inherit: true,
		types: ["Psychic", "Ghost"],
		baseStats: {hp: 55, atk: 72, def: 48, spa: 72, spd: 48, spe: 98},
	},
	yanmega: {
		inherit: true,
		types: ["Bug", "Dragon"],
		baseStats: {hp: 86, atk: 96, def: 86, spa: 116, spd: 56, spe: 95},
		abilities: {0: "Speed Boost", 1: "Tinted Lens", H: "Compound Eyes"},
	},
	quagsire: {
		inherit: true,
		baseStats: {hp: 95, atk: 85, def: 85, spa: 65, spd: 85, spe: 35},
	},
	honchkrow: {
		inherit: true,
		abilities: {0: "Intimidate", 1: "Shadow Shield", H: "Moxie"},
	},
	mismagius: {
		inherit: true,
		types: ["Ghost", "Fairy"],
		baseStats: {hp: 75, atk: 60, def: 60, spa: 115, spd: 105, spe: 110},
		abilities: {0: "Levitate", H: "Magic Guard"},
	},
	girafarig: {
		inherit: true,
		baseStats: {hp: 90, atk: 90, def: 65, spa: 100, spd: 65, spe: 95},
		abilities: {0: "Sap Sipper", 1: "Lightning", H: "Scrappy"},
	},
	//#endregion
	//#region Gen 3
	sceptile: {
		inherit: true,
		types: ["Grass", "Dragon"],
		baseStats: {hp: 70, atk: 95, def: 65, spa: 85, spd: 85, spe: 120},
	},
	sceptilemega: {
		inherit: true,
		baseStats: {hp: 70, atk: 125, def: 75, spa: 110, spd: 85, spe: 145},
		abilities: {0: "Technician"},
	},
	blaziken: {
		inherit: true,
		abilities: {0: "Blaze", H: "No Guard"},
	},
	blazikenmega: {
		inherit: true,
		baseStats: {hp: 80, atk: 145, def: 80, spa: 130, spd: 80, spe: 90},
		abilities: {0: "Leg Day"},
	},
	swampert: {
		inherit: true,
		abilities: {0: "Torrent", 1: "Dry Skin", H: "Damp"},
	},
	mightyena: {
		inherit: true,
		baseStats: {hp: 70, atk: 98, def: 75, spa: 60, spd: 65, spe: 85},
		abilities: {0: "Intimidate", 1: "Strong Jaw", H: "Moxie"},
	},
	linoone: {
		inherit: true,
		baseStats: {hp: 78, atk: 75, def: 61, spa: 50, spd: 61, spe: 100},
		abilities: {0: "Quick Feet", 1: "Gluttony", H: "Technician"},
	},
	linoonegalar: {
		inherit: true,
		baseStats: {hp: 78, atk: 80, def: 61, spa: 50, spd: 61, spe: 100},
	},
	beautifly: {
		inherit: true,
		types: ["Bug", "Fairy"],
		baseStats: {hp: 60, atk: 70, def: 65, spa: 100, spd: 65, spe: 82},
		abilities: {0: "Compound Eyes", H: "Serene Grace"},
	},
	dustox: {
		inherit: true,
		baseStats: {hp: 80, atk: 60, def: 80, spa: 60, spd: 95, spe: 65},
		abilities: {0: "Shield Dust", 1: "Compound Eyes", H: "Phototaxis"},
	},
	shiftry: {
		inherit: true,
		baseStats: {hp: 90, atk: 110, def: 60, spa: 100, spd: 60, spe: 80},
	},
	swellow: {
		inherit: true,
		baseStats: {hp: 65, atk: 85, def: 60, spa: 85, spd: 60, spe: 125},
		abilities: {0: "Guts", 1: "Scrappy", H: "Aerilate"},
	},
	gardevoir: {
		inherit: true,
		baseStats: {hp: 68, atk: 65, def: 70, spa: 125, spd: 115, spe: 80},
	},
	gardevoirmega: {
		inherit: true,
		baseStats: {hp: 68, atk: 85, def: 70, spa: 165, spd: 135, spe: 100},
	},
	masquerain: {
		inherit: true,
		types: ["Bug", "Water"],
		baseStats: {hp: 80, atk: 60, def: 72, spa: 100, spd: 82, spe: 85},
	},
	breloom: {
		inherit: true,
		baseStats: {hp: 65, atk: 120, def: 80, spa: 50, spd: 65, spe: 70},
	},
	slaking: {
		inherit: true,
		baseStats: {hp: 140, atk: 150, def: 100, spa: 75, spd: 70, spe: 95},
	},
	ninjask: {
		inherit: true,
		baseStats: {hp: 71, atk: 90, def: 50, spa: 50, spd: 50, spe: 160},
	},
	exploud: {
		inherit: true,
		baseStats: {hp: 104, atk: 71, def: 63, spa: 91, spd: 73, spe: 73},
		abilities: {0: "Soundproof", 1: "Punk Rock", H: "Scrappy"},
	},
	hariyama: {
		inherit: true,
		baseStats: {hp: 144, atk: 130, def: 75, spa: 40, spd: 98, spe: 50},
	},
	probopass: {
		inherit: true,
		baseStats: {hp: 65, atk: 45, def: 145, spa: 70, spd: 150, spe: 40},
		abilities: {0: "Sturdy", 1: "Magnet Pull", H: "Levitate"},
	},
	delcatty: {
		inherit: true,
		types: ["Normal", "Fairy"],
		baseStats: {hp: 75, atk: 65, def: 65, spa: 65, spd: 60, spe: 95},
		abilities: {0: "Wonder Skin", 1: "Pixilate", H: "Versatility"},
	},
	//#endregion
	//#region Gen 4
	
	//#endregion
};