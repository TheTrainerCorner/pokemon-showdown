import { ModdedDex } from "./../../../../sim/dex";
export default function Gen7 (dex: ModdedDex) {
	let modifyPokemon = (pokemon: string) => {
		if(dex.modData('FormatsData', pokemon.toLowerCase()).tier && dex.modData('FormatsData', pokemon.toLowerCase()).tier === "Illegal") {
			dex.modData('FormatsData', pokemon.toLowerCase()).tier = "OU";
		}	
		let baseStat = () => {
			return {
				setHp,
				setAtk,
				setDef,
				setSpA,
				setSpD,
				setSpe,
				pokemon: modifyPokemon(pokemon)
			};
		};

		let learnset = () => {
			return {
				addMove,
				removeMove,
				pokemon: modifyPokemon(pokemon)
			};
		}

		let ability = () => {
			return {
				set0,
				set1,
				setH,
				setS,
				pokemon: modifyPokemon(pokemon)
			}
		}

		let changeType = (type1: string, type2?: string) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).types = type2 ? [type1, type2] : [type1];
			return modifyPokemon(pokemon);
		}

		let addMove = (name: string, gen: number = 8) => {
			dex.modData('Learnsets', pokemon.toLowerCase()).learnset[name.toLowerCase().replace(/ +/g, '')] = [`${gen}M`];
			return learnset();
		}

		let removeMove = (name: string) => {
			dex.modData('Learnsets', pokemon.toLowerCase()).learnset[name.toLowerCase().replace(/ +g/, '')] = [];
			return learnset();
		}

		let setHp = (stat: number) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).baseStats['hp'] = stat;
			return baseStat();
		}

		let setAtk = (stat: number) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).baseStats['atk'] = stat;
			return baseStat();
		}
		
		let setDef = (stat: number) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).baseStats['def'] = stat;
			return baseStat();
		}

		let setSpA = (stat: number) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).baseStats['spa'] = stat;
			return baseStat();
		}

		let setSpD = (stat: number) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).baseStats['spd'] = stat;
			return baseStat();
		}

		let setSpe = (stat: number) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).baseStats['spe'] = stat;
			return baseStat();
		}

		let set0 = (name: string) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).abilities['0'] = name;
			return ability();
		}

		let set1 = (name: string) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).abilities['1'] = name;
			return ability();
		}

		let setH = (name: string) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).abilities['H'] = name;
			return ability();
		}

		let setS = (name: string) => {
			dex.modData('Pokedex', pokemon.toLowerCase()).abilities['S'] = name;
			return ability();
		}

		return {
			learnset,
			baseStat,
			changeType,
			ability,
		}
	}
	modifyPokemon('decidueye')
		.ability()
			.set1('Sniper')
		.pokemon.baseStat()
			.setDef(80)
			.setSpA(105)
			.setSpD(95)
			.setSpe(85)
		.pokemon.learnset()
			.addMove('Thousand Arrows')
			.addMove('Snipe Shot')
			.addMove('Night Slash');
	modifyPokemon('decidueyehisui')
		.ability()
			.set1('Technician')
		.pokemon.baseStat()
			.setSpA(75)
			.setSpe(90)
		.pokemon.learnset()
			.addMove('Flying Press')
			.addMove('Thunderous Kick')
			.addMove('Triple Kick')
			.addMove('Triple Axel')
			.addMove('Trop Kick');
	modifyPokemon('incineroar')
		.ability()
			.set1('Defiant')
		.pokemon.baseStat()
			.setAtk(110)
			.setDef(95)
		.pokemon.learnset()
			.addMove('Flying Press')
			.addMove('Body Press')
			.addMove('Copycat')
			.addMove('Power up Punch');
	modifyPokemon('primarina')
		.ability()
			.set1('Thick Fat')
		.pokemon.learnset()
			.addMove('Boomburst')
			.addMove('Eerie Spell');
	modifyPokemon('toucannon')
		.changeType('Flying')
		.ability()
			.set0('Oblivious')
		.pokemon.baseStat()
			.setHp(90)
			.setDef(85)
			.setSpe(75)
		.pokemon.learnset()
			.addMove('Hurricane')
			.addMove('Pin Missile')
			.addMove('Icicle Spear')
			.addMove('Tail Slap')
			.addMove('Beak Blast');
	modifyPokemon('gumshoos')
		.changeType('Normal', 'Dark')
		.baseStat()
			.setSpA(45)
			.setSpe(65)
		.pokemon.learnset()
			.addMove('Psychic Fangs')
			.addMove('Thunder Fang')
			.addMove('Ice Fang')
			.addMove('Slack Off')
			.addMove('Trump Card');
	modifyPokemon('vikavolt')
		.ability()
			.set1('Motor Drive')
			.setH('Electromorphosis')
		.pokemon.baseStat()
			.setAtk(105)
			.setSpD(90)
			.setSpe(93)
		.pokemon.learnset()
			.addMove('Defog')
			.addMove('U Turn');
	modifyPokemon('Crabominable')
		.ability()
			.setH('Contrary')
		.pokemon.baseStat()
			.setAtk(127)
			.setDef(82)
			.setSpA(72)
			.setSpD(77)
			.setSpe(48)
		.pokemon.learnset()
			.addMove('Swords Dance')
			.addMove('Ice Shard')
			.addMove('Shell Smash')
			.addMove('Mach Punch')
			.addMove('Hammer Arm');
	// Base oricorio is Oricorio-Baile
	modifyPokemon('oricorio')
		.ability()
			.setH('Drought')
		.pokemon.learnset()
			.addMove('Quiver Dance')
			.addMove('Dragon Dance')
			.addMove('Fiery Dance')
			.addMove('Flame Charge')
			.addMove('Overheat')
			.addMove('Flamethrower');
	modifyPokemon('oricoriosensu')
		.ability()
			.setH('Perish Body')
		.pokemon.learnset()
			.addMove('Quiver Dance')
			.addMove('Dragon Dance')
			.addMove('Lunar Dance')
			.addMove('Shadow Ball')
			.addMove('Poltergeist');
	modifyPokemon('oricoriopompom')
		.ability()
			.setH('Lightning Rod')
		.pokemon.learnset()
			.addMove('Quiver Dance')
			.addMove('Dragon Dance')
			.addMove('Electric Terrain')
			.addMove('Rising Voltage')
			.addMove('Rain Dance')
			.addMove('Thunderbolt')
			.addMove('Wild Charge');
	modifyPokemon('oricoriopau')
		.ability()
			.setH('Dazzling')
		.pokemon.learnset()
			.addMove('Quiver Dance')
			.addMove('Dragon Dance')
			.addMove('Expanding Force')
			.addMove('Lunar Dance')
			.addMove('Psychic Terrain')
			.addMove('Psychic')
			.addMove('Psyshock');
	modifyPokemon('ribombee')
		.ability()
			.set0('Sweet Veil')
			.set1('Compound Eyes')
			.setH('Honey Gather')
		.pokemon.baseStat()
			.setHp(70)
			.setAtk(45)
		.pokemon.learnset()
			.addMove('Earth Power')
			.addMove('Leech Seed')
			.addMove('Giga Drain');
	// Base Lycanroc is Lycanroc-Midday
	modifyPokemon('lycanroc')
		.changeType('Rock', 'Ground')
		.ability()
			.set0('Steadfast')
			.setH('Tough Claws')
		.pokemon.learnset()
			.addMove('Earthquake')
			.addMove('Shadow Claw')
			.addMove('Hone Claws');
	modifyPokemon('lycanrocdusk')
		.changeType('Rock', 'Fighting')
		.ability()
			.set0('Defiant')
			.setH('Strong Jaw')
		.pokemon.baseStat()
			.setDef(70)
			.setSpA(50)
			.setSpD(70)
		.pokemon.learnset()
			.addMove('Morning Sun')
			.addMove('Ice Fang')
			.addMove('Poison Fang')
			.addMove('Super Fang');
	modifyPokemon('lycanrocmidnight')
		.changeType('Rock', 'Dark')
		.ability()
			.set0('Vital Spirit')
			.set1('No Guard')
			.setH('Iron Fist')
		.pokemon.baseStat()
			.setHp(90)
			.setDef(85)
			.setSpD(85)
			.setSpe(92)
		.pokemon.learnset()
			.addMove('Mach Punch')
			.addMove('Ice Punch')
			.addMove('Drain Punch')
			.addMove('Dynamic Punch')
			.addMove('Power up Punch')
			.addMove('Shadow Punch')
			.addMove('Headlong Rush')
			.addMove('Knock Off')
			.addMove('Darkest Lariet')
			.removeMove('Fire Fang')
			.removeMove('Psychic Fang')
			.removeMove('Thunder Fang');
	modifyPokemon('wishiwashi')
		.learnset()
			.addMove('Bouncy Bubble')
			.addMove('Origin Pulse');
	modifyPokemon('wishiwashischool');
	modifyPokemon('toxapex')
		.baseStat()
			.setHp(55)
			.setAtk(58)
			.setSpA(58);
	modifyPokemon('mudsdale')
		.ability()
			.setH('Tangling Hair')
		.pokemon.baseStat()
			.setDef(95)
			.setSpD(90)
			.setSpe(40)
		.pokemon.learnset()
			.addMove('Jump Kick')
			.addMove('Slack Off');
	modifyPokemon('araquanid')
		.baseStat()
			.setHp(73)
			.setDef(97)
		.pokemon.learnset()
			.addMove('Spider Web');
	modifyPokemon('lurantis')
		.changeType('Grass', 'Bug')
		.ability()
			.set1('Chlorophyll')
		.pokemon.baseStat()
			.setDef(95)
			.setSpA(85)
			.setSpe(55)
		.pokemon.learnset()
			.addMove('Close Combat');
	modifyPokemon('shiinotic')
		.ability()
			.set0('Poison Point')
			.setH('Poison Heal')
		.pokemon.baseStat()
			.setHp(65)
			.setDef(90)
			.setSpe(35)
		.pokemon.learnset()
			.addMove('Synthesis')
			.addMove('Clear Smog')
			.addMove('Misty Terrain')
			.removeMove('Drain Punch');
	modifyPokemon('salazzle')
		.ability()
			.setH('Merciless')
		.pokemon.baseStat()
			.setDef(65)
			.setSpD(65)
			.setSpe(121)
		.pokemon.learnset()
			.addMove('Dark Pulse');
	modifyPokemon('bewear')
		.ability()
			.setH('Intimidate')
		.pokemon.baseStat()
			.setDef(85)
			.setSpD(75)
		.pokemon.learnset()
			.addMove('Circle Throw');
	modifyPokemon('tsareena')
		.changeType('Grass', 'Fighting')
		.ability()
			.setH('Leg Day')
		.pokemon.baseStat()
			.setHp(77)
			.setSpe(82)
		.pokemon.learnset()
			.addMove('Triple Kick')
			.addMove('Bulk Up');
	modifyPokemon('comfey')
		.learnset()
			.addMove('Sparkly Swirl');
	modifyPokemon('oranguru')
		.ability()
			.setH('Unaware')
		.pokemon.baseStat()
			.setHp(105)
			.setAtk(50)
			.setSpA(95)
			.setSpD(120)
			.setSpe(50)
		.pokemon.learnset()
			.addMove('Eerie Spell');
	modifyPokemon('passimian')
		.changeType('Normal', 'Fighting')
		.ability()
			.set0('Hustle')
		.pokemon.baseStat()
			.setSpD(65)
			.setSpe(85)
		.pokemon.learnset()
			.addMove('Mach Punch');
	modifyPokemon('golisopod')
		.ability()
			.set1('Shell Armor')
		.pokemon.baseStat()
			.setHp(85)
			.setSpD(100);
	modifyPokemon('palossand')
		.ability()
			.set1('Sand Stream')
		.pokemon.baseStat()
			.setDef(120)
			.setSpD(85)
		.pokemon.learnset()
			.addMove('Hex');
	modifyPokemon('pyukumuku')
		.learnset()
			.addMove('Hydro Cannon')
			.addMove('Hyper Beam');
	modifyPokemon('typenull')
		.ability()
			.set1('Filter')
		.pokemon.learnset()
			.addMove('Earthquake');
	modifyPokemon('Silvally')
		.ability()
			.set1('Protean')
		.pokemon.learnset()
			.addMove('Earthquake')
			.addMove('Extreme Speed')
			.addMove('Recover');
	modifyPokemon('minior')
		.learnset()
			.addMove('Meteor Beam')
			.addMove('Head Smash');
	modifyPokemon('komala')
		.baseStat()
			.setHp(85)
			.setDef(85)
			.setSpA(55);
	modifyPokemon('turtonator')
		.ability()
			.set1('Iron Barbs')
			.setH('Dauntless Shield')
		.pokemon.baseStat()
			.setHp(70)
			.setAtk(68)
			.setSpA(111)
		.pokemon.learnset()
			.addMove('Lava Plume')
			.addMove('Earth Power')
			.addMove('Mirror Coat')
			.addMove('Metal Burst');
	modifyPokemon('togedemaru')
		.ability()
			.set1('Motor Drive')
		.pokemon.baseStat()
			.setAtk(108)
			.setDef(83)
			.setSpe(106)
		.pokemon.learnset()
			.addMove('Zippy Zap')
			.addMove('Volt Tackle');
	modifyPokemon('mimikyu')
		.learnset()
			.addMove('Poltergeist');
	modifyPokemon('bruxish')
		.baseStat()
			.setHp(73)
			.setAtk(110)
			.setSpA(75)
		.pokemon.learnset()
			.addMove('Flip Turn');
	modifyPokemon('drampa')
		.ability()
			.set1('Competitive')
		.pokemon.baseStat()
			.setHp(88)
			.setAtk(50)
		.pokemon.learnset()
			.addMove('Earth Power');
	modifyPokemon('dhelmise')
		.baseStat()
			.setHp(75)
			.setDef(115)
			.setSpA(76)
		.pokemon.learnset()
			.addMove('Spirit Shackle')
			.addMove('Liquidation');
	modifyPokemon('kommoo')
		.learnset()
			.addMove('Vacuum Wave');
	modifyPokemon('solgaleo');
	modifyPokemon('lunala');
	modifyPokemon('tapukoko')
		.learnset()
			.addMove('Play Rough');
	modifyPokemon('tapulele');
	modifyPokemon('tapubulu')
		.learnset()
			.addMove('Play Rough');
	modifyPokemon('tapufini')
		.learnset()
			.addMove('Flip Turn');
	modifyPokemon('magearna');
	modifyPokemon('nihilego')
		.ability()
			.setH('Filter');
	modifyPokemon('buzzwole')
		.ability()
			.setH('Guts');
	modifyPokemon('xurkitree')
		.ability()
			.setH('Volt Absorb')
		.pokemon.learnset()
			.addMove('Thunder Cage');
	modifyPokemon('celesteela')
		.ability()
			.setH('Steelworker');
	modifyPokemon('kartana')
		.ability()
			.setH('Sharpness');
	modifyPokemon('guzzlord')
		.ability()
			.setH('Dark Aura')
		.pokemon.baseStat()
			.setDef(63)
			.setSpD(63)
			.setSpe(23)
		.pokemon.learnset()
			.addMove('Dragon Hammer')
			.addMove('Parting Shot')
			.addMove('Pursuit')
			.addMove('Sucker Punch');
	modifyPokemon('naganadel')
		.ability()
			.setH('Poison Point')
		.pokemon.baseStat()
			.setSpA(107)
			.setSpe(101);
	modifyPokemon('necrozma');
	modifyPokemon('necrozmaduskmane');
	modifyPokemon('necrozmadawnwings');
	modifyPokemon('stakataka')
		.ability()
			.setH('Heavy Metal')
		.pokemon.baseStat()
			.setDef(180)
			.setSpD(132);
	modifyPokemon('blacephalon')
		.ability()
			.setH('Prankster')
		.pokemon.learnset()
			.addMove('Scorching Sands');
	modifyPokemon('zeraora')
		.changeType('Electric', 'Fighting')
		.ability()
			.set1('Tough Claws');
	modifyPokemon('melmetal');
}