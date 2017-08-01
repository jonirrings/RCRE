import * as React from 'react';
import {IsBoolean, IsDefined, IsString, IsEmail, validateSync, MinLength} from 'class-validator';
import * as classNames from 'classnames';

import './style.css';

export class TextFieldPropsInterface {
    @IsString()
    className?: string;

    @IsString()
    defaultValue?: string;

    @IsBoolean()
    disabled?: boolean;

    @IsString()
    placeholder?: string;

    @IsString()
    @IsDefined()
    type: string;

    @IsString()
    @IsDefined()
    name: string;

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

    _value: string;
    _onChange: (type: string, newValue: string) => void;
}

interface TextFieldStateInterface {
    value: string;
    hasError: boolean;
}

class Text extends React.Component<TextFieldPropsInterface, TextFieldStateInterface> {
    constructor() {
        super();

        this.state = {
            value: '',
            hasError: false
        };

        this._onChange = this._onChange.bind(this);
        this._validateForm = this._validateForm.bind(this);
    }

    _onChange(event: React.FormEvent<HTMLInputElement>) {
        event.persist();
        // 如果强制设置value, 则说明是写死的值, 不需要触发onChange
        if (this.props.value) {
            return;
        }
        let newValue = event.currentTarget.value;

        this.setState({
            value: newValue
        }, () => {
            this.props._onChange(this.props.name, newValue);
        });
    }

    componentWillReceiveProps(nextProps: TextFieldPropsInterface) {
        if (this.state.value !== nextProps._value) {
            this.setState({
                value: nextProps.value
            });
        }
    }

    _validateForm(e: React.FormEvent<HTMLInputElement>) {
        let target = e.currentTarget;
        let val = target.value;
        
        let isValid = this._checkFormValid(this.props.required, val);
        
        this.setState({
            hasError: !isValid
        });
    }
    
    _checkFormValid(required: boolean, value: string) {
        if (!required && value === '') {
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
    
    _renderAddon(text: string) {
        if (!text) {
            return '';
        }
        
        return <span className="input-group-addon">{text}</span>;
    }
    
    isValid(): boolean {
        let valid = this._checkFormValid(this.props.required, this.state.value);
        
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
                        {this._renderAddon(this.props.preAddon)}
                        <input
                            className="form-control"
                            type={type}
                            name={name}
                            value={!!value ? value : this.state.value}
                            placeholder={placeholder}
                            onBlur={this._validateForm}
                            onChange={this._onChange}
                        />
                        {this._renderAddon(this.props.afterAddon)}
                    </div>
                </div>
                {tipTextElement}
            </div>
        );
    }
}

export default Text;