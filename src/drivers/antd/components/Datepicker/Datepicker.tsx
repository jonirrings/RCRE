import * as React from 'react';
import {DatePicker} from 'antd';
import {DatePickerConfig, DatePickerPropsInterface} from '../../../../abstractComponents/Datepicker/Datepicker';
import {DatePickerProps} from 'antd/es/date-picker';
import * as moment from 'moment';

export default class AntDatePicker extends React.Component<DatePickerPropsInterface, {}> {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        let info = this.props.info;

        return React.createElement(DatePicker, Object.assign(this.mapOptions(info), {
            value: this.props.value ? moment(this.props.value) : moment(),
            onChange: this.handleChange
        }));
    }

    handleChange(dates: moment.Moment, dateStrings: string) {
        this.props.onChange(dateStrings);
    }

    private mapOptions(props: DatePickerConfig): DatePickerProps {
        return {
            allowClear: true,
            showTime: true,
            defaultValue: moment(),
            disabled: props.disabled,
            placeholder: props.placeholder,
            format: props.format || 'YYYY-MM-DD HH:mm:ss'
        };
    }
}