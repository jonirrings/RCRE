import {BasicCustomerInstance} from '../Controller';
import {runTimeType} from '../../Container/types';
import {stringify} from 'querystring';
import {compileValueExpress} from '../../../util/vm';
import * as _ from 'lodash';

interface PassCustomerExecConfig {
    /**
     * 跳转的地址
     */
    href: string;

    /**
     * 跳转带的参数
     */
    params?: Object;
}

export class LocationCustomer implements BasicCustomerInstance {
    async exec(config: PassCustomerExecConfig, runTime: runTimeType, model: string, customer: string) {
        let targetHref = config.href;
        let params = config.params;
        
        if (!targetHref) {
            console.error('targetHref is necessary for location jumping');
        }

        if (_.isPlainObject(params)) {
            params = compileValueExpress(params, runTime);
        }
        
        location.href = targetHref + '?' + stringify(params);
    }
}