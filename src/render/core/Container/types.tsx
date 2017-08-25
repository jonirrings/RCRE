import {IsDefined, IsString, Validate} from 'class-validator';
import {IsPageInfo} from '../../util/validators';
import {actionCreators} from './action';
import AbstractCol, {ColConfig, ColPropsInterface} from '../Layout/Col/Col';
import {Map} from 'immutable';
import * as PropTypes from 'prop-types';
import * as React from 'react';
// import AbstractFormItem, {FormItemPropsInterface} from '../../../abstractComponents/Form/FormItem';
// import createElement from "../../util/createElement";

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

export type onContainerItemChange = (value: any, event?: React.ChangeEvent<HTMLElement>) => void;

export class BasicContainerPropsInterface extends ColPropsInterface {
    @Validate(IsPageInfo, [BasicConfig])
    info: BasicConfig;
    
    /**
     * 内部组件的数据触发通用接口
     */
    onChange: onContainerItemChange;

    /**
     * 当前Container的数据模型对象
     */
    $data: Map<string, any>;

    $setData: typeof actionCreators.setData;

    $setDataList: typeof actionCreators.setDataList;
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
        form: PropTypes.bool,
        $global: PropTypes.object,
        $setDataList: PropTypes.func
    };
    
    constructor() {
        super();
    }
}