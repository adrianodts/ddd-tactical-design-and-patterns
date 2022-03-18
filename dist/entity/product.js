"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    constructor(id, name, price) {
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();
    }
    get name() {
        return this._name;
    }
    get price() {
        return this._price;
    }
    validate() {
        if (!this._id || this._id.trim().length === 0) {
            throw new Error("Product id is required");
        }
        if (!this._name || this._name.trim().length === 0) {
            throw new Error("Product name is required");
        }
        if (!this._price || this._price <= 0) {
            throw new Error("Product price must be greater than zero");
        }
    }
    changeName(value) {
        this._name = value;
        this.validate();
    }
    changePrice(value) {
        this._price = value;
        this.validate();
    }
}
exports.default = Product;
