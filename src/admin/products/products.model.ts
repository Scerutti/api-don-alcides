import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  name: String,
  price: String,
  description: String,
  image: String,
});

export interface Product extends mongoose.Document {
  name: string;
  price: string;
  description?: string;
  image?: string;
}

export const ProductModel = mongoose.model<Product>('Product', ProductSchema);
