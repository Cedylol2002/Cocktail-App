import { Schema, model } from 'mongoose';
import IEUntesilien from '../interfaces/IEUtensilien';

const UtensilSchema: Schema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
});
export default model<IEUntesilien>('utensilien', UtensilSchema);
