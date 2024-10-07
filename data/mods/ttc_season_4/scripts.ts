import { ModifyPokemon } from "../../../tools/utils/modifyPokemon";

export const Scripts: ModdedBattleScriptsData = {
	inherit: "ttc_season_3",
	init() {
		//#region Cosmic Damage To
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
		//#endregion
		new ModifyPokemon('Cleffa', this)
			.types
				.setType('Cosmic');
		new ModifyPokemon('Clefairy', this)
			.types
				.setType('Cosmic', 'Fairy');
		new ModifyPokemon('Clefable', this)
			.types
				.setType('Cosmic', 'Fairy');
		new ModifyPokemon('Ralts', this)
			.types
				.setType('Cosmic', 'Psychic');
		new ModifyPokemon('Kirlia', this)
			.types
				.setType('Cosmic', 'Psychic');
		new ModifyPokemon('Gardevoir', this)
			.types
				.setType('Cosmic', 'Psychic');
		new ModifyPokemon('Lunatone', this)
			.types
				.setType('Cosmic', 'Water');
		new ModifyPokemon('Solrock', this)
			.types
				.setType('Cosmic', 'Fire');
		new ModifyPokemon('Jirachi', this)
			.types
				.setType('Cosmic', 'Psychic');
		new ModifyPokemon('Deoxy', this)
			.types
				.setType('Cosmic');
		new ModifyPokemon('Palkia', this)
			.types
				.setType('Cosmic', 'Dragon');
		new ModifyPokemon('Cresselia', this)
			.types
				.setType('Cosmic');
		new ModifyPokemon('Gothita', this)
			.types
				.setType('Cosmic', 'Dark');
		new ModifyPokemon('Gothorita', this)
			.types
				.setType('Cosmic', 'Dark');
		new ModifyPokemon('Gothitelle', this)
			.types
				.setType('Cosmic', 'Dark');
		new ModifyPokemon('Elgyem', this)
			.types
				.setType('Cosmic');
		new ModifyPokemon('Beheeyem', this)
			.types
				.setType('Cosmic');
		new ModifyPokemon('Hoopa', this)
			.types
				.setType('Cosmic', 'Ghost');
		new ModifyPokemon('Hoopa-Unbound', this)
			.types
				.setType('Cosmic', 'Dark');
		new ModifyPokemon('Minior', this)
			.types
				.setType('Cosmic', 'Rock');
		new ModifyPokemon('Cosmog', this)
			.types
				.setType('Cosmic');
		new ModifyPokemon('Cosmoem', this)
			.types
				.setType('Cosmic');
		new ModifyPokemon('Solgaleo', this)
			.types
				.setType('Comsic', 'Psychic')
		new ModifyPokemon('Lunala', this)
			.types
				.setType('Comsic', 'Ghost');
		new ModifyPokemon('Nihilego', this)
			.types
				.setType('Comsic', 'Poison');
		new ModifyPokemon('Dottler', this)
			.types
				.setType('Bug', 'Cosmic');
		new ModifyPokemon('Orbeetle', this)
			.types
				.setType('Bug', 'Cosmic');
		new ModifyPokemon('Eternatus', this)
			.types
				.setType('Cosmic', 'Poison');
		new ModifyPokemon('Flittle', this)
			.types
				.setType('Cosmic');
		new ModifyPokemon('Espathra', this)
			.types
				.setType('Cosmic');
		new ModifyPokemon('PalafinHero', this)
			.types
				.setType('Cosmic', 'Water');
		new ModifyPokemon('IronMoth', this)
			.types
				.setType('Cosmic', 'Fire');
		new ModifyPokemon('Terapagos', this)
			.types
				.setType('Cosmic', 'Normal');
	},
};