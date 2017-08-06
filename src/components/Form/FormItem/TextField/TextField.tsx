import * as React from 'react';
import {IsBoolean, IsString, IsEmail, validateSync, MinLength} from 'class-validator';
import * as classNames from 'classnames';
import { FormItem, FormItemBasicPropsInterface } from '../../types';

import './style.css';

export class TextFieldPropsInterface extends FormItemBasicPropsInterface {
    @IsString()
    className?: string;

    @IsString()
    defaultValue?: string;

    @IsBoolean()
    disabled?: boolean;

    @IsString()
    placeholder?: string;

    @IsString()
    label?: string;

    @IsString()
    value: string;

    @IsBoolean()
    required: boolean;

    @IsString()
    regexp: string;

    @IsString()
    errorMsg: string;
    
    @IsString()
    preAddon: string;
    
    @IsString()
    afterAddon: string;
    
    @IsBoolean()
    readonly: boolean;

    onChange: (type: string, newValue: string) => void;
}

interface TextFieldStateInterface {
    hasError: boolean;
}

class Text extends FormItem<TextFieldPropsInterface, TextFieldStateInterface> {
    static defaultProps = {
        value: '',
        
        onChange() {
            console.error('onChange 方法没有实现');
        }
    };
    
    constructor() {
        super();

        this.state = {
            hasError: false
        };

        this.onChange = this.onChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    private onChange(event: React.FormEvent<HTMLInputElement>) {
        if (this.props.readonly) {
            return;
        }
        
        event.persist();
        let newValue = event.currentTarget.value;

        this.props.onChange(this.props.name, newValue);
    }

    private validateForm(e: React.FormEvent<HTMLInputElement>) {
        let target = e.currentTarget;
        let val = target.value;
        
        let isValid = this.checkFormValid(this.props.required, val);
        
        this.setState({
            hasError: !isValid
        });
    }
    
    private checkFormValid(required: boolean, value: string) {
        if (!required && value === '') {
            return true;
        }
        
        if (this.props.readonly) {
            return true;
        }

        let type = this.props.type;
        
        class ValidateObj {
            text: string;
        }
        
        switch (type) {
            case 'email':
                IsEmail()(ValidateObj.prototype, 'text');
                break;
            case 'text':
            case 'password':
                IsString()(ValidateObj.prototype, 'text');
                MinLength(1)(ValidateObj.prototype, 'text');
                break;
            default:
        }
        
        let obj = new ValidateObj();
        obj.text = value;
        
        return validateSync(obj).length === 0;
    }
    
    private renderAddonText(text: string) {
        if (!text) {
            return '';
        }
        
        return <span className="input-group-addon">{text}</span>;
    }
    
    public isValid(): boolean {
        let valid = this.checkFormValid(this.props.required, this.props.value);
        
        this.setState({
            hasError: !valid
        });
        
        return valid;
    }

    render() {
        const {
            type,
            name,
            value,
            label,
            placeholder
        } = this.props;

        let labelComponent;

        if (!!label) {
            labelComponent = <label className="col-xs-3 form-control-static control-label">{label}</label>;
        }

        let wrapperClass = classNames({
            'form-group': true,
            'gaea-text-field': true,
            'clearfix': true,
            'has-error': this.state.hasError
        });
        
        let tipTextElement = this.state.hasError && (
            <div className="col-xs-3">
                <span className="text-danger">{this.props.errorMsg}</span>
            </div>
        );
        
        return (
            <div className={wrapperClass}>
                {labelComponent}
                <div className="col-xs-5">
                    <div className="input-group">
                        {this.renderAddonText(this.props.preAddon)}
                        <input
                            className="form-control"
                            type={type}
                            name={name}
                            value={value}
                            placeholder={placeholder}
                            onBlur={this.validateForm}
                            onChange={this.onChange}
                            readOnly={this.props.readonly}
                        />
                        {this.renderAddonText(this.props.afterAddon)}
                    </div>
                </div>
                {tipTextElement}
            </div>
        );
    }
}

export default Text;