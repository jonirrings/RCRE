import {
    BasicAsyncProviderInterface, ProviderGlobalOptions, ProviderSourceConfig,
    ValidProviderSourceConfig
} from '../Controller';
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {ContainerProps} from '../../Container/types';
import {request} from '../../../services/api';
import * as _ from 'lodash';
import {compileValueExpress, runInContext} from '../../../util/vm';

export class AjaxDataProvider implements BasicAsyncProviderInterface {
    configCheck(provider: ProviderSourceConfig) {
        if (!provider.initialLoad) {
            console.error('initialLoad Config is required for ajax call');
            return false;
        }
        
        let initialLoad = provider.initialLoad;
        
        if (!initialLoad.url) {
            console.error('url is required param for ajax call');
            return false;
        }

        return true;
    }
    
    parse(provider: ValidProviderSourceConfig, props: ContainerProps) {
        let copy = _.cloneDeep(provider);
        
        copy.initialLoad = compileValueExpress(copy.initialLoad, {
            $data: props.$data.toObject()
        });
        
        return copy;
    }
    
    retCheck(ret: Object, provider: ProviderSourceConfig) {
        let pattern = provider.initialLoad!.retCheckPattern;
        if (!pattern) {
            return true;
        }
        
        return runInContext(pattern, {
            $response: ret 
        });
    }

    async run(provider: ValidProviderSourceConfig, options: ProviderGlobalOptions = {}) {
        let requestConfig: AxiosRequestConfig = provider.initialLoad;
        let response: AxiosResponse = await request(requestConfig.url!, requestConfig, options.proxy);
        return response.data;
    }
}