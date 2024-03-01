export const Abilities: {[k: string]: ModdedAbilityData} = {
	artillery: {
		inherit: true,
		onDamagingHitOrder: 1,
		onSourceDamagingHit(damage, target, source, move) {
			source.damage(source.maxhp / 8, target);
		},
		onAfterMove: undefined,
		desc: "After using a Damaging hit, does 1/8 of the target's max hp to the target.",
		shortDesc: "After using a Damaging hit, does 1/8 of the target's max hp to the target.",
	},
	ballfetch: {
		inherit: true,
		onModifySpe: undefined,
		onStart(pokemon) {
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
			if (!ballItems.includes(pokemon.item)) return;
			pokemon.addVolatile('ballfetch');
		},
		onUpdate(pokemon) {
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
			if (!ballItems.includes(pokemon.item) && pokemon.volatiles['ballfetch'])
				pokemon.removeVolatile('ballfetch');
			else if (!ballItems.includes(pokemon.item) && !pokemon.volatiles['ballfetch'])
				return;
			else pokemon.addVolatile('ballfetch');
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('ballfetch');
		},
		condition: {
			onModifySpePriority: 6,
			onModifySpe(spe, pokemon) {
				return this.chainModify(1.5);
			},
		},
	},
	sandveil: {
		inherit: true,
		onWeather(target, _, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id !== 'sandstorm') return;
			target.side.foe.addSideCondition('stealthrock');
			this.add('-activate', target, 'ability: Sand Veil');
		},
	},
	snowcloak: {
		inherit: true,
		onWeather(target, _, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id !== 'hail' || effect.id !== 'snow') return;
			target.side.addSideCondition('auroraveil');
			this.add('-activate', target, 'ability: Snow Cloak');
		}
	},
	curiousmedicine: {
		inherit: true,
		onStart(pokemon) {
			for (const target of pokemon.foes()) {
				target.clearBoosts();
				this.debug('Curious medicine debuff');
			}
			for (const ally of pokemon.allies()) {
				ally.clearBoosts();
				this.debug('Curious medicine debuff');
				ally.heal(ally.baseMaxhp / 4);
				this.debug('Curious medicine heal');
			}
			this.add('-activate', pokemon, 'ability: Curious Medicine');
		},
	},
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
					}
				}
			}
		},
	},
	cutecharm: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				for (const opp of target.adjacentFoes()) {
					this.add('-ability', target, 'Cute Charm', 'boost');
					if (opp.volatiles['substitute']) this.add('-immune', opp);
					else this.boost({atk: -1}, opp, target, null, true)
				}
			}
		},
	},
	grasspelt: {
		inherit: true,
		onModifySpDPriority: 5,
	},
	swarm: {
		inherit: true,
		shortDesc: "Sets up a terrain that prevents either side from using Self Boosting Moves.",
	},
	defeatist: {
		inherit: true,
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.hp <= (pokemon.maxhp / 4)) {
				return this.chainModify(0.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, pokemon) {
			if (pokemon.hp <= (pokemon.maxhp / 4)) {
				return this.chainModify(0.5);
			}
		}
	},
	galewings: {
		inherit: true,
		onModifyPriority(priority, pokemon, target, move) {
			if (move.type === 'Flying' && pokemon.hp >= (pokemon.maxhp / 2)) return priority + 1;
		},
	},
	aurabreak: {
		inherit: true,
		onSourceModifyDamage: undefined,
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (['Dark', 'Psychic', 'Fairy'].includes(move.type) && defender.getMoveHitData(move).typeMod > 0) {
				this.debug('Aura Break weaken');
				return this.chainModify(0.7);
			}
		},
		onSourceModifySpAPriority: 6,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (['Dark', 'Psychic', 'Fairy'].includes(move.type) && defender.getMoveHitData(move).typeMod > 0) {
				this.debug('Aura Break weaken');
				return this.chainModify(0.7);
			}
		}
	},
	vampire: {
		inherit: true,
		onModifyMove: undefined,
		onSourceDamagingHit(damage, target, source, move) {
			if (move.flags.bite) {
				this.heal((damage / 8), source, target, "drain");
			}
		}
	},
	cottondown: {
		inherit: true,
		onFoeBeforeMove: undefined,
		onFoeAfterMove: undefined,
		condition: {
			duration: 1,
			onStart(source, target, move) {
				this.add('-start', source, 'Cotton Down');
			},
			onModifyMove(move, pokemon, target) {
				move.priority = -6;
			},
			onEnd(source) {
				this.add('-end', source, 'Cotton Down');
			}
		}
	},
	hustle: {
		inherit: true,
		onModifyAtk(atk, source, target, move) {
			if (move.accuracy === 100 || move.accuracy === true) return this.chainModify([4506, 4096]);
			else return this.chainModify(1.5);
		},
	},
	shellarmor: {
		inherit: true,
		onModifyDefPriority: 6,
		onModifyDef(def, target, source, move) {
			return this.chainModify([4916, 4096]);
		},
		onModifySpDPriority: 6,
		onModifySpD(def, target, source, move) {
			return this.chainModify([4916, 4096]);
		},
		desc: "This ability allows the user to not be striked by critical hits! The user is gains a 1.2x Def & SpD buff!",
		shortDesc: "Can not be striked by Critical Hits. User also gets 1.2x Def & SpD buff.",
	},
	earlybird: {
		inherit: true,
		condition: {
			noCopy: true,
			duration: 2,
			onStart(target) {
				this.add('-start', target, 'ability: Early Bird');
			},
			onModifyPriority(priority, source, pokemon, move) {
				this.debug('Early Bird boost');
				return priority + 1;
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Early Bird');
			},
		},
	},
	innerfocus: {
		inherit: true,
		onModifyMovePriority: 1,
		onModifyMove(move) {
			if (move.id === 'focusblast') {
				move.accuracy = true;
			}
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, source, target, move) {
			return this.chainModify([3523, 4096]);
		},
		onModifyPriorityPriority: 21,
		onModifyPriority(priority, pokemon, target, move) {
			if (move.id === "focuspunch") {
				// + 3 should put it at Neutral since it being added to a -3 priority
				return priority + 3;
			}
		},
		desc: "Focus Blast can't miss; Focus Punch is changed to have a neutral priority and has a bp of 130. Still has Focus",
		shortDesc: "Focus Blast can't miss; Focus Punch = Neutral Priority and 130 Base Power.",
	},
};