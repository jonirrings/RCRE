import * as React from 'react';
import {CSSProperties} from 'react';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {IsBoolean, IsDefined, IsNumber, IsString} from 'class-validator';
import componentLoader from '../../render/util/componentLoader';
import {DatePicker} from 'antd';
import {DatePickerProps} from 'antd/lib/date-picker';
import * as moment from 'moment';

export class DatePickerCommonConfig extends BasicConfig {
    /**
     * 数据模型Key
     */
    @IsDefined()
    name: string;

    /**
     * 是否禁用
     * @public
     * @default false
     */
    @IsBoolean()
    disabled?: boolean;

    /**
     * 是否显示清除按钮
     */
    @IsBoolean()
    allowClear?: boolean;

    /**
     * CSS样式
     */
    style?: CSSProperties;

    /**
     * CSS class
     */
    @IsString()
    className?: string;
}

export class DatePickerConfig extends DatePickerCommonConfig {
    /**
     * 开始时间
     * @public
     * @default null
     */
    @IsString()
    @IsNumber()
    startTime?: string | number;

    /**
     * 结束时间
     * @public
     * @default null
     */
    @IsString()
    @IsNumber()
    endTime?: string | number;

    /**
     * 展示的日期格式，配置参考 moment.js
     */
    @IsString()
    format?: string;

    /**
     * 是否展示“今天”按钮
     */
    @IsBoolean()
    showToday?: boolean;

    /**
     * 选择的日期可以被清除
     */
    clearAble?: boolean;
    
    /**
     * 增加时间选择功能
     */
    @IsBoolean()
    showTime?: boolean;

    /**
     * 输入框高度
     */
    size: 'large' | 'small';

    /**
     * 初始默认值
     */
    defaultValue?: string;

    /**
     * 输入框提示文字
     * @public
     * @default ''
     */
    @IsString()
    placeholder?: string;
}

export class DatePickerPropsInterface extends BasicContainerPropsInterface {
    info: DatePickerConfig;
}

export default class AbstractDatepicker extends BasicContainer<DatePickerPropsInterface, {}> {
    constructor() {
        super();
        
        this.handleChange = this.handleChange.bind(this);
        this.disabledDate = this.disabledDate.bind(this);
    }

    componentDidMount() {
        if (this.props.info.name && this.props.$setData && this.props.info.defaultValue) {
            const $setData = this.props.$setData;
            let info = this.getPropsInfo(this.props.info);
            const value = info.defaultValue;
            let format = info.format || 'YYYY-MM-DD';
            
            let data: string = moment(value).format(format);
            
            setTimeout(() => {
                $setData(this.props.info.name, data);
            }, 0);
        }
    }

    render() {
        let info = this.getPropsInfo(this.props.info);

        if (!info.name) {
            return <div>name property is required for DatePicker Element</div>;
        }

        if (!this.props.$data) {
            return <div>DatePicker Element is out of RCRE control, please put it inside container component</div>;
        }

        let value = this.getValueFromDataStore(info.name);

        let date;
        if (value) {
            date = moment(value);

            if (!date.isValid()) {
                return this.errorReport('invalid date time value: ' + value, 'div');
            }
        }

        let datePickerOptions = this.mapDatePickerOptions(info);

        return React.createElement(DatePicker, {
            value: date,
            onChange: this.handleChange,
            disabledDate: this.disabledDate(info),
            onOpenChange: (status: boolean) => {
                this.commonEventHandler('onOpenChange', {
                    status: status
                });
            },
            ...datePickerOptions
        });
    }
   
    private mapDatePickerOptions(info: DatePickerConfig): DatePickerProps {
        return {
            className: info.className,
            showTime: info.showTime,
            showToday: info.showToday,
            placeholder: info.placeholder,
            format: info.format
        };
    }
    
    private disabledDate(info: DatePickerConfig) {
        return (startValue: moment.Moment) => {
            let startTime = info.startTime;
            let endTime = info.endTime;
            let flag = false;
            
            if (!startValue) {
                startValue = moment().startOf('day');
            }
            
            if (startTime) {
                flag = startValue.valueOf() < moment(startTime).valueOf();
            }
            
            if (endTime && !flag) {
                flag = startValue.valueOf() > moment(endTime).valueOf();
            }
            
            return flag;
        };
    }

    private handleChange(date: moment.Moment, dateString: string) {
        if (!this.props.info.clearAble && !date) {
            return;
        }

        if (this.props.$setData) {
            this.props.$setData(this.props.info.name, dateString);
        }
    }
}

componentLoader.addComponent('datePicker', AbstractDatepicker, DatePickerPropsInterface);