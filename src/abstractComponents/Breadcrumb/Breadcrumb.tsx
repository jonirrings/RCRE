import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {IsPageInfo} from '../../render/util/validators';
import {IsDefined, IsString, Validate} from 'class-validator';
import * as React from 'react';
import Trigger from '../../render/core/Trigger/Trigger';
import componentLoader from '../../render/util/componentLoader';

export class BreadcrumbItem {
    @IsString()
    @IsDefined()
    name: string;

    @IsString()
    @IsDefined()
    path: string;
}

export class BreadcrumbConfig extends BasicConfig {
    @IsDefined()
    items: BreadcrumbItem[]; 
}

export class BreadcrumbPropsInterface extends BasicContainerPropsInterface {
    @Validate(IsPageInfo, [BreadcrumbConfig])
    info: BreadcrumbConfig;
}

export default class AbstractBreadcrumb extends BasicContainer<BreadcrumbPropsInterface, {}> {
    constructor() {
        super();
    }
    
    render() {
        let children = React.createElement(Trigger, this.props);

        return this.renderChildren(children);
    }
}

componentLoader.addComponent('breadcrumb', AbstractBreadcrumb, BreadcrumbPropsInterface);