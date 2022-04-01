import { Customer } from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository-interface/customer-repository-interface";
import { Address } from "../../domain/vo/address";
import AddressModel from "../database/sequelize/model/address-model";
import CustomerModel from "../database/sequelize/model/customer-model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      rewardPoints: entity.rewardPoints,
      address: entity.address.map((address: Address) => {
        return {
          street: address.street,
          number: address.number,
          city: address.city,
          state: address.state,
          country: address.country,
          zipCode: address.zipCode,
          customerId: entity.id,
        }
      }),       
    }, { include: [AddressModel] });
  }

  update(entity: Customer): void {
    throw new Error("Method not implemented.");
  }

  async find(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({
        where: { id }, rejectOnEmpty: true, include: [AddressModel]
      });
    } catch (error) {
      throw new Error("Customer not found");
    }
    const customer = new Customer(customerModel.id, customerModel.name);
    customerModel.address.forEach(address => {
      customer.addAddress(new Address(address.street, address.number, address.city, address.state, address.country, address.zipCode));
    })
    return customer;
  }

  findAll(): Promise<Customer[]> {
    throw new Error("Method not implemented.");
  }

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
