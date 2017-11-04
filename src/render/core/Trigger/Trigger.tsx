import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../Container/types';
import {createChild} from '../../util/createChild';
import {Map} from 'immutable';
import {CallbackController} from './CallbackController';

export class TriggerPropsInterface extends BasicContainerPropsInterface {
    info: BasicConfig;

    /**
     * 当前Container的数据模型对象
     */
    $data: Map<string, any>;

    /**
     * 通过表格组件, 渲染之后, 获取到的每一行的数据
     */
    $item?: Map<string, any>;

    /**
     * 通过表格组件, 渲染之后, 获取到的第几行
     */
    $index?: number;

    /**
     * React组件Key
     */
    key: string | number;

    /**
     * 底层组件设置数据模型值使用
     */
    $setData: (name: string, value: any) => void;
}

export class Trigger extends BasicContainer<TriggerPropsInterface, {}> {
    callbackController: CallbackController;
    
    constructor() {
        super();
        
        this.callbackController = new CallbackController();
    }

    render() {
        let info = this.props.info;

        return createChild<BasicContainerPropsInterface>(info, {
            info: info,
            $data: this.props.$data,
            $setData: this.props.$setData,
            callbackController: this.callbackController
        });
    }
}