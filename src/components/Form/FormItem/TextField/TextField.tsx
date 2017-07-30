import * as React from 'react';
import { IsBoolean, IsDefined, IsString } from 'class-validator';

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
    
    _value: string;
    _onChange: (type: string, newValue: string) => void;
}

class Text extends React.Component<TextFieldPropsInterface, {}> {
    constructor() {
        super();

        this.onChange = this.onChange.bind(this);
    }

    onChange(event: React.FormEvent<HTMLInputElement>) {
        // 如果强制设置value, 则说明是写死的值, 不需要触发onChange
        if (this.props.value) {
            return;
        }
        
        this.props._onChange(this.props.name, event.currentTarget.value);
    }

    render() {
        const {
            type,
            name,
            _value,
            value,
            label,
            placeholder,
            required
        } = this.props;

        let labelComponent;

        if (!!label) {
            labelComponent = <label className="col-md-3 form-control-static">{label}</label>;
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
                            value={!!value ? value : _value}
                            placeholder={placeholder}
                            onChange={this.onChange}
                            required={required}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Text;