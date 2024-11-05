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

	//#endregion

	//#region New Abilities

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

	//#endregion
};