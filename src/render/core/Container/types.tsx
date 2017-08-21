import * as React from 'react';
import {IsDefined, IsString, Validate} from 'class-validator';
import {Map} from 'immutable';
import {DriverController} from '../../../drivers/index';
import {IsPageInfo} from '../../util/validators';
import { actionCreators } from './action';
import * as PropTypes from 'prop-types';
import AbstractCol, {ColConfig, ColPropsInterface} from '../Layout/Col/Col';
import createElement from '../../util/createElement';

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

export class BasicContainerPropsInterface extends ColPropsInterface {
    @Validate(IsPageInfo, [BasicConfig])
    info: BasicConfig;

    /**
     * 组件驱动加载器
     * @private
     */
    $driver?: DriverController;

    /**
     * Container组件深度
     * @private
     */
    $depth: number;
    
    data?: Object;
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
    
    emitChange(payload: any) {
        console.error('emitChange 没有被实现');
    }
}