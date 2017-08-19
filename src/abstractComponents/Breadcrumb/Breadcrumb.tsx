import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {IsPageInfo} from '../../render/util/validators';
import {Validate} from 'class-validator';

export class BreadcrumbConfig extends BasicConfig {
}

export class BreadcrumbPropsInterface extends BasicContainerPropsInterface {
    @Validate(IsPageInfo)
    info: BreadcrumbConfig;
}

export class AbstractBreadcrumb extends BasicContainer<BreadcrumbPropsInterface, {}> {
    constructor() {
        super();
    }
    
    render() {
        return this.getComponentThroughDriver(); 
    }
}