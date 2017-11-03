import {BasicSyncProviderInterface, ProviderGlobalOptions, ProviderSourceConfig} from '../Controller';
import {ContainerProps} from '../../Container/types';
import {compileValueExpress, filterExpressionData} from '../../../util/vm';
import * as _ from 'lodash';
import * as moment from 'moment';

export class InitDataProvider implements BasicSyncProviderInterface {
    configCheck(provider: ProviderSourceConfig) {
        // 初始化跳过检查
        return true;
    }

    parse(provider: ProviderSourceConfig, props: ContainerProps, context: any) {
        let data = provider.config;
        let config = compileValueExpress(data, {
            $data: filterExpressionData(_.cloneDeep(data))
        });
        
        _.each(config, (val, name) => {
            let date = moment(val);
            
            if (date.isValid()) {
                config[name] = date;
            }
        });
        
        provider.config = config; 
        
        // 初始化只初始化纯字面量
        return provider;
    }
    
    retCheck(ret: Object, provider: ProviderSourceConfig) {
        return !_.isEmpty(ret);
    }

    retParse(ret: Object, provider: ProviderSourceConfig, props: ContainerProps, context: any) {
        return ret;
    }

    run (provider: ProviderSourceConfig, options?: ProviderGlobalOptions) {
         let data = provider.config;
        
         return filterExpressionData(data);
    }
}