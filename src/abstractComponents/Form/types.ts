import {IsArray, IsDefined, IsString} from 'class-validator';
import {BasicConfig} from '../../render/core/Container/types';
import * as React from 'react';

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
    constructor() {
        super();
    }
    
    public isValid() {
        console.error('isValid is not implemented');
    }
}