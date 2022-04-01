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
      } 
    );
    // orderModel.id = entity.id;
    // orderModel.customer_id = entity.customerId;
    // orderModel.total = entity.total();
    // orderModel.items =  entity.items.map((item: OrderItem) => {
    //   const orderItemModel = new OrderItemModel();
    //   orderItemModel.id = item.id;
    //   orderItemModel.order_id = entity.id;
    //   orderItemModel.product_id = item.productId;
    //   orderItemModel.quantity = item.quantity;
    //   orderItemModel.price = item.price;
    //   orderItemModel.name = item.name;
    //   return orderItemModel;
    // });    
    // await orderModel.save();
  }
  update(entity: Order): void {
    throw new Error('Method not implemented.');
  }
  find(id: string): Promise<Order> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Order[]> {
    throw new Error('Method not implemented.');
  }
  // async create(entity: Order): Promise<void> {
  //   const addressModelList: AddressModel[] = [];
  //   for (let address of entity.address) {
  //     let addressModel = new AddressModel();
  //     addressModel.street = address.street;
  //     addressModel.number = address.number;
  //     addressModel.city = address.city;
  //     addressModel.state = address.state;
  //     addressModel.country = address.country;
  //     addressModel.zipCode = address.zipCode;
  //     addressModel.customerId = entity.id;
  //     addressModelList.push(addressModel);
  //   }
  //   const customerModel = await CustomerModel.create({
  //     id: entity.id,
  //     name: entity.name,
  //     rewardPoints: entity.rewardPoints,
  //     addressModel: {
  //       addressModelList,
  //     },
  //   });
  // }

  // update(entity: Customer): void {
  //   throw new Error("Method not implemented.");
  // }

  // async find(id: string): Promise<Customer> {
  //   let customerModel;
  //   try {
  //     customerModel = await CustomerModel.findOne({
  //       where: { id }, rejectOnEmpty: true, include: [AddressModel]
  //     });
  //   } catch (error) {
  //     throw new Error("Customer not found");
  //   }
  //   const customer = new Customer(customerModel.id, customerModel.name);
  //   customerModel.addressModel.forEach(address => {
  //     customer.setAddress(new Address(address.street, address.number, address.city, address.state, address.country, address.zipCode));
  //   })
  //   return customer;
  // }

  // findAll(): Promise<Customer[]> {
  //   throw new Error("Method not implemented.");
  // }

  // async update(entity: Product): Promise<void> {
  //   await ProductModel.update(
  //     {
  //       name: entity.name,
  //       price: entity.price,
  //     },
  //     {
  //       where: { id: entity.id },
  //     }
  //   );
  // }
  // async find(id: string): Promise<Product> {
  //   const productModel = await ProductModel.findOne({
  //     where: { id },
  //   });
  //   return new Product(productModel.id, productModel.name, productModel.price);
  // }
  // async findAll(): Promise<Product[]> {
  //   const productsModel: ProductModel[] = await ProductModel.findAll();
  //   const products: Product[] = productsModel.map((p) => {
  //     return new Product(p.id, p.name, p.price);
  //   });
  //   return products;
  // }
}
