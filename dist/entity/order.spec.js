"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("./order");
const orderItem_1 = require("./orderItem");
describe("Order entity test", () => {
    test("Should throw error when order id is empty", () => {
        let items = [new orderItem_1.OrderItem("1", "Item 1", 10.5, "123", 1)];
        expect(() => new order_1.Order("", "1", items)).toThrow("Order id is required");
    });
    test("Should throw error when customer id is empty", () => {
        expect(() => new order_1.Order("1", "", [new orderItem_1.OrderItem("1", "Item 1", 10.5, "456", 1)])).toThrow("Customer id is required");
    });
    test("Should throw error when items is empty", () => {
        expect(() => new order_1.Order("1", "1", [])).toThrow("Items are required");
    });
    test("Should test order total", () => {
        // agregate order
        let items = [
            new orderItem_1.OrderItem("1", "Item 1", 10.5, "123", 1),
            new orderItem_1.OrderItem("2", "Item 2", 5.5, "456", 2),
        ];
        let order = new order_1.Order("1", "1", items);
        expect(order.total()).toBe(21.5);
    });
});
