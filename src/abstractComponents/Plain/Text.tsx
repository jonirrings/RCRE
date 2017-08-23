import * as React from 'react';
import {IsDefined, IsString} from 'class-validator';

export class TextConfig {
    @IsString()
    @IsDefined()
    type: string;
    
    @IsString()
    @IsDefined()
    text: string;
}

export class TextPropsInterface {
    info: TextConfig;
}

class Text extends React.Component<TextPropsInterface, {}> {
    constructor() {
        super();
    }
    
    render() {
        return <span>{JSON.stringify(this.props.info)}</span>;
    }
}

export default Text;