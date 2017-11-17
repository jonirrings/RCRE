import * as React from 'react';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {IsArray, IsBoolean, IsString, Validate} from 'class-validator';
import {IsArrayString} from '../../render/util/validators';
import * as echarts from 'echarts';
import {chartTypes} from './types';
import componentLoader from '../../render/util/componentLoader';
import {Set} from 'immutable';
import {CSSProperties} from 'react';

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

    /**
     * CSS class
     */
    @IsString()
    className?: string;

    /**
     * 内联CSS属性
     */
    style?: CSSProperties;

}

export class LineChartPropsInterface extends BasicContainerPropsInterface {
    info: LineChartConfig;
}

export default class LineChart extends BasicContainer<LineChartPropsInterface, {}> {
    DOMElement: any;
    chart: EChartSpace.ECharts;
    chartOptions: chartTypes = {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            top: '6%',
            data: []
        },
        toolbox: {
            itemSize: 15,
            itemGap: 5,
            right: 15,
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['']
        },
        yAxis: [
            {
                type: 'value'
            }
        ],
        dataZoom: [
            {
                id: 'dataZoomX',
                type: 'slider',
                xAxisIndex: [0],
                filterMode: 'filter'
            }
        ],
        series: []
    };

    componentDidMount() {
        this.chart = echarts.init(this.DOMElement);
        let info = this.getPropsInfo(this.props.info);
        this.overRideChartOptions(info);
        this.chart.setOption(this.chartOptions);
    }

    componentWillReceiveProps(nextProps: LineChartPropsInterface) {
        let nextInfo = this.getPropsInfo(nextProps.info, nextProps);
        this.overRideChartOptions(nextInfo);
        this.chart.setOption(this.chartOptions);
    }

    private overRideChartOptions(info: LineChartConfig) {
        // title
        this.chartOptions.title.text = info.title;

        // tooltip
        if (info.tooltip === false) {
            delete this.chartOptions.tooltip;
        }

        if (Array.isArray(info.categories)) {
            this.chartOptions.xAxis.data = info.categories;
        }

        if (info.toolbox === false) {
            delete this.chartOptions.toolbox;
        }

        if (info.dataZoom === false) {
            delete this.chartOptions.dataZoom;
        }

        if (Array.isArray(info.series)) {
            let legends = Set<string>();
            this.chartOptions.series = info.series.map(item => {
                let ret = {
                    name: item.name,
                    type: 'line',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    data: item.data
                };
                legends = legends.add(item.name);

                return ret;

                // areaStyle: {normal: {}},
            });

            this.chartOptions.legend.data = legends.toArray();
        }
    }

    render() {
        let info = this.getPropsInfo(this.props.info);
        
        const style = {
            width: info.width || '100%',
            height: info.height || 500,
            ...info.style
        };

        const refCallback = (ref: any) => {
            if (ref) {
                this.DOMElement = ref;
            }
        };
        
        return (
            <div ref={refCallback} className={info.className} style={style}/>
        );
    }
}

componentLoader.addComponent('lineChart', LineChart, LineChartPropsInterface);