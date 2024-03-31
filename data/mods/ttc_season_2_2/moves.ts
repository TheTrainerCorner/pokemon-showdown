export const Moves: {[k: string]: ModdedMoveData} = {
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
	knowledgepath: {
		inherit: true,
		pp: 0.625,
	},
	shedtail: {
		inherit: true,
		pp: 0.625,
	}
};