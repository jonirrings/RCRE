import * as React from 'react';
import {CSSProperties} from 'react';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {IsBoolean, IsDefined, IsNumber, IsString} from 'class-validator';
import componentLoader from '../../render/util/componentLoader';
import {DatePicker} from 'antd';
import {DatePickerProps} from 'antd/lib/date-picker';
import * as moment from 'moment';

export class DatePickerConfig extends BasicConfig {
    /**
     * Datepicker的数据模型Key
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
     * 输入框提示文字
     * @public
     * @default ''
     */
    @IsString()
    placeholder?: string;

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
     * 增加时间选择功能
     */
    @IsBoolean()
    showTime?: boolean;

    /**
     * 输入框高度
     */
    size: 'large' | 'small';
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

    private mapDatePickerOptions(info: DatePickerConfig): DatePickerProps {
        return {
            className: info.className,
            showTime: info.showTime,
            showToday: info.showToday,
            placeholder: info.placeholder,
        };
    }
   
    private handleChange(date: moment.Moment, dateString: string) {
        if (this.props.$setData) {
            this.props.$setData(this.props.info.name, moment(date));
        }
    }
    
    private disabledDate(info: DatePickerConfig) {
        return (startValue: moment.Moment) => {
            let startTime = info.startTime;
            let endTime = info.endTime;
            let flag = false;
            
            if (info.startTime) {
                flag = startValue.valueOf() < moment(startTime).valueOf();
            }
            
            if (info.endTime && !flag) {
                flag = startValue.valueOf() > moment(endTime).valueOf();
            }
            
            return flag;
        };
    }
    
    render() {
        let info = this.getPropsInfo(this.props.info);
        
        if (!info.name) {
            return <div>name property is required for DatePicker Element</div>;
        }

        if (!this.props.$data) {
            return <div>DatePicker Element is out of RCRE control, please put it inside container component</div>;
        }

        let value = this.props.$data.get(info.name);
        
        if (typeof value === 'string' || typeof value === 'number') {
            value = moment(value);
        }
        
        let datePickerOptions = this.mapDatePickerOptions(info);
        
        return React.createElement(DatePicker, {
            value: value,
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
}

componentLoader.addComponent('datePicker', AbstractDatepicker, DatePickerPropsInterface);