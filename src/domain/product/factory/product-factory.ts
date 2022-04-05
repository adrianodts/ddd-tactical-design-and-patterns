import { v4 as uuid } from 'uuid';
import Product from '../entity/product';
import ProductInterface from '../entity/product.interface';

export default class ProductFactory {
  
  static create(type: string, name: string, price: number): ProductInterface {
    switch (type) {
      case 'a':
      case 'b':
        return new Product(uuid(), name, price);
      default:
        throw new Error('Product type not supported');
    }
  }
}
