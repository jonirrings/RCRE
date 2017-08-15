import * as React from 'react';
import * as PropTypes from 'prop-types';
import {BasicConfig, BasicContainer, ContainerBasicPropsInterface} from '../../render/core/Container/types';
import {DriverController} from '../../drivers/index';
import createElement from '../../render/util/createElement';
import {IsArray, IsBoolean, IsString, Validate} from 'class-validator';
import {IsArrayString} from '../../render/util/validators';

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

export class LineChartPropsInterface extends ContainerBasicPropsInterface {
    info: LineChartConfig;
}

export default class AbstractLineChart extends BasicContainer<LineChartPropsInterface, {}> {
    static contextTypes = {
        driver: PropTypes.object
    };

    constructor() {
        super();
    }

    render() {
        let driver: DriverController = this.context.driver;
        let componentInfo = driver.getComponent(this.props.info.type);

        if (!componentInfo) {
            console.error(`can not find component: ${this.props.info.type}`);
            return <div/>;
        }

        return createElement(componentInfo.component, componentInfo.componentInterface, this.props);
    }
}