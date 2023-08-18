import { ModdedDex } from "./../../../../sim/dex";
export default function Gen4 (dex: ModdedDex) {
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
modifyPokemon('torterra')
  .ability()
     .set1('Thick Fat')
  .pokemon.baseStat()
    .setDef(110)
    .setSpD(90)
    .setSpe(61)
  .pokemon.learnset()
    .addMove('Shell Smash')
    .addMove('Close Combat')
    .addMove('Grassy Glide')
    .addMove('Rapid Spin')
    .addMove('Headlong Rush');

modifyPokemon('infernape')
  .ability()
     .set1('Steadfast')
  .pokemon.learnset()
    .addMove('Ice Punch')
    .addMove('Drain Punch')
    .addMove('Sucker Punch');

modifyPokemon('empoleon')
		.ability()
			 .set1('Pressure')
		.pokemon.baseStat()
			.setAtk(91)
			.setSpA(116)
			.setSpD(106)
		.pokemon.learnset()
			.addMove('Roost')
			.addMove('Spikes')
			.addMove('Dual Wingbeat')
			.addMove('Flip Turn')
			.addMove('Ice Spinner')
			.addMove('Ice Shard')
			.addMove('Icicle Crash');

modifyPokemon('staraptor')
  .changeType('Flying', 'Fighting')
  .ability()
     .set1('Guts')
  .pokemon.baseStat()
    .setHp(90)
    .setDef(75)
    .setSpA(40)
    .setSpD(65)
    .setSpe(110)
  .pokemon.learnset()
    .addMove('Counter')
    .addMove('Bulk Up')
    .addMove('Dual Wingbeat')
    .addMove('Flare Blitz')
    .addMove('Facade');

modifyPokemon('bibarel')
  .changeType('Water', 'Grass')
  .ability()
     .set0('Fur Coat')
     .set1('Strong Jaw')
     .setH('Water Compaction')
  .pokemon.baseStat()
    .setDef(70)
    .setSpA(70)
    .setSpD(70)
    .setSpe(81)
  .pokemon.learnset()
    .addMove('Agility')
    .addMove('Wood Hammer')
    .addMove('Ice Fang')
    .addMove('Thunder Fang')
    .addMove('Fire Fang')
    .addMove('Psychic Fang')
    .addMove('Energy Ball')
    .addMove('Stuff Cheeks');

modifyPokemon('kricketune')
  .ability()
     .set1('Punk Rock')
  .pokemon.baseStat()
    .setHp(87)
    .setAtk(65)
    .setDef(61)
    .setSpA(95)
    .setSpD(61)
    .setSpe(85)
  .pokemon.learnset()
    .addMove('Parting Shot')
    .addMove('Feather Dance')
    .addMove('Thunder Wave')
    .addMove('Boomburst')
    .addMove('Leaf Blade')
    .addMove('Toxic Spikes')
    .addMove('Twineedle')
    .addMove('Pin Missle');

modifyPokemon('luxray')
  .changeType('Electric', 'Dark')
  .ability()
     .set0('Strong Jaw')
  .pokemon.baseStat()
    .setSpA(100)
    .setSpe(80)
  .pokemon.learnset()
    .addMove('Close Combat')
    .addMove('Dark Pulse')
    .addMove('Sucker Punch')
    .addMove('Knock Off')
    .addMove('Bulk Up');

modifyPokemon('rampardos')
  .ability()
     .set0('Rock Head')
     .set1('Sand Rush')
  .pokemon.baseStat()
    .setDef(70)
    .setSpD(60)
    .setSpe(68)
  .pokemon.learnset()
    .addMove('Head Smash')
    .addMove('Accelerock');

modifyPokemon('bastiodon')
  .changeType('Ground', 'Steel')
  .ability()
     .set0('Dauntless Shield')
     .set1('Heavy Metal')
  .pokemon.baseStat()
    .setHp(70)
    .setAtk(72)
    .setDef(163)
    .setSpe(35)
  .pokemon.learnset()
    .addMove('Shore Up')
    .addMove('Behemoth Bash')
    .addMove('Body Press')
    .addMove('Heavy Slam');

modifyPokemon('wormadam')
  .ability()
     .set0('Natures Gift')
  .pokemon.baseStat()
    .setHp(65)
    .setAtk(54)
    .setDef(90)
    .setSpA(89)
    .setSpD(110)
    .setSpe(41)
  .pokemon.learnset()
    .addMove('Calm Mind')
    .addMove('Grassy Glide')
    .addMove('Chloroblast')
    .addMove('Strength Sap')
    .addMove('Leech Seed');

modifyPokemon('wormadamtrash')
  .ability()
     .set0('Garbage Disposal')
  .pokemon.baseStat()
    .setHp(80)
    .setDef(105)
    .setSpD(105)
  .pokemon.learnset()
    .addMove('Recover')
    .addMove('Sludge Bomb')
    .addMove('Steel Beam');

modifyPokemon('wormadamsandy')
  .ability()
     .set0('Earth Eater')
  .pokemon.baseStat()
    .setHp(65)
    .setAtk(89)
    .setDef(110)
    .setSpA(49)
    .setSpD(80)
    .setSpe(41)
  .pokemon.learnset()
    .addMove('Shore Up')
    .addMove('Rock Slide')
    .addMove('Leech Life')
    .addMove('Skitter Smack')
    .addMove('Lunge');

modifyPokemon('mothim')
		.ability()
			 .set0('Compound Eyes')
		.pokemon.baseStat()
			.setHp(75)
			.setAtk(104)
			.setSpA(104)
			.setSpe(86)
		.pokemon.learnset()
			.addMove('Hurricane')
			.addMove('Energy Ball')
			.addMove('Earth Power')
			.addMove('Skitter Smack')
			.addMove('Moonblast')
			.addMove('Leech Life');

modifyPokemon('vespiquen')
  .changeType('Bug', 'Fighting')
  .ability()
		 .set0('Honey Gather')
     .set1('Queenly Majesty')
     .setH('Regenerator')
  .pokemon.baseStat()
    .setHp(65)
    .setAtk(85)
    .setSpA(85)
    .setSpe(60)
  .pokemon.learnset()
		.addMove('Leech Life')
    .addMove('Superpower')
    .addMove('Sludge Wave')
    .addMove('Wish')
    .addMove('Agility')
    .addMove('Extreme Speed')
    .addMove('No Retreat')
    .addMove('Focus Blast');

modifyPokemon('pachirisu')
  .ability()
     .set0('Cheek Pouch')
     .set1('Fur Coat')
     .setH('Prankster')
  .pokemon.baseStat()
    .setHp(65)
    .setAtk(55)
    .setSpA(50)
    .setSpD(95)
    .setSpe(100)
  .pokemon.learnset()
    .addMove('Slack Off')
    .addMove('Bullet Seed')
    .addMove('Extreme Speed')
    .addMove('Stuff Cheeks')
    .addMove('Reflect');

modifyPokemon('floatzel')
  .baseStat()
    .setHp(90)
    .setAtk(100)
    .setDef(70)
    .setSpA(55)
    .setSpD(70)
    .setSpe(125)
  .pokemon.learnset()
    .addMove('Surging Strikes')
    .addMove('Flip Turn')
    .addMove('Close Combat')
    .addMove('U Turn')
    .addMove('Iron Head')
    .addMove('Fake Out');

modifyPokemon('cherrim')
  .ability()
     .set1('Chlorophyll')
  .pokemon.baseStat()
    .setDef(75)
    .setSpA(92)
    .setSpe(90)
  .pokemon.learnset()
    .addMove('Grav Apple')
    .addMove('Moonblast');

modifyPokemon('gastrodon')
  .ability()
     .setH('Suction Cups')
  .pokemon.baseStat()
    .setAtk(78)
    .setDef(78)
    .setSpD(92)
  .pokemon.learnset()
    .addMove('Haze')
    .addMove('Calm Mind');

modifyPokemon('drifblim')
  .ability()
     .set1('Perish Body')
  .pokemon.baseStat()
    .setHp(120)
    .setDef(54)
    .setSpA(105)
    .setSpD(74)
    .setSpe(100)
  .pokemon.learnset()
    .addMove('Curse')
    .addMove('Poltergeist')
    .addMove('Nasty Plot')
    .addMove('Hurricane');

modifyPokemon('lopunny')
  .changeType('Fairy', 'Fighting')
  .ability()
     .set0('Fluffy')
     .set1('Pixilate');

modifyPokemon('lopunnymega')
  .changeType('Fairy', 'Fighting')
  .baseStat()
    .setAtk(126)
    .setSpe(125);

modifyPokemon('purugly')
  .ability()
     .set1('Tough Claws')
  .pokemon.baseStat()
    .setHp(81)
    .setAtk(92)
    .setSpA(74)
    .setSpD(69)
    .setSpe(72)
  .pokemon.learnset()
    .addMove('Slack Off')
    .addMove('Earthquake')
    .addMove('Crunch')
    .addMove('Bulk Up');

modifyPokemon('skuntank')
  .ability()
     .setH('Gluttony')
  .pokemon.baseStat()
    .setDef(72)
    .setSpD(71)
    .setSpe(64)
  .pokemon.learnset()
    .addMove('Belly Drum')
    .addMove('Thunderbolt')
    .addMove('Sludge Wave')
    .addMove('Iron Tail')
    .addMove('Scorching Sands');

modifyPokemon('bronzong')
  .baseStat()
    .setDef(121)
    .setSpD(121)
    .setSpe(23)
  .pokemon.learnset()
    .addMove('Recover')
    .addMove('Teleport');

modifyPokemon('chatot')
		.ability()
			 .set0('Scrappy')
			 .set1('Punk Rock')
			 .setH('Aerilate')
		.pokemon.baseStat()
			.setHp(81)
			.setSpA(102)
			.setSpe(101)
		.pokemon.learnset()
			.addMove('Snarl')
			.addMove('Torch Song')
			.addMove('Sparkling Aria')
			.addMove('Relic Song')
			.addMove('Parting Shot');

modifyPokemon('spiritomb')
			.ability()
				 .set1('Cursed Body')
				 .setH('Intimidate')
			.pokemon.baseStat()
				.setHp(60)
				.setAtk(97)
				.setDef(98)
				.setSpA(97)
				.setSpD(98)
				.setSpe(25)
			.pokemon.learnset()
				.addMove('Moonlight');

modifyPokemon('garchomp')
		.ability()
			.set0('Sand Rush')
		.pokemon.baseStat()
			.setSpA(100)
		.pokemon.learnset()
			.addMove('Glare');

modifyPokemon('garchompmega')
		.ability()
			.set0('Sheer Force');

modifyPokemon('lucario')
  .changeType('Fighting', 'Psychic')
  .ability()
     .set0('Iron Fist')
  .pokemon.learnset()
    .addMove('Sucker Punch')
    .addMove('Psyshock')
    .addMove('Psycho Cut');

modifyPokemon('lucariomega')
  .changeType('Fighting', 'Psychic')
  .ability()
     .set0('Unseen Fist')
  .pokemon.baseStat()
    .setAtk(130)
    .setDef(83)
    .setSpD(80)
    .setSpe(107);

modifyPokemon('hippowdon')
  .ability()
     .setH('Sheer Force')
  .pokemon.learnset()
    .addMove('Dive')
    .addMove('Bulk Up');

modifyPokemon('drapion')
  .ability()
     .set0('Defiant')
     .set1('Infiltrator')
     .setH('Intimidate')
  .pokemon.baseStat()
    .setSpD(85)
    .setSpe(99)
  .pokemon.learnset()
    .addMove('Wicked Blow')
    .addMove('Superpower');

modifyPokemon('toxicroak')
		.ability()
			 .set0('Merciless')
			 .set1('Water Absorb')
		.pokemon.baseStat()
			.setAtk(101)
			.setDef(70)
			.setSpA(91)
			.setSpD(70)
			.setSpe(95)
		.pokemon.learnset()
			.addMove('Fell Stinger')
			.addMove('Toxic Spikes')
			.addMove('Hydro Pump')
			.addMove('Whirlpool')
			.addMove('Liquidation')
			.addMove('Aqua Jet')
			.addMove('Flip Turn');

modifyPokemon('carnivine')
  .changeType('Grass', 'Flying')
  .ability()
     .set0('Overgrow')
     .set1('Strong Jaw')
     .setH('Fly Trap')
  .pokemon.baseStat()
    .setDef(92)
    .setSpD(92)
    .setSpe(76)
  .pokemon.learnset()
    .addMove('Air Slash')
    .addMove('Aerial Ace')
    .addMove('Air Cutter')
    .addMove('Acrobatics')
    .addMove('Poison Fang')
    .addMove('Hyper Fang')
    .addMove('Thunder Fang');
		
modifyPokemon('lumineon')
  .changeType('Water', 'Fairy')
  .ability()
     .setH('Emergency Exit')
  .pokemon.baseStat()
    .setAtk(59)
    .setSpA(89)
    .setSpD(91)
    .setSpe(96)
  .pokemon.learnset()
    .addMove('Aqua Jet')
    .addMove('Moonblast')
    .addMove('Flip Turn')
    .addMove('Calm Mind');

modifyPokemon('abomasnow')
  .ability()
     .setH('Grassy Surge')
  .pokemon.baseStat()
    .setAtk(102)
    .setSpA(97)
    .setSpD(90)
    .setSpe(70)
  .pokemon.learnset()
    .addMove('Bulk Up')
    .addMove('Curse')
    .addMove('Stone Edge')
    .addMove('Horn Leech')
    .addMove('Shadow Claw')
    .addMove('Superpower');

modifyPokemon('gallade')
  .ability()
     .set0('Defiant')
  .pokemon.baseStat()
    .setSpe(90)
  .pokemon.learnset()
    .addMove('Play Rough');

modifyPokemon('gallademega')
  .ability()
     .set0('Sharpness')
  .pokemon.baseStat()
    .setAtk(145);

modifyPokemon('froslass')
  .ability()
     .set1('Cursed Body')
     .setH('Technician')
  .pokemon.baseStat()
    .setHp(65)
    .setAtk(90)
    .setDef(65)
    .setSpA(85)
    .setSpD(65)
  .pokemon.learnset()
    .addMove('Shadow Sneak')
    .addMove('Freeze Dry');

modifyPokemon('rotom')
  .ability()
     .setH('Prankster')
  .pokemon.baseStat()
    .setHp(60)
    .setSpe(96)
  .pokemon.learnset()
    .addMove('Topsy Turvy')
    .addMove('Rapid Spin');

modifyPokemon('rotommow')
  .ability()
     .set1('Grassy Surge')
     .setH('Sap Sipper')
  .pokemon.baseStat()
    .setAtk(105)
    .setDef(92)
    .setSpA(65)
    .setSpD(92)
    .setSpe(116)
  .pokemon.learnset()
    .addMove('Crunch')
    .addMove('Roar')
    .addMove('Power Whip')
    .addMove('Bullet Seed')
    .addMove('Grassy Glide')
    .addMove('Leaf Blade')
    .addMove('Petal Blizzard')
    .addMove('Razor Leaf')
    .addMove('Seed Bomb')
    .addMove('Bolt Strike')
    .addMove('Fusion Bolt')
    .addMove('Volt Tackle')
    .addMove('Extreme Speed')
    .addMove('Drill Run')
    .addMove('Explosion')
    .addMove('Lands Wrath');

modifyPokemon('rotomwash')
  .ability()
     .set1('Pressure')
     .setH('Water Absorb')
  .pokemon.baseStat()
    .setHp(75)
    .setAtk(40)
    .setDef(117)
    .setSpA(75)
    .setSpD(117)
    .setSpe(81)
  .pokemon.learnset()
    .addMove('Scald')
    .addMove('Flip Turn')
    .addMove('Whirlpool');

modifyPokemon('rotomheat')
  .ability()
     .set1('Flash Fire')
     .setH('Steam Engine')
  .pokemon.baseStat()
    .setHp(60)
    .setAtk(90)
    .setDef(102)
    .setSpA(65)
    .setSpD(102)
  .pokemon.learnset()
    .addMove('Flame Charge')
    .addMove('Flare Blitz')
    .addMove('Wild Charge')
    .addMove('Volt Tackle');

modifyPokemon('rotomfrost')
  .ability()
     .set1('Refrigerate')
     .setH('Slush Rush')
  .pokemon.baseStat()
    .setHp(60)
    .setAtk(45)
    .setDef(102)
    .setSpA(90)
    .setSpD(102)
  .pokemon.learnset()
    .addMove('Freeze Dry')
    .addMove('Ice Beam')
    .addMove('Glaciate')
    .addMove('Frost Breath')
    .addMove('Snowscape')
    .addMove('Chilly Reception')
    .addMove('Freezy Frost');

modifyPokemon('rotomfan')
  .ability()
     .set0('Volt Absorb')
     .set1('Aerilate')
     .setH('Wind Power')
  .pokemon.baseStat()
    .setDef(92)
    .setSpD(92)
    .setSpe(116)
  .pokemon.learnset()
    .addMove('Aeroblast')
    .addMove('Hurricane')
    .addMove('Rapid Spin')
    .addMove('Tailwind')
    .addMove('Boomburst')
    .addMove('Bleakwind Storm')
    .addMove('Wildbolt Storm')
    .addMove('Whirlwind');

modifyPokemon('uxie')
  .ability()
     .set1('Synchronize')
  .pokemon.baseStat()
    .setSpe(80)
  .pokemon.learnset()
    .addMove('Wish')
    .addMove('Healing Wish')
    .addMove('Chilling Water')
    .addMove('Natures Madness')
    .addMove('Mystical Fire');

modifyPokemon('mesprit')
  .ability()
     .set1('Synchronize')
  .pokemon.baseStat()
    .setSpA(115)
    .setSpe(95)
  .pokemon.learnset()
    .addMove('Aura Sphere')
    .addMove('Chilling Water')
    .addMove('Mist Ball')
    .addMove('Mystical Fire')
    .addMove('Natures Madness');

modifyPokemon('azelf')
  .ability()
     .set1('Synchronize')
  .pokemon.baseStat()
    .setSpA(105)
  .pokemon.learnset()
    .addMove('ands Wrath')
    .addMove('Iron Head')
    .addMove('Chilling Water')
    .addMove('Natures Madness');

modifyPokemon('regigigas')
  .baseStat()
    .setHp(120)
    .setAtk(140)
  .pokemon.learnset()
    .addMove('Lands Wrath');

modifyPokemon('Cresselia')
  .ability()
     .set1('Sweet Veil')
     .setH('Misty Surge')
  .pokemon.baseStat()
    .setSpA(80)
    .setSpe(80)
  .pokemon.learnset()
    .addMove('Focus Blast')
    .addMove('Teleport');

modifyPokemon('manaphy')
  .learnset()
    .addMove('Aqua Jet')
    .addMove('Hydro Pump')
    .addMove('Flip Turn');

modifyPokemon('shaymin')
  .ability()
     .set1('Serene Grace')
  .pokemon.learnset()
    .addMove('Baton Pass');
}