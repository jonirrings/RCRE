import * as React from 'react';
import * as PropTypes from 'prop-types';
import {BasicConfig, BasicContainer, ContainerBasicPropsInterface} from '../../render/core/Container/types';
import {DriverController} from '../../drivers/index';
import createElement from '../../render/util/createElement';

export class LineChartConfig extends BasicConfig {
    width: string;
    height: string;
    tooltip: boolean;
}

export class LineChartPropsInterface extends ContainerBasicPropsInterface {
    info: LineChartConfig;
}

export default class AbstractLineChart extends BasicContainer<LineChartPropsInterface, {}> {
    static contextTypes = {
        driver: PropTypes.object
    };

    constructor() {
        super();
    }

    render() {
        let driver: DriverController = this.context.driver;
        let componentInfo = driver.getComponent(this.props.info.type);

        if (!componentInfo) {
            console.error(`can not find component: ${this.props.info.type}`);
            return <div/>;
        }

        return createElement(componentInfo.component, componentInfo.componentInterface, this.props);
    }
}