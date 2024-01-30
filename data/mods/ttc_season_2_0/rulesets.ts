import { incrementLosses } from '../../../server/chat-plugins/cg-teams-leveling';
export const Rulesets: {[k: string]: ModdedFormatData} = {
	evasionabilitiesclause: {
		inherit: true,
		banlist: undefined,
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
