import {IsArray, IsDefined, IsString} from 'class-validator';
import {BasicConfig} from '../../render/core/Container/types';
import * as React from 'react';
import {DriverController} from '../../drivers/index';
import createElement from '../../render/util/createElement';
import * as PropTypes from 'prop-types';

export class BasicFormItemConfig extends BasicConfig {
    /**
     * control 类型
     * @public
     */
    @IsString()
    @IsDefined()
    type: string;

    /**
     * 初始化数据
     * @public
     */
    @IsString()
    initValue?: string;

    /**
     * control提交的key值
     * @public
     */
    @IsString()
    @IsDefined()
    name: string;

    /**
     * 字级FormItem
     * @public
     */
    @IsArray()
    controls?: BasicFormItemConfig[];
}

export class BasicFormItemPropsInterface {
    info: BasicFormItemConfig;
}

export class BasicFormItem<T extends BasicFormItemPropsInterface, P> extends React.Component<T, P> {
    static contextTypes = {
        driver: PropTypes.object,
        form: PropTypes.bool
    };
    
    constructor() {
        super();
    }

    public getComponentThroughDriver() {
        let driver: DriverController = this.context.driver;
        let componentInfo = driver.getComponent(this.props.info.type);

        if (!componentInfo) {
            console.error(`can not find module ${this.props.info.type}`);
            return <div/>;
        }

        let Component = componentInfo.component;
        let componentInterface = componentInfo.componentInterface;

        return createElement(Component, componentInterface, this.props);
    }
    
    public isValid() {
        console.error('isValid is not implemented');
    }
}