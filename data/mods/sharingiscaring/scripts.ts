export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	inherit: 'gen9',
	pokemon: {
		isGrounded(negateImmunity) {
			if ('gravity' in this.battle.field.pseudoWeather) return true;
			if ('ingrain' in this.volatiles && this.battle.gen >= 4) return true;
			if ('smackdown' in this.volatiles) return true;
			const item = (this.ignoringItem() ? '' : this.item);
			if (item === 'ironball' || (this.volatiles['item:ironball'] && !this.ignoringItem())) return true;
			// If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
			if (!negateImmunity && this.hasType('Flying') && !(this.hasType('???') && 'roost' in this.volatiles)) return false;
			if (this.hasAbility('levitate') && !this.battle.suppressingAbility(this)) return null;
			if ('magnetrise' in this.volatiles) return false;
			if ('telekinesis' in this.volatiles) return false;
			if (item === 'airballoon' || (this.volatiles['item:airballoon'] && !this.ignoringItem())) return false;
			return true;
		},
		hasItem(item) {
			if (Array.isArray(item)) {
				return item.some(i => this.hasItem(i));
			} else {
				if (this.battle.toID(item) !== this.item && !this.volatiles['item:' + this.battle.toID(item)]) return false;
			}
			return !this.ignoringItem();
		},
	},
};
