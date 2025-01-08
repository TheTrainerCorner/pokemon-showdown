export const Abilities: {[k: string]: ModdedAbilityData} = {
	commander: {
		inherit: true,
		isPermanent: true,
	},
	hadronengine: {
		inherit: true,
		isPermanent: true,
	},
	illuminate: {
		inherit: true,
		onTryBoost() {},
		onModifyMove() {},
		isBreakable: undefined,
		rating: 0,
	},
	mindseye: {
		inherit: true,
		isNonstandard: "Future",
	},
	orichalcumpulse: {
		inherit: true,
		isPermanent: true,
	},
	supersweetsyrup: {
		inherit: true,
		isNonstandard: "Future",
	},
	hospitality: {
		inherit: true,
		isNonstandard: "Future",
	},
	toxicchain: {
		inherit: true,
		isNonstandard: "Future",
	},
	embodyaspectcornerstone: {
		inherit: true,
		isNonstandard: "Future",
	},
	embodyaspecthearthflame: {
		inherit: true,
		isNonstandard: "Future",
	},
	embodyaspectteal: {
		inherit: true,
		isNonstandard: "Future",
	},
	embodyaspectwellspring: {
		inherit: true,
		isNonstandard: "Future",
	},
};
