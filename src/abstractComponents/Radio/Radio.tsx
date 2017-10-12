import {BasicFormItemConfig, BasicFormItemPropsInterface} from '../Form/types';
import {IsBoolean, IsString, Validate} from 'class-validator';
import {IsPageInfo} from '../../render/util/validators';
import {BasicFormItem} from '../Form/FormItem';
import * as React from 'react';
import Trigger from '../../render/core/Trigger/Trigger';
import componentLoader from '../../render/util/componentLoader';

export class RadioConfig extends BasicFormItemConfig {
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
    disabled: boolean;
    
    /**
     * 文字
     * @public
     * @default ''
     */
    @IsString()
    text?: string;
}

export class RadioPropsInterface extends BasicFormItemPropsInterface {
    @Validate(IsPageInfo, [RadioConfig])
    info: RadioConfig;
}

class AbstractRadio extends BasicFormItem<RadioPropsInterface, {}> {
    constructor() {
        super();
    }
    
    render() {
        let children = React.createElement(Trigger, this.props);
        return this.renderChildren(children);
    }
}

componentLoader.addComponent('radio', AbstractRadio, RadioPropsInterface);

export default AbstractRadio;