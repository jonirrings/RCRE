import {BasicCustomerInstance} from '../Controller';
import {runTimeType} from '../../Container/types';
import {actionCreators} from '../../Container/action';
import {compileValueExpress} from '../../../util/vm';
import {store} from '../../../index';
import * as _ from 'lodash';

interface PassCustomerExecConfig {
    /**
     * 目标container组件的key
     */
    model: string;

    /**
     * 写入的值
     */
    assign: Object;
}

export class PassCustomers implements BasicCustomerInstance {
    async exec(config: PassCustomerExecConfig, runTime: runTimeType) {
        let model = config.model;
        let assign = config.assign;
        
        if (!_.isPlainObject(assign)) {
            console.error('assign should be an plain object, example: {}');
            return;
        }
        
        let output = compileValueExpress(assign, runTime);
        
        store.dispatch(actionCreators.dataCustomerPass({
            model: model,
            data: output
        }));
    }
}