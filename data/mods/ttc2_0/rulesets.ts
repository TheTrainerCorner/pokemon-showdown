export const Rulesets: {[k: string]: ModdedFormatData} = {
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
};
