import { Document } from 'mongoose';
import IEUser from './IEUser';

export default interface IEParties extends Document {
	name: string;
	admin: IEUser;
	users: IEUser[];
	vipUsers: IEUser[];
	bartender: IEUser;
}
