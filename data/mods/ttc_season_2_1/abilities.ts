export const Abilities: {[k: string]: ModdedAbilityData} = {
	artillery: {
		inherit: true,
		onAfterMove(source, target, move) {
			if (move.category !== 'Status') {
				source.clearPositiveBoosts()
				this.add('-clearboost', source, '[from] ability: Artillery');
			}
		}
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
			if (move.accuracy !== 100) return this.chainModify([4506, 4096]);
			else return this.chainModify(1.5);
		},
	},
};