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
	}
};