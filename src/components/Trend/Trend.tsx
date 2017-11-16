import * as React from 'react';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import componentLoader from '../../render/util/componentLoader';
import {Text} from '../Text/Text';
import {Icon} from 'antd';

export class TrendConfig extends BasicConfig {
    /**
     * up: 红色
     * down: 绿色
     */
    flag: 'up' | 'down';

    /**
     * 显示的值
     */
    text: string;
}

export class TrendPropsInterface extends BasicContainerPropsInterface {
    info: TrendConfig;
}

export class AbstractTrend extends BasicContainer<TrendPropsInterface, {}> {
    constructor() {
        super();
    }
    
    render() {
        let info = this.getPropsInfo(this.props.info);
        
        let icon;
        
        if (info.flag === 'up') {
            icon = <Icon type="caret-up" style={{color: '#f5222d'}} />;
        } else {
            icon = <Icon type="caret-down" style={{color: '#52c41a'}} />;
        }
        
        const trendStyle = {
            height: '25px',
            lineHeight: '25px'
        };
        return (
            <div className="rcre-trend" style={trendStyle}>
                <Text info={info} />
                {icon}
            </div>
        );
    }
}

componentLoader.addComponent('trend', AbstractTrend, TrendPropsInterface);