import {actionCreators} from '../Container/action';
import {ContainerProps} from '../Container/types';
import {AjaxDataProvider} from './providers/ajax';
import {providerLoaderInstance} from './loader';
import * as _ from 'lodash';
import {InitDataProvider} from './providers/init';

providerLoaderInstance.registerProvider('ajax', new AjaxDataProvider(), true);
providerLoaderInstance.registerProvider('init', new InitDataProvider(), false);

/**
 * Provider 对象数据源配置
 */
export interface ProviderSourceConfig {
    mode: string;
    config?: any;
    retMapping?: Object;
    retCheckPattern?: string;
}

/**
 * Provider 对象全局配置
 */
export interface ProviderGlobalOptions {
    /**
     * 代理服务配置
     */
    proxy?: string;
}

export interface ProviderActions {
    /**
     * 同步批量写入数据
     */
    setDataList: typeof actionCreators.setDataList;

    /**
     * 异步加载中
     */
    asyncLoadDataProgress: typeof actionCreators.asyncLoadDataProgress;

    /**
     * 异步加载成功
     */
    asyncLoadDataSuccess: typeof actionCreators.asyncLoadDataSuccess;

    /**
     * 异步加载失败
     */
    asyncLoadDataFail: typeof actionCreators.asyncLoadDataFail;

    /**
     * 同步加载成功
     */
    syncLoadDataSuccess: typeof actionCreators.syncLoadDataSuccess;

    /**
     * 同步加载失败
     */
    syncLoadDataFail: typeof actionCreators.syncLoadDataFail;
}

export interface BasicSyncProviderInterface {
    configCheck(provider: ProviderSourceConfig): boolean;
    retCheck(ret: Object, provider: ProviderSourceConfig): boolean;
    retParse(ret: Object, provider: ProviderSourceConfig, props: ContainerProps, context: any): Object;
    parse(provider: ProviderSourceConfig, config: ContainerProps, context: any): ProviderSourceConfig;
    run (provider: ProviderSourceConfig, options?: ProviderGlobalOptions): any;
}

export interface BasicAsyncProviderInterface {
    configCheck(provider: ProviderSourceConfig): boolean;
    retCheck(ret: Object, provider: ProviderSourceConfig): boolean;
    retParse(ret: Object, provider: ProviderSourceConfig, props: ContainerProps, context: any): Object;
    parse(provider: ProviderSourceConfig, config: ContainerProps, context: any): ProviderSourceConfig;
    run (provider: ProviderSourceConfig, options?: ProviderGlobalOptions): Promise<any>;
}

/**
 * DataProvider 是一个数据源控制器
 * 它通过为Container组件提供一个单一, 简单的API调用. 来对各种各样的数据获取操作进行封装
 * 它支持控制同步的数据和异步的数据操作. 获取到目标数据之后,
 * DataProvider会触发action来写入数据到redux store
 * 
 * 流程图可参考
 * src/doc/graphic/dataFlow.png
 * 
 * 同步的操作会触发一个action, 并进行同步写入
 * 异步的操作会有3个运行状态:
 * 
 * 1. before(异步运行前)
 * 2. progress(异步运行中)
 * 3.1 success(异步运行成功)
 * 3.2 fail(异步运行失败)
 */
export class DataProvider {
    previousProviderConfig: ProviderSourceConfig;
    
    public async requestForData(
        providerConfig: ProviderSourceConfig,
        actions: ProviderActions, 
        props: ContainerProps,
        context: any
    ): Promise<void> {
        let mode = providerConfig.mode;
        let providerInfo = providerLoaderInstance.getTargetProvider(mode);
        
        if (!providerInfo) {
            throw new Error('can not find exact data provider of mode:' + mode);
        }
        
        let isAsync = providerInfo.async;
        let provider = providerInfo.provider;

        let checkStatus = provider.configCheck(providerConfig);

        if (!checkStatus) {
            return;
        }

        let parsedConfig = provider.parse(providerConfig, props, context);

        // 如果provider数据配置和上次相同, 就必须阻止以后的操作.
        // 不然就会死循环
        // 参考流程图: src/doc/graphic/dataFlow.png
        if (_.isEqual(this.previousProviderConfig, parsedConfig)) {
            return;
        }
        this.previousProviderConfig = parsedConfig;
        
        if (isAsync) {
            actions.asyncLoadDataProgress({
                model: props.info.model!,
                providerMode: providerConfig.mode
            });
            
            let ret;
            try {
                ret = await provider.run(parsedConfig, {
                    proxy: context.$global.proxy
                });   
            } catch (e) {
                actions.asyncLoadDataFail({
                    model: props.info.model!,
                    providerMode: providerConfig.mode,
                    error: e.message
                });
                return;
            }
            
            let isRetValid = provider.retCheck(ret, providerConfig);
            
            ret = provider.retParse(ret, providerConfig, props, context);
            
            if (!isRetValid) {
                actions.asyncLoadDataFail({
                    model: props.info.model!,
                    providerMode: providerConfig.mode,
                    error: `model: ${props.info.model} mode: ${providerConfig.mode} data is not valid`
                });
            } else {
                actions.asyncLoadDataSuccess({
                    model: props.info.model!,
                    providerMode: providerConfig.mode,
                    data: ret
                });
            }
        } else {
            let ret;
            try {
                ret = await provider.run(parsedConfig);
            } catch (e) {
                actions.syncLoadDataFail({
                    model: props.info.model!,
                    providerMode: providerConfig.mode,
                    error: e.message
                });
            }
            
            let isRetValid = provider.retCheck(ret, providerConfig);

            ret = provider.retParse(ret, providerConfig, props, context);
            
            if (isRetValid) {
                actions.syncLoadDataSuccess({
                    model: props.info.model!,
                    providerMode: providerConfig.mode,
                    data: ret
                });
            }
        }
    }
}