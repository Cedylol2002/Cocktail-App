import { Document } from 'mongoose';
import IEUser from './IEUser';

// Notification Interface
export default interface IENotification extends Document {
	message: string;
	delivered: boolean;
	toUser: IEUser;
	fromUser: IEUser;
}
