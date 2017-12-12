import {BasicCustomerInstance} from '../Controller';
import {runTimeType} from '../../Container/types';
import {compileValueExpress, isExpression, parseExpressString} from '../../../util/vm';
import {request} from '../../../services/api';
import {actionCreators} from '../../Trigger/actions';
import {store} from '../../../index';
import * as _ from 'lodash';

export interface SubmitCustomerExecConfig {
    /**
     * 提交的地址
     */
    url: string;

    /**
     * 提交的方式
     */
    method: string;

    /**
     * 提交的数据
     */
    data: Object | string;

    /**
     * 返回值验证
     */
    retCheckPattern?: string;

    /**
     * 返回值映射
     */
    retMapping?: Object;

    /**
     * 返回值映射的字段
     */
    namespace?: string;
}

export class SubmitCustomer implements BasicCustomerInstance {
    async exec(config: SubmitCustomerExecConfig, runTime: runTimeType, model: string, customer: string) {
        if (!config.url) {
            console.error('URL is Required for submit request');
            return;
        }

        if (!config.method) {
            config.method = 'GET';
        }

        let data = config.data;

        if (_.isPlainObject(data)) {
            config.data = compileValueExpress(data, runTime);
        } else if (typeof data === 'string' && isExpression(data)) {
            config.data = parseExpressString(data, runTime);
        }

        let proxyUrl = null;

        if (runTime.$global) {
            proxyUrl = runTime.$global.proxy;
        }

        let ret = await request(config.url, config, proxyUrl);

        if (ret.status !== 200) {
            console.error('Request Failed', ret.statusText);
            return;
        }

        if (config.retCheckPattern) {
            let isValid = parseExpressString(config.retCheckPattern, {
                $output: ret.data
            });

            if (!isValid) {
                console.error('submit response value is not valid', ret.data);
                return;
            }
        }

        if (_.isPlainObject(config.retMapping)) {
            let innerRunTime = {
                ...runTime,
                $output: ret.data
            };

            ret.data = compileValueExpress(config.retMapping, innerRunTime)!;
        }

        let namespace = '$output';
        if (config.namespace) {
            namespace = config.namespace;
        }

        store.dispatch(actionCreators.submitSetData({
            model: model,
            data: {
                [namespace]: ret.data
            },
            customer: customer
        }));
    }
}