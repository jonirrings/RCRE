import * as React from 'react';
import * as _ from 'lodash';
import {BasicContainer, BasicContainerPropsInterface, ContainerProps} from './types';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {actionCreators, IAction, SET_DATA_LIST_PAYLOAD} from './action';
import {RootState} from '../../data/reducers';
import {Map} from 'immutable';
import {compileValueExpress, keepExpressionData} from '../../util/vm';
import {createChild} from '../../util/createChild';
import {DataProvider} from '../DataProvider/Controller';

// First Init Life Circle:
// ComponentWillMount -> Render -> ComponentDidMount

// Component Update Life Circle: 
// componentWillReceiveProps -> shouldComponentUpdate -> ComponentWillUpdate -> Render -> ComponentDidMount
class Container extends BasicContainer<ContainerProps, {}> {
    static WrappedComponent: string;
    static displayName: string;

    dataProvider: DataProvider;

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.dataProvider = new DataProvider();
    }

    async componentWillMount() {
        if (this.props.info.model) {
            if (!this.props.info.data) {
                this.props.info.data = {
                    $loading: false
                };
            }

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
                config: this.props.info.data
            };

            await this.dataProvider.requestForData(initProvider, providerActions, this.props, this.context);
        } else {
            console.error('Container Component Should have model property');
        }
    }

    async componentWillReceiveProps(nextProps: ContainerProps) {
        if (this.props.$parent !== nextProps.$parent) {
            this.syncUpdateData(this.props.info.model!, nextProps);   
        }

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
                await this.dataProvider.requestForData(provider, providerActions, nextProps, this.context);
            }
        } else if (_.isPlainObject(this.props.info.dataProvider)) {
            let provider = this.props.info.dataProvider;
            await this.dataProvider.requestForData(provider!, providerActions, nextProps, this.context);
        }
    }

    componentWillUnmount() {
        if (this.props.info.model) {
            this.props.removeData({
                model: this.props.info.model
            });
        }
    }
    
    shouldComponentUpdate(nextProps: ContainerProps) {
        // 判断Container数据是否有更新.
        return this.props.$data !== nextProps.$data;
    }

    render() {
        let info = _.cloneDeep(this.props.info);

        if (!info.model) {
            return <div className="err-text">model should defined in container like components</div>;
        }

        if (!info.children) {
            return <div className="err-text">children props must be specific in Container Component</div>;
        }

        // Container Component no long compile expression string for child
        // instead, AbstractComponent should compile it by themSelf
        let childElements = info.children.map((child, index) => {
            return createChild<BasicContainerPropsInterface>(child, {
                key: `${child.type}_${index}`,
                info: child,
                $data: this.props.$data,
                onChange: this.handleChange
            });
        });

        return (
            <div className="rcre-container">
                {childElements}
            </div>
        );
    }

    /**
     * Update data When ComponentWillReceiveProps
     * This function will parse the expression string in data property from JSON
     * including $parent and $response
     * Then call this.props.setDataList to update data
     *
     * @param {string} model
     * @param {ContainerProps} props
     */
    private syncUpdateData(model: string, props: ContainerProps) {
        if (!props.info.data) {
            props.info.data = {};
        }

        let updateExpression = keepExpressionData(props.info.data);

        if (!_.isEmpty(updateExpression)) {
            let updateData = compileValueExpress(updateExpression, {
                $parent: props.$parent.toObject()
            });

            let payloads: SET_DATA_LIST_PAYLOAD = [];
            _.each(updateData, (val, name) => {
                payloads.push({
                    type: name,
                    newValue: val
                });
            });
            this.props.setDataList(payloads, model);
        }
    }
    
    private handleChange(key: string, value: any) {
        this.props.setData({
            type: key,
            newValue: value
        }, this.props.info.model!);
    }

}

const mapStateToProps = (state: RootState, ownProps: any) => {
    return {
        $data: state.container.get(ownProps.info.model) || Map({})
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => bindActionCreators({
    setData: actionCreators.setData,
    setDataList: actionCreators.setDataList,
    removeData: actionCreators.removeData,
    asyncLoadDataProgress: actionCreators.asyncLoadDataProgress,
    asyncLoadDataSuccess: actionCreators.asyncLoadDataSuccess,
    asyncLoadDataFail: actionCreators.asyncLoadDataFail,
    syncLoadDataSuccess: actionCreators.syncLoadDataSuccess,
    syncLoadDataFail: actionCreators.syncLoadDataFail
}, dispatch);

const mergeProps = (stateProps: any, dispatchProps: any, ownProps: any): any => {
    let parentProps = ownProps.$data || Map({});

    return Object.assign({}, ownProps, stateProps, dispatchProps, {
        $parent: parentProps
    });
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Container);