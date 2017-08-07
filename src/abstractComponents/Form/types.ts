import { IsString, IsDefined } from 'class-validator';
import { BasicContainer, ContainerBasicPropsInterface} from '../../render/core/Container/types';

export class FormItemBasicPropsInterface extends ContainerBasicPropsInterface {
    @IsString()
    @IsDefined()
    name: string;
    
    @IsString()
    value: string;
}

export class FormItem<T extends FormItemBasicPropsInterface, P> extends BasicContainer<T, P> {
    constructor() {
        super();
    }
    
    public isValid() {
        console.error(`${this.props.name} isValid() 没有被实现`);
        return false;
    }
}