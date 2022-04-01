import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../database/sequelize/model/customer-model";
import AddressModel from "../database/sequelize/model/address-model";
import { Customer } from "../../domain/entity/customer";
import CustomerRepository from "./customer-repository";
import { Address } from "../../domain/vo/address";

describe("customer repository unit tests", () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: true,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel, AddressModel]);
    await sequelize.sync();
  });
  afterEach(async () => {
    await sequelize.close();
  });
  it("should create customer with one address", async () => {
    const customerRepository: CustomerRepository = new CustomerRepository();
    const customer: Customer = new Customer("1", "Customer 1");
    const address = new Address(
      "Streee 1",
      "123",
      "Sao Paulo",
      "SP",
      "Brasil",
      "12345-678"
    );
    customer.addAddress(address);
    await customerRepository.create(customer);
    const customerModel = await CustomerModel.findOne({
      where: { id: customer.id }, 
      include: [{ model: AddressModel }]
    });
    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      rewardPoints: customer.rewardPoints,
      address: [{
        id: 1,
        customer_id: customer.id,
        street: address.street,
        number: address.number,
        city: address.city,
        state: address.state,
        country: address.country,
        zipCode: address.zipCode,
      }],
    });
    // const addressModelList = await AddressModel.findAll({
    //   where: { customerId: customer.id },
    // });
    // for (let addressModel of customerModel.address) {
    //   expect(addressModel.toJSON()).toStrictEqual({
    //     street: "Streee 1",
    //     number: "123",
    //     city: "Sao Paulo",
    //     state: "SP",
    //     country: "Brasil",
    //     zipCode: "12345-678",
    //   });
    //   console.log("entrou");
    // }
  });

  it("should throw an error when customer is not found", () => {
    const customerRepository: CustomerRepository = new CustomerRepository();
    expect(async () => {
      await customerRepository.find("ABCDE");
    }).rejects.toThrow("Customer not found");
  });

  // it("should update product", async () => {
  //   const productRepository: ProductRepository = new ProductRepository();
  //   const product: Product = new Product("1", "Product 1", 10);

  //   await productRepository.create(product);
  //   let productModel = await ProductModel.findOne({
  //     where: { id: product.id },
  //   });
  //   expect(productModel.toJSON()).toStrictEqual({
  //     id: product.id,
  //     name: product.name,
  //     price: product.price,
  //   });

  //   product.changeName("Product One");
  //   product.changePrice(100);
  //   await productRepository.update(product);
  //   productModel = await ProductModel.findOne({
  //     where: { id: product.id },
  //   });
  //   expect(productModel.toJSON()).toStrictEqual({
  //     id: product.id,
  //     name: product.name,
  //     price: product.price,
  //   });
  // });

  // it("should find a product", async () => {
  //   const productRepository: ProductRepository = new ProductRepository();
  //   const product: Product = new Product("1", "Product 1", 10);

  //   await productRepository.create(product);
  //   const productFound: Product = await productRepository.find(product.id);

  //   expect(productFound.id).toStrictEqual(product.id);
  //   expect(productFound.name).toStrictEqual(product.name);
  //   expect(productFound.price).toStrictEqual(product.price);
  //   expect(productFound).toStrictEqual(product);
  // });

  // it("should find all products", async () => {
  //   const productRepository: ProductRepository = new ProductRepository();
  //   const product1: Product = new Product("1", "Product 1", 10);
  //   await productRepository.create(product1);

  //   const product2 = new Product("2", "Product 2", 20);
  //   await productRepository.create(product2);

  //   const productsFound: Product[] = await productRepository.findAll();
  //   const productsCreated: Product[] = [product1, product2];

  //   expect(productsCreated).toEqual(productsFound);
  // });
});
