import { Address } from '../vo/address';
import { Customer } from './customer';

describe("Customer entity test", () => {

    test("Should initialize customer", () => {
        let customer = new Customer("123", "Adriano");
        expect(customer.custmerId).toBe("123");
    })

    test("Should throw error if customer id invalid", () => {
        let id: any = null;
        expect(() => new Customer(id, "Adriano")).toThrow('Customer id is required');
    })

    test("Should throw error if customer name invalid", () => {
        let name: any = null;
        expect(() => new Customer("123", name)).toThrow('Customer name is required');
    })
});