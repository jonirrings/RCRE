import * as React from 'react';
import * as _ from 'lodash';
import {BasicContainer, BasicContainerPropsInterface, ContainerProps} from './types';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {actionCreators, IAction} from './action';
import {RootState} from '../../data/reducers';
import {Map} from 'immutable';
// import {compileValueExpress, keepExpressionData} from '../../util/vm';
import {createChild} from '../../util/createChild';
import {DataProvider} from '../DataProvider/Controller';
import {ContainerPropsInterface} from '../../../abstractComponents/Container/Container';
import {compileValueExpress} from '../../util/vm';

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

const mergeProps = 
    (stateProps: {
        $data: Map<string, any>
    }, dispatchProps: ContainerProps, ownProps: ContainerPropsInterface): ContainerProps => {
    let parentProps = ownProps.$data || Map({});
    let stateData = stateProps.$data;
        
    if (_.isObject(ownProps.info.parentMapping)) {
        let parentMappingRet = compileValueExpress(ownProps.info.parentMapping, {
            $parent: parentProps.toObject()
        });
        
        if (parentMappingRet) {
            stateData = stateData.merge(Map(parentMappingRet));   
        }
    } else {
        stateData = stateData.merge(parentProps);   
    }
    
    return Object.assign({}, ownProps, stateProps, dispatchProps, {
        $data: stateData
    });
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Container);