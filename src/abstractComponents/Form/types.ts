import { IsString, IsDefined } from 'class-validator';
import { BasicControlPropsInterface, BasicControl } from '../../render/core/Control/types';

export class FormItemBasicPropsInterface extends BasicControlPropsInterface {
    @IsString()
    @IsDefined()
    name: string;
    
    @IsString()
    value?: string;

    @IsString()
    initValue?: string;
}

export class FormItem<T extends FormItemBasicPropsInterface, P> extends BasicControl<T, P> {
    constructor() {
        super();
    }
    
    public isValid() {
        console.error(`${this.props.name} isValid() 没有被实现`);
        return false;
    }
}