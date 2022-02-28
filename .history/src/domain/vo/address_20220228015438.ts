export class Address {

    constructor(private street: string, private number: string, private city: string, private state: string, 
        private country: string, private zipCode: string) {

        this.validate();
    }

    validate() {
        console.log(this);
        if (!this.street || this.street.trim().length) {
            throw new Error("Street is required");
        }
        if ((!this.number) || (this.number.trim().length)) {
            throw new Error("Number is required");
        }
        if ((!this.city) || (this.city.trim().length)) {
            throw new Error("City is required");
        }
        if ((!this.state) || (this.state.trim().length)) {
            throw new Error("State is required");
        }
        if ((!this.country) || (this.country.trim().length)) {
            throw new Error("Country is required");
        }
        if ((!this.zipCode) || (this.zipCode.trim().length)) {
            throw new Error("ZipCode is required");
        }
    }
}