import * as React from 'react';
import { IsString, IsDefined } from 'class-validator';

export class FormItemBasicPropsInterface {
    @IsString()
    @IsDefined()
    type: string;

    @IsString()
    @IsDefined()
    name: string;
    
    @IsString()
    value: string;
}

export class FormItem<T extends FormItemBasicPropsInterface, P> extends React.Component<T, P> {
    constructor() {
        super();
    }
    
    public isValid() {
        console.error(`${this.props.name} isValid() 没有被实现`);
        return false;
    }
}