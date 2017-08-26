import * as React from 'react';
import {IsDefined, IsJSON, IsString} from 'class-validator';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {isExpression} from '../../render/util/vm';

export class TextConfig extends BasicConfig {
    @IsString()
    @IsDefined()
    type: string;
    
    @IsString()
    @IsDefined()
    text: string;

    @IsJSON()
    style?: React.CSSProperties;
}

export class TextPropsInterface extends BasicContainerPropsInterface {
    info: TextConfig;
}

const defaultTextStyle = {
    padding: '0 10px',
    minWidth: 80,
    textAlign: 'center',
    lineHeight: '25px'
};

class Text extends BasicContainer<TextPropsInterface, {}> {
    constructor() {
        super();
    }
    
    render() {
        if (isExpression(this.props.info.text)) {
            return <span/>;
        }
        
        return <span style={Object.assign(defaultTextStyle, this.props.info.style)}>{this.props.info.text}</span>;
    }
}

export default Text;