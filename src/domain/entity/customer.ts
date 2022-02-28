import { Address } from "../vo/address";

export class Customer {

    private active: boolean = false;
    private address: Address | any = null;

    constructor(private id: string, private name: string) {
        this.validate();
    }

    private validate(): void {
        if (!this.id || this.id.trim().length === 0) {
            throw new Error('Customer id is required');
        }
        if (!this.name || this.name.trim().length === 0) {
            throw new Error('Customer name is required');
        }
    }

    get custmerId(): string {
        return this.id;
    }

    public setAddress(address: Address): void {
        this.address = address;
    }

    public changeName(name: string): void {
        this.name = name
    }

    public activate(): void {
        if (!this.address) {
            throw new Error("Address is mandatory to activate customer")
        }
        this.active = true
    }

    public deactivate(): void {
        this.active = true
    }
}