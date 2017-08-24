import * as React from 'react';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from "../../render/core/Container/types";

export class ContainerConfig extends BasicConfig {

}

export class ContainerPropsInterface extends BasicContainerPropsInterface {

}

export default class AbstractContainer extends BasicContainer<ContainerPropsInterface, {}> {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}