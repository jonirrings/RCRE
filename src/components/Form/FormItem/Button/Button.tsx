import * as React from 'react';

interface ButtonPropsInterface {
    label: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

class Button extends React.Component<ButtonPropsInterface, {}> {
    constructor() {
        super();
    }

    render() {
        return (
            <button
                className="btn"
                onClick={this.props.onClick}
            >
                {this.props.label}
            </button>
        );
    }
}

export default Button;