import {Layout} from 'antd';
import {Validate} from 'class-validator';
import {IsPageInfo} from '../../../util/validators';
import {BasicAbstractLayout, BasicLayoutConfig, BasicLayoutPropsInterface} from './BasicLayout';
import {BasicProps} from 'antd/lib/layout/layout';

const Content = Layout.Content;

export class ContentConfig extends BasicLayoutConfig {
}

export class ContentPropsInterface extends BasicLayoutPropsInterface {
    @Validate(IsPageInfo, [ContentConfig])
    info: ContentConfig;
}

export default class AbstractLayout<T extends ContentPropsInterface> extends BasicAbstractLayout<T, {}> {
    constructor() {
        super();
    }

    public mapOptions(props: ContentConfig): BasicProps {
        return {
            style: {
                padding: 15
            }
        };
    }

    render() {
        return this.renderComponent(Content, ContentPropsInterface);
    }
}