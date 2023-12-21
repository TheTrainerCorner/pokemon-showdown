export const Moves: {[k: string]: ModdedMoveData} = {
	soulfang: {
		num: -2001,
		name: "Soul Fang",
		basePower: 80,
		accuracy: 90,
		pp:10,
		priority: 0,
		type: "Ghost",
		category: "Physical",
		drain: [1, 2],
		flags: {contact: 1, bite: 1},
		secondary: null,
		target: "normal",
		contestType: "Cool",
		shortDesc: "Heals 50% of the damage dealt",
		desc: "User recovers 50% of the damage dealt to the target.",
	}
};