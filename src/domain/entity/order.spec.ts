import { Order } from "./order";
import { OrderItem } from "./orderItem";

describe("Order entity test", () => {
  test("Should throw error when order id is empty", () => {
    let items: OrderItem[] = [new OrderItem("1", "Item 1", 10.5, "123", 1)];
    expect(() => new Order("", "1", items)).toThrow("Order id is required");
  });

  test("Should throw error when customer id is empty", () => {
    expect(
      () => new Order("1", "", [new OrderItem("1", "Item 1", 10.5, "456", 1)])
    ).toThrow("Customer id is required");
  });

  test("Should throw error when items is empty", () => {
    expect(() => new Order("1", "1", [])).toThrow("Items are required");
  });

  test("Should test order total", () => {
    // agregate order
    let items: OrderItem[] = [
      new OrderItem("1", "Item 1", 10.5, "123", 1),
      new OrderItem("2", "Item 2", 5.5, "456", 2),
    ];
    let order = new Order("1", "1", items);
    expect(order.total()).toBe(21.5);
  });
});
