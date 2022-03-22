import Product from "../../domain/entity/product";
import { Sequelize } from "sequelize-typescript";
import ProductModel from "../database/sequelize/model/product-model";
import ProductRepository from "./product-repository";

describe("product repository unit tests", () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: true,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });
  afterEach(async () => {
    await sequelize.close();
  });
  it("should create product", async () => {
    const productRepository: ProductRepository = new ProductRepository();
    const product: Product = new Product("1", "Product 1", 10);

    await productRepository.create(product);
    const productModel = await ProductModel.findOne({
      where: { id: product.id },
    });

    expect(productModel.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });

  it("should update product", async () => {
    const productRepository: ProductRepository = new ProductRepository();
    const product: Product = new Product("1", "Product 1", 10);

    await productRepository.create(product);
    let productModel = await ProductModel.findOne({
      where: { id: product.id },
    });
    expect(productModel.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });

    product.changeName("Product One");
    product.changePrice(100);
    await productRepository.update(product);
    productModel = await ProductModel.findOne({
      where: { id: product.id },
    });
    expect(productModel.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });

  it("should find a product", async () => {
    const productRepository: ProductRepository = new ProductRepository();
    const product: Product = new Product("1", "Product 1", 10);

    await productRepository.create(product);
    const productFound: Product = await productRepository.find(product.id);

    expect(productFound.id).toStrictEqual(product.id);
    expect(productFound.name).toStrictEqual(product.name);
    expect(productFound.price).toStrictEqual(product.price);
    expect(productFound).toStrictEqual(product);
  });

  it("should find all products", async () => {
    const productRepository: ProductRepository = new ProductRepository();
    const product1: Product = new Product("1", "Product 1", 10);
    await productRepository.create(product1);

    const product2 = new Product("2", "Product 2", 20);
    await productRepository.create(product2);

    const productsFound: Product[] = await productRepository.findAll();
    const productsCreated: Product[] = [product1, product2];

    expect(productsCreated).toEqual(productsFound);
  });
});
