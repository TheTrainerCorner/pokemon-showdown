export const Rulesets: {[k: string]: ModdedFormatData} = {
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
	nodragondanceforkyub: {
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
};
