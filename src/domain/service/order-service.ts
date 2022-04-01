import { Customer } from "../entity/customer";
import { Order } from "../entity/order";
import { OrderItem } from "../entity/orderItem";
import { v4 as uuid } from "uuid";

export class OrderService {
  public static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (!customer) {
      throw new Error("There are no customer to place order");
    }
    if (!items || items.length === 0) {
      throw new Error("There are no item to place order");
    }
    const order = new Order(uuid(), customer.id, items);
    customer.addRewardPoints(order.total / 2);
    return order;
  }

  public static total(orders: Order[]): number {
    if (!orders) {
      throw new Error("There are no order to calculate total");
    }
    return orders.reduce((acc, order) => acc + order.total, 0);
  }
}
