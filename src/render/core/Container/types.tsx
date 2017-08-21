import * as React from 'react';
import {IsDefined, IsString, Validate} from 'class-validator';
import {DriverController} from '../../../drivers/index';
import {IsPageInfo} from '../../util/validators';
import {actionCreators} from './action';
import * as PropTypes from 'prop-types';
import AbstractCol, {ColConfig, ColPropsInterface} from '../Layout/Col/Col';
import createElement from '../../util/createElement';
import {Map} from 'immutable';

export type rawJSONType = string | number | null | boolean | Object;
export type originJSONType = rawJSONType | rawJSONType[];

export type defaultData = {
    [s: string]: originJSONType
};

export class BasicConfig extends ColConfig {
    @IsString()
    @IsDefined()
    type: string;

    @IsString()
    initialLoad?: string;
    
    @IsString()
    model?: string;
    
    data?: defaultData;
}

export type onContainerItemChange = (type: string, value: any) => void;

export class BasicContainerPropsInterface extends ColPropsInterface {
    @Validate(IsPageInfo, [BasicConfig])
    info: BasicConfig;
    
    data?: Object;

    /**
     * 内部组件的数据触发通用接口
     */
    onChange: onContainerItemChange;

    /**
     * 当前Container的数据模型对象
     */
    $data: Map<string, any>;
}

export class ContainerProps extends BasicContainerPropsInterface {
    public $data: Map<string, any>;
    public setData: typeof actionCreators.setData;
    public setDataList: typeof actionCreators.setDataList;
    public initData: typeof actionCreators.initData;
    public requestAPI: () => void;
}

export class BasicContainer<T extends BasicContainerPropsInterface, P> extends AbstractCol<T, P> {
    static contextTypes = {
        driver: PropTypes.object,
        form: PropTypes.bool
    };
    
    constructor() {
        super();
    }

    public getComponentThroughDriver(child?: React.ReactChild | React.ReactChild[]) {
        let driver: DriverController = this.context.driver;
        let componentInfo = driver.getComponent(this.props.info.type);

        if (!componentInfo) {
            console.error(`can not find module ${this.props.info.type}`);
            return <div />;
        }

        let Component = componentInfo.component;
        let componentInterface = componentInfo.componentInterface;

        return createElement(Component, componentInterface, this.props, child);
    }
}