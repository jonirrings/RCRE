import * as React from 'react';
import {IsDefined, IsJSON, IsString, IsUrl, Validate} from 'class-validator';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {IsValidEnums} from '../../render/util/validators';
import componentLoader from '../../render/util/componentLoader';

export class TextConfig extends BasicConfig {
    @IsString()
    @IsDefined()
    text: string;

    /**
     * 文本类型
     */
    @Validate(IsValidEnums, ['text', 'link', 'strong'])
    textType?: 'text' | 'link' | 'strong';

    /**
     * 跳转链接
     */
    @IsUrl()
    href?: string;

    /**
     * 添加千分位符
     */
    thousands?: boolean;

    /**
     * 内联属性
     */
    @IsJSON()
    style?: React.CSSProperties;

    /**
     * CSS Class
     */
    className?: string;
}

export class TextPropsInterface extends BasicContainerPropsInterface {
    info: TextConfig;
}

export class Text extends BasicContainer<TextPropsInterface, {}> {
    constructor() {
        super();
    }

    render() {
        let info = this.getPropsInfo<TextConfig>(this.props.info);
        const defaultTextStyle = {
            padding: '0 10px'
        };

        let children;
        let text = info.text;
        
        if (typeof text === 'boolean') {
            text = String(text);
        }

        if (info.thousands && /^\d+$/.test(text)) {
            text = String(text);
            let group = text.split('').reverse();
            let ret = '';

            for (let i = 1; i <= group.length; i++) {
                if (i % 3 !== 0) {
                    ret = group[i - 1] + ret;
                } else {
                    ret = ',' + group[i - 1] + ret;
                }
            }

            if (ret[0] === ',') {
                ret = ret.substring(1);
            }

            text = ret;
        }
        
        switch (info.textType) {
            case 'link':
                children = (
                    <a
                        style={Object.assign(defaultTextStyle, info.style)}
                        href={info.href}
                        onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                            event.stopPropagation();
                            event.preventDefault();
                            if (info.href) {
                                window.location.href = info.href;    
                            }
                        }}
                    >
                        {text}
                    </a>
                );
                break;

            default:
                children = (
                    <span
                        style={Object.assign(defaultTextStyle, info.style)}
                        onClick={(event: React.MouseEvent<HTMLSpanElement>) => {
                            this.commonEventHandler('onClick', {
                                event: event
                            });
                        }}
                    >
                        {text}
                    </span>
                );
        }

        return this.renderChildren(info, children);
    }
}

componentLoader.addComponent('text', Text, TextPropsInterface);

export default Text;