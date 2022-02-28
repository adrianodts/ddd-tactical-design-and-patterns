import exp from 'constants';
import { Address } from '../vo/address';
import { Customer } from './customer';
import { Order } from './order';
import { OrderItem } from './orderItem';

describe("Order entity test", () => {

    test("Should test order total", () => {
        // agregate customer
        let customer = new Customer("123", "Adriano");
        const address = new Address("Rua Teste", "123", "Bairro Teste", "São Paulo", "Brasil", "12345-678")
        customer.setAddress(address);

        // agregate order
        let items: OrderItem[] = [
            new OrderItem("1", "Item 1", 10.5, 1),
            new OrderItem("2", "Item 2", 5.5, 2),
        ];
        let order = new Order("1", customer.custmerId, items);
        expect(order.total).toBe(21.5);
    })

});