import * as React from 'react';
import * as PropTypes from 'prop-types';
import {DriverController} from '../../../../drivers/index';
import {IsNumber, Max, Min} from 'class-validator';
import createElement from '../../../util/createElement';

export class ColConfig {
    /**
     *
     */
    @IsNumber()
    @Min(0)
    @Max(24)
    colSpan?: number;

    @IsNumber()
    colOrder?: number;

    @IsNumber()
    colOffset?: number;

    @IsNumber()
    colPush?: number;

    @IsNumber()
    colPull?: number;
}

export class ColPropsInterface {
    info: ColConfig;
}

export default class AbstractCol<T extends ColPropsInterface, P> extends React.Component<T, P> {
    static contextTypes = {
        driver: PropTypes.object
    };

    constructor() {
        super();
    }

    render() {
        let driver: DriverController = this.context.driver;
        let componentInfo = driver.getComponent('col');

        if (!componentInfo) {
            console.error(`can not find component: col`);
            return <div/>;
        }

        let Component = componentInfo.component;
        let componentInterface = componentInfo.componentInterface;

        return createElement(Component, componentInterface, this.props, this.props.children);
    }
}