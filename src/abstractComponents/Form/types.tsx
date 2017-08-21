import {IsArray, IsDefined, IsString} from 'class-validator';
import {BasicConfig, BasicContainerPropsInterface} from '../../render/core/Container/types';

// import FormItem, {FormItemPropsInterface} from '../Form/FormItem';

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

export class BasicFormItemPropsInterface extends BasicContainerPropsInterface {
    info: BasicFormItemConfig;
    
    value: string;
}