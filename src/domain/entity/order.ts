import { OrderItem } from "./orderItem";

export class Order {
  private _id: string;
  private _customerId: string;
  private _total: number;
  private _items: OrderItem[] = [];

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total;
    this.validate();
  }

  public validate(): boolean {
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

  public get id(): string {
    return this._id;
  }

  public get customerId(): string {
    return this._customerId;
  }

  public get items(): OrderItem[] {
    return this._items;
  }

  public addItem(item: OrderItem): void {
    this._items.push(item);
  }

  public get total(): number {    
    return this._items.reduce((acc, item) => (acc += item.calculate()), 0);
  }
}
