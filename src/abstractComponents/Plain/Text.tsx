import * as React from 'react';
import { IsString, IsDefined } from 'class-validator';

export class PlainPropsInterface {
    @IsString()
    @IsDefined()
    type: string;
    
    @IsString()
    @IsDefined()
    text: string;
}

class Plain extends React.Component<PlainPropsInterface, {}> {
    constructor() {
        super();
    }
    
    render() {
        return <span>{this.props.text}</span>;
    }
}

export default Plain;