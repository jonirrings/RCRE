import {ContainerProps} from '../core/Container/types';
import * as _ from 'lodash';
import {SET_DATA_PAYLOAD} from '../core/Container/action';
import {AxiosResponse} from 'axios';
import {compileValueExpress, isExpression} from './vm';

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
        let dataObject = origin.info.data;

        let output = compileValueExpress(dataObject, {
            $response: mirror.data
        });

        _.each(output, (val, key) => {
            if (!isExpression(val)) {
                this.changePayloads.push({
                    type: key,
                    newValue: val
                });
            }
        });
    }
}

export default ParamsInjector;