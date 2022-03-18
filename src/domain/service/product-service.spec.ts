import Product from "../entity/product";
import { ProductServiceImpl } from "./product-service";
describe("product service test", () => {
  it("should change all products price", () => {
    const products = [
      new Product("1", "Product one", 10),
      new Product("2", "Product two", 20),
    ];
    const percentage = 100;
    const orderService = new ProductServiceImpl();
    orderService.increasePrice(products, percentage);

    expect(products[0].price).toBe(20);
    expect(products[1].price).toBe(40);
  });
});
