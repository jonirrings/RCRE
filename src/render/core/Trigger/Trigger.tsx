import * as React from 'react';
import {DriverController} from '../../../drivers/index';
import * as _ from 'lodash';
import {BasicContainer, BasicContainerPropsInterface} from '../Container/types';
import createElement from '../../util/createElement';
import {TriggerConfig, TriggerItem, validEventTrigger} from './types';
// import {SET_DATA_LIST_PAYLOAD} from '../Container/action';
import {compileValueExpress, isExpression, runInContext} from '../../util/vm';
import {Map} from 'immutable';
import {SET_DATA_LIST_PAYLOAD} from '../Container/action';

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

    handleTrigger(item: TriggerItem, triggerType: 'data' | 'link' | undefined): (type: string, value: any) => void {
        return (type: string, value: any) => {
            let target = item.target;
            let $global = this.context.$global;

            switch (triggerType) {
                case 'link':
                    let href = item.href;

                    if (!href) {
                        console.error('your must provide href attribute to finish jumping...');
                        return;
                    }

                    const templateRegex = /{{([^}]+)}}/g;

                    href = href.replace(templateRegex, (str, expression) => {
                        if (!isExpression(expression)) {
                            return expression;
                        }

                        let ret = runInContext(expression, {
                            $resource: this.props.$data.toObject()
                        });

                        if (!ret) {
                            return expression;
                        }

                        return encodeURIComponent(ret);
                    });

                    location.href = href;
                    break;
                case 'data':
                default:
                    if (!$global.has(target)) {
                        console.error(`can not find target model of target: ${target} `);
                        return;
                    }

                    let ship = item.ship;

                    if (!_.isPlainObject(ship)) {
                        console.error('you must provide ship to finish event trigger');
                        return;
                    }

                    if (!this.props.$data) {
                        console.error('can not find exist data model for trigger component');
                        return;
                    }

                    let compiled = compileValueExpress<Object, Object>(ship!, {
                        $data: this.props.$data.toObject()
                    });
                    let payload: SET_DATA_LIST_PAYLOAD = [];

                    _.each(compiled, (val, name) => {
                        payload.push({
                            type: name,
                            newValue: val
                        });
                    });

                    this.context.$triggerListData(payload, target);
            }
        };
    }

    bindTrigger(item: TriggerItem, mergeProps: Object, childProps: Object) {
        let eventType = item.eventType;
        let triggerType = item.triggerType;
        if (!validEventTrigger[eventType]) {
            return;
        }

        let method = validEventTrigger[eventType];

        if (childProps[method]) {
            let oldFn = childProps[method];

            mergeProps[method] = (value: any) => {
                oldFn(value);
                setTimeout(() => {
                    this.handleTrigger(item, triggerType)(this.props.info.model!, value);
                });
            };
        } else {
            mergeProps[method] = (event: React.MouseEvent<HTMLInputElement>) => {
                let target = event.currentTarget;
                let value = target.value;

                this.handleTrigger(item, triggerType)(this.props.info.model!, value);
            };
        }
    }

    render() {
        let driver: DriverController = this.context.driver;
        let componentInfo = driver.getComponent(this.props.info.type);

        if (!componentInfo) {
            return <pre>{`can not find module ${this.props.info.type}`}</pre>;
        }

        let Component = componentInfo.component;
        let componentInterface = componentInfo.componentInterface;

        let childProps = this.props;

        if (this.props.info.trigger) {
            let mergeProps = {};

            _.each(this.props.info.trigger, (item, index) => {
                this.bindTrigger(item, mergeProps, childProps);
            }); 

            childProps = Object.assign({}, childProps, mergeProps);
        }

        return createElement(Component, componentInterface, childProps, this.props.children);
    }
}