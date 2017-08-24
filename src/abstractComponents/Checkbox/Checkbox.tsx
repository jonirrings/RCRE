import {BasicFormItemConfig, BasicFormItemPropsInterface} from '../Form/types';
import {IsBoolean, IsString, Validate} from 'class-validator';
import {IsPageInfo} from '../../render/util/validators';
import {BasicFormItem} from '../Form/FormItem';
import Trigger from '../../render/core/Trigger/Trigger';
import * as React from 'react';

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
    @IsString()
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
        return React.createElement(Trigger, this.props);
    }
}

export default AbstractCheckbox;