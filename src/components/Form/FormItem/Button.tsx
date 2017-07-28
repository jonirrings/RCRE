import * as React from 'react';

interface ButtonPropsInterface {
    label: string;
}

class Button extends React.Component<ButtonPropsInterface, {}> {
    constructor() {
        super();
    }
    
    render() {
        return (
            <button>{this.props.label}</button>    
        );
    }
}

export default Button;