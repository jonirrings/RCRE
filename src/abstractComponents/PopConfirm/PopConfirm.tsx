import * as React from 'react';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {IsDefined, IsString} from 'class-validator';
import Trigger from '../../render/core/Trigger/Trigger';
import componentLoader from '../../render/util/componentLoader';

export class PopConfirmConfig extends BasicConfig {
    /**
     * 确认框的描述
     *
     * @public
     *
     */
    @IsString()
    @IsDefined()
    title: string;

    /**
     * 确认按钮文字
     *
     * @public
     * @default '确定'
     */
    @IsString()
    okText: string;

    /**
     * 确认按钮类型
     *
     * @public
     * @default 'primary'
     */
    @IsString()
    okType: string;

    /**
     * 取消按钮文字
     *
     * @public
     * @default '取消'
     */
    @IsString()
    cancelText: string;
}

export class PopConfirmPropsInterface extends BasicContainerPropsInterface {
    info: PopConfirmConfig;
}

class AbstractPopConfirm extends BasicContainer<PopConfirmPropsInterface, {}> {
    constructor() {
        super();
    }

    render() {
        let props = this.props;

        return React.createElement(Trigger, props);
    }
}

componentLoader.addComponent('popConfirm', AbstractPopConfirm, PopConfirmPropsInterface);

export default AbstractPopConfirm;