import { Customer } from "../entity/customer";
import { Order } from "../entity/order";
import { OrderItem } from "../entity/orderItem";
import { OrderService } from "./order-service";
import { validate } from "uuid";
describe("order service unit test", () => {
  it("should place order", () => {
    const customer = new Customer("c1", "Customer 1");
    const item1 = new OrderItem("i1", "Item 1", 10, "p1", 1);
    const order = OrderService.placeOrder(customer, [item1]);
    expect(customer.rewardPoints).toBe(5);
    expect(order.total).toBe(10);
    expect(validate(order.id)).toBeTruthy();
  });

  it("should get total of all orders", () => {
    const items: OrderItem[] = [
      new OrderItem("i1", "Item 1", 10.5, "p1", 1),
      new OrderItem("i2", "Item 2", 20.5, "p2", 2),
    ];
    const order1 = new Order("1", "1", [items[0]]);
    const order2 = new Order("1", "1", [items[1]]);
    const total = OrderService.total([order1, order2]);
    expect(total).toBe(51.5);
  });
});
