export default class Product {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get price(): number {
    return this._price;
  }

  public validate(): void {
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

  public changeName(value: string): void {
    this._name = value;
    this.validate();
  }

  public changePrice(value: number): void {
    this._price = value;
    this.validate();
  }
}
