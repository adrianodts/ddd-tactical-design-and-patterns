import { Address } from "../vo/address";
import { Customer } from "./customer";

describe("Customer entity test", () => {
  test("Should initialize customer", () => {
    let customer = new Customer("123", "Adriano");
    expect(customer.id).toBe("123");
  });

  test("Should throw error if customer id invalid", () => {
    let id: any = null;
    expect(() => new Customer(id, "Adriano")).toThrow(
      "Customer id is required"
    );
  });

  test("Should throw error if customer name invalid", () => {
    let name: any = null;
    expect(() => new Customer("123", name)).toThrow(
      "Customer name is required"
    );
  });

  test("Should change customer name", () => {
    const customer = new Customer("123", "Adriano");
    customer.changeName("Fulano de tal");
    expect(customer.name).toBe("Fulano de tal");
  });

  test("Should activate customer", () => {
    const address = new Address(
      "Streee 1",
      "123",
      "Sao Paulo",
      "SP",
      "Brasil",
      "12345-678"
    );
    const customer = new Customer("123", "Adriano");
    customer.addAddress(address);
    customer.activate();
    expect(customer.isActive()).toBeTruthy();
  });

  test("Should deactivate customer", () => {
    const customer = new Customer("123", "Adriano");
    customer.deactivate();
    expect(customer.isActive()).toBeFalsy();
  });
  test("Should throw error when customer address is undefined", () => {
    //   const customer = new Customer("123", "Adriano");
    //   expect(() => customer.activate()).toThrow(
    //     "Address is mandatory to activate customer"
    //   );
    expect(() => {
      const customer = new Customer("123", "Adriano");
      customer.activate();
    }).toThrowError("Address is mandatory to activate customer");
  });

  test("Should add customer reward points", () => {
    const customer = new Customer("123", "Adriano");
    expect(customer.rewardPoints).toBe(0);
    customer.addRewardPoints(5);
    expect(customer.rewardPoints).toBe(5);
    customer.addRewardPoints(5);
    expect(customer.rewardPoints).toBe(10);
  });
});
