import { Address } from '../value-object/address';

export class Customer {
  private active: boolean = false;
  private _address: Address[] = [];
  private _id: string;
  private _name: string;
  private _rewardPoints: number = 0;

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

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get address(): Address[] {
    return this._address;
  }

  isActive(): boolean {
    return this.active;
  }

  public addAddress(address: Address): void {
    this._address.push(address);
  }

  public changeName(name: string): void {
    this._name = name;
  }

  public activate(): void {
    if (!this._address || this._address.length === 0) {
      throw new Error("Address is mandatory to activate customer");
    }
    this.active = true;
  }

  public deactivate(): void {
    this.active = false;
  }

  public addRewardPoints(points: number) {
    this._rewardPoints += points;
  }
}
