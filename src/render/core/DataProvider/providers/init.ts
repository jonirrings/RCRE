import {BasicSyncProviderInterface, ProviderGlobalOptions, ProviderSourceConfig} from '../Controller';
import {ContainerProps} from '../../Container/types';
import {filterExpressionData} from '../../../util/vm';
import * as _ from 'lodash';

export class InitDataProvider implements BasicSyncProviderInterface {
    configCheck(provider: ProviderSourceConfig) {
        // 初始化跳过检查
        return true;
    }

    parse(provider: ProviderSourceConfig, props: ContainerProps) {
        // 初始化只初始化纯字面量
        return provider;
    }
    
    retCheck(ret: Object, provider: ProviderSourceConfig) {
        return !_.isEmpty(ret);
    }

    async run (provider: ProviderSourceConfig, options?: ProviderGlobalOptions) {
         let data = provider.config;
         return filterExpressionData(data);
    }
}