import * as React from 'react';
import { Button } from 'antd';
import { IsString, IsDefined } from 'class-validator';
import {ButtonType} from 'antd/lib/button/button';

export class AntButtonProps {
    @IsString()
    @IsDefined()
    type: ButtonType;

    @IsString()
    @IsDefined()
    label: string;
}

export default class AntButton extends React.Component<AntButtonProps, {}> {
    constructor() {
        super();
    }

    render() {
        return (
            <Button type={this.props.type}>
                {this.props.label}
            </Button>
        );
    }
}