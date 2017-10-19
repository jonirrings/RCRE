import {
    BasicAsyncProviderInterface, getCommonExpressionStringVariable, ProviderCommonConfig, ProviderGlobalOptions,
    ProviderSourceConfig
} from '../Controller';
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {ContainerProps} from '../../Container/types';
import {request} from '../../../services/api';
import * as _ from 'lodash';
import {compileValueExpress, parseExpressString} from '../../../util/vm';

export interface AjaxProviderSourceConfig extends ProviderSourceConfig {
    config: ProviderCommonConfig & AxiosRequestConfig;
}

export class AjaxDataProvider implements BasicAsyncProviderInterface {
    configCheck(provider: AjaxProviderSourceConfig) {
        if (!provider.config) {
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
        
        copy.config = compileValueExpress(copy.config, getCommonExpressionStringVariable(props, context));
        
        return copy;
    }
    
    retCheck(ret: Object, provider: AjaxProviderSourceConfig) {
        let pattern = provider.config.retCheckPattern;
        if (!pattern) {
            return _.isPlainObject(ret);
        }
        
        return parseExpressString(pattern, {
            $response: ret
        }) === true;
    }

    retParse(ret: Object, provider: ProviderSourceConfig, props: ContainerProps, context: any) {
        let retMapping = provider.config.retMapping;
        
        if (!retMapping) {
            return ret;
        }
        
        return compileValueExpress(retMapping, getCommonExpressionStringVariable(props, context));
    }

    async run(provider: AjaxProviderSourceConfig, options: ProviderGlobalOptions = {}) {
        let requestConfig: AxiosRequestConfig = provider.config;
        let response: AxiosResponse = await request(requestConfig.url!, requestConfig, options.proxy);
        return response.data;
    }
}