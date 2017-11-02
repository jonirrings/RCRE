import * as React from 'react';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {IsBoolean, IsDefined, IsString} from 'class-validator';
import * as moment from 'moment';
import {TimePicker} from 'antd';
import {TimePickerProps} from 'antd/lib/time-picker';
import {CSSProperties} from 'react';
import componentLoader from '../../render/util/componentLoader';

export class TimePickerConfig extends BasicConfig {
    /**
     * Select的数据模型Key
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
     * 开始时间
     */
    @IsString()
    startTime?: string | number;

    /**
     * 结束时间
     */
    @IsString()
    endTime?: string | number;

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
     * 输入框大小
     */
    size: 'large' | 'default' | 'small';

    /**
     * 展示的日期格式，配置参考 moment.js
     */
    @IsString()
    format?: string;

    /**
     * 输入框提示文字
     * @public
     * @default ''
     */
    @IsString()
    placeholder?: string;

    /**
     * 隐藏禁止选择的选项
     */
    hideDisabledOptions?: boolean;

    /**
     * 底部框显示的文字
     */
    text?: string;

    /**
     * 是否是12小时制
     */
    @IsBoolean()
    use12Hours?: boolean;
}

export class TimePickerPropsInterface extends BasicContainerPropsInterface {
    info: TimePickerConfig;
}

export class AbstractTimePicker extends BasicContainer<TimePickerPropsInterface, {}> {
    constructor() {
        super();
        this.mapTimePickerOptions = this.mapTimePickerOptions.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.disabledHours = this.disabledHours.bind(this);
        // this.disabledMinutes = this.disabledMinutes.bind(this);
        // this.disabledSeconds = this.disabledSeconds.bind(this);
    }

    private mapTimePickerOptions(info: TimePickerConfig): TimePickerProps {
        return {
            className: info.className,
            size: info.size,
            format: info.format,
            disabled: info.disabled,
            placeholder: info.placeholder,
            hideDisabledOptions: info.hideDisabledOptions,
            style: info.style,
            addon: () => info.text,
            use12Hours: info.use12Hours
        };
    }

    // private disabledHours(info: TimePickerConfig) {
    //     return () => {
    //         let startTime = info.startTime;
    //         let endTime = info.endTime;
    //         let disabled = [];
    //         let start = 0;
    //         let end = 24;
    //        
    //         if (startTime) {
    //             start = moment(startTime).hour();
    //         }
    //        
    //         if (endTime) {
    //             end = moment(endTime).hour();
    //         }
    //
    //         for (let i = 1; i <= 24; i ++) {
    //             if (i < start) {
    //                 disabled.push(i);
    //             } else if (i > end) {
    //                 disabled.push(i);
    //             }
    //         }
    //        
    //         return disabled;
    //     };
    // }
    //
    // private disabledMinutes(info: TimePickerConfig) {
    //     return (selectedHour: number) => {
    //         let startTime = info.startTime;
    //         let endTime = info.endTime;
    //         let disabled = [];
    //         let start = 0;
    //         let end = 60;
    //        
    //         if (startTime) {
    //             let hour = moment(startTime).hour();
    //            
    //             if (selectedHour < hour) {
    //                 start = 59;
    //             } else {
    //                 start = moment(startTime).minute();
    //             }
    //         }
    //        
    //         if (endTime) {
    //             let hour = moment(endTime).hour();
    //            
    //             if (selectedHour > hour) {
    //                 end = 1;
    //             } else {
    //                 end = moment(endTime).minute();
    //             }
    //         }
    //        
    //         for (let i = 1; i <= 60; i ++) {
    //             if (i < start) {
    //                 disabled.push(i);
    //             } else if (i > end) {
    //                 disabled.push(i);
    //             }
    //         }
    //        
    //         return disabled;
    //     };
    // }
    //
    // private disabledSeconds(info: TimePickerConfig) {
    //     return (selectedHour: number, selectedMinute: number) => {
    //         let startTime = info.startTime;
    //         let endTime = info.endTime;
    //         let disabled = [];
    //         let start = 0;
    //         let end = 0;
    //        
    //         if (startTime) {
    //             let hour = moment(startTime).hour();
    //             let minute = moment(startTime).minute();
    //            
    //             if (selectedHour < hour || selectedMinute < minute) {
    //                 start = 59;
    //             } else {
    //                 start = moment(startTime).second();
    //             }
    //         }
    //        
    //         if (endTime) {
    //             let hour = moment(endTime).hour();
    //             let minute = moment(endTime).minute();
    //            
    //             if (selectedHour > hour || selectedMinute > minute) {
    //                 end = 1;
    //             } else {
    //                 end = moment(endTime).second();
    //             }
    //         }
    //        
    //         for (let i = 1; i <= 60; i ++) {
    //             if (i < start) {
    //                 disabled.push(i);
    //             } else if (i > end) {
    //                 disabled.push(i);
    //             }
    //         }
    //        
    //         return disabled;
    //     };
    // }

    private handleChange(time: moment.Moment, timeString: string) {
        if (this.props.$setData) {
            this.props.$setData(this.props.info.name, time);
        }
    }

    render() {
        let info = this.getPropsInfo(this.props.info);

        if (!info.name) {
            return <div>name property is required for TimePicker Element</div>;
        }

        if (!this.props.$data) {
            return <div>TimePicker Element is out of RCRE control, please put it inside container component</div>;
        }

        let value = this.props.$data.get(info.name);
        if (typeof value === 'string' || typeof value === 'number') {
            value = moment(value);
        }

        let timePickerOptions = this.mapTimePickerOptions(info);

        return React.createElement(TimePicker, {
            value: value,
            onChange: this.handleChange,
            // disabledHours: this.disabledHours(info),
            // disabledMinutes: this.disabledMinutes(info),
            // disabledSeconds: this.disabledSeconds(info),
            ...timePickerOptions
        });
    }
}

componentLoader.addComponent('timePicker', AbstractTimePicker, TimePickerPropsInterface);