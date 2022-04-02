import { Order } from "../../domain/entity/order";
import { OrderItem } from "../../domain/entity/orderItem";
import OrderRepositoryInterface from '../../domain/repository-interface/order-repository-interface';
import OrderItemModel from '../database/sequelize/model/order-item-model';
import OrderModel from "../database/sequelize/model/order-model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total,
      items: entity.items.map((item: OrderItem) => {
        return {
          id: item.id,
          order_id: entity.id,
          product_id: item.productId,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
        }
      })},
      {
        include: [{ model: OrderItemModel }]
      });
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total
    },
    { 
      where: { id: entity.id } 
    });

    await OrderItemModel.destroy({
      where: { order_id: entity.id }
    });

    await OrderItemModel.bulkCreate(entity.items.map((item: OrderItem) => {
      return {
        id: item.id,
        order_id: entity.id,
        product_id: item.productId,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
      }
    }));
  }

  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: { id }, rejectOnEmpty: true, include: [OrderItemModel]
      });
    } catch (error) {
      throw new Error("order not found");
    }
    const order = new Order(orderModel.id, orderModel.customer_id, orderModel.items.map((item: OrderItemModel) => {
      return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
    }));
    return order;
  }

  async findAll(): Promise<Order[]> {
    let orderModel;
    try {
      orderModel = await OrderModel.findAll({include: [OrderItemModel]});
    } catch (error) {
      throw new Error("order not found");
    }
    const orders = orderModel.map((order: OrderModel) => {
      return new Order(order.id, order.customer_id, order.items.map((item: OrderItemModel) => {
        return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
      }));
    });
    return orders;
  }
}
