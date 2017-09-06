import * as React from 'react';
import {DriverController} from '../../../drivers/index';
import * as _ from 'lodash';
import {BasicContainer, BasicContainerPropsInterface} from '../Container/types';
import createElement from '../../util/createElement';
import {TriggerConfig, TriggerItem, validEventTrigger} from './types';
import {compileStaticTemplate, compileValueExpress} from '../../util/vm';
import {Map} from 'immutable';
import {SET_DATA_LIST_PAYLOAD} from '../Container/action';
import AbstractFormItem, {FormItemPropsInterface} from '../../../abstractComponents/Form/FormItem';

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

    render() {
        let driver: DriverController = this.context.driver;
        let componentInfo = driver.getComponent(this.props.info.type);

        if (!componentInfo) {
            return React.createElement('pre', {}, 'can not find module ' + this.props.info.type);
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

        let children = createElement(Component, componentInterface, childProps, this.props.children);

        if (this.context.form && this.props.info.type !== 'form') {
            children = this.wrapWithFormItem(children);
        }

        return children;
    }

    private handleLinkTrigger(item: TriggerItem, model: string, value: any) {
        let href = item.href;
        let isRaw = item.isRaw;

        if (!href) {
            console.error('your must provide href attribute to finish jumping...');
            return;
        }

        let compiledHref = compileStaticTemplate(href, {
            $resource: this.props.$data.toObject(),
            $global: this.context.$global
        });

        location.href = isRaw ? compiledHref : encodeURIComponent(compiledHref);
    }

    private handleDataTrigger(item: TriggerItem, model: string, value: any) {
        let target = item.target;
        let $store = this.context.$store;

        if (!$store.has(target)) {
            console.error('can not find target model of target: ' + target);
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
            $data: this.props.$data.toObject(),
            $global: this.context.$global,
            $event: {
                model: model,
                value: value
            }
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

    private handleTrigger(item: TriggerItem,
                          triggerType: 'data' | 'link' | undefined): (type: string, value: any) => void {
        return (model: string, value: any) => {
            switch (triggerType) {
                case 'link':
                    this.handleLinkTrigger(item, model, value);
                    break;
                case 'data':
                default:
                    this.handleDataTrigger(item, model, value);
            }
        };
    }

    private bindTrigger(item: TriggerItem, mergeProps: Object, childProps: Object) {
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

    private wrapWithFormItem(children: React.ReactElement<T>) {
        return createElement(AbstractFormItem, FormItemPropsInterface, this.props, children);
    }
}