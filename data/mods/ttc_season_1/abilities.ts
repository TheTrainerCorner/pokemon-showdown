import {Ability} from '../../../sim/dex-abilities';

export const Abilities: { [k: string]: ModdedAbilityData} = {
	surgesurfer: {
		inherit: true,
		shortDesc: "If Terrain is active, this Pokemon's Speed is doubled.",
	},
	//#region Version 1.1
	slowstart: {
		inherit: true,
		condition: {
			duration: 5,
			onResidualOrder: 28,
			onResidualSubOrder: 2,
			onStart(target) {
				this.add('-start', target, 'ability: Slow Start');
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(target) {
				this.add('-end', target, 'Slow Start')
			},
		},
		desc: "On switch-in, this Pokemon's Speed are halved for 5 Turns.",
		shortDesc: "On switch-in, this Pokemon's Speed are halved for 5 Turns.",
	},
	rkssystem: {
		inherit: true,
		onPrepareHit(source, target, move) {
			if(source.baseSpecies.name !== 'Silvally') return;
			if(this.effectState.rkssystem) return;
			if(move.hasBounced || move.flags['futuremove'] || move.sourceEffect !== 'snatch') return;
			const type = move.type;
			if(type && type !== '???' && source.getTypes().join() !== type) {
				if(!source.formeChange(`Silvally-${type}`, this.effect, true)) return;
				this.effectState.rkssystem = true;
			}
		},
		onSwitchIn(pokemon) {
			delete this.effectState.rkssystem;
		},
		desc: "If this Pokemon is Silvally; Silvally will change its form to match the type of the move it is about to use. This effect comes after all effects that change a move's type. This effect can only happen once per switch-in, and only if this Pokemon is not Terastallized.",
		shortDesc: "If Silvally; Changes Form based on the type of the move about to use.",
	},
	//#endregion
	//#region Season 1 Donations
	shieldsdown: {
		inherit: true,
		// onStart
		// onResidualOrder
		// onResidual
		// onSetStatus
		// onTryAddVolatile
		onFoeTryMove(target, source, move) {
			const targetAllExceptions = ['perishsong', 'flowershield', 'rototiller'];
			if (move.target === 'foeSide' || (move.target === 'all' && !targetAllExceptions.includes(move.id))) {
				return;
			}
			const shieldsDownHolder = this.effectState.target;
			if (target.species.baseSpecies === 'Minior' && target.species.forme !== 'Meteor' && move.priority > 0.1) {
				this.attrLastMove('[still]');
				this.add('cant', shieldsDownHolder, 'ability: Shields Down', move, '[of] ' + target);
			}
		},
		shortDesc: "If Minior, at 1/2 max hp, changes to Core and is immune to priority moves; else Meteor forme",
	},
	colorchange: {
		inherit: true,
		onAfterMoveSecondary: undefined,
		onFoeBeforeMove(source, target, move) {
			if (!target.hp) return;
			const type = move.type
			if (target.isActive && move.effectType === 'Move' && move.category !== 'Status' && type !== '???') {
				let _type = this.dex.types.get(type);
			
				let types = this.dex.types.allCache;
				// 2 = Resistance.
				let resultType = types?.find(x => _type.damageTaken[x.id] === 2);

				if (!target.hasType(resultType!.name)) return false;
				this.add('-start', target, 'typechange', type, '[from] ability: Color Change');

				if (target.side.active.length === 2 && target.position === 1) {
					const action = this.queue.willMove(target);
					if (action && action.move.id === 'curse') {
						action.targetLoc = -1;
					}
				}
			}
		},
		desc: "The user's type changes to resist the oncoming move from the opposing pokemon.",
		shortDesc: "Changes type based on the oncoming move to resist it.",
	},
	sharpenedleek: {
		num: -2001,
		name: "Sharpened Leek",
		// Sharpness
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['slicing']) {
				this.debug('Sharpened Leek boost');
				return this.chainModify(1.5);
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon, target, move) {
			return this.chainModify([4915, 4096]);
		},
		desc: "Sharpness + Attack increased by 1.2x",
		shortDesc: "Sharpness + Attack increased by 1.2x",
	},
	petrifyinggaze: {
		num: -2002,
		name: "Petrifying Gaze",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Petrifying Gaze', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) this.add('-immune', target);
				else this.boost({spe: -1}, target, pokemon, null, true);
			}
		},
		desc: "Lowers the opponent's speed stat by 1 stage on Switch-In",
		shortDesc: "On Switch-In; Lowers opposing side's Speed by 1 stage.",
		rating: 3.5,
	},
	//#endregion
	//#region Season 1 Halloween
	// New Ability
	hauntedlight: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ghost') {
				this.debug('Haunted Light boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ghost') {
				this.debug('Haunted Light boost');
				return this.chainModify(1.5);
			}
		},
		name: "Haunted Light",
		rating: 3.5,
		num: -200,
		shortDesc: "This Pokemon's offensive stat is multiplied by 1.5 while using a Ghost-type attack.",
	},
	eeriecry: {
		// Trick or Treat
		onStart(pokemon) {
			for (const target of pokemon.adjacentFoes()) {
				if (target.hasType('Ghost')) return false;
				if (!target.addType('Ghost')) return false;
				this.add('-start', target, 'typeadd', 'Ghost', '[from] ability: Eerie Cry');

				if(target.side.active.length === 2 && target.position === 1) {
					// Curse Glitch
					const action = this.queue.willMove(target);
					if(action && action.move.id === 'curse') {
						action.targetLoc = -1;
					}
				}
			}
		},
		// Tangling Hair
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.add('-ability', target, 'Tangling Hair');
				this.boost({spe: -1}, source, target, null, true);
			}
		},
		name: "Eerie Cry",
		rating: 3.5,
		num: -201,
		shortDesc: "When this Pokemon is sent out automatically activates trick or treat. Also combine tangling hair into this ability.",
	},
	//#endregion
	//#region Season 1 Winter
	frigidinspiration: {
		onModifyAtkPriority: 6,
		onModifyAtk(atk, source, target, move) {
			if (source.species.baseSpecies === "Meloetta" && source.species.forme === "Aurora") {
				return this.chainModify(1.3);
			}
		},
		onModifySpAPriority: 6,
		onModifySpA(atk, source, target, move) {
			if (source.species.baseSpecies === "Meloetta" && source.species.forme === "Caroler") {
				return this.chainModify(1.3);
			}
		},
		num: -15001,
		name: "Frigid Inspiration",
		rating: 5.0,
	},
	//#endregion
	
};
