import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../Container/types';
import {createChild} from '../../util/createChild';
import {Map} from 'immutable';
import {CallbackController} from './CallbackController';
import {compileValueExpress} from '../../util/vm';
import {connect} from 'react-redux';
import {RootState} from '../../data/reducers';
import {bindActionCreators, Dispatch} from 'redux';
import {actionCreators, ITriggerAction} from './actions';
import {DataCustomer} from '../DataCustomer/Controller';

export class TriggerEventItem {
    /**
     * 事件名称
     */
    event: string;

    /**
     * 指定的目标DataCustomer
     */
    targetCustomer: string;

    /**
     * 传递给目标的参数
     */
    params: (string | number | boolean)[];
}

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

    /**
     * 父级的Container组件的model值
     */
    model: string;
}

interface TriggerProps extends TriggerPropsInterface {
    /**
     * 当前trigger的数据模型
     */
    $trigger: Map<string, any>;

    /**
     * 设置触发器的store缓存
     */
    triggerSetData: typeof actionCreators.triggerSetData;
}

class Trigger extends BasicContainer<TriggerProps, {}> {
    callbackController: CallbackController;
    dataCustomer: DataCustomer;
    
    constructor() {
        super();
        
        this.callbackController = new CallbackController();
        this.dataCustomer = new DataCustomer();
        this.eventHandle = this.eventHandle.bind(this);
    }

    componentWillMount() {
        console.log(this.props);
        let trigger = this.props.info.trigger;

        if (trigger instanceof Array) {
            trigger.forEach(tr => {
                let event = tr.event;
                let targetCustomer = tr.targetCustomer;
                let params = tr.params;
                this.callbackController.registerCallback(event, targetCustomer, params);
            });
        }
    }

    render() {
        let info = this.props.info;

        return createChild<BasicContainerPropsInterface>(info, {
            info: info,
            $data: this.props.$data,
            $setData: this.props.$setData,
            callbackController: this.callbackController,
            eventHandle: this.eventHandle
        });
    }

    private eventHandle(eventName: string, args: any[]) {
        let isExist = this.callbackController.hasCallback(eventName);

        if (!isExist) {
            return;
        }

        let callbackInfo = this.callbackController.getCallbackInfo(eventName);

        if (!(callbackInfo instanceof Array)) {
            let params = callbackInfo.params;

            let runTime = this.getRuntimeContext(this.props, this.context);
            let output = compileValueExpress(params, {
                args: args,
                ...runTime
            });

            this.props.triggerSetData(this.props.model, {
                key: 'test',
                value: output
            });

            this.dataCustomer.execCustomer(callbackInfo.targetCustomer);
        }
    }
}

const mapStateToProps = (state: RootState, ownProps: TriggerPropsInterface) => {
    return {
        $trigger: state.trigger.get(ownProps.model) || Map({})
    };
};

const mapDispatchToProps = (dispatch: Dispatch<ITriggerAction>) => bindActionCreators({
    triggerSetData: actionCreators.triggerSetData
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Trigger);