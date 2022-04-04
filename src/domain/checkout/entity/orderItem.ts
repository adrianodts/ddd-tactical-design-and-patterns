export class OrderItem {
  private _id: string;
  private _productId: string;
  private _price: number;
  private _name: string;
  private _qt: number;

  constructor(
    id: string,
    name: string,
    price: number,
    productId: string,
    qt: number
  ) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._productId = productId;
    this._qt = qt;
    this.validate();
  }

  public calculate(): number {
    return this._price * this._qt;
  }

  public get id(): string {
    return this._id;
  }

  public get productId(): string {
    return this._productId;
  }

  public get name(): string {
    return this._name;
  }

  public get price(): number {
    return this._price;
  }

  public get quantity(): number {
    return this._qt;
  }

  public validate(): void {
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
