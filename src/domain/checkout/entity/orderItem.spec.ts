import { OrderItem } from "./orderItem";

describe("OrderItem entity test", () => {
  test("Should throw error when orderItem id is empty", () => {
    expect(() => new OrderItem("", "Item 1", 10.5, "123", 1)).toThrow(
      "Item id is required"
    );
  });

  test("Should throw error when product id is empty", () => {
    expect(() => new OrderItem("1", "Item 1", 10.5, "", 1)).toThrow(
      "Product id is required"
    );
  });

  test("Should throw error when price is less or equals to zero", () => {
    expect(() => new OrderItem("1", "Item 1", 0, "123", 1)).toThrow(
      "Item price must be greater than zero"
    );
  });

  test("Should throw error when price is less or equals to zero", () => {
    expect(() => new OrderItem("1", "Item 1", 1, "123", -1)).toThrow(
      "Item quantity must be greater than zero"
    );
  });

  test("Should calculate item", () => {
    let items: OrderItem[] = [
      new OrderItem("1", "Item 1", 10.5, "123", 1),
      new OrderItem("2", "Item 2", 5.5, "456", 2),
    ];
    expect(items[0].calculate()).toBe(10.5);
    expect(items[1].calculate()).toBe(11);
  });
});
