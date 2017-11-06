import {Map} from 'immutable';
import {BasicCustomerInstance} from './Controller';

export class CustomerLoader {
    private customerStore: Map<string, BasicCustomerInstance>;

    constructor() {
        this.customerStore = Map();
    }

    public registerCustomer(customer: string, instance: BasicCustomerInstance) {
        if (this.customerStore.has(customer)) {
            throw new Error('find exist DataCustomer: ' + customer);
        }

        this.customerStore = this.customerStore.set(customer, instance);
    }

    public getCustomer(customer: string) {
        return this.customerStore.get(customer);
    }
}

export const customerInstance = new CustomerLoader();