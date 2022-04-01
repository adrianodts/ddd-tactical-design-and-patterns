import { Sequelize } from "sequelize-typescript";
import { or } from 'sequelize/types';
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
  });
  afterEach(async () => {
    await sequelize.close();
  });

  it("should create order with one item", async () => {
    const orderRepository: OrderRepository = new OrderRepository();
    const productRepository: ProductRepository = new ProductRepository();
    const customerRepository: CustomerRepository = new CustomerRepository();
    // add customer
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Streee 1", "123", "Sao Paulo", "SP", "Brasil", "12345-678");
    customer.addAddress(address);
    await customerRepository.create(customer);
    // add product
    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);
    // add order
    const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
    const order = new Order("1", customer.id, [orderItem]);
    //order.addItem(orderItem);
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
  // it("should create customer with one address", async () => {
  //   const customerRepository: CustomerRepository = new CustomerRepository();
  //   const customer: Customer = new Customer("1", "Customer 1");
  //   const address = new Address(
  //     "Streee 1",
  //     "123",
  //     "Sao Paulo",
  //     "SP",
  //     "Brasil",
  //     "12345-678"
  //   );
  //   customer.setAddress(address);
  //   await customerRepository.create(customer);
  //   const customerModel = await CustomerModel.findOne({
  //     where: { id: customer.id },
  //   });
  //   expect(customerModel.toJSON()).toStrictEqual({
  //     id: customer.id,
  //     name: customer.name,
  //     rewardPoints: customer.rewardPoints,
  //   });
  //   const addressModelList = await AddressModel.findAll({
  //     where: { customerId: customer.id },
  //   });
  //   for (let addressModel of addressModelList) {
  //     expect(addressModel.toJSON()).toStrictEqual({
  //       street: "Streee 1",
  //       number: "123",
  //       city: "Sao Paulo",
  //       state: "SP",
  //       country: "Brasil",
  //       zipCode: "12345-678",
  //     });
  //     console.log("entrou");
  //   }
  // });

  // it("should throw an error when customer is not found", () => {
  //   const customerRepository: CustomerRepository = new CustomerRepository();
  //   expect(async () => {
  //     await customerRepository.find("ABCDE");
  //   }).rejects.toThrow("Customer not found");
  // });

});
