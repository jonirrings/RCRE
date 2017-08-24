import {Layout} from 'antd';
import {Validate} from 'class-validator';
import {IsPageInfo} from '../../../util/validators';
import {BasicProps} from 'antd/lib/layout/layout';
import {BasicAbstractLayout, BasicLayoutConfig, BasicLayoutPropsInterface} from './BasicLayout';

export class LayoutConfig extends BasicLayoutConfig {
}

export class LayoutPropsInterface extends BasicLayoutPropsInterface {
    @Validate(IsPageInfo, [LayoutConfig])
    info: LayoutConfig;
}

class AbstractLayout<T extends LayoutPropsInterface> extends BasicAbstractLayout<T, {}> {
    static __ANT_LAYOUT_SIDER: boolean;
    
    constructor() {
        super();
    }

    public mapOptions(props: LayoutConfig): BasicProps {
        return {
            style: Object.assign({
                background: '#fff'
            }, props.style)
        };
    }

    render() {
        return this.renderComponent(Layout, LayoutPropsInterface);
    }
}

AbstractLayout.__ANT_LAYOUT_SIDER = true;

export default AbstractLayout;