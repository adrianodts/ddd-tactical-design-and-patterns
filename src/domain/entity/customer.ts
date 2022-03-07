import { Address } from "../vo/address";

export class Customer {
  private active: boolean = false;
  private address: Address | any = null;
  private _id: string;
  private _name: string;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  private validate(): void {
    if (!this._id || this._id.trim().length === 0) {
      throw new Error("Customer id is required");
    }
    if (!this._name || this._name.trim().length === 0) {
      throw new Error("Customer name is required");
    }
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  isActive(): boolean {
    return this.active;
  }

  public setAddress(address: Address): void {
    this.address = address;
  }

  public changeName(name: string): void {
    this._name = name;
  }

  public activate(): void {
    if (!this.address) {
      throw new Error("Address is mandatory to activate customer");
    }
    this.active = true;
  }

  public deactivate(): void {
    this.active = false;
  }
}
