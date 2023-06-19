import { Learnset } from '../../../sim/dex-species';
export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen9',
	init() {
		//#region Add Kick Move Flag to moves
		let kickMoves: string[] = [
			"blazekick",
			"doublekick",
			"highhorsepower",
			"highjumpkick",
			"jumpkick",
			"lowsweep",
			"megakick",
			"rollingkick",
			"stomp",
			"tripleaxel",
			"triplekick",
			"tropkick",
		];

		for(let move of kickMoves) {
			this.modData('Moves', move).flags.kick = 1;
		}
		//#endregion
		
		//#region Functions
		let learnsetRemove = (pokemon: string, moves: string[]) => {
			for(let move of moves) {
				this.modData('Learnsets', pokemon.toLowerCase()).learnset[move.toLowerCase()] = [];
			}
		}

		let learnsetAdd = (pokemon: string, moves: [string, number][]) => {
			for(let move of moves) {
				// Example: this.modData('Learnset', 'furret').learset['playrough'] = ['9M'];
				this.modData('Learnsets', pokemon.toLowerCase()).learnset[move[0].toLowerCase()] = [`${move[1]}M`];
			}
		}
		//#endregion
		
		//#region Learnsets
		//#region Gen 1
		learnsetAdd('venusaur', [
			['sludgewave', 8],
			['acidspray', 8],
			['gastroacid', 8],
		]);
		learnsetAdd('charizard', [
			['firelash', 8],
			['uturn', 8],
			['burnup', 8],
		]);
		learnsetAdd('blastoise', [
			['hydrosteam', 9],
			['steameruption', 8],
		]);
		learnsetAdd('butterfree', [
			['lightscreen', 8],
			['aromatherapy', 8],
			['stickyweb', 8],
			['psyshock', 8],
			['luminacrash', 9],
			['trickroom', 8],
		]);
		learnsetAdd('beedrill', [
			['crosspoison', 8],
			['dualwingbeat', 8],
			['firstimpression', 8],
		]);
		learnsetAdd('pidgeot', [
			['bulkup', 8],
			['extremespeed', 8],
			['aurasphere', 8],
			['hypervoice', 8],
		]);
		learnsetAdd('raticate', [
			['closecombat', 8],
			['firefang', 8],
			['icefang', 8],
			['psychicfang', 8],
		]);
		learnsetAdd('raticatealola', [
			['closecombat', 8],
			['firefang', 8],
			['icefang', 8],
			['psychicfang', 8],
			['partingshot', 8],
		]);
		learnsetAdd('fearow', [
			['swordsdance', 8],
			['dualwingbeat', 8],
			['beakblast', 8],
			['foulplay', 8],
			['nightslash', 8],
			['falsesurrender', 8],
		]);
		learnsetAdd('arbok', [
			['jawlock', 8],
			['shedtail', 9],
		]);
		learnsetAdd('pikachu', [
			['zippyzap', 8],
		]);
		learnsetAdd('raichu', [
			['zippyzap', 8],
		]);
		learnsetAdd('sandslash', [
			['spikyshield', 8],
			['spinout', 9],
		]);
		learnsetAdd('sandslashalola', [
			['spikyshield', 8],
			['icespinner', 9],
		]);
		learnsetAdd('nidoking', [
			['gunkshot', 8],
			['precipiceblades', 8],
		]);
		learnsetAdd('ninetales', [
			['lavaplume', 8],
			['darkvoid', 8],
			['destinybond', 8],
			['nightmare', 8],
			['bittermalice', 8],
			['nightdaze', 8],
		]);
		learnsetRemove('ninetales', ['nastyplot']);
		learnsetAdd('ninetalesalola', [
			['haze', 8],
			['chillyreception', 9],
			['glaciate', 8],
		]);
		learnsetAdd('wigglytuff', [
			['moonblast', 8],
		]);
		learnsetAdd('crobat', [
			['poisonjab', 8],
			['toxicspikes', 8],
			['firefang', 8],
			['thunderfang', 8],
			['icefang', 8],
		]);
		learnsetAdd('vileplume', [
			['appleacid', 8],
			['trailblaze', 9],
			['acidspray', 8],
		]);
		learnsetAdd('parasect', [
			['crabhammer', 8],
			['grassyglide', 8],
			['uturn', 8],
			['leafblade', 8],
			['pounce', 8],
			['trailblaze', 9],
		]);
		learnsetAdd('venomoth', [
			['hex', 8],
		]);
		learnsetAdd('dugtrio', [
			['headlongrush', 8],
		]);
		learnsetAdd('dugtrioalola', [
			['headlongrush', 8],
		]);
		learnsetAdd('persian', [
			['dazzlinggleam', 8],
			['suckerpunch', 8],
		]);
		learnsetAdd('persianalola', [
			['suckerpunch', 8],
			['nightdaze', 8],
		]);
		learnsetAdd('golduck', [
			['teleport', 8],
			['expandingforce', 8],
		]);
		learnsetAdd('primeape', [
			['knockoff', 8],
		]);
		learnsetAdd('arcanine', [
			['thunderwave', 8],
			['icefang', 8],
		]);
		learnsetAdd('poliwrath', [
			['surgingstrikes', 8],
			['flipturn', 8],
			['jetpunch', 9],
		]);
		learnsetAdd('politoed', [
			['flipturn', 8],
			['lifedew', 8],
		]);
		learnsetRemove('alakazam', ['barrier', 'counter']);
		learnsetAdd('machamp', [
			['drainpunch', 8],
			['combattorque', 9],
		]);
		learnsetAdd('victreebel', [
			['solarblade', 8],
		]);
		learnsetAdd('tentacruel', [
			['flipturn', 8],
			['nastyplot', 8],
			['octolock', 8],
			['spikes', 8],
			['recover', 8],
		]);
		learnsetAdd('golem', [
			['bodypress', 8],
			['headsmash', 8],
			['rapidspin', 8],
		]);
		learnsetAdd('golemalola', [
			['flashcannon', 8],
			['powergem', 8],
			['steelbeam', 8],
			['thousandarrows', 8],
			['zapcannon', 8],
		]);
		learnsetAdd('rapidash', [
			['firelash', 8],
			['jumpkick', 8],
			['blazekick', 8],
			['bulldoze', 8],
			['hornleech', 8],
		]);
		learnsetAdd('rapidashgalar', [
			['firelash', 8],
			['moonblast', 8],
			['lusterpurge', 8],
			['psyblade', 9],
			['cosmicpower', 8],
		]);
		learnsetAdd('slowbrogalar', [
			['teleport', 8],
			['toxic', 8],
		]);
		learnsetAdd('farfetchd', [
			['drillpeck', 8],
			['xscissor', 8],
			['aquacutter', 8],
			['ceaselessedge', 8],
		]);
		learnsetAdd('farfetchdgalar', [
			['sacredsword', 8],
			['drillpeck', 8],
		]);
		learnsetAdd('sirfetchd', [
			['sacredsword', 8],
			['roost', 8],
			['toxic', 8],
			['drillrun', 8],
			['behemothblade', 8],
		]);
		learnsetAdd('dodrio', [
			['uturn', 8],
			['dualwingbeat', 8],
			['tripleaxel', 8],
			['earthquake', 8],
			['rockslide', 8],
			['highhorsepower', 8],
			['headsmash', 8],
		]);
		learnsetRemove('dodrio', ['fly']);
		learnsetAdd('dewgong', [
			['scald', 8],
			['flipturn', 8],
			['hydropump', 8],
			['freezedry', 8],
			['chillingwater', 8],
		]);
		learnsetAdd('muk', [
			['poisonfang', 8],
		]);
		learnsetRemove('muk', ['moonblast']);
		learnsetAdd('mukalola', [
			['partingshot', 8],
			['suckerpunch', 8],
		]);
		learnsetRemove('mukalola', ['moonblast']);
		learnsetAdd('steelix', [
			['coil', 8],
		]);
		learnsetAdd('hypno', [
			['expandingforce', 8],
		]);
		learnsetAdd('kingler', [
			['flipturn', 8],
			['aquajet', 8],
			['closecombat', 8],
			['icepunch', 8],
			['meteormash', 8],
			['bulletpunch', 8],
		]);
		learnsetAdd('electrode', [
			['weatherball', 8],
			['flashcannon', 8],
			['focusblast', 8],
			['shadowball', 8],
			['aurasphere', 8],
			['magnetbomb', 8],
		]);
		learnsetAdd('electrodehisui', [
			['sappyseed', 8],
			['acidspray', 8],
			['mistball', 8],
			['sludgebomb', 8],
			['pollenpuff', 8],
			['weatherball', 8],
		]);
		learnsetAdd('exeggutor', [
			['weatherball', 8],
			['earthpower', 8],
		]);
		learnsetRemove('exeggutor', ['powerwhip']);
		learnsetAdd('exeggutoralola', [
			['weatherball', 8],
			['focusblast', 8],
			['earthpower', 8],
			['leafblade', 8],
		]);
		learnsetAdd('marowak', [
			['headsmash', 8],
			['headlongrush', 8],
		]);
		learnsetAdd('marowakalola', [
			['headsmash', 8],
			['headlongrush', 8],
		]);
		learnsetAdd('hitmonlee', [
			['pyroball', 8],
			['tripleaxel', 8],
		]);
		learnsetAdd('hitmonchan', [
			['suckerpunch', 8],
			['crosschop', 8],
		]);
		learnsetAdd('hitmontop', [
			['uturn', 8],
		]);
		learnsetAdd('weezing', [
			['energyball', 8],
			['defog', 8],
			['acidspray', 8],
			['recover', 8],
		]);
		learnsetAdd('weezinggalar', [
			['energyball', 8],
			['drainingkiss', 8],
		]);
		learnsetAdd('rhyperior', [
			['headlongrush', 8],
			['headsmash', 8],
		]);
		learnsetAdd('chansey', [
			['revivalblessing', 9],
			['haze', 8],
		]);
		learnsetAdd('blissey', [
			['energyball', 8],
			['hypnosis', 8],
		]);
		learnsetRemove('kangaskhan', ['poweruppunch', 'seismictoss']);
		learnsetAdd('kingdra', [
			['snipeshot', 8],
			['originpulse', 8],
		]);
		learnsetAdd('seaking', [
			['aquajet', 8],
			['crunch', 8],
			['hornleech', 8],
			['liquidation', 8],
		]);
		learnsetAdd('mrmime', [
			['moonblast', 8],
			['mistyexplosion', 8],
		]);
		learnsetAdd('mrmimegalar', [
			['toxic', 8],
			['teleport', 8],
		]);
		learnsetAdd('mrrime', [
			['toxic', 8],
			['teleport', 8],
		]);
		learnsetAdd('scyther', [
			['fly', 8],
			['kowtowcleave', 8],
			['leafblade', 8],
		]);
		learnsetAdd('jynx', [
			['psystrike', 8],
			['aurasphere', 8],
			['freezedry', 8],
			['psychoboost', 8],
		]);
		learnsetAdd('electivire', [
			['plasmafists', 8],
			['machpunch', 8],
			['closecombat', 8],
		]);
		learnsetAdd('magmortar', [
			['magmastorm', 8],
			['meteorbeam', 8],
			['scald', 8],
			['steameruption', 8],
			['darkpulse', 8],
			['aurasphere', 8],
		]);
		learnsetAdd('pinsir', [
			['megahorn', 8],
			['uturn', 8],
			['firstimpression', 8],
		]);
		learnsetAdd('tauros', [
			['playrough', 8],
			['flareblitz', 8],
			['headlongrush', 8],
			['powergem', 8],
		]);
		learnsetAdd('gyarados', [
			['flipturn', 8],
			['dracometeor', 8],
		]);
		learnsetAdd('lapras', [
			['scald', 8],
			['wish', 8],
			['boomburst', 8],
			['calmmind', 8],
		]);
		learnsetAdd('jolteon', [
			['spikes', 8],
		]);
		learnsetAdd('flareon', [
			['sacredfire', 8],
			['stompingtantrum', 8],
			['playrough', 8],
			['bulkup', 8],
			['agility', 8],
			['thunderfang', 8],
			['morningsun', 8],
		]);
		learnsetAdd('leafeon', [
			['jumpkick', 8],
			['stompingtantrum', 8],
		]);
		learnsetAdd('umbreon', [
			['knockoff', 8],
		]);
		learnsetAdd('espeon', [
			['teleport', 8],
		]);
		learnsetAdd('porygonz', [
			['expandingforce', 8],
			['technoblast', 8],
		]);
		learnsetAdd('omastar', [
			['powergem', 8],
			['rapidspin', 8],
			['spikeyshield', 8],
			['sludgebomb', 8],
			['acidarmor', 8],
		]);
		learnsetAdd('kabutops', [
			['focusenergy', 8],
			['leafblade', 8],
			['aquacutter', 8],
		]);
		learnsetAdd('snorlax', [
			['slackoff', 8],
			['stuffcheeks', 8],
		]);
		learnsetAdd('articuno', [
			['calmmind', 8],
			['focusblast', 8],
			['glaciate', 8],
			['bleakwindstorm', 8],
		]);
		learnsetAdd('articunogalar', [
			['roost', 8],
			['toxic', 8],
			['defog', 8],
			['esperwing', 8],
			['luminacrash', 8],
		]);
		learnsetAdd('zapdos', [
			['boltbeak', 8],
			['fusionbolt', 8],
		]);
		learnsetAdd('zapdosgalar', [
			['roost', 8],
			['defog', 8],
			['toxic', 8],
			['boltbeak', 8],
			['triplekick', 8],
			['tripleaxel', 8],
			['axekick', 8],
		]);
		learnsetAdd('moltres', [
			['inferno', 8],
			['fusionflare', 8],
		]);
		learnsetAdd('moltresgalar', [
			['roost', 8],
			['defog', 8],
			['scorchingsands', 8],
			['toxic', 8],
			['nightdaze', 8],
			['flamethrower', 8],
		]);
		//#endregion
		//#region Gen 2
		learnsetAdd('meganium', [
			['moonblast', 8],
			['drainingkiss', 8],
			['wish', 8],
			['springtidestorm', 8],
			['roar', 8],
		]);
		learnsetAdd('typhlosion', [
			['earthpower', 8],
			['trailblaze', 9],
		]);
		learnsetAdd('typhlosionhisui', [
			['bittermalice', 9],
			['energyball', 9],
			['nightdaze', 9],
		]);
		learnsetAdd('feraligatr', [
			['jawlock', 8],
			['lunge', 8],
			['scaleshot', 8],
			['flipturn', 8],
			['rapidspin', 8],
			['knockoff', 8],
			['suckerpunch', 8],
		]);
		learnsetAdd('furret', [
			['playrough', 8]
		]);
		learnsetAdd('noctowl', [
			['moongeistbeam', 8],
			['psyshock', 8],
		]);
		learnsetAdd('ledian', [
			['suckerpunch', 8],
			['firepunch', 8],
		]);
		learnsetAdd('ariados', [
			['skittersmack', 8],
			['nastyplot', 8],
			['taunt', 8],
			['torment', 8],
			['uturn', 8],
			['knockoff', 8],
		]);
		learnsetAdd('lanturn', [
			['paraboliccharge', 8],
		]);
		learnsetAdd('togekiss', [
			['moonblast', 8],
			['icebeam', 8],
		]);
		learnsetAdd('ampharos', [
			['paraboliccharge', 8],
			['slackoff', 8],
			['dazzlinggleam', 8],
		]);
		learnsetAdd('bellossom', [
			['drainingkiss', 8],
			['fleurcannon', 8],
			['teeterdance', 8],
			['pollenpuff', 8],
			['rapidspin', 8],
			['revelationdance', 8],
		]);
		learnsetAdd('azumarill', [
			['drainpunch', 8],
		]);
		learnsetAdd('sudowoodo', [
			['firstimpression', 8],
			['grassyglide', 8],
		]);
		learnsetAdd('jumpluff', [
			['pollenpuff', 8],
			['floatyfall', 8],
		]);
		learnsetAdd('ambipom', [
			['tripleaxel', 8],
			['machpunch', 8],
			['suckerpunch', 8],
			['quickattack', 8],
			['stormthrow', 8],
		]);
		learnsetAdd('sunflora', [
			['weatherball', 8],
			['fireblast', 8],
			['flamethrower', 8],
			['heatwave', 8],
			['sizzlyslide', 8],
		]);
		learnsetAdd('unown', [
			['extasenory', 8],
			['storedpower', 8],
			['cosmicpower', 8],
			['moonlight', 8],
			['ancientpower', 8],
			['moonblast', 8],
			['signalbeam', 8],
			['triattack', 8],
			['judgement', 8],
			['psychic', 8],
			['psyshock', 8],
			['roaroftime', 8],
			['spacialrend', 8],
			['shadowforce', 8],
			['aurasphere', 8],
		]);
		learnsetAdd('yanmega', [
			['dragonrush', 8],
			['dragonpusle', 8],
			['dragonclaw', 8],
			['outrage', 8],
		]);
		learnsetAdd('honchkrow', [
			['partingshot', 8],
			['oblivionwing', 8],
			['switcheroo', 8],
		]);
		learnsetAdd('mismagius', [
			['psyshock', 8],
			['magicpowder', 8],
			['moonblast', 8],
			['moonlight', 8],
		]);
		learnsetAdd('girafarig', [
			['triattack', 8],
			['focusblast', 8],
			['dazzlinggleam', 8],
			['jumpkick', 8],
			['uturn', 8],
		]);
		learnsetAdd('gligar', [
			['dualwingbeat', 8],
		]);
		learnsetAdd('gliscor', [
			['dualwingbeat', 8],
		]);
		learnsetAdd('granbull', [
			['drainpunch', 8],
			['knockoff', 8],
		]);
		learnsetAdd('qwilfish', [
			['banefulbunker', 8],
			['spikeyshield', 8],
		]);
		learnsetAdd('heracross', [
			['firstimpression', 8],
			['drainpunch', 8],
		]);
		learnsetAdd('weavile', [
			['suckerpunch', 8],
		]);
		learnsetAdd('magcargo', [
			['slackoff', 8],
			['powergem', 8],
			['meteorbeam', 8],
			['magmastorm', 8],
		]);
		learnsetAdd('mamoswine', [
			['headlongrush', 8],
		]);
		learnsetAdd('corsola', [
			['flipturn', 8],
		]);
		learnsetAdd('corsolagalar', [
			['teleport', 8],
			['shadowsneak', 8],
			['toxic', 8],
		]);
		// Cursola will gain teleport, shadow sneak, and toxic
		// due to inheritences.
		learnsetAdd('octillery', [
			['aquaring', 8],
			['thunderbolt', 8],
			['meteorbeam', 8],
			['aurasphere', 8],
			['shadowball', 8],
			['aeroblast', 8],
			['darkpulse', 8],
			['moonblast', 8],
			['dragonpulse', 8],
			['originpulse', 8],
		]);
		learnsetAdd('delibird', [
			['dazzlinggleam', 8],
			['playrough', 8],
		]);
		//#endregion
		//#region Gen 3
		learnsetAdd('sceptile', [
			['trailblaze', 9],
			['powerwhip', 8],
		]);
		learnsetAdd('blaziken', [
			['blazingtorque', 9],
		]);
		learnsetAdd('swampert', [
			['chillingwater', 9],
			['tripledive', 9],
		]);
		learnsetAdd('mightyena', [
			['jawlock', 8],
			['psychicfangs', 8],
			['knockoff', 8],
			['lashout', 8],
			['pursuit', 8],
			['crushclaw', 8],
		]);
		learnsetAdd('linoone', [
			['bulletseed', 8],
		]);
		learnsetAdd('obstagoon', [
			['pursuit', 8],
			['suckerpunch', 8],
			['toxic', 8],
		]);
		learnsetAdd('beautifly', [
			['airslash', 8],
			['spore', 8],
			['moonblast', 8],
			['drainingkiss', 8],
			['hurricane', 8],
		]);
		learnsetAdd('dustox', [
			['spore', 8],
			['voltswitch', 8],
			['paraboliccharge', 8],
			['lunge', 8],
			['leechlife', 8],
			['defendorder', 8],
			['skittersmack', 8],
			['hurricane', 8],
		]);
		learnsetAdd('ludicolo', [
			['quiverdance', 8],
			['teeterdance', 8],
		]);
		learnsetAdd('shiftry', [
			['partingshot', 8],
		]);
		learnsetAdd('swellow', [
			['dualwingbeat', 8],
			['bleakwindstorm', 8],
			['tidyup', 9],
			['terablast', 9],
			['extremespeed', 8],
		]);
		learnsetAdd('pelipper', [
			['flipturn', 8],
		]);
		learnsetAdd('gardevoir', [
			['recover', 8],
		]);
		learnsetAdd('masquerain', [
			['flipturn', 8],
			['muddywater', 8],
			['psychic', 8],
		]);
		learnsetAdd('breloom', [
			['grassyglide', 8],
			['powerwhip', 8],
			['trailblaze', 9],
		]);
		learnsetAdd('slaking', [
			['knockoff', 8],
		]);
		learnsetAdd('ninjask', [
			['firstimpression', 8],
			['drillrun', 8],
			['lunge', 8],
			['fellstinger', 8],
			['pounce', 8],
			['infestation', 8],
		]);
		learnsetAdd('shedinja', [
			['fly', 8],
		]);
		learnsetAdd('exploud', [
			['overdrive', 8],
		]);
		learnsetAdd('hariyama', [
			['highhorsepower', 8],
		]);
		learnsetAdd('probopass', [
			['risingvoltage', 8],
		]);
		learnsetAdd('delcatty', [
			['moonblast', 8],
			['dazzlinggleam', 8],
			['extremespeed', 8],
			['moonlight', 8],
			['morningsun', 8],
			['ironhead', 8],
			['drainingkiss', 8],
			['flamethrower', 8],
		]);
		learnsetAdd('mantine', [
			['flipturn', 8]
		]);
		learnsetAdd('houndoom', [
			['fierywrath', 8],
			['scorching sands', 8]
		]);
		// Mega-Houndoom will inherit Fiery Wrath and Scorching Sands.
		learnsetAdd('donphan', [
			['flamewheel', 8],
			['spinout', 8],
		]);
		learnsetAdd('wyrdeer', [
			['recover', 8],
		]);
		learnsetAdd('miltank', [
			['recycle', 8],
		]);
		learnsetAdd('raikou', [
			['firefang', 8],
			['icefang', 8],
			['playrough', 8],
			['floatyfall', 8],
		]);
		learnsetAdd('entei', [
			['earthquake', 8],
			['earthpower', 8],
		]);
		learnsetAdd('suicune', [
			['hypervoice', 8],
			['round', 8],
			['echoedvoice', 8],
			['thunderbolt', 8],
		]);
		learnsetAdd('tyranitar', [
			['suckerpunch', 8],
			['tarshot', 8],
		]);
		learnsetAdd('sableye', [
			['baddybad', 8],
			['nightdaze', 8],
			['nightslash', 8],
		]);
		learnsetAdd('mawile', [
			['hyperfang', 8],
			['jawlock', 8],
		]);
		learnsetAdd('aggron', [
			['dragonhammer', 8],
			['hammerarm', 8],
			['powerwhip', 8],
		]);
		learnsetAdd('medicham', [
			['expandingforce', 8],
			['teleport', 8],
			['tripleaxel', 8],
		]);
		learnsetAdd('manectric', [
			['darkpulse', 8],
			['thundercage', 8],
			['workup', 8],
			['wildboltstorm', 9],
		]);
		learnsetAdd('plusle', [
			['weatherball', 8],
			['knockoff', 8],
			['risingvoltage', 8],
		]);
		learnsetAdd('minun', [
			['extremespeed', 8],
			['knockoff', 8],
			['risingvoltage', 8],
		]);
		learnsetAdd('volbeat', [
			['voltswitch', 8],
			['paraboliccharge', 8],
			['weatherball', 8],
		]);
		learnsetAdd('illumise', [
			['pollenpuff', 8],
			['lunge', 8],
			['dualwingbeat', 8],
			['firstimpression', 8],
			['skittersmack', 8],
		]);
		learnsetAdd('roserade', [
			['appleacid', 8],
			['sludgewave', 8],
			['drainingkiss', 8],
		]);
		learnsetAdd('swalot', [
			['earthpower', 8],
			['hydropump', 8],
			['focusblast', 8],
			['blizzard', 8],
			['poisonjab', 8],
		]);
		learnsetAdd('sharpedo', [
			['wavecrash', 9],
			['fishiousrend', 8],
		]);
		//#endregion
		//#endregion
	},
};