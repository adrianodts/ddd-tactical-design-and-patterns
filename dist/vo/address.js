"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
class Address {
    constructor(street, number, city, state, country, zipCode) {
        this.street = street;
        this.number = number;
        this.city = city;
        this.state = state;
        this.country = country;
        this.zipCode = zipCode;
        this.validate();
    }
    validate() {
        if (!this.street || this.street.trim().length === 0) {
            throw new Error("Street is required");
        }
        if (!this.number || this.number.trim().length === 0) {
            throw new Error("Number is required");
        }
        if (!this.city || this.city.trim().length === 0) {
            throw new Error("City is required");
        }
        if (!this.state || this.state.trim().length === 0) {
            throw new Error("State is required");
        }
        if (!this.country || this.country.trim().length === 0) {
            throw new Error("Country is required");
        }
        if (!this.zipCode || this.zipCode.trim().length === 0) {
            throw new Error("ZipCode is required");
        }
    }
}
exports.Address = Address;
