import ProductFactory from './product-factory';

describe("product factory unit tests", () => {
  it("should create a product a", () => {
    const product = ProductFactory.create("a", "Product A", 10);
    expect(product.name).toBe("Product A");
    expect(product.price).toBe(10);
  });
  it("should create a product b", () => {
    const product = ProductFactory.create("b", "Product B", 10);
    expect(product.name).toBe("Product B");
    expect(product.price).toBe(10);
  });
  it("should throw an error when product type is not supported", () => {
    expect(() => {
      ProductFactory.create("c", "Product C", 10);
    }).toThrow("Product type not supported");
  });
});