import {Layout} from 'antd';
import {BasicAbstractLayout, BasicLayoutConfig, BasicLayoutPropsInterface} from './BasicLayout';

const Header = Layout.Header;

export class HeaderConfig extends BasicLayoutConfig {
}

export class HeaderPropsInterface extends BasicLayoutPropsInterface {
    info: HeaderConfig;
}

export default class AbstractHeader<T extends HeaderPropsInterface> extends BasicAbstractLayout<T, {}> {
    constructor() {
        super();
    }

    render() {
        return this.renderComponent(Header, HeaderPropsInterface);
    }
}