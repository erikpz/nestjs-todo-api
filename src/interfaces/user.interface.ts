import { Document } from 'mongoose';

export interface User extends Document {
  readonly _id: string;
  readonly userName: string;
  readonly name: string;
  readonly lastName: string;
  readonly email: string;
  readonly password?: string;
  readonly phoneNumber: string;
  readonly profilePhotoUrl: string;
  readonly createdAt: Date;
}
