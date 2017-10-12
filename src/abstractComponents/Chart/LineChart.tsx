import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {IsArray, IsBoolean, IsString, Validate} from 'class-validator';
import {IsArrayString} from '../../render/util/validators';
import * as React from 'react';
import Trigger from '../../render/core/Trigger/Trigger';
import componentLoader from '../../render/util/componentLoader';

export class LineChartConfig extends BasicConfig {
    /**
     * 图表宽度
     * @public
     * @default 500
     */
    @IsString()
    width: string;

    /**
     * 图表高度
     * @public
     * @default 400
     */
    @IsString()
    height: string;

    /**
     * 是否展示提示框组件
     * @public
     * @default true
     */
    @IsBoolean()
    tooltip: boolean;

    /**
     * 图表标题
     * @public
     */
    @IsString()
    title: string;

    /**
     * 图例组件
     * @public
     * @default []
     */
    @Validate(IsArrayString)
    categories: string[];

    /**
     * 工具栏
     * @public
     * @default true
     */
    @IsBoolean()
    toolbox: boolean;

    /**
     * x轴数据
     * @public
     * @default [];
     */
    @Validate(IsArrayString)
    xAxisData: string[];

    /**
     * 是否支持缩放
     * @public
     * @default true
     */
    @IsBoolean()
    dataZoom: boolean;

    /**
     * 图标数据源
     * @public
     * @default []
     */
    @IsArray()
    series: {
        name: string;
        data: string[] | number[]
    }[];
}

export class LineChartPropsInterface extends BasicContainerPropsInterface {
    info: LineChartConfig;
}

export default class AbstractLineChart extends BasicContainer<LineChartPropsInterface, {}> {
    constructor() {
        super();
    }

    render() {
        let children = React.createElement(Trigger, this.props);
        return this.renderChildren(children); 
    }
}

componentLoader.addComponent('linechart', AbstractLineChart, LineChartPropsInterface);