import {BasicFormItem, BasicFormItemConfig, BasicFormItemPropsInterface} from '../Form/types';
import {IsBoolean, Validate} from 'class-validator';
import {IsPageInfo} from '../../render/util/validators';

export class CheckboxConfig extends BasicFormItemConfig {
    /**
     * 初始是否选中
     * @public
     * @default false
     */
    @IsBoolean()
    defaultChecked?: boolean;

    /**
     * 是否禁用
     * @public
     * @default false
     */
    @IsBoolean()
    disabled?: boolean;

    /**
     * 文字
     * @public
     * @default ''
     */
    text?: string;
}

export class CheckboxPropsInterface extends BasicFormItemPropsInterface {
    @Validate(IsPageInfo, [CheckboxConfig])
    info: CheckboxConfig;
}

class AbstractCheckbox extends BasicFormItem<CheckboxPropsInterface, {}> {
    constructor() {
        super();
    }
    
    render() {
        return this.getComponentThroughDriver();
    }
}

export default AbstractCheckbox;