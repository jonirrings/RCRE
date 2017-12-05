/**
 * @file 给普通组件提供的基础类，基础函数
 * @author dongtiancheng
 */

import {IsString, Validate} from 'class-validator';
import {IsPageInfo} from '../../util/validators';
import {actionCreators} from './action';
import {Map} from 'immutable';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {CSSProperties} from 'react';
import * as _ from 'lodash';
import * as moment from 'moment';
import {ContainerConfig} from '../../../components/Container/Container';
import {compileValueExpress} from '../../util/vm';
import {TriggerEventItem} from '../Trigger/Trigger';
import {DataCustomer} from '../DataCustomer/Controller';
import {FormStateItem} from '../../../components/Form/Form';

export type rawJSONType = string | number | null | boolean | Object;
export type originJSONType = rawJSONType | rawJSONType[];

export type defaultData = {
    [s: string]: originJSONType
};

export class BasicConfig {
    /**
     * 组件类型
     */
    @IsString()
    type: string;

    /**
     * 数据模型Key
     */
    @IsString()
    model?: string;

    /**
     * 初始化数据
     */
    data?: defaultData;

    /**
     * 是否隐藏
     */
    hidden?: boolean;

    /**
     * 父级属性映射
     */
    parentMapping?: Object;

    /**
     * 子级元素
     */
    children?: BasicConfig[];

    /**
     * CSS class
     */
    @IsString()
    className?: string;

    /**
     * 内联CSS属性
     */
    style?: CSSProperties;

    /**
     * 事件触发
     */
    trigger?: TriggerEventItem[];

    /**
     * 是否作为表单输入元素
     */
    formItem?: boolean;
}

export type onContainerItemChange = (value: any, event?: React.ChangeEvent<HTMLElement>) => void;

export class BasicTriggerEvent {
    name: string;
}

export class BasicContainerPropsInterface {
    @Validate(IsPageInfo, [BasicConfig])
    info: BasicConfig;

    /**
     * 当前Container的数据模型对象
     */
    $data?: Map<string, any>;

    /**
     * Trigger组件的数据模型对象
     */
    $trigger?: Map<string, any>;

    /**
     * 通过表格组件, 渲染之后, 获取到的每一行的数据
     */
    $item?: Map<string, any>;

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

    /**
     * Trigger注入的通用事件处理函数, 所有事件处理都走这里
     */
    eventHandle?: (eventName: string, args: Object) => void;

    /**
     * 来自Container的数据消耗者实例
     */
    dataCustomer?: DataCustomer;

    /**
     * 父级的数据模型Key
     */
    model?: string;

    /**
     * 当前表单的数据模型
     */
    $form?: Map<string, any>;

    /**
     * 表单给FormItem组件提供的验证注册器
     */
    injectChildElement?: (validator: (value?: any) => FormStateItem) => void;
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
    $location: PropTypes.object,
    $query: PropTypes.object,
    debug: PropTypes.bool,
    lang: PropTypes.string
};

export type runTimeType = {
    $data?: Object;
    $query?: Object;
    $global?: any;
    $item?: Object;
    $trigger?: {
        $SELF_PASS_CUSTOMER?: Object;
    };
    $index?: number;
    $now?: moment.Moment;
    $moment: typeof moment
};

/**
 * 获取ExpressionString 嵌入的上下文
 * @param {BasicContainerPropsInterface} props
 * @param context
 * @return {runTimeType}
 */
export function getRuntimeContext(props: BasicContainerPropsInterface, context: any) {
    let runtime: runTimeType = {
        $now: moment(),
        $moment: moment
    };

    if (props.$data) {
        runtime.$data = props.$data.toJS();
    }

    if (props.$item) {
        runtime.$item = props.$item.toJS();
    }

    if (!_.isNil(props.$index)) {
        runtime.$index = props.$index;
    }

    if (props.$trigger) {
        runtime.$trigger = props.$trigger.toJS();
    }

    if (context.$query) {
        runtime.$query = context.$query;
    }

    if (context.$global) {
        runtime.$global = context.$global;
    }

    return runtime;
}

/**
 * 所有子级组件的基类
 */
export class BasicContainer<T extends BasicContainerPropsInterface, P> extends React.Component<T, P> {
    static contextTypes = BasicContextTypes;

    constructor() {
        super();
    }

    public getRuntimeContext(props: T = this.props, context: any = this.context) {
        return getRuntimeContext(props, context);
    }

    public getPropsInfo<InfoType>(info: InfoType, props?: T, blackList?: string[], isDeep?: boolean) {
        info = compileValueExpress(info, this.getRuntimeContext(props), blackList, isDeep);
        return info;
    }

    public errorReport(msg: string, extendElement: any) {
        if (this.context.debug) {
            return React.createElement(extendElement, {}, msg);
        } else {
            console.error(msg);
            return React.createElement(extendElement);
        }
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

    public getChildProps(info: BasicConfig, childProps: Object) {
        return {
            info: info,
            $data: this.props.$data,
            model: this.props.model,
            dataCustomer: this.props.dataCustomer,
            $setData: this.props.$setData,
            eventHandle: this.props.eventHandle,
            $index: this.props.$index,
            $item: this.props.$item,
            ...childProps
        };
    }

    public commonEventHandler(eventName: string, args: {
        [s: string]: any
    }, mute: boolean = true) {
        if (this.props.eventHandle) {
            this.props.eventHandle(eventName, args);
        } else if (!mute) {
            if (this.props.$data) {
                console.error('If you want to handle event, you need to at trigger property');
            } else {
                console.error('Event System can only work with Container Component');
            }
        }
    }
    
    public getValueFromDataStore(nameStr: string) {
        if (!this.props.$data) {
            return null;
        }
        
        if (nameStr.indexOf('.') < 0) {
            return this.props.$data.get(nameStr);
        }
        
        let nameGroup = nameStr.split('.');
        
        return nameGroup.reduce(($data, next) => {
            if ($data && $data.get) {
                return $data.get(next);    
            } else if ($data && $data[next]) {
                return $data[next];  
            } else {
                return null;
            }
        }, this.props.$data);
    }
}