import {BasicFormItem, BasicFormItemConfig, BasicFormItemPropsInterface} from '../Form/types';
import {IsArray, IsBoolean, IsDefined, IsString, Validate} from 'class-validator';
import {IsPageInfo} from '../../render/util/validators';

export class SelectConfig extends BasicFormItemConfig {
    /**
     * 下拉框模式
     */
    @IsString()
    mode: 'multiple' | 'tags' | 'combobox';

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