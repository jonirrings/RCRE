import * as React from 'react';
import {IsDefined, IsJSON, IsString} from 'class-validator';

export class TextConfig {
    @IsString()
    @IsDefined()
    type: string;
    
    @IsString()
    @IsDefined()
    text: string;

    @IsJSON()
    style?: React.CSSProperties;
}

export class TextPropsInterface {
    info: TextConfig;
}

class Text extends React.Component<TextPropsInterface, {}> {
    constructor() {
        super();
    }
    
    render() {
        return <span style={this.props.info.style}>{this.props.info.text}</span>;
    }
}

export default Text;