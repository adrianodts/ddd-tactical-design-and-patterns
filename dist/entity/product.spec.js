"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("./product"));
describe("Product entity unit tests", () => {
    it("should throw error when product id blank", () => {
        expect(() => new product_1.default("", "Product 1", 10)).toThrow("Product id is required");
    });
    it("should throw error when product name blank", () => {
        expect(() => new product_1.default("123", "", 10)).toThrow("Product name is required");
    });
    it("should throw error when product price is less or equal to zero", () => {
        expect(() => new product_1.default("123", "Product 1", -1)).toThrow("Product price must be greater than zero");
    });
    it("should change product name", () => {
        const product = new product_1.default("123", "Product 1", 1);
        product.changeName("Product Two");
        expect(product.name).toBe("Product Two");
    });
    it("should change product price", () => {
        const product = new product_1.default("123", "Product 1", 1);
        product.changePrice(2);
        expect(product.price).toBe(2);
    });
    it("should throw error when change product price to less or equal to zero", () => {
        const product = new product_1.default("123", "Product 1", 1);
        expect(() => product.changePrice(0)).toThrow("Product price must be greater than zero");
    });
});
