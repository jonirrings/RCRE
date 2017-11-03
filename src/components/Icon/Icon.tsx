import * as React from 'react';
import componentLoader from '../../render/util/componentLoader';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {IsString} from 'class-validator';
import {CSSProperties} from 'react';
import {Icon} from 'antd';

export class IconConfig extends BasicConfig {
    /**
     * 是否有旋转动画
     */
    spin?: boolean;

    /**
     * CSS class
     */
    @IsString()
    className?: string;

    /**
     * 内联CSS属性
     */
    style?: CSSProperties;

    /**
     * 图标类型
     */
    icon?: string;
}

export class IconPropsInterface extends BasicContainerPropsInterface {
    info: IconConfig;
}

export class AbstractIcon extends BasicContainer<IconPropsInterface, {}> {
    constructor() {
        super();
    }
    
    render() {
        let info = this.getPropsInfo(this.props.info);
        
        if (!info.icon) {
            return <div>icon property is required for Icon Component</div>;
        }
        
        return <Icon type={info.icon} style={info.style} className={info.className} spin={info.spin} />;
    }
}

componentLoader.addComponent('icon', AbstractIcon, IconPropsInterface);