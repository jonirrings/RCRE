import * as React from 'react';
import {IsDefined, IsJSON, IsString, IsUrl, Validate} from 'class-validator';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {IsValidEnums} from '../../render/util/validators';
import {compileValueExpress} from '../../render/util/vm';
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
        let compiledInfo = compileValueExpress(this.props.info, {
            $data: this.props.$data.toObject()
        });

        let children = React.createElement(Trigger, Object.assign({}, this.props, {
            info: compiledInfo
        }));

        return this.renderChildren(children);
    }
}

componentLoader.addComponent('text', Text, TextPropsInterface);

export default Text;