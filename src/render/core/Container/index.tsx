import * as React from 'react';
import * as _ from 'lodash';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface, ContainerProps} from './types';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {actionCreators, IAction, SET_DATA_LIST_PAYLOAD, SET_DATA_PAYLOAD} from './action';
import {RootState} from '../../data/reducers';
import {Map} from 'immutable';
import ParamsInjector from '../../util/injector';
// // import {Spin} from 'antd';
import {compileValueExpress, filterExpressionData, isExpression} from '../../util/vm';
import {request} from '../../services/api';
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {compileTimeExpression} from '../../util/dateTime';
import {createChild} from '../../util/createChild';

class Container extends BasicContainer<ContainerProps, {}> {
    static WrappedComponent: string;
    static displayName: string;

    private parseProperty = {};
    private prevRequestData = {};

    constructor() {
        super();
        this.loadData = this.loadData.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        if (this.props.info.model && !this.props.info.data) {
            this.props.info.data = {};
        }
        
        if (this.props.info.data && this.props.info.model) {
            this.setDataIntoStore(this.props.info.model, this.props);
            setTimeout(() => {
                if (this.props.info.initialLoad && !this.props.info.hidden) {
                    this.mergeOriginData(this.props);
                }
            });
        }
    }

    componentWillUnmount() {
        if (this.props.info.model) {
            this.props.removeData({
                model: this.props.info.model
            });
        }
    }

    componentWillReceiveProps(nextProps: ContainerProps) {
        if (!!this.props.$parent && this.props.info.model && nextProps.$parent !== this.props.$parent) {
            this.setDataIntoStore(this.props.info.model, nextProps, true);
            setTimeout(() => {
                if (this.props.info.initialLoad && !this.props.info.hidden) {
                    this.mergeOriginData(this.props);
                }
            });
        }
    }

    shouldComponentUpdate(nextProps: ContainerProps) {
        return this.props.$data !== nextProps.$data;
    }

    componentDidUpdate() {
        if (this.props.info.initialLoad) {
            this.mergeOriginData(this.props);
        }
    }

    private setDataIntoStore(model: string, nextProps: ContainerProps, merge?: boolean) {
        let initData = {};

        let infoData = nextProps.info.data;
        if (nextProps.$parent) {
            infoData = compileValueExpress(infoData, {
                $parent: nextProps.$parent.toObject(),
                $global: this.context.$global
            });
        }

        infoData = compileTimeExpression(infoData, this.props.info.$nowFormat);

        _.each(infoData, (item, key) => {
            if (!isExpression(item)) {
                initData[key] = item;
            }
        });

        if (!merge) {
            this.props.initData({
                model: model,
                data: initData
            });
        } else {
            let payloads: SET_DATA_LIST_PAYLOAD = [];
            _.each(initData, (val, name) => {
                payloads.push({
                    type: name,
                    newValue: val
                });
            });
            this.props.setDataList(payloads, model);
        }

    }

    public mergeOriginData(props: ContainerProps) {
        let injector = new ParamsInjector(props, this.loadData);

        injector.finished((payloads: SET_DATA_PAYLOAD[]) => {
            this.props.setData({
                type: '$loading',
                newValue: false
            }, this.props.info.model!);

            if (payloads.length > 0) {
                this.props.setDataList(payloads, this.props.info.model!);
            }
        });
    }
    
    private loadData() {
        let initialLoad = this.props.info.initialLoad;
        let requestConfig: AxiosRequestConfig = {};

        if (typeof initialLoad === 'string') {
            requestConfig = {
                url: initialLoad
            };
        } else if (typeof initialLoad === 'object') {
            let data = initialLoad.data;

            _.each(data, (val, name) => {
                if (isExpression(val)) {
                    this.parseProperty[name] = val;
                }
            });

            if (data) {
                let property = _.cloneDeep(this.parseProperty);
                let compiledRet = compileValueExpress(property, {
                    $data: this.props.$data.toObject(),
                    $query: this.context.$query,
                    $global: this.context.$global
                });

                Object.assign(initialLoad.data, compiledRet);
            }

            filterExpressionData(initialLoad.data);

            requestConfig = initialLoad;
        }

        if (!requestConfig || _.isEqual(requestConfig, this.prevRequestData)) {
            return Promise.resolve({});
        }

        this.prevRequestData = _.cloneDeep(requestConfig);

        this.props.setData({
            type: '$loading',
            newValue: true
        }, this.props.info.model!);

        return request(requestConfig.url!, requestConfig, this.context.$global.proxyServer)
            .then((ret: AxiosResponse) => {
                return Promise.resolve(ret);
            });
    }

    render() {
        let info = _.cloneDeep(this.props.info);

        // if (this.props.$data) {
        //     info.data = this.props.$data.toObject();
        // }
        
        if (!info.children) {
            const errText = {
                type: 'text',
                text: 'children props must be specific in Container Component'
            };
            return createChild(errText, {
                $data: this.props.$data
            });
        }
        
        let childElements = info.children.map((child, index) => {
            let compiled = compileValueExpress<BasicConfig, Object>(child, {
                $data: this.props.$data.toObject(),
                $global: this.context.$global
            }, ['data', 'children']);
            
            return createChild<BasicContainerPropsInterface>(child, {
                key: `${child.type}_${index}`,
                info: compiled,
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
    initData: actionCreators.initData,
    removeData: actionCreators.removeData
}, dispatch);

const mergeProps = (stateProps: any, dispatchProps: any, ownProps: any): any => {
    let parentProps = ownProps.$data || Map({});
    
    return Object.assign({}, ownProps, stateProps, dispatchProps, {
        $parent: parentProps
    });
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Container);