import * as React from 'react';
import * as echarts from 'echarts';
import {LineChartConfig, LineChartPropsInterface} from '../../../../abstractComponents/Chart/LineChart';

export class RcreLineChartProps {
    width: string;
    height: string;
    tooltip: boolean;
}

export default class RcreLineChart extends React.Component<LineChartPropsInterface, {}> {
    domID: string = 'echarts-rcrelinechart';
    chart: EChartSpace.ECharts;
    chartOptions = {
        title: {
            text: '堆叠区域图'
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
            data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        toolbox: {
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
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '邮件营销',
                type: 'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '联盟广告',
                type: 'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '视频广告',
                type: 'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: '直接访问',
                type: 'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: '搜索引擎',
                type: 'line',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                areaStyle: {normal: {}},
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };

    constructor() {
        super();
    }

    componentDidMount() {
        let dom: any = document.getElementById(this.domID);
        this.chart = echarts.init(dom);
        this.chart.setOption(this.chartOptions);
    }

    private mapOptions(props: LineChartConfig): RcreLineChartProps {
        return {
            width: props.width,
            height: props.height,
            tooltip: props.tooltip
        };
    }

    render() {
        let props = this.mapOptions(this.props.info);

        const style = {
            width: props.width,
            height: props.height
        };

        return (
            <div id={this.domID} style={style}/>
        );
    }
}