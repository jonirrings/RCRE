import * as React from 'react';
import {BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {DatePicker} from 'antd';
import {DatePickerCommonConfig} from '../DatePicker/DatePicker';
import * as moment from 'moment';
import componentLoader from '../../render/util/componentLoader';

const RangePicker = DatePicker.RangePicker;

export class RangePickerConfig extends DatePickerCommonConfig {
    /**
     * 默认日期
     */
    defaultValue: string;
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

    handleChange(dates: [moment.Moment, moment.Moment], dateStrings: [string, string]) {
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

        let rangePickerValue: any;

        if (value) {
            rangePickerValue = [moment(value[0]), moment(value[1])];
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