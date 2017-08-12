import * as React from 'react';
import {IsDefined, IsString, Validate} from 'class-validator';
import {Map} from 'immutable';
import {INIT_DATA_PAYLOAD, SET_DATA_PAYLOAD} from './action';
import {DriverController} from '../../../drivers/index';
import {IsPageInfo} from '../../util/validators';

export type rawJSONType = string | number | null | boolean | Object;
export type originJSONType = rawJSONType | rawJSONType[];

export type defaultData = {
    [s: string]: originJSONType
};

export class BasicConfig {
    @IsString()
    @IsDefined()
    type: string;

    @IsString()
    initialLoad?: string;
    
    data?: defaultData;
}

export class ContainerBasicPropsInterface {
    @Validate(IsPageInfo)
    info: BasicConfig;

    /**
     * 组件驱动加载器
     * @private
     */
    $driver?: DriverController;

    /**
     * 组件唯一ID
     * @private
     */
    $uuid?: string;

    /**
     * Container组件深度
     * @private
     */
    $depth?: number;
}

export class ContainerProps extends ContainerBasicPropsInterface {
    public $data: Map<string, any>;
    public setData: (payload: SET_DATA_PAYLOAD) => void;
    public initData: (payload: INIT_DATA_PAYLOAD) => void;
    public requestAPI: () => void;
}

export class BasicContainer <T extends ContainerBasicPropsInterface, P> extends React.Component<T, P> {
    constructor() {
        super();
    }
    
    emitChange(payload: any) {
        console.error('emitChange 没有被实现');
    }
}