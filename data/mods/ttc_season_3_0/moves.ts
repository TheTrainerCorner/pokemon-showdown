export const Moves: {[k: string]: ModdedMoveData} = {
	//#region Physical Moves
	payday: {
		inherit: true,
		basePower: 80,
	},
	//#endregion
	//#region Special Moves

	//#endregion
	//#region Other Moves

	//#endregion

	//#region Fakemon Moves
	snowtimesong: {
		inherit: true,
		onHit(target, pokemon, move) {
			if (pokemon.baseSpecies.baseSpecies === 'Meloetta' && !pokemon.transformed) {
				move.willChangeForme = true;
			}

			if (pokemon.species.id === 'meloettacaroler') {
				this.field.setWeather('snow');
			} else if (pokemon.species.id === 'meloettaaurora' && this.field.isWeather(['hail', 'snow'])) {
				pokemon.side.addSideCondition('auroraveil');
			}
		},
		desc: "If Meloetta-Caroler, move will be a special move, and sets snow; If Meloetta-Aurora, move will be physical and sets aurora veil.",
		shortDesc: "Meloetta-Caroler = Special + Snow; Meloetta-Aurora = Physical + Aurora Veil",
	},
	//#endregion

	//#region New Moves

	//#region Fireworks Event
	lavatsunami: { // PT333
		num: -3001,
		accuracy: 95,
		basePower: 100,
		category: "Special",
		name: "Lava Tsunami",
		pp: 8,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1},
		thawsTarget: true,
		secondary: {
			chance: 50,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
		contestType: "Tough",
	},
	//#endregion


	//#endregion
}