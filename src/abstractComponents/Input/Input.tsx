import {BasicFormItem, FormItemPropsInterface} from '../Form/FormItem';
import {IsBoolean, IsString, Validate} from 'class-validator';
import {IsValidEnums} from '../../render/util/validators';
import {BasicFormItemConfig} from '../Form/types';
import * as React from 'react';
import Trigger from '../../render/core/Trigger/Trigger';
import {onContainerItemChange} from '../../render/core/Container/types';

export class InputConfig extends BasicFormItemConfig {
    /**
     * 输入框类型
     * @public
     * @default text
     */
    @Validate(IsValidEnums, ['text', 'number', 'password', 'email', 'search'])
    inputType: 'text' | 'number' | 'password' | 'email' | 'search';

    /**
     * 输入框ID
     * @public
     * @default ''
     */
    @IsString()
    id: string;

    /**
     * 空间大小
     * @public
     * @default 'default'
     */
    @IsString()
    size: 'default' | 'large' | 'small';

    /**
     * 是否禁用
     * @public
     * @default false
     */
    @IsBoolean()
    disabled: boolean;

    /**
     * 带标签的 input，设置前置标签
     * @public
     * @default ''
     */
    @IsString()
    addonBefore: string;

    /**
     * 带标签的 input，设置后置标签
     * @public
     * @default ''
     */
    @IsString()
    addonAfter: string;
}

export class InputPropsInterface extends FormItemPropsInterface {
    info: InputConfig;
    value: string;

    onSearch: onContainerItemChange;
}

interface InputStateInterface {
    hasError: boolean;
}

class AbstractInput extends BasicFormItem<InputPropsInterface, InputStateInterface> {
    constructor() {
        super();
    }

    handleSearch() {
    }

    render() {
        let props = this.props;

        let children = React.createElement(Trigger, Object.assign({}, props, {
            value: this.getChildValue(),
            onChange: this.handleChange,
            onSearch: this.handleSearch
        }));

        return this.renderChildren(children);
    }
}

export default AbstractInput;