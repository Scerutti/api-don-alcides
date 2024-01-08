import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from './auth/auth.service';
import { ProductsService } from './products/products.service';
import { Admin } from './admin.model';
import { Product } from './products/products.model';

@Injectable()
export class AdminService {
  constructor(
    private readonly authService: AuthService,
    private readonly productsService: ProductsService,
    @InjectModel('Admin') private readonly adminModel: Model<Admin>,
  ) {}

  async validateAdminToken(token: string): Promise<void> {
    try {
      await this.authService.verifyJwtToken(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async addProducts(products: Product[]): Promise<void> {
    await this.productsService.addProducts(products);
  }

  async updateProduct(id: string, updatedProduct: Product): Promise<void> {
    await this.productsService.updateProduct(id, updatedProduct);
  }

  async deleteProduct(id: string): Promise<void> {
    await this.productsService.deleteProduct(id);
  }
}
