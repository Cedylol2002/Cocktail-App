import { Schema, model } from 'mongoose';
import IENotification from '../interfaces/IENotification';

const NotificationSchema: Schema = new Schema({
	message: { type: String, required: true },
	delivered: {
		type: Boolean,
		required: true,
		default: false,
	},
	toUser: {
		required: true,
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	fromUser: {
		required: true,
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
});
export default model<IENotification>('notifications', NotificationSchema);
