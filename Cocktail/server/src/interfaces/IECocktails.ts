export default interface Cocktail {
	bild: string;
	name: string;
	alkohol: boolean;
	zutaten: zutat_menge[];
	diff: number;
	anleitung: string;
	utensil?: [];
}

export enum Einheit {
	liter = 'L',
	gramm = 'g',
	stk = 'stk',
	EL = 'EL',
	TL = 'TL',
	BL = 'Blatt',
	TR = 'Tropfen',
	Pr = 'Prise',
	Da = 'Dash',
	ml = 'ml',
	cl = 'cl',
}

export interface Zutat {
	name: string;
	alkohol?: number;
	bestand: number;
	bestand_einheit: string;
}

export interface zutat_menge extends Zutat {
	menge: number;
}
