import {IsArray, IsDefined, IsString} from 'class-validator';
import {BasicConfig, BasicContainerPropsInterface} from '../../render/core/Container/types';

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
    name?: string;

    /**
     * 字级FormItem
     * @public
     */
    @IsArray()
    controls?: BasicFormItemConfig[];

    /**
     * 字级模型, 用于脱离Form, 直接由Container控制的模型key
     * @public
     */
    @IsString()
    childModel?: string;
}

export class BasicFormItemPropsInterface extends BasicContainerPropsInterface {
    info: BasicFormItemConfig;
    value: string;

    injectChildElement: (fn: (value?: any) => boolean) => void;
}