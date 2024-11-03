import { ModdedDex } from '../../sim/dex';
import { ModifyPokemon } from './modifyPokemon';
export class ModifyMove {
	private _name: string;
	private _dex: ModdedDex;

	constructor(name: string, dex: ModdedDex) {
		this._name = name.includes(" ") ? name.toLowerCase().replace(' ', '') : name.toLowerCase();
		this._dex = dex;
		// console.log(this._name);
	}
	public setAccuracy(accuracy: number) {
		this._dex.modData('Moves', this._name).accuracy = accuracy;
		return this;
	}
	public setBasePower(basepower: number) {
		this._dex.modData('Moves', this._name).basePower = basepower;
		return this;
	}

	public setPowerPoint(pp: number) {
		this._dex.modData('Moves', this._name).pp = pp;
		return this;
	}

	public setOverrideDefensiveStat(stat: string) {
		this._dex.modData('Moves', this._name).overrideDefensiveStat = stat;
		return this;
	}

	public setOverrideOffensiveStat(stat: string) {
		this._dex.modData('Moves', this._name).overrideOffensiveStat = stat;
		return this;
	}

	public setType(type: String) {
		this._dex.modData('Moves', this._name).type = type;
		return this;
	}

	public setRecoil(recoil: [number, number] | number | undefined) {
		this._dex.modData('Moves', this._name).recoil = recoil;
		return this;
	}

	public setPriority(priority: number = 0) {
		this._dex.modData('Moves', this._name).priority = priority;
		return this;
	}

	public get secondaries() {
		return new class ModifySecondaries {
			constructor(private _name: string, private _dex: ModdedDex, private _move: ModifyMove) {}

			setVolatileStatus(status: string, chance: number = 100) {
				if (chance === 100) {
					this._dex.modData('Moves', this._name).volatileStatus = status;
				} else {
					this._dex.modData('Moves', this._name).secondary = {
						chance: chance,
						volatileStatus: status
					}
				}
				
				return this;
			}

			setStatusCondition(status: string, chance: number = 100) {
				if (chance === 100) {
					this._dex.modData('Moves', this._name).status = status;
				} else {
					this._dex.modData('Moves', this._name).secondary = {
						chance: chance,
						status: status,
					};
				}

				return this;
			}

			setSelfBoost(boosts: {[stat: string]: number}, chance: number = 100) {
				if (chance === 100) {
					this._dex.modData('Moves', this._name).self = {
						boosts: boosts
					}
				} else {
					this._dex.modData('Moves', this._name).self = {
						chance: chance,
						boosts: boosts
					}
				}

				return this;
			}

			public setTargetBoosts(boosts: {[stat: string]: number}, chance: number = 100) {
				if (chance === 100) {
					this._dex.modData('Moves', this._name).boosts = boosts;
				} else {
					this._dex.modData('Moves', this._name).secondary = {
						chance: chance,
						boosts: boosts
					};
				}

				return this;
			}

			public get move() { return this._move; }
		} (this._name, this._dex, this);
	}

	public get flags() {
		return new class ModifyMoveFlags {
			private _name: string;
			private _dex: ModdedDex;
			private _move: ModifyMove;

			constructor(name: string, dex: ModdedDex, move: ModifyMove) {
				this._name = name;
				this._dex = dex;
				this._move = move;
			}

			add(flag: string) {
				this._dex.modData('Moves', this._name).flags[flag] = 1;
				return this;
			}
			
			remove(flag: string) {
				delete this._dex.modData('Moves', this._name).flags[flag];
				return this;
			}

			set(flags: {[k: string]: number}) {
				this._dex.modData('Moves', this._name).flags = flags;
				return this;
			}

			public get move() { return this._move; }
			
		}(this._name, this._dex, this);
	}

	public get descriptions() {
		return new class ModifyDescriptions {
			constructor(private _name: string, private _dex: ModdedDex, private _move: ModifyMove) {}

			setLongDesc(desc?: string) {
				this._dex.modData('Moves', this._name).desc = desc;
				return this;
			}

			setShortDesc(desc?: string) {
				this._dex.modData('Moves', this._name).shortDesc = desc;
				return this;
			}

			public get move() { return this._move; }
		} (this._name, this._dex, this);
	}
}