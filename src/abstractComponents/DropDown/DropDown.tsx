import * as React from 'react';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import Trigger from '../../render/core/Trigger/Trigger';

export class DropDownConfig extends BasicConfig {
    /**
     * 触发的方式
     * @public
     */
    trigger: string[];
}

export class DropDownPropsInterface extends BasicContainerPropsInterface {
    info: DropDownConfig;
}

export default class AbstractDropDown extends BasicContainer<DropDownPropsInterface, {}> {
    constructor() {
        super();
    }
    
    render() {
        let children = React.createElement(Trigger, this.props);
        return this.renderChildren(this.props.info, children);
    }
}