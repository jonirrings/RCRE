import {Layout} from 'antd';
import {Validate} from 'class-validator';
import {IsPageInfo} from '../../../util/validators';
import {BasicAbstractLayout, BasicLayoutConfig, BasicLayoutPropsInterface} from './BasicLayout';
import {SiderProps} from 'antd/lib/layout/Sider';

const Sider = Layout.Sider;

export class SiderConfig extends BasicLayoutConfig {
    /**
     * 是否可以收起
     * @public
     * @default false
     */
    collapsible?: boolean;

    /**
     * 是否默认收起
     * @public
     * @default false
     */
    defaultCollapsed?: boolean;

    /**
     * 翻转折叠提示箭头的方向，当 Sider 在右边时可以使用
     * @public
     * @default false
     */
    reverseArrow?: boolean;

    /**
     * 宽度
     * @public
     * @default 200
     */
    width?: number;

    /**
     * 容器 className
     * @public
     * @default ''
     */
    className?: string;
}

export class SidePropsInterface extends BasicLayoutPropsInterface {
    @Validate(IsPageInfo, [SiderConfig])
    info: SiderConfig;
}

interface SideStateInterface {
    collapsed: boolean;
}

export default class AbstractLayout<T extends SidePropsInterface> extends BasicAbstractLayout<T, SideStateInterface> {
    constructor() {
        super();

        this.state = {
            collapsed: false
        };

        this.handleCollapse = this.handleCollapse.bind(this);
    }

    handleCollapse() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    public mapOptions(props: SiderConfig): SiderProps {
        return {
            collapsible: props.collapsible || true,
            defaultCollapsed: props.defaultCollapsed,
            reverseArrow: props.reverseArrow,
            width: props.width,
            className: props.className,
            collapsed: this.state.collapsed,
            onCollapse: this.handleCollapse
        };
    }

    render() {
        return this.renderComponent(Sider, SidePropsInterface);
    }
}