import { Customer } from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository-interface/customer-repository-interface";
import { Address } from "../../domain/vo/address";
import AddressModel from "../database/sequelize/model/address-model";
import CustomerModel from "../database/sequelize/model/customer-model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    const addressModelList: AddressModel[] = [];
    for (let address of entity.address) {
      let addressModel = new AddressModel();
      addressModel.street = address.street;
      addressModel.number = address.number;
      addressModel.city = address.city;
      addressModel.state = address.state;
      addressModel.country = address.country;
      addressModel.zipCode = address.zipCode;
      addressModel.customerId = entity.id;
      addressModelList.push(addressModel);
    }
    const customerModel = await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      rewardPoints: entity.rewardPoints,
      addressModel: {
        addressModelList,
      },
    });
  }

  update(entity: Customer): void {
    throw new Error("Method not implemented.");
  }

  find(id: string): Promise<Customer> {
    throw new Error("Method not implemented.");
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
