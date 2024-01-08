import { Controller, Post, Body, Put, Param, Delete, UseGuards, UnauthorizedException } from '@nestjs/common';
import { ProductsService } from './products/products.service';
import { Product } from './products/products.model';
import { AuthService } from './auth/auth.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly authService: AuthService
  ) {}

  @Post('products')
  async addProducts(
      @Body() { token, products }: { token: {token: string}; products: Product[] }
    ): Promise<string> {
    const isValid = await this.authService.validateToken(token.token);

    if (!isValid) {
      throw new UnauthorizedException('Token inválido');
    }

    await this.productsService.addProducts(products);
    return 'Products added successfully';
  }

  @Put('products/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() { token, updatedProduct }: { token: { token: string }; updatedProduct: Product },
  ): Promise<string> {
    const isValid = await this.authService.validateToken(token.token);
    if (!isValid) {
      throw new UnauthorizedException('Token inválido');
    }

    await this.productsService.updateProduct(id, updatedProduct);
    return 'Product updated successfully';
  }

  @Delete('products/:id')
  async deleteProduct(@Param('id') id: string): Promise<string> {
    await this.productsService.deleteProduct(id);
    return 'Product deleted successfully';
  }
}
