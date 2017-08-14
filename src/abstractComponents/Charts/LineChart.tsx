import * as React from 'react';
import {BasicConfig, BasicContainer, ContainerBasicPropsInterface} from '../../render/core/Container/types';
import * as echarts from 'echarts';
// import { EChartOption } from 'echarts/lib/echarts';
// import {IsDefined, IsString} from 'class-validator';

class LineChartConfig extends BasicConfig {
    style: {
        [s: string]: any;
    };
}

export class LineChartPropsInterface extends ContainerBasicPropsInterface {
    info: LineChartConfig;
}

export default class AbstractLineChart extends BasicContainer<LineChartPropsInterface, {}> {
    domID: string = 'echarts';
    chart: EChartSpace.ECharts;
    chartOptions = {
        title: {
            text: '动态数据 + 时间坐标轴'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                animation: false
            }
        },
        xAxis: {
            type: 'time',
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            }
        },
        series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: [1, 2, 3, 4, 5, 6, 8]
        }]
    };

    constructor() {
        super();
    }

    componentDidMount() {
        let dom: any = document.getElementById(this.domID);
        this.chart = echarts.init(dom);
        this.chart.setOption(this.chartOptions);
    }

    render() {
        return (
            <div id={this.domID} style={this.props.info.style}/>
        );
    }
}