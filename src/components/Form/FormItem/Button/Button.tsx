import * as React from 'react';
import { IsString, IsDefined } from 'class-validator';
import { FormItem, FormItemBasicPropsInterface } from '../../types';

export class ButtonPropsInterface extends FormItemBasicPropsInterface {
    @IsString()
    @IsDefined()
    label: string;
    
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

class Button extends FormItem<ButtonPropsInterface, {}> {
    static defaultProps = {
        onClick: () => {
            console.error('Button onClick 没有实现');
        },
        
        label: ''
    };
    
    constructor() {
        super();
        
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <button
                className="btn"
                onClick={this.handleClick}
            >
                {this.props.label}
            </button>
        );
    }

    private handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        this.props.onClick(e);
    }
}

export default Button;