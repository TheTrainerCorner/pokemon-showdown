import { incrementLosses } from '../../../server/chat-plugins/cg-teams-leveling';
export const Rulesets: {[k: string]: ModdedFormatData} = {
	evasionabilitiesclause: {
		inherit: true,
		banlist: undefined,
	},
	offseasoncomplexbans: {
		name: "Offseason Complex Bans",
		desc: "Complex Bans for Season 2 Offseason (Monotype)!",
		ruleset: [
			'Offseason Complex Ban Acudraco',
			'Offseason Complex Ban Teravolt',
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
	offseasoncomplexbanteravolt: {
		effectType: "ValidatorRule",
		name: "Offseason Complex Ban Fusionbolt",
		desc: "Fusionbolt is banned on Kyurem-Black",
		onValidateSet(set) {
			const problems = [];
			const kyuremblack = this.dex.species.get('kyuremb');	
			const fusionbolt = this.dex.moves.get('Fusion Bolt');
			if ([kyuremblack.name].includes(set.species)) {
				if (set.moves.includes(fusionbolt.name)) {
					problems.push(`${set.name} can not have Fusionbolt due to having teravolt!`);
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
