import * as React from 'react';

interface TextFieldPropsInterface {
    className: string;
    defaultValue: string;
    disabled: boolean;
    value: string;
    onChange: (type: string, newValue: string) => void;
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
            value
        } = this.props;
        
        return (
            <input
                type={type}
                name={name}
                value={value}
                onChange={this.onChange}
            />
        );
    }
}

export default Text;