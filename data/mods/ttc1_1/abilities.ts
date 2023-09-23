export const Abilities: { [k: string]: ModdedAbilityData} = {
	slowstart: {
		inherit: true,
		condition: {
			onModifyAtkPriority: undefined,
			onModifyAtk: undefined,
		},
		desc: "On switch-in, this Pokemon's Speed are halved for 5 Turns.",
		shortDesc: "On switch-in, this Pokemon's Speed are halved for 5 Turns.",
	}
};
