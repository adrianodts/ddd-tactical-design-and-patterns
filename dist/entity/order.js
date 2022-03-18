"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
class Order {
    constructor(id, customerId, items) {
        this._items = [];
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._total = this.total();
        this.validate();
    }
    validate() {
        if (!this._id || this._id.trim().length === 0) {
            throw new Error("Order id is required");
        }
        if (!this._customerId || this._customerId.trim().length === 0) {
            throw new Error("Customer id is required");
        }
        if (!this._items || this._items.length === 0) {
            throw new Error("Items are required");
        }
        return true;
    }
    total() {
        // let total = 0;
        // for( var item of this.items) {
        //     total += item.calculate();
        // }
        // return total;
        // return this._items.reduce((acc, item) => acc + item.price, 0);
        return this._items.reduce((acc, item) => (acc += item.calculate()), 0);
    }
}
exports.Order = Order;
