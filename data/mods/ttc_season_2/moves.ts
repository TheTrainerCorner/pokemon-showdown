export const Moves: {[k: string]: ModdedMoveData} = {
	synchronoise: {
		inherit: true,
		pp: 5,
	},
	leechlife: {
		inherit: true,
		flags: {bite: 1, contact: 1, mirror: 1, heal: 1},
	},
	guidingblessing: {
		inherit: true,
		condition: {
			duration: 2,
			onStart(pokemon, source) {
				this.add('-singleturn', pokemon, 'Guiding Blessing', '[of]' + source);
				this.effectState.hp = source.maxhp / Math.floor(3/4);
			},
			onResidualOrder: 4,
			onEnd(target) {
				if (target && !target.fainted) {
					const damage = this.heal(this.effectState.hp, target, target);
					if (damage) {
						this.add('-heal', target, target.getHealth, '[from] move: Guiding Blessing', '[blesser]' + this.effectState.source.name);
					}
				}
			}
		},
		desc: "When the move is used, its effects take place at the end of the next turn (like wish). It heals the recipient for 75% of their hp.",
		shortDesc: "Next Turn; Heal 3/4 of max hp",
	},
	doubleironbash: {
		inherit: true,
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
		desc: "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit. Has a 10% chance to make the target flinch.",
		shortDesc: "Hits twice. 10% chance to make the target flinch."
	},
	octazooka: {
		inherit: true,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		ignoreAbility: true,
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Cool",
		self: undefined,
		desc: "This move becomes a physical attack if the user's Attack is greater than its Special Attack, including stat stage changes. This move and its effects ignore the Abilities of other Pokemon.",
		shortDesc: "Physical if user's Atk > Sp. Atk. Ignores Abilities.",
	},
	smitepath: {
		inherit: true,
		onBasePower(basePower, pokemon, target) {
			if (target.status === 'par') return this.chainModify(2);
		},
		secondary: {
			chance: 20,
			status: 'par',
		},
		shortDesc: "20% chance to paralyze. Deals 2x more damage if the target is paralyzed.",
		desc: "20% chance to paraylze, doubles in damage if paralyzed.",
	},
	slam: {
		inherit: true,
		secondaries: [
				{
						chance: 10,
						status: 'par',
				},
				{
						chance: 10,
						volatileStatus: 'flinch',
				},
		],
		
		desc: "Has a 10% chance to make the target paralyzed and flinch.",
		shortDesc: "10% chance to paralyze. 10% chance to flinch."
	},
	signalbeam: {
		inherit:true,
		secondary: {
				chance: 30,
				volatileStatus:'confusion',
		},
		desc: "Has a 30% chance to make the target confused.",
		shortDesc: "30% chance to confuse the target."
	},
	knowledgepath: {
		inherit: true,
		pp: 0.625,
		condition: {
			noCopy: true,
			duration: 3,
			durationCallback(target, source, effect) {
				return 3;
			},
			onStart(target, source, effect) {
				this.add('-start', target, 'move: Knowledge Path', '[silent]');
				this.boost({
					atk: 2,
					def: 2,
					spa: 2,
					spd: 2,
					spe: 2,
				}, target);
			},
			onEnd(pokemon) {
				pokemon.clearBoosts();
				this.add('-clearboost', pokemon);
				this.add('-end', pokemon, 'move: Knowledge Path', '[silent]');
			}
		}
	},
	multiattack: {
		inherit: true,
		onModifyType(move, pokemon, target) {
			move.type = pokemon.teraType;
		},
		desc: "This move's type depends on the silvally's form.",
		shortDesc: "Type varies based on silvally's form.",
	},
	auroraveil: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('lightclay')) {
					return 8;
				}
				else if (source?.hasAbility('fieldsupport')) {
					this.add('-activate', source, 'ability: Field Support', '[move] Aurora Veil');
					return 8;
				}
				return 5;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && this.effectState.target.hasAlly(target)) {
					if ((target.side.getSideCondition('reflect') && this.getCategory(move) === 'Physical') ||
							(target.side.getSideCondition('lightscreen') && this.getCategory(move) === 'Special')) {
						return;
					}
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Aurora Veil weaken');
						if (this.activePerHalf > 1) return this.chainModify([2732, 4096]);
						return this.chainModify(0.5);
					}
				}
			},
			onSideStart(side, source) {
				if (source.hasAbility('fieldsupport')) {
					this.add('-sidestart', 'side', 'move: Aurora Veil', '[fieldsupport]');
				}
				else this.add('-sidestart', side, 'move: Aurora Veil');
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 10,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Aurora Veil');
			},
		},
	},
	flowerveil: {
		num: 694,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Flower Veil",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'flowerveil',
		onTry() {
			return this.field.isWeather(['sunnyday']);
		},
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('lightclay')) {
					return 8;
				}
				return 5;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && this.effectState.target.hasAlly(target)) {
					if ((target.side.getSideCondition('reflect') && this.getCategory(move) === 'Physical') ||
							(target.side.getSideCondition('lightscreen') && this.getCategory(move) === 'Special')) {
						return;
					}
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Flower Veil weaken');
						if (this.activePerHalf > 1) return this.chainModify([2732, 4096]);
						return this.chainModify(0.5);
					}
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Flower Veil');
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 10,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Flower Veil');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Fire",
		zMove: {boost: {spe: 1}},
		contestType: "Beautiful",
	},
	electricterrain: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				else if (source?.hasAbility('fieldsupport')) {
					this.add('-activate', source, 'ability: Field Support', '[move] Electric Terrain');
					return 8;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (status.id === 'slp' && target.isGrounded() && !target.isSemiInvulnerable()) {
					if (effect.id === 'yawn' || (effect.effectType === 'Move' && !effect.secondaries)) {
						this.add('-activate', target, 'move: Electric Terrain');
					}
					return false;
				}
			},
			onTryAddVolatile(status, target) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (status.id === 'yawn') {
					this.add('-activate', target, 'move: Electric Terrain');
					return null;
				}
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Electric' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('electric terrain boost');
					return this.chainModify([5325, 4096]);
				}
			},
			onFieldStart(field, source, effect) {
				if (source.hasAbility('fieldsupport')) {
					this.add('-fieldstart', 'move: Electric', '[fieldsupport]');
				} else if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Electric Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Electric Terrain');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Electric Terrain');
			},
		},
	},
	grassyterrain: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				else if (source?.hasAbility('fieldsupport')) {
					this.add('-activate', source, 'ability: Field Support', '[move] Grassy Terrain');
					return 8;
				}
				return 5;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				const weakenedMoves = ['earthquake', 'bulldoze', 'magnitude'];
				if (weakenedMoves.includes(move.id) && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('move weakened by grassy terrain');
					return this.chainModify(0.5);
				}
				if (move.type === 'Grass' && attacker.isGrounded()) {
					this.debug('grassy terrain boost');
					return this.chainModify([5325, 4096]);
				}
			},
			onFieldStart(field, source, effect) {
				if (source.hasAbility('fieldsupport')) {
					this.add('-fieldstart', 'move: Grassy Terrain', '[fieldsupport]');
				} else if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Grassy Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Grassy Terrain');
				}
			},
			onResidualOrder: 5,
			onResidualSubOrder: 2,
			onResidual(pokemon) {
				if (pokemon.isGrounded() && !pokemon.isSemiInvulnerable()) {
					this.heal(pokemon.baseMaxhp / 16, pokemon, pokemon);
				} else {
					this.debug(`Pokemon semi-invuln or not grounded; Grassy Terrain skipped`);
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Grassy Terrain');
			},
		},
	},
	gravity: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Gravity');
					return 7;
				}
				else if (source?.hasAbility('fieldsupport')) {
					this.add('-activate', source, 'ability: Field Support', '[move] Gravity');
					return 8;
				}
				return 5;
			},
			onFieldStart(target, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-fieldstart', 'move: Gravity', '[persistent]');
				} else {
					this.add('-fieldstart', 'move: Gravity');
				}
				for (const pokemon of this.getAllActive()) {
					let applies = false;
					if (pokemon.removeVolatile('bounce') || pokemon.removeVolatile('fly')) {
						applies = true;
						this.queue.cancelMove(pokemon);
						pokemon.removeVolatile('twoturnmove');
					}
					if (pokemon.volatiles['skydrop']) {
						applies = true;
						this.queue.cancelMove(pokemon);

						if (pokemon.volatiles['skydrop'].source) {
							this.add('-end', pokemon.volatiles['twoturnmove'].source, 'Sky Drop', '[interrupt]');
						}
						pokemon.removeVolatile('skydrop');
						pokemon.removeVolatile('twoturnmove');
					}
					if (pokemon.volatiles['magnetrise']) {
						applies = true;
						delete pokemon.volatiles['magnetrise'];
					}
					if (pokemon.volatiles['telekinesis']) {
						applies = true;
						delete pokemon.volatiles['telekinesis'];
					}
					if (applies) this.add('-activate', pokemon, 'move: Gravity');
				}
			},
			onModifyAccuracy(accuracy) {
				if (typeof accuracy !== 'number') return;
				return this.chainModify([6840, 4096]);
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.moves.get(moveSlot.id).flags['gravity']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (move.flags['gravity'] && !move.isZ) {
					this.add('cant', pokemon, 'move: Gravity', move);
					return false;
				}
			},
			onModifyMove(move, pokemon, target) {
				if (move.flags['gravity'] && !move.isZ) {
					this.add('cant', pokemon, 'move: Gravity', move);
					return false;
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 2,
			onFieldEnd() {
				this.add('-fieldend', 'move: Gravity');
			},
		},
	},
	healblock: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Heal Block');
					return 7;
				}
				else if (source?.hasAbility('fieldsupport')) {
					this.add('-activate', source, 'ability: Field Support', '[move] Heal Block');
					return 8;
				}
				return 5;
			},
			onStart(pokemon, source) {
				this.add('-start', pokemon, 'move: Heal Block');
				source.moveThisTurnResult = true;
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.moves.get(moveSlot.id).flags['heal']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (move.flags['heal'] && !move.isZ && !move.isMax) {
					this.add('cant', pokemon, 'move: Heal Block', move);
					return false;
				}
			},
			onModifyMove(move, pokemon, target) {
				if (move.flags['heal'] && !move.isZ && !move.isMax) {
					this.add('cant', pokemon, 'move: Heal Block', move);
					return false;
				}
			},
			onResidualOrder: 20,
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Heal Block');
			},
			onTryHeal(damage, target, source, effect) {
				if ((effect?.id === 'zpower') || this.effectState.isZ) return damage;
				return false;
			},
			onRestart(target, source) {
				this.add('-fail', target, 'move: Heal Block'); // Succeeds to supress downstream messages
				if (!source.moveThisTurnResult) {
					source.moveThisTurnResult = false;
				}
			},
		},
	},
	lightscreen: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('lightclay')) {
					return 8;
				}
				else if (source?.hasAbility('fieldsupport')) {
					this.add('-activate', source, 'ability: Field Support', '[move] Light Screen');
					return 8;
				}
				return 5;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && this.effectState.target.hasAlly(target) && this.getCategory(move) === 'Special') {
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Light Screen weaken');
						if (this.activePerHalf > 1) return this.chainModify([2732, 4096]);
						return this.chainModify(0.5);
					}
				}
			},
			onSideStart(side, source) {
				if (source.hasAbility('fieldsupport')) {
					this.add('-sidestart', side, 'move: Light Screen', '[fieldsupport]');
				}
				else this.add('-sidestart', side, 'move: Light Screen');
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 2,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Light Screen');
			},
		},
	},
	magicroom: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Magic Room');
					return 7;
				}
				else if (source?.hasAbility('fieldsupport')) {
					this.add('-activate', source, 'ability: Field Support', '[move] Magic Room');
					return 8;
				}
				return 5;
			},
			onFieldStart(target, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-fieldstart', 'move: Magic Room', '[of] ' + source, '[persistent]');
				} else if (source.hasAbility('fieldsupport')) {
					this.add('-fieldstart', 'move: Magic Room', '[of] ' + source, '[fieldsupport]');
				}else {
					this.add('-fieldstart', 'move: Magic Room', '[of] ' + source);
				}
				for (const mon of this.getAllActive()) {
					this.singleEvent('End', mon.getItem(), mon.itemState, mon);
				}
			},
			onFieldRestart(target, source) {
				this.field.removePseudoWeather('magicroom');
			},
			// Item suppression implemented in Pokemon.ignoringItem() within sim/pokemon.js
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 6,
			onFieldEnd() {
				this.add('-fieldend', 'move: Magic Room', '[of] ' + this.effectState.source);
			},
		},
	},
	magnetrise: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source.hasAbility('fieldsupport')) return 8;
				return 5;
			},
			onStart(target) {
				this.add('-start', target, 'Magnet Rise');
			},
			onImmunity(type) {
				if (type === 'Ground') return false;
			},
			onResidualOrder: 18,
			onEnd(target) {
				this.add('-end', target, 'Magnet Rise');
			},
		},
	},
	mistyterrain: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				else if (source?.hasAbility('fieldsupport')) {
					this.add('-activate', source, 'ability: Field Support', '[move] Misty Terrain');
					return 8;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (effect && ((effect as Move).status || effect.id === 'yawn')) {
					this.add('-activate', target, 'move: Misty Terrain');
				}
				return false;
			},
			onTryAddVolatile(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (status.id === 'confusion') {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Misty Terrain');
					return null;
				}
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Dragon' && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('misty terrain weaken');
					return this.chainModify(0.5);
				}
			},
			onFieldStart(field, source, effect) {
				if (source.hasAbility('fieldsupport')) {
					this.add('-fieldstart', 'move: Misty Terrain', '[fieldsupport]');
				} else if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Misty Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Misty Terrain');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'Misty Terrain');
			},
		},
	},
	psychicterrain: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				else if (source?.hasAbility('fieldsupport')) {
					this.add('-activate', source, 'ability: Field Support', '[move] Psychic Terrain');
					return 8;
				}
				return 5;
			},
			onTryHitPriority: 4,
			onTryHit(target, source, effect) {
				if (effect && (effect.priority <= 0.1 || effect.target === 'self')) {
					return;
				}
				if (target.isSemiInvulnerable() || target.isAlly(source)) return;
				if (!target.isGrounded()) {
					const baseMove = this.dex.moves.get(effect.id);
					if (baseMove.priority > 0) {
						this.hint("Psychic Terrain doesn't affect Pokémon immune to Ground.");
					}
					return;
				}
				this.add('-activate', target, 'move: Psychic Terrain');
				return null;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Psychic' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('psychic terrain boost');
					return this.chainModify([5325, 4096]);
				}
			},
			onFieldStart(field, source, effect) {
				if (source.hasAbility('fieldsupport')) {
					this.add('-fieldstart', 'move: Psychic Terrain', '[fieldsupport]');
				} else if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Psychic Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Psychic Terrain');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Psychic Terrain');
			},
		},
	},
	reflect: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('lightclay')) {
					return 8;
				}
				else if (source?.hasAbility('fieldsupport')) {
					this.add('-activate', source, 'ability: Field Support', '[move] Reflect');
					return 8;
				}
				return 5;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && this.effectState.target.hasAlly(target) && this.getCategory(move) === 'Physical') {
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Reflect weaken');
						if (this.activePerHalf > 1) return this.chainModify([2732, 4096]);
						return this.chainModify(0.5);
					}
				}
			},
			onSideStart(side, source) {
				if (source.hasAbility('fieldsupport')) {
					this.add('-sidestart', side, 'Reflect', '[fieldsupport]');
				} else this.add('-sidestart', side, 'Reflect');
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 1,
			onSideEnd(side) {
				this.add('-sideend', side, 'Reflect');
			},
		},
	},
	safeguard: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Safeguard');
					return 7;
				}
				else if (source?.hasAbility('fieldsupport')) {
					this.add('-activate', source, 'ability: Field Support', '[move] Safeguard');
					return 8;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (!effect || !source) return;
				if (effect.id === 'yawn') return;
				if (effect.effectType === 'Move' && effect.infiltrates && !target.isAlly(source)) return;
				if (target !== source) {
					this.debug('interrupting setStatus');
					if (effect.name === 'Synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) {
						this.add('-activate', target, 'move: Safeguard');
					}
					return null;
				}
			},
			onTryAddVolatile(status, target, source, effect) {
				if (!effect || !source) return;
				if (effect.effectType === 'Move' && effect.infiltrates && !target.isAlly(source)) return;
				if ((status.id === 'confusion' || status.id === 'yawn') && target !== source) {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Safeguard');
					return null;
				}
			},
			onSideStart(side, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-sidestart', side, 'Safeguard', '[persistent]');
				} else if (source.hasAbility('fieldsupport')) {
					this.add('-sidestart', side, 'Safeguard', '[fieldsupport');
				} else {
					this.add('-sidestart', side, 'Safeguard');
				}
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 3,
			onSideEnd(side) {
				this.add('-sideend', side, 'Safeguard');
			},
		},
	},
	tailwind: {
		inherit: true,
		condition: {
			duration: 4,
			durationCallback(target, source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Tailwind');
					return 6;
				}
				else if (source?.hasAbility('fieldsupport')) {
					this.add('-activate', source, 'ability: Field Support', '[move] Tailwind');
					return 8;
				}
				return 4;
			},
			onSideStart(side, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-sidestart', side, 'move: Tailwind', '[persistent]');
				} else if (source.hasAbility('fieldsupport')) {
					this.add('-sidestart', side, 'move: Tailwind', '[fieldsupport]');
				} else {
					this.add('-sidestart', side, 'move: Tailwind');
				}
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(2);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 5,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Tailwind');
			},
		},
	},
	telekinesis: {
		inherit: true,
		condition: {
			duration: 3,
			durationCallback(target, source, effect) {
				if (source.hasAbility('fieldsupport')) return 6;
				return 3;
			},
			onStart(target) {
				if (['Diglett', 'Dugtrio', 'Palossand', 'Sandygast'].includes(target.baseSpecies.baseSpecies) ||
						target.baseSpecies.name === 'Gengar-Mega') {
					this.add('-immune', target);
					return null;
				}
				if (target.volatiles['smackdown'] || target.volatiles['ingrain']) return false;
				this.add('-start', target, 'Telekinesis');
			},
			onAccuracyPriority: -1,
			onAccuracy(accuracy, target, source, move) {
				if (move && !move.ohko) return true;
			},
			onImmunity(type) {
				if (type === 'Ground') return false;
			},
			onUpdate(pokemon) {
				if (pokemon.baseSpecies.name === 'Gengar-Mega') {
					delete pokemon.volatiles['telekinesis'];
					this.add('-end', pokemon, 'Telekinesis', '[silent]');
				}
			},
			onResidualOrder: 19,
			onEnd(target) {
				this.add('-end', target, 'Telekinesis');
			},
		},
	},
	trickroom: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Trick Room');
					return 7;
				}
				else if (source?.hasAbility('fieldsupport')) {
					this.add('-activate', source, 'ability: Field Support', '[move] Trick Room');
					return 8;
				}
				return 5;
			},
			onFieldStart(target, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-fieldstart', 'move: Trick Room', '[of] ' + source, '[persistent]');
				} else if (source.hasAbility('fieldsupport')) {
					this.add('-fieldstart', 'move: Trick Room', '[of] ' + source, '[fieldsupport]');
				} else {
					this.add('-fieldstart', 'move: Trick Room', '[of] ' + source);
				}
			},
			onFieldRestart(target, source) {
				this.field.removePseudoWeather('trickroom');
			},
			// Speed modification is changed in Pokemon.getActionSpeed() in sim/pokemon.js
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 1,
			onFieldEnd() {
				this.add('-fieldend', 'move: Trick Room');
			},
		},
	},
	wonderroom: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Wonder Room');
					return 7;
				}
				else if (source?.hasAbility('fieldsupport')) {
					this.add('-activate', source, 'ability: Field Support', '[move] Wonder Room');
					return 8;
				}
				return 5;
			},
			onModifyMove(move, source, target) {
				// This code is for moves that use defensive stats as the attacking stat; see below for most of the implementation
				if (!move.overrideOffensiveStat) return;
				const statAndBoosts = move.overrideOffensiveStat;
				if (!['def', 'spd'].includes(statAndBoosts)) return;
				move.overrideOffensiveStat = statAndBoosts === 'def' ? 'spd' : 'def';
				this.hint(`${move.name} uses ${statAndBoosts === 'def' ? '' : 'Sp. '}Def boosts when Wonder Room is active.`);
			},
			onFieldStart(field, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-fieldstart', 'move: Wonder Room', '[of] ' + source, '[persistent]');
				} else if (source.hasAbility('fieldsupport')) {
					this.add('-fieldstart', 'move: Wonder Room', '[of] ' + source, '[fieldsupport]');
				} else {
					this.add('-fieldstart', 'move: Wonder Room', '[of] ' + source);
				}
			},
			onFieldRestart(target, source) {
				this.field.removePseudoWeather('wonderroom');
			},
			// Swapping defenses partially implemented in sim/pokemon.js:Pokemon#calculateStat and Pokemon#getStat
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 5,
			onFieldEnd() {
				this.add('-fieldend', 'move: Wonder Room');
			},
		},
	},

	shedtail: {
		inherit: true,
		pp: 0.625,
	},
	// Physical Moves
	armthrust: {
		inherit: true,
		basePower: 25,
	},
	furyattack: {
		inherit: true,
		basePower: 25,
		accuracy: 100,
	},
	nuzzle: {
		inherit: true,
		basePower: 40,
	},
	rockblast: {
		inherit: true,
		accuracy: 100,
	},
	tailslap: {
		inherit: true,
		accuracy: 100,
	},
	bonerush: {
		inherit: true,
		accuracy: 100,
	},
	pinmissile: {
		inherit: true,
		accuracy: 100,
	},
	mortalspin: {
		inherit: true,
		basePower: 60,
	},
	feint: {
		inherit: true,
		basePower: 60,
	},
	doublekick: {
		inherit: true,
		basePower: 40,
	},
	doublehit: {
		inherit: true,
		basePower: 40,
		accuracy: 100,
	},
	iceball: {
		inherit: true,
		basePower: 40,
		accuracy: 95,
	},
	rollout: {
		inherit: true,
		basePower: 40,
		accuracy: 95,
	},
	sandtomb: {
		inherit: true,
		basePower: 40,
		accuracy: 100,
	},
	snaptrap: {
		inherit: true,
		type: 'Steel',
		basePower: 80,
	},
	poweruppunch: {
		inherit: true,
		basePower: 50,
	},
	rocksmash: {
		inherit: true,
		basePower: 60,
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		desc: "Has a 100% chance to lower the target's Def.",
		shortDesc: "100% chance to lower the target's Def.",
	},
	bonemerang: {
		inherit: true,
		basePower: 60,
		accuracy: 100,
	},
	geargrind: {
		inherit: true,
		accuracy: 90,
	},
	cut: {
		inherit: true,
		type: 'Grass',
		basePower: 75,
		accuracy: 100,
		onEffectiveness(typeMod, target, type) {
			if (['Grass', 'Bug'].includes(type)) return 1;
		},
		desc: "This move's type effectiveness against Grass and Bug is changed to be super effective no matter what this move's type is.",
		shortDesc: "Super effective on Grass and Bug.",
	},
	poisonfang: {
		inherit: true,
		basePower: 65,
	},
	rockthrow: {
		inherit: true,
		accuracy: 100,
	},
	razorleaf: {
		inherit: true,
		basePower: 65,
		accuracy: 100,
	},
	visegrip: {
		inherit: true,
		basePower: 60,
		volatileStatus: 'partiallytrapped',
		shortDesc: "Traps and damages the target for 4-5 turns.",
	},
	covet: {
		inherit: true,
		type: 'Fairy',
	},
	flipturn: {
		inherit: true,
		basePower: 65,
	},
	uturn: {
		inherit: true,
		basePower: 65,
	},
	magnetbomb: {
		inherit: true,
		basePower: 80,
	},
	needlearm: {
		inherit: true,
		basePower: 85,
	},
	pluck: {
		inherit: true,
		basePower: 75,
	},
	rocktomb: {
		inherit: true,
		basePower: 65,
		accuracy: 100,
	},
	wingattack: {
		inherit: true,
		basePower: 75,
	},
	firefang: {
		inherit: true,
		accuracy: 100,
	},
	icefang: {
		inherit: true,
		accuracy: 100,
	},
	thunderfang: {
		inherit: true,
		accuracy: 100,
	},
	boneclub: {
		inherit: true,
		basePower: 90,
		accuracy: 95,
		secondary: {
			chance: 30,
			volatileStatus: "flinch",
		},
		desc: "Has a 30% chance to flinch the target.",
		shortDesc: "30% chance to flinch the target.",
	},
	steamroller: {
		inherit: true,
		basePower: 80,
	},
	crosspoison: {
		inherit: true,
		basePower: 90,
	},
	dizzypunch: {
		inherit: true,
		basePower: 150,
		accuracy: 60,
		secondary: {
			chance: 100,
			volatileStatus: 'confusion',
		},
		desc: "Has a 100% chance to confuse the target.",
		shortDesc: "100% chance to confuse the target.",
	},
	skittersmack: {
		inherit: true,
		accuracy: 100,
	},
	steelwing: {
		inherit: true,
		accuracy: 100,
	},
	vitalthrow: {
		inherit: true,
		basePower: 100,
	},
	razorshell: {
		inherit: true,
		accuracy: 100,
	},
	rockslide: {
		inherit: true,
		accuracy: 100,
	},
	crushclaw: {
		inherit: true,
		accuracy: 100,
	},
	zenheadbutt: {
		inherit: true,
		accuracy: 100,
	},
	dig: {
		inherit: true,
		basePower: 100,
	},
	dive: {
		inherit: true,
		basePower: 100,
	},
	hyperfang: {
		inherit: true,
		basePower: 120,
		accuracy: 85,
	},
	megapunch: {
		inherit: true,
		accuracy: 100,
		secondary: {
			chance: 20,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		desc: "Has a 20% chance to increase Attack.",
		shortDesc: "20% chance to increase Atk by 1 stage.",
	},
	submission: {
		inherit: true,
		basePower: 130,
		accuracy: 100,
		recoil: [33, 100],
		desc: "Takes 1/3 recoil damage",
		shortDesc: '1/3 recoil damage',
	},
	blazekick: {
		inherit: true,
		basePower: 90,
		accuracy: 100,
	},
	bounce: {
		inherit: true,
		basePower: 100,
		accuracy: 100,
	},
	iciclecrash: {
		inherit: true,
		accuracy: 100,
	},
	skyuppercut: {
		inherit: true,
		accuracy: 100,
	},
	aquatail: {
		inherit: true,
		accuracy: 100,
	},
	meteormash: {
		inherit: true,
		accuracy: 100,
	},
	playrough: {
		inherit: true,
		accuracy: 100,
	},
	ragingbull: {
		inherit: true,
		basePower: 110,
	},
	fly: {
		inherit: true,
		basePower: 110,
		accuracy: 100,
	},
	phantomforce: {
		inherit: true,
		basePower: 110,
	},
	rockclimb: {
		inherit: true,
		accuracy: 100,
		secondaries: [
			{
				chance: 20,
				volatileStatus: 'confusion',
			},
			{
				chance: 10,
				volatileStatus: 'flinch',
			},
		],
		desc: "Has a 20% chance to confuse the target and a 10% to make it flinch",
		shortDesc: "20% chance to confuse the target. 10% chance to flinch.",
	},
	highhorsepower: {
		inherit: true,
		accuracy: 100,
	},
	crabhammer: {
		inherit: true,
		accuracy: 95,
	},
	crosschop: {
		inherit: true,
		accuracy: 95,
	},
	hammerarm: {
		inherit: true,
		accuracy: 100,
	},
	icehammer: {
		inherit: true,
		accuracy: 100,
	},
	mountaingale: {
		inherit: true,
		accuracy: 90,
	},
	stoneedge: {
		inherit: true,
		accuracy: 90,
	},
	dynamicpunch: {
		inherit: true,
		basePower: 120,
		accuracy: 60,
	},
	eggbomb: {
		inherit: true,
		basePower: 160,
		accuracy: 90,
		flags: {protect: 1, bullet: 1, distance: 1, heal: 1, allyanim: 1},
		onHit(target, source) {
			let success = false;
			if (this.randomChance(1, 4) && !target.isAlly(source)) {
				success = !!this.heal(Math.ceil(target.baseMaxhp * 0.25));
			} else { success = false; }
			if (success && !target.isAlly(source)) {
				target.staleness = 'external';
			}
			if (!success) {
				this.add('-fail', target, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
		desc: "Has a 25% chance of healing the opposing pokemon 1/4 of their max hp.",
		shortDesc: "25% chance of healing the opposing pokemon 1/4 of their max hp.",
	},
	dragonrush: {
		inherit: true,
		basePower: 120,
		accuracy: 100,
		recoil: [33, 100],
		secondary: {
			chance: 10,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		desc: "Takes 1/3 Recoil Damage. Has a 10% chance to increase Speed.",
		shortDesc: "1/3 Recoil Damage; 10% chance to increase Spe by 1 stage.",
	},
	irontail: {
		inherit: true,
		accuracy: 90,
	},
	megahorn: {
		inherit: true,
		accuracy: 90,
	},
	powerwhip: {
		inherit: true,
		accuracy: 90,
	},
	precipiceblades: {
		inherit: true,
		accuracy: 90,
	},
	megakick: {
		inherit: true,
		accuracy: 90,
	},
	skyattack: {
		inherit: true,
		accuracy: 100,
	},
	headsmash: {
		inherit: true,
		accuracy: 90,
	},
	gigaimpact: {
		inherit: true,
		accuracy: 100,
	},
	rockwrecker: {
		inherit: true,
		accuracy: 100,
	},
	// Special Moves
	infestation: {
		inherit: true,
		basePower: 40,
	},
	smog: {
		inherit: true,
		basePower: 40,
		accuracy: 100,
		secondary: {
			chance: 100,
			status: 'psn',
		},
		desc: "Always poisons the target.",
		shortDesc: "Always poisons the target.",
	},
	firespin: {
		inherit: true,
		accuracy: 100,
	},
	whirlpool: {
		inherit: true,
		accuracy: 100,
	},
	acidspray: {
		inherit: true,
		basePower: 50,
	},
	vacuumwave: {
		inherit: true,
		basePower: 50,
	},
	clearsmog: {
		inherit: true,
		basePower: 70,
	},
	chargebeam: {
		inherit: true,
		basePower: 60,
		accuracy: 100,
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		desc: "Always raises the user's Sp.Atk by 1 stage.",
		shortDesc: "Increases Sp.Atk by 1 stage.",
	},
	snore: {
		inherit: true,
		basePower: 60,
	},
	strugglebug: {
		inherit: true,
		basePower: 60,
	},
	electroweb: {
		inherit: true,
		accuracy: 100,
	},
	icywind: {
		inherit: true,
		accuracy: 100,
	},
	mudshot: {
		inherit: true,
		accuracy: 100,
	},
	snarl: {
		inherit: true,
		accuracy: 100,
	},
	aircutter: {
		inherit: true,
		accuracy: 100,
	},
	frostbreath: {
		inherit: true,
		accuracy: 100,
	},
	syrupbomb: {
		inherit: true,
		accuracy: 100,
	},
	glaciate: {
		inherit: true,
		accuracy: 100,
	},
	leaftornado: {
		inherit: true,
		basePower: 90,
		accuracy: 95,
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
		desc: "Has a 20% chance to flinch",
		shortDesc: "20% chance to flinch",
	},
	mirrorshot: {
		inherit: true,
		basePower: 90,
		accuracy: 95,
		secondary: {
			chance: 20,
			boosts: {
				spd: -1,
			},
		},
		desc: "Has a 20% chance to lower the target's Sp.Def by 1 stage.",
		shortDesc: "20% chance to lower Sp.Def by 1 stage.",
	},
	mudbomb: {
		inherit: true,
		basePower: 90,
		accuracy: 95,
		secondary: {
			chance: 20,
			boosts: {
				spe: -1,
			},
		},
		desc: "Has a 20% chance to lower the target's Speed by 1 stage.",
		shortDesc: "20% chance to lower Spe by 1 stage.",
	},
	paraboliccharge: {
		inherit: true,
		basePower: 75,
	},
	airslash: {
		inherit: true,
		accuracy: 100,
	},
	aurasphere: {
		inherit: true,
		basePower: 90,
	},
	eeriespell: {
		inherit: true,
		basePower: 90,
	},
	esperwing: {
		inherit: true,
		basePower: 75,
	},
	extrasensory: {
		inherit: true,
		basePower: 100,
	},
	matchagotcha: {
		inherit: true,
		basePower: 90,
		accuracy: 95,
	},
	triattack: {
		inherit: true,
		basePower: 90,
	},
	razorwind: {
		inherit: true,
		basePower: 110,
	},
	muddywater: {
		inherit: true,
		basePower: 80,
		accuracy: 100,
		secondary: {
			chance: 30,
			boosts: {
				spe: -1,
			},
		},
		desc: "Has a 30% chance of lowering each target's speed by one stage. Targets all adjacent opponents.",
		shortDesc: "30% chance to lower the foe(s) speed by 1.",
	},
	heatwave: {
		inherit: true,
		accuracy: 100,
	},
	magmastorm: {
		inherit: true,
		accuracy: 80,
		onModifyMove(move) {
			if (this.field.isWeather(['sunnyday', 'desolateland'])) move.accuracy = true;
		},
		shortDesc: "Cannot miss in Sun.",
		desc: "Can't miss in Sun.",
	},
	inferno: {
		inherit: true,
		basePower: 120,
		accuracy: 60,
	},
	fireblast: {
		inherit: true,
		accuracy: 90,
	},
	hydropump: {
		inherit: true,
		accuracy: 85,
	},
	thunder: {
		inherit: true,
		accuracy: 80,
	},
	focusblast: {
		inherit: true,
		accuracy: 80,
		secondary: null,
		shortDesc: "No additional effect.",
	},
	belch: {
		inherit: true,
		accuracy: 100,
	},
	meteorbeam: {
		inherit: true,
		accuracy: 100,
	},
	zapcannon: {
		inherit: true,
		accuracy: 60,
	},
	dracometeor: {
		inherit: true,
		accuracy: 95,
	},
	fleurcannon: {
		inherit: true,
		accuracy: 95,
	},
	leafstorm: {
		inherit: true,
		accuracy: 95,
	},
	overheat: {
		inherit: true,
		accuracy: 95,
	},
	bloodmoon: {
		inherit: true,
		basePower: 150,
	},
	psychoboost: {
		inherit: true,
		accuracy: 95,
	},
	chloroblast: {
		inherit: true,
		accuracy: 100,
	},
	blastburn: {
		inherit: true,
		accuracy: 100,
	},
	frenzyplant: {
		inherit: true,
		accuracy: 100,
	},
	hydrocannon: {
		inherit: true,
		accuracy: 100,
	},
	hyperbeam: {
		inherit: true,
		accuracy: 100,
	},
	roaroftime: {
		inherit: true,
		accuracy: 100,
	},
	enternabeam: {
		inherit: true,
		accuracy: 100,
	},
	naturesmadness: {
		inherit: true,
		accuracy: 100,
	},
	ruination: {
		inherit: true,
		accuracy: 100,
	},
	// Status Moves
	darkvoid: {
		inherit: true,
		accuracy: 75,
	},
	grasswhistle: {
		inherit: true,
		accuracy: 75,
	},
	sing: {
		inherit: true,
		accuracy: 75,
	},
	hypnosis: {
		inherit: true,
		accuracy: 75,
	},
	metalsound: {
		inherit: true,
		accuracy: 100,
	},
	screech: {
		inherit: true,
		accuracy: 100,
	},
	willowisp: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (pokemon.types.includes('Fire')) move.accuracy = true;
		},
		desc: "Inflicts a burn on the target if used by a fire type. 85% accuracy if another type",
		shortDesc: "Burns the target. Can't miss if fire type.",
	},
	thunderwave: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (pokemon.types.includes('Electric')) move.accuracy = true;
		},
		desc:"Paralyzes the target if used by an electric type. 85% accuracy if another type",
		shortDesc:"Paralyzes the target. Can't miss if electric type"
	},
	leechseed: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (pokemon.types.includes('Grass')) move.accuracy = true;
		},
		desc:"Plants a seed on the target if used by a grass type. 85% accuracy if another type",
		shortDesc:"1/8 of target's HP is restored to user every turn. Can't miss if grass type"
	},
	poisongas: {
		inherit: true,
		accuracy: 100,
	},
	stringshot: {
		inherit: true,
		accuracy: 100,
	},
	strengthsap: {
		inherit: true,
		accuracy: 100,
	},
	// New Moves
	cragblast: {
		num: -2001,
		accuracy: 90,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		category: "Physical",
		name: "Crag Blast",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, bullet: 1},
		multihit: 3,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Rock",
		zMove: {basePower: 120},
		maxMove: {basePower: 140},
		desc: "Hits three times. Power increases to 40 for the second hit and 60 for the third. This move checks accuracy for each hit, and the attack ends if the target avoids a hit. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit three times.",
		shortDesc: "Hits 3 times. Each hit can miss, but power rises.",
	},
	glacier: {
		num: -2002,
		accuracy: 100,
		basePower: 125,
		pp: 15,
		category: "Physical",
		type: "Ice",
		name: "Glacier",
		priority: 0,
		flags: {contact: 1, charge: 1, protect:1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (['hail', 'snow'].includes(attacker.effectiveWeather())) {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, move.name, defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		secondary: null,
		target: "normal",
		contestType: "Cool",
		desc: "Charges Turn 1. Hits Turn 2. No Charge in Snowstorm.",
		shortDesc: "Charges Turn 1. Hits Turn 2. No Charge in Snowstorm.",
	},
	coldsnap: {
		num: -2003,
		accuracy: 100,
		basePower: 120,
		pp: 15,
		category: "Special",
		type: "Ice",
		name: "Cold Snap",
		priority: 0,
		flags: {contact: 1, charge: 1,protect:1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (['hail', 'snow'].includes(attacker.effectiveWeather())) {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, move.name, defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		secondary: null,
		target: "normal",
		contestType: "Cool",
		desc: "Charges Turn 1. Hits Turn 2. No Charge in Snowstorm.",
		shortDesc: "Charges Turn 1. Hits Turn 2. No Charge in Snowstorm.",
	},
	swarmterrain: {
		num: 10008,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Swarm Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'swarmterrain',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source.hasItem('terrainextender')) return 8;
				return 5;
			},
			onFieldStart(field, source, effect) {
				if (effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Swarm Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Swarm Terrain');
				}
			},
			onBeforeMovePriority: 5,
			onBeforeMove(attacker, defender, move) {
				if (!move.isZ && !move.isMax && move.selfBoost) {
					this.add('cant', attacker, 'move: Swarm Terrain', move);
					return false;
				}
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					const move = this.dex.moves.get(moveSlot.id);
					if (move.selfBoost) {
						pokemon.disableMove(moveSlot.id);
					}
					if(move.boosts){
						pokemon.disableMove(moveSlot.id)
					}
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Swarm Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Bug",
		contestType: "Beautiful",
	},
	healingaura: {
		num: 100009,
		name: "Healing Aura",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 10,
		priority: 0,
		flags: {mirror: 1, bypasssub: 1},
		pseudoWeather: 'healingaura',
		condition: {
			onSwap(pokemon) {
				pokemon.heal(pokemon.maxhp / 4);
			}
		},
		secondary: null,
		target: "self",
		contestType: "Cool",
		type: "Water",
	},
	// Fixed Moves
	filletaway: {
		inherit: true,
		onTry(source) {
			if (source.hp <= source.maxhp / 4 || source.maxhp === 1) return false;
		},
		onHit(pokemon) {
			this.directDamage(pokemon.maxhp / 4);
		},
	},
};
