type titleTypes = {
    text: string;
};

type tooltipTypes = {
    trigger: string;
    axisPointer?: {
        type: string;
        label: {
            [s: string]: string
        }
    }
};

type legendTypes = {
    top: string | number;
    data: string[] | number[];
};

type toolboxTypes = {
    itemSize: number;
    itemGap: number;
    right: number;
    feature: {
        [s: string]: any
    }
};

type gridTypes = {
    [s: string]: string | number | boolean;
};

type xAxisTypes = {
    type: 'category' | 'value' | 'log';
    boundaryGap: boolean;
    data: string[]
};

type yAxisTypes = {
    type: 'category' | 'value' | 'log';
};

type dataZoomTypes = {
    id: string;
    type: string;
    xAxisIndex?: number[];
    filterMode: string;
};

type seriesTypes = {
    name: string;
    type?: string;
    stack?: string;
    label?: {
        normal: {
            show?: boolean;
            position?: string;
        }
    },
    areaStyle?: {
        normal?: Object
    }
    data: string[] | number[];
};

export type chartTypes = {
    title: titleTypes,
    tooltip: tooltipTypes,
    legend: legendTypes,
    toolbox: toolboxTypes,
    grid: gridTypes | gridTypes[],
    xAxis: xAxisTypes,
    yAxis: yAxisTypes[] | yAxisTypes,
    dataZoom: dataZoomTypes[],
    series: seriesTypes[]
};
