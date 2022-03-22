export class Address {
  private _street: string;
  private _number: string;
  private _city: string;
  private _state: string;
  private _country: string;
  private _zipCode: string;

  constructor(
    street: string,
    number: string,
    city: string,
    state: string,
    country: string,
    zipCode: string
  ) {
    this._street = street;
    this._number = number;
    this._city = city;
    this._state = state;
    this._country = country;
    this._zipCode = zipCode;
    this.validate();
  }

  get street(): string {
    return this._street;
  }
  get number(): string {
    return this._number;
  }
  get city(): string {
    return this._city;
  }
  get state(): string {
    return this._state;
  }
  get country(): string {
    return this._country;
  }
  get zipCode(): string {
    return this._zipCode;
  }

  validate() {
    if (!this._street || this._street.trim().length === 0) {
      throw new Error("Street is required");
    }
    if (!this._number || this._number.trim().length === 0) {
      throw new Error("Number is required");
    }
    if (!this._city || this._city.trim().length === 0) {
      throw new Error("City is required");
    }
    if (!this._state || this._state.trim().length === 0) {
      throw new Error("State is required");
    }
    if (!this._country || this._country.trim().length === 0) {
      throw new Error("Country is required");
    }
    if (!this._zipCode || this._zipCode.trim().length === 0) {
      throw new Error("ZipCode is required");
    }
  }
}
