import {
    BasicAsyncProviderInterface,
    ProviderGlobalOptions,
    ProviderSourceConfig
} from '../Controller';
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {ContainerProps} from '../../Container/types';
import {request} from '../../../services/api';
import * as _ from 'lodash';
import {compileValueExpress, isExpression, parseExpressString} from '../../../util/vm';

export interface AjaxProviderSourceConfig extends ProviderSourceConfig {
    config: AxiosRequestConfig;
}

export function getCommonExpressionStringVariable(props: ContainerProps, context: any, $output: Object = {}) {
    return {
        $data: props.$data.toObject(),
        $query: context.$query,
        $location: context.$location,
        $global: context.$global,
        $output: $output
    };
}

export class AjaxDataProvider implements BasicAsyncProviderInterface {
    configCheck(provider: AjaxProviderSourceConfig) {
        if (!provider || !provider.config) {
            console.error('initialLoad Config is required for ajax call');
            return false;
        }
        
        let config = provider.config;
        
        if (!config.url) {
            console.error('url is required param for ajax call');
            return false;
        }

        return true;
    }
    
    parse(provider: AjaxProviderSourceConfig, props: ContainerProps, context: any) {
        let copy = _.cloneDeep(provider);
        
        copy.config = compileValueExpress(copy.config, getCommonExpressionStringVariable(props, context), [], true);
        
        return copy;
    }
    
    retCheck(ret: Object, provider: AjaxProviderSourceConfig) {
        let pattern = provider.retCheckPattern;
        if (!pattern || !isExpression(pattern)) {
            return _.isPlainObject(ret);
        }
        
        return !!parseExpressString(pattern, {
            $output: ret
        });
    }

    retParse(ret: Object, provider: ProviderSourceConfig, props: ContainerProps, context: any) {
        let retMapping = provider.retMapping;
        
        if (!retMapping || !_.isPlainObject(retMapping)) {
            return ret;
        }

        return compileValueExpress(retMapping, getCommonExpressionStringVariable(props, context, ret));
    }

    async run(provider: AjaxProviderSourceConfig, options: ProviderGlobalOptions = {}) {
        let requestConfig: AxiosRequestConfig = provider.config;
        let response: AxiosResponse = await request(requestConfig.url!, requestConfig, options.proxy);
        return response.data;
    }
}