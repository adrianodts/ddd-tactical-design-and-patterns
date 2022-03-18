"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
class Customer {
    constructor(id, name) {
        this.active = false;
        this.address = null;
        this._id = id;
        this._name = name;
        this.validate();
    }
    validate() {
        if (!this._id || this._id.trim().length === 0) {
            throw new Error("Customer id is required");
        }
        if (!this._name || this._name.trim().length === 0) {
            throw new Error("Customer name is required");
        }
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    isActive() {
        return this.active;
    }
    setAddress(address) {
        this.address = address;
    }
    changeName(name) {
        this._name = name;
    }
    activate() {
        if (!this.address) {
            throw new Error("Address is mandatory to activate customer");
        }
        this.active = true;
    }
    deactivate() {
        this.active = false;
    }
}
exports.Customer = Customer;
