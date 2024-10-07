import { ModifyPokemon } from "../../../tools/utils/modifyPokemon";

export const Scripts: ModdedBattleScriptsData = {
	inherit: "ttc_season_3",
	init() {
		this.modData("TypeChart", "normal").damageTaken["Cosmic"] = 0;
		this.modData("TypeChart", "fire").damageTaken["Cosmic"] = 0;
		this.modData("TypeChart", "water").damageTaken["Cosmic"] = 0;
		this.modData("TypeChart", "grass").damageTaken["Cosmic"] = 0;
		this.modData("TypeChart", "electric").damageTaken["Cosmic"] = 2;
		this.modData("TypeChart", "ice").damageTaken["Cosmic"] = 2;
		this.modData("TypeChart", "fighting").damageTaken["Cosmic"] = 0;
		this.modData("TypeChart", "poison").damageTaken["Cosmic"] = 3;
		this.modData("TypeChart", "ground").damageTaken["Cosmic"] = 1;
		this.modData("TypeChart", "flying").damageTaken["Cosmic"] = 0;
		this.modData("TypeChart", "psychic").damageTaken["Cosmic"] = 1;
		this.modData("TypeChart", "bug").damageTaken["Cosmic"] = 2;
		this.modData("TypeChart", "rock").damageTaken["Cosmic"] = 0;
		this.modData("TypeChart", "ghost").damageTaken["Cosmic"] = 0;
		this.modData("TypeChart", "dragon").damageTaken["Cosmic"] = 0;
		this.modData("TypeChart", "dark").damageTaken["Cosmic"] = 2;
		this.modData("TypeChart", "steel").damageTaken["Cosmic"] = 0;
		this.modData("TypeChart", "fairy").damageTaken["Cosmic"] = 0;

		new ModifyPokemon('Gardevoir', this)
			.types
				.setType('Cosmic', 'Psychic');
	},
};