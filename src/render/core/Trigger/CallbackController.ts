import * as _ from 'lodash';
import {Map} from 'immutable';

export type callbackItem = {
    event: string;
    targetCustomer: string;
    params: (string | number | boolean)[];
    debug: boolean;
};

export class CallbackController {
    private store: Map<string, callbackItem | callbackItem[]>; 
    
    constructor() {
        this.store = Map({});
    }

    public hasCallback(event: string): boolean {
        return this.store.has(event);
    }

    public registerCallback(event: string,
                            targetCustomer: string,
                            params: (string | number | boolean)[],
                            debug: boolean = false) {
        if (!_.isString(event) || !_.isString(targetCustomer)) {
            console.error('registerCallback should have eventName, targetCustomer');
            return;
        }
        
        if (!this.store.has(event)) {
            this.store = this.store.set(event, {
                event,
                targetCustomer,
                params,
                debug
            });
        } else {
            let item = this.store.get(event);
            
            if (item instanceof Array) {
                item.push({
                    event,
                    targetCustomer,
                    params,
                    debug
                });
                this.store = this.store.set(event, item);
            } else {
                let array = [item];
                array.push({
                    event,
                    targetCustomer,
                    params,
                    debug
                });
                this.store = this.store.set(event, array);
            }
        }
    }

    public getCallbackInfo(event: string) {
        return this.store.get(event);
    }
}