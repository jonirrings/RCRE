import {IsString, Validate} from 'class-validator';
import {IsPageInfo} from '../../util/validators';
import {actionCreators} from './action';
import {Map} from 'immutable';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as _ from 'lodash';
import * as moment from 'moment';
import {ContainerConfig} from '../../../components/Container/Container';
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
    onChange?: onContainerItemChange;

    /**
     * 当前Container的数据模型对象
     */
    $data?: Map<string, any>;

    /**
     * 通过表格组件, 渲染之后, 获取到的每一行的数据
     */
    $row?: Map<string, any>;

    /**
     * 通过表格组件, 渲染之后, 获取到的第几行
     */
    $index?: number;

    /**
     * React组件Key
     */
    key?: string | number;

    /**
     * 底层组件设置数据模型值使用
     */
    $setData?: (name: string, value: any) => void;
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
    
    public getRuntimeContext(props: T = this.props, context: any = this.context) {
        let runtime = {
            $data: {},
            $query: {},
            $global: {},
            $row: {},
            $index: -1,
            $now: moment()
        };
        
        if (props.$data) {
            runtime.$data = props.$data.toObject();
        }
        
        if (props.$row) {
            runtime.$row = props.$row.toObject();    
        }
        
        if (props.$index) {
            runtime.$index = props.$index;
        }
        
        if (context.$query) {
            runtime.$query = context.$query;
        }
        
        if (context.$global) {
            runtime.$global = context.$global;
        }
        
        return runtime;
    }
    
    public getPropsInfo<InfoType>(info: InfoType, props?: T) {
        info = _.cloneDeep(info);
        info = compileValueExpress(info, this.getRuntimeContext(props));
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