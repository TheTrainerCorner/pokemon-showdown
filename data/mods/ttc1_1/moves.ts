export const Moves: {[k: string]: ModdedMoveData} = {
	shelter: {
		inherit: true,
		volatileStatus: 'protect',
		priority: 4,
		flags: { noassist: 1, failcopycat: 1},
		stallingMove: true,
		boosts: {
			def: 1,
		},
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
	}
};
