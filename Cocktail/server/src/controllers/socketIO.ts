import { Socket } from 'socket.io';
import { Document } from 'mongoose';
import IEUser from '../interfaces/IEUser';
import NotificationSchema from '../models/Notification';

async function OnCocktailOrder(socket: Socket, user: IEUser): Promise<any> {
	const notification: Document = new NotificationSchema({
		message: socket.data.notification.msg,
		delivered: false,
		toUser: socket.data.user,
		fromUser: user,
	});
	await notification.save();
}

export default { OnCocktailOrder };
