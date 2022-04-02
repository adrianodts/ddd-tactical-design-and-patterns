import { Sequelize } from "sequelize-typescript";
import { Customer } from '../../domain/entity/customer';
import { Order } from '../../domain/entity/order';
import { OrderItem } from '../../domain/entity/orderItem';
import Product from '../../domain/entity/product';
import { Address } from '../../domain/vo/address';
import AddressModel from '../database/sequelize/model/address-model';
import CustomerModel from '../database/sequelize/model/customer-model';
import OrderItemModel from '../database/sequelize/model/order-item-model';
import OrderModel from '../database/sequelize/model/order-model';
import ProductModel from '../database/sequelize/model/product-model';
import CustomerRepository from './customer-repository';
import OrderRepository from './order-repository';
import ProductRepository from './product-repository';

describe("order repository unit tests", () => {
  const orderRepository: OrderRepository = new OrderRepository();
  const productRepository: ProductRepository = new ProductRepository();
  const customerRepository: CustomerRepository = new CustomerRepository();
  let customer: Customer;
  let address: Address;
  let product: Product;

  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: true,
      sync: { force: true },
    });

    sequelize.addModels([OrderModel, OrderItemModel, CustomerModel, AddressModel, ProductModel]);
    await sequelize.sync();
    // add customer
    customer = new Customer("1", "Customer 1");
    address = new Address("Streee 1", "123", "Sao Paulo", "SP", "Brasil", "12345-678");
    customer.addAddress(address);
    await customerRepository.create(customer);
    // add product
    product = new Product("1", "Product 1", 10);
    await productRepository.create(product);
  });
  afterEach(async () => {
    await sequelize.close();
  });
 
  it("should create an order", async () => {
    // add order
    const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
    const order = new Order("1", customer.id, [orderItem]);
    await orderRepository.create(order);
    const orderModel = await OrderModel.findOne({
      where: { id: order.id }, 
      include: [{ model: OrderItemModel }]
    });
    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total,
      items: [{
        id: orderItem.id,
        order_id: order.id,
        product_id: product.id,
        name: product.name,
        price: product.price,
        quantity: orderItem.quantity
      }]
    });    
  });

  it("should update an order", async () => {
    // add order
    let orderItem = new OrderItem("1", product.name, product.price, product.id, 1);
    let order = new Order("1", customer.id, [orderItem]);    
    await orderRepository.create(order);
    // add product
    product = new Product("2", "Product 2", 20);
    await productRepository.create(product);
    // update order
    orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
    order = new Order("1", customer.id, [orderItem]);
    await orderRepository.update(order);
    const orderModel = await OrderModel.findOne({
      where: { id: order.id }, 
      include: [{ model: OrderItemModel }]
    });
    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total,
      items: [{
        id: orderItem.id,
        order_id: order.id,
        product_id: product.id,
        name: product.name,
        price: product.price,
        quantity: orderItem.quantity
      }]
    });     
  });
  it("should find an order", async () => {    
    // add order
    let orderItem = new OrderItem("1", product.name, product.price, product.id, 1);
    let order = new Order("1", customer.id, [orderItem]);    
    await orderRepository.create(order);
    // find order
    const orderFound = await orderRepository.find(order.id);
    expect(orderFound).toEqual(order);
    let total = 0;
    order.items.forEach(item => {
      expect(item.productId).toBe(product.id);
      expect(item.name).toBe(product.name);
      expect(item.price).toBe(product.price);
      expect(item.quantity).toBe(orderItem.quantity);
      total += item.calculate();
    });
    expect(order.total).toBe(total);
  });
  it("should find all orders", async () => {
    // add order 1
    const orderItem = new OrderItem("1", product.name, product.price, product.id, 1);
    const order = new Order("1", customer.id, [orderItem]);    
    await orderRepository.create(order);
    // add order 2
    const orderItem2 = new OrderItem("2", product.name, product.price, product.id, 2);
    const order2 = new Order("2", customer.id, [orderItem2]);    
    await orderRepository.create(order2);
    // find all orders
    const orders = await orderRepository.findAll();
    expect(orders.length).toBe(2);
    expect(orders[0]).toStrictEqual(order);
    let total = 0;
    orders[0].items.forEach(item => {
      expect(item.productId).toBe(product.id);
      expect(item.name).toBe(product.name);
      expect(item.price).toBe(product.price);
      expect(item.quantity).toBe(orderItem.quantity);
      total += item.calculate();
    })    
    expect(orders[0].total).toBe(total);
    let total2 = 0;
    expect(orders[1]).toStrictEqual(order2);
    orders[1].items.forEach(item => {
      expect(item.productId).toBe(product.id);
      expect(item.name).toBe(product.name);
      expect(item.price).toBe(product.price);
      expect(item.quantity).toBe(orderItem2.quantity);
      total2 += item.calculate();
    })
    expect(orders[1].total).toBe(total2);
  });
});
