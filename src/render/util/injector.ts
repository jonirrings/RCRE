import {originJSONType} from '../core/Container/types';
import {each, isPlainObject} from 'lodash';
import { parseObjectPropertyExpress } from './vm';
import { SET_DATA_PAYLOAD } from '../core/Container/action';

class ParamsInjector {
    private originObject: Object;
    private finishedCallback: (payloads: SET_DATA_PAYLOAD[]) => any;
    private $resource: Object;
    private changePayloads: SET_DATA_PAYLOAD[];

    static isInjector(item: originJSONType): boolean {
        return false;
    }

    constructor(originObject: Object, resourceProvider: () => Promise<any>) {
        this.originObject = originObject;
        this.changePayloads = [];
        
        resourceProvider().then((ret) => {
            this.$resource = ret;
            this.parseObjItem(this.originObject, this.$resource);
            this.finishedCallback(this.changePayloads);
        });
    }

    finished(done: (newObject: SET_DATA_PAYLOAD[]) => void) {
        this.finishedCallback = done;
    }
    
    private parseObjItem(origin: Object, mirror: Object) {
        each(origin, (val, key) => {
            if (isPlainObject(val)) {
                this.parseObjItem(val, mirror);
                return;
            }

            if (val.indexOf('$response') === 0) {
                this.changePayloads.push({
                    type: key,
                    newValue: parseObjectPropertyExpress(val, mirror)
                });
            }
        });
    }
}

export default ParamsInjector;