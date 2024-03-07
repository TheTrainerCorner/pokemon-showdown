import { ModifyPokemon } from "../../../tools/utils/modifyPokemon";

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'ttc_season_2_0',
	init() {
		// Version 2.1.0
		new ModifyPokemon('Uxie', this)
			.types
				.setType('Psychic', 'Steel')
			.pokemon.learnset
				.add('Iron Head')
				.add('Flash Cannon')
				.add('Autotomize')
				.add('Doom Desire')
				.add('Smart Strike')
				.add('Ice Beam')
				.add('Icy Wind');
		new ModifyPokemon('Mesprit', this)
			.learnset
				.add('Moonblast')
				.add('Alluring Voice')
				.add('Moonlight')
				.add('Play Rough')
				.add('Misty Explosion');
		new ModifyPokemon('IronValiant', this)
			.baseStats
				.setSPE(114);
		new ModifyPokemon('Entei', this)
			.baseStats
				.setHP(120)
				.setATK(95)
				.setDEF(90)
				.setSPA(95)
		new ModifyPokemon('Naganadel', this)
			.baseStats
				.setHP(80)
				.setDEF(77)
				.setSPA(120)
				.setSPE(117);
		new ModifyPokemon('Gigachelonian', this)
			.abilities
				.setAbility1('Poison Heal')
			.pokemon.baseStats
				.setHP(60)
				.setATK(70)
				.setDEF(180)
				.setSPA(60)
				.setSPD(170)
				.setSPE(10);
		new ModifyPokemon('Trevenant-Autumn', this)
			.baseStats
				.setATK(110)
				.setSPE(71);
		new ModifyPokemon('Octillery', this)
			.baseStats
				.setHP(76)
				.setATK(127)
				.setDEF(88)
				.setSPA(127)
				.setSPD(82)
			.pokemon.learnset
				.remove('Aeroblast')
				.remove('Origin Pulse');
		new ModifyPokemon('Camerupt-Mega', this)
			.baseStats
				.setATK(110);
		new ModifyPokemon('Thundraco', this)
			.abilities
				.setHiddenAbility('Teravolt');
		new ModifyPokemon('sotanaht', this)
			.learnset
				.add('aquatail')
				.add('bodyslam')
				.add('disable')
				.add('doubleedge')
				.add('dragontail')
				.add('earthquake')
				.add('facade')
				.add('frustration')
				.add('gigadrain')
				.add('glare')
				.add('gunkshot')
				.add('haze')
				.add('knockoff')
				.add('mudbomb')
				.add('painsplit')
				.add('poisonjab')
				.add('protect')
				.add('psychicfangs')
				.add('pursuit')
				.add('refresh')
				.add('rest')
				.add('return')
				.add('rockslide')
				.add('seedbomb')
				.add('shedtail')
				.add('sleeptalk')
				.add('sludgebomb')
				.add('sludgewave')
				.add('substitute')
				.add('suckerpunch')
				.add('switcheroo')
				.add('terablast')
				.add('throatchop')
				.add('toxic')
				.add('toxicspikes')
				.add('trailblaze')
				.add('acid')
				.add('acidspray')
				.add('attract')
				.add('beatup')
				.add('belch')
				.add('bide')
				.add('bind')
				.add('bite')
				.add('breakingswipe')
				.add('brutalswing')
				.add('bulldoze')
				.add('captivate')
				.add('confide')
				.add('dig')
				.add('doubleteam')
				.add('endure')
				.add('fissure')
				.add('gastroacid')
				.add('gigaimpact')
				.add('headbutt')
				.add('hyperbeam')
				.add('infestation')
				.add('irontail')
				.add('jawlock')
				.add('leer')
				.add('megadrain')
				.add('mimic')
				.add('mudshot')
				.add('acid')
				.add('mudslap')
				.add('naturalgift')
				.add('payback')
				.add('poisonsting')
				.add('poisontail')
				.add('rage')
				.add('raindance')
				.add('rocktomb')
				.add('round')
				.add('scaleshot')
				.add('scaryface')
				.add('secretpower')
				.add('skittersmack')
				.add('skullbash')
				.add('slam')
				.add('snarl')
				.add('snore')
				.add('spite')
				.add('spitup')
				.add('stockpile')
				.add('stompingtantrum')
				.add('strength')
				.add('sunnyday')
				.add('swagger')
				.add('swallow')
				.add('takedown')
				.add('thief')
				.add('thunderfang')
				.add('torment')
				.add('venoshock')
				.add('wrap');	
		new ModifyPokemon('meloettacaroler', this)
			.learnset
				.add('acrobatics')
				.add('alluring Voice')
				.add('allyswitch')
				.add('batonpass')
				.add('calmmind')
				.add('celebrate')
				.add('charm')
				.add('closecombat')
				.add('coaching')
				.add('confide')
				.add('confusion')
				.add('dazzlinggleam')
				.add('disarmingvoice')
				.add('doubleteam')
				.add('drainpunch')
				.add('echoedvoice')
				.add('endure')
				.add('energyball')	
				.add('facade')
				.add('flash')
				.add('fling')
				.add('focusblast')
				.add('frustration')
				.add('gigaimpact')
				.add('grassknot')
				.add('healbell')
				.add('helpinghand')
				.add('hyperbeam')
				.add('hypervoice')	
				.add('icepunch')
				.add('knockoff')	
				.add('lastresort')
				.add('lightscreen')
				.add('magiccoat')
				.add('metronome')
				.add('perishsong')
				.add('protect')
				.add('psychic')
				.add('psyshock')
				.add('psychup')
				.add('quickattack')
				.add('raindance')	
				.add('rest')
				.add('return')
				.add('roleplay')
				.add('round')
				.add('safegurad')	
				.add('secretpower')
				.add('shadowball')	
				.add('signalbeam')
				.add('sing')
				.add('skillswap')
				.add('sleeptalk')
				.add('snore')
				.add('stoneedge')
				.add('substitute')
				.add('swagger')
				.add('swift')
				.add('swordsdance')
				.add('teeterdance')	
				.add('thunder')
				.add('thunderbolt')
				.add('toxic')
				.add('trick')
				.add('trickroom')
				.add('tripleaxel')
				.add('uturn')
				.add('workup')
				.add('zenheadbutt')
				.add('Play Rough')	
		new ModifyPokemon('galladeolympios', this)
			.learnset
				.add("phantomforce")
				.add("smackdown")
				.add("thunderpunch")
				.add("firepunch")
				.add("icepunch")
				.add("ember")
				.add("return")
				.add("frustration")
				.add("protect")
				.add("rest")
				.add("sleeptalk")
				.add("terablast")
		new ModifyPokemon('gardevoirolympios',this)	
			.learnset
				.add("return")
				.add("frustration")
				.add("protect")
				.add("rest")
				.add("sleeptalk")
				.add("terablast")
				.add("gigadrain")
				.add("ember")
				.add("airslash")
				.add("weatherball")	
	},
}