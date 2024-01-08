import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin.controller';
import { AuthService } from './auth/auth.service';
import { AdminService } from './admin.service';
import { ProductsService } from './products/products.service';
import { ProductsController } from './products/products.controller';
import { AdminSchema } from './admin.model';
import { AuthController } from './auth/auth.controller';
import { ProductSchema } from './products/products.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Admin', schema: AdminSchema }]),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }])
  ],
  controllers: [AdminController,AuthController, ProductsController],
  providers: [AuthService, AdminService, ProductsService],
})
export class AdminModule {}
