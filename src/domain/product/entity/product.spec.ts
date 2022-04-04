import Product from "./product";

describe("Product entity unit tests", () => {
  it("should throw error when product id blank", () => {
    expect(() => new Product("", "Product 1", 10)).toThrow(
      "Product id is required"
    );
  });

  it("should throw error when product name blank", () => {
    expect(() => new Product("123", "", 10)).toThrow(
      "Product name is required"
    );
  });

  it("should throw error when product price is less or equal to zero", () => {
    expect(() => new Product("123", "Product 1", -1)).toThrow(
      "Product price must be greater than zero"
    );
  });

  it("should change product name", () => {
    const product = new Product("123", "Product 1", 1);
    product.changeName("Product Two");
    expect(product.name).toBe("Product Two");
  });

  it("should change product price", () => {
    const product = new Product("123", "Product 1", 1);
    product.changePrice(2);
    expect(product.price).toBe(2);
  });

  it("should throw error when change product price to less or equal to zero", () => {
    const product = new Product("123", "Product 1", 1);
    expect(() => product.changePrice(0)).toThrow(
      "Product price must be greater than zero"
    );
  });
});
