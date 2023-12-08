export const Abilities: { [k: string]: ModdedAbilityData} = {
	anticipation: {
		inherit: true,
		onStart(pokemon) {
			for (const target of pokemon.foes()) {
				for (const moveSlot of target.moveSlots) {
					const move = this.dex.moves.get(moveSlot.move);
					const moveType = move.id === 'hiddenpower' ? target.hpType : move.type;
					if (move.basePower >= 100 && this.dex.getImmunity(moveType, pokemon)) {
						this.add('-ability', pokemon, 'Anticipation');
						this.add('-activate', pokemon, 'ability: Anticipation', target, 'Move: ' + move);
						return;
					}
				}
			}
		},
		shortDesc: `On switch-in, this Pokemon shudders if any foe has a move that has 100 BP.`,
		desc: `On switch-in, this Pokemon is alerted if any opposing Pokemon has a move that is 100 Base Power or more.`,
	},
	aromaveil: {
		inherit: true,
		onTryHit(target, source, move) {
			if (move.flags['disable'] && target !== source) {
				this.add('-immune', target, '[from] ability: Aroma Veil');
				return null;
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Physical') {
				if (this.randomChance(4, 10)) {
					source.addVolatile('attract', this.effectState.target);
				}
			}
		},
		shortDesc: 'Protects the user from attacks that limit their move choices and has a 40% chance to inflicts infatuation if hit with a physical move.',
		desc: 'Protects User from Disabling moves; 40% chance to Inflict Infatuation if hit by a physical move.',
	},
	artillery: {
		inherit: true,
		onAfterMove(source, target, move) {
			if (move.category !== 'Status') {
				source.clearBoosts();
				this.add('-clearboost', source, '[from] ability: Artillery');
			} else {
				this.boost({spa: 1});
			}

			this.damage(target.baseMaxhp / 8, target, source);
		},
		shortDesc: 'Not Using a Damaging Move = +1 SpA; Using Damaging Move = Deals 1/8 of target\'s hp to the target as additional damage.',
		desc: 'Not Using a Damaging Move = +1 SpA; Using Damaging Move = Deals 1/8 of target\'s hp to the target as additional damage.',
	},
	aurabreak: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (['Dark', 'Psychic', 'Fairy'].includes(move.type) && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				this.debug('-70% reduction');
				this.add('-ability', target, 'Aura Break');
				return this.chainModify(0.2);
			}
		},
		shortDesc: 'Reduces the damage received from Dark, Psychic and Fairy Moves by 70%.',
		desc: 'Reduces the damage received from Dark, Psychic and Fairy moves by 70%.',
	},
	baddreams: {
		inherit: true,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
				if (target.status === 'slp' || target.hasAbility('comatose')) {
					this.damage(target.baseMaxhp / 4, target, pokemon);
				}
			}
		},
		desc: "Causes opposing Pokemon to lose 1/4 of their maximum HP, rounded down, at the end of each turn if they are asleep.",
		shortDesc: "Causes sleeping foes to lose 1/4 of their max HP at the end of each turn.",
	},
	ballfetch: {
		inherit: true,
		onModifySpe(spe, pokemon) {
			const ballItems = [
				'lifeorb',
				'wikiberry',
				'adrenalineorb',
				'flameorb',
				'liechiberry',
				'snowball',
				'toxicorb',
				'yacheberry',
				'aspearberry',
				'destinyknot',
				'ironball',
				'oranberry',
				'ovalstone',
			];
			for (const item of ballItems) {
				if (pokemon.hasItem(item)) {
					return this.chainModify(1.5);
				}
			}
		},
		shortDesc: "Speed is 1.5x if the Pokemon is holding a ball shaped item!",
		desc: "Speed is 1.5x if the Pokemon is holding a ball shaped item!",
	},
	battlearmor: {
		inherit: true,
		onFoeTryMove(target, source, move) {
			const targetAllExceptions = ['perishsong', 'flowershield', 'rototiller'];
			if (move.target === 'foeSide' || (move.target === 'all' && !targetAllExceptions.includes(move.id))) {
				return;
			}

			const dazzlingHolder = this.effectState.target;
			if ((source.isAlly(dazzlingHolder) || move.target === 'all') && move.priority > 0.1) {
				this.attrLastMove('[still]');
				this.add('cant', dazzlingHolder, 'ability: Battle Armor', move, '[of] ' + target);
				return false;
			}
		},
		shortDesc: 'Protects the user from Critical Hits & Priorty Moves',
		desc: 'Protects the user from Critical Hits & Priority Moves',
	},
	berserk: {
		inherit: true,
		onAfterMoveSecondary(target, source, move) {
			this.effectState.checkedBerserk = true;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.boost({atk: 1, spa: 1}, target, target);
			}
		},
		desc: "When this Pokemon has more than 1/2 its maximum HP and takes damage from an attack bringing it to 1/2 or less of its maximum HP, its Attack and Special Attack is raised by 1 stage. This effect applies after all hits from a multi-hit move. This effect is prevented if the move had a secondary effect removed by the Sheer Force Ability.",
		shortDesc: "This Pokemon's Atk and Sp. Atk is raised by 1 when it reaches 1/2 or less of its max HP.",
	},
	bigpeck: {
		inherit: true,
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['peck']) {
				this.debug('Big Peck boost');
				return this.chainModify([6144, 4096]);
			}
		},
		desc: "This Pokemon's peck-based attacks have their power multiplied by 1.5.",
		shortDesc: "This Pokemon's peck-based attacks have 1.5x power.",
	},
	blaze: {
		inherit: true,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Blaze boost');
				return this.chainModify(2);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Blaze boost');
				return this.chainModify(2);
			}
		},
		shortDesc: "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its offensive stat is multiplied by 2 while using a Fire-type attack.",
		desc: "At 1/3 or less of its max HP, this Pokemon's offensive stat is 2x with Fire attacks.",
	},
	overgrow: {
		inherit: true,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Grass' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Overgrow boost');
				return this.chainModify(2);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Grass' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Overgrow boost');
				return this.chainModify(2);
			}
		},
		desc: "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its offensive stat is multiplied by 2 while using a Grass-type attack.",
		shortDesc: "At 1/3 or less of its max HP, this Pokemon's offensive stat is 2x with Grass attacks.",
	},
	torrent: {
		inherit: true,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Torrent boost');
				return this.chainModify(2);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp <= attacker.maxhp / 3) {
				return this.chainModify(2);
			}
		},
		desc: "When this Pokemon has 1/3 or less of its maximum HP, rounded down, its offensive stat is multiplied by 2 while using a Water-type attack.",
		shortDesc: "At 1/3 or less of its max HP, this Pokemon's offensive stat is 2x with Water attacks.",
	},
	chillingneigh: {
		inherit: true,
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({atk: length}, source);
				this.field.setWeather('snow');
			}
		},
		desc: "This Pokemon's Attack is raised by 1 stage and sets Snow, if it attacks and knocks out another Pokemon.",
		shortDesc: "This Pokemon's Attack is raised by 1 stage and sets Snow, if it attacks and KOes another Pokemon.",
	},
	clearbody: {
		inherit: true,
		onTryBoost(boost, target, source, effect) {
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}

			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] ability: Clear Body", "[of] " + target);
			}
		},
		shortDesc: "Prevents effects from lowering this Pokemon's stat stages.",
	},
	cloudnine: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Cloud Nine');
			this.field.setWeather('none');
		},
		shortDesc: "When this pokemon switch-in, it will eliminate all weather.",
		name: "Cloud Nine",
		rating: 1.5,
		num: 13,
	},
	costar: {
		inherit: true,
		onStart(pokemon) {
			for (const target of pokemon.foes()) {
				let i: BoostID;
				for (i in target.boosts) {
					pokemon.boosts[i] = target.boosts[i];
				}

				const volatilesToCopy = ['focusenergy', 'gmaxchistrike', 'laserfocus'];
				for (const volatile of volatilesToCopy) {
					if (target.volatiles[volatile]) {
						pokemon.addVolatile(volatile);
						if (volatile === 'gmaxchistrike') pokemon.volatiles[volatile].layers = target.volatiles[volatile].layers;
					} else {
						pokemon.removeVolatile(volatile);
					}
				}
				this.add('-ability', pokemon, 'Costar');
				this.add('-copyboost', pokemon, target, '[from] ability: Costar');
				return;
			}
		},
		desc: "On switch-in, the user will copy all stat boosts of the opposing pokemon.",
		shortDesc: "On switch-in, the user will copy all stat boosts of the opposing pokemon.",
	},
	// TODO: Test Cotton Down
	cottondown: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				this.add('-start', target, 'Cotton Down');
				source.addVolatile('cottondown');
			}
		},
		onFoeBeforeMove(source, target, move) {
			if (source.volatiles['cottondown']) {
				move.priority = -6;
			}
		},
		onFoeAfterMove(source, target, move) {
			if (source.volatiles['cottondown']) {
				this.add('-end', source, 'Cotton Down');
				source.removeVolatile('cottondown');
			}
		},
		desc: "If an opposing pokemon hits the user with a contact move, their next move will have a priority of -6.",
		shortDesc: "If hit by a contact move, opposing pokemon's next move will have a priority of -6.",
	},
	curiousmedicine: {
		inherit: true,
		onStart(pokemon) {
			for (const target of pokemon.foes()) {
				target.clearBoosts();
			}

			for (const ally of pokemon.allies()) {
				ally.heal(pokemon.baseMaxhp / 4);
			}
		},
		desc: "On switch-in, all stat changes will be set to 0, all ally Pokemon will gain 1/4 max HP.",
		shortDesc: "On switch-in, all stat changes will be set to 0, all allies will gain 1/4 max HP.",
	},
	cursedbody: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if(!source.volatiles['curse'] && this.checkMoveMakesContact(move, source, target)) {
				source.addVolatile('curse');
			}
		},
		condition: {
			onStart(pokemon, source) {
				this.add('-start', pokemon, 'Curse', '[of] ' + source);
			},
			onResidualOrder: 12,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 4);
			}
		},
		desc: "If a move makes contact with this pokemon, the opposing pokemon will be placed under a curse.",
		shortDesc: "If a move makes contact, the opposing pokemon will be placed under a curse."
	},
	cutecharm: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if(this.checkMoveMakesContact(move, source, target)){
				for(const opp of target.adjacentFoes()) {
					this.add('-ability', target, 'Cute Charm', 'boost');

					if(opp.volatiles['substitute']) {
						this.add('-immune', opp);
					} else {
						this.boost({atk: -1}, target, opp, null, true);
					}
				}
			}
		},
		desc: "When this pokemon gets hit by a contact move, it will lower the opposing side's attack by 1 stage",
		shortDesc: "If hit by a Contact move, it lowers the opposing side's Atk by 1 stage.",
	},
	damp: {
		onDamagingHit(damage, target, source, move) {
			 if(this.checkMoveMakesContact(move, source, target)) {
					this.add('-ability', target, 'Damp');
					if(source.getTypes().join() === 'Water' || !source.setType('Water')) {
						this.add('-fail', source);
						return null;
					}
					this.add('-start', source, 'typechange', 'Water')
			 }
		},
		desc: "If an opposing pokemon hits this pokemon with a contact move, their type is change to Water",
		shortDesc: "If Opposing Pokemon makes Contact with this Pokemon, Their type is change to Water.",
		isBreakable: true,
		name: "Damp",
		rating: 0.5,
		num: 6,
	},
	dazzling: {
		inherit: true,
		// Based on Steelworker
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if(move.type === 'Fairy') {
				this.debug('Dazzling boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, attacker, defender, move) {
			if(move.type === 'Fairy') {
				this.debug('Dazzling boost');
				return this.chainModify(1.5);
			}
		},
		desc: "Prevents priority moves used against this Pokemon or Allies. Fairy Type moves gain a 1.5x boost.",
		shortDesc: "Prevents Priorty moves used against this Pokemon. Fairy Type moves gain 1.5x boost.",
	},
	defeatist: {
		inherit: true,
		onModifyAtk(atk, pokemon) {
			if(pokemon.hp <= pokemon.maxhp / 4) {
				return this.chainModify(0.5);
			}
		},
		onModifySpA(atk, pokemon) {
			if(pokemon.hp <= pokemon.maxhp  / 4) {
				return this.chainModify(0.5);
			}
		},
		desc: "While this Pokemon has 1/4 or less of its maximum HP, its Attack and Special Attack are halved.",
		shortDesc: "While this Pokemon has 1/4 or less of its max HP, its Attack and Sp. Atk are halved.",
	},
	earlybird: {
		inherit: true,
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Early Bird');
			pokemon.addVolatile('earlybird');
		},
		condition: {
			noCopy: true,
			onStart(target) {
				this.add('-start', target, 'ability: Early Bird');
			},
			onModifyMove(move, pokemon, target) {
				move.priority = 1;
				this.debug('Early Bird boost');
				pokemon.removeVolatile('earlybird');
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Early Bird');
			}
		},
		desc: "Upon switch-in, the first move used will have +1 priority.",
		shortDesc: "First move upon switch-in has +1 prioirty.",
	},
	flowergift: {
		inherit: true,
		onAllyModifySpDPriority: undefined,
		onAllyModifySpD: undefined,
		onAllyModifySpAPriority: 4,
		onAllyModifySpA(atk, pokemon) {
			if (this.effectState.target.baseSpecies.baseSpecies !== 'Cherrim') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onAllyModifySpe(spe, pokemon) {
			if (this.effectState.target.baseSpecies.baseSpecies !== 'Cherrim') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		desc: "If this Pokemon is a Cherrim and Sunny Day is active, it changes to Sunshine Form and the Attack, Special Attack, and Speed of it and its allies are multiplied by 1.5. These effects are prevented if the Pokemon is holding a Utility Umbrella.",
		shortDesc: "If user is Cherrim and Sunny Day is active, it and allies' Attack, Sp. Atk and Speed are 1.5x.",
	},
	flowerveil: {
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			if(!pokemon.isActive) return;
			if(!pokemon.hp) return;
			if(['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				// Create a new Condition
				pokemon.side.addSideCondition('flowerveil', pokemon); 
			}
		},
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if(source?.hasItem('lightclay')) {
					return 8;
				}
				return 5;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if(target !== source && this.effectState.hasAlly(target)) {
					if((target.side.getSideCondition('reflect') && this.getCategory(move) === 'Physical') ||
						(target.side.getSideCondition('lightscreen') && this.getCategory(move) === 'Special')) {
							return;
						}
					if(!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Flower Veil weaken');
						if(this.activePerHalf > 1) return this.chainModify([2732, 4096]);
						return this.chainModify(0.5);
					}
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'ability: Flower Veil');
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 10,
			onSideEnd(side) {
				this.add('-sideend', side, 'ability: Flower Veil');
			}
		},
		name: "Flower Veil",
		isBreakable: true,
		rating: 0,
		num: 166,
		desc: "If Sunny Day is Active, Sets Flower Veil; For 5 turns, the user and its party members take 0.5x damage from physical and special attacks, or 0.66x damage if in a Double Battle; does not reduce damage further with Reflect or Light Screen. Critical hits ignore this protection. It is removed from the user's side if the user or an ally is successfully hit by Brick Break, Psychic Fangs, or Defog. Brick Break and Psychic Fangs remove the effect before damage is calculated. Lasts for 8 turns if the user is holding Light Clay. Fails unless the weather is Sun.",
		shortDesc: "For 5 turns, damage to allies halved. Sun only.",
	},
	forewarn: {
		inherit: true,
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			let highBPMove = undefined;
			for(let slot of attacker.moveSlots) {
				let _move = this.dex.moves.getByID(slot.id);
				if(highBPMove === undefined) highBPMove = _move;
				else if(highBPMove.basePower < _move.basePower) highBPMove = _move;
			}

			if(move.name === highBPMove?.name) {
				this.debug('Forewarn weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			let highBPMove = undefined;

			for(let slot of attacker.moveSlots) {
				let _move = this.dex.moves.getByID(slot.id);
				if(highBPMove === undefined) highBPMove = _move;
				else if(highBPMove.basePower < _move.basePower) highBPMove = _move;
			}

			if(move.name === highBPMove?.name) {
				this.debug('Forewarn weaken');
				return this.chainModify(0.5);
			}
		},
		desc: "The highest base power move of the opponent does half damage to the user.",
		shortDesc: "The highest BP move of the opposing pokemon does half damage.",
	},
	frisk: {
		inherit: true,
		onStart(pokemon) {
			for(const target of pokemon.foes()) {
				if(target.item) {
					this.add('-item', target, target.getItem().name, '[from] ability: Frisk', '[of] ' + pokemon, '[identify]');
				}
				const item = target.getItem();
				if(pokemon.hp && item.isBerry && pokemon.takeItem(target)) {
					this.add('-enditem', target, item.name, '[from] stealeat', '[ability] Frisk', '[of] ' + pokemon);
					if(this.singleEvent('Eat', item, null, pokemon, null, null)) {
						this.runEvent('EatItem', pokemon, null, null, item);
						if(item.id === 'leppaberry') target.staleness = 'external';
					}
					if(item.onEat) pokemon.ateBerry = true;
				}
			}
		},
		desc: "On switch-in this Pokemon identifies the held item of opposing Pokemon, If the held item is a Berry, it will steal the item and immediately eat it.",
		shortDesc: "Switch-in, identifies held items of opposing pokemon; Consumes any berries on those pokemon.",
	},
	fullmetalbody: {
		inherit: true,
		onTryHit(pokemon, target, move) {
			if(move.flags['bullet']) {
				this.add('-immune', pokemon, '[from] ability: Bulletproof');
				return null;
			}
		},
		desc: "Prevents other Pokemon from lowering this Pokemon's stat stages and is immune to Bullet and Ball moves.",
		shortDesc: "Prevents other Pokemon from lowering the user's stat stages; Also immune to Bullet/Ball Moves.",
	},
	galewings: {
		inherit: true,
		onModifyPriority(priority, pokemon, target, move) {
			if(move?.type === 'Flying' && pokemon.hp === (pokemon.maxhp / 2)) return priority + 1;
		},
		shortDesc: "If Hp is above 50% = Flying move have +1 priority.",
		desc: "As long as the Pokemon's HP is above 50%, all flying moves will be given +1 priority.",
	},
	healer: {
		inherit: true,
		onResidual(pokemon) {
			this.add('-activate', pokemon, 'ability: Healer');
			for(const ally of pokemon.allies()) {
				if(ally.status) {
					ally.cureStatus();
				}
			}
		},
		desc: "This Pokemon and it's allies will have its status cured at the end of the turn.",
		shortDesc: "This Pokemon and it's allies will have its status cured at the end of the turn.",
	},
	heatproof: {
		inherit: true,
		onSourceModifyAtkPriority: undefined,
		onSourceModifyAtk: undefined,
		onSourceModifySpAPriority: undefined,
		onSourceModifySpA: undefined,
		onDamage: undefined,
		// Immune to Fire-type moves
		onTryHit(target, source, move) {
			if (!(target !== source && move.type === 'Fire')) return;
			this.add('-immune', target, '[from] ability: Heatproof');
			return null;
		},
		// Immune to Burn
		onUpdate(pokemon) {
			if (pokemon.status !== 'brn') return;
			this.add('-activate', pokemon, 'ability: Heatproof');
			pokemon.cureStatus();
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move).status) {
				this.add('-immune', target, '[from] ability: Heatproof');
			}
		},
		desc: undefined,
		shortDesc: "Immune to Fire; Cannont be burned.",
	},
	heavymetal: {
		inherit: true,
		onModifyWeight: undefined,
		onModifyWeightPriority: undefined,
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if(move.flags['weight']) {
				return this.chainModify(1.3);
			}
		},
		desc: "All weight based moves will do 1.3x damage.",
		shortDesc: "All Weight-based Moves will do 1.3x more damage.",
	},
	hospitality: {
		inherit: true,
		onStart(pokemon) {
			this.heal(pokemon.baseMaxhp / 4, pokemon, pokemon);
			for (const ally of pokemon.adjacentAllies()) {
				this.heal(ally.baseMaxhp / 4, ally, pokemon);
			}
		},
		desc: undefined,
		shortDesc: "On Switch-in, restores allies and the user's HP by 1/4",
	},
	hustle: {
		inherit: true,
		onModifyAtkPriority: 5,
		onModifyAtk(atk, source, target, move) {
			if(move.accuracy !== 100) return this.modify(1.1, atk);
			else return this.modify(1.5, atk);
		},
		onSourceModifyAccuracyPriority: undefined,
		onSourceModifyAccuracy: undefined,
		desc: undefined,
		shortDesc: "Boost Atk by 1.1x, but moves that are not 100% accurate, boosts Atk by 1.5x.",
	},
	hydration: {
		inherit: true,
		onWeather(target, source, effect) {
			if(target.hasItem('utilityumbrella')) return;
			if(effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.heal(target.baseMaxhp / 16);
				if(target.status) {
					target.cureStatus();
				}
			}
		},
		desc: "If Rain is active, 1/16th of Max HP will be restored and cures status at the end of the turn.",
		shortDesc: "If Rain = recovers 1/16th of max HP; Cures status at the end of the turn."
	},
	icebody: {
		inherit: true,
		onWeather(target, source, effect) {
			if(effect.id === "hail" || effect.id === 'snow') {
				this.heal(target.baseMaxhp / 8);
			}
		},
		desc: "If Snow is active, this Pokemon restores 1/8 of its maximum HP, rounded down, at the end of each turn.",
		shortDesc: "If Snow is active, this Pokemon heals 1/8 of its max HP each turn.",
	},
	illuminate: {
		inherit: true,
		onTryBoost: undefined,
		onModifyMove(move) {
			if(move.flags['light']) {
				move.ignoreEvasion = true;
				move.accuracy = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, source, target, move) {
			if(move.flags['light']) {
				return this.chainModify(1.3);
			}
		},
		desc: "Light-based moves will have 1.3x boost in power and will be perfectly accurate.",
		shortDesc: "Light-based moves will have 1.3x boost in power and will not miss.",
	},
	innerfocus: {
		inherit: true,
		onModifyMove(move) {
			if(move.id == 'focuspunch') {
				move.condition = {
					duration: 1,
					onStart(pokemon) {
						this.add('-singleturn', pokemon, 'move: Focus Punch');
					},
					onTryAddVolatile(status, pokemon) {
						if(status.id === 'flinch') return null;
					}
				}
			}
			if(move.id === 'focusblast') {
				move.accuracy = true;
			}
		},
		desc: "This Pokemon cannot be made to flinch. Focus Punch can not be broken, nor can Focus blast miss.",
		shortDesc: "This Pokemon can not be made to flinch; Focus Punch can't be broken;Focus Blast can't miss.",
	},
	ironfist: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if(move.flags['punch']) {
				this.debug('Iron Fist boost');
				return this.chainModify(1.3);
			}
		},
		desc: "This Pokemon's punch-based attacks have their power multiplied by 1.3.",
		shortDesc: "This Pokemon's punch-based attacks have 1.3x power. Sucker Punch is not boosted.",
	},
	keeneye: {
		inherit: true,
		onTryBoost: undefined,
		onModifyMove(move) {
			move.accuracy = true;
		},
		desc: "Any moves used by the user does not have an accuracy check.",
		shortDesc: "Moves by this user doesn't have have an accuracy check.",
	},
	leafguard: {
		inherit: true,
		onSetStatus: undefined,
		onTryAddVolatile: undefined,
		onModifyDefPriority: 6,
		onModifyDef(def, attacker, defender, move) {
			if(['sunnyday', 'desolateland'].includes(defender.effectiveWeather())) {
				return this.chainModify(1.3);
			}
		},
		onModifySpDPriority: 6,
		onModifySpD(def, attacker, defender, move) {
			if(['sunnyday', 'desolateland'].includes(defender.effectiveWeather())) {
				return this.chainModify(1.3);
			}
		},
		desc: "If Sun is active, Defense and SpDefense are boosted by 1.3x",
		shortDesc: "If Sun is active, Defense and SpDefense are boosted by 1.3x",
	},
	limber: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if(move.type == "Steel") {
				return this.chainModify(2);
			}
			else if(this.checkMoveMakesContact(move, source, target)) {
				return this.chainModify(0.5);
			}
		},
		onUpdate: undefined,
		onSetStatus: undefined,
		desc: "This pokemon takes 2x more damage from steel types; Takes 1/2 from any move that makes contact.",
		shortDesc: "Takes 2x more damage from Steel moves; Takes 1/2 from Contact moves.",
	},
	magmaarmor: {
		inherit: true,
		onUpdate: undefined,
		onImmunity: undefined,
		onCriticalHit: false,
		onSourceModifyDamage(damage, source, target, move) {
			if(['Water', 'Ice'].includes(move.type)) {
				return this.chainModify(0.75);
			}
		},
		desc: "Ice & Water Type moves do 75% less damage to the user and user is unable to be crited.",
		shortDesc: "Ice & Water Type moves do 75% less damage to the user and can't be crited.",
	},
	moldbreaker: {
		inherit: true,
		onModifyDamage(damage, source, target, move) {
			if(target.types.includes('Water')) {
				return this.chainModify(1.2);
			}
		},
		desc: "This Pokemon's moves and their effects ignore certain Abilities of other Pokemon. Does 1.2x more damage to Water-Type Pokemon.",
		shortDesc: "This Pokemon's moves and their effects ignore the Abilities of other Pokemon; Does 1.2x more damage to Water-Type Pokemon.",
	},
	motordrive: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && move.type == 'Electric') {
				if (!this.boost({spe: 2})) {
					this.add('-immune', target, '[from] ability: Motor Drive');
				}
				return null;
			}
		},
		desc: "This Pokemon is immune to Electric-type moves and raises its Speed by 2 stages when hit by an Electric-type move.",
		shortDesc: "This Pokemon's Speed is raised 2 stages if hit by an Electric move; Electric immunity;",
	},
	mummy: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			const sourceAbility = source.getAbility();
			if (sourceAbility.isPermanent || sourceAbility.id === 'mummy') {
				const oldAbility = source.setAbility('mummy', target);
				if(oldAbility) {
					this.add('-activate', target, 'ability: Mummy', this.dex.abilities.get(oldAbility).name, '[of] ' + source);
					target.addVolatile('partiallytrapped');
				}
			}
		},
		desc: "Contact with this Pokemon spreads this ability and applies Wrap to the Attacker.",
		shortDesc: "Contact with this Pokemon spreads this ability and applies Wrap to the Attacker.",
	},
	myceliummight: {
		inherit: true,
		// Status condition inflicition is implemented in sim/pokemon.ts:#setStatus
		onModifyMove (move, source, target) {
			if (move.category === 'Status') {
				move.accuracy = true;
			}
		},
		desc: "Status moves always go last, but always hit regardless of typing or ability",
		shortDesc: "Status moves always go last, but always hit regardless of typing or ability"
	},
	noguard: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			return this.boost({ atk: 1});
		},
		desc: "Every moves used by or against the Pokemon will always hit. If the user is hit by a move, it's Attack will raise by 1 stage.",
		shortDesc: "Every move used by or against this Pokemon always hit. If hit, Attack is raised by 1 stage."
	},
	normalize: {
		inherit: true,
		onBasePower(basePower, pokemon, target, move) {
			if(move.typeChangerBoosted === this.effect) return this.chainModify(1.5);
		},
		desc: "This Pokemon's moves are changed to be Normal type and have their power multiplied by 1.5. This effect comes before other effects that change a move's type.",
		shortDesc: "This Pokemon's moves are changed to be Normal type and have 1.5x power.",
	},
	oblivious: {
		inherit: true,
		onUpdate: undefined,
		onImmunity: undefined,
		onTryHit: undefined,
		onTryBoost: undefined,
		onAfterMove(source, target, move) {
			move.pp += 1;
		},
		desc: "This ability allow PP to not be consumed when using a move.",
		shortDesc: "This ability allow PP to not be consumed when using a move.",
	},
	overcoat: {
		inherit: true,
		onModifyDefPriority: 5,
		onModifyDef(def, attacker, defender, move) {
			if(this.field.isWeather('sandstorm')) {
				return this.chainModify(1.2);
			}
		},
		onModifySpDPriority: 5,
		onModifySpD(def, attacker, defender, move) {
			if(this.field.isWeather('sandstorm')) {
				return this.chainModify(1.2);
			}
		},
		desc: "",
		shortDesc: "Immune to Powder/Snow/Sand;If in Sandstorm, Def and SpD. are increased by 1.2x",
	},
	owntempo: {
		inherit: true,
		onUpdate: undefined,
		onTryAddVolatile: undefined,
		onHit: undefined,
		onFoeModifyPriority(prior, source, target, move) {
			move.priority = 0;
		},
		onModifyPriority(prior, source, target, move) {
			move.priority = 0;
		},
		desc: "All priority moves used by this Pokemon or the opposing Pokemon will be placed on the 0 priority bracket.",
		shortDesc: "All priority moves used by or against this pokemon will have 0 priority.",
	},
	pastelveil: {
		inherit: true,
		onStart: undefined,
		onUpdate: undefined,
		onAllySwitchIn: undefined,
		onSetStatus: undefined,
		onAllySetStatus: undefined,
		onModifySpe(spe, pokemon) {
			if(['psn', 'tox'].includes(pokemon.status)) {
				return this.chainModify(1.5);
			}
		},
		desc: "If this pokemon is poisoned, its speed is increased by 1.5x and will not receive damage from the poisoning.",
		shortDesc: "If Poisoned, Speed increased by 1.5x; Immune to PSN and TOX Damage.",
	},
	pickpocket: {
		inherit: true,
		onFoeModifyDamage(damage, source, target, move) {
			if(this.checkMoveMakesContact(move, target, source)) {
				return this.chainModify(1.2);
			}
		},
		onDamagingHit(damage, target, source, move) {
			if(!this.checkMoveMakesContact(move, source, target)) return;
			if(source.item) return;
			const yourItem = target.takeItem(source);
			if(!yourItem) return;
			if(!source.setItem(yourItem)) {
				target.item = yourItem.id // bypass setItem so we don't break choicelock or anything
				return;
			}
			this.add('-item', source, yourItem, '[from] ability: Pickpocket', '[of] ' + target);
		},
		onAfterMoveSecondary: undefined,
		desc: "When a Pokemon with this Ability is hit by a move that makes contact, the move will deal 1.2x more damage. The Pokemon will also steal the attacking Pokemon's item if not holding an item.",
		shortDesc: "User takes 1.2x more damage when hit with a Contact Move; Steals the attacking Pokemon's Item if not holding one.",
	},
	pickup: {
		inherit: true,
		onResidualOrder: undefined,
		onResidualSubOrder: undefined,
		onResidual: undefined,
		// Code is a modified court change
		onStart(pokemon) {
			const sideConditions = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'gmaxcannonade', 'gmaxvinelash', 'gmaxwildfire',
			];
			let success = false;
			if(this.gameType === "freeforall") {
				// random integer from 1-3 inclusive
				const offset = this.random(3) + 1;
				// the list of all sides in counterclockwise order
				const sides = [this.sides[0], this.sides[2]!, this.sides[1], this.sides[3]!];
				const temp: {[k: number]: typeof pokemon.side.sideConditions} = {0: {}, 1: {}, 2: {}, 3: {}};
				for (const side of sides) {
					for (const id in side.sideConditions) {
						if(!sideConditions.includes(id)) continue;
						temp[side.n][id] = side.sideConditions[id];
						delete side.sideConditions[id];
						const effectName = this.dex.conditions.get(id).name;
						this.add('-sideend', side, effectName, '[silent]');
						success = true;
					}
				}
				for (let i = 0; i < 4; i++) {
					const sourceSideConditions = temp[sides[i].n];
					const targetSide = sides[(i + offset) % 4];
					for (const id in sourceSideConditions) {
						targetSide.sideConditions[id] = sourceSideConditions[id];
						const effectName = this.dex.conditions.get(id).name;
						let layers = sourceSideConditions[id].layers || 1;
						for (; layers > 0; layers--) this.add('-sidestart', targetSide, effectName, '[silent]');
					}
				}
			} else {
				const sourceSideConditions = pokemon.side.sideConditions;
				const targetSideConditions = pokemon.side.foe.sideConditions;
				const sourceTemp: typeof sourceSideConditions = {};
				const targetTemp: typeof targetSideConditions = {};
				for (const id in sourceSideConditions) {
					if (!sideConditions.includes(id)) continue;
					sourceTemp[id] = sourceSideConditions[id];
					delete sourceSideConditions[id];
					success = true;
				}
				for (const id in targetSideConditions) {
					if(!sideConditions.includes(id)) continue;
					targetTemp[id] = targetSideConditions[id];
					delete targetSideConditions[id];
					success = true;
				}
				for (const id in sourceTemp) {
					targetSideConditions[id] = sourceTemp[id];
				}

				// We will skip over adding the hazards to our side since we are only transfering them over.
				this.add('-swapsideconditions');
			}
			if (!success) return false;
			this.add('-activate', pokemon, 'ability: Pickup');
		},
		desc: "When switch-in, transfers any hazards on the user's side of the field to the opposing side.",
		shortDesc: "When switch-in, transfers any hazards on the user's side to the opposing side.",
	},
	powerofalchemy: {
		inherit: true,
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (["Fire", "Ice", "Electric"].includes(move.type)) {
				return this.chainModify(1.2);
			}
		},
		desc: "Powers up Fire, Ice, & Electirc type moves by 1.2x",
		shortDesc: "Powers up Fire, Ice, & Electric type moves by 1.2x",
	},
	queenlymajesty: {
		inherit: true,
		onStart(pokemon) {
			for (const foe of pokemon.side.foes()) {
				foe.addVolatile('taunt');
			}
		},
		desc: "Priority moves used by opposing Pokemon targeting this pokemon or its allies are prevented from having an effect. When switch-in, taunts all opposing pokemon.",
		shortDesc: "This Pokemon taunts opposing Pokemon on switch-in, and Prevents the use of priority moves against this Pokemon.",
	},
	quickdraw: {
		inherit: true,
		onBasePowerPriority: 25,
		onBasePower(basePower, attacker, defender, move) {
			if(move.flags['blast']) {
				this.debug('Quick Draw boost');
				return this.chainModify(1.3);
			}
		},
		desc: "Blast moves deal 1.3x more damage",
		shortDesc: "Blast moves deal 1.3x more damage",
	},
	raindish: {
		inherit: true,
		onSwitchIn(pokemon) {
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				pokemon.heal(pokemon.baseMaxhp / 4);
			}
		},
		desc: "If rain is activate, when the user switches out, the pokemon switching in, will heal 25% of their max hp.",
		shortDesc: "If Rain; When switching out, the next Pokemon switching in will heal 25% of their max hp.",
	},
	receiver: {
		inherit: true,
		onAllyFaint: undefined,
		onModifySpe(spe, pokemon) {
			if (pokemon.hp == (pokemon.maxhp / 2)) {
				this.chainModify(2);
			}
		},
		desc: "Increases speed by 2x when the user is at 50% or less hp.",
		shortDesc: "Speed increases by 2x when at 50% or less hp.",
	},
	rivalry: {
		inherit: true,
		onBasePowerPriority: undefined,
		onBasePower: undefined,
		onModifyDamage(dmg, source, target, move) {
			for (const type of target.types) {
				if (source.hasType(type)) {
					return this.chainModify(1.2);
				}
			}
		},
		desc: "If the user shares a type with the Opposing Pokemon, it will deal 1.2x more damage",
		shortDesc: "If user shares a type with the Opposing Pokemon, it will deal 1.2x more damage",
	},
	rockypayload: {
		inherit: true,
		onModifyAtkPriority: undefined,
		onModifyAtk: undefined,
		onModifySpAPriority: undefined,
		onModifySpA: undefined,
		onAnyDamage(damage, target, source, effect) {
			if (effect && effect.name === 'Stealth Rock') {
				return false;
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Rock') {
				move.accuracy = true;
				if (!target.addVolatile('rockypayload')) {
					this.add('-immune', target, '[from] ability: Rocky Payload');
				}
				return null;
			}
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('rockypayload');
		},
		condition: {
			noCopy: true,
			onStart(target) {
				this.add('-start', target, 'ability: Rocky Payload');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Rock' && attacker.hasAbility('rockypayload')) {
					this.debug('Rocky Payload boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Rock' && attacker.hasAbility('rockypayload')) {
					this.debug('Rocky Payload boost');
					return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Rocky Payload', '[silent]');
			}
		},
		desc: "Immunity to Rock-type Moves and Stealth Rock. Powers up Rock-type moves if hit by a Rock-type move.",
		shortDesc: "Immunity to Rock-type Moves and Stealth Rock. Powers up Rock-type moves if hit by a Rock-type move.",
	},
	runaway: {
		inherit: true,
		onModifyPriority(prioirty, pokemon, target, move) {
			if (move?.flags['pivot']) return prioirty + 3;
		},
		desc: "All pivot moves have +3 priority.",
		shortDesc: "All Pivot moves have +3 priority.",
	},
	sandspit: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if(move.category === "Physical") {
				// Set Sandstorm
				this.field.setWeather('sandstorm');
				// Lower Attack
				this.boost({ atk: -1}, source);
			}

		},
		desc: "If the user gets hit by a Physical move, a sandstorm is created, and the attacker's Attack will drop by 1 stage.",
		shortDesc: "If hit by a Physical Move; Creates a Sandstorm; Lowers the Attacker's Attack by 1 stage.",
	},
	sandveil: {
		inherit: true,
		onImmunity: undefined,
		onModifyAccuracy: undefined,
		onModifyAccuracyPriority: undefined,
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if(effect.id === 'sandstorm') {
				target.side.foe.addSideCondition('stealthrock');
			}
		},
		desc: "If sandstorm is activated, Stealth Rock are placed on the opposing side.",
		shortDesc: "If Sandstorm; Stealth Rock are placed on the opposing Side.",
	},
	seedsower: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			source.addVolatile('leechseed');
		},
		desc: "Applies Leech Seed to the Attacking Pokemon. This ability is under the rules of Leech Seed, meaning that it will fail if the Attacking Pokemon is a grass type, or already has leech seed.",
		shortDesc: "Applies Leech Seed to the Attacking Pokemon.",
	},
	shedskin: {
		inherit: true,
		onResidual(pokemon) {
			if(pokemon.hp && pokemon.status && this.randomChance(33, 100)) {
				this.debug('shed skin');
				this.add('-activate', pokemon, 'ability: Shed Skin');
				pokemon.cureStatus();
				this.boost({ spe: 1 }, pokemon);
			}
		},
		desc: "This Pokemon has a 33% chance to have its non-volatile status condition cured at the end of each turn, and increases Speed by 1 stage.",
		shortDesc: "This Pokemon has a 33% chance to cure its status at the end of each turn, and increase Speed by 1 stage.",
	},
	// TODO: Need to test the different events to confirm which ones are needed.
	shielddust: {
		inherit: true,
		onAnyDamage(damage, target, source, effect) {
			const hazards = ['spikes', 'stealthrock'];
			if (hazards.includes(effect.id)) {
				return false;
			}
		},
		onSetStatus(status, target, source, effect) {
			if (['toxicspikes'].includes(effect.id)) {
				return false;
			}
		},
		desc: "Immunity to Entry Hazards; This Pokemon is not affected by the secondary effect of another Pokemon's attack.",
		shortDesc: "Immune to Entry Hazards; This Pokemon is not affected by the secondary effect of another Pokemon's attack.",
	},
	silentwater: {
		inherit: true,

		//#region Removing Misty Surge from the ability
		onStart: undefined,
		//#endregion

		//#region Damp
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				this.add('-ability', target, 'Damp');
				if(source.getTypes().join() === 'Water' || !source.setType('Water')) {
					this.add('-fail', source);
					return null;
				}
				this.add('-start', source, 'typechange', 'Water');
			}
		},
		//#endregion
		desc: "Storm Drain + Damp",
		shortDesc: "Storm Drain + Damp",
	},
	snowcloak: {
		inherit: true,
		onModifyAccuracyPriority: undefined,
		onModifyAccuracy: undefined,
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (['hail', 'snow'].includes(target.effectiveWeather())) {
				target.side.addSideCondition('auroraveil');
				this.add('-activate', target, 'ability: Snow Cloak');
			}
		},
		desc: "If Snow is activate, The user will automatically set an Aurora Veil for 5 turns.",
		shortDesc: "If Snow is active, this Pokemon will set Aurora Veil.",
	},
	solidrock: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if(target.getMoveHitData(move).typeMod > 0) {
				this.debug('Solid Rock neutralize');
				if (target.effectiveWeather() === 'sandstorm') {
					return this.chainModify(0.50);
				}
				else return this.chainModify(0.75);
			}
		},
		desc: "This Pokemon receives 3/4 damage from supereffective attacks. If Sand is active, the reduction becomes 1/2",
		shortDesc: "If Sand is active, receives 1/2 damage from supereffective attacks, else 3/4 from supereffective attacks.",
	},
	stall: {
		inherit: true,
		onFractionalPriority: undefined,
		onResidualOrder: 5,
		onResidualSubOrder:3,
		onAfterMove(source, target, move) {
			if(!['Physical', 'Special'].includes(move.category)) {
				this.effectState.canHeal = true;
			} else this.effectState.canHeal = false;
		},
		onResidual(pokemon) {
			if(pokemon.hp && this.effectState.canHeal) {
				this.debug('stall');
				this.add('-activate', pokemon, 'ability: Stall');
				pokemon.heal(pokemon.maxhp / 16);
			}
		},
		desc: "The user recovers 1/16th of it's Max HP at the end of the turn, if it used a Status move.",
		shortDesc: "If used a Status move, heals 1/16th of Max HP at the end of the turn.",
	},
	stalwart: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (!move.flags['charge']) return;
			this.attrLastMove('[still]');
			this.addMove('-anim', attacker, move.name, defender);
			return;
		},
		onModifyMove(move, pokemon, target) {
			if (!move.flags['charge']) return;
			move.pp -= 1;
		},
		desc: "Moves that require 2 turns to use, require 1 turn to use, but requires an extra PP.",
		shortDesc: "Moves that require 2 turns to use, require 1 turn to use, but requires an extra PP.",
	},
	steadfast: {
		inherit: true,
		onFlinch: undefined,
		onSwitchIn(pokemon) {
			this.effectState.switchingIn = true;
		},
		onStart(pokemon) {
			if (!this.effectState.switchingIn) return;
			const target = pokemon.side.foe.active[pokemon.side.foe.active.length - 1 - pokemon.position];
			if (target) {
				this.boost({ atk: target.positiveBoosts() }, pokemon);
			}
		},
		desc: "Upon Switch-In, gains +1 atk boost per Positive Boost that the opposing Pokemon has.",
		shortDesc: "Upon Switch-In, gains +1 ATK Boost per Positive Boost that the Opposing Pokemon has.",
	},
	stentch: {
		inherit: true,
		onModifyMovePriority: undefined,
		onModifyMove: undefined,
		onDamagingHit(damage, target, source, move) {
			if (!this.checkMoveMakesContact(move, source, target)) return;
			if (source && source !== target && source.hp && target.hp && move) {
				if(!source.isActive || !this.canSwitch(source.side) || source.forceSwitchFlag || target.forceSwitchFlag) {
					return;
				}
			}
			if(this.runEvent('DragOut', source, target, move)) {
				source.forceSwitchFlag = true;
			}
		},
		desc: "If the opposing Pokemon hits the user with a Contact move, forces the Opposing Pokemon to be swapped with a random Pokemon.",
		shortDesc: "If Hit by a Contact Move, Forces the Opposing Pokemon out.",
	},
	suctioncups: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if (!this.activeMove) throw new Error('Battle.activeMove is null');
			if (!pokemon.hp || pokemon.item === 'stickybarb') return;
			if ((source && source !== pokemon) || this.activeMove.id === 'knockoff') {
				this.add('-activate', pokemon, 'ability: Suction Cups');
				this.boost({spe: -1, def: 1, spd: 1}, pokemon);
				return false;
			}
		},
		onDragOut(pokemon) {
			this.add('-activate', pokemon, 'ability: Suction Cups');
			this.boost({spe: 1, def: 1, spd: 1}, pokemon);
			return null;
		},
		desc: "This Pokemon can not lose its held item and connot be forced out. If attempted to be forced out this Pokemon will have its speed decreased by 1 stage by its defense and special defense will raise by 1 stage.",
		shortDesc: "This Pokemon can not be Forced out or Lose its held item, if the opposing Pokemon tries, the user will loses 1 stage of Speed, but gains 1 stage of Def and SpD.",
	},
	swarm: {
		inherit: true,
		onStart(pokemon) {
			this.field.setTerrain('swarmterrain');
		},
		shortDesc: "Sets up a terrain the prevents the other side from using Boosting Moves.",
	},
	sweetveil: {
		inherit: true,
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Sweet Veil', 'boost');
					activated = true;
				}
				if(target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({ evasion: -1}, target, pokemon, null, true);
				}
			}
		},
		desc: "Upon Switch-in, the opposing Pokemons' evasion will drop 1 stage. This Pokemon and It's allies cannot be put to sleep",
		shortDesc: "Upon Switch-in, the opposing Pokemons' evasion will drop by 1 stage. The user's side can not be put to sleep.",
	},
	symbiosis: {
		inherit: true,
		onAllyAfterUseItem: undefined,
		onAnyAfterMove(source, target, move) {
			if (!target.hp || !source.hp) return; 
			for (const targetMove of target.moveSlots) {
				if (targetMove.id == move.id) {
					this.attrLastMove('[still]');
					this.addMove('-anim', target, move.name, source);
					return;
				}
			}
		},
		// TODO: NEEDS TO BE HEAVILY TESTED
		desc: "NEEDS TO BE TESTED ASAP",
		shortDesc: "NEEDS TO BE TESTED ASAP",
	},
	tangledfeet: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if(!move.flags['kick']) return;

			move.secondary = {
				chance: 33,
				status: 'par',
			};
		},
		desc: "All kicking moves have a 33% chance to cause paralysis.",
		shortDesc: "All kicking moves have a 33% chance to cause paralysis.",
	},
	tanglinghair: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if(!move.flags['contact']) return;
			move.secondary = {
				chance: 33,
				status: 'par',
			};
		},
		desc: "Contact moves has a 33% chance to paralysis.",
		shortDesc: "Contact moves has a 33% chance to paralysis.",
	},
	telepathy: {
		inherit: true,
		onAllyTryHitSide(target, source, move) {
			this.add('-immune', this.effectState.target, '[from] ability: Telepathy');
		},
		onTryHit(target, source, move) {
			if (target === source) return;
			const moveList = target.moveSlots;

			for (const _move of moveList) {
				if (move.id === _move.id) {
					this.add('-immune', target, '[from] ability: Telepathy');
					return null;
				}
			}
		},
		desc: undefined,
		shortDesc: "Takes No Damage From Allies; Takes no Damage if shares the move that is being used against it.",
	},
	teravolt: {
		inherit: true,
		onModifyMove(move) {
			// Ignore Ability
			move.ignoreAbility = true;

			// Electric Immunity Removal
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Electric'] = true;
			}
		},
		desc: "Ignores the ability of the opposing Pokemon; Electric-type moves can hit Ground-types.",
		shortDesc: "Ignores the ability of the opposing Pokemon; Electric-type moves can hit Ground-types.",
	},
	toxicboost: {
		inherit: true,
		onDamage(damage, target, source, effect) {
			if (effect.effectType === 'Move') return;
			if (effect.effectType === 'Status' && ['psn', 'tox'].includes(effect.id)) {
				return false;
			}
		},
		desc: "While this Pokemon is poisoned, the power of its physical attacks is multiplied by 1.5; Also immune to the Poison Damage.",
		shortDesc: "While this Pokemon is poisoned, its physical attacks have 1.5x power; Immune to poison damage.",
	},
	truant: {
		inherit: true,
		onModifyMove(move) {
			if(move.flags['contact']) delete move.flags['protect'];
		},
		desc: "This Pokemon skips every other turn instead of using a move excpet for healing moves. Moves also always bypasses protection.",
		shortDesc: "This Pokemon skips every other turn instead of using a move except for healing moves. Moves bypasses protection.",
	},
	turboblaze: {
		inherit: true,
		onModifyMove(move) {
			// Ignore Abilities
			move.ignoreAbility = true;
		},
		onBasePower(num, source, target, move) {
			if(move.type === 'Fire') {
				return this.chainModify(1.2);
			}
		},
		desc: "Ignores the ability of Opposing Pokemon; Fire-type moves have 1.2x more power, regardless of weather.",
		shortDesc: "Ignores the ability of Opposing Pokemon; Fire-type moves have 1.2x more power, regardless of weather.",
	},
	unnerve: {
		inherit: true,
		onPreStart: undefined,
		onEnd: undefined,
		onFoeTryEatItem: undefined,
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if(!activated) {
					this.add('-ability', pokemon, 'Unnerve', 'boost');
					activated = true;
				}
				if(target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({ spa: -1 }, target, pokemon, null, true);
				}
			}
		},
		desc: "On switch-in, this Pokemon lowers the Special Attack of opposing Pokemon by 1 stage.",
		shortDesc: "On switch-in, this Pokemon lowers the Special Attack of opponents by 1 stage.",
	},
	vitalspirit: {
		inherit: true,
		onUpdate: undefined,
		onSetStatus: undefined,
		onTryAddVolatile: undefined,
		onDamagingHit(damage, target, source, effect) {
			this.boost({ atk: 1 });
		},
		desc: "This Pokemon's Attack is raised by 1 stage after it is damaged by a move.",
		shortDesc: "This Pokemon's Special Attack is raised by 1 stage after it is damaged by a move.",
	},
	wanderingspirit: {
		inherit: true,
		onDamagingHit: undefined,
		onStart(pokemon) {
			this.field.addPseudoWeather('trickroom');
		},
		desc: "Upon switch-in, Trick Room is activated!",
		shortDesc: "Upon switch-in, Trick Room is activated!",
	},
	waterveil: {
		inherit: true,
		onUpdate: undefined,
		onSetStatus: undefined,
		onModifySpD(def, target, source, move) {
			if (!['raindance', 'primordialsea'].includes(this.field.effectiveWeather())) return;
			return this.chainModify(1.5);
		},
		desc: "This Pokemon gains 1.5x Special Defense while Rain is Active.",
		shortDesc: "This Pokemon gains 1.5x Special Defense while Rain is Active.",
	},
	whitesmoke: {
		inherit: true,
		onTryBoost: undefined,
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-activate', pokemon, 'ability: White Smoke');
					activated = true;
				}
				if(target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					target.addVolatile('torment');
				}
			}
		},
		desc: "Upon Switch-in, Applies Torment to opposing Pokemon.",
		shortDesc: "Upon Switch-in, Applies Torment to opposing Pokemon.",
	},
	wonderskin: {
		inherit: true,
		onModifyAccuracyPriority: undefined,
		onModifyAccuracy: undefined,
		onFoeModifyMove(move, pokemon, target) {
			if (!(move.secondary || move.secondaries)) return;
			if(move.secondary && move.secondary.chance) {
				move.secondary.chance = Math.floor(move.secondary.chance / 2);
			}
			if(move.secondaries) {
				for (const sec of move.secondaries) {
					if (sec.chance) {
						sec.chance = Math.floor(sec.chance / 2);
					}
				}
			}
		},
		desc: "Any moves against this Pokemon will have their chance of secondary effects halved.",
		shortDesc: "Any moves against this Pokemon will have their chance of secondary effects halved.",
	},
	// New Abilities
	allergies: {
		name: "Allergies",
		desc: "If hit with a powder move, Special Attack is drastically boosted (3 Stages)",
		shortDesc: "If hit with a powder move, Special Attack is drastically boosted (3 Stages)",
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (move.flags['powder'] && target !== source && this.dex.getImmunity('powder', target)) {
				this.boost({ spa: 3});
			}
		},
		rating: 2,
		num: -2001,
	},
	// TODO: Implement ability after getting clarification on it.
	coldblooded: {
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
			else if (move.type === 'Ice') {
				this.debug('Thick Fat strengthen');
				return this.chainModify(1.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
			else if (move.type === 'Ice') {
				this.debug('Thick Fat strengthen');
				return this.chainModify(1.5);
			}
		},
		onSourceAfterMove(source, target, move) {
			if (move.type === "Fire") return this.boost({ spe: 1 }, target, source, move);
			else if (move.type === "Ice") return this.boost({ spe: -1 }, target, source, move);
		},
		name: "Cold-Blooded",
		rating: 3,
		num: -2002,
		shortDesc: "Hit by Fire-type Moves=+1 Spe, Takes 1/2 damage; Hit by Ice-type Moves=-1 Spe, Takes 1.5x damage.",
	},
	emulate: {
		name: "Emulate",
		desc: "Copies the ability of the Pokemon that it's being switched in with.",
		shortDesc: "Copies the ability of the Pokemon it's being switched in with.",
		onAllySwitchOut(pokemon) {
			if (!this.effectState.target.hp) return;
			const ability = pokemon.getAbility();
			const additionalBannedAbilities = [
				'noability'
			];
			if (pokemon.getAbility().isPermanent || additionalBannedAbilities.includes(pokemon.ability)) return;
			if (this.effectState.target.setAbility(ability)) {
				this.add('-ability', this.effectState.target, ability, '[from] ability: Emulate', '[of] ' + pokemon);
			}
 		}
	},
	fieldsupport: {
		name: "Field Support",
		desc: "Multi-turn field move last 8 turns",
		shortDesc: "Multi-turn field move last 8 turns",
		onModifyMove(move) {
			if (move.pseudoWeather) {
				if (move.condition) {
					move.condition.duration = 8;
				}
			}
			if (move.sideCondition) {
				if(move.condition) {
					if(move.condition.duration) {
						move.condition.duration = 8;
					}
				}
			}
		},
	},
	gravecounter: {
		onTryHit(target, source, move) {
			if(!target.runImmunity(move.type)) {
				this.damage((source.maxhp / 16), source, target);
				return false;
			}
		},
		name: "Grave Counter",
		shortDesc: "When this Pokemon is attacked by a move it is immune to, deal 1/16th of the attacker's max Hp to the attacker.",
		rating: 2.0,
	},
	hauntedlight: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === "Ghost") {
				this.debug('Haunted Light boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === "Ghost") {
				this.debug('Haunted Light boost');
				return this.chainModify(1.5);
			}
		},
		name: "Haunted Light",
		shortDesc: "Increase Atk and Sp.Atk by 1.5 when using a Ghost-type move.",
		rating: 4,
	},

	// New Trio Abilities
	knowledge: {

		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon, target, move) {
			// Analytic
			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (this.queue.willMove(target)) {
					boosted = false;
					break;
				}
			}
			if (boosted) {
				this.debug('Knowledge boost');
				this.chainModify([5325, 4096]);
			}
			// Power of Alchemy
			if (["Fire", "Ice", "Electric"].includes(move.type)) {
				return this.chainModify(1.2);
			}
		},

		name: "Knowledge",
		shortDesc: "Analytic + Power of Alchemy",
		rating: 4,
	},

};
