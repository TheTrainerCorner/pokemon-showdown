import { ModdedDex } from "./../../../../sim/dex";
export default function Gen5 (dex: ModdedDex) {
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

modifyPokemon('victini')
		.baseStat()
			.setHp(105)
			.setDef(90)
			.setSpD(90)
			.setSpe(115);

modifyPokemon('serperior')
	.ability()
		.set1('Chlorophyll')
	.pokemon.learnset()
		.addMove('Draco Meteor');

modifyPokemon('emboar')
	.ability()
		.set1('Thick Fat')
	.pokemon.baseStat()
		.setDef(85)
		.setSpD(85)
		.setSpe(80)
	.pokemon.learnset()
		.addMove('Close Combat')
		.addMove('Drain Punch')
		.addMove('Submission');

modifyPokemon('samurott')
	.changeType('Water', 'Fighting')
	.ability()
		.set1('Lightning Rod')
		.setH('Sniper')
	.pokemon.baseStat()
		.setAtk(110)
		.setSpA(118)
		.setSpe(80)
	.pokemon.learnset()
		.addMove('Psycho Cut')
		.addMove('Secret Sword');

modifyPokemon('samurotthisui')
	.baseStat()
		.setAtk(118)
		.setSpe(90)
	.pokemon.learnset()
		.addMove('Psycho Cut');

modifyPokemon('watchog')
	.changeType('Normal', 'Psychic')
	.ability()
		.set0('Frisk')
		.set1('Stakeout')
		.setH('Compound Eyes')
	.pokemon.baseStat()
		.setHp(70)
		.setDef(74)
		.setSpA(85)
		.setSpD(74)
		.setSpe(85)
	.pokemon.learnset()
		.addMove('Psychic');

modifyPokemon('stoutland')
	.changeType('Normal', 'Ground')
	.learnset()
		.addMove('Earthquake')
		.addMove('Swords Dance')
		.addMove('Double Edge')
		.addMove('Body Slam');

modifyPokemon('liepard')
	.ability()
		.set0('Tough Claws')
	.pokemon.baseStat()
		.setAtk(98);

modifyPokemon('simisage')
	.ability()
		.set0('Overgrow')
		.setH('Grassy Surge')
	.pokemon.baseStat()
		.setAtk(118)
		.setDef(85)
		.setSpA(78)
		.setSpe(104)
	.pokemon.learnset()
		.addMove('Close Combat')
		.addMove('Grassy Glide')
		.addMove('Stomping Tantrum')
		.addMove('U Turn')
		.addMove('Pursuit')
		.addMove('Trick')
		.addMove('Boomburst');
	
modifyPokemon('simisear')
	.ability()
		.set0('Blaze')
		.setH('Drought')
	.pokemon.baseStat()
		.setAtk(105)
		.setSpA(105)
		.setSpe(112)
	.pokemon.learnset()
		.addMove('Eruption')
		.addMove('Scorching Sands')
		.addMove('U Turn')
		.addMove('Pursuit')
		.addMove('Trick')
		.addMove('Parting Shot');

modifyPokemon('simipour')
	.ability()
		.set0('Torrent')
		.setH('Drizzle')
	.pokemon.baseStat()
		.setHp(90)
		.setAtk(78)
		.setSpA(118)
		.setSpD(85)
		.setSpe(104)
	.pokemon.learnset()
		.addMove('Water Spout')
		.addMove('Flip Turn')
		.addMove('Pursuit')
		.addMove('Trick')
		.addMove('Freeze Dry')
		.addMove('Glare');

modifyPokemon('mushama')
	.ability()
		.set0('Unaware')
		.set1('Levitate')
		.setH('Misty Surge')
	.pokemon.baseStat()
		.setDef(100)
		.setSpA(110)
	.pokemon.learnset()
		.addMove('Draining Kiss')
		.addMove('Slack Off')
		.addMove('Haze')
		.addMove('Mist Ball')
		.addMove('Lumina Crash');
modifyPokemon('unfezant')
	.changeType('Flying')
	.ability()
		.set0('Rivalry')
		.setH('Gale Wings')
	.pokemon.baseStat()
		.setHp(70)
		.setAtk(100)
		.setSpA(100)
		.setSpe(110)
	.pokemon.learnset()
		.addMove('Superpower')
		.addMove('Flame Charge')
		.addMove('Oblivion Wing');
modifyPokemon('zebstrika')
	.ability()
		.set1('Reckless')
		.setH('Rock Head')
	.pokemon.baseStat()
		.setHp(90)
	.pokemon.learnset()
		.addMove('Head Smash')
		.addMove('Flare Blitz')
		.addMove('Volt Tackle')
		.addMove('Thunderous Kick')
		.addMove('Lash Out')
		.addMove('Rising Voltage')
		.addMove('High Horsepower');
modifyPokemon('gigalith')
	.ability()
		.setH('Solar Power')
	.pokemon.learnset()
		.addMove('Shore Up')
		.addMove('Knock Off')
		.addMove('Diamond Storm');
modifyPokemon('swoobat')
	.ability()
		.set1('Punk Rock')
	.pokemon.learnset()
		.addMove('Boomburst')
		.addMove('Psycho Boost')
		.addMove('Extreme Speed')
		.addMove('Parting Shot');
modifyPokemon('excadrill')
	.learnset()
		.addMove('Precipice Blades');
modifyPokemon('audino')
	.changeType('Fairy')
	.ability()
		.set0('Magic Guard')
		.set1('Klutz')
		.setH('Regenrator')
	.pokemon.baseStat()
		.setSpA(80)
	.pokemon.learnset()
		.addMove('Moonblast')
		.addMove('Recover');
modifyPokemon('audinomega')
	.ability()
		.set0('Serene Grace')
	.pokemon.baseStat()
		.setSpA(90)
		.setSpe(60);
modifyPokemon('conkeldurr')
	.changeType('Fighting', 'Rock')
	.baseStat()
		.setAtk(130)
	.pokemon.learnset()
		.addMove('Accelerock')
		.addMove('Head Smash');
modifyPokemon('seismitoad')
	.ability()
		.set1('Iron Fist')
	.pokemon.baseStat()
		.setHp(125)
		.setDef(85)
		.setSpD(85)
	.pokemon.learnset()
		.addMove('Boomburst')
		.addMove('Thunder Wave')
		.addMove('Dynamic Punch')
		.addMove('Liquidation');
modifyPokemon('sawk')
	.ability()
		.setH('Contrary');
modifyPokemon('throh')
	.ability()
		.set1('Thick Fat')
		.setH('Technician')
	.pokemon.learnset()
		.addMove('Close Combat')
		.addMove('Slack Off')
		.addMove('Drain Punch')
		.addMove('Arm Thrust')
		.addMove('Mach Punch')
		.addMove('Final Gambit');
modifyPokemon('leavanny')
	.ability()
		.set0('Sharpness')
		.setH('Queenly Majesty')
		.pokemon.learnset()
			.addMove('Quiver Dance')
			.addMove('Psycho Cut')
			.addMove('Sacred Sword')
			.addMove('Cross Poison')
			.addMove('First Impression')
			.addMove('UTurn')
			.addMove('Grassy Glide')
			.addMove('Needle Arm')
			.addMove('Horn Leech')
			.addMove('Trop Kick')
			.addMove('Wood Hammer')
			.addMove('Triple Axel')
			.addMove('Air Slash')
			.addMove('Attack Order');
modifyPokemon('scolipede')
	.learnset()
		.addMove('Gunk Shot');
modifyPokemon('whimsicott')
	.ability()
		.set1('Cotton Down')
	.pokemon.learnset()
		.addMove('Trick');
modifyPokemon('lilligant')
	.learnset()
		.addMove('Burning Jealousy')
		.addMove('Weather Ball')
		.addMove('Dazzling Gleam');
modifyPokemon('lilliganthisui')
	.ability()
		.setH('Dancer');
modifyPokemon('basculin')
	.changeType('Water', 'Dark')
	.ability()
		.setH('Strong Jaw')
	.pokemon.learnset()
		.addMove('Bulk Up')
		.addMove('No Retreat');
modifyPokemon('basculegion')
	.ability()
		.setH('Intimidate')
	.pokemon.learnset()
		.addMove('Poltergeist')
		.addMove('Shadow Sneak')
		.removeMove('Last Respects');
modifyPokemon('basculegionf')
	.ability()
		.setH('Perish Body')
	.pokemon.baseStat()
		.setAtk(80)
		.setSpA(112)
	.pokemon.learnset()
		.addMove('Origin Pulse')
		.addMove('Baddy Bad')
		.addMove('Bouncy Bubble')
		.addMove('Freezy Frost');
modifyPokemon('krookodile')
	.baseStat()
		.setAtk(100)
	.pokemon.learnset()
		.addMove('Wicked Blow');
modifyPokemon('darmanitan')
	.learnset()
		.addMove('Thunder Punch')
		.addMove('Rage Fist');
modifyPokemon('darmanitangalar')
	.ability()
		.set1('Sheer Force');
modifyPokemon('maractus')
	.ability()
		.set0('Dancer')
		.set1('Sand Rush')
	.pokemon.baseStat()
		.setHp(80)
		.setDef(72)
		.setSpD(72)
	.pokemon.learnset()
		.addMove('Quiver Dance')
		.addMove('Fiery Dance')
		.addMove('Revelation Dance')
		.addMove('Sappy Seed')
		.addMove('Teeter Dance');
modifyPokemon('crustle')
	.ability()
		.set1('Super Luck')
		.setH('Rough Skin')
	.pokemon.baseStat()
		.setHp(80)
		.setDef(130)
		.setSpD(95)
	.pokemon.learnset()
		.addMove('Shore Up')
		.addMove('Focus Energy')
		.addMove('Lunge')
		.addMove('First Impression')
		.addMove('Attack Order');
modifyPokemon('scrafty')
	.ability()
		.set1('Filter')
	.pokemon.baseStat()
		.setHp(75)
		.setDef(105)
		.setSpD(105);
modifyPokemon('sigilyph')
	.ability()
		.set0('Sand Force')
	.pokemon.learnset()
		.addMove('Scorching Sands')
		.addMove('Photon Geyser')
		.addMove('Power Gem')
		.addMove('Moonblast');
modifyPokemon('Cofagrigus')
	.ability()
		.set1('Cursed Body')
		.setH('Shadow Shield')
	.pokemon.baseStat()
		.setHp(68)
		.setSpe(25);
modifyPokemon('carracosta')
	.ability()
		.set0('Strong Jaw')
		.setH('Analytic')
	.pokemon.baseStat()
		.setHp(84)
		.setAtk(113)
		.setSpD(85)
		.setSpe(37)
	.pokemon.learnset()
		.addMove('Rapid Spin')
		.addMove('Thunder Fang')
		.addMove('Ice Fang')
		.addMove('Fire Fang')
		.addMove('Poison Fang')
		.addMove('Psychic Fang')
		.addMove('Bulk Up')
		.addMove('Leech Life')
		.addMove('Earthquake')
		.addMove('Flip Turn');
modifyPokemon('archeops')
		.ability()
			.set1('Emergency Exit')
			.setH('Early Bird')
		.pokemon.baseStat()
			.setAtk(120)
			.setSpe(95)
modifyPokemon('garbodor')
	.changeType('Poison', 'Ground')
	.ability()
		.set0('Water Absorb')
		.set1('Corrosion')
		.setH('Filter')
	.pokemon.baseStat()
		.setHp(90)
		.setAtk(100)
		.setDef(87)
		.setSpD(87)
	.pokemon.learnset()
		.addMove('Earthquake')
		.addMove('Poison Jab')
		.addMove('Bulk Up');
modifyPokemon('zoroark')
	.changeType('Dark', 'Psychic')
	.ability()
		.set1('Moxie')
		.setH('Dark Aura')
	.pokemon.baseStat()
		.setHp(70)
		.setAtk(120)
		.setSpA(105)
	.pokemon.learnset()
		.addMove('Transform')
		.addMove('Psycho Cut')
		.addMove('Zen Headbutt')
		.addMove('Fire Lash');
modifyPokemon('zoroarkhisui')
	.ability()
		.set1('Dark Aura')
		.setH('Wandering Spirit')
	.pokemon.learnset()
		.addMove('Ice Beam');
modifyPokemon('cinccino')
	.changeType('Normal', 'Fairy')
	.ability()
		.set0('Clean Up')
	.pokemon.baseStat()
		.setHp(85)
		.setAtk(100)
		.setSpD(55)
	.pokemon.learnset()
		.addMove('Tailwind')
		.addMove('Dragon Tail')
		.addMove('Poison Tail')
		.addMove('Snuggle');
}