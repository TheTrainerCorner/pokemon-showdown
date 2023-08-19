export const Rulesets: {[k: string]: ModdedFormatData} = {
	noshellsmashmegatoise: {
		effectType: 'ValidatorRule',
		name: 'No Shell Smash Mega Toise',
		desc: "Prevents Mega Blastoise from having Shell Smash",
		onValidateSet(set) {
			const problems = [];
			let toise = this.dex.species.get('Blastoise');
			let megaStone = this.dex.items.get('Blastoisinite');
			let shellSmash = this.dex.moves.get('Shell Smash');
			if(set.species === toise.name) {
				if(set.item === megaStone.name) {
					if(set.moves.includes(shellSmash.name)) {
						problems.push(`Shell Smash is banned on Mega Blastoise.`);
					}
				}
			}
			return problems;
		}
	}
}