"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = require("../vo/address");
const customer_1 = require("./customer");
describe("Customer entity test", () => {
    test("Should initialize customer", () => {
        let customer = new customer_1.Customer("123", "Adriano");
        expect(customer.id).toBe("123");
    });
    test("Should throw error if customer id invalid", () => {
        let id = null;
        expect(() => new customer_1.Customer(id, "Adriano")).toThrow("Customer id is required");
    });
    test("Should throw error if customer name invalid", () => {
        let name = null;
        expect(() => new customer_1.Customer("123", name)).toThrow("Customer name is required");
    });
    test("Should change customer name", () => {
        const customer = new customer_1.Customer("123", "Adriano");
        customer.changeName("Fulano de tal");
        expect(customer.name).toBe("Fulano de tal");
    });
    test("Should activate customer", () => {
        const address = new address_1.Address("Streee 1", "123", "Sao Paulo", "SP", "Brasil", "12345-678");
        const customer = new customer_1.Customer("123", "Adriano");
        customer.setAddress(address);
        customer.activate();
        expect(customer.isActive()).toBeTruthy();
    });
    test("Should deactivate customer", () => {
        const customer = new customer_1.Customer("123", "Adriano");
        customer.deactivate();
        expect(customer.isActive()).toBeFalsy();
    });
});
test("Should throw error when customer address is undefined", () => {
    //   const customer = new Customer("123", "Adriano");
    //   expect(() => customer.activate()).toThrow(
    //     "Address is mandatory to activate customer"
    //   );
    expect(() => {
        const customer = new customer_1.Customer("123", "Adriano");
        customer.activate();
    }).toThrowError("Address is mandatory to activate customer");
});
