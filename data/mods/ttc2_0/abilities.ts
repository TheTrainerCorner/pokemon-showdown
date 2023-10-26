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
};
