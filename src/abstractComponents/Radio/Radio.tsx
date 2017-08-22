import {BasicFormItemConfig, BasicFormItemPropsInterface} from '../Form/types';
import {IsBoolean, IsString, Validate} from 'class-validator';
import {IsPageInfo} from '../../render/util/validators';
import {BasicFormItem} from '../Form/FormItem';

export class RadioConfig extends BasicFormItemConfig {
    /**
     * 初始是否选中
     * @public
     * @default false
     */
    @IsBoolean()
    defaultChecked?: boolean;
    
    /**
     * 是否禁用
     * @public
     * @default false
     */
    @IsBoolean()
    disabled: boolean;
    
    /**
     * 文字
     * @public
     * @default ''
     */
    @IsString()
    text?: string;
}

export class RadioPropsInterface extends BasicFormItemPropsInterface {
    @Validate(IsPageInfo, [RadioConfig])
    info: RadioConfig;
}

class AbstractRadio extends BasicFormItem<RadioPropsInterface, {}> {
    constructor() {
        super();
    }
    
    render() {
        return this.getComponentThroughDriver();
    }
}

export default AbstractRadio;