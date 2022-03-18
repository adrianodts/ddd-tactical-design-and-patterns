"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItem = void 0;
class OrderItem {
    constructor(id, name, price, productId, qt) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._productId = productId;
        this._qt = qt;
        this.validate();
    }
    calculate() {
        return this._price * this._qt;
    }
    get price() {
        return this._price;
    }
    validate() {
        if (!this._id || this._id.trim().length === 0) {
            throw new Error("Item id is required");
        }
        if (!this._productId || this._productId.trim().length === 0) {
            throw new Error("Product id is required");
        }
        if (!this._price || this._price <= 0) {
            throw new Error("Item price must be greater than zero");
        }
        if (!this._qt || this._qt <= 0) {
            throw new Error("Item quantity must be greater than zero");
        }
    }
}
exports.OrderItem = OrderItem;
