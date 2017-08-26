import {BasicConfig} from '../Container/types';

export const validEventTrigger = {
    'click': 'onClick',
    'change': 'onChange'
};

export class TriggerItem {
    /**
     * 触发事件类型
     */
    eventType: string;

    /**
     * 目标数据模型
     */
    target?: string;

    /**
     * 触发类型
     * data --> 数据传递 @default
     * link --> 跳转
     */
    triggerType?: 'data' | 'link';

    /**
     * 跳转的地址
     */
    href?: string;
    
    /**
     * 传递的数据
     */
    ship?: Object;
}

export class TriggerConfig extends BasicConfig {
    trigger?: TriggerItem[];
}
