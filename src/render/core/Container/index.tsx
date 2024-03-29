/**
 * @file Container组件
 * @author dongtiancheng
 */
import * as React from 'react';
import * as _ from 'lodash';
import {BasicContainer, ContainerProps, getRuntimeContext} from './types';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {actionCreators, IContainerAction} from './action';
import {RootState} from '../../data/reducers';
import {fromJS, Map} from 'immutable';
import {DataProvider} from '../DataProvider/Controller';
import {ContainerPropsInterface} from '../../../components/Container/Container';
import {compileValueExpress} from '../../util/vm';
import {DataCustomer} from '../DataCustomer/Controller';
import {createChild} from '../../util/createChild';

// First Init Life Circle:
// ComponentWillMount -> Render -> ComponentDidMount

// Component Update Life Circle: 
// componentWillReceiveProps -> shouldComponentUpdate -> ComponentWillUpdate -> Render -> ComponentDidMount
export class Container extends BasicContainer<ContainerProps, {}> {
    static WrappedComponent: string;
    static displayName: string;

    private dataProvider: DataProvider;
    private dataCustomer: DataCustomer;

    constructor() {
        super();
        this.dataProvider = new DataProvider();
        this.dataCustomer = new DataCustomer();
    }

    async componentWillMount() {
        let info = this.getPropsInfo(this.props.info, this.props, ['children', 'data', 'dataCustomer', 'dataProvider']);
        if (info.model) {
            if (_.isEmpty(info.data)) {
                info.data = {
                    $loading: false
                };
            }

            const defaultCustomer = {
                mode: 'pass',
                name: '$SELF_PASS_CUSTOMER',
                config: {
                    model: this.props.info.model,
                    assign: {}
                }
            };
            
            if (info.dataCustomer) {
                info.dataCustomer.customers.unshift(defaultCustomer);
            } else {
                info.dataCustomer = {
                    customers: [defaultCustomer],
                    groups: []
                };
            }
            this.dataCustomer.initCustomerConfig(info.dataCustomer);

            // to keep it safe, this.props.info should be readonly
            Object.freeze(this.props.info);

            const providerActions = {
                setDataList: this.props.setDataList,
                asyncLoadDataProgress: this.props.asyncLoadDataProgress,
                asyncLoadDataSuccess: this.props.asyncLoadDataSuccess,
                asyncLoadDataFail: this.props.asyncLoadDataFail,
                syncLoadDataSuccess: this.props.syncLoadDataSuccess,
                syncLoadDataFail: this.props.syncLoadDataFail
            };

            // 用于初始化的内置Provider
            const initProvider = {
                mode: 'init',
                config: info.data,
                __previousConfig: null
            };

            await this.dataProvider.requestForData(initProvider, providerActions, info, this.props, this.context);
        } else {
            console.error('Container Component Should have model property');
        }
    }

    async componentWillReceiveProps(nextProps: ContainerProps) {
        let info = this.getPropsInfo(this.props.info, this.props, ['children', 'data', 'dataCustomer', 'dataProvider']);
        const providerActions = {
            setDataList: this.props.setDataList,
            asyncLoadDataProgress: this.props.asyncLoadDataProgress,
            asyncLoadDataSuccess: this.props.asyncLoadDataSuccess,
            asyncLoadDataFail: this.props.asyncLoadDataFail,
            syncLoadDataSuccess: this.props.syncLoadDataSuccess,
            syncLoadDataFail: this.props.syncLoadDataFail
        };

        if (Array.isArray(this.props.info.dataProvider)) {
            for (let provider of this.props.info.dataProvider) {
                this.dataProvider.requestForData(provider, providerActions, info, nextProps, this.context);
            }
        } else if (_.isPlainObject(this.props.info.dataProvider)) {
            let provider = this.props.info.dataProvider;
            await this.dataProvider.requestForData(provider!, providerActions, info, nextProps, this.context);
        }
    }

    componentWillUnmount() {
        let info = this.getPropsInfo(this.props.info, this.props, ['children', 'data', 'dataCustomer', 'dataProvider']);
        if (info.model) {
            this.props.removeData({
                model: info.model
            });
        }
    }

    shouldComponentUpdate(nextProps: ContainerProps) {
        // 判断Container数据是否有更新.
        return this.props.$data !== nextProps.$data;
    }

    render() {
        let info = this.getPropsInfo(this.props.info, this.props, ['children', 'data', 'dataCustomer', 'dataProvider']);

        if (!info.model) {
            return <div className="err-text">model should defined in container like components</div>;
        }

        if (!info.children) {
            return <div className="err-text">children props must be specific in Container Component</div>;
        }

        // Container Component no long compile expression string for child
        // instead, AbstractComponent should compile it by themSelf
        let childElements = info.children.map((child, index) => {
            const setData = (name: string, value: any) => {
                this.props.setData({
                    type: name,
                    newValue: value
                }, info.model);
            };

            return createChild(child, {
                info: child,
                model: info.model,
                $data: this.props.$data,
                dataCustomer: this.dataCustomer,
                $index: this.props.$index,
                $item: this.props.$item,
                $setData: setData,
                key: `${child.type}_${index}`
            });
        });

        const containerStyle = {};

        return (
            <div className="rcre-container" style={containerStyle}>
                {childElements}
            </div>
        );
    }
}

const mapStateToProps = (state: RootState, ownProps: ContainerPropsInterface) => {
    let runTime = getRuntimeContext(ownProps, {});
    // direct compile
    let info = compileValueExpress(ownProps.info, runTime, ['children', 'data', 'dataCustomer', 'dataProvider'], false);

    return {
        $data: state.container.get(info.model) || Map({})
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IContainerAction>) => bindActionCreators({
    setData: actionCreators.setData,
    setDataList: actionCreators.setDataList,
    removeData: actionCreators.removeData,
    asyncLoadDataProgress: actionCreators.asyncLoadDataProgress,
    asyncLoadDataSuccess: actionCreators.asyncLoadDataSuccess,
    asyncLoadDataFail: actionCreators.asyncLoadDataFail,
    syncLoadDataSuccess: actionCreators.syncLoadDataSuccess,
    syncLoadDataFail: actionCreators.syncLoadDataFail
}, dispatch);

export const mergeProps =
    (stateProps: {
        $data: Map<string, any>
    }, dispatchProps: ContainerProps, ownProps: ContainerPropsInterface): ContainerProps => {
        let parentProps = ownProps.$data || Map({});
        let stateData = stateProps.$data;

        if (_.isObject(ownProps.info.parentMapping)) {
            let parentMappingRet = compileValueExpress(ownProps.info.parentMapping, {
                $parent: parentProps.toObject(),
                $data: stateProps.$data.toObject()
            });

            if (parentMappingRet) {
                let originalData = stateProps.$data.toObject();
                stateData = stateData.merge(fromJS(originalData));
            }
        } else {
            // 屏蔽$loading属性
            parentProps = parentProps.remove('$loading');
            
            stateData = stateData.merge(parentProps);
        }

        return Object.assign({}, ownProps, stateProps, dispatchProps, {
            $data: stateData
        });
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Container);