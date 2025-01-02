export const Rulesets: {[k: string]: ModdedFormatData} = {
	//#region Lists

	offseasoncomplexbans: {
		name: 'Offseason Complex Bans',
		desc: 'Handles all of the complex bans for Off-Season',
		ruleset: [],
	},
	offseasonunbanlist: {
		name: "Offseason Unbanlist",
		desc: "Handles everything that should be unbanned during Offseason",
		unbanlist: [
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
			'Victory Dance', 'Wicked Torque',
			// Items
			'Custap Berry', 'Thick Club', 'Full Incense',
			'Lax Incense', 'Odd Incense', 'Rock Incense',
			'Rose Incense', 'Sea Incense', 'Wave Incense',
		],
	},
	offseasonbanlist: {
		name: "Offseason Banlist",
		desc: 'Handles everything that should be banned during Offseason',
		banlist: [],
	},
	seasoncomplexbans: {
		name: 'Season Complex Bans',
		desc: "Handles all of the complex bans for Regular Season",
		ruleset: [
			'No Shell Smash Mega Toise',
			'No Calm Mind For The Patio Set',
			'No Dragon Dance For The Patio Set',
			'No Dragon Dance For Kyurem-Black',
			'No Last Respects For Houndstone',
			'No Last Respects For Basculegion',
		],
	},
	seasonunbanlist: {
		name: "Season Unbanlist",
		desc: "Handles everything that should be unbanned during Regular Season",
		unbanlist: [
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
			'Victory Dance', 'Wicked Torque',
			// Items
			'Custap Berry', 'Thick Club', 'Full Incense',
			'Lax Incense', 'Odd Incense', 'Rock Incense',
			'Rose Incense', 'Sea Incense', 'Wave Incense',
			'Thick Club',
		],
	},
	seasonbanlist: {
		name: "Season Banlist",
		desc: "Handles everything that should be banned during Regular Season",
		banlist: [
			// Tiers
			'ND Uber', 'ND AG',
			// Abilities
			'Moody', 'Power Construct', 'Shadow Tag',
			// Items
			'King\'s Rock', 'Quick Claw', 'Razor Fang',
			// Moves
			'Assist', 'Last Respects',
		],
	},

	//#endregion

	//#region Complex Bans
	noaurabreakforacudraco: {
		effectType: "ValidatorRule",
		name: "No Aura Break For Acudraco",
		desc: "Prevents Acudraco from using Aura Break",
		onValidateSet(set) {
			const problems = [];
			const acudraco = this.dex.species.get('Acudraco');
			const aurabreak = this.dex.abilities.get('Aura Break');
			if (acudraco.name === set.species) {
				if (aurabreak.name === set.ability) {
					problems.push(`Aura Break is complex banned on ${set.name}`);
				}
			}
			return problems;
		}
	},
	noshellsmashmegatoise: {
		effectType: 'ValidatorRule',
		name: 'No Shell Smash Mega Toise',
		desc: "Prevents Mega Blastoise from having Shell Smash",
		onValidateSet(set) {
			const problems = [];
			const toise = this.dex.species.get('Blastoise');
			const megaStone = this.dex.items.get('Blastoisinite');
			const shellSmash = this.dex.moves.get('Shell Smash');
			if (set.species === toise.name) {
				if (set.item === megaStone.name) {
					if (set.moves.includes(shellSmash.name)) {
						problems.push(`Shell Smash is banned on Mega Blastoise.`);
					}
				}
			}
			return problems;
		},
	},
	nocalmmindforthepatioset: {
		effectType: "ValidatorRule",
		name: 'No Calm Mind For The Patio Set',
		desc: "Prevents Mega Patios set from using Calm Mind",
		onValidateSet(set) {
			const problems = [];
			const latios = this.dex.species.get('Latios');
			const latias = this.dex.species.get('Latias');

			const omegaStone = this.dex.items.get('Latiosite');
			const amegaStone = this.dex.items.get('Latiasite');

			const calmMind = this.dex.moves.get('Calm Mind');

			if ([latios.name, latias.name].includes(set.species)) {
				if ([omegaStone.name, amegaStone.name].includes(set.item)) {
					if (set.moves.includes(calmMind.name)) {
						problems.push(`${set.name} can not have Calm Mind due to having their mega stone!`);
					}
				}
			}
			return problems;
		},
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
	nofusionboltforkyuremblack: {
		effectType: "ValidatorRule",
		name: "No Fusion Bolt For Kyurem-Black",
		desc: "Prevents Kyurem-Black from using Fusion Bolt",
		onValidateSet(set) {
			const problems = [];
			const kyuremblack = this.dex.species.get('Kyurem-Black');
			const fusionbolt = this.dex.moves.get('Fusion Bolt');
			if (kyuremblack.name === set.species) {
				if (set.moves.includes(fusionbolt.name)) {
					problems.push(`Fusion Bolt is complex banned on ${set.name}`);
				}
			}
			return problems;
		}
	},
	nodragondanceforkyuremblack: {
		effectType: "ValidatorRule",
		name: "No Dragon Dance for Kyurem-Black",
		desc: "Prevents Kyurem-Black from using Dragon Dance",
		onValidateSet(set) {
			const problems = [];
			const kyuremblack = this.dex.species.get('Kyurem-Black');

			const dragonDance = this.dex.moves.get('Dragon Dance');

			if (set.species === kyuremblack.name) {
				if (set.moves.includes(dragonDance.name)) {
					problems.push(`${set.name} can not have Dragon Dance due to being a nerd!`);
				}
				return problems;
			}
		},
	},
	nolastrespectsforbasculegion: {
		effectType: "ValidatorRule",
		name: 'No Last Respects For Basculegion',
		desc: "Prevents Basculegion from using Last Respects",
		onValidateSet(set) {
			const problems = [];
			const basculegion = this.dex.species.get('Basculegion');
			const lastRespects = this.dex.moves.get('Last Respects');

			if (basculegion.name === set.species) {
				if (set.moves.includes(lastRespects.name)) {
					problems.push(`Last Respects is Complex Banned on ${set.name}`);
				}
			}

			return problems;
		}	
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
	//#endregion

	//#region Edited Rulesets

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

	//#endregion
};
