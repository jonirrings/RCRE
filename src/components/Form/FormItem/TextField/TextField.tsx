import * as React from 'react';
import {IsBoolean, IsDefined, IsString, IsEmail, validateSync, MinLength} from 'class-validator';

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

        this.onChange = this.onChange.bind(this);
    }

    onChange(event: React.FormEvent<HTMLInputElement>) {
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

    isValid(): boolean {
        if (!this.props.required && this.state.value === '') {
            return true;
        }

        let type = this.props.type;
        let validateObj: {
            text: string;
        } = {
            text: ''
        };

        switch (type) {
            case 'email':
                IsEmail()(validateObj, 'text');
                break;
            case 'text':
                IsString()(validateObj, 'text');
                MinLength(1)(validateObj, 'text');
                break;
            default:
        }
        validateObj.text = this.state.value;
        
        return validateSync(validateObj).length === 0;
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
            labelComponent = <label className="col-md-3 form-control-static control-label">{label}</label>;
        }

        return (
            <div className="form-group gaea-text-field clearfix">
                {labelComponent}
                <div className="col-md-9">
                    <div className="input-group">
                        <input
                            className="form-control"
                            type={type}
                            name={name}
                            value={!!value ? value : this.state.value}
                            placeholder={placeholder}
                            onChange={this.onChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Text;