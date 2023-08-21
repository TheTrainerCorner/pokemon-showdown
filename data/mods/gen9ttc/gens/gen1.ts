import { ModdedDex } from '../../../../sim/dex';

export default function Gen1(dex: ModdedDex) {
	let modifyPokemon = (pokemon: string) => {
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

	modifyPokemon('venusaur')
	.baseStat()
		.setHp(90)
		.setAtk(77)
		.setDef(90)
		.setSpA(95)
		.setSpD(105)
	.pokemon.learnset()
		.addMove('Sludge Wave')
		.addMove('Acid Spray')
		.addMove('Gastro acid');

modifyPokemon('charizard')
	.baseStat()
		.setAtk(94)
		.setSpe(105)
	.pokemon.learnset()
		.addMove('Fire Lash')
		.addMove('U Turn')
		.addMove('Burn up');

modifyPokemon('charizardmegax')
	.baseStat()
		.setAtk(135)
		.setSpe(105);

modifyPokemon('charizardmegay')
	.baseStat()
		.setSpe(110);

modifyPokemon('blastoise')
	.ability()
		.set1('Shell Armor')
	.pokemon.baseStat()
		.setAtk(63)
		.setDef(120)
	.pokemon.learnset()
		.addMove('Hydro Steam', 9)
		.addMove('Steam Eruption');

modifyPokemon('butterfree')
	.changeType('Bug', 'Psychic')
	.baseStat()
		.setHp(75)
		.setDef(75)
		.setSpA(100)
		.setSpD(100)
		.setSpe(50)
	.pokemon.learnset()
		.addMove('Light Screen')
		.addMove('Aromatherapy')
		.addMove('Sticky Web')
		.addMove('Psyshock')
		.addMove('Lumina Crash')
		.addMove('Trick Room');

modifyPokemon('beedrill')
	.ability()
		.set1('Merciless')
	.pokemon.baseStat()
		.setAtk(100)
		.setSpA(20)
		.setSpe(105)
	.pokemon.learnset()
		.addMove('Cross Poison')
		.addMove('Dual Wingbeat')
		.addMove('First Impression');

modifyPokemon('pidgeot')
	.ability()
		.set0('Frisk')
		.set1('Early Bird')
		.setH('Defiant')
	.pokemon.baseStat()
		.setAtk(95)
		.setDef(85)
		.setSpA(80)
		.setSpe(96)
	.pokemon.learnset()
		.addMove('Hyper Voice')
		.addMove('Bulk Up')
		.addMove('Extreme Speed')
		.addMove('Aura Sphere')
		.addMove('Dual Wingbeat');

modifyPokemon('raticate')
	.ability()
		.set0('Strong Jaw')
	.pokemon.baseStat()
		.setHp(65)
		.setAtk(96)
		.setSpe(102)
	.pokemon.learnset()
		.addMove('Close Combat')
		.addMove('Fire Fang')
		.addMove('Ice Fang')
		.addMove('Psychic Fangs');
	
modifyPokemon('raticatealola')
	.ability()
		.set1('Cheek Pouch')
	.pokemon.baseStat()
		.setHp(100)
		.setAtk(90)
		.setSpD(90)
		.setSpe(60)
	.pokemon.learnset()
		.addMove('Close Combat')
		.addMove('Fire Fang')
		.addMove('Ice Fang')
		.addMove('Psychic Fangs')
		.addMove('Parting Shot');

modifyPokemon('fearow')
	.changeType('Dark', 'Flying')
	.ability()
		.set0('Frisk')
	.pokemon.baseStat()
		.setHp(75)
		.setAtk(100)
		.setDef(55)
		.setSpD(51)
		.setSpe(105)
	.pokemon.learnset()
		.addMove('Swords Dance')
		.addMove('Dual Wingbeat')
		.addMove('Beak Blast')
		.addMove('Foul Play')
		.addMove('Night Slash')
		.addMove('False Surrender');

modifyPokemon('arbok')
	.ability()
		.setH('Strong Jaw')
	.pokemon.baseStat()
		.setHp(80)
		.setDef(89)
		.setSpD(99)
		.setSpe(75)
	.pokemon.learnset()
		.addMove('Jaw Lock')
		.addMove('Shed Tail');

modifyPokemon('pikachu')
	.baseStat()
		.setAtk(60)
		.setSpA(60)
		.setSpe(100)
	.pokemon.learnset()
		.addMove('Zippy Zap');

modifyPokemon('raichu')
	.ability()
		.set1('Galvanize')
	.pokemon.baseStat()
		.setAtk(100)
		.setSpA(100)
	.pokemon.learnset()
		.addMove('Zippy Zap');

modifyPokemon('raichualola')
	.baseStat()
		.setSpA(105);

modifyPokemon('sandslash')
	.ability()
		.set0('Rough Skin')
	.pokemon.baseStat()
		.setHp(85)
		.setAtk(105)
		.setSpD(75)
	.pokemon.learnset()
		.addMove('Spiky Shield')
		.addMove('Spin Out');
	
modifyPokemon('sandslashalola')
	.ability()
		.set0('Rough Skin')
	.pokemon.baseStat()
		.setHp(80)
		.setDef(135)
		.setSpD(80)
	.pokemon.learnset()
		.addMove('Spiky Shield')
		.addMove('Ice Spinner', 9);

modifyPokemon('nidoqueen')
	.baseStat()
		.setHp(100)
		.setAtk(72)
		.setSpA(95)
		.setSpD(95)
		.setSpe(60);

modifyPokemon('nidoking')
	.baseStat()
		.setAtk(112)
		.setSpA(75)
		.setSpe(95)
	.pokemon.learnset()
		.addMove('Gunk Shot')
		.addMove('Precipice Blades');

modifyPokemon('clefable');

modifyPokemon('ninetales')
	.changeType('Fire', 'Ghost')
	.ability()
		.set1('Cursed Body')
		.setH('Bad Dreams')
	.pokemon.baseStat()
		.setSpA(91)
	.pokemon.learnset()
		.addMove('Lava Plume')
		.addMove('Dark Void')
		.addMove('Destiny Bond')
		.addMove('Nightmare')
		.addMove('Bitter Malice')
		.addMove('Night Daze');
		//.removeMove('Nasty Plot');

modifyPokemon('ninetalesalola')
	.baseStat()
		.setHp(83)
		.setDef(85)
		.setSpD(110)
	.pokemon.learnset()
		.addMove('Haze')
		.addMove('Chilly Reception')
		.addMove('Glaciate');

modifyPokemon('wigglytuff')
	.ability()
		.set0('Fluffy')
		.setH('Thick Fat')
	.pokemon.baseStat()
		.setDef(55)
		.setSpD(60)
		.setSpe(55)
	.pokemon.learnset()
		.addMove('Moonblast');

modifyPokemon('crobat')
	.ability()
		.set1('Infiltrator')
		.setH('Vampire') // New Ability
	.pokemon.learnset()
		.addMove('Poison Jab')
		.addMove('Toxic Spikes')
		.addMove('Fire Fang')
		.addMove('Thunder Fang')
		.addMove('Ice Fang');

modifyPokemon('vileplume')
	.ability()
		.set0('Lingering Aroma')
		.set1('Neutralizing Gas')
	.pokemon.learnset()
		.addMove('Apple Acid')
		.addMove('Trailblaze', 9)
		.addMove('Acid Spray');

modifyPokemon('parasect')
	.ability()
		.set0('Regenerator')
	.pokemon.baseStat()
		.setHp(70)
		.setAtk(105)
		.setDef(100)
		.setSpe(55)
	.pokemon.learnset()
		.addMove('Crabhammer')
		.addMove('Grassy Glide')
		.addMove('Spore')
		.addMove('U Turn')
		.addMove('Leaf Blade')
		.addMove('Pounce')
		.addMove('Trailblaze', 9);

modifyPokemon('venomoth')
	.ability()
		.setH('Compound Eyes')
	.pokemon.learnset()
		.addMove('Hex');

modifyPokemon('dugtrio')
	.ability()
		.set1('Emergency Exit')
	.pokemon.learnset()
		.addMove('Headlong Rush');

modifyPokemon('dugtrioalola')
	.ability()
		.set0('Emergency Exit')
	.pokemon.baseStat()
		.setAtk(105)
	.pokemon.learnset()
		.addMove('Headlong Rush');

modifyPokemon('persian')
	.ability()
		.setH('Intimidate')
	.pokemon.baseStat()
		.setAtk(90)
		.setSpA(70)
	.pokemon.learnset()
		.addMove('Dazzling Gleam')
		.addMove('Sucker Punch');

modifyPokemon('persianalola')
	.ability()
		.setH('Prankster')
	.pokemon.baseStat()
		.setAtk(65)
		.setSpA(90)
	.pokemon.learnset()
		.addMove('Sucker Punch')
		.addMove('Night Daze');

modifyPokemon('golduck')
	.changeType('Water', 'Psychic')
	.baseStat()
		.setHp(75)
		.setDef(73)
		.setSpA(100)
	.pokemon.learnset()
		.addMove('Teleport')
		.addMove('Expanding Force');

modifyPokemon('primeape')
	.ability()
		.setH('Gorilla Tactics')
	.pokemon.learnset()
		.addMove('Knock Off');

modifyPokemon('arcanine')
	.ability()
		.setH('Strong Jaw')
	.pokemon.learnset()
		.addMove('Thunder Wave')
		.addMove('Ice Fang');

modifyPokemon('poliwrath')
	.baseStat()
		.setAtk(85)
	.pokemon.learnset()
		.addMove('Surging Strikes')
		.addMove('Flip Turn')
		.addMove('Jet Punch', 9);

modifyPokemon('politoed')
	.baseStat()
		.setHp(95)
		.setAtk(65)
		.setDef(70)
		.setSpA(105)
		.setSpD(95)
	.pokemon.learnset()
		.addMove('Flip Turn')
		.addMove('Life Dew');

modifyPokemon('alakazam');
	// .learnset()
	// 	.removeMove('Counter')
	// 	.removeMove('Barrier');
modifyPokemon('alakazammega')
	.baseStat()
		.setSpe(135);
		
modifyPokemon('machamp')
	.baseStat()
		.setHp(100)
		.setDef(90)
		.setSpD(95)
	.pokemon.learnset()
		.addMove('Drain Punch')
		.addMove('Combat Torque');

modifyPokemon('victreebel')
	.ability()
		.set0('Liquid Ooze')
		.setH('Fly Trap') // New Ability
	.pokemon.baseStat()
		.setDef(70)
		.setSpe(75)
	.pokemon.learnset()
		.addMove('Solar Blade');

modifyPokemon('tentacruel')
	.ability()
		.set1('Toxic Debris')
		.setH('Levitate')
	.pokemon.baseStat()
		.setHp(90)
		.setAtk(65)
		.setDef(80)
		.setSpA(85)
		.setSpD(110)
	.pokemon.learnset()
		.addMove('Flip Turn')
		.addMove('Nasty Plot')
		.addMove('Octolock')
		.addMove('Spikes')
		.addMove('Recover');

modifyPokemon('golem')
	.ability()
		.setH('Solid Rock')
	.pokemon.baseStat()
		.setHp(90)
		.setSpA(40)
		.setSpD(75)
		.setSpe(35)
	.pokemon.learnset()
		.addMove('Body Press')
		.addMove('Head Smash')
		.addMove('Rapid Spin');

modifyPokemon('golemalola')
	.baseStat()
		.setHp(85)
		.setAtk(55)
		.setDef(120)
		.setSpA(115)
		.setSpD(70)
		.setSpe(55)
	.pokemon.learnset()
		.addMove('Flash Cannon')
		.addMove('Power Gem')
		.addMove('Steel Beam')
		.addMove('Thousand Arrows')
		.addMove('Zap Cannon');

modifyPokemon('rapidash')
	.changeType('Normal', 'Fire')
	.ability()
		.set0('Reckless')
	.pokemon.baseStat()
		.setSpA(60)
		.setSpe(125)
	.pokemon.learnset()
		.addMove('Fire Lash')
		.addMove('Jump Kick')
		.addMove('Blaze Kick')
		.addMove('Bulldoze')
		.addMove('Horn Leech');

modifyPokemon('rapidashgalar')
	.ability()
		.set0('Fairy Aura')
		.setH('Magic Guard')
	.pokemon.baseStat()
		.setAtk(85)
		.setSpA(95)
		.setSpe(125)
	.pokemon.learnset()
		.addMove('Fire Lash')
		.addMove('Moonblast')
		.addMove('Luster Purge')
		.addMove('Psyblade', 9)
		.addMove('Cosmic Power');

modifyPokemon('slowbro');

modifyPokemon('slowbromega')
	.baseStat()
		.setAtk(65)
		.setDef(170)
		.setSpD(90);

modifyPokemon('slowbrogalar')
	.baseStat()
		.setAtk(80)
		.setDef(100)
		.setSpA(110)
	.pokemon.learnset()
		.addMove('Teleport')
		.addMove('Toxic');

modifyPokemon('slowking');

modifyPokemon('slowkinggalar')
	.learnset()
		.addMove('Toxic');
modifyPokemon('magneton')
	.ability()
		.set1('Levitate')
	.pokemon.baseStat()
		.setDef(100)
		.setSpD(80);
modifyPokemon('magnezone')
	.ability()
		.set1('Levitate');

modifyPokemon('farfetchd')
	.ability()
		.set0('Sharpness')
	.pokemon.baseStat()
		.setHp(65)
		.setDef(65)
		.setSpD(70)
		.setSpe(90)
	.pokemon.learnset()
		.addMove('Drill Peck')
		.addMove('Dual Wingbeat')
		.addMove('X Scissor')
		.addMove('Aqua Cutter', 9)
		.addMove('Ceaseless Edge');

modifyPokemon('farfetchdgalar')
	.ability()
		.set1('No Guard')
	.pokemon.baseStat()
		.setHp(70)
		.setDef(65)
		.setSpD(70)
	.pokemon.learnset()
		.addMove('Sacred Sword')
		.addMove('Drill Peck')
		.addMove('Brick Break');

modifyPokemon('sirfetchd')
	.changeType('Fighting', 'Flying')
	.ability()
		.set1('Sharpness')
	.pokemon.baseStat()
		.setHp(80)
	.pokemon.learnset()
		.addMove('Sacred Sword')
		.addMove('Roost')
		.addMove('Toxic')
		.addMove('Drill Run')
		.addMove('Behemoth Blade');

modifyPokemon('dodrio')
	.changeType('Ground', 'Flying')
	.ability()
		.set0('Sand Force')
		.setH('Wind Rider')
	.pokemon.learnset()
		.addMove('U Turn')
		.addMove('Dual Wingbeat')
		.addMove('Triple Axel')
		.addMove('Earthquake')
		.addMove('Rock Slide')
		.addMove('High Horsepower')
		.addMove('Head Smash')
		// .removeMove('Fly');

modifyPokemon('dewgong')
	.ability()
		.set1('Water Absorb')
		.setH('Slush Rush')
	.pokemon.baseStat()
		.setAtk(55)
		.setSpA(90)
	.pokemon.learnset()
		.addMove('Scald')
		.addMove('Flip Turn')
		.addMove('Hydro Pump')
		.addMove('Megahorn')
		.addMove('Freeze Dry')
		.addMove('Chilling Water');

modifyPokemon('muk')
	.ability()
		.set0('Regenerator')
		.set1('Gooey')
	.pokemon.baseStat()
		.setAtk(85)
		.setDef(95)
		.setSpA(75)
	.pokemon.learnset()
		.removeMove('Moonblast')
		.addMove('Poison Fang');

modifyPokemon('mukalola')
	.ability()
		.setH('Corrosion')
	.pokemon.baseStat()
		.setHp(85)
		.setSpD(90)
	.pokemon.learnset()
		.removeMove('Moonblast')
		.addMove('Parting Shot')
		.addMove('Sucker Punch');

modifyPokemon('cloyster');
modifyPokemon('gengar');

modifyPokemon('gengarmega')
	.ability()
		.set0('Perish Body')
	.pokemon.baseStat()
		.setHp(65)
		.setDef(85)
		.setSpA(145)
		.setSpe(120);

modifyPokemon('steelix')
	.baseStat()
		.setSpD(80)
	.pokemon.learnset()
		.addMove('Coil');

modifyPokemon('steelixmega')
	.ability()
		.set0('Steelworker')
	.pokemon.baseStat()
		.setSpD(110);

modifyPokemon('hypno')
	.ability()
		.setH('Psychic Surge')
		.set1('Bad Dreams')
	.pokemon.baseStat()
		.setDef(80)
		.setSpA(83)
		.setSpe(70)
	.pokemon.learnset()
		.addMove('Expanding Force');

modifyPokemon('kingler')
	.changeType('Water', 'Steel')
	.baseStat()
		.setHp(65)
	.pokemon.learnset()
		.addMove('Flip Turn')
		.addMove('Aqua Jet')
		.addMove('Close Combat')
		.addMove('Ice Punch')
		.addMove('Meteor Mash')
		.addMove('Bullet Punch');

modifyPokemon('electrode')
	.changeType('Electric', 'Steel')
	.ability()
		.setH('Galvanize')
		.set1('Baller')
	.pokemon.baseStat()
		.setSpA(100)
	.pokemon.learnset()
		.addMove('Weather Ball')
		.addMove('Flash Cannon')
		.addMove('Focus Blast')
		.addMove('Shadow Ball')
		.addMove('Aura Sphere')
		.addMove('Magnet Bomb');

modifyPokemon('electrodehisui')
	.ability()
		.set1('Baller')
	.pokemon.baseStat()
		.setHp(80)
		.setDef(90)
		.setSpD(90)
		.setSpe(100)
	.pokemon.learnset()
		.addMove('Leaf Storm')
		.addMove('Sappy Seed')
		.addMove('Giga Drain')
		.addMove('Energy Ball')
		.addMove('Acid Spray')
		.addMove('Mist Ball')
		.addMove('Sludge Bomb')
		.addMove('Pollen Puff')
		.addMove('Weather Ball');
		
modifyPokemon('exeggutor')
	.ability()
		.set1('Thick Fat')
		.set0('Sap Sipper')
	.pokemon.baseStat()
		.setHp(105)
		.setDef(90)
		.setSpD(80)
		.setSpe(40)
	.pokemon.learnset()
		// .removeMove('Power Whip')
		.addMove('Weather Ball')
		.addMove('Earth Power');

modifyPokemon('exeggutoralola')
	.ability()
		.set1('Lightning Rod')
		.set0('Ripen')
	.pokemon.baseStat()
		.setAtk(115)
		.setSpe(60)
	.pokemon.learnset()
		.addMove('Weather Ball')
		.addMove('Focus Blast')
		.addMove('Earth Power')
		.addMove('Leaf Blade');
		
modifyPokemon('marowak')
	.ability()
		.set1('Technician')
		.setH('Sand Force')
	.pokemon.baseStat()
		.setHp(75)
		.setSpA(35)
		.setSpe(55)
	.pokemon.learnset()
		.addMove('Head Smash')
		.addMove('Headlong Rush');

modifyPokemon('marowakalola')
	.ability()
		.set1('Technician')
	.pokemon.baseStat()
		.setAtk(95)
		.setDef(95)
		.setSpA(35)
	.pokemon.learnset()
		.addMove('Head Smash')
		.addMove('Headlong Rush');

modifyPokemon('hitmonlee')
	.ability()
		.set0('Leg Day') // New ability
	.pokemon.baseStat()
		.setHp(70)
		.setSpe(60)
	.pokemon.learnset()
		.addMove('Pyro Ball')
		.addMove('Triple Axel');

modifyPokemon('hitmonchan')
	.baseStat()
		.setHp(75)
		.setDef(89)
		.setSpe(70)
	.pokemon.learnset()
		.addMove('Sucker Punch')
		.addMove('Cross Chop');

modifyPokemon('hitmontop')
	.ability()
		.setH('Guts')
	.pokemon.baseStat()
		.setHp(60)
		.setAtk(100)
		.setDef(100)
		.setSpe(80)
	.pokemon.learnset()
		.addMove('U Turn');

modifyPokemon('lickilicky')
	.ability()
		.set1("Unaware");

modifyPokemon('weezing')
	.baseStat()
		.setHp(85)
	.pokemon.learnset()
		.addMove('Energy Ball')
		.addMove('Defog')
		.addMove('Acid Spray')
		.addMove('Recover');

modifyPokemon('weezinggalar')
	.learnset()
		.addMove('Energy Ball')
		.addMove('Draining Kiss');

modifyPokemon('rhyperior')
	.ability()
		.set0('Sap Sipper')
	.pokemon.learnset()
		.addMove('Headlong Rush')
		.addMove('Head Smash');
		
modifyPokemon('chansey')
	.ability()
		.setH('Curious Medicine')
	.pokemon.baseStat()
		.setHp(230)
		.setDef(15)
		.setSpA(55)
		.setSpD(95);
	// .pokemon.learnset()
	// 	.addMove('Revival Blessing');

modifyPokemon('blissey')
	.changeType('Normal', 'Fairy')
	.ability()
		.setH('Curious Medicine')
		.set1('Misty Surge')
	.pokemon.baseStat()
		.setHp(235)
		.setDef(25)
		.setSpA(95)
		.setSpD(120)
	.pokemon.learnset()
		// Chansey already gets Revival Blessing
		.addMove('Energy Ball')
		.addMove('Hypnosis');

modifyPokemon('tangrowth')
	.ability()
		.set0('Tangling Hair')
		.set1('Innards out');

modifyPokemon('kangaskhan')
	.ability()
		.set0('Adaptability')
	.pokemon.learnset()
		.removeMove('Seismic Toss')
		.removeMove('Power up Punch');

modifyPokemon('kangaskhanmega')
	.ability()
		.set0('Sheer Force')
	.pokemon.baseStat()
		.setDef(105)
		.setSpD(105)
		.setSpe(90);

modifyPokemon('kingdra')
	.baseStat()
		.setAtk(85)
		.setSpA(105)
	.pokemon.learnset()
		.addMove('Snipe Shot')
		.addMove('Origin Pulse');

modifyPokemon('seaking')
	.ability()
		.set1('Supreme Overlord')
	.pokemon.baseStat()
		.setAtk(112)
		.setSpe(48)
	.pokemon.learnset()
		.addMove('Aqua Jet')
		.addMove('Crunch')
		.addMove('Horn Leech')
		.addMove('Liquidation');

modifyPokemon('starmie')
	.ability()
		.set0('Mirror Armor');

modifyPokemon('mrmime')
	.ability()
		.setH('Psychic Surge')
	.pokemon.baseStat()
		.setHp(50)
	.pokemon.learnset()
		.addMove('Moonblast')
		.addMove('Misty Explosion');

modifyPokemon('mrmimegalar')
	.ability()
		.set0('Snow Warning')
	.pokemon.learnset()
		.addMove('Toxic')
		.addMove('Teleport');

modifyPokemon('mrrime')
	.ability()
		.set0('Snow Warning')
	.pokemon.baseStat()
		.setAtk(65)
		.setSpe(100)
	.pokemon.learnset()
		.addMove('Toxic')
		.addMove('Teleport');

modifyPokemon('scyther')
	.ability()
		.set1('Adaptability')
		.setH('Sharpness')
	.pokemon.learnset()
		.addMove('Fly')
		.addMove('Kowtow Cleave')
		.addMove('Leaf Blade');

modifyPokemon('scizor')
	.ability()
		.setH('Sharpness')
	.pokemon.learnset()
		.addMove('Fly')
		.addMove('Kowtow Cleave')
		.addMove('Leaf Blade');

modifyPokemon('scizormega');

modifyPokemon('jynx')
	.ability()
		.set1('Dazzling')
	.pokemon.baseStat()
		.setHp(70)
		.setDef(55)
		.setSpe(100)
	.pokemon.learnset()
		.addMove('Psystrike')
		.addMove('Aura Sphere')
		.addMove('Freeze Dry')
		.addMove('Psycho Boost');

modifyPokemon('electivire')
	.changeType('Electric', 'Fighting')
	.ability()
		.setH('Iron Fist')
	.pokemon.baseStat()
		.setAtk(113)
	.pokemon.learnset()
		.addMove('Plasma Fists')
		.addMove('Mach Punch')
		.addMove('Close Combat');

modifyPokemon('magmortar')
	.ability()
		.setH('Mega Launcher')
	.pokemon.baseStat()
		.setSpA(115)
		.setSpe(93)
	.pokemon.learnset()
		.addMove('Magma Storm')
		.addMove('Meteor Beam')
		.addMove('Scald')
		.addMove('Steam Eruption')
		.addMove('Dark Pulse')
		.addMove('Aura Sphere');

modifyPokemon('pinsir')
	.changeType('Bug', 'Ground')
	.learnset()
		.addMove('Megahorn')
		.addMove('U Turn')
		.addMove('First Impression');

modifyPokemon('pinsirmega');

modifyPokemon('tauros')
	.baseStat()
		.setSpA(65)
	.pokemon.learnset()
		.addMove('Play Rough')
		.addMove('Flare Blitz')
		.addMove('Headlong Rush')
		.addMove('Power Gem');

modifyPokemon('gyarados')
	.changeType('Water', 'Dragon')
	.ability()
		.set1('Anger Point')
	.pokemon.learnset()
		.addMove('Flip Turn')
		.addMove('Draco Meteor');

modifyPokemon('gyaradosmega')
	.changeType('Water', 'Dragon');

modifyPokemon('lapras')
	.ability()
		.set1('Drizzle')
		.setH('Rain Dish')
	.pokemon.baseStat()
		.setHp(120)
		.setAtk(75)
		.setDef(95)
		.setSpA(90)
		.setSpD(80)
	.pokemon.learnset()
		.addMove('Scald')
		.addMove('Wish')
		.addMove('Boomburst')
		.addMove('Calm Mind');

modifyPokemon('ditto')
	.ability()
		.set1('Illusion');

modifyPokemon('vaporeon')
	.ability()
		.set1('Rain Dish');

modifyPokemon('jolteon')
	.ability()
		.set1('Electromorphosis')
		.setH('Speed Boost')
	.pokemon.learnset()
		.addMove('Spikes');

modifyPokemon('flareon')
	.ability()
		.set1('Sheer Force')
	.pokemon.baseStat()
		.setHp(110)
		.setDef(95)
		.setSpA(60)
		.setSpD(65)
	.pokemon.learnset()
		.addMove('Sacred Fire')
		.addMove('Stomping Tantrum')
		.addMove('Play Rough')
		.addMove('Bulk Up')
		.addMove('Agility')
		.addMove('Thunder Fang')
		.addMove('Morning Sun');

modifyPokemon('leafeon')
	.ability()
		.set1('Solar Power')
	.pokemon.learnset()
		.addMove('Jump Kick')
		.addMove('Stomping Tantrum')
		.addMove('Leech Seed');

modifyPokemon('glaceon')
	.ability()
		.set1('Snow Warning')
		.setH('Slush Rush');

modifyPokemon('umbreon')
	.ability()
		.set1('Dark Aura')
	.pokemon.learnset()
		.addMove('Knock Off');

modifyPokemon('espeon')
	.ability()
		.set1('Magic Guard')
	.pokemon.learnset()
		.addMove('Teleport');

modifyPokemon('porygon2')
	.changeType('Normal', 'Electric');

modifyPokemon('porygonz')
	.changeType('Normal', 'Electric')
	.baseStat()
		.setDef(75)
		.setSpA(125)
		.setSpD(80)
	.pokemon.learnset()
		.addMove('Expanding Force')
		.addMove('Techno Blast');

modifyPokemon('omastar')
	.ability()
		.setH('Iron Barbs')
	.pokemon.baseStat()
		.setHp(80)
		.setSpD(90)
	.pokemon.learnset()
		.addMove('Power Gem')
		.addMove('Rapid Spin')
		.addMove('Spiky Shield')
		.addMove('Sludge Bomb')
		.addMove('Acid Armor');

modifyPokemon('kabutops')
	.ability()
		.setH('Sharpness')
	.pokemon.baseStat()
		.setHp(70)
		.setAtk(120)
		.setSpD(80)
		.setSpe(85)
	.pokemon.learnset()
		.addMove('Focus Energy')
		.addMove('Leaf Blade')
		.addMove('Aqua Cutter', 9);

modifyPokemon('aerodactyl')
	.ability()
		.set0('Intimidate')
	.pokemon.baseStat()
		.setAtk(115);

modifyPokemon('aerodactylmega')
	.baseStat()
		.setHp(90);

modifyPokemon('snorlax')
	.learnset()
		.addMove('Slack Off')
		.addMove('Stuff Cheeks');

modifyPokemon('articuno')
	.ability()
		.set1('Elemental')
		.setH('Snow Warning')
	.pokemon.baseStat()
		.setHp(100)
		.setAtk(65)
		.setDef(110)
		.setSpA(105)
		.setSpD(140)
		.setSpe(70)
	.pokemon.learnset()
		.addMove('Calm Mind')
		.addMove('Focus Blast')
		.addMove('Glaciate')
		.addMove('Bleakwind Storm', 9);

modifyPokemon('articunogalar')
	.ability()
		.set1('Psychic Surge')
	.pokemon.baseStat()
		.setAtk(70)
		.setSpe(105)
	.pokemon.learnset()
		.addMove('Roost')
		.addMove('Toxic')
		.addMove('Defog')
		.addMove('Esper Wing')
		.addMove('Lumina Crash', 9);

modifyPokemon('zapdos')
	.ability()
		.set1('Elemental')
		.setH('Electric Surge')
	.pokemon.baseStat()
		.setAtk(85)
		.setDef(100)
	.pokemon.learnset()
		.addMove('Bolt Beak')
		.addMove('Fusion Bolt');

modifyPokemon('zapdosgalar')
	.ability()
		.set1('Wind Rider')
	.pokemon.learnset()
		.addMove('Roost')
		.addMove('Defog')
		.addMove('Toxic')
		.addMove('Bolt Beak')
		.addMove('Triple Kick')
		.addMove('Triple Axel')
		.addMove('Axe Kick');

modifyPokemon('moltres')
	.ability()
		.set1('Elemental')
		.setH('Drought')
	.pokemon.baseStat()
		.setDef(105)
	.pokemon.learnset()
		.addMove('Inferno')
		.addMove('Fusion Flare');

modifyPokemon('moltresgalar')
	.ability()
		.set1('Dark Aura')
	.pokemon.learnset()
		.addMove('Roost')
		.addMove('Defog')
		.addMove('Scorching Sands')
		.addMove('Toxic')
		.addMove('Night Daze')
		.addMove('Flamethrower');

modifyPokemon('dragonite');

modifyPokemon('mew')
	.ability()
		.set1('Illusion');

// NO ONE CARES ABOUT MEWTWO!!!!
modifyPokemon('mewtwo');
modifyPokemon('mewtwomegax');
modifyPokemon('mewtwomegay');
}