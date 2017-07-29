import * as React from 'react';

import './style.css';

interface TextFieldPropsInterface {
    className: string;
    defaultValue: string;
    disabled: boolean;
    value: string;
    onChange: (type: string, newValue: string) => void;
    placeholder: string;
    type: string;
    name: string;
    label: string;
}

class Text extends React.Component<TextFieldPropsInterface, {}> {
    constructor() {
        super();
        
        this.onChange = this.onChange.bind(this);
    }
    
    onChange(event: React.FormEvent<HTMLInputElement>) {
        this.props.onChange(this.props.name, event.currentTarget.value);
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
                            value={value}
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