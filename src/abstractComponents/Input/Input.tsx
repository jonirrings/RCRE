import * as React from 'react';
import {BasicFormItem, BasicFormItemConfig} from '../Form/types';
import createElement from '../../render/util/createElement';
import {IsBoolean, IsString, Validate} from 'class-validator';
import {IsValidEnums} from '../../render/util/validators';
import FormItem, {FormItemPropsInterface} from '../Form/FormItem';

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

    /**
     *  输入框文本触发回调
     */
    onChange: (type: string, newValue: string) => void;
}

interface InputStateInterface {
    hasError: boolean;
}

class AbstractInput extends BasicFormItem<InputPropsInterface, InputStateInterface> {
    static defaultProps = {
        value: '',

        onChange() {
            console.error('onChange 方法没有实现');
        }
    };

    constructor() {
        super();

        // this.onChange = this.onChange.bind(this);
        // this.validateForm = this.validateForm.bind(this);
    }
    
    private wrapWithFormItem(children: React.ReactElement<InputPropsInterface>) {
        return createElement(FormItem, FormItemPropsInterface, this.props, children);
    }

    render() {
        let children = this.getComponentThroughDriver();
        if (this.context.form) {
            return this.wrapWithFormItem(children);
        }
        
        return children;
    }
    
    // private onChange(event: React.FormEvent<HTMLInputElement>) {
    //     if (this.props.readonly) {
    //         return;
    //     }
    //    
    //     event.persist();
    //     let newValue = event.currentTarget.value;
    //
    //     this.props.onChange(this.props.name, newValue);
    // }

    // private validateForm(e: React.FormEvent<HTMLInputElement>) {
    //     let target = e.currentTarget;
    //     let val = target.value;
    //    
    //     let isValid = this.checkFormValid(this.props.required, val);
    //    
    //     this.setState({
    //         hasError: !isValid
    //     });
    // }

    // private checkFormValid(required: boolean, value: string) {
    //     if (!required && value === '') {
    //         return true;
    //     }
    //    
    //     if (this.props.readonly) {
    //         return true;
    //     }
    //
    //     let type = this.props.type;
    //    
    //     class ValidateObj {
    //         text: string;
    //     }
    //    
    //     switch (type) {
    //         case 'email':
    //             IsEmail()(ValidateObj.prototype, 'text');
    //             break;
    //         case 'text':
    //         case 'password':
    //             IsString()(ValidateObj.prototype, 'text');
    //             MinLength(1)(ValidateObj.prototype, 'text');
    //             break;
    //         default:
    //     }
    //    
    //     let obj = new ValidateObj();
    //     obj.text = value;
    //    
    //     return validateSync(obj).length === 0;
    // }

    // private renderAddonText(text: string) {
    //     if (!text) {
    //         return '';
    //     }
    //    
    //     return <span className="input-group-addon">{text}</span>;
    // }

    // public isValid(): boolean {
    //     let valid = this.checkFormValid(this.props.required, this.props.value);
    //    
    //     this.setState({
    //         hasError: !valid
    //     });
    //    
    //     return valid;
    // }
}

export default AbstractInput;