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

// Moves that restore HP:
const RECOVERY_MOVES = [
	'healorder', 'milkdrink', 'moonlight', 'morningsun', 'recover', 'roost', 'shoreup', 'slackoff', 'softboiled', 'strengthsap', 'synthesis',
];
// Moves that drop stats:
const CONTRARY_MOVES = [
	'armorcannon', 'closecombat', 'leafstorm', 'makeitrain', 'overheat', 'spinout', 'superpower', 'vcreate',
];
// Moves that boost Attack:
const PHYSICAL_SETUP = [
	'bellydrum', 'bulkup', 'coil', 'curse', 'dragondance', 'honeclaws', 'howl', 'meditate', 'poweruppunch', 'swordsdance', 'tidyup', 'victorydance',
];
// Moves which boost Special Attack:
const SPECIAL_SETUP = [
	'calmmind', 'chargebeam', 'geomancy', 'nastyplot', 'quiverdance', 'tailglow', 'torchsong',
];
// Moves that boost Attack AND Special Attack:
const MIXED_SETUP = [
	'clangoroussoul', 'growth', 'happyhour', 'holdhands', 'noretreat', 'shellsmash', 'workup',
];
// Some moves that only boost Speed:
const SPEED_SETUP = [
	'agility', 'autotomize', 'flamecharge', 'rockpolish', 'trailblaze',
];
// Conglomerate for ease of access
const SETUP = [
	'acidarmor', 'agility', 'autotomize', 'bellydrum', 'bulkup', 'calmmind', 'clangoroussoul', 'coil', 'curse', 'dragondance',
	'flamecharge', 'growth', 'honeclaws', 'howl', 'irondefense', 'meditate', 'nastyplot', 'noretreat', 'poweruppunch', 'quiverdance',
	'rockpolish', 'shellsmash', 'shiftgear', 'swordsdance', 'tailglow', 'tidyup', 'trailblaze', 'workup', 'victorydance',
];
const SPEED_CONTROL = [
	'electroweb', 'glare', 'icywind', 'lowsweep', 'quash', 'rocktomb', 'stringshot', 'tailwind', 'thunderwave', 'trickroom',
];
// Moves that shouldn't be the only STAB moves:
const NO_STAB = [
	'accelerock', 'aquajet', 'beakblast', 'bounce', 'breakingswipe', 'bulletpunch', 'chatter', 'chloroblast', 'clearsmog', 'covet',
	'dragontail', 'doomdesire', 'electroweb', 'eruption', 'explosion', 'fakeout', 'feint', 'flamecharge', 'flipturn', 'futuresight',
	'grassyglide', 'iceshard', 'icywind', 'incinerate', 'machpunch', 'meteorbeam', 'mortalspin', 'nuzzle', 'pluck', 'pursuit', 'quickattack',
	'rapidspin', 'reversal', 'selfdestruct', 'shadowsneak', 'skydrop', 'snarl', 'strugglebug', 'suckerpunch', 'uturn', 'watershuriken',
	'vacuumwave', 'voltswitch', 'waterspout',
];
// Hazard-setting moves
const HAZARDS = [
	'spikes', 'stealthrock', 'stickyweb', 'toxicspikes',
];
// Protect and its variants
const PROTECT_MOVES = [
	'banefulbunker', 'protect', 'spikyshield',
];
// Moves that switch the user out
const PIVOT_MOVES = [
	'chillyreception', 'flipturn', 'partingshot', 'shedtail', 'teleport', 'uturn', 'voltswitch',
];

// Moves that should be paired together when possible
const MOVE_PAIRS = [
	['lightscreen', 'reflect'],
	['sleeptalk', 'rest'],
	['protect', 'wish'],
	['leechseed', 'protect'],
	['leechseed', 'substitute'],
];

/** Pokemon who always want priority STAB, and are fine with it as its only STAB move of that type */
const PRIORITY_POKEMON = [
	'breloom', 'brutebonnet', 'honchkrow', 'mimikyu', 'scizor',
];

/** Pokemon who should never be in the lead slot */
const NO_LEAD_POKEMON = [
	'Zacian', 'Zamazenta',
];
const DOUBLES_NO_LEAD_POKEMON = [
	'Basculegion', 'Houndstone', 'Roaring Moon', 'Zacian', 'Zamazenta',
];

const DEFENSIVE_TERA_BLAST_USERS = [
	'alcremie', 'bellossom', 'comfey', 'florges',
];

function sereneGraceBenefits(move: Move) {
	return move.secondary?.chance && move.secondary.chance > 20 && move.secondary.chance < 100;
}

export class RandomTTCTeams extends RandomGen8Teams {
	randomSets: {[species: string]: RandomTeamsTypes.RandomSpeciesData} = require('./random-sets.json');

	constructor(format: Format | string, prng: PRNG | PRNGSeed | null) {
		super(format, prng);
		this.noStab = NO_STAB;
		this.priorityPokemon = PRIORITY_POKEMON;
		
		this.moveEnforcementCheckers = {
			Bug: (movePool, moves, abilities, types, counter) => (
				movePool.includes('megahorn') || movePool.includes('xscissor') ||
				(!counter.get('Bug') && types.has('Electric'))
			),
			Cosmic: (movePool, moves, abilities, types, counter) => !counter.get('Cosmic'),
			Dark: (movePool, moves, abilities, types, counter) => !counter.get('Dark'),
			Dragon: (movePool, moves, abilities, types, counter) => !counter.get('Dragon'),
			Electric: (movePool, moves, abilities, types, counter) => !counter.get('Electric'),
			Fairy: (movePool, moves, abilities, types, counter) => !counter.get('Fairy'),
			Fighting: (movePool, moves, abilities, types, counter) => !counter.get('Fighting'),
			Fire: (movePool, moves, abilities, types, counter, species) => !counter.get('Fire'),
			Flying: (movePool, moves, abilities, types, counter) => !counter.get('Flying'),
			Ghost: (movePool, moves, abilities, types, counter) => !counter.get('Ghost'),
			Grass: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Grass') && (
					movePool.includes('leafstorm') || species.baseStats.atk >= 100 ||
					types.has('Electric') || abilities.has('Seed Sower')
				)
			),
			Ground: (movePool, moves, abilities, types, counter) => !counter.get('Ground'),
			Ice: (movePool, moves, abilities, types, counter) => (movePool.includes('freezedry') || !counter.get('Ice')),
			Normal: (movePool, moves, types, counter) => (movePool.includes('boomburst') || movePool.includes('hypervoice')),
			Poison: (movePool, moves, abilities, types, counter) => {
				if (types.has('Ground')) return false;
				return !counter.get('Poison');
			},
			Psychic: (movePool, moves, abilities, types, counter) => {
				if (counter.get('Psychic')) return false;
				if (movePool.includes('calmmind') || abilities.has('Strong Jaw')) return true;
				return abilities.has('Psychic Surge') || ['Electric', 'Fighting', 'Fire', 'Grass', 'Poison'].some(m => types.has(m));
			},
			Rock: (movePool, moves, abilities, types, counter, species) => !counter.get('Rock') && species.baseStats.atk >= 80,
			Steel: (movePool, moves, abilities, types, counter, species) => (
				!counter.get('Steel') && 
				(species.baseStats.atk >= 90 || movePool.includes('gigatonhammer') || movePool.includes('makeitrain'))
			),
			Water: (movePool, moves, abilities, types, counter) => (!counter.get('Water') && !types.has('Ground')),
		};
	}

	cullMovePool(
		types: string[],
		moves: Set<string>,
		abilities: Set<string>,
		counter: MoveCounter,
		movePool: string[],
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		isDoubles: boolean,
		preferredType: string,
		role: RandomTeamsTypes.Role,
	): void {
		if (moves.size + movePool.length <= this.maxMoveCount) return;
		// If we have two unfilled moves and only one unpaired move, cull the unpaired move.
		if (moves.size === this.maxMoveCount - 2) {
			const unpairedMoves = [...movePool];
			for (const pair of MOVE_PAIRS) {
				if (movePool.includes(pair[0]) && movePool.includes(pair[1])) {
					this.fastPop(unpairedMoves, unpairedMoves.indexOf(pair[0]));
					this.fastPop(unpairedMoves, unpairedMoves.indexOf(pair[1]));
				}
			}
			if (unpairedMoves.length === 1) {
				this.fastPop(movePool, movePool.indexOf(unpairedMoves[0]));
			}
		}

		// These moves are paired, and shouldn't appear if there is not room for them both.
		if (moves.size === this.maxMoveCount - 1) {
			for (const pair of MOVE_PAIRS) {
				if (movePool.includes(pair[0]) && movePool.includes(pair[1])) {
					this.fastPop(movePool, movePool.indexOf(pair[0]));
					this.fastPop(movePool, movePool.indexOf(pair[1]));
				}
			}
		}

		// Develop additional move lists
		const statusMoves = this.dex.moves.all()
			.filter(move => move.category === 'Status')
			.map(move => move.id);

		// Team-based move culls
		if (teamDetails.screens && movePool.length >= this.maxMoveCount + 2) {
			if (movePool.includes('reflect')) this.fastPop(movePool, movePool.indexOf('reflect'));
			if (movePool.includes('lightscreen')) this.fastPop(movePool, movePool.indexOf('lightscreen'));
			if (moves.size + movePool.length <= this.maxMoveCount) return;
		}
		if (teamDetails.stickyWeb) {
			if (movePool.includes('stickyweb')) this.fastPop(movePool, movePool.indexOf('stickyweb'));
			if (moves.size + movePool.length <= this.maxMoveCount) return;
		}
		if (teamDetails.stealthRock) {
			if (movePool.includes('stealthrock')) this.fastPop(movePool, movePool.indexOf('stealthrock'));
			if (moves.size + movePool.length <= this.maxMoveCount) return;
		}
		if (teamDetails.defog || teamDetails.rapidSpin) {
			if (movePool.includes('defog')) this.fastPop(movePool, movePool.indexOf('defog'));
			if (movePool.includes('rapidspin')) this.fastPop(movePool, movePool.indexOf('rapidspin'));
			if (moves.size + movePool.length <= this.maxMoveCount) return;
		}
		if (teamDetails.toxicSpikes && teamDetails.toxicSpikes >= 2) {
			if (movePool.includes('toxicspikes')) this.fastPop(movePool, movePool.indexOf('toxicspikes'));
			if (moves.size + movePool.length <= this.maxMoveCount) return;
		}
		if (teamDetails.spikes && teamDetails.spikes >= 2) {
			if (movePool.includes('spikes')) this.fastPop(movePool, movePool.indexOf('spikes'));
			if (moves.size + movePool.length <= this.maxMoveCount) return;
		}

		// General incompatibilities
		const incompatiblePairs = [
			// These moves don't mesh well with other aspects of the set
			[statusMoves, ['healingwish', 'switcheroo', 'trick']],
			[SETUP, PIVOT_MOVES],
			[SETUP, HAZARDS],
			[SETUP, ['defog', 'nuzzle', 'toxic', 'waterspout', 'yawn', 'haze']],
			[PHYSICAL_SETUP, PHYSICAL_SETUP],
			['curse', 'irondefense'],
			[SPECIAL_SETUP, 'thunderwave'],
			['substitute', PIVOT_MOVES],
			[SPEED_SETUP, ['aquajet', 'rest', 'trickroom']],
			['curse', 'rapidspin'],
			['dragondance', 'dracometeor'],

			// These attacks are redundant with each other
			[['psychic', 'psychicnoise'], ['psyshock', 'psychicnoise']],
			['surf', 'hydropump'],
			['liquidation', 'wavecrash'],
			['aquajet', 'flipturn'],
			['gigadrain', 'leafstorm'],
			['powerwhip', 'hornleech'],
			[['airslash', 'bravebird', 'hurricane'], ['airslash', 'bravebird', 'hurricane']],
			['knockoff', 'foulplay'],
			['doubleedge', ['bodyslam', 'headbutt']],
			['fireblast', ['fierydance', 'flamethrower']],
			['lavaplume', 'magmastorm'],
			['thunderpunch', 'wildcharge'],
			['gunkshot', ['direclaw', 'poisonjab', 'sludgebomb']],
			['aurasphere', 'focusblast'],
			['closecombat', 'drainpunch'],
			['bugbite', 'pounce'],
			[['dragonpulse', 'spacialrend'], 'dracometeor'],

			// These status moves are redundant with each other
			['taunt', 'disable'],
			['toxic', ['willowisp', 'thunderwave']],
			[['thunderwave', 'toxic', 'willowisp'], 'toxicspikes'],
			['thunderwave', 'yawn'],

			// This space reserved for assorted hardcodes that otherwise make little sense out of context
			// Landorus and Thundurus
			['nastyplot', ['rockslide', 'knockoff']],
			// Persian
			['switcheroo', 'fakeout'],
			// Beartic
			['snowscape', 'swordsdance'],
			// Magnezone
			['bodypress', 'mirrorcoat'],
			// Amoonguss, though this can work well as a general rule later
			['toxic', 'clearsmog'],
			// Chansey and Blissey
			['healbell', 'stealthrock'],
			// Azelf and Zoroarks
			['trick', 'uturn'],
		];

		for (const pair of incompatiblePairs) this.incompatibleMoves(moves, movePool, pair[0], pair[1]);

		if (!types.includes('Ice')) this.incompatibleMoves(moves, movePool, 'icebeam', 'icywind');

		if (!isDoubles) this.incompatibleMoves(moves, movePool, ['taunt', 'strengthsap'], 'encore');

		if (!types.includes('Dark')) this.incompatibleMoves(moves, movePool, 'knockoff', 'suckerpunch');

		// This space reserved for assorted hardcodes that otherwise make little sense out of context
		if (species.id === 'luvdisc') {
			this.incompatibleMoves(moves, movePool, ['charm', 'flipturn', 'icebeam'], ['charm', 'flipturn']);
		}
		if (species.id === "cyclizar") this.incompatibleMoves(moves, movePool, 'taunt', 'knockoff');
		if (species.baseSpecies === 'Dudunsparce') this.incompatibleMoves(moves, movePool, 'earthpower', 'shadowball');
		if (species.id === 'mesprit') this.incompatibleMoves(moves, movePool, 'healingwish', 'uturn');
	}

	// Checks for and removes incompatible moves, starting with the first move in movesA.
	incompatibleMoves(
		moves: Set<string>,
		movePool: string[],
		movesA: string | string[],
		movesB: string | string[],
	): void {
		const moveArrayA = (Array.isArray(movesA)) ? movesA : [movesA];
		const moveArrayB = (Array.isArray(movesB)) ? movesB : [movesB];
		if (moves.size + movePool.length <= this.maxMoveCount) return;
		for (const moveid1 of moves) {
			if (moveArrayB.includes(moveid1)) {
				for (const moveid2 of moveArrayA) {
					if (moveid1 !== moveid2 && movePool.includes(moveid2)) {
						this.fastPop(movePool, movePool.indexOf(moveid2));
						if (moves.size + movePool.length <= this.maxMoveCount) return;
					}
				}
			}
			if (moveArrayA.includes(moveid1)) {
				for (const moveid2 of moveArrayB) {
					if (moveid1 !== moveid2 && movePool.includes(moveid2)) {
						this.fastPop(movePool, movePool.indexOf(moveid2));
						if (moves.size + movePool.length <= this.maxMoveCount) return;
					}
				}
			}
		}
	}

	// Adds a move to the moveset, returns the MoveCounter
	addMove(
		move: string,
		moves: Set<string>,
		types: string[],
		abilities: Set<string>,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		isDoubles: boolean,
		movePool: string[],
		preferredType: string,
		role: RandomTeamsTypes.Role,
	): MoveCounter {
		moves.add(move);
		this.fastPop(movePool, movePool.indexOf(move));
		const counter = this.queryMoves(moves, types, abilities);
		this.cullMovePool(types, moves, abilities, counter, movePool, teamDetails, species, isLead, isDoubles, preferredType, role);
		return counter;
	}

	// Returns the type of a given move for STAB/coverage enforcement purposes
	getMoveType(move: Move, species: Species, abilities: Set<string>, preferredType: string): string {
		if (move.id === 'terablast') return preferredType;
		if (['judgment', 'revelationdance'].includes(move.id)) return species.types[0];

		if (move.name === "Raging Bull" && species.name.startsWith("Tauros-Paldea")) {
			if (species.name.endsWith("Combat")) return "Fighting";
			if (species.name.endsWith("Blaze")) return "Fire";
			if (species.name.endsWith("Aqua")) return "Water";
		}

		if (move.name === "Ivy Cudgel" && species.name.startsWith("Ogerpon")) {
			if (species.name.endsWith("Wellspring")) return "Water";
			if (species.name.endsWith("Hearthflame")) return "Fire";
			if (species.name.endsWith("Cornerstone")) return "Rock";
		}

		const moveType = move.type;
		if (moveType === 'Normal') {
			if (abilities.has('Aerilate')) return 'Flying';
			if (abilities.has('Galvanize')) return 'Electric';
			if (abilities.has('Pixilate')) return 'Fairy';
			if (abilities.has('Refrigerate')) return 'Ice';
		}
		return moveType;
	}

	// Generate random moveset for a given species, role, preferred type.
	randomMoveset(
		types: string[],
		abilities: Set<string>,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		isDoubles: boolean,
		movePool: string[],
		preferredType: string,
		role: RandomTeamsTypes.Role,
	): Set<string> {
		const moves = new Set<string>();
		let counter = this.queryMoves(moves, types, abilities);
		this.cullMovePool(types, moves, abilities, counter, movePool, teamDetails, species, isLead, isDoubles, preferredType, role);

		// If there are only four moves, add all moves and return early
		if (movePool.length <= this.maxMoveCount) {
			for (const moveid of movePool) {
				moves.add(moveid);
			}
			return moves;
		}

		const runEnforcementChecker = (checkerName: string) => {
			if (!this.moveEnforcementCheckers[checkerName]) return false;
			return this.moveEnforcementCheckers[checkerName](
				movePool, moves, abilities, new Set(types), counter, species, teamDetails
			);
		};

		if (role === 'Tera Blast user') {
			counter = this.addMove('terablast', moves, types, abilities, teamDetails, species, isLead, isDoubles,
				movePool, preferredType, role);
		}
		// Add required move (e.g. Relic Song for Meloetta-P)
		if (species.requiredMove) {
			const move = this.dex.moves.get(species.requiredMove).id;
			counter = this.addMove(move, moves, types, abilities, teamDetails, species, isLead, isDoubles,
				movePool, preferredType, role);
		}

		// Add other moves you really want to have, e.g. STAB, recovery, setup.

		// Enforce Facade if Guts is a possible ability
		if (movePool.includes('facade') && abilities.has('Guts')) {
			counter = this.addMove('facade', moves, types, abilities, teamDetails, species, isLead, isDoubles,
				movePool, preferredType, role);
		}

		// Enforce Sticky Web
		if (movePool.includes('stickyweb')) {
			counter = this.addMove('stickyweb', moves, types, abilities, teamDetails, species, isLead, isDoubles,
				movePool, preferredType, role);
		}

		// Enforce Revelation Dance
		if (movePool.includes('revelationdance')) {
			counter = this.addMove('revelationdance', moves, types, abilities, teamDetails, species, isLead, isDoubles,
				movePool, preferredType, role);
		}

		// Enforce Revival Blessing
		if (movePool.includes('revivalblessing')) {
			counter = this.addMove('revivalblessing', moves, types, abilities, teamDetails, species, isLead, isDoubles,
				movePool, preferredType, role);
		}

		// Enforce Salt Cure
		if (movePool.includes('saltcure')) {
			counter = this.addMove('saltcure', moves, types, abilities, teamDetails, species, isLead, isDoubles,
				movePool, preferredType, role);
		}

		// Enforce Trick Room on Doubles Wallbreaker
		if (movePool.includes('trickroom') && role === 'Doubles Wallbreaker') {
			counter = this.addMove('trickroom', moves, types, abilities, teamDetails, species, isLead, isDoubles,
				movePool, preferredType, role);
		}

		// Enforce hazard removal on Bulky Support if the team doesn't already have it
		if (role === 'Bulky Support' && !teamDetails.defog && !teamDetails.rapidSpin) {
			if (movePool.includes('rapidspin')) {
				counter = this.addMove('rapidspin', moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, preferredType, role);
			}
			if (movePool.includes('defog')) {
				counter = this.addMove('defog', moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, preferredType, role);
			}
		}

		// Enforce Knock Off on pure Normal- and Fighting-types in singles
		if (!isDoubles && types.length === 1 && (types.includes('Normal') || types.includes('Fighting'))) {
			if (movePool.includes('knockoff')) {
				counter = this.addMove('knockoff', moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, preferredType, role);
			}
		}

		// Enforce Flip Turn on pure Water-type Wallbreakers
		if (types.length === 1 && types.includes('Water') && role === 'Wallbreaker') {
			if (movePool.includes('flipturn')) {
				counter = this.addMove('flipturn', moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, preferredType, role);
			}
		}

		// Enforce Spore on Smeargle
		if (species.id === 'smeargle') {
			if (movePool.includes('spore')) {
				counter = this.addMove('spore', moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, preferredType, role);
			}
		}

		// Apparently, nothing else currently in Random Battles requires special code to enforce Night Shade/Stoss
		if (species.id === 'deoxysdefense') {
			if (movePool.includes('nightshade')) {
				counter = this.addMove('nightshade', moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, preferredType, role);
			}
		}

		// Enforce moves in doubles
		if (isDoubles) {
			const doublesEnforcedMoves = ['auroraveil', 'mortalspin', 'spore'];
			for (const moveid of doublesEnforcedMoves) {
				if (movePool.includes(moveid)) {
					counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
						movePool, preferredType, role);
				}
			}
			// Enforce Fake Out on slow Pokemon
			if (movePool.includes('fakeout') && species.baseStats.spe <= 50) {
				counter = this.addMove('fakeout', moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, preferredType, role);
			}
			// Enforce Tailwind on Prankster and Gale Wings users
			if (movePool.includes('tailwind') && (abilities.has('Prankster') || abilities.has('Gale Wings'))) {
				counter = this.addMove('tailwind', moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, preferredType, role);
			}
			// Enforce Thunder Wave on Prankster users as well
			if (movePool.includes('thunderwave') && abilities.has('Prankster')) {
				counter = this.addMove('thunderwave', moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, preferredType, role);
			}
		}

		// Enforce STAB priority
		if (
			['Bulky Attacker', 'Bulky Setup', 'Wallbreaker', 'Doubles Wallbreaker'].includes(role) ||
			PRIORITY_POKEMON.includes(species.id)
		) {
			const priorityMoves = [];
			for (const moveid of movePool) {
				const move = this.dex.moves.get(moveid);
				const moveType = this.getMoveType(move, species, abilities, preferredType);
				if (
					types.includes(moveType) && (move.priority > 0 || (moveid === 'grassyglide' && abilities.has('Grassy Surge'))) &&
					(move.basePower || move.basePowerCallback)
				) {
					priorityMoves.push(moveid);
				}
			}
			if (priorityMoves.length) {
				const moveid = this.sample(priorityMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, preferredType, role);
			}
		}

		// Enforce STAB
		for (const type of types) {
			// Check if a STAB move of that type should be required
			const stabMoves = [];
			for (const moveid of movePool) {
				const move = this.dex.moves.get(moveid);
				const moveType = this.getMoveType(move, species, abilities, preferredType);
				if (!this.noStab.includes(moveid) && (move.basePower || move.basePowerCallback) && type === moveType) {
					stabMoves.push(moveid);
				}
			}
			while (runEnforcementChecker(type)) {
				if (!stabMoves.length) break;
				const moveid = this.sampleNoReplace(stabMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, preferredType, role);
			}
		}

		// Enforce Tera STAB
		if (!counter.get('stabtera') && !['Bulky Support', 'Doubles Support'].includes(role)) {
			const stabMoves = [];
			for (const moveid of movePool) {
				const move = this.dex.moves.get(moveid);
				const moveType = this.getMoveType(move, species, abilities, preferredType);
				if (!this.noStab.includes(moveid) && (move.basePower || move.basePowerCallback) && preferredType === moveType) {
					stabMoves.push(moveid);
				}
			}
			if (stabMoves.length) {
				const moveid = this.sample(stabMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, preferredType, role);
			}
		}

		// If no STAB move was added, add a STAB move
		if (!counter.get('stab')) {
			const stabMoves = [];
			for (const moveid of movePool) {
				const move = this.dex.moves.get(moveid);
				const moveType = this.getMoveType(move, species, abilities, preferredType);
				if (!this.noStab.includes(moveid) && (move.basePower || move.basePowerCallback) && types.includes(moveType)) {
					stabMoves.push(moveid);
				}
			}
			if (stabMoves.length) {
				const moveid = this.sample(stabMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, preferredType, role);
			}
		}

		// Enforce recovery
		if (['Bulky Support', 'Bulky Attacker', 'Bulky Setup'].includes(role)) {
			const recoveryMoves = movePool.filter(moveid => RECOVERY_MOVES.includes(moveid));
			if (recoveryMoves.length) {
				const moveid = this.sample(recoveryMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, preferredType, role);
			}
		}

		// Enforce setup
		if (role.includes('Setup') || role === 'Tera Blast user') {
			// First, try to add a non-Speed setup move
			const nonSpeedSetupMoves = movePool.filter(moveid => SETUP.includes(moveid) && !SPEED_SETUP.includes(moveid));
			if (nonSpeedSetupMoves.length) {
				const moveid = this.sample(nonSpeedSetupMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, preferredType, role);
			} else {
				// No non-Speed setup moves, so add any (Speed) setup move
				const setupMoves = movePool.filter(moveid => SETUP.includes(moveid));
				if (setupMoves.length) {
					const moveid = this.sample(setupMoves);
					counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
						movePool, preferredType, role);
				}
			}
		}

		// Enforce redirecting moves, or Fake Out if no redirecting move
		if (role === 'Doubles Support') {
			const redirectMoves = movePool.filter(moveid => ['followme', 'ragepowder'].includes(moveid));
			if (redirectMoves.length) {
				const moveid = this.sample(redirectMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, preferredType, role);
			} else {
				if (movePool.includes('fakeout')) {
					counter = this.addMove('fakeout', moves, types, abilities, teamDetails, species, isLead, isDoubles,
						movePool, preferredType, role);
				}
			}
		}

		// Enforce Protect
		if (role.includes('Protect') || species.id === 'gliscor') {
			const protectMoves = movePool.filter(moveid => PROTECT_MOVES.includes(moveid));
			if (protectMoves.length) {
				const moveid = this.sample(protectMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, preferredType, role);
			}
		}

		// Enforce a move not on the noSTAB list
		if (!counter.damagingMoves.size) {
			// Choose an attacking move
			const attackingMoves = [];
			for (const moveid of movePool) {
				const move = this.dex.moves.get(moveid);
				if (!this.noStab.includes(moveid) && (move.category !== 'Status')) attackingMoves.push(moveid);
			}
			if (attackingMoves.length) {
				const moveid = this.sample(attackingMoves);
				counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
					movePool, preferredType, role);
			}
		}

		// Enforce coverage move
		if (!['AV Pivot', 'Fast Support', 'Bulky Support', 'Bulky Protect', 'Doubles Support'].includes(role)) {
			if (counter.damagingMoves.size === 1) {
				// Find the type of the current attacking move
				const currentAttackType = counter.damagingMoves.values().next().value.type;
				// Choose an attacking move that is of different type to the current single attack
				const coverageMoves = [];
				for (const moveid of movePool) {
					const move = this.dex.moves.get(moveid);
					const moveType = this.getMoveType(move, species, abilities, preferredType);
					if (!this.noStab.includes(moveid) && (move.basePower || move.basePowerCallback)) {
						if (currentAttackType !== moveType) coverageMoves.push(moveid);
					}
				}
				if (coverageMoves.length) {
					const moveid = this.sample(coverageMoves);
					counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
						movePool, preferredType, role);
				}
			}
		}

		// Add (moves.size < this.maxMoveCount) as a condition if moves is getting larger than 4 moves.
		// If you want moves to be favored but not required, add something like && this.randomChance(1, 2) to your condition.

		// Choose remaining moves randomly from movepool and add them to moves list:
		while (moves.size < this.maxMoveCount && movePool.length) {
			if (moves.size + movePool.length <= this.maxMoveCount) {
				for (const moveid of movePool) {
					moves.add(moveid);
				}
				break;
			}
			const moveid = this.sample(movePool);
			counter = this.addMove(moveid, moves, types, abilities, teamDetails, species, isLead, isDoubles,
				movePool, preferredType, role);
			for (const pair of MOVE_PAIRS) {
				if (moveid === pair[0] && movePool.includes(pair[1])) {
					counter = this.addMove(pair[1], moves, types, abilities, teamDetails, species, isLead, isDoubles,
						movePool, preferredType, role);
				}
				if (moveid === pair[1] && movePool.includes(pair[0])) {
					counter = this.addMove(pair[0], moves, types, abilities, teamDetails, species, isLead, isDoubles,
						movePool, preferredType, role);
				}
			}
		}
		return moves;
	}

	shouldCullAbility(
		ability: string,
		types: Set<string>,
		moves: Set<string>,
		abilities: Set<string>,
		counter: MoveCounter,
		movePool: string[],
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isDoubles: boolean,
		preferredType: string,
		role: RandomTeamsTypes.Role
	): boolean {
		if ([
			'Armor Tail', 'Battle Bond', 'Early Bird', 'Flare Boost', 'Galvanize', 'Gluttony', 'Harvest', 'Hydration', 'Ice Body', 'Immunity',
			'Marvel Scale', 'Misty Surge', 'Moody', 'Own Tempo', 'Pressure', 'Quick Feet', 'Rain Dish', 'Sand Veil', 'Sniper', 'Snow Cloak',
			'Steadfast', 'Steam Engine',
		].includes(ability)) return true;

		switch (ability) {
		// Abilities which are primarily useful for certain moves
		case 'Contrary': case 'Serene Grace': case 'Skill Link': case 'Strong Jaw':
			return !counter.get(toID(ability));
		case 'Chlorophyll':
			return (!moves.has('sunnyday') && !teamDetails.sun && species.id !== 'lilligant');
		case 'Cloud Nine':
			return (species.id !== 'golduck');
		case 'Competitive':
			return (species.id === 'kilowattrel' && !isDoubles);
		case 'Compound Eyes': case 'No Guard':
			return !counter.get('inaccurate');
		case 'Cursed Body':
			return abilities.has('Infiltrator');
		case 'Defiant':
			return (!counter.get('Physical') || (abilities.has('Prankster') && (moves.has('thunderwave') || moves.has('taunt'))));
		case 'Flame Body':
			return (species.id === 'magcargo' && moves.has('shellsmash'));
		case 'Flash Fire':
			return (
				['Drought', 'Flame Body', 'Intimidate', 'Rock Head', 'Weak Armor'].some(m => abilities.has(m)) &&
				this.dex.getEffectiveness('Fire', species) < 0
			);
		case 'Guts':
			return (!moves.has('facade') && !moves.has('sleeptalk'));
		case 'Hustle':
			// some of this is just for Delibird in singles/doubles
			return (counter.get('Physical') < 2 || moves.has('fakeout') || moves.has('rapidspin'));
		case 'Infiltrator':
			return (isDoubles && abilities.has('Clear Body'));
		case 'Insomnia':
			return (role === 'Wallbreaker');
		case 'Intimidate':
			if (abilities.has('Hustle')) return true;
			if (abilities.has('Sheer Force') && !!counter.get('sheerforce')) return true;
			if (species.id === 'hitmontop' && moves.has('tripleaxel')) return true;
			return (abilities.has('Stakeout'));
		case 'Iron Fist':
			return (!counter.get(toID(ability)) || moves.has('dynamicpunch'));
		case 'Justified':
			return !counter.get('Physical');
		case 'Libero': case 'Protean':
			return role === 'Offensive Protect' || (species.id === 'meowscarada' && role === 'Fast Attacker');
		case 'Lightning Rod':
			return species.id === 'rhyperior';
		case 'Mold Breaker':
			return (abilities.has('Sharpness') || abilities.has('Unburden') || abilities.has('Sheer Force'));
		case 'Moxie':
			return (!counter.get('Physical') || moves.has('stealthrock'));
		case 'Natural Cure':
			return species.id === 'pawmot';
		case 'Neutralizing Gas':
			return !isDoubles;
		case 'Overcoat': case 'Sweet Veil':
			return types.has('Grass');
		case 'Overgrow':
			return !counter.get('Grass');
		case 'Prankster':
			return (!counter.get('Status') || (species.id === 'grafaiai' && role === 'Setup Sweeper'));
		case 'Reckless':
			return !counter.get('recoil');
		case 'Regenerator':
			return (species.id === 'mienshao' && role === 'Wallbreaker');
		case 'Rock Head':
			return !counter.get('recoil');
		case 'Sand Force': case 'Sand Rush':
			return !teamDetails.sand;
		case 'Sap Sipper':
			return species.id === 'wyrdeer';
		case 'Seed Sower':
			return role === 'Bulky Support';
		case 'Shed Skin':
			return species.id === 'seviper' || species.id === 'arbok';
		case 'Sheer Force':
			const braviaryCase = (species.id === 'braviaryhisui' && (role === 'Wallbreaker' || role === 'Bulky Protect'));
			const abilitiesCase = (abilities.has('Guts') || abilities.has('Sharpness'));
			return (!counter.get('sheerforce') || moves.has('bellydrum') || braviaryCase || abilitiesCase);
		case 'Slush Rush':
			return !teamDetails.snow;
		case 'Solar Power':
			return (!teamDetails.sun || !counter.get('Special'));
		case 'Speed Boost':
			return (species.id === 'yanmega' && !moves.has('protect'));
		case 'Sticky Hold':
			return (species.id === 'muk');
		case 'Sturdy':
			return (!!counter.get('recoil') && species.id !== 'skarmory');
		case 'Swarm':
			return (!counter.get('Bug') || !!counter.get('recovery'));
		case 'Swift Swim':
			return (abilities.has('Intimidate') || (!moves.has('raindance') && !teamDetails.rain));
		case 'Synchronize':
			return (species.id !== 'umbreon' && species.id !== 'rabsca');
		case 'Technician':
			return (!counter.get('technician') || abilities.has('Punk Rock') || abilities.has('Fur Coat'));
		case 'Tinted Lens':
			const hbraviaryCase = (species.id === 'braviaryhisui' && (role === 'Setup Sweeper' || role === 'Doubles Wallbreaker'));
			const yanmegaCase = (species.id === 'yanmega' && moves.has('protect'));
			return (yanmegaCase || hbraviaryCase || species.id === 'illumise');
		case 'Unaware':
			return (species.id === 'clefable' && role !== 'Bulky Support');
		case 'Unburden':
			return (abilities.has('Prankster') || !counter.get('setup'));
		case 'Volt Absorb':
			if (abilities.has('Iron Fist') && counter.get(toID('ironfist')) >= 2) return true;
			return (this.dex.getEffectiveness('Electric', species) < -1);
		case 'Water Absorb':
			return (['lanturn', 'politoed', 'quagsire'].includes(species.id) || moves.has('raindance'));
		case 'Weak Armor':
			return (moves.has('shellsmash') && species.id !== 'magcargo');
		}

		return false;
	}

	getAbility(
		types: Set<string>,
		moves: Set<string>,
		abilities: Set<string>,
		counter: MoveCounter,
		movePool: string[],
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isDoubles: boolean,
		preferredType: string,
		role: RandomTeamsTypes.Role,
	): string {

		const abilityData = Array.from(abilities).map(a => this.dex.abilities.get(a));
		Utils.sortBy(abilityData, abil => -abil.rating);

		if (abilityData.length <= 1) return abilityData[0].name;

		let abilityAllowed: Ability[] = [];
		// Obtain a list of abilities that are allowed (not culled)
		for (const ability of abilityData) {
			if (ability.rating >= 1 && !this.shouldCullAbility(
				ability.name, types, moves, abilities, counter, movePool, teamDetails, species, isDoubles, preferredType, role
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

	getPriorityItem(
		ability: string,
		types: string[],
		moves: Set<string>,
		counter: MoveCounter,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		preferredType: string,
		role: RandomTeamsTypes.Role,
	): string | undefined {
		if (species.requiredItems) {
			// Z-Crystals aren't available in Gen 9, so require Plates
			if (species.baseSpecies === 'Arceus') {
				return species.requiredItems[0];
			}
			return this.sample(species.requiredItems);
		}
		if (role === 'AV Pivot') return 'Assault Vest';
		if (species.id === 'pikachu') return 'Light Ball';
		if (species.id === 'regieleki') return 'Magnet';
		if (species.id === 'smeargle') return 'Focus Sash';
		if (moves.has('clangoroussoul') || (species.id === 'toxtricity' && moves.has('shiftgear'))) return 'Throat Spray';
		if (species.baseSpecies === 'Magearna' && role === 'Tera Blast user') return 'Weakness Policy';
		if (moves.has('lastrespects') || moves.has('dragonenergy')) return 'Choice Scarf';
		if (
			ability === 'Imposter' ||
			(species.id === 'magnezone' && moves.has('bodypress'))
		) return 'Choice Scarf';
		if (species.id === 'rampardos' && role === 'Wallbreaker') return 'Choice Band';
		if (species.id === 'reuniclus' && ability === 'Magic Guard') return 'Life Orb';
		if (moves.has('bellydrum') && moves.has('substitute')) return 'Salac Berry';
		if (
			['Cheek Pouch', 'Cud Chew', 'Harvest'].some(m => ability === m) ||
			moves.has('bellydrum') || moves.has('filletaway')
		) {
			return 'Sitrus Berry';
		}
		if (['healingwish', 'switcheroo', 'trick'].some(m => moves.has(m))) {
			if (
				species.baseStats.spe >= 60 && species.baseStats.spe <= 108 &&
				role !== 'Wallbreaker' && role !== 'Doubles Wallbreaker' && !counter.get('priority')
			) {
				return 'Choice Scarf';
			} else {
				return (counter.get('Physical') > counter.get('Special')) ? 'Choice Band' : 'Choice Specs';
			}
		}
		if (species.id === 'scyther') return (isLead && !moves.has('uturn')) ? 'Eviolite' : 'Heavy-Duty Boots';
		if (species.nfe) return 'Eviolite';
		if (ability === 'Poison Heal') return 'Toxic Orb';
		if ((ability === 'Guts' || moves.has('facade')) && !moves.has('sleeptalk')) {
			return (types.includes('Fire') || ability === 'Toxic Boost') ? 'Toxic Orb' : 'Flame Orb';
		}
		if (ability === 'Sheer Force' && counter.get('sheerforce')) return 'Life Orb';
		if (ability === 'Anger Shell') return this.sample(['Rindo Berry', 'Passho Berry', 'Scope Lens', 'Sitrus Berry']);
		if (moves.has('courtchange')) return 'Heavy-Duty Boots';
		if (moves.has('populationbomb')) return 'Wide Lens';
		if (
			(moves.has('scaleshot') && role !== 'Choice Item user') ||
			(counter.get('setup') && (species.id === 'torterra' || species.id === 'cinccino'))
		) return 'Loaded Dice';
		if (ability === 'Unburden') return moves.has('closecombat') ? 'White Herb' : 'Sitrus Berry';
		if (moves.has('shellsmash') && ability !== 'Weak Armor') return 'White Herb';
		if (moves.has('acrobatics') && ability !== 'Protosynthesis') return '';
		if (moves.has('auroraveil') || moves.has('lightscreen') && moves.has('reflect')) return 'Light Clay';
		if (ability === 'Gluttony') return `${this.sample(['Aguav', 'Figy', 'Iapapa', 'Mago', 'Wiki'])} Berry`;
		if (
			moves.has('rest') && !moves.has('sleeptalk') &&
			ability !== 'Natural Cure' && ability !== 'Shed Skin'
		) {
			return 'Chesto Berry';
		}
		if (
			species.id !== 'yanmega' &&
			this.dex.getEffectiveness('Rock', species) >= 2 && (!types.includes('Flying'))
		) return 'Heavy-Duty Boots';
	}

	getItem(
		ability: string,
		types: string[],
		moves: Set<string>,
		counter: MoveCounter,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		preferredType: string,
		role: RandomTeamsTypes.Role,
	): string {
		if (types.includes('Normal') && moves.has('fakeout')) return 'Silk Scarf';
		if (
			species.id !== 'jirachi' && (counter.get('Physical') >= 4) &&
			['fakeout', 'firstimpression', 'flamecharge', 'rapidspin', 'ruination', 'superfang'].every(m => !moves.has(m))
		) {
			const scarfReqs = (
				role !== 'Wallbreaker' &&
				(species.baseStats.atk >= 100 || ability === 'Huge Power' || ability === 'Pure Power') &&
				species.baseStats.spe >= 60 && species.baseStats.spe <= 108 &&
				ability !== 'Speed Boost' && !counter.get('priority') && !moves.has('aquastep')
			);
			return (scarfReqs && this.randomChance(1, 2)) ? 'Choice Scarf' : 'Choice Band';
		}
		if (
			(counter.get('Special') >= 4) ||
			(counter.get('Special') >= 3 && ['flipturn', 'partingshot', 'uturn'].some(m => moves.has(m)))
		) {
			const scarfReqs = (
				role !== 'Wallbreaker' &&
				species.baseStats.spa >= 100 &&
				species.baseStats.spe >= 60 && species.baseStats.spe <= 108 &&
				ability !== 'Speed Boost' && ability !== 'Tinted Lens' && !counter.get('Physical')
			);
			return (scarfReqs && this.randomChance(1, 2)) ? 'Choice Scarf' : 'Choice Specs';
		}
		if (
			!counter.get('Status') &&
			(moves.has('rapidspin') || !['Fast Attacker', 'Wallbreaker', 'Tera Blast user'].includes(role))
		) {
			return 'Assault Vest';
		}
		if (counter.get('speedsetup') && role === 'Bulky Setup') return 'Weakness Policy';
		if (species.id === 'golem') return 'Custap Berry';
		if (species.id === 'urshifurapidstrike') return 'Punching Glove';
		if (species.id === 'palkia') return 'Lustrous Orb';
		if (moves.has('substitute') || ability === 'Moody') return 'Leftovers';
		if (moves.has('stickyweb') && isLead) return 'Focus Sash';
		if (this.dex.getEffectiveness('Rock', species) >= 1) return 'Heavy-Duty Boots';
		if (
			(moves.has('chillyreception') || (
				role === 'Fast Support' &&
				[...PIVOT_MOVES, 'defog', 'mortalspin', 'rapidspin'].some(m => moves.has(m)) &&
				!types.includes('Flying') && ability !== 'Levitate'
			))
		) return 'Heavy-Duty Boots';

		// Low Priority
		if (
			(species.id === 'garchomp' && role === 'Fast Support') || (
				ability === 'Regenerator' && (role === 'Bulky Support' || role === 'Bulky Attacker') &&
				(species.baseStats.hp + species.baseStats.def) >= 180 && this.randomChance(1, 2)
			)
		) return 'Rocky Helmet';
		if (moves.has('outrage')) return 'Lum Berry';
		if (
			role === 'Fast Support' && isLead &&
			!counter.get('recovery') && !counter.get('recoil') && !moves.has('protect') &&
			(species.baseStats.hp + species.baseStats.def + species.baseStats.spd) < 258
		) return 'Focus Sash';
		if (
			!['Fast Attacker', 'Wallbreaker', 'Tera Blast user'].includes(role) && ability !== 'Levitate' &&
			this.dex.getEffectiveness('Ground', species) >= 2
		) return 'Air Balloon';
		if (['Bulky Attacker', 'Bulky Support', 'Bulky Setup'].some(m => role === (m))) return 'Leftovers';
		if (species.id === 'pawmot' && moves.has('nuzzle')) return 'Leppa Berry';
		if (
			['Fast Bulky Setup', 'Fast Attacker', 'Setup Sweeper', 'Wallbreaker'].some(m => role === m) &&
			types.includes('Dark') && moves.has('suckerpunch') && !PRIORITY_POKEMON.includes(species.id) &&
			counter.get('physicalsetup') && counter.get('Dark')
		) return 'Black Glasses';
		if (role === 'Fast Support' || role === 'Fast Bulky Setup') {
			return (counter.get('Physical') + counter.get('Special') >= 3 && !moves.has('nuzzle')) ? 'Life Orb' : 'Leftovers';
		}
		if (role === 'Tera Blast user' && DEFENSIVE_TERA_BLAST_USERS.includes(species.id)) return 'Leftovers';
		if (
			['flamecharge', 'rapidspin', 'trailblaze'].every(m => !moves.has(m)) &&
			['Fast Attacker', 'Setup Sweeper', 'Tera Blast user', 'Wallbreaker'].some(m => role === (m))
		) return 'Life Orb';
		return 'Leftovers';
	}

	randomSet(
		species: string | Species,
		teamDetails: RandomTeamsTypes.TeamDetails = {},
		isLead = false,
		isDoubles = false
	): RandomTeamsTypes.RandomSet {
		species = this.dex.species.get(species);
		let forme = species.name;

		if (typeof species.battleOnly === 'string') {
			forme = species.battleOnly;
		}

		if (species.cosmeticFormes) {
			forme = this.sample([species.name].concat(species.cosmeticFormes));
		}

		const sets = this.randomSets[species.id]["sets"];
		const possibleSets = [];
		for (const set of sets) possibleSets.push(set);

		const set = this.sampleIfArray(possibleSets);
		const role = set.role;
		const movePool: string[] = Array.from(set.movepool);
		const preferredTypes = set.preferredTypes;
		const preferredType = this.sampleIfArray(preferredTypes) || '';

		let ability = '';
		let item = undefined;

		const evs = {hp: 85, atk: 85, def: 85, spa: 85, spd: 85, spe: 85};
		const ivs = {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31};

		const types = species.types;
		const abilities = new Set(Object.values(species.abilities));
		if (species.unreleasedHidden) abilities.delete(species.abilities.H);

		// Get moves
		const moves = this.randomMoveset(types, abilities, teamDetails, species, isLead, isDoubles, movePool, preferredType, role);
		const counter = this.queryMoves(moves, types, abilities);

		// Get ability
		ability = this.getAbility(new Set(types), moves, abilities, counter, movePool, teamDetails, species, false, preferredType, role);

		// Get item
		item = this.getPriorityItem(ability, types, moves, counter, teamDetails, species, isLead, preferredType, role);
		if (item === undefined) {
			item = this.getItem(ability, types, moves, counter, teamDetails, species, isLead, preferredType, role);
		}

		// For trick / switcheroo
		if (item === 'Leftovers' && types.includes('Poison')) {
			item = 'Black Sludge';
		}

		const level = this.adjustLevel || this.randomSets[species.id]["level"] || (species.nfe ? 90 : 80);
		
		// Minimize confusion damage
		if (!counter.get('Physical') && !moves.has('copycat') && !moves.has('transform')) {
			evs.atk = 0;
			ivs.atk = 0;
		}

		// Prepare optimal HP
		const srImmunity = ability === 'Magic Guard';
		let srWeakness = srImmunity ? 0 : this.dex.getEffectiveness('Rock', species);
		// Crash damage move users want an odd HP to survive two misses
		if (['highjumpkick', 'jumpkick'].some(m => moves.has(m))) srWeakness = 2;
		while (evs.hp > 1) {
			const hp = Math.floor(Math.floor(2 * species.baseStats.hp + ivs.hp + Math.floor(evs.hp / 4) + 100) * level / 100 + 10);
			if (moves.has('substitute') && item === 'Sitrus Berry') {
				// Two Substitutes should activate Sitrus Berry
				if (hp % 4 === 0) break;
			} else if (moves.has('bellydrum') && item === 'Sitrus Berry') {
				// Belly Drum should activate Sitrus Berry
				if (hp % 2 === 0) break;
			} else {
				// Maximize number of Stealth Rock switch-ins
				if (srWeakness <= 0 || ability === 'Regenerator' || ['Black Sludge', 'Leftovers', 'Life Orb'].includes(item)) break;
				if (item !== 'Sitrus Berry' && hp % (4 / srWeakness) > 0) break;
				// Minimise number of Stealth Rock switch-ins to activate Sitrus Berry
				if (item === 'Sitrus Berry' && hp % (4 / srWeakness) === 0) break;
			}
			evs.hp -= 4;
		}

		// shuffle moves to add more randomness to camomons
		const shuffledMoves = Array.from(moves);
		this.prng.shuffle(shuffledMoves);

		return {
			name: species.baseSpecies,
			species: forme,
			gender: species.gender,
			shiny: this.randomChance(1, 1024),
			level,
			moves: shuffledMoves,
			ability,
			evs,
			ivs,
			item,
			role,
		};
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
		};
		let requiredAbilities: {[k: string]: string} = { drizzle: 'weather' };
		const requiredMoves: {[k: string]: string} = {
			stealthrock: 'hazardSet', rapidspin: 'hazardClear', defog: 'hazardClear'
		};
		const weatherAbilitiesRequire: {[k: string]: string} = {
			hydration: 'raindance', swiftswim: 'raindance', raindish: 'raindance',
			waterveil: 'raindance',
			leafguard: 'sunnyday', solarpower: 'sunnyday', chlorophyll: 'sunnyday',
			flowergift: 'sunnyday',
			sandforce: 'sandstorm', sandrush: 'sandstorm', sandveil: 'sandstorm',
			snowcloak: 'snow', icebody: 'snow', slushrush: 'snow',
		};
		const weatherAbilities = [
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
			let hasRequiredWeather = false;
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