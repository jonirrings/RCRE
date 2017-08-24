import * as React from 'react';
import {DriverController} from '../../../drivers/index';
import * as _ from 'lodash';
import {BasicContainer, BasicContainerPropsInterface} from '../Container/types';
import createElement from '../../util/createElement';
import {TriggerConfig, TriggerItem, validEventTrigger} from './types';
import {SET_DATA_LIST_PAYLOAD} from '../Container/action';
import Col from '../Layout/Col/Col';
import {compileValueExpress} from '../../util/vm';
import {Map} from 'immutable';

export class TriggerPropsInterface extends BasicContainerPropsInterface {
    info: TriggerConfig;
}

export default class Trigger<T extends TriggerPropsInterface> extends BasicContainer<T, {}> {
    static defaultProps = {
        $data: Map({})
    };
    
    constructor() {
        super();

        this.handleTrigger = this.handleTrigger.bind(this);
    }

    handleTrigger(item: TriggerItem) {
        return (event: React.MouseEvent<HTMLInputElement>) => {
            let target = item.target;
            let $global = this.context.$global;

            if (!$global.has(target)) {
                console.error(`can not find target model of target: ${target}`);
                return;
            }

            let ship = item.ship;

            let compiled = compileValueExpress<Object, Object>(ship, this.props.$data.toObject(), '$data');
            let payload: SET_DATA_LIST_PAYLOAD = [];

            _.each(compiled, (val, name) => {
                payload.push({
                    type: name,
                    newValue: val
                });
            });

            this.context.$setDataList(payload, target);
        };
    }

    render() {
        let driver: DriverController = this.context.driver;
        let componentInfo = driver.getComponent(this.props.info.type);

        if (!componentInfo) {
            console.error(`can not find module ${this.props.info.type}`);
            return <div/>;
        }

        let Component = componentInfo.component;
        let componentInterface = componentInfo.componentInterface;

        let childProps = this.props;

        if (this.props.info.trigger) {
            let mergeProps = {};

            _.each(this.props.info.trigger, (item, index) => {
                let eventType = item.eventType;
                if (!validEventTrigger[eventType]) {
                    return;
                }

                let method = validEventTrigger[eventType];
                mergeProps[method] = this.handleTrigger(item);
            });

            childProps = Object.assign({}, childProps, mergeProps);
        }

        let children = createElement(Component, componentInterface, childProps, this.props.children);

        if (typeof childProps.info.colSpan !== 'undefined') {
            children = React.createElement(Col, {
                info: childProps.info
            }, children);
        }
        
        return children;
    }
}