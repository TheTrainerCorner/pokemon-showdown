# The Trainer's Corner Pokemon Showdown Server
This repo was forked from smogon/pokemon-showdown.

# Modifying Pokemon
After Inital launch of TTC, the script for modifying pokemon changed over time to 1.1, which has been finalized. 

```ts
import { ModifyPokemon } from "../../../tools/utils/modifyPokemon";

export const Scripts: ModdedBattleScriptsData = {
	inherit: '',
	init() {
		// This is the basic structure of the class
		new ModifyPokemon('pokemon', this)
			.types
				.setType('Type 1', 'Type 2')
			.pokemon.abilities
				.setAbility0('New Ability')
				.setAbility1('New Ability')
				.setHiddenAbility('New Ability')
			.pokemon.baseStats
				.setHP(0)
				.setATK(0)
				.setDEF(0)
				.setSPA(0)
				.setSPD(0)
				.setSPE(0)
			.pokemon.learnset
				.add('Move Name')
				.remove('Move Name')
		// Example. This is not a representation of the actual league.
		new ModifyPokemon('delcatty', this)
			.baseStats
				.setSPA(70)
			.pokemon.learnset
				.add('U Turn')
				.add('V Create');
		// This is what I wish, but will never happen
		new ModifyPokemon('cinccino', this)
			.types
				.setType('Fairy', 'Dragon')
			.pokemon.abilities
				.setAbility0('All Powerful God')
			.pokemon.baseStats
				.setHP(1000)
				.setATK(1000)
				.setDEF(1000)
				.setSPA(1000)
				.setSPD(1000)
				.setSPE(1000)
			.pokemon.learnset
				.add('Dragon Dance')
				.add('V Create')
				.add('Origin Pulse')
	}
}

```

## Related Repos in order to make this work
- [TheTrainerCorner/pokemon-showdown-client](https://github.com/TheTrainerCorner/pokemon-showdown-client)
- [TheTrainerCorner/Pokemon-Showdown-Dex](https://github.com/TheTrainerCorner/Pokemon-Showdown-Dex)

