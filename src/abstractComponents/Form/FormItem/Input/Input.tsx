import * as React from 'react';
// import {IsBoolean, IsString, IsEmail, validateSync, MinLength} from 'class-validator';
import * as PropTypes from 'prop-types';
import {FormItem, FormItemBasicConfig, FormItemBasicPropsInterface} from '../../types';
import {DriverController} from '../../../../drivers/index';
import createElement from '../../../../render/util/createElement';
import {Validate} from 'class-validator';
import {IsValidEnums} from '../../../../render/util/validators';

export class InputProps extends FormItemBasicConfig {
    /**
     * 输入框类型
     * @public
     * @default text
     */
    @Validate(IsValidEnums, ['text', 'number', 'password', 'email'])
    inputType: 'text' | 'number' | 'password' | 'email';
}

export class InputPropsInterface extends FormItemBasicPropsInterface {
    info: InputProps;

    /**
     *  输入框文本触发回调
     */
    onChange: (type: string, newValue: string) => void;
}

interface InputStateInterface {
    hasError: boolean;
}

class AbstractInput extends FormItem<InputPropsInterface, InputStateInterface> {
    static defaultProps = {
        value: '',

        onChange() {
            console.error('onChange 方法没有实现');
        }
    };

    static contextTypes = {
        driver: PropTypes.object
    };

    constructor() {
        super();

        this.state = {
            hasError: false
        };

        // this.onChange = this.onChange.bind(this);
        // this.validateForm = this.validateForm.bind(this);
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

    render() {
        let driver: DriverController = this.context.driver;
        let componentInfo = driver.getComponent(this.props.info.type);

        if (!componentInfo) {
            console.error(`can not find module ${this.props.info.type}`);
            return <div/>;
        }

        let Component = componentInfo.component;
        let componentInterface = componentInfo.componentInterface;

        return createElement(Component, componentInterface, this.props.info);
    }
}

export default AbstractInput;