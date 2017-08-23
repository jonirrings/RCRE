import * as React from 'react';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';

export class HtmlConfig extends BasicConfig {
    
}

export class HtmlPropsInterface extends BasicContainerPropsInterface {
    info: HtmlConfig;
}

export default class AbstractHTML extends BasicContainer<HtmlPropsInterface, {}> {
    constructor() {
        super();
    }
    
    render() {
        return (
            <code>
                {JSON.stringify(this.props.info.data)}
            </code>
        );
    }
}