import * as React from 'react';
import { IsString, IsDefined } from 'class-validator';

export class ButtonPropsInterface {
    @IsString()
    @IsDefined()
    label: string;
    
    _onClick: React.MouseEventHandler<HTMLButtonElement>;
}

class Button extends React.Component<ButtonPropsInterface, {}> {
    constructor() {
        super();
    }

    render() {
        return (
            <button
                className="btn"
                onClick={this.props._onClick}
            >
                {this.props.label}
            </button>
        );
    }
}

export default Button;