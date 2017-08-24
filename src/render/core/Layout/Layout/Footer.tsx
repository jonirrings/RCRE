import {Layout} from 'antd';
import {Validate} from 'class-validator';
import {IsPageInfo} from '../../../util/validators';
import {BasicAbstractLayout, BasicLayoutConfig, BasicLayoutPropsInterface} from './BasicLayout';

const Footer = Layout.Footer;

export class FooterConfig extends BasicLayoutConfig {
}

export class FooterPropsInterface extends BasicLayoutPropsInterface {
    @Validate(IsPageInfo, [FooterConfig])
    info: FooterConfig;
}

export default class AbstractLayout<T extends FooterPropsInterface> extends BasicAbstractLayout<T, {}> {
    constructor() {
        super();
    }

    render() {
        return this.renderComponent(Footer, FooterPropsInterface);
    }
}