import * as React from 'react';
import {IsArray, IsDefined, IsString, Validate} from 'class-validator';
import {IsPageInfo} from '../../render/util/validators';

export class FormItemBasicConfig {
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
    controls?: FormItemBasicConfig[];
}

export class FormItemBasicPropsInterface {
    @Validate(IsPageInfo)
    info: FormItemBasicConfig;
}

export class FormItem<T extends FormItemBasicPropsInterface, P> extends React.Component<T, P> {
    constructor() {
        super();
    }
    
    public isValid() {
        console.error(`${this.props.info.name} isValid() 没有被实现`);
        return false;
    }
}