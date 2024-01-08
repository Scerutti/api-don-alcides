import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';

import * as dotenv from "dotenv";

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_ADMIN}@don-alcides.hpsfdey.mongodb.net/DonAlcides`),
    AdminModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
