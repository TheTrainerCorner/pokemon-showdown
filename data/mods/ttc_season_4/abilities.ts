export const Abilities: {[k: string]: ModdedAbilityData} = {
	//#region Cosmic Abilities
	cosmicsurge: {
		onStart(source) {
			this.field.setTerrain("cosmicterrain");
		},
		name: "Cosmic Surge",
		rating: 4,
		num: -4001,
		desc: "On Switch-In, starts Cosmic Terrain.",
		shortDesc: 'On switch-in, starts Cosmic Terrain.',
	},
	//#endregion

	//#region Modify Abilities
	tangledfeet: {
		inherit: true,
		onModifyMove: undefined,
		onSourceDamagingHit(damage, target, source, move) {
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			if (move.flags['kick']) {
				if (this.randomChance(33, 100)) {
					target.trySetStatus('par', source);
				}
			}
		}
	},
	tanglinghair: {
		inherit: true,
		onModifyMove: undefined,
		onModifySecondaries(secondaries, target, source, move) {
			if (move.flags['kick']) {
				secondaries.push({
					chance: 33,
					status: 'par',
				});
			}

			return secondaries;
		},
	},
	earlybird: {
		inherit: true,
		onModifyPriority(priority, source, target, move) {
			if (source.abilityState.earlybird) return;
			if (source.activeMoveActions < 1) {
				return priority + 3;
			}
		},
		desc: "Once per battle, when this pokemon uses an attacking move, it gets +3 prioirty.",
		shortDesc: "Once per battle, attacking move gains +3 priority."
	},
	baller: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bullet']) {
				this.debug('Baller boost');
				return this.chainModify(1.2);
			}
		},
		shortDesc: "This Pokemon's bullet moves have their power multiplied by 1.2."
	},

	colorchange: {
		inherit: true,
		onFoePrepareHit(source, target, move) {
			if (!target.hp) return;
			if (this.effectState.colorChange) return;
			if (move.category === 'Status') return;
			if (move.hasBounced || move.flags['futuremove'] || move.sourceEffect === 'snatch') return;
			const type = move.type;
			if (type && type !== '???') {
				let types = this.dex.mod(Config.ttcseason).types.all();
				let _type = this.dex.mod(Config.ttcseason).types.get(type);
				// 2 = Resistance
				let resistType = types.find(x => x.damageTaken[_type.name] === 2);
				if (target.getTypes().join() !== resistType?.name) {
					if (!target.setType(resistType!.name)) return;
					this.effectState.colorChange = true;
					this.add('-start', target, 'typechange', resistType?.name, '[from] ability: Color Change');
				}
			}
		},
		onSwitchIn(pokemon) {
			delete this.effectState.colorChange;
		},
		desc: "The user's type changes to resist the oncoming move from the opposing pokemon. This ability can only be triggered once per switch in. (Protean Clause)",
		shortDesc: "Changes type based on the oncoming move to resist. Once per switch in",
	},
	pressure: {
		inherit: true,
		onStart(pokemon) {
			this.field.addPseudoWeather('gravity');
		},
		onDeductPP: undefined,
		desc: undefined,
		shortDesc: "On Switch-In, sets up Gravity",
	},
	vitalspirit: {
		inherit: true,
		onDamagingHit(damage, target, source, effect) {
			this.effectState.vitalSpirit = true;
		},
		onModifyDamage(damage, source, target, move) {
			if (this.effectState.vitalSpirit) {
				this.debug('Vital Spirit boost');
				delete this.effectState.vitalSpirit;
				return this.chainModify(1.5);
			}
		},
		desc: "If hit by a physical move, the user's next attack will do 1.5x damage.",
		shortDesc: "If hit by a phyiscal move, the user's next attack will do 1.5x damage.",
	},
	dawnoflunacy: {
		inherit: true,
		onResidualOrder: undefined,
		onResidual: undefined,
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgemnt', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];

			if (move.type == 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Cosmic';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		desc: "This Pokemon's Normal-type moves become Cosmic-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, But before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's Normal-type moves become Cosmic Type and have 1.2x power.",
	},
	swarm: {
		inherit: true,
		onStart: undefined,
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Bug' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Swarm boost');
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Bug' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Swarm boost');
				return this.chainModify(2);
			}
		},
		desc: "At 1/3 or less of its max HP, this Pokemon's offensive stat is 2x with Bug-type Moves",
		shortDesc: '1/3 or less of max Hp, Offensive stat increased by 2x with Bug-type moves.',
	},

	//#endregion

	//#region New Abilities
	plasmaticfur: {
		onModifyDef(def, target, source, move) {
			return this.chainModify([6144, 4096]);
		},
		onModifySpD(def, target, source, move) {
			return this.chainModify([6144, 4096]);
		},
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if(move.type === 'Ice') mod *= 2;
			return this.chainModify(mod);
		},
		name: "Plasmatic Fur",
		desc: "Gains 1.5x to Defensive Stats, but weak to Ice-type moves.",
	},
	sundance: {
		onAfterMove(source, target, move) {
			if (move.flags.dance) {
				this.field.setWeather('sunnyday');
			}
		},
		name: "Sun Dance",
		shortDesc: "After performing a dancing move, Sunny Weather will occur!",
	},

	ruylopez: {
		onSourceDamagingHit(damage, target, source, move) {
			const stats: BoostID[] = [];
			let stat: BoostID;
			for (stat in target.boosts) {
				if (target.boosts[stat] < 6 && stat !== 'evasion' && stat !== 'accuracy') {
					stats.push(stat);
				}
			}

			if (stats.length) {
				const randomStat = this.sample(stats);
				const boost: SparseBoostsTable = {};
				boost[randomStat] = -1;
				this.boost(boost, target);
			} else {
				return false;
			}
		},
		name: "Ruy Lopez",
		desc: "When this pokemon attacks, lowers one random stat by 1 stage. Cannot be evasion or accuracy",
		shortDesc: "When this pokemon attacks, lowers one random stat of the opponent by 1 stage."
	},
	gatherersbounty: {
		// Handles the berry gain chance
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (!pokemon.hp || pokemon.item) return;
			if (!this.randomChance(1, 4)) return;

			// True = Sitrus; False = Starf Berry
			let berryChance = this.randomChance(1, 2);
			let berry;
			if (berryChance) berry = this.dex.items.get('sitrusberry');
			else berry = this.dex.items.get('starfberry');

			pokemon.setItem(berry);
			this.add('-item', pokemon, pokemon.getItem(), "[from] ability: Gatherer's Bounty");
		},

		// Handles the double effect part
		onTryHeal(damage, target, source, effect) {
			if(!effect) return;
			// Including Berry Juice and Leftovers in this.
			if (effect.name === 'Berry Juice' || effect.name === 'Leftovers')
				this.add('-activate', target, "ability: Gatherer's Bounty");
			if ((effect as Item).isBerry) return this.chainModify(2);
		},
		onChangeBoost(boost, target, source, effect) {
			if (effect && (effect as Item).isBerry) {
				let b: BoostID;
				for (b in boost) {
					boost[b]! *= 2;
				}
			}
		},
		onSourceModifyDamagePriority: -1,
		onSourceModifyDamage(damage, source, target, move) {
			if (target.abilityState.berryWeaken) {
				target.abilityState.berryWeaken = false;
				return this.chainModify(0.5);
			}
		},
		onTryEatItemPriority: -1,
		onTryEatItem(item, pokemon) {
			this.add('-activate', pokemon, "ability: Gatherer's Bounty");
		},
		onEatItem(item, pokemon) {
			const weakenBerries = [
				'Babiri Berry', 'Charti Berry', 'Chilan Berry', 'Chople Berry', 'Coba Berry', 'Colbur Berry', 'Haban Berry', 'Kasib Berry', 'Kebia Berry', 'Occa Berry', 'Passho Berry', 'Payapa Berry', 'Rindo Berry', 'Roseli Berry', 'Shuca Berry', 'Tanga Berry', 'Wacan Berry', 'Yache Berry',
			];
			// Record if the pokemon ate a berry to resist the attack
			pokemon.abilityState.berryWeaken = weakenBerries.includes(item.name);
		},
		name: "Gatherer's Bounty",
		desc: "At the end of each turn, If this pokemon is not currently holding an item, then it has a 25% chance of gaining a Sitrus or Starf Berry. When this Pokemon eats certain Berries, the effects are doubled. Berries that restore HP or PP have the amount doubled, Berries that raise stat stages have the amount doubled, Berries that havle damage taken guarter it instead, and a Jaboca Berry or Rowap Berry has the attacker lose 1/4 of its maximum HP, rounded down.",
		shortDesc: "25% chance to gain a Sitrus or Starf berry at the end of turn. Berrys gain a doubling effect."
	},
	luminouswraith: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === "Electric") {
				this.debug('Luminous Wraith boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === "Electric") {
				this.debug('Luminous Wraith boost');
				return this.chainModify(1.5);
			}
		},
		name: "Luminous Wraith",
		shortDesc: "This Pokemon's offensive stat is multiplied by 1.5 while using an Electric-type attack.",
	},
	myriadsurge: {
		onStart(pokemon) {
			this.field.setTerrain('myriadterrain');
		},
		name: "Myriad Surge",
		shortDesc: "Sets Myriad Terrain upon Switch-In",
	},
	calamitysurge: {
		onStart(pokemon) {
			this.field.setTerrain('calamityterrain');
		},
		name: "Calamity Surge",
		shortDesc: "Sets up Calamity Terrain upon Switch-In",
	},
	uzumaki: {
		onBasePowerPriority: 43,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['spin'] || move.flags['twist']) {
				this.debug('Uzumaki boost');
				return this.chainModify([5325, 4096]);
			}
		},
		name: "Uzumaki",
		rating: 3,
		gen: 9,
		shortDesc: "Spinning and Twisting moves used by this pokemon are 1.3x stronger.",
	}
	//#endregion
};