import { Schema, model } from 'mongoose';
import IEParties from '../interfaces/IEParties';

const PartySchema: Schema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	admin: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	bartender: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	users: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	vipUsers: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
});
export default model<IEParties>('Parties', PartySchema);
