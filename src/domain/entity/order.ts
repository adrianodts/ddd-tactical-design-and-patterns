import { totalmem } from 'os';
import { OrderItem } from './orderItem';

export class Order { 
    
    private id: string;
    private customerId: string;
    private items: OrderItem[] = [];

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this.id = id;
        this.customerId = customerId;
        this.items = items;
    }

    get total(): number {
        let total = 0;
        for( var item of this.items) {
            total += item.calculate();
        }
        return total;

    }
}