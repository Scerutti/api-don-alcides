import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminUser } from '../admin.model';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_SECRET;

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Admin') private readonly adminModel: Model<Admin>,
  ) {}

  async validateAdminUser(username: string, password: string): Promise<Admin | null> {
    const user = await this.adminModel.findOne({ username, password }).exec();
    return user || null;
  }

  async generateJwtToken(adminUser: Admin): Promise<string> {
    return jwt.sign(adminUser.toJSON(), secretKey);
  }

  async verifyJwtToken(token: string): Promise<Admin> {
    return jwt.verify(token, secretKey) as Admin;
  }

  async registerAdminUser(adminUser: AdminUser): Promise<void> {
    const newUser = new this.adminModel(adminUser);
    await newUser.save();
  }

  async validateToken(token: string): Promise<boolean> {
    console.log('Secret Key:', secretKey);
    try {
      const decodedToken = jwt.verify(token, secretKey);
      console.log('Decoded Token:', decodedToken);
      return true;
    } catch (error) {
      console.error('Error verifying token:', error);
      return false;
    }    
  }
}
