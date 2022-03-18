import Product from "../entity/product";

export interface ProductService {
  increasePrice(products: Product[], percentage: number): void;
}

export class ProductServiceImpl implements ProductService {
  public increasePrice(products: Product[], percentage: number): void {
    if (!products) {
      throw new Error("There are no product to change price");
    }
    products.forEach((product) => {
      product.changePrice((product.price * percentage) / 100 + product.price);
    });
  }
}
