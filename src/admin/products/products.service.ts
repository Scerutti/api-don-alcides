import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

  async addProducts(products: Product[]): Promise<void> {
    const createdProducts = await this.productModel.create(products);
    createdProducts.forEach((createdProduct, index) => {
      products[index].id = createdProduct._id.toString();
    });
  }

  async updateProduct(id: string, updatedProduct: Product): Promise<void> {
    await this.productModel.findByIdAndUpdate(id, updatedProduct);
  }

  async deleteProduct(id: string): Promise<void> {
    await this.productModel.findByIdAndDelete(id);
  }

  async getProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }
}
