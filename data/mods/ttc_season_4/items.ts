export const Items: {[k: string]: ModdedItemData} = {
	phoenixsfeather: {
		name: "Phoenix's Feather",
		spritenum: -100,
		fling: {
			basePower: 10,
		},
		onBeforeFaint(pokemon, effect) {
			if (pokemon.itemState.phoenixsFeather) return;
			this.add('-activate', pokemon, "item: Phoenix's Feather", pokemon);
			pokemon.hp = this.trunc(pokemon.maxhp / 2);
			pokemon.clearStatus();
			this.add('-sethp', pokemon, pokemon.getHealth, '[silent]');
			pokemon.clearBoosts();
			this.add('-clearboost', pokemon, '[silent]');
			pokemon.trySetStatus('phc', pokemon, effect);
			pokemon.itemState.phoenixsFeather = true;
			pokemon.useItem();
			return false;
		},
		desc: "If user faints, item will revive them to 50% and inflicts the user with a Curse that does Damage over Time and lowers the Highest Offensive stat.",
		shortDesc: "If User Faints, Revives to 50%, Inflicts User with Phoenix's Curse.",
	}
};