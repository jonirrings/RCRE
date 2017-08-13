import {originJSONType} from '../core/Container/types';
import {each, isPlainObject} from 'lodash';
import {runInContext} from './vm';
import {SET_DATA_PAYLOAD} from '../core/Container/action';
import {isString} from 'util';

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

            if (isString(val) && val.indexOf('$response') >= 0) {
                this.changePayloads.push({
                    type: key,
                    newValue: runInContext(val, {
                        $response: mirror
                    })
                });
            }
        });
    }
}

export default ParamsInjector;