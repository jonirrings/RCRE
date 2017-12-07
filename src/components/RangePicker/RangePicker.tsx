import * as React from 'react';
import {BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {DatePicker} from 'antd';
import {DatePickerCommonConfig} from '../DatePicker/DatePicker';
import * as moment from 'moment';
import componentLoader from '../../render/util/componentLoader';

import 'rc-calendar/assets/index.css';
import 'rc-time-picker/assets/index.css';

const LowLevelRangePicker = require('rc-calendar/lib/RangeCalendar');
const zhCN = require('rc-calendar/lib/locale/zh_CN');
const RangePicker = DatePicker.RangePicker;

export class RangePickerConfig extends DatePickerCommonConfig {
    /**
     * 默认日期
     */
    defaultValue: [string, string];

    /**
     * 不使用Input，而是直接渲染时间选择器
     */
    pure: boolean;

    /**
     * 写入到数据模型的日期格式
     */
    format?: string;

    /**
     * 没有输入的提示文字
     */
    placeholder: [string, string];
}

export class RangePickerPropsInterface extends BasicContainerPropsInterface {
    info: RangePickerConfig;
}

export class AbstractRangePicker extends BasicContainer<RangePickerPropsInterface, {}> {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        let info = this.props.info;

        if (this.props.$setData && info.name) {
            const $setData = this.props.$setData;
            const value = info.defaultValue;

            setTimeout(() => {
                $setData(info.name, value);
            });
        }
    }
    
    private handleChange(dates: [moment.Moment, moment.Moment], dateStrings: string[]) {
        if (this.props.$setData && this.props.info) {
            this.props.$setData(this.props.info.name, dateStrings);
        }
    }

    render() {
        let info = this.getPropsInfo(this.props.info);

        if (!info.name) {
            return this.errorReport('name property is required for RangePicker component', 'div');
        }

        if (!this.props.$data) {
            return this.errorReport('RangePicker component should be under container component control', 'div');
        }

        let value: [string, string] = this.props.$data.get(info.name);

        if (value && !(value instanceof Array)) {
            return this.errorReport('invalid value for rangePicker component', 'div');
        }

        let rangePickerValue: any = [moment(), moment()];

        if (value) {
            rangePickerValue = [moment(value[0]), moment(value[1])];
        }
        
        const format = info.format || 'YYYY-MM-DD';

        if (info.pure) {
            return (
                <LowLevelRangePicker
                    showToday={false}
                    showWeekNumber={true}
                    dateInputPlaceholder={['开始时间', '结束时间']}
                    locale={zhCN}
                    showOk={false}
                    showClear={false}
                    selectedValue={rangePickerValue}
                    format={format}
                    onChange={(time: [moment.Moment, moment.Moment]) => {
                        if (time.length === 2) {
                            this.commonEventHandler('onComplete', {
                                startTime: time[0].format(info.format),
                                endTime: time[1].format(info.format)
                            }, true);
                        }
                        
                        this.handleChange(time, time.map(ti => ti.format(format)));
                    }}
                />
            );
        }
        
        return (
            <RangePicker
                value={rangePickerValue}
                onChange={this.handleChange}
            />
        );
    }
}

componentLoader.addComponent('rangePicker', AbstractRangePicker, RangePickerPropsInterface);