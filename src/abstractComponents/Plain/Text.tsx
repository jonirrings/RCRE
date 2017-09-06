import * as React from 'react';
import {IsDefined, IsJSON, IsString, IsUrl, Validate} from 'class-validator';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {compileStaticTemplate, isExpression} from '../../render/util/vm';
import Trigger from '../../render/core/Trigger/Trigger';
import {IsValidEnums} from '../../render/util/validators';

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
        if (isExpression(this.props.info.text)) {
            return <span/>;
        }

        if (this.props.info.textType === 'link' && this.props.info.href) {
            this.props.info.href = compileStaticTemplate(this.props.info.href, {
                $resource: this.props.$data.toObject(),
                $global: this.context.$global
            });
        }

        let children = React.createElement(Trigger, this.props);
        return this.renderChildren(children);
    }
}

export default Text;