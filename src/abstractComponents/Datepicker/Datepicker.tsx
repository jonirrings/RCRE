import {BasicFormItem} from '../Form/FormItem';
import {BasicFormItemConfig, BasicFormItemPropsInterface} from '../Form/types';
import {IsBoolean, IsNumber, IsString, Validate} from 'class-validator';
import {IsValidEnums} from '../../render/util/validators';
import {parseTimeString} from './util';

export class DatePickerConfig extends BasicFormItemConfig {
    /**
     * 渲染模式
     * @public
     * @default 'datepicker'
     */
    @Validate(IsValidEnums, ['datepicker', 'datepicker+timepicker', 'timepicker'])
    mode?: 'datepicker' | 'datepicker+timepicker' | 'timepicker' | 'monthpicker';

    /**
     * 是否禁用
     * @public
     * @default false
     */
    @IsBoolean()
    disabled: boolean;

    /**
     * 开始时间
     * @public
     * @default null
     */
    @IsString()
    @IsNumber()
    startTime?: string;

    /**
     * 时间间隔
     * @public
     * @default 0
     */
    @IsString()
    @IsNumber()
    timeRange?: number;

    /**
     * 结束时间
     * @public
     * @default null
     */
    @IsString()
    @IsNumber()
    endTime?: string;

    /**
     * 输入框提示文字
     * @public
     * @default ''
     */
    @IsString()
    placeholder: string;

    /**
     * 日期输出格式
     * @public
     * @default 'YYYY-MM-DD HH:mm:ss'
     */
    format: string;
}

export class DatePickerPropsInterface extends BasicFormItemPropsInterface {
    info: DatePickerConfig;
}

export default class AbstractDatepicker extends BasicFormItem<DatePickerPropsInterface, {}> {
    constructor() {
        super();
    }

    render() {
        let info = Object.assign({}, this.props.info);

        if (info.startTime) {
            info.startTime = parseTimeString(info.startTime).valueOf().toString();
        }

        if (info.endTime) {
            info.endTime = parseTimeString(info.endTime).valueOf().toString();
        }

        return this.getComponentThroughDriver(info);
    }
}