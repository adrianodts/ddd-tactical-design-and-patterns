export class Cpf {
    constructor(private value: string) {
        this.validate(value)
    }

    private validate(value: string) {
        throw new Error("Method not implemented.");
    }
}