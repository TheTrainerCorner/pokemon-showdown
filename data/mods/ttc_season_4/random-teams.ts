import { PRNG, Utils, toID } from "../../../sim";
import RandomGen8Teams, { MoveCounter, TeamData } from "../gen8/random-teams";

export interface BattleFactorySpecies {
	flags: {megaOnly?: 1, limEevee?: 1};
	sets: BattleFactorySet[];
};

interface BattleFactorySet {
	species: string;
	item: string;
	ability: string;
	nature: string;
	moves: string[];
	evs?: Partial<StatsTable>;
	ivs?: Partial<StatsTable>;
}

const RecoveryMove = [
	'healorder', 'milkdrink', 'moonlight', 'morningsun', 'recover', 'roost', 'shoreup', 'slackoff', 'softboiled', 'strengthsap', 'synthesis',
	'guidingblessing',
];

const ContraryMoves = [
	'closecombat', 'leafstorm', 'overheat', 'dracometeor', 'superpower', 'vcreate', 'psychoboost',
];

const PhysicalSetup = [
	'bellydrum', 'bulkup', 'coil', 'curse', 'dragondance', 'honeclaws', 'howl', 'poweruppunch', 'swordsdance',
];
const SpecialSetup = [
	'calmmind', 'chargebeam', 'geomancy', 'nastyplot', 'quiverdance', 'tailglow',
];
const MixedSetup = [
	'clangoroussoul', 'growth', 'happyhour', 'holdhands', 'noretreat', 'shellsmash', 'workup',
	'knowledgepath',
];
const SpeedSetup = [
	'agility', 'autotomize', 'flamecharge', 'rockpolish',
];
const NoStab = [
	'accelerock', 'aquajet', 'beakblast', 'bounce', 'breakingswipe', 'chatter', 'clearsmog', 'dragontail', 'eruption', 'explosion',
	'fakeout', 'firstimpression', 'flamecharge', 'flipturn', 'iceshard', 'icywind', 'incinerate', 'machpunch',
	'meteorbeam', 'pluck', 'pursuit', 'quickattack', 'reversal', 'selfdestruct', 'skydrop', 'snarl', 'suckerpunch', 'uturn', 'watershuriken',
	'vacuumwave', 'voltswitch', 'waterspout',
];

const Hazards = [
	'spikes', 'stealthrock', 'stickyweb', 'toxicspikes',
];

function sereneGraceBenefits(move: Move) {
	return move.secondary?.chance && move.secondary.chance > 20 && move.secondary.chance < 100;
}

export class RandomTTCTeams extends RandomGen8Teams {

	constructor(format: Format | string, prng: PRNG | PRNGSeed | null) {
		super(format, prng);
		this.randomData = require('./random-sets.json');
		this.moveEnforcementCheckers['Cosmic'] = (movepool, moves, abilities, types, counter) => !counter.get('Cosmic');
	}

	unrejectableMovesInSingles(move: Move): boolean {
		return (move.category !== 'Status' || !move.flags.heal) && ![
			'facade', 'leechseed', 'lightscreen', 'reflect', 'sleeptalk', 'spore', 'substitute', 'switcheroo',
			'teleport', 'toxic', 'trick'
		].includes(move.id);
	}

	unrejectableMovesInDoubles(move: Move): boolean {
		return move.id !== 'bodypress';
	}

	queryMoves(moves: Set<string> | null, types: string[], abilities: Set<string> = new Set(), movePool: string[] = []): MoveCounter {
		const counter = new MoveCounter();

		if (!moves?.size) return counter;

		const categories = {Physical: 0, Special: 0, Status: 0};

		for (const moveid of moves) {
			let move = this.dex.moves.get(moveid);
			if (move.id === 'naturepower') {
				if (this.gen === 5) move = this.dex.moves.get('earthquake');
			}

			let moveType = move.type;
			if (['judgement', 'multiattack', 'revelationdance'].includes(moveid)) moveType = types[0];
			if (move.damage || move.damageCallback) {
				// for moves that do a set amount of damage (i.e. Sesimic Toss)
				counter.add('damage');
				counter.damagingMoves.add(move);
			} else {
				// Are Physical/Special/Status:
				categories[move.category]++;
			}

			// Moves that have a low base power
			if (['lowkick'].includes(moveid) || (move.basePower && move.basePower <= 60 && !['rapidspin'].includes(moveid))) {
				counter.add('technician');
			}

			// Moves that hit up to 5 times
			if (move.multihit && Array.isArray(move.multihit) && move.multihit[1] === 5) counter.add('skilllink');
			if (move.recoil || move.hasCrashDamage) counter.add('recoil');
			if (move.drain) counter.add('drain');
			// Moves which a base power, but aren't super-weak like rapid spin
			if (move.basePower > 30 || move.multihit || move.basePowerCallback || ['infestation'].includes(moveid)) {
				counter.add(moveType);
				if (types.includes(moveType)) {
					// STAB
					// Certain moves aren't acceptable as a Pokemon's only STAB attack
					if (!this.noStab.includes(moveid) && (!moveid.startsWith('hiddenpower') || types.length === 1)) {
						counter.add('stab');
						// Ties between Physical and Special setup should broken in favor of STABs
						categories[move.category] += 0.1;
					}
				} else if (
					// Less obvious forms of stab
					(moveType === 'Normal' && (['Aerilate', 'Galvanize', 'Pixilate', 'Refrigerate'].some(a => abilities.has(a)))) ||
					(move.priority === 0 && (['Libero', 'Protean'].some(a => abilities.has(a))) && !this.noStab.includes(moveid)) ||
					(moveType === 'Steel' && abilities.has('Steelworker')) || (moveType === 'Ghost' && abilities.has('Haunted Light'))
				) {
					counter.add('stab');
				}

				if (move.flags['bite']) {
					counter.add('strongjaw');
					counter.add('vampire');
				}
				if (move.flags['punch']) counter.add('ironfist');
				if (move.flags['peck']) counter.add('bigpecks');
				if (move.flags['kick']) counter.add('legday');
				if (move.flags['sound']) counter.add('sound');
				if (move.priority !== 0 || (moveid === 'grassyglide' && abilities.has('Grassy Surge'))) {
					counter.add('priority');
				}
				counter.damagingMoves.add(move);
			}

			// Moves with secondary effects
			if (move.secondary) {
				counter.add('sheerforce');
				if (sereneGraceBenefits(move)) {
				counter.add('serenegrace');
				}
			}
			// Moves with low accuracy
			if (move.accuracy && move.accuracy !== true && move.accuracy < 90) counter.add('inaccurate');

			// Moves that change stats
			if (RecoveryMove.includes(moveid)) counter.add('recovery');
			if (ContraryMoves.includes(moveid)) counter.add('contrary');
			if (PhysicalSetup.includes(moveid)) {
				counter.add('physicalsetup');
				counter.setupType = 'Physical';
			} else if (SpecialSetup.includes(moveid)) {
				counter.add('specialsetup');
				counter.setupType = 'Special';
			}

			if (MixedSetup.includes(moveid)) counter.add('mixedsetup');
			if (SpeedSetup.includes(moveid)) counter.add('speedsetup');
			if (Hazards.includes(moveid)) counter.add('hazards');
		}

		// Keep track of the available moves
		for (const moveid of movePool) {
			const move = this.dex.moves.get(moveid);
			if (move.damageCallback) continue;
			if (move.category === 'Physical') counter.add('physicalpool');
			if (move.category === 'Special') counter.add('specialpool');
		}

		// Choose a setup type
		if (counter.get('mixedsetup')) {
			counter.setupType = 'Mixed';
		} else if (counter.get('physicalsetup') && counter.get('specialsetup')) {
			const pool = {
				Physical: categories['Physical'] + counter.get('physicalpool'),
				Special: categories['Special'] + counter.get('specialpool'),
			};

			if (pool.Physical === pool.Special) {
				if (categories['Physical'] > categories['Special']) counter.setupType = 'Physical';
				if (categories['Special'] > categories['Physical']) counter.setupType = 'Special';
			} else {
				counter.setupType = pool.Physical > pool.Special ? 'Physical' : 'Special';
			}
		} else if (counter.setupType === 'Physical') {
			if (
				categories['Physical'] < 2 && (!counter.get('stab') || !counter.get('physicalpool')) &&
				!(moves.has('rest') && moves.has('sleeptalk')) &&
				!moves.has('batonpass')
			) {
				counter.setupType = '';
			}
		} else if (counter.setupType === 'Special') {
			if (
				(categories['Special'] < 2 && (!counter.get('stab') || !counter.get('specialpool'))) &&
				!moves.has('quiverdance') &&
				!(moves.has('rest') && moves.has('sleeptalk')) &&
				!(moves.has('wish') && moves.has('protect')) &&
				!moves.has('batonpass')
			) {
				counter.setupType = '';
			}
		}

		counter.set('Physical', Math.floor(categories['Physical']));
		counter.set('Special', Math.floor(categories['Special']));
		counter.set('Status', categories['Status']);

		return counter;
	}

	shouldCullMove(move: Move, types: Set<string>, moves: Set<string>, abilities: Set<string>, counter: MoveCounter, movePool: string[], teamDetails: RandomTeamsTypes.TeamDetails, species: Species, isLead: boolean, isDoubles: boolean, isNoDynamax: boolean): { cull: boolean; isSetup?: boolean; } {
		if (isDoubles && species.baseStats.def >= 140 && movePool.includes('bodypress')) {
			// In Doubles, Pokémon with Defense stats >= 140 should always have body press
			return {cull: true};
		}
		if (
			(species.id === 'doublade' && movePool.includes('swordsdance')) ||
			(species.id === 'entei' && movePool.includes('extremespeed')) ||
			(species.id === 'genesectdouse' && movePool.includes('technoblast')) ||
			(species.id === 'slaking' && movePool.includes('slackoff')) ||
			(species.id === 'golisopod' && movePool.includes('leechlife') && movePool.includes('firstimpression')) ||
			(species.id === 'meloettacaroler' && movePool.includes('snowtimesong')) ||
			(species.id === 'meowthmega' && movePool.includes('payday')) ||
			(species.id === 'eeveemega' && movePool.includes('cheaterstrick'))
		) {
			// Entei should always have Extreme Speed, and Genesect-Douse should always have Techno Blast
			// Golisopod should always have one of its bug moves (Leech Life or First Impression)
			return {cull: true};
		}

		const hasRestTalk = moves.has('rest') && moves.has('sleeptalk');

		// Reject moves that need support
		switch (move.id) {
		case 'acrobatics': case 'junglehealing':
			// Special case to prevent lead Acrobatics Rillaboom
			return {cull: (species.id.startsWith('rillaboom') && isLead) || (!isDoubles && !counter.setupType)};
		case 'bite':
			return {cull: (abilities.has('Vampire'))};
		case 'blizzard':
			return {cull: species.id === 'castform' && (moves.has('fireblast') || moves.has('hurricane'))};
		case 'dualwingbeat': case 'fly':
			return {cull: !types.has(move.type) && !counter.setupType && !!counter.get('Status')};
		case 'healbell':
			return {cull: movePool.includes('protect') || movePool.includes('wish')};
		case 'fireblast':
			if (species.id === 'castform') return { cull: (moves.has('blizzard') || moves.has('hurricane'))}
			// Special case for Togekiss, which always wants Aura Sphere
			return {cull: abilities.has('Serene Grace') && (!moves.has('trick') || counter.get('Status') > 1)};
		case 'firepunch':
			// Special case for Darmanitan-Zen-Galar, which doesn't always want Fire Punch
			return {cull: movePool.includes('bellydrum') || (moves.has('earthquake') && movePool.includes('substitute'))};
		case 'flamecharge':
			return {cull: movePool.includes('swordsdance')};
		case 'hypervoice':
			// Special case for Heliolisk, which always wants Thunderbolt
			return {cull: types.has('Electric') && movePool.includes('thunderbolt')};
		case 'payback': case 'psychocut':
			// Special case for Type: Null and Malamar, which don't want these + RestTalk
			return {cull: !counter.get('Status') || hasRestTalk};
		case 'rest':
			const bulkySetup = !moves.has('sleeptalk') && ['bulkup', 'calmmind', 'coil', 'curse'].some(m => movePool.includes(m));
			// Registeel would otherwise get Curse sets without Rest, which are very bad generally
			return {cull: species.id !== 'registeel' && (movePool.includes('sleeptalk') || bulkySetup)};
		case 'sleeptalk':
			if (!moves.has('rest')) return {cull: true};
			if (movePool.length > 1 && !abilities.has('Contrary')) {
				const rest = movePool.indexOf('rest');
				if (rest >= 0) this.fastPop(movePool, rest);
			}
			break;
		case 'storedpower':
			return {cull: !counter.setupType};
		case 'switcheroo': case 'trick':
			return {cull: counter.get('Physical') + counter.get('Special') < 3 || moves.has('rapidspin')};
		case 'trickroom':
			const webs = !!teamDetails.stickyWeb;
			return {cull:
				isLead || webs || !!counter.get('speedsetup') ||
				counter.damagingMoves.size < 2 || movePool.includes('nastyplot'),
			};
		case 'zenheadbutt':
			// Special case for Victini, which should prefer Bolt Strike to Zen Headbutt
			return {cull: movePool.includes('boltstrike') || (species.id === 'eiscue' && moves.has('substitute'))};

		// Set up once and only if we have the moves for it
		case 'bellydrum': case 'bulkup': case 'coil': case 'curse': case 'dragondance': case 'honeclaws': case 'swordsdance':
			if (counter.setupType !== 'Physical') return {cull: true}; // if we're not setting up physically this is pointless
			if (counter.get('Physical') + counter.get('physicalpool') < 2 && !hasRestTalk) return {cull: true};

			// First Impression + setup is undesirable in Doubles
			if (isDoubles && moves.has('firstimpression')) return {cull: true};
			if (move.id === 'swordsdance' && moves.has('dragondance')) return {cull: true}; // Dragon Dance is judged as better

			return {cull: false, isSetup: true};
		case 'calmmind': case 'nastyplot':
			if (species.id === 'togekiss') return {cull: false};
			if (counter.setupType !== 'Special') return {cull: true};
			if (
				(counter.get('Special') + counter.get('specialpool')) < 2 &&
				!hasRestTalk &&
				!(moves.has('wish') && moves.has('protect'))
			) return {cull: true};
			if (moves.has('healpulse') || move.id === 'calmmind' && moves.has('trickroom')) return {cull: true};
			return {cull: false, isSetup: true};
		case 'quiverdance':
			return {cull: false, isSetup: true};
		case 'clangoroussoul': case 'shellsmash': case 'workup':
			if (counter.setupType !== 'Mixed') return {cull: true};
			if (counter.damagingMoves.size + counter.get('physicalpool') + counter.get('specialpool') < 2) return {cull: true};
			return {cull: false, isSetup: true};
		case 'agility': case 'autotomize': case 'rockpolish': case 'shiftgear':
			if (counter.damagingMoves.size < 2 || moves.has('rest')) return {cull: true};
			if (movePool.includes('calmmind') || movePool.includes('nastyplot')) return {cull: true};
			return {cull: false, isSetup: !counter.setupType};

		// Bad after setup
		case 'coaching': case 'counter': case 'reversal':
			// Counter: special case for Alakazam, which doesn't want Counter + Nasty Plot
			return {cull: !!counter.setupType};
		case 'bulletpunch': case 'extremespeed': case 'rockblast':
			return {cull: (
				!!counter.get('speedsetup') ||
				(!isDoubles && moves.has('dragondance')) ||
				counter.damagingMoves.size < 2
			)};
		case 'closecombat': case 'flashcannon': case 'pollenpuff':
			const substituteCullCondition = (
				(moves.has('substitute') && !types.has('Fighting')) ||
				(moves.has('toxic') && movePool.includes('substitute'))
			);
			const preferHJKOverCCCullCondition = (
				move.id === 'closecombat' &&
				!counter.setupType &&
				(moves.has('highjumpkick') || movePool.includes('highjumpkick'))
			);
			return {cull: substituteCullCondition || preferHJKOverCCCullCondition};
		case 'defog':
			return {cull: !!counter.setupType || moves.has('healbell') || moves.has('toxicspikes') || !!teamDetails.defog};
		case 'fakeout':
			return {cull: !!counter.setupType || ['protect', 'rapidspin', 'substitute', 'uturn'].some(m => moves.has(m))};
		case 'firstimpression': case 'glare': case 'icywind': case 'tailwind': case 'waterspout':
			return {cull: !!counter.setupType || !!counter.get('speedsetup') || moves.has('rest')};
		case 'healingwish': case 'memento':
			return {cull: !!counter.setupType || !!counter.get('recovery') || moves.has('substitute') || moves.has('uturn')};
		case 'highjumpkick':
			// Special case for Hitmonlee to prevent non-Unburden Curse
			return {cull: moves.has('curse')};
		case 'partingshot':
			return {cull: !!counter.get('speedsetup') || moves.has('bulkup') || moves.has('uturn')};
		case 'protect':
			if (!isDoubles && ((counter.setupType && !moves.has('wish')) || moves.has('rest'))) return {cull: true};
			if (
				!isDoubles &&
				counter.get('Status') < 2 &&
				['Hunger Switch', 'Speed Boost'].every(m => !abilities.has(m))
			) return {cull: true};
			if (movePool.includes('leechseed') || (movePool.includes('toxic') && !moves.has('wish'))) return {cull: true};
			if (isDoubles && (
				['bellydrum', 'fakeout', 'shellsmash', 'spore'].some(m => movePool.includes(m)) ||
				moves.has('tailwind') || moves.has('waterspout') || counter.get('recovery')
			)) return {cull: true};
			return {cull: false};
		case 'rapidspin':
			const setup = ['curse', 'nastyplot', 'shellsmash'].some(m => moves.has(m));
			return {cull: !!teamDetails.rapidSpin || setup || (!!counter.setupType && counter.get('Fighting') >= 2)};
		case 'shadowsneak':
			const sneakIncompatible = ['substitute', 'trickroom', 'dualwingbeat', 'toxic'].some(m => moves.has(m));
			return {cull: hasRestTalk || sneakIncompatible || counter.setupType === 'Special'};
		case 'spikes':
			return {cull: !!counter.setupType || (!!teamDetails.spikes && teamDetails.spikes > 1)};
		case 'stealthrock':
			return {cull:
				!!counter.setupType ||
				!!counter.get('speedsetup') ||
				!!teamDetails.stealthRock ||
				['rest', 'substitute', 'trickroom', 'teleport'].some(m => moves.has(m)) ||
				(species.id === 'palossand' && movePool.includes('shoreup')),
			};
		case 'stickyweb':
			return {cull: counter.setupType === 'Special' || !!teamDetails.stickyWeb};
		case 'taunt':
			return {cull: moves.has('encore') || moves.has('nastyplot') || moves.has('swordsdance')};
		case 'thunderwave': case 'voltswitch':
			const cullInDoubles = isDoubles && (moves.has('electroweb') || moves.has('nuzzle'));
			return {cull: (
				!!counter.setupType ||
				!!counter.get('speedsetup') ||
				moves.has('shiftgear') ||
				moves.has('raindance') ||
				cullInDoubles
			)};
		case 'toxic':
			return {cull: !!counter.setupType || ['sludgewave', 'thunderwave', 'willowisp'].some(m => moves.has(m))};
		case 'toxicspikes':
			return {cull: !!counter.setupType || !!teamDetails.toxicSpikes};
		case 'uturn':
			const bugSwordsDanceCase = types.has('Bug') && counter.get('recovery') && moves.has('swordsdance');
			return {cull: (
				!!counter.get('speedsetup') ||
				(counter.setupType && !bugSwordsDanceCase) ||
				(isDoubles && moves.has('leechlife')) ||
				moves.has('shiftgear')
			)};

		/**
		 * Ineffective to have both moves together
		 *
		 * These are sorted in order of:
		 * Normal>Fire>Water>Electric>Grass>Ice>Fighting>Poison>Ground>Flying>Psychic>Bug>Rock>Ghost>Dragon>Dark>Fairy
		 * and then subsorted alphabetically.
		 * This type order is arbitrary and referenced from https://pokemondb.net/type.
		 */
		case 'explosion':
			// Rock Blast: Special case for Gigalith to prevent Stone Edge-less Choice Band sets
			const otherMoves = ['curse', 'stompingtantrum', 'rockblast', 'painsplit', 'wish'].some(m => moves.has(m));
			return {cull: !!counter.get('speedsetup') || !!counter.get('recovery') || otherMoves};
		case 'facade':
			// Special case for Snorlax
			return {cull: movePool.includes('doubleedge')};
		case 'quickattack':
			// Diggersby wants U-turn on Choiced sets
			const diggersbyCull = counter.get('Physical') > 3 && movePool.includes('uturn');
			return {cull: !!counter.get('speedsetup') || (types.has('Rock') && !!counter.get('Status')) || diggersbyCull};
		case 'blazekick':
			return {cull: species.id === 'genesect' && counter.get('Special') >= 1};
		case 'blueflare':
			return {cull: moves.has('vcreate')};
		case 'firefang': case 'flamethrower':
			// Fire Fang: Special case for Garchomp, which doesn't want Fire Fang w/o Swords Dance
			const otherFireMoves = ['heatwave', 'overheat'].some(m => moves.has(m));
			return {cull: (moves.has('fireblast') && counter.setupType !== 'Physical') || otherFireMoves};
		case 'flareblitz':
			// Special case for Solgaleo to prevent Flame Charge + Flare Blitz
			return {cull: species.id === 'solgaleo' && moves.has('flamecharge')};
		case 'overheat':
			return {cull: moves.has('flareblitz') || (isDoubles && moves.has('calmmind'))};
		case 'aquatail': case 'flipturn':
			return {cull: moves.has('aquajet') || !!counter.get('Status')};
		case 'hydropump':
			return {cull: moves.has('scald') && (
				(counter.get('Special') < 4 && !moves.has('uturn')) ||
				(species.types.length > 1 && counter.get('stab') < 3)
			)};
		case 'muddywater':
			return {cull: moves.has('liquidation')};
		case 'scald':
			// Special case for Clawitzer
			return {cull: moves.has('waterpulse')};
		case 'thunderbolt':
			// Special case for Goodra, which only wants one move to hit Water-types
			return {cull: moves.has('powerwhip')};
		case 'energyball':
			// Special case to prevent Shiinotic with four Grass moves and no Moonblast
			return {cull: species.id === 'shiinotic' && !moves.has('moonblast')};
		case 'gigadrain':
			// Celebi always wants Leaf Storm on its more pivoting-focused non-Nasty Plot sets
			const celebiPreferLeafStorm = species.id === 'celebi' && !counter.setupType && moves.has('uturn');
			return {cull: celebiPreferLeafStorm || (types.has('Poison') && !counter.get('Poison'))};
		case 'leafblade':
			// Special case for Virizion to prevent Leaf Blade on Assault Vest sets
			return {cull: (moves.has('leafstorm') || movePool.includes('leafstorm')) && counter.setupType !== 'Physical'};
		case 'leafstorm':
			const leafBladePossible = movePool.includes('leafblade') || moves.has('leafblade');
			return {cull:
				// Virizion should always prefer Leaf Blade to Leaf Storm on Physical sets
				(counter.setupType === 'Physical' && (species.id === 'virizion' || leafBladePossible)) ||
				(moves.has('gigadrain') && !!counter.get('Status')) ||
				(isDoubles && moves.has('energyball')),
			};
		case 'powerwhip':
			// Special case for Centiskorch, which doesn't want Assault Vest
			return {cull: moves.has('leechlife')};
		case 'woodhammer':
			return {cull: moves.has('hornleech') && counter.get('Physical') < 4};
		case 'cut':
			const betterGrassMove = (
				(moves.has('solarbeam')) ||
				(moves.has('grassknot'))
			);
			return {cull: betterGrassMove };
		case 'freezedry':
			const betterIceMove = (
				(moves.has('blizzard') && !!counter.setupType) ||
				(moves.has('icebeam') && counter.get('Special') < 4)
			);
			const preferThunderWave = movePool.includes('thunderwave') && types.has('Electric');
			return {cull: betterIceMove || preferThunderWave || movePool.includes('bodyslam')};
		case 'bodypress':
			// Turtonator never wants Earthquake + Body Press, and wants EQ+Smash or Press+No Smash
			const turtonatorPressCull = species.id === 'turtonator' && moves.has('earthquake') && movePool.includes('shellsmash');
			const pressIncompatible = ['shellsmash', 'mirrorcoat', 'whirlwind'].some(m => moves.has(m));
			return {cull: turtonatorPressCull || pressIncompatible || counter.setupType === 'Special'};
		case 'circlethrow':
			// Part of a special case for Throh to pick one specific Fighting move depending on its set
			return {cull: moves.has('stormthrow') && !moves.has('rest')};
		case 'drainpunch':
			return {cull: moves.has('closecombat') || (!types.has('Fighting') && movePool.includes('swordsdance'))};
		case 'dynamicpunch': case 'thunderouskick':
			// Dynamic Punch: Special case for Machamp to better split Guts and No Guard sets
			return {cull: moves.has('closecombat') || moves.has('facade')};
		case 'focusblast':
			// Special cases for Blastoise and Regice; Blastoise wants Shell Smash, and Regice wants Thunderbolt
			return {cull: movePool.includes('shellsmash') || hasRestTalk};
		case 'hammerarm':
			// Special case for Kangaskhan, which always wants Sucker Punch
			return {cull: moves.has('fakeout')};
		case 'stormthrow':
			// Part of a special case for Throh to pick one specific Fighting move depending on its set
			return {cull: hasRestTalk};
		case 'superpower':
			return {
				cull: moves.has('hydropump') ||
					(counter.get('Physical') >= 4 && movePool.includes('uturn')) ||
					(moves.has('substitute') && !abilities.has('Contrary')),
				isSetup: abilities.has('Contrary'),
			};
		case 'poisonjab':
			return {cull: !types.has('Poison') && counter.get('Status') >= 2};
		case 'earthquake':
			const doublesCull = moves.has('earthpower') || moves.has('highhorsepower');
			// Turtonator wants Body Press when it doesn't have Shell Smash
			const turtQuakeCull = species.id === 'turtonator' && movePool.includes('bodypress') && movePool.includes('shellsmash');
			const subToxicPossible = moves.has('substitute') && movePool.includes('toxic');
			return {cull: turtQuakeCull || (isDoubles && doublesCull) || subToxicPossible || moves.has('bonemerang')};
		case 'scorchingsands':
			// Special cases for Ninetales and Palossand; prevents status redundancy
			return {cull: (
				moves.has('willowisp') ||
				moves.has('earthpower') ||
				(moves.has('toxic') && movePool.includes('earthpower'))
			)};
		case 'airslash':
			return {cull:
				(species.id === 'naganadel' && moves.has('nastyplot')) ||
				hasRestTalk ||
				(abilities.has('Simple') && !!counter.get('recovery')) ||
				counter.setupType === 'Physical',
			};
		case 'bravebird':
			// Special case for Mew, which only wants Brave Bird with Swords Dance
			return {cull: moves.has('dragondance')};
		case 'hurricane':
			if (species.id === 'castform') return {cull: (moves.has('blizzard') || moves.has('fireblast'))};
			return {cull: counter.setupType === 'Physical'};
		case 'futuresight':
			return {cull: moves.has('psyshock') || moves.has('trick') || movePool.includes('teleport')};
		case 'photongeyser':
			// Special case for Necrozma-DM, which always wants Dragon Dance
			return {cull: moves.has('morningsun')};
		case 'psychic':
			const alcremieCase = species.id === 'alcremiegmax' && counter.get('Status') < 2;
			return {cull: alcremieCase || (moves.has('psyshock') && (!!counter.setupType || isDoubles))};
		case 'psychicfangs':
			// Special case for Morpeko, which doesn't want 4 attacks Leftovers
			return {cull: moves.has('rapidspin')};
		case 'psyshock':
			// Special case for Sylveon which only wants Psyshock if it gets a Choice item
			const sylveonCase = abilities.has('Pixilate') && counter.get('Special') < 4;
			return {cull: moves.has('psychic') || (!counter.setupType && sylveonCase) || (isDoubles && moves.has('psychic'))};
		case 'bugbuzz':
			return {cull: moves.has('uturn') && !counter.setupType};
		case 'leechlife':
			return {cull:
				(isDoubles && moves.has('lunge')) ||
				(moves.has('uturn') && !counter.setupType) ||
				movePool.includes('spikes'),
			};
		case 'stoneedge':
			const gutsCullCondition = abilities.has('Guts') && (!moves.has('dynamicpunch') || moves.has('spikes'));
			const rockSlidePlusStatusPossible = counter.get('Status') && movePool.includes('rockslide');
			const otherRockMove = moves.has('rockblast') || moves.has('rockslide');
			const lucarioCull = species.id === 'lucario' && !!counter.setupType;
			return {cull: gutsCullCondition || (!isDoubles && rockSlidePlusStatusPossible) || otherRockMove || lucarioCull};
		case 'poltergeist':
			// Special case for Dhelmise in Doubles, which doesn't want both
			return {cull: moves.has('knockoff')};
		case 'shadowball':
			return {cull:
				(isDoubles && moves.has('phantomforce')) ||
				// Special case for Sylveon, which never wants Shadow Ball as its only coverage move
				(abilities.has('Pixilate') && (!!counter.setupType || counter.get('Status') > 1)) ||
				(!types.has('Ghost') && movePool.includes('focusblast')),
			};
		case 'shadowclaw':
			return {cull: types.has('Steel') && moves.has('shadowsneak') && counter.get('Physical') < 4};
		case 'dragonpulse': case 'spacialrend':
			return {cull: moves.has('dracometeor') && counter.get('Special') < 4};
		case 'darkpulse':
			const pulseIncompatible = ['foulplay', 'knockoff'].some(m => moves.has(m)) || (
				species.id === 'shiftry' && (moves.has('defog') || moves.has('suckerpunch'))
			);
			// Special clause to prevent bugged Shiftry sets with Sucker Punch + Nasty Plot
			const shiftryCase = movePool.includes('nastyplot') && !moves.has('defog');
			return {cull: pulseIncompatible && !shiftryCase && counter.setupType !== 'Special'};
		case 'suckerpunch':
			return {cull:
				// Shiftry in No Dynamax would otherwise get Choice Scarf Sucker Punch sometimes.
				(isNoDynamax && species.id === 'shiftry' && moves.has('defog')) ||
				moves.has('rest') ||
				counter.damagingMoves.size < 2 ||
				(counter.setupType === 'Special') ||
				(counter.get('Dark') > 1 && !types.has('Dark')),
			};
		case 'dazzlinggleam':
			return {cull: ['fleurcannon', 'moonblast', 'petaldance'].some(m => moves.has(m))};

		// Status:
		case 'bodyslam': case 'clearsmog':
			const toxicCullCondition = moves.has('toxic') && !types.has('Normal');
			return {cull: moves.has('sludgebomb') || moves.has('trick') || movePool.includes('recover') || toxicCullCondition};
		case 'haze':
			// Special case for Corsola-Galar, which always wants Will-O-Wisp
			return {cull: !teamDetails.stealthRock && (moves.has('stealthrock') || movePool.includes('stealthrock'))};
		case 'hypnosis':
			// Special case for Xurkitree to properly split Blunder Policy and Choice item sets
			return {cull: moves.has('voltswitch')};
		case 'willowisp': case 'yawn':
			// Swords Dance is a special case for Rapidash
			return {cull: moves.has('thunderwave') || moves.has('toxic') || moves.has('swordsdance')};
		case 'painsplit': case 'recover': case 'synthesis':
			return {cull: moves.has('rest') || moves.has('wish') || (move.id === 'synthesis' && moves.has('gigadrain'))};
		case 'roost':
			return {cull:
				moves.has('throatchop') ||
				// Hawlucha doesn't want Roost + 3 attacks
				(moves.has('stoneedge') && species.id === 'hawlucha') ||
				// Special cases for Salamence, Dynaless Dragonite, and Scizor to help prevent sets with poor coverage or no setup.
				(moves.has('dualwingbeat') && (moves.has('outrage') || species.id === 'scizor')),
			};
		case 'reflect': case 'lightscreen':
			return {cull: !!teamDetails.screens};
		case 'slackoff':
			// Special case to prevent Scaldless Slowking
			return {cull: species.id === 'slowking' && !moves.has('scald')};
		case 'substitute':
			const moveBasedCull = ['bulkup', 'nastyplot', 'painsplit', 'roost', 'swordsdance'].some(m => movePool.includes(m));
			// Smaller formes of Gourgeist in Doubles don't want Poltergeist as their only attack
			const doublesGourgeist = isDoubles && movePool.includes('powerwhip');
			// Calyrex wants Substitute + Leech Seed not Calm Mind + Leech Seed
			const calmMindCullCondition = !counter.get('recovery') && movePool.includes('calmmind') && species.id !== 'calyrex';
			// Eiscue wants to always have Liquidation and Belly Drum
			const eiscue = species.id === 'eiscue' && moves.has('zenheadbutt');
			return {cull: moves.has('rest') || moveBasedCull || doublesGourgeist || calmMindCullCondition || eiscue};
		case 'helpinghand':
			// Special case for Shuckle in Doubles, which doesn't want sets with no method to harm foes
			return {cull: moves.has('acupressure')};
		case 'wideguard':
			return {cull: moves.has('protect')};
		case 'grassknot':
			// Special case for Raichu and Heliolisk
			return {cull: moves.has('surf')};
		case 'icepunch':
			// Special case for Marshadow
			return {cull: moves.has('rocktomb')};
		case 'leechseed':
			// Special case for Calyrex to prevent Leech Seed + Calm Mind
			return {cull: !!counter.setupType};
		}

		return {cull: false};
	}

	shouldCullAbility(ability: string, types: Set<string>, moves: Set<string>, abilities: Set<string>, counter: MoveCounter, movePool: string[], teamDetails: RandomTeamsTypes.TeamDetails, species: Species, isDoubles: boolean, preferredType: string, role: RandomTeamsTypes.Role, isNoDynamax: boolean): boolean {
		if ([
			'Flare Boost', 'Hydration', 'Ice Body', 'Immunity', 'Innards Out', 'Insomnia', 'Misty Surge', 'Moody',
			'Perish Body', 'Quick Feet', 'Rain Dish', 'Snow Cloak', 'Steadfast', 'Steam Engine',
		].includes(ability)) return true;

		switch (ability) {
		case 'Chilling Neigh': // should deny access to chilling neigh if there is a way to setup snow already.
			return (!(moves.has('snowscape') || teamDetails.snow));
		// Abilities which are primarily useful for certain moves
		case 'Contrary': case 'Serene Grace': case 'Skill Link': case 'Strong Jaw':
			return !counter.get(toID(ability));
		case 'Analytic':
			return (moves.has('rapidspin') || species.nfe || isDoubles);
		case 'Blaze':
			return (isDoubles && abilities.has('Solar Power')) || (!isDoubles && !isNoDynamax && species.id === 'charizard');
		case 'Big Pecks':
			return (counter.get('bigpecks') < 2);
		// case 'Bulletproof': case 'Overcoat':
		// 	return !!counter.setupType;
		case 'Chlorophyll':
			return (species.baseStats.spe > 100 || !counter.get('Fire') && !moves.has('sunnyday') && !teamDetails.sun);
		case 'Cloud Nine':
			return (!isNoDynamax || species.id !== 'golduck');
		case 'Competitive':
			return (counter.get('Special') < 2 || (moves.has('rest') && moves.has('sleeptalk')));
		case 'Compound Eyes': case 'No Guard':
			return !counter.get('inaccurate');
		case "Costar": // Should deny access to Costar if the pokemon has a form of self-boosting it's offensive stats.
			return !(counter.get('physicalsetup') || counter.get('specialsetup') || counter.get('mixedsetup'));
		case "Curious Medicine":
			return !counter.get('recovery');
		case 'Cursed Body':
			return abilities.has('Infiltrator');
		case 'Damp':
			return moves.has('soak');
		case 'Defiant':
			return !counter.get('Physical');
		case 'Download':
			return (counter.damagingMoves.size < 3 || moves.has('trick'));
		case 'Early Bird':
			return !(counter.get('priority')) || moves.has('bravebird');
		case 'Flash Fire':
			return (this.dex.getEffectiveness('Fire', species) < -1 || abilities.has('Drought'));
		case 'Gluttony':
			return !moves.has('bellydrum');
		case 'Guts':
			return (!moves.has('facade') && !moves.has('sleeptalk') && !species.nfe);
		case 'Harvest':
			return (abilities.has('Frisk') && !isDoubles);
		case 'Hospitality':
			return !counter.get('recovery');
		case 'Hustle': case 'Inner Focus':
			return ((species.id !== 'glalie' && counter.get('Physical') < 2) || abilities.has('Iron Fist'));
		case 'Infiltrator':
			return (moves.has('rest') && moves.has('sleeptalk')) || (isDoubles && abilities.has('Clear Body'));
		case 'Intimidate':
			if (species.id === 'salamence' && moves.has('dragondance')) return true;
			return ['bodyslam', 'bounce', 'tripleaxel'].some(m => moves.has(m));
		case 'Iron Fist':
			return (counter.get('ironfist') < 2 || moves.has('dynamicpunch'));
		case 'Justified':
			return (isDoubles && abilities.has('Inner Focus'));
		case 'Leg Day':
			return (counter.get('legday') < 2 || moves.has('highjumpkick'));
		case 'Lightning Rod':
			return (species.types.includes('Ground') || (!isNoDynamax && counter.setupType === 'Physical'));
		case 'Limber':
			return species.types.includes('Electric') || moves.has('facade');
		case 'Liquid Voice':
			return !moves.has('hypervoice');
		case 'Magic Guard':
			// For Sigilyph
			return (abilities.has('Tinted Lens') && !counter.get('Status') && !isDoubles);
		case 'Mold Breaker':
			return (
				abilities.has('Adaptability') || abilities.has('Scrappy') || (abilities.has('Unburden') && !!counter.setupType) ||
				(abilities.has('Sheer Force') && !!counter.get('sheerforce'))
			);
		case 'Moxie':
			return (counter.get('Physical') < 2 || moves.has('stealthrock') || moves.has('defog'));
		case 'Overgrow':
			return !counter.get('Grass');
		case 'Own Tempo':
			return !moves.has('petaldance');
		case 'Power Construct':
			return (species.forme === '10%' && !isDoubles);
		case 'Prankster':
			return !counter.get('Status');
		case 'Pressure':
			return (!!counter.setupType || counter.get('Status') < 2 || isDoubles);
		case 'Refrigerate':
			return !counter.get('Normal');
		case 'Regenerator':
			// For Reuniclus
			return abilities.has('Magic Guard');
		case 'Reckless':
			return !counter.get('recoil') || moves.has('curse');
		case 'Rock Head':
			return !counter.get('recoil');
		case 'Sand Force': case 'Sand Veil':
			return !teamDetails.sand;
		case 'Sand Rush':
			return (!teamDetails.sand && (isNoDynamax || !counter.setupType || !counter.get('Rock') || moves.has('rapidspin')));
		case 'Sap Sipper':
			// For Drampa, which wants Berserk with Roost
			return moves.has('roost');
		case 'Scrappy':
			return (moves.has('earthquake') && species.id === 'miltank');
		case 'Screen Cleaner':
			return !!teamDetails.screens;
		case 'Shed Skin':
			// For Scrafty
			return moves.has('dragondance');
		case 'Sheer Force':
			return (!counter.get('sheerforce') || abilities.has('Guts') || (species.id === 'druddigon' && !isDoubles));
		case 'Shell Armor':
			return (species.id === 'omastar' && (moves.has('spikes') || moves.has('stealthrock')));
		case 'Slush Rush':
			return (!teamDetails.hail && !abilities.has('Swift Swim'));
		case 'Sniper':
			// Inteleon wants Torrent unless it is Gmax
			return (species.name === 'Inteleon' || (counter.get('Water') > 1 && !moves.has('focusenergy')));
		case 'Solar Power':
			return (!teamDetails.sun);
		case 'Surge Surfer':
			return (moves.has('electricterrain') || abilities.has('Electric Surge'));
		case 'Speed Boost':
			return (isNoDynamax && species.id === 'ninjask');
		case 'Steely Spirit':
			return (moves.has('fakeout') && !isDoubles);
		case 'Sturdy':
			return (moves.has('bulkup') || !!counter.get('recoil') || (!isNoDynamax && abilities.has('Solid Rock')));
		case 'Swarm':
			return (!counter.get('Bug') || !!counter.get('recovery'));
		case 'Sweet Veil':
			return types.has('Grass');
		case 'Swift Swim':
			if (isNoDynamax) {
				const neverWantsSwim = !moves.has('raindance') && [
					'Intimidate', 'Rock Head', 'Water Absorb',
				].some(m => abilities.has(m));
				const noSwimIfNoRain = !moves.has('raindance') && [
					'Cloud Nine', 'Lightning Rod', 'Intimidate', 'Rock Head', 'Sturdy', 'Water Absorb', 'Weak Armor',
				].some(m => abilities.has(m));
				return teamDetails.rain ? neverWantsSwim : noSwimIfNoRain;
			}
			return (!moves.has('raindance') && (
				['Intimidate', 'Rock Head', 'Slush Rush', 'Water Absorb'].some(abil => abilities.has(abil)) ||
				(abilities.has('Lightning Rod') && !counter.setupType)
			));
		case 'Synchronize':
			return counter.get('Status') < 3;
		case 'Technician':
			return (
				!counter.get('technician') ||
				moves.has('tailslap') ||
				abilities.has('Punk Rock') ||
				// For Doubles Alolan Persian
				movePool.includes('snarl')
			);
		case 'Tinted Lens':
			return (
				// For Sigilyph
				moves.has('defog') ||
				// For Butterfree
				(moves.has('hurricane') && abilities.has('Compound Eyes')) ||
				(counter.get('Status') > 2 && !counter.setupType)
			);
		case 'Torrent':
			// For Inteleon-Gmax and Primarina
			return (moves.has('focusenergy') || moves.has('hypervoice'));
		case 'Tough Claws':
			// For Perrserker
			return (types.has('Steel') && !moves.has('fakeout'));
		case 'Unaware':
			// For Swoobat and Clefable
			return (!!counter.setupType || moves.has('fireblast'));
		case 'Unburden':
			return (abilities.has('Prankster') || !counter.setupType && !isDoubles);
		case 'Volt Absorb':
			return (this.dex.getEffectiveness('Electric', species) < -1);
		case 'Water Absorb':
			return (
				moves.has('raindance') ||
				['Drizzle', 'Strong Jaw', 'Unaware', 'Volt Absorb'].some(abil => abilities.has(abil))
			);
		case 'Weak Armor':
			// The Speed less than 50 case is intended for Cursola, but could apply to any slow Pokémon.
			return (
				(!isNoDynamax && species.baseStats.spe > 50) ||
				species.id === 'skarmory' ||
				moves.has('shellsmash') || moves.has('rapidspin')
			);
		}

		return false;
	}
	
	getAbility(types: Set<string>, moves: Set<string>, abilities: Set<string>, counter: MoveCounter, movePool: string[], teamDetails: RandomTeamsTypes.TeamDetails, species: Species, isDoubles: boolean, preferredType: string, role: RandomTeamsTypes.Role, isNoDynamax: boolean): string {
		const abilityData = Array.from(abilities).map(a => this.dex.abilities.get(a));
		Utils.sortBy(abilityData, abil => -abil.rating);

		if (abilityData.length <= 1) return abilityData[0].name;

		// Hard-code abilities here

		// Lopunny, and other Facade users, don't want Limber, even if other abilities are poorly rated,
		// since paralysis would arguably be good for them.
		if (abilities.has('Truant') && (moves.has('recover') || moves.has('slackoff') || moves.has('shoreup'))) return 'Truant';
		if (species.id === 'kecleon') return 'Color Change';
		if (species.id === 'lopunny' && moves.has('facade')) return 'Cute Charm';
		if (species.id === 'copperajahgmax') return 'Heavy Metal';
		if (abilities.has('Guts') &&
			// for Ursaring in BDSP
			!abilities.has('Quick Feet') && (
			species.id === 'gurdurr' || species.id === 'throh' ||
			moves.has('facade') || (moves.has('rest') && moves.has('sleeptalk'))
		)) return 'Guts';
		if (abilities.has('Moxie') && (counter.get('Physical') > 3 || moves.has('bounce')) && !isDoubles) return 'Moxie';

		if (isDoubles) {
			if (abilities.has('Competitive') && !abilities.has('Shadow Tag') && !abilities.has('Strong Jaw')) return 'Competitive';
			if (abilities.has('Friend Guard')) return 'Friend Guard';
			if (abilities.has('Gluttony') && moves.has('recycle')) return 'Gluttony';
			if (abilities.has('Guts')) return 'Guts';
			if (abilities.has('Harvest')) return 'Harvest';
			if (abilities.has('Healer') && (
				abilities.has('Natural Cure') ||
				(abilities.has('Aroma Veil') && this.randomChance(1, 2))
			)) return 'Healer';
			if (abilities.has('Intimidate')) return 'Intimidate';
			if (species.id === 'lopunny') return 'Klutz';
			if (abilities.has('Magic Guard') && !abilities.has('Unaware')) return 'Magic Guard';
			if (abilities.has('Ripen')) return 'Ripen';
			if (abilities.has('Stalwart')) return 'Stalwart';
			if (abilities.has('Storm Drain')) return 'Storm Drain';
			if (abilities.has('Telepathy') && (abilities.has('Pressure') || abilities.has('Analytic'))) return 'Telepathy';
		}

		let abilityAllowed: Ability[] = [];
		// Obtain a list of abilities that are allowed (not culled)
		for (const ability of abilityData) {
			if (ability.rating >= 1 && !this.shouldCullAbility(
				ability.name, types, moves, abilities, counter, movePool, teamDetails, species, isDoubles, '', '', isNoDynamax
			)) {
				abilityAllowed.push(ability);
			}
		}

		// If all abilities are rejected, re-allow all abilities
		if (!abilityAllowed.length) {
			for (const ability of abilityData) {
				if (ability.rating > 0) abilityAllowed.push(ability);
			}
			if (!abilityAllowed.length) abilityAllowed = abilityData;
		}

		if (abilityAllowed.length === 1) return abilityAllowed[0].name;
		// Sort abilities by rating with an element of randomness
		// All three abilities can be chosen
		if (abilityAllowed[2] && abilityAllowed[0].rating - 0.5 <= abilityAllowed[2].rating) {
			if (abilityAllowed[1].rating <= abilityAllowed[2].rating) {
				if (this.randomChance(1, 2)) [abilityAllowed[1], abilityAllowed[2]] = [abilityAllowed[2], abilityAllowed[1]];
			} else {
				if (this.randomChance(1, 3)) [abilityAllowed[1], abilityAllowed[2]] = [abilityAllowed[2], abilityAllowed[1]];
			}
			if (abilityAllowed[0].rating <= abilityAllowed[1].rating) {
				if (this.randomChance(2, 3)) [abilityAllowed[0], abilityAllowed[1]] = [abilityAllowed[1], abilityAllowed[0]];
			} else {
				if (this.randomChance(1, 2)) [abilityAllowed[0], abilityAllowed[1]] = [abilityAllowed[1], abilityAllowed[0]];
			}
		} else {
			// Third ability cannot be chosen
			if (abilityAllowed[0].rating <= abilityAllowed[1].rating) {
				if (this.randomChance(1, 2)) [abilityAllowed[0], abilityAllowed[1]] = [abilityAllowed[1], abilityAllowed[0]];
			} else if (abilityAllowed[0].rating - 0.5 <= abilityAllowed[1].rating) {
				if (this.randomChance(1, 3)) [abilityAllowed[0], abilityAllowed[1]] = [abilityAllowed[1], abilityAllowed[0]];
			}
		}

		// After sorting, choose the first ability
		return abilityAllowed[0].name;

	}

	getHighPriorityItem(ability: string, types: Set<string>, moves: Set<string>, counter: MoveCounter, teamDetails: RandomTeamsTypes.TeamDetails, species: Species, isLead: boolean, isDoubles: boolean): string | undefined {
		// not undefined — we want "no item" not "go find a different item"
		if (moves.has('acrobatics') && ability !== 'Ripen') return ability === 'Grassy Surge' ? 'Grassy Seed' : '';
		if (species.id === 'castform' && moves.has('blizzard')) return 'Icy Rock';
		if (species.id === 'castform' && moves.has('hurricane')) return 'Damp Rock';
		if (species.id === 'castform' && moves.has('fireblast')) return 'Heat Rock';
		if (moves.has('geomancy') || moves.has('meteorbeam')) return 'Power Herb';
		if (moves.has('shellsmash')) {
			if (ability === 'Sturdy' && !isLead && !isDoubles) return 'Heavy-Duty Boots';
			// Shell Smash + Solid Rock is intended for Carracosta, but I think
			// any Pokémon which can take a SE hit via Solid Rock deserves to have
			// its Shell Smash considered a good enough speed setup move for WP.
			if (ability === 'Solid Rock') return 'Weakness Policy';
			return 'White Herb';
		}
		// Techno Blast should always be Water-type
		if (moves.has('technoblast')) return 'Douse Drive';
		// Species-specific logic
		if (
			['Corsola', 'Garchomp', 'Tangrowth'].includes(species.name) &&
			counter.get('Status') &&
			!counter.setupType &&
			!isDoubles
		) return 'Rocky Helmet';

		if (species.name === 'Eternatus' && counter.get('Status') < 2) return 'Metronome';
		if (species.name === 'Farfetch\u2019d') return 'Leek';
		if (species.name === 'Froslass' && !isDoubles) return 'Wide Lens';
		if (species.name === 'Latios' && counter.get('Special') === 2 && !isDoubles) return 'Soul Dew';
		if (species.name === 'Lopunny') return isDoubles ? 'Iron Ball' : 'Toxic Orb';
		if (species.baseSpecies === 'Marowak') return 'Thick Club';
		if (species.baseSpecies === 'Pikachu') return 'Light Ball';
		if (species.name === 'Regieleki' && !isDoubles) return 'Magnet';
		if (species.name === 'Shedinja') {
			const noSash = !teamDetails.defog && !teamDetails.rapidSpin && !isDoubles;
			return noSash ? 'Heavy-Duty Boots' : 'Focus Sash';
		}
		if (species.name === 'Shuckle' && moves.has('stickyweb')) return 'Mental Herb';
		if (species.name === 'Unfezant' || moves.has('focusenergy')) return 'Scope Lens';
		if (species.name === 'Pincurchin') return 'Shuca Berry';
		if (species.name === 'Wobbuffet' && moves.has('destinybond')) return 'Custap Berry';
		if (species.name === 'Scyther' && counter.damagingMoves.size > 3) return 'Choice Band';
		if (species.name === 'Cinccino' && !moves.has('uturn')) return 'Life Orb';
		if (moves.has('bellydrum') && moves.has('substitute')) return 'Salac Berry';

		// Misc item generation logic
		const HDBBetterThanEviolite = (
			!isDoubles &&
			(!isLead || moves.has('uturn')) &&
			this.dex.getEffectiveness('Rock', species) >= 2
		);
		if (species.nfe) return HDBBetterThanEviolite ? 'Heavy-Duty Boots' : 'Eviolite';

		// Ability based logic and miscellaneous logic
		if (species.name === 'Wobbuffet' || ['Cheek Pouch', 'Harvest', 'Ripen'].includes(ability)) return 'Sitrus Berry';
		if (ability === 'Gluttony') return this.sample(['Aguav', 'Figy', 'Iapapa', 'Mago', 'Wiki']) + ' Berry';
		if (
			ability === 'Imposter' ||
			(ability === 'Magnet Pull' && moves.has('bodypress') && !isDoubles)
		) return 'Choice Scarf';
		if (
			ability === 'Guts' &&
			(counter.get('Physical') > 2 || isDoubles)
		) {
			return types.has('Fire') ? 'Toxic Orb' : 'Flame Orb';
		}
		if (ability === 'Magic Guard' && counter.damagingMoves.size > 1) {
			return moves.has('counter') ? 'Focus Sash' : 'Life Orb';
		}
		if (ability === 'Sheer Force' && counter.get('sheerforce')) return 'Life Orb';
		if (ability === 'Unburden') return (moves.has('closecombat') || moves.has('curse')) ? 'White Herb' : 'Sitrus Berry';
		if (ability === 'Ball Fetch') return 'Life Orb';
		if (moves.has('trick') || (moves.has('switcheroo') && !isDoubles) || ability === 'Gorilla Tactics') {
			if (species.baseStats.spe >= 60 && species.baseStats.spe <= 108 && !counter.get('priority') && ability !== 'Triage') {
				return 'Choice Scarf';
			} else {
				return (counter.get('Physical') > counter.get('Special')) ? 'Choice Band' : 'Choice Specs';
			}
		}
		if (moves.has('auroraveil') || moves.has('lightscreen') && moves.has('reflect')) return 'Light Clay';
		if (moves.has('rest') && !moves.has('sleeptalk') && ability !== 'Shed Skin') return 'Chesto Berry';
		if (moves.has('hypnosis') && ability === 'Beast Boost') return 'Blunder Policy';
		if (moves.has('bellydrum')) return 'Sitrus Berry';

		if (this.dex.getEffectiveness('Rock', species) >= 2 && !isDoubles) {
			return 'Heavy-Duty Boots';
		}
	}

	getMediumPriorityItem(ability: string, moves: Set<string>, counter: MoveCounter, species: Species, isLead: boolean, isDoubles: boolean, isNoDynamax: boolean): string | undefined {
		const defensiveStatTotal = species.baseStats.hp + species.baseStats.def + species.baseStats.spd;

		// Choice items
		if (
			!isDoubles && counter.get('Physical') >= 4 && ability !== 'Serene Grace' &&
			['fakeout', 'flamecharge', 'rapidspin'].every(m => !moves.has(m))
		) {
			const scarfReqs = (
				(species.baseStats.atk >= 100 || ability === 'Huge Power') &&
				species.baseStats.spe >= 60 && species.baseStats.spe <= 108 &&
				ability !== 'Speed Boost' && !counter.get('priority') &&
				(isNoDynamax || ['bounce', 'dualwingbeat'].every(m => !moves.has(m)))
			);
			return (scarfReqs && this.randomChance(2, 3)) ? 'Choice Scarf' : 'Choice Band';
		}
		if (!isDoubles && (
			(counter.get('Special') >= 4 && !moves.has('futuresight')) ||
			(counter.get('Special') >= 3 && ['flipturn', 'partingshot', 'uturn'].some(m => moves.has(m)))
		)) {
			const scarfReqs = (
				species.baseStats.spa >= 100 &&
				species.baseStats.spe >= 60 && species.baseStats.spe <= 108 &&
				ability !== 'Tinted Lens' && !counter.get('Physical')
			);
			return (scarfReqs && this.randomChance(2, 3)) ? 'Choice Scarf' : 'Choice Specs';
		}
		if (
			!isDoubles &&
			counter.get('Physical') >= 3 &&
			!moves.has('rapidspin') &&
			['copycat', 'memento', 'partingshot'].some(m => moves.has(m))
		) return 'Choice Band';
		if (
			!isDoubles &&
			((counter.get('Physical') >= 3 && moves.has('defog')) || (counter.get('Special') >= 3 && moves.has('healingwish'))) &&
			!counter.get('priority') && !moves.has('uturn')
		) return 'Choice Scarf';

		// Palkia sometimes wants Choice items instead
		if (species.name === 'Palkia') return 'Lustrous Orb';

		// Other items
		if (
			moves.has('raindance') || moves.has('sunnyday') ||
			(ability === 'Speed Boost' && !counter.get('hazards')) ||
			(ability === 'Stance Change' && counter.damagingMoves.size >= 3)
		) return 'Life Orb';
		if (
			!isDoubles &&
			this.dex.getEffectiveness('Rock', species) >= 1 && (
				['Defeatist', 'Emergency Exit', 'Multiscale'].includes(ability) ||
				['courtchange', 'defog', 'rapidspin'].some(m => moves.has(m))
			)
		) return 'Heavy-Duty Boots';
		if (species.name === 'Necrozma-Dusk-Mane' || (
			this.dex.getEffectiveness('Ground', species) < 2 &&
			counter.get('speedsetup') &&
			counter.damagingMoves.size >= 3 &&
			defensiveStatTotal >= 300
		)) return 'Weakness Policy';
		if (counter.damagingMoves.size >= 4 && defensiveStatTotal >= 235) return 'Assault Vest';
		if (
			['clearsmog', 'curse', 'haze', 'healbell', 'protect', 'sleeptalk', 'strangesteam'].some(m => moves.has(m)) &&
			!isDoubles
		) return 'Leftovers';
	}

	getLowPriorityItem(ability: string, types: Set<string>, moves: Set<string>, abilities: Set<string>, counter: MoveCounter, teamDetails: RandomTeamsTypes.TeamDetails, species: Species, isLead: boolean, isDoubles: boolean, isNoDynamax: boolean): string | undefined {
		const defensiveStatTotal = species.baseStats.hp + species.baseStats.def + species.baseStats.spd;

		if (
			isLead && !isDoubles &&
			!['Disguise', 'Sturdy'].includes(ability) && !moves.has('substitute') &&
			!counter.get('drain') && !counter.get('recoil') && !counter.get('recovery') &&
			((defensiveStatTotal <= 250 && counter.get('hazards')) || defensiveStatTotal <= 210)
		) return 'Focus Sash';
		if (
			moves.has('clangoroussoul') ||
			// We manually check for speed-boosting moves, rather than using `counter.get('speedsetup')`,
			// because we want to check for ANY speed boosting move.
			// In particular, Shift Gear + Boomburst Toxtricity should get Throat Spray.
			(moves.has('boomburst') && Array.from(moves).some(m => Dex.moves.get(m).boosts?.spe))
		) return 'Throat Spray';

		const rockWeaknessCase = (
			this.dex.getEffectiveness('Rock', species) >= 1 &&
			(!teamDetails.defog || ability === 'Intimidate' || moves.has('uturn') || moves.has('voltswitch'))
		);
		const spinnerCase = (moves.has('rapidspin') && (ability === 'Regenerator' || !!counter.get('recovery')));
		if (!isDoubles && (rockWeaknessCase || spinnerCase)) return 'Heavy-Duty Boots';

		if (
			!isDoubles && this.dex.getEffectiveness('Ground', species) >= 2 && !types.has('Poison') &&
			ability !== 'Levitate' && !abilities.has('Iron Barbs')
		) return 'Air Balloon';
		if (
			!isDoubles &&
			counter.damagingMoves.size >= 3 &&
			!counter.get('damage') &&
			ability !== 'Sturdy' &&
			(species.baseStats.spe >= 90 || !moves.has('voltswitch')) &&
			['foulplay', 'rapidspin', 'substitute', 'uturn'].every(m => !moves.has(m)) && (
				counter.get('speedsetup') ||
				// No Dynamax Buzzwole doesn't want Life Orb with Bulk Up + 3 attacks
				(counter.get('drain') && (!isNoDynamax || species.id !== 'buzzwole' || moves.has('roost'))) ||
				moves.has('trickroom') || moves.has('psystrike') ||
				(species.baseStats.spe > 40 && defensiveStatTotal < 275)
			)
		) return 'Life Orb';
		if (
			!isDoubles &&
			counter.damagingMoves.size >= 4 &&
			!counter.get('Dragon') &&
			!counter.get('Normal')
		) {
			return 'Expert Belt';
		}
		if (
			!isDoubles &&
			!moves.has('substitute') &&
			(moves.has('dragondance') || moves.has('swordsdance')) &&
			(moves.has('outrage') || (
				['Bug', 'Fire', 'Ground', 'Normal', 'Poison'].every(type => !types.has(type)) &&
				!['Pastel Veil', 'Storm Drain'].includes(ability)
			))
		) return 'Lum Berry';
	}

	getLevel(species: Species, isDoubles: boolean, isNoDynamax: boolean): number {
		const data = this.randomData[species.id];
		// level set by rules
		if (this.adjustLevel) return this.adjustLevel;
		// doubles levelling
		if (isDoubles && data.doublesLevel) return data.doublesLevel;
		
		if (isNoDynamax) {
			const tier = species.name.endsWith('-Gmax') ? this.dex.species.get(species.changesFrom).tier : species.tier;
			const tierScale: Partial<Record<Species['tier'], number>> = {
				Uber: 76,
				OU: 80,
				UUBL: 81,
				UU: 82,
				RUBL: 83,
				RU: 84,
				NUBL: 85,
				NU: 86,
				PUBL: 87,
				PU: 88, "(PU)": 88, NFE: 88,
			};

			const customScale: {[k: string]: number} = {
				// These Pokemon are too strong and need a lower level
				zaciancrowned: 65, calyrexshadow: 68, xerneas: 70, necrozmaduskman: 72, zacian: 72, kyogre: 73, eternatus: 73,
				zekrom: 74, marshadow: 75, urshifurapidstrike: 79, haxorus: 80, inteleon: 80,
				cresselia: 83, jolteon: 84, swoobat: 84, dugtrio: 84, slurpuff: 84, polteageist: 84,
				wobbuffet: 86, scrafty: 86,
				// These Pokemon are too weak and need a higher level
				delibird: 100, vespiquen: 96, pikachu: 92, shedinja: 92, solrock: 90, arctozolt: 88, reuniclus: 87,
				decidueye: 87, noivern: 85, magnezone: 82, slowking: 81,
			};

			return customScale[species.id] || tierScale[tier] || 80;
		}

		// Arbitrary leveling base on data files (typically winrate-influenced)
		if (data.level) return data.level;
		return 80;
	}

	getForme(species: Species): string {
		if (typeof species.battleOnly === 'string') {
			return species.battleOnly;
		}
		if (species.cosmeticFormes) return this.sample([species.name].concat(species.cosmeticFormes));
		if (species.name.endsWith('-Gmax')) return species.name.slice(0, -5);

		if (['Magearna', 'Poltegeist', 'Zarude'].includes(species.baseSpecies)) {
			return this.sample([species.name].concat(species.otherFormes!));
		}
		if(species.baseSpecies === 'Basculin') return 'Basculin' + this.sample(['', '-Blue-Striped']);
		if (species.baseSpecies === 'Keldeo' && this.gen <= 7) return 'Keldeo' + this.sample(['', '-Resolute']);
		if (species.baseSpecies === 'Pikachu' && this.dex.currentMod === 'gen8') {
			return 'Pikachu' + this.sample(
				['', '-Original', '-Hoenn', '-Sinnoh', '-Unova', '-Kalos', '-Alola', '-Partner', '-World']
			);
		}
		return species.name;
	}

	randomSet(species: string | Species, teamDetails: RandomTeamsTypes.TeamDetails, isLead: boolean, isDoubles: boolean, isNoDynamax?: boolean): RandomTeamsTypes.RandomSet {
		species = this.dex.species.get(species);
		const forme = this.getForme(species);
		const gmax = species.name.endsWith('-Gmax');

		const data = this.randomData[species.id];

		const randMoves =
			(isDoubles && data.doublesMoves) ||
			(isNoDynamax && data.noDynamaxMoves) ||
			data.moves;
		const movePool: string[] = [...(randMoves || this.dex.species.getMovePool(species.id))];

		const rejectedPool = [];
		let ability = '';
		let item = undefined;

		const evs = {hp: 85, atk: 85, def: 85, spa: 85, spd: 85, spe: 85};
		const ivs = {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31};

		const types = new Set(species.types);
		const abilitiesSet = new Set(Object.values((species.battleOnly || species.isMega) ? this.dex.species.get(species.baseSpecies).abilities : species.abilities));
		if (species.unreleasedHidden) abilitiesSet.delete(species.abilities.H);
		const abilities = new Set(abilitiesSet);

		const moves = new Set<string>();
		let counter: MoveCounter;
		// This is just for BDSP Unown;
		// it can be removed from this file if BDSP gets its own random-teams file in the future.
		let hasHiddenPower = false;

		do {
			// Choose next 4 moves from learnset/viable moves and add them to moves list:
			const pool = (movePool.length ? movePool : rejectedPool);
			while (moves.size < this.maxMoveCount && pool.length) {
				const moveid = this.sampleNoReplace(pool);
				if (moveid.startsWith('hiddenpower')) {
					if (hasHiddenPower) continue;
					hasHiddenPower = true;
				}
				moves.add(moveid);
			}

			counter = this.queryMoves(moves, species.types, abilities, movePool);
			const runEnforcementChecker = (checkerName: string) => {
				if (!this.moveEnforcementCheckers[checkerName]) return false;
				return this.moveEnforcementCheckers[checkerName](
					movePool, moves, abilities, types, counter, species as Species, teamDetails
				);
			};

			// Iterate through the moves again, this time to cull them:
			for (const moveid of moves) {
				const move = this.dex.moves.get(moveid);
				let {cull, isSetup} = this.shouldCullMove(
					move, types, moves, abilities, counter,
					movePool, teamDetails, species, isLead, isDoubles, isNoDynamax!
				);

				if (move.id !== 'photongeyser' && (
					(move.category === 'Physical' && counter.setupType === 'Special') ||
					(move.category === 'Special' && counter.setupType === 'Physical')
				)) {
					// Reject STABs last in case the setup type changes later on
					const stabs = counter.get(species.types[0]) + (species.types[1] ? counter.get(species.types[1]) : 0);
					if (!types.has(move.type) || stabs > 1 || counter.get(move.category) < 2) cull = true;
				}

				// Pokemon should have moves that benefit their types, stats, or ability
				const isLowBP = move.basePower && move.basePower < 50;

				// Genesect-Douse should never reject Techno Blast
				const moveIsRejectable = (
					!(species.id === 'genesectdouse' && move.id === 'technoblast') &&
					!(species.id === 'togekiss' && move.id === 'nastyplot') &&
					!(species.id === 'shuckle' && ['stealthrock', 'stickyweb'].includes(move.id)) && (
						move.category === 'Status' ||
						(!types.has(move.type) && move.id !== 'judgment') ||
						(isLowBP && !move.multihit && !abilities.has('Technician'))
					)
				);
				// Setup-supported moves should only be rejected under specific circumstances
				const notImportantSetup = (
					!counter.setupType ||
					counter.setupType === 'Mixed' ||
					(counter.get(counter.setupType) + counter.get('Status') > 3 && !counter.get('hazards')) ||
					(move.category !== counter.setupType && move.category !== 'Status')
				);

				if (moveIsRejectable && (
					!cull && !isSetup && !move.weather && !move.stallingMove && notImportantSetup && !move.damage &&
					(isDoubles ? this.unrejectableMovesInDoubles(move) : this.unrejectableMovesInSingles(move))
				)) {
					// There may be more important moves that this Pokemon needs
					if (
						// Pokemon should have at least one STAB move
						(!counter.get('stab') && counter.get('physicalpool') + counter.get('specialpool') > 0 && move.id !== 'stickyweb') ||
						// Swords Dance Mew should have Brave Bird
						(moves.has('swordsdance') && species.id === 'mew' && runEnforcementChecker('Flying')) ||
						// Dhelmise should have Anchor Shot
						(abilities.has('Steelworker') && runEnforcementChecker('Steel')) ||
						// Octolure should have Shadow Ball
						(abilities.has('Haunted Light') && runEnforcementChecker('Ghost')) ||
						// Check for miscellaneous important moves
						(!isDoubles && runEnforcementChecker('recovery') && move.id !== 'stickyweb') ||
						runEnforcementChecker('screens') ||
						runEnforcementChecker('misc') ||
						((isLead || species.id === 'shuckle') && runEnforcementChecker('lead')) ||
						(moves.has('leechseed') && runEnforcementChecker('leechseed'))
					) {
						cull = true;
					// Pokemon should have moves that benefit their typing
					// Don't cull Sticky Web in type-based enforcement, and make sure Azumarill always has Aqua Jet
					} else if (move.id !== 'stickyweb' && !(species.id === 'azumarill' && move.id === 'aquajet')) {
						for (const type of types) {
							if (runEnforcementChecker(type)) {
								cull = true;
							}
						}
					}
				}

				// Sleep Talk shouldn't be selected without Rest
				if (move.id === 'rest' && cull) {
					const sleeptalk = movePool.indexOf('sleeptalk');
					if (sleeptalk >= 0) {
						if (movePool.length < 2) {
							cull = false;
						} else {
							this.fastPop(movePool, sleeptalk);
						}
					}
				}

				// Remove rejected moves from the move list
				if (cull && movePool.length) {
					if (moveid.startsWith('hiddenpower')) hasHiddenPower = false;
					if (move.category !== 'Status' && !move.damage) rejectedPool.push(moveid);
					moves.delete(moveid);
					break;
				}
				if (cull && rejectedPool.length) {
					if (moveid.startsWith('hiddenpower')) hasHiddenPower = false;
					moves.delete(moveid);
					break;
				}
			}
		} while (moves.size < this.maxMoveCount && (movePool.length || rejectedPool.length));

		// for BD/SP only
		if (hasHiddenPower) {
			let hpType;
			for (const move of moves) {
				if (move.startsWith('hiddenpower')) hpType = move.substr(11);
			}
			if (!hpType) throw new Error(`hasHiddenPower is true, but no Hidden Power move was found.`);
			const HPivs = this.dex.types.get(hpType).HPivs;
			let iv: StatID;
			for (iv in HPivs) {
				ivs[iv] = HPivs[iv]!;
			}
		}

		ability = this.getAbility(types, moves, abilities, counter, movePool, teamDetails, species,
			 isDoubles, '', '', isNoDynamax!);

		if (species.requiredItems) {
			item = this.sample(species.requiredItems);
		// First, the extra high-priority items
		} else {
			item = this.getHighPriorityItem(ability, types, moves, counter, teamDetails, species, isLead, isDoubles);
			if (item === undefined && isDoubles) {
				item = this.getDoublesItem(ability, types, moves, abilities, counter, teamDetails, species);
			}
			if (item === undefined) {
				item = this.getMediumPriorityItem(ability, moves, counter, species, isLead, isDoubles, isNoDynamax!);
			}
			if (item === undefined) {
				item = this.getLowPriorityItem(
					ability, types, moves, abilities, counter, teamDetails, species, isLead, isDoubles, isNoDynamax!
				);
			}

			// fallback
			if (item === undefined) item = isDoubles ? 'Sitrus Berry' : 'Leftovers';
		}

		// For Trick / Switcheroo
		if (item === 'Leftovers' && types.has('Poison')) {
			item = 'Black Sludge';
		}

		const level: number = this.getLevel(species, isDoubles, isNoDynamax!);

		// Prepare optimal HP
		const srImmunity = ability === 'Magic Guard' || item === 'Heavy-Duty Boots';
		const srWeakness = srImmunity ? 0 : this.dex.getEffectiveness('Rock', species);
		while (evs.hp > 1) {
			const hp = Math.floor(Math.floor(2 * species.baseStats.hp + ivs.hp + Math.floor(evs.hp / 4) + 100) * level / 100 + 10);
			const multipleOfFourNecessary = (moves.has('substitute') && !['Leftovers', 'Black Sludge'].includes(item) && (
				item === 'Sitrus Berry' ||
				item === 'Salac Berry' ||
				ability === 'Power Construct'
			));
			if (multipleOfFourNecessary) {
				// Two Substitutes should activate Sitrus Berry
				if (hp % 4 === 0) break;
			} else if (moves.has('bellydrum') && (item === 'Sitrus Berry' || ability === 'Gluttony')) {
				// Belly Drum should activate Sitrus Berry
				if (hp % 2 === 0) break;
			} else if (moves.has('substitute') && moves.has('reversal')) {
				// Reversal users should be able to use four Substitutes
				if (hp % 4 > 0) break;
			} else {
				// Maximize number of Stealth Rock switch-ins
				if (srWeakness <= 0 || hp % (4 / srWeakness) > 0) break;
			}
			evs.hp -= 4;
		}

		if (moves.has('shellsidearm') && item === 'Choice Specs') evs.atk -= 8;

		// Minimize confusion damage
		const noAttackStatMoves = [...moves].every(m => {
			const move = this.dex.moves.get(m);
			if (move.damageCallback || move.damage) return true;
			return move.category !== 'Physical' || move.id === 'bodypress';
		});
		if (noAttackStatMoves && !moves.has('transform') && (!moves.has('shellsidearm') || !counter.get('Status'))) {
			evs.atk = 0;
			ivs.atk = 0;
		}

		// Ensure Nihilego's Beast Boost gives it Special Attack boosts instead of Special Defense
		if (forme === 'Nihilego') evs.spd -= 32;

		if (moves.has('gyroball') || moves.has('trickroom')) {
			evs.spe = 0;
			ivs.spe = 0;
		}

		return {
			name: species.baseSpecies,
			species: forme,
			gender: species.gender,
			shiny: this.randomChance(1, 1024),
			gigantamax: gmax,
			level,
			moves: Array.from(moves),
			ability,
			evs,
			ivs,
			item,
		};
	}

	randomTeam(): RandomTeamsTypes.RandomSet[] {
		this.enforceNoDirectCustomBanlistChanges();

		const seed = this.prng.seed;
		const ruleTable = this.dex.formats.getRuleTable(this.format);
		const pokemon: RandomTeamsTypes.RandomSet[] = [];

		// For Monotype
		const isMonotype = !!this.forceMonotype || ruleTable.has('sametypeclause');
		const isDoubles = this.format.gameType !== 'singles';
		const typePool = this.dex.types.names();
		const type = this.forceMonotype || this.sample(typePool);

		// PotD stuff
		const usePotD = global.Config && Config.potd && ruleTable.has('potd');
		const potd = usePotD ? this.dex.species.get(Config.potd) : null;

		const baseFormes: {[k: string]: number} = {};

		const typeCount: {[k: string]: number} = {};
		const typeComboCount: {[k: string]: number} = {};
		const typeWeaknesses: {[k: string]: number} = {};
		const typeDoubleWeaknesses: {[k: string]: number} = {};
		const teamDetails: RandomTeamsTypes.TeamDetails = {};
		let numMaxLevelPokemon = 0;

		const pokemonList = [];
		for (const poke of Object.keys(this.randomData)) {
			if (isDoubles && this.randomData[poke]?.doublesMoves || !isDoubles && this.randomData[poke]?.moves) {
				pokemonList.push(poke);
			}
		}
		const [pokemonPool, baseSpeciesPool] = this.getPokemonPool(type, pokemon, isMonotype, pokemonList);
		while (baseSpeciesPool.length && pokemon.length < this.maxTeamSize) {
			const baseSpecies = this.sampleNoReplace(baseSpeciesPool);
			const currentSpeciesPool: Species[] = [];
			for (const poke of pokemonPool) {
				const species = this.dex.species.get(poke);
				if (species.baseSpecies === baseSpecies)currentSpeciesPool.push(species);
			}
			// let species = this.dex.species.get(this.sample(pokemonPool[baseSpecies]));
			let species = this.sample(currentSpeciesPool);
			if (!species.exists) continue;

			// Limit to one of each species (Species Clause)
			if (baseFormes[species.baseSpecies]) continue;

			// Illusion shouldn't be on the last slot
			if (species.name === 'Zoroark' && pokemon.length >= (this.maxTeamSize - 1)) continue;
			// The sixth slot should not be Zacian/Zamazenta/Eternatus if Zoroark is present,
			// as they make dynamax malfunction, regardless of level
			if (
				pokemon.some(pkmn => pkmn.name === 'Zoroark') &&
				pokemon.length >= (this.maxTeamSize - 1) &&
				['Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Eternatus'].includes(species.name)
			) {
				continue;
			}

			const types = species.types;
			const typeCombo = types.slice().sort().join();
			const weakToFreezeDry = (
				this.dex.getEffectiveness('Ice', species) > 0 ||
				(this.dex.getEffectiveness('Ice', species) > -2 && types.includes('Water'))
			);
			// Dynamically scale limits for different team sizes. The default and minimum value is 1.
			const limitFactor = Math.round(this.maxTeamSize / 6) || 1;

			if (!isMonotype && !this.forceMonotype) {
				let skip = false;

				// Limit two of any type
				for (const typeName of types) {
					if (typeCount[typeName] >= 2 * limitFactor) {
						skip = true;
						break;
					}
				}
				if (skip) continue;

				// Limit three weak to any type, and one double weak to any type
				for (const typeName of this.dex.types.names()) {
					// it's weak to the type
					if (this.dex.getEffectiveness(typeName, species) > 0) {
						if (!typeWeaknesses[typeName]) typeWeaknesses[typeName] = 0;
						if (typeWeaknesses[typeName] >= 3 * limitFactor) {
							skip = true;
							break;
						}
					}
					if (this.dex.getEffectiveness(typeName, species) > 1) {
						if (!typeDoubleWeaknesses[typeName]) typeDoubleWeaknesses[typeName] = 0;
						if (typeDoubleWeaknesses[typeName] >= 1 * limitFactor) {
							skip = true;
							break;
						}
					}
				}
				if (skip) continue;

				// Count Dry Skin/Fluffy as Fire weaknesses
				if (
					this.dex.getEffectiveness('Fire', species) === 0 &&
					Object.values(species.abilities).filter(a => ['Dry Skin', 'Fluffy'].includes(a)).length
				) {
					if (!typeWeaknesses['Fire']) typeWeaknesses['Fire'] = 0;
					if (typeWeaknesses['Fire'] >= 3 * limitFactor) continue;
				}

				// Limit four weak to Freeze-Dry
				if (weakToFreezeDry) {
					if (!typeWeaknesses['Freeze-Dry']) typeWeaknesses['Freeze-Dry'] = 0;
					if (typeWeaknesses['Freeze-Dry'] >= 4 * limitFactor) continue;
				}

				// Limit one level 100 Pokemon
				if (
					!this.adjustLevel && numMaxLevelPokemon >= limitFactor &&
					(this.getLevel(species, isDoubles, this.dex.formats.getRuleTable(this.format).has('dynamaxclause')) === 100)
				) continue;
			}

			// Limit three of any type combination in Monotype
			if (!this.forceMonotype && isMonotype && (typeComboCount[typeCombo] >= 3 * limitFactor)) continue;

			// The Pokemon of the Day
			if (potd?.exists && (pokemon.length === 1 || this.maxTeamSize === 1)) species = potd;

			const set = this.randomSet(species, teamDetails, pokemon.length === 0,
				isDoubles, this.dex.formats.getRuleTable(this.format).has('dynamaxclause'));

			// Okay, the set passes, add it to our team
			pokemon.push(set);
			// Don't bother tracking details for the last Pokemon
			if (pokemon.length === this.maxTeamSize) break;

			// Now that our Pokemon has passed all checks, we can increment our counters
			baseFormes[species.baseSpecies] = 1;

			// Increment type counters
			for (const typeName of types) {
				if (typeName in typeCount) {
					typeCount[typeName]++;
				} else {
					typeCount[typeName] = 1;
				}
			}
			if (typeCombo in typeComboCount) {
				typeComboCount[typeCombo]++;
			} else {
				typeComboCount[typeCombo] = 1;
			}

			// Increment weakness counter
			for (const typeName of this.dex.types.names()) {
				// it's weak to the type
				if (this.dex.getEffectiveness(typeName, species) > 0) {
					typeWeaknesses[typeName]++;
				}
				if (this.dex.getEffectiveness(typeName, species) > 1) {
					typeDoubleWeaknesses[typeName]++;
				}
			}
			// Count Dry Skin/Fluffy as Fire weaknesses
			if (['Dry Skin', 'Fluffy'].includes(set.ability) && this.dex.getEffectiveness('Fire', species) === 0) {
				typeWeaknesses['Fire']++;
			}
			if (weakToFreezeDry) typeWeaknesses['Freeze-Dry']++;

			// Increment level 100 counter
			if (set.level === 100) numMaxLevelPokemon++;

			// Track what the team has
			if (set.ability === 'Drizzle' || set.moves.includes('raindance')) teamDetails.rain = 1;
			if (set.ability === 'Drought' || set.moves.includes('sunnyday')) teamDetails.sun = 1;
			if (set.ability === 'Sand Stream') teamDetails.sand = 1;
			if (set.ability === 'Snow Warning') teamDetails.hail = 1;
			if (set.moves.includes('spikes')) teamDetails.spikes = (teamDetails.spikes || 0) + 1;
			if (set.moves.includes('stealthrock')) teamDetails.stealthRock = 1;
			if (set.moves.includes('stickyweb')) teamDetails.stickyWeb = 1;
			if (set.moves.includes('toxicspikes')) teamDetails.toxicSpikes = 1;
			if (set.moves.includes('defog')) teamDetails.defog = 1;
			if (set.moves.includes('rapidspin')) teamDetails.rapidSpin = 1;
			if (set.moves.includes('auroraveil') || (set.moves.includes('reflect') && set.moves.includes('lightscreen'))) {
				teamDetails.screens = 1;
			}
		}
		if (pokemon.length < this.maxTeamSize && pokemon.length < 12) { // large teams sometimes cannot be built
			throw new Error(`Could not build a random team for ${this.format} (seed=${seed})`);
		}

		return pokemon;
	}

	randomFactorySets: {[format: string]: {[species: string]: BattleFactorySpecies}} = require('./factory-sets.json');

	randomFactorySet(
		species: Species,
		teamData:RandomTeamsTypes.FactoryTeamDetails,
		tier: string
	): RandomTeamsTypes.RandomFactorySet | null {
		const id = toID(species.name);
		const setList = this.randomFactorySets[tier][id].sets;

		const itemsMax: {[k: string]: number} = { choicespecs: 1, choiceband: 1, choicescarf: 1, lightclay: 1, eviolite: 2};
		const movesMax: {[k: string]: number} = {
			rapidspin: 1,
			batonpass: 1, 
			stealthrock: 1, 
			defog: 1, 
			spikes: 1, 
			toxicspikes: 1,
			ceaselessedge: 1,
			auroraveil: 1,
		};
		const abilitiesMax: {[k: string]: number} = {
			toxicdebris: 1,
			snowcloak: 1,
			drizzle: 1,
			drought: 1,
		};
		let requiredAbilities: {[k: string]: string} = { drizzle: 'weather', drought: 'weather' };
		const requiredMoves: {[k: string]: string} = {
			stealthrock: 'hazardSet', rapidspin: 'hazardClear', defog: 'hazardClear'
		};
		const weatherAbilitiesSet: {[k: string]: string[]} = {
			raindance: ['hydration', 'swiftswim', 'raindance', 'raindish'],
			sunnyday: ['leafguard', 'solarpower', 'chlorophyll', 'flowergift'],
			sandstorm: ['sandforce', 'sandrush', 'sandveil'],
			snow: ['snowcloak', 'icebody', 'slushrush']
		}
		const weatherAbilitiesRequire: {[k: string]: string} = {
			hydration: 'raindance', swiftswim: 'raindance', raindish: 'raindance',
			waterveil: 'raindance',
			leafguard: 'sunnyday', solarpower: 'sunnyday', chlorophyll: 'sunnyday',
			flowergift: 'sunnyday',
			sandforce: 'sandstorm', sandrush: 'sandstorm', sandveil: 'sandstorm',
			snowcloak: 'snow', icebody: 'snow', slushrush: 'snow',
		};
		const weatherAbilities = [
			'forecast',
			'drizzle',
			'drought', 'sundance',
			'snowwarning', 'chillingneigh', 'asoneglastrier', 'absolutezero',
			'sandstream', 'granitestorm'
		];

		const terrainAbilities: {[k: string]: string} = {
			electricsurge: "electric",
			psychicsurge: "psychic",
			grassysurge: "grassy",
			mistysurge: "misty",
		};

		const terrainAbilitiesRequired: {[k: string]: string} = {
			surgesurfer: "electric",
			grasspelt: "grassy",
		};

		const terrainMovesRequired: {[k: string]: string} = {
			risingvoltage: "electric",
			expandingforce: "psychic",
			grassyglide: "grassy",
			mistyexplosion: "misty",
		};

		const terrainItemsRequire: {[k: string]: string} = {
			electricseed: "electric",
			psychicseed: "psychic",
			grassyseed: "grassy",
			mistyseed: "misty",
		};

		let effectivePool: {set: AnyObject, moveVariants?: number[], itemVariants?: number, abilityVariants?: number}[] = [];
		const priorityPool = [];
		for (const curSet of setList) {
			// if (this.forceMonotype && !species.types.includes(this.forceMonotype)) continue;

			const itemData = this.dex.items.get(curSet.item);
			const abilityState = this.dex.abilities.get(curSet.ability);
			// If we do have weather, then we must required some abilities to abuse the weather.
			if (teamData.weather && weatherAbilitiesSet[teamData.weather]) {
				for (const ability of weatherAbilitiesSet[teamData.weather]) {
					requiredAbilities[ability] = 'weather';
					abilitiesMax[ability] = 1; // we are going to restrict the team to at least one of each ability.
				}
			}

			if (teamData.megaCount && teamData.megaCount > 0 && itemData.megaStone) {
				continue; // move to the next set if pokemon contains a mega stone and the team already has a mega stone.
			}
			
			if (itemsMax[itemData.id] && teamData.has[itemData.id] >= itemsMax[itemData.id]) {
				continue; // move to the next set if the pokemon contains an item that has already hit it's limit in the team.
			}

			if (abilitiesMax[abilityState.id] && teamData.has[abilityState.id] >= abilitiesMax[abilityState.id]) {
				continue; // move to the next set if the pokemon contains an ability that has already hit it's limit in the team.
			}

			if (weatherAbilitiesRequire[abilityState.id] && teamData.weather !== weatherAbilitiesRequire[abilityState.id]) {
				continue; // move to the next set if the pokemon's ability requires a weather that is not possible in the team.
			}
			if (teamData.weather && abilityState.id === 'cloudnine') {
				continue; // rejects the possibility of having a cloud nine pokemon with a weather setter.
			}

			if (teamData.weather && weatherAbilities.includes(abilityState.id)) {
				continue; // reject 2+ weather setters per team.
			}

			if (teamData.terrain && terrainAbilities[abilityState.id]) {
				continue; // reject 2+ terrain setters per team.
			}

			if (terrainItemsRequire[itemData.id] &&  teamData.terrain !== terrainItemsRequire[itemData.id]) {
				continue; // move to the next set if the pokemon's item requires a terrain that is not possible in the team.
			}

			if (terrainAbilitiesRequired[abilityState.id] && teamData.terrain !== terrainAbilitiesRequired[abilityState.id]) {
				continue; // move to the next set if the pokemon's ability requires a terrain that is not possible in the team.
			}

			let reject = false;
			let hasRequiredMove = false;
			let hasRequiredAbility = false;
			const curSetVariants = [];
			for (const move of curSet.moves) {
				const variantIndex = this.random(move.length);
				const moveId = toID(move[variantIndex]);
				if (movesMax[moveId] && teamData.has[moveId] >= movesMax[moveId]) {
					reject = true; // reject any set that has a move that exceed the max limit for the team.
					break;
				}
				if (requiredMoves[moveId] && !teamData.has[requiredMoves[moveId]]) {
					hasRequiredMove = true; // place into the priority pool if they have a required move.
				}

				curSetVariants.push(variantIndex);
			}

			if (requiredAbilities[abilityState.id]) {
				hasRequiredAbility = true; // place into the priority pool if they have a required ability.
			}


			if (reject) continue; // move on to the next set if the set fails the checks.
			effectivePool.push({set: curSet, moveVariants: curSetVariants});
			if (hasRequiredMove || hasRequiredAbility) priorityPool.push({set: curSet, moveVariants: curSetVariants});
		}

		if (priorityPool.length) effectivePool = priorityPool;

		if (!effectivePool.length) {
			if (!teamData.forceResult) return null;
			for (const curSet of setList) {
				effectivePool.push({set: curSet});
			}
		}

		const setData = this.sample(effectivePool);
		const moves = [];
		for (const [i, moveSlot] of setData.set.moves.entries()) {
			moves.push(setData.moveVariants ? moveSlot[setData.moveVariants[i]] : this.sample(moveSlot));
		}

		return {
			name: setData.set.name || species.baseSpecies,
			species: setData.set.species,
			gender: setData.set.gender || species.gender || (this.randomChance(1, 2) ? 'M' : 'F'),
			item: setData.set.item || '',
			ability: setData.set.ability || species.abilities['0'],
			shiny: typeof setData.set.shiny === 'undefined' ? this.randomChance(1, 1024) : setData.set.shiny,
			level: this.adjustLevel || 100,
			happiness: typeof setData.set.happiness === 'undefined' ? 255 : setData.set.happiness,
			evs: setData.set.evs || {hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84},
			ivs: setData.set.ivs || {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
			nature: setData.set.nature || 'Serious',
			moves: moves,
		};
	}

	randomFactoryTeam(side: PlayerOptions, depth = 0): RandomTeamsTypes.RandomFactorySet[] {
		this.enforceNoDirectCustomBanlistChanges();

		const forceResult = depth >= 12;
		if (!this.factoryTier) this.factoryTier = this.sample(['OU']);
		const chosenTier = this.factoryTier;

		const pokemon = [];
		const pokemonPool = Object.keys(this.randomFactorySets[chosenTier]);

		const teamData: TeamData = {
			typeCount: {},
			typeComboCount: {},
			baseFormes: {},
			has: {},
			forceResult: forceResult,
			weaknesses: {},
			resistances: {},
		};
		// We have to treat forecast differently since it is based on the rocks it holds.
		const forecastWeatherAbilitiesSet: {[k: string]: string} = {
			damprock: 'raindance',
			heatrock: 'sunnyday',
			icyrock: 'snow',
			smoothrock: 'sandstorm',
		};
		const weatherAbilitiesSet: {[k: string]: string} = {
			drizzle: 'raindance',
			drought: 'sunnyday', sundance: 'sunnyday',
			snowwarning: 'snow', chillingneigh: 'snow', asoneglastrier: 'snow',
			absolutezero: 'snow',
			sandstream: 'sandstorm', granitestorm: 'sandstorm',
		};
		const terrainAbilitiesSet: {[k: string]: string} = {
			electricsurge: "electric",
			psychicsurge: "psychic",
			grassysurge: "grassy",
			seedsower: "grassy",
			mistysurge: "misty",
		};
		const resistanceAbilities: {[k: string]: string[]} = {
			colorchange: [
				'Bug', 'Cosmic', 'Dark', 'Dragon',
				'Electric', 'Fighting', 'Flying',
				'Fire', 'Fairy', 'Grass', 'Ground',
				'Ice', 'Normal', 'Poison', 'Rock',
				'Steel', 'Water'
			],
			aurabreak: ['Dark', 'Psychic', 'Fairy'],
			// Water
			dryskin: ['Water'], waterabsorb: ['Water'], stormdrain: ['Water'],
			silentwater: ['Water'], watercompaction: ['Water'], steamengine: ['Water', 'Fire'],
			magmaarmor: ['Water', 'Fire'],
			// Fire
			flashfire: ['Fire'], heatproof: ['Fire'], mightyfire: ['Fire'],
			// Fairy
			sweettooth: ['Fairy'],
			// Electric
			lightningrod: ['Electric'], motordrive: ['Electric'], voltabsorb: ['Electric'],
			phototaxis: ['Electric'], radiatinglight: ['Electric'],
			// Grass
			sapsipper: ['Grass'], naturesgift: ['Grass'],
			// Ice
			thickfat: ['Ice', 'Fire'],
			// Ground
			levitate: ['Ground'],
			// Steel
			garbagedisposal: ['Steel'],
		};

		const requiredAbilityFamilies = ['weather'];
		const requiredAbilities: {[k: string]: string} = {drizzle: 'weather'};
		const requiredMoveFamilies = ['hazardSet', 'hazardClear'];
		const requiredMoves: {[k: string]: string} = {stealthrock: 'hazardSet', rapidspin: 'hazardClear', defog: 'hazardClear'};

		while(pokemonPool.length && pokemon.length < this.maxTeamSize) {
			const species = this.dex.species.get(this.sampleNoReplace(pokemonPool));
			if (!species.exists) continue;

			let speciesFlags = this.randomFactorySets[chosenTier][species.id].flags;
			if (!speciesFlags) speciesFlags = {};

			// Limit to one of each species (Species Clause)
			if (teamData.baseFormes[species.baseSpecies]) continue;
			
			const limitFactor = Math.round(this.maxTeamSize / 6) || 1;

			// Limit 2 of any type
			const types = species.types;
			let skip = false;
			for (const type of types) {
				if (teamData.typeCount[type] >= 2 * limitFactor && this.randomChance(4, 5)) {
					skip = true;
					break;
				}
			}

			if (skip) continue;

			// Generate the random set
			const set = this.randomFactorySet(species, teamData, chosenTier);
			if (!set) continue;

			// Limit 1 of any type combination
			let typeCombo = types.slice().sort().join();
			if (set.ability === 'Drought' || set.ability === 'Drizzle') {
				// Drought and Drizzle don't count towards the type combo limit
				typeCombo = set.ability;
			}

			if (teamData.typeComboCount[typeCombo] >= 1 * limitFactor) continue;

			// Since the set passed, we can add it to our team.
			pokemon.push(set);

			// Now we need to update the team data
			for (const type of types) {
				teamData.typeCount[type] = (teamData.typeCount[type] + 1) || 1;
			}

			teamData.typeComboCount[typeCombo] = (teamData.typeComboCount[typeCombo] + 1) || 1;
			teamData.baseFormes[species.baseSpecies] = 1;
			const itemData = this.dex.items.get(set.item);
			if (!teamData.megaCount) teamData.megaCount = 0;
			if (itemData.megaStone) teamData.megaCount++;
			teamData.has[itemData.id] = (teamData.has[itemData.id] + 1) || 1;

			const abilityState = this.dex.abilities.get(set.ability);

			if (abilityState.id in weatherAbilitiesSet) {
				teamData.weather = weatherAbilitiesSet[abilityState.id];
			}
			if (abilityState.id === 'forecast') {
				teamData.weather = forecastWeatherAbilitiesSet[itemData.id];
			}

			if (abilityState.id in terrainAbilitiesSet) {
				teamData.terrain = terrainAbilitiesSet[abilityState.id];
			}

			teamData.has[abilityState.id] = (teamData.has[abilityState.id] + 1) || 1;
			for (const move of set.moves) {
				const moveId = toID(move);
				teamData.has[moveId] = (teamData.has[moveId] + 1) || 1;
				if (moveId in requiredMoves) {
					teamData.has[requiredMoves[moveId]] = 1;
				}
			}

			if (requiredAbilities[abilityState.id]) {
				teamData.has[requiredAbilities[abilityState.id]] = 1;
			}

			for (const typeName of this.dex.types.names()) {
				// Cover any major weakness (3+) with at least one resistance
				if (teamData.resistances[typeName] >= 1) continue;
				if (resistanceAbilities[abilityState.id]?.includes(typeName) || !this.dex.getImmunity(typeName, types)) {
					teamData.resistances[typeName] = (teamData.resistances[typeName] || 0) + 1;
					if (teamData.resistances[typeName] >= 1) teamData.weaknesses[typeName] = 0;
					continue;
				}

				const typeMod = this.dex.getEffectiveness(typeName, types);
				if (typeMod < 0) {
					teamData.resistances[typeName] = (teamData.resistances[typeName] || 0) + 1;
					if (teamData.resistances[typeName] >= 1) teamData.weaknesses[typeName] = 0;
				} else if (typeMod > 0) {
					teamData.weaknesses[typeName] = (teamData.weaknesses[typeName] || 0) + 1;
				}
			}
		}

		if (pokemon.length < this.maxTeamSize) return this.randomFactoryTeam(side, ++depth);
		
		// Quality Control
		if (!teamData.forceResult) { // If the team doesn't pass these checks, then we will need to redo the team again.
			// Double Checking that there is only one pokemon that has a mega stone per team.
			if (teamData.megaCount && teamData.megaCount > 1) return this.randomFactoryTeam(side, ++depth);
			for (const requiredFamily of requiredAbilityFamilies) {
				if (!teamData.has[requiredFamily]) return this.randomFactoryTeam(side, ++depth);
			}
			for (const requiredFamily of requiredMoveFamilies) {
				if (!teamData.has[requiredFamily]) return this.randomFactoryTeam(side, ++depth);
			}
			for (const type in teamData.weaknesses) {
				if (teamData.weaknesses[type] >= 3) return this.randomFactoryTeam(side, ++depth);
			}
		}

		return pokemon;
	}
}

export default RandomTTCTeams