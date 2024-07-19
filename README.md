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

Pokémon Showdown is many things:

- A **web site** you can use for Pokémon battling

  - http://pokemonshowdown.com/

- A **JavaScript library** for simulating Pokémon battles and getting Pokédex data

  - [sim/README.md](./sim/README.md)

- Some **command-line tools** for simulating Pokémon battles (which can be used in non-JavaScript programs)

  - [COMMANDLINE.md](./COMMANDLINE.md)

- A **web API** for the web site for Pokémon battling

  - [pokemon-showdown-client: WEB-API.md](https://github.com/smogon/pokemon-showdown-client/blob/master/WEB-API.md)

- A **game server** for hosting your own Pokémon Showdown community and game modes

  - [server/README.md](./server/README.md)

Pokémon Showdown simulates singles, doubles and triples battles in all the games out so far (Generations 1 through 9).


Documentation quick links
------------------------------------------------------------------------

* [PROTOCOL.md][4] - How the client and server communicate with each other.
* [sim/SIM-PROTOCOL.md][5] - The part of the protocol used for battles and battle messages.
* [CONTRIBUTING.md][6] - Useful code standards to understand if you want to send pull requests to PS (not necessary if you're just using the code and not planning to contribute back).
* [ARCHITECTURE.md][7] - A high-level overview of how the code works.
* [Bot FAQ][8] - An FAQ compiled by Kaiepi regarding making Pokemon Showdown bots - mainly chatbots and battle bots.

  [4]: ./PROTOCOL.md
  [5]: ./sim/SIM-PROTOCOL.md
  [6]: ./CONTRIBUTING.md
  [7]: ./ARCHITECTURE.md
  [8]: https://gist.github.com/Kaiepi/becc5d0ecd576f5e7733b57b4e3fa97e


Community
------------------------------------------------------------------------

PS has a built-in chat service. Join our main server to talk to us!

You can also visit the [Pokémon Showdown forums][9] for discussion and help.

  [9]: https://www.smogon.com/forums/forums/pok%C3%A9mon-showdown.209/

If you'd like to contribute to programming and don't know where to start, feel free to check out [Ideas for New Developers][10].

  [10]: https://github.com/smogon/pokemon-showdown/issues/2444


License
------------------------------------------------------------------------

Pokémon Showdown's server is distributed under the terms of the [MIT License][11].

  [11]: ./LICENSE


Credits
------------------------------------------------------------------------

Owner

- Guangcong Luo [Zarel] - Development, Design, Sysadmin

Staff

- Andrew Werner [HoeenHero] - Development
- Annika L. [Annika] - Development
- Chris Monsanto [chaos] - Development, Sysadmin
- Kris Johnson [dhelmise] - Development
- Leonard Craft III [DaWoblefet] - Research (game mechanics)
- Mathieu Dias-Martins [Marty-D] - Research (game mechanics), Development
- Mia A [Mia] - Development

Contributors

- See http://pokemonshowdown.com/credits
