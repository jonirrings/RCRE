import {BasicFormItem, FormItemPropsInterface} from '../Form/FormItem';
import {IsBoolean, IsString, Validate} from 'class-validator';
import {IsValidEnums} from '../../render/util/validators';
import {BasicFormItemConfig} from '../Form/types';
import * as React from 'react';
import Trigger from '../../render/core/Trigger/Trigger';
import Col, {hasColProps} from '../../render/core/Layout/Col/Col';

export class InputConfig extends BasicFormItemConfig {
    /**
     * 输入框类型
     * @public
     * @default text
     */
    @Validate(IsValidEnums, ['text', 'number', 'password', 'email'])
    inputType: 'text' | 'number' | 'password' | 'email';

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
}

interface InputStateInterface {
    hasError: boolean;
}

class AbstractInput extends BasicFormItem<InputPropsInterface, InputStateInterface> {
    constructor() {
        super();
    }

    render() {
        let props = this.props;

        let childValue = '';

        if (this.props.$data) {
            if (this.context.form && this.props.info.name) {
                childValue = this.props.$data.get(this.props.info.name);
            } else if (this.context.abstractContainer && this.props.info.childModel) {
                childValue = this.props.$data.get(this.props.info.childModel);
            } else if (this.props.info.model) {
                childValue = this.props.$data.get(this.props.info.model);
            }
        }

        let children = React.createElement(Trigger, Object.assign({}, props, {
            value: childValue,
            onChange: this.handleChange
        }));

        if (hasColProps(props.info)) {
            children = React.createElement(Col, {
                info: this.props.info
            }, children);
        }

        return children;
    }
}

export default AbstractInput;