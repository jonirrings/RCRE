import * as React from 'react';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {Affix} from 'antd';

export class AffixConfig extends BasicConfig {
    /**
     * 距离窗口底部达到指定偏移量后触发
     */
    offsetBottom?: number;

    /**
     * 距离窗口顶部达到指定偏移量后触发
     */
    offsetTop?: number;
}

export class AffixPropsInterface extends BasicContainerPropsInterface {
    info: AffixConfig;
}

export class AbstractAffix extends BasicContainer<AffixPropsInterface, {}> {
    constructor() {
        super();
    }
    
    render() {
        let info = this.getPropsInfo(this.props.info);
        
        return <Affix offsetTop={info.offsetTop} offsetBottom={info.offsetBottom} />;
    }
}