export type titleTypes = {
    text: string;
};

export type tooltipTypes = {
    trigger: string;
    axisPointer?: {
        type: string;
        label: {
            [s: string]: string
        }
    }
};

export type legendTypes = {
    top: string | number;
    data: string[] | number[];
};

export type toolboxTypes = {
    itemSize: number;
    itemGap: number;
    right: number;
    feature: {
        [s: string]: any
    }
};

export type gridTypes = {
    [s: string]: string | number | boolean;
};

export type xAxisTypes = {
    type: 'category' | 'value' | 'log';
    boundaryGap: boolean;
    data: string[]
};

export type yAxisTypes = {
    type: 'category' | 'value' | 'log';
};

export type dataZoomTypes = {
    id: string;
    type: string;
    xAxisIndex?: number[];
    filterMode: string;
};

export type seriesTypes = {
    name: string;
    type?: string;
    stack?: string;
    label?: {
        normal?: {
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
