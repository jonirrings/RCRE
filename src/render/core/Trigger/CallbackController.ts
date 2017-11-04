import * as _ from 'lodash';
import {Map} from 'immutable';

type callbackItem = {
    name: string;
    targetCustomer: string;
    params: string[] | number[] | boolean[];
};

export class CallbackController {
    private store: Map<string, callbackItem | callbackItem[]>; 
    
    constructor() {
        this.store = Map({});
    }
    
    public registerCallback(name: string, targetCustomer: string, params: string[] | number[] | boolean[]): void {
        if (!_.isString(name) || !_.isString(targetCustomer) || !_.isArray(params)) {
            console.error('registerCallback should container name, targetCustomer and params');
        }
        
        if (!this.store.has(name)) {
            this.store = this.store.set(name, {
                name,
                targetCustomer,
                params
            });
        } else {
            let item = this.store.get(name);
            
            if (item instanceof Array) {
                item.push({
                    name,
                    targetCustomer,
                    params
                });
                this.store = this.store.set(name, item);
            } else {
                let array = [item];
                array.push({
                    name,
                    targetCustomer,
                    params
                });
                this.store = this.store.set(name, array);
            }
        }
    }
    
    public handleCallback() {
        
    }
}