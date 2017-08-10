import * as React from 'react';
import {IsBoolean, IsString, IsArray, validateSync} from 'class-validator';
import * as classNames from 'classnames';
import { FormItem, FormItemBasicPropsInterface } from '../../types';

import './style.css';

export class SelectPropsInterface extends FormItemBasicPropsInterface {
    @IsString()
    className?: string;

    @IsString()
    defaultValue?: string;

    @IsBoolean()
    disabled?: boolean;

    @IsString()
    label?: string;

    @IsString()
    value: string;

    @IsBoolean()
    required: boolean;

    @IsString()
    errorMsg: string;
    
    @IsString()
    preAddon: string;
    
    @IsString()
    afterAddon: string;

    @IsArray()
    options: Array<SelectOptionInterface|string>;

    onChange: (type: string, newValue: string) => void;
}

export interface SelectOptionInterface {
    label: string;
    value: string;
}

interface SelectStateInterface {
    value: string;
    hasError: boolean;
}

class Select extends FormItem<SelectPropsInterface, SelectStateInterface> {
    static defaultProps = {
        value: '',
        
        onChange() {
            console.error('onChange 方法没有实现');
        }
    };
    
    constructor(props: SelectPropsInterface) {
        super();

        this.state = {
            value: props.value,
            hasError: false
        };

        this.onChange = this.onChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    private onChange(event: React.FormEvent<HTMLSelectElement>) {
        if (this.props.disabled) {
            return;
        }
        
        event.persist();
        let newValue = event.currentTarget.value;

        this.setState({
            value: newValue
        }, () => {
            this.props.onChange(this.props.name, newValue);
        });
    }

    componentWillReceiveProps(nextProps: SelectPropsInterface) {
        if (this.state.value !== nextProps.value) {
            this.setState({
                value: nextProps.value
            });
        }
    }

    private validateForm(e: React.FormEvent<HTMLSelectElement>) {
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
        
        if (this.props.disabled) {
            return true;
        }

        let type = this.props.type;
        
        class ValidateObj {
            text: string;
        }
        
        switch (type) {
            case 'text':
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
        let valid = this.checkFormValid(this.props.required, this.state.value);
        
        this.setState({
            hasError: !valid
        });
        
        return valid;
    }
    
    private renderOptions(options: Array<SelectOptionInterface|string>) {

        return options.map((option, idx) => {
            if (typeof option === 'string') {
                return <option key={idx} value={option}>{option}</option>;
            }
            return <option key={idx} value={option.value}>{option.label}</option>;
        });
    }

    render() {
        const {
            name,
            label,
            disabled,
            options
        } = this.props;

        let labelComponent;

        if (!!label) {
            labelComponent = <label className="col-xs-3 form-control-static control-label">{label}</label>;
        }

        let wrapperClass = classNames({
            'form-group': true,
            'gaea-select': true,
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
                        <select
                            className="form-control"
                            name={name}
                            value={this.state.value}
                            onBlur={this.validateForm}
                            onChange={this.onChange}
                            disabled={disabled}
                        >
                        {this.renderOptions(options)}
                        </select>
                        {this.renderAddonText(this.props.afterAddon)}
                    </div>
                </div>
                {tipTextElement}
            </div>
        );
    }
}

export default Select;