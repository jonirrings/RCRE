import {BasicConfig} from '../Container/types';

export const validEventTrigger = {
    'click': 'onClick'
};

export class TriggerItem {
    /**
     * 触发事件类型
     */
    eventType: string;

    /**
     * 目标数据模型
     */
    target: string;

    /**
     * 传递的数据
     */
    ship: Object;
}

export class TriggerConfig extends BasicConfig {
    trigger?: TriggerItem[];
}
