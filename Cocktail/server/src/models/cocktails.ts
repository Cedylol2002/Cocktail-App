import { Schema, model } from 'mongoose';
import IECocktail from '../interfaces/IECocktails';

const CockSchema: Schema = new Schema({
	bild: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
		unique: true,
	},
	alkohol: {
		type: Boolean,
	},
	diff: {
		type: Number,
		required: true,
	},
	anleitung: {
		type: String,
		required: true,
	},
	utensil: {
		type: Array,
	},
	zutaten: {
		type: Array,
		required: true,
	},
});
export default model<IECocktail>('Cocktail', CockSchema);
