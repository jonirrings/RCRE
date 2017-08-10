import * as React from 'react';
import {IsDefined, IsString} from 'class-validator';

export class BasicControlPropsInterface {
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
}

export class BasicControl <T extends BasicControlPropsInterface, P> extends React.Component<T, P> {
    constructor() {
        super();
    }

    public isValid() {
        console.error(`${this.props.name} isValid() 没有被实现`);
        return false;
    }
}