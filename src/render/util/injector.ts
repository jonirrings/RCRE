import {ContainerProps} from '../core/Container/types';
import * as _ from 'lodash';
import {each, isPlainObject} from 'lodash';
import {runInContext} from './vm';
import {SET_DATA_PAYLOAD} from '../core/Container/action';
import {AxiosResponse} from 'axios';
import {isString} from 'util';

class ParamsInjector {
    private originObject: ContainerProps;
    private finishedCallback: (payloads: SET_DATA_PAYLOAD[]) => any;
    private $resource: AxiosResponse;
    private changePayloads: SET_DATA_PAYLOAD[];

    constructor(originObject: ContainerProps, resourceProvider: () => Promise<any>) {
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

    private parseObjItem(origin: ContainerProps, mirror: AxiosResponse) {
        each(origin, (val, key) => {
            if (isPlainObject(val)) {
                this.parseObjItem(val, mirror);
                return;
            }

            if (isString(val) && val.indexOf('$response') >= 0 && !_.isEmpty(mirror)) {
                let ret = runInContext(val, {
                    $response: mirror.data
                });

                if (ret) {
                    this.changePayloads.push({
                        type: key,
                        newValue: ret
                    });
                }
            }
        });
    }
}

export default ParamsInjector;