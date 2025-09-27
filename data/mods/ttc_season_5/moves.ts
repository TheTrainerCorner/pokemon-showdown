export const Moves: {[k: string]: ModdedMoveData} = {
	pixieburst: {
		accuracy: 100,
		basePower: 95,
		category: "Special",
		name: "Pixie Burst",
		pp: 24,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			boosts: {
				spa: -1,
			},
		},
		target: "normal",
		type: "Fairy",
		desc: "Has a 20% chance to lower the target's Special Attack by 1 stage.",
		shortDesc: "20% chance to lower the target's Sp. Atk by 1.",
	},
};