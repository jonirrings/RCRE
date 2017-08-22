import {BasicFormItemConfig, BasicFormItemPropsInterface} from '../Form/types';
import {IsArray, IsBoolean, IsDefined, IsString, Validate} from 'class-validator';
import {IsPageInfo, IsValidEnums} from '../../render/util/validators';
import {BasicFormItem} from '../Form/FormItem';

export class SelectConfig extends BasicFormItemConfig {
    /**
     * 下拉框模式
     * @public
     * @default ''
     */
    @IsString()
    mode?: 'multiple' | 'tags' | 'combobox';

    /**
     * 支持清除
     * @public
     * @default false
     */
    @IsBoolean()
    allowClear?: boolean;

    /**
     * 输入框默认文字
     * @public
     * @default ''
     */
    @IsString()
    placeholder?: string;

    /**
     * 选择框大小，可选 large small default
     * @public
     * @default default
     */
    @Validate(IsValidEnums, ['large', 'small', 'default'])
    size?: 'default' | 'large' | 'small';

    /**
     * 是否禁用
     * @public
     * @default false
     */
    @IsBoolean()
    disabled?: boolean;
    
    /**
     * 下拉框列表
     */
    @IsArray()
    @IsDefined()
    options: OptionConfig[];
}

export class OptionConfig {
    /**
     * 下拉框展示的内容
     * @public
     */
    @IsDefined()
    @IsString()
    key: string;

    /**
     * 下拉框提交的内容
     * @public
     */
    @IsString()
    @IsDefined()
    value: string;

    /**
     * 是否禁用
     * @public
     * @default false
     */
    @IsBoolean()
    disabled: boolean;
}

export class SelectPropsInterface extends BasicFormItemPropsInterface {
    @Validate(IsPageInfo, [SelectConfig])
    info: SelectConfig;
}

class AbstractSelect extends BasicFormItem<SelectPropsInterface, {}> {
    constructor() {
        super();
    }

    render() {
        return this.getComponentThroughDriver();
    }
}

export default AbstractSelect;