import * as React from 'react';
import * as echarts from 'echarts';
import {LineChartConfig, LineChartPropsInterface} from '../../../../abstractComponents/Chart/LineChart';
import {chartTypes} from './types';
import {Set} from 'immutable';

export default class RcreLineChart extends React.Component<LineChartPropsInterface, {}> {
    domID: string = 'echarts-rcrelinechart';
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
            top: '8%',
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

    constructor() {
        super();
    }

    componentDidMount() {
        let dom: any = document.getElementById(this.domID);
        this.chart = echarts.init(dom);
        this.overRideChartOptions(this.props.info);
        this.chart.setOption(this.chartOptions);
    }
    
    componentWillReceiveProps(nextProps: LineChartPropsInterface) {
        this.overRideChartOptions(nextProps.info);
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
        const style = {
            width: this.props.info.width || 500,
            height: this.props.info.height || 400
        };

        return (
            <div id={this.domID} style={style}/>
        );
    }
}