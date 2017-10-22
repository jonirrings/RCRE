import {IsString, Validate} from 'class-validator';
import {IsPageInfo} from '../../util/validators';
import {actionCreators} from './action';
import {Map} from 'immutable';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as _ from 'lodash';
import {ContainerConfig} from '../../../abstractComponents/Container/Container';
import {compileValueExpress} from '../../util/vm';

export type rawJSONType = string | number | null | boolean | Object;
export type originJSONType = rawJSONType | rawJSONType[];

export type defaultData = {
    [s: string]: originJSONType
};

export class BasicConfig {
    @IsString()
    // @IsDefined()
    type: string;
    
    @IsString()
    model?: string;
    
    data?: defaultData;

    hidden?: boolean;

    $nowFormat?: string;
    
    parentMapping?: Object;

    children?: BasicConfig[];
}

export type onContainerItemChange = (value: any, event?: React.ChangeEvent<HTMLElement>) => void;

export class BasicTriggerEvent {
    name: string;
}

export class BasicContainerPropsInterface {
    @Validate(IsPageInfo, [BasicConfig])
    info: BasicConfig;
    
    /**
     * 内部组件的数据触发通用接口
     */
    onChange: onContainerItemChange;

    /**
     * 当前Container的数据模型对象
     */
    $data?: Map<string, any>;

    /**
     * React组件Key
     */
    key: string | number;

    $setData?: typeof actionCreators.setData;
    $setDataList?: typeof actionCreators.setDataList;
    $triggerEvent?: typeof BasicTriggerEvent;
    $removeData?: typeof actionCreators.removeData;
}

export class ContainerProps extends BasicContainerPropsInterface {
    info: ContainerConfig;
    
    $data: Map<string, any>;
    $parent: Map<string, any>;

    /**
     * 写入数据到数据模型
     */
    setData: typeof actionCreators.setData;

    /**
     * 批量写入一组数据
     */
    setDataList: typeof actionCreators.setDataList;
    
    /**
     * 清空当前数据模型
     */
    removeData: typeof actionCreators.removeData;

    /**
     * 异步加载数据中
     */
    asyncLoadDataProgress: typeof actionCreators.asyncLoadDataProgress;

    /**
     * 异步加载数据成功
     */
    asyncLoadDataSuccess: typeof actionCreators.asyncLoadDataSuccess;

    /**
     * 异步加载数据失败
     */
    asyncLoadDataFail: typeof actionCreators.asyncLoadDataFail;

    /**
     * 同步加载数据成功
     */
    syncLoadDataSuccess: typeof actionCreators.syncLoadDataSuccess;

    /**
     * 同步加载数据失败
     */
    syncLoadDataFail: typeof actionCreators.syncLoadDataFail;
}

export const BasicContextTypes = {
    driver: PropTypes.object,
    form: PropTypes.bool,
    abstractContainer: PropTypes.bool,
    $store: PropTypes.object,
    $global: PropTypes.object,
    $triggerListData: PropTypes.func,
    $location: PropTypes.object,
    $query: PropTypes.object
};

export class BasicContainer<T extends BasicContainerPropsInterface, P> extends React.Component<T, P> {
    static contextTypes = BasicContextTypes;
    
    constructor() {
        super();
    }
    
    public getRuntimeContext() {
        let context = {
            $data: {},
            $query: {},
            $global: {}
        };
        
        if (this.props.$data) {
            context.$data = this.props.$data.toObject();
        }
        
        if (this.context.$query) {
            context.$query = this.context.$query;
        }
        
        if (this.context.$global) {
            context.$global = this.context.$global;
        }
        
        return context;
    }
    
    public getPropsInfo<InfoType>(info: InfoType) {
        let $data = this.props.$data;
        info = _.cloneDeep(info);
        
        if ($data) {
            info = compileValueExpress(info, this.getRuntimeContext());
        }
        
        return info;
    }
    
    public renderChildren<Type>(info: BasicConfig, children: React.ReactElement<Type>) {
        if (info.hidden) {
            return React.createElement('div', {
                style: {
                    display: 'none'
                }
            });
        }

        return children;
    }
}