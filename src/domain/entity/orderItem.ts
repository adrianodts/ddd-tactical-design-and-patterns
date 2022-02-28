export class OrderItem {
    private id: string;
    private price: number;
    private name: string;
    private qt: number;

    constructor(id: string, name: string, price: number, qt: number) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.qt = qt;
    }

    public calculate(): number {
        return this.price * this.qt;
    }
}