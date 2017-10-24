import * as React from 'react';
import {IsDefined, IsJSON, IsString, IsUrl, Validate} from 'class-validator';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {IsValidEnums} from '../../render/util/validators';
import Trigger from '../../render/core/Trigger/Trigger';
import componentLoader from '../../render/util/componentLoader';

export class TextConfig extends BasicConfig {
    @IsString()
    @IsDefined()
    text: string;

    @Validate(IsValidEnums, ['text', 'link', 'strong'])
    textType: 'text' | 'link' | 'strong';

    @IsUrl()
    href?: string;

    @IsJSON()
    style?: React.CSSProperties;
}

export class TextPropsInterface extends BasicContainerPropsInterface {
    info: TextConfig;
}

class Text extends BasicContainer<TextPropsInterface, {}> {
    constructor() {
        super();
    }

    render() {
        let info = this.getPropsInfo<TextConfig>(this.props.info);
        
        let children = React.createElement(Trigger, Object.assign({}, this.props, {
            info: info
        }));

        return this.renderChildren(info, children);
    }
}

componentLoader.addComponent('text', Text, TextPropsInterface);

export default Text;