import * as React from 'react';
import {BasicConfig, BasicContainer, ContainerBasicPropsInterface} from '../../render/core/Container/types';
import * as PropTypes from 'prop-types';
import {DriverController} from '../../drivers/index';
import {Validate} from 'class-validator';
import {IsValidEnums} from '../../render/util/validators';
import Container from '../../render/core/Container/index';

export class RowConfig extends BasicConfig {
    /**
     * flex 布局下的垂直对齐方式：top middle bottom
     * @public
     * @default top
     */
    @Validate(IsValidEnums, ['top', 'middle', 'bottom'])
    align?: 'top' | 'middle' | 'bottom';

    /**
     * flex 布局下的水平排列方式：start end center space-around space-between
     * @public
     * @default start
     */
    @Validate(IsValidEnums, ['start', 'end', 'center', 'space-around', 'space-between'])
    justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';

    /**
     * 字级container组件
     */
    children: BasicConfig[];
}

export class RowPropsInterface extends ContainerBasicPropsInterface {
    info: RowConfig;
}

export default class AbstractRow extends BasicContainer<RowPropsInterface, {}> {
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

        let Component = componentInfo.component;

        let children = this.props.info.children.map((item, index) => {
            return React.createElement(Container, {
                info: item,
                key: index,
                $depth: this.props.$depth + 1,
                $uuid: `0_${this.props.$depth + 1}`
            });
        });
        return React.createElement(Component, this.props, children);
    }
}