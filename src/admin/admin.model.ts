import * as mongoose from 'mongoose';

export const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});

export interface Admin extends mongoose.Document {
  username: string;
  password: string;
  email: string;
}

export const AdminModel = mongoose.model<Admin>('Admin', AdminSchema);

export interface AdminUser {
  username: string;
  password: string;
  email: string;
}