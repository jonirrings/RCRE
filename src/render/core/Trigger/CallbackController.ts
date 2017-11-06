import * as _ from 'lodash';
import {Map} from 'immutable';

type callbackItem = {
    name: string;
    targetCustomer: string;
    params: (string | number | boolean)[];
    debug: boolean;
};

export class CallbackController {
    private store: Map<string, callbackItem | callbackItem[]>; 
    
    constructor() {
        this.store = Map({});
    }

    public hasCallback(name: string): boolean {
        return this.store.has(name);
    }

    public registerCallback(name: string,
                            targetCustomer: string,
                            params: (string | number | boolean)[],
                            debug: boolean = false) {
        if (!_.isString(name) || !_.isString(targetCustomer)) {
            console.error('registerCallback should container name, targetCustomer');
        }
        
        if (!this.store.has(name)) {
            this.store = this.store.set(name, {
                name,
                targetCustomer,
                params,
                debug
            });
        } else {
            let item = this.store.get(name);
            
            if (item instanceof Array) {
                item.push({
                    name,
                    targetCustomer,
                    params,
                    debug
                });
                this.store = this.store.set(name, item);
            } else {
                let array = [item];
                array.push({
                    name,
                    targetCustomer,
                    params,
                    debug
                });
                this.store = this.store.set(name, array);
            }
        }
    }

    public getCallbackInfo(name: string) {
        return this.store.get(name);
    }
}