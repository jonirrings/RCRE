import {Map} from 'immutable';
import {CustomerSourceConfig} from './Controller';

export class CustomerLoader {
    private customerStore: Map<string, CustomerSourceConfig>;

    constructor() {
        this.customerStore = Map();
    }

    public registerCustomer(customer: string, source: CustomerSourceConfig) {
        if (this.customerStore.has(customer)) {
            throw new Error('find exist DataCustomer: ' + customer);
        }

        this.customerStore = this.customerStore.set(customer, source);
    }

    public getCustomer(customer: string) {
        return this.customerStore.get(customer);
    }
}

export const customerInstance = new CustomerLoader();