import { incrementLosses } from '../../../server/chat-plugins/cg-teams-leveling';
export const Rulesets: {[k: string]: ModdedFormatData} = {
	sametypeclause: {
		inherit: true,
		onValidateTeam(team) {
			let typeTable: string[] = [];
			for (const [i, set] of team.entries()) {
				let species = this.dex.species.get(set.species);
				if (!species.types) return [`Invalid pokemon ${set.name || set.species}`];
				if (i === 0) {
					typeTable = species.types;
				} else {
					typeTable = typeTable.filter(type => species.types.includes(type));
				}
				const item = this.dex.items.get(set.item);
				if (item.megaStone && species.baseSpecies === item.megaEvolves) {
					species = this.dex.species.get(item.megaStone);
					typeTable = typeTable.filter(type => species.types.includes(type));
					// adding to see what the type of absol is.
					return [`Your team must share a type. ${species} | ${species.types}`];
				}
				if (item.id === "ultranecroziumz" && species.baseSpecies === "Necrozma") {
					species = this.dex.species.get("Necrozma-Ultra");
					typeTable = typeTable.filter(type => species.types.includes(type));
				}
				if (!typeTable.length) return [`Your team must share a type.`];
			}
			for (const set of team) {
				if (this.gen === 9 && set.teraType &&
						!typeTable.includes(set.teraType) && this.ruleTable.has(`enforcesameteratype`)) {
					return [`${set.species}'s Tera Type must match the team's type.`];
				}
			}
		},
	},
	evasionabilitiesclause: {
		inherit: true,
		banlist: undefined,
	},
	offseasoncomplexbans: {
		name: "Offseason Complex Bans",
		desc: "Complex Bans for Season 2 Offseason (Monotype)!",
		ruleset: [
			'Offseason Complex Ban Acudraco',
			'Offseason Complex Ban Kyurem-Black',
			'Weather Rocks and Extender Ban',
		],	
	},
	seasoncomplexbans: {
		name: "Season Complex Bans",
		desc: "All of the complex bans for season 2",
		ruleset: [
			'No Shell Smash Mega Toise',
			'No Calm Mind For The Patio Set',
			'No Dragon Dance for The Patio Set',
		],
	},
	seasonunbanlist: {
		name: "Season Unbanlist",
		desc: "Everything that was unban during Season 2",
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
	seasonbanlist: {
		name: "Season Banlist",
		desc: "Everything that is ban during Season 2",
		banlist: [
			'ND Uber', 'ND AG', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock',
			'Quick Claw', 'Razor Fang', 'Assist', 'Last Respects',
		],
	},
	offseasoncomplexbanacudraco: {
		effectType: "ValidatorRule",
		name: "Offseason Complex Ban Acudraco",
		desc: "Aura Break is ban on Acudraco",
		onValidateSet(set) {
			const problems = [];
			const acudraco = this.dex.species.get('acudraco');
			const aurabreak = this.dex.abilities.get('aurabreak');
			if ([acudraco.name].includes(set.species)) {
				if ([aurabreak.name].includes(set.ability)) {
					problems.push(`Aura Break is banned on ${set.name} for Season 2 Offseason (Monotype)!`);
				}
			}
			return problems;
		}

	},
	offseasoncomplexbankyuremblack: {
		effectType: "ValidatorRule",
		name: "Offseason Complex Ban Kyurem-Black",
		desc: "Fusion Bolt and Dragon Dance are banned on Kyurem-Black for Offseason.",
		onValidateSet(set) {
			const problems = [];
			const kyuremblack = this.dex.species.get('Kyurem-Black');	
			const fusionbolt = this.dex.moves.get('Fusion Bolt');
			const dragondance = this.dex.moves.get('Dragon Dance');
			if ([kyuremblack.name].includes(set.species)) {
				if (set.moves.includes(fusionbolt.name)) {
					problems.push(`Fusion Bolt has been banned on ${set.name} for the Offseason!`);
				}
				if (set.moves.includes(dragondance.name)) {
					problems.push(`Dragon Dance has been banned on ${set.name} for the Offseason!`);
				}
			}
			return problems;
		}
	},
	offseasonbanlist: {
		name: "Offseason Banlist",
		desc: "Banlist for Season 2 Offseason (Monotype)!",
		banlist: [
			// Items
			'Heat Rock', 'Damp Rock', 'Icy Rock', 'Smooth Rock',
			'Terrain Extender',

			// Pokemon
			'Floette-Eternal', 'Reshiram', 'Zekrom', 'Arceus','Cosmog', 'Cosmoem', 'Darkrai', 'Poipole', 'Silvally', 'Zamazenta',
		],
	},
	weatherrocksandextenderban: {
		name: "Weather Rocks and Extender Ban",
		desc: "Bans weather rocks and terrain extender",
		validateSet(set) {
			const itemList = [];
			const problems = [];
			// Weather Rocks
			itemList.push('Heat Rock');
			itemList.push('Icy Rock');
			itemList.push('Damp Rock');
			itemList.push('Smooth Rock');

			// Extender
			itemList.push('Terrain Extender');

			if (itemList.includes(set.item)) {
				problems.push(`${set.item} is banned from Season 2 Offseason (Monotype)!`);
			}
			return problems;
		}
	},
	nodragondanceforthepatioset: {
		effectType: "ValidatorRule",
		name: 'No Dragon Dance For The Patio Set',
		desc: "Prevents Mega Patios set from using Dragon Dance",
		onValidateSet(set) {
			const problems = [];
			const latios = this.dex.species.get('Latios');
			const latias = this.dex.species.get('Latias');

			const omegaStone = this.dex.items.get('Latiosite');
			const amegaStone = this.dex.items.get('Latiasite');

			const dragonDance = this.dex.moves.get('Dragon Dance');

			if ([latios.name, latias.name].includes(set.species)) {
				if ([omegaStone.name, amegaStone.name].includes(set.item)) {
					if (set.moves.includes(dragonDance.name)) {
						problems.push(`${set.name} can not have Dragon Dance due to having their mega stone!`);
					}
				}
			}
			return problems;
		},
	},
	nonastyplotforinteleonmega: {
		name: "No Nasty Plot for Inteleon-Mega",
		desc: "Prevents Inteleon-Mega from using Nasty Plot",
		onValidateSet(set) {
			const problems = [];
			const inteleon = this.dex.species.get('Inteleon');
			const megaStone = this.dex.items.get('Inteleonite');

			const nastyplot = this.dex.moves.get('Nasty Plot');

			if(inteleon.name === set.species) {
				if(megaStone.name === set.item) {
					if(set.moves.includes(nastyplot.name)) {
						problems.push(`${set.name} can not have Nasty Plot due to having it's mega stone!`);
					}
				}
			}
		}
	},
};
