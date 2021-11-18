import { Schema, model } from 'mongoose';
import Cocktail from '../interfaces/IECocktails';

const ZutatSchema: Schema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	alkohol: {
		type: Number,
		required: false,
	},
	bestand: {
		type: Number,
		required: false,
	},
	bestand_einheit: {
		type: String,
		required: false,
	},
});
export default model<Cocktail>('Zutaten', ZutatSchema);
