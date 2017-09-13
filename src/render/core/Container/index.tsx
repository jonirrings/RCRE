import * as React from 'react';
import * as _ from 'lodash';
import componentLoader from '../../util/componentLoader';
import createElement from '../../util/createElement';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface, ContainerProps} from './types';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {actionCreators, IAction, SET_DATA_LIST_PAYLOAD, SET_DATA_PAYLOAD} from './action';
import {RootState} from '../../data/reducers';
import {Map} from 'immutable';
import ParamsInjector from '../../util/injector';
import Col, {hasColProps} from '../Layout/Col/Col';
import {Spin} from 'antd';
import {compileValueExpress, filterExpressionData, isExpression} from '../../util/vm';
import {request} from '../../services/api';
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {compileTimeExpression} from '../../util/dateTime';

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
        if ((this.props.info.data && !this.props.info.model) || (!this.props.info.data && this.props.info.model)) {
            console.error(`model and data need to be exist of type: ${this.props.info.type}`);
        }

        console.log('mount form');
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
        this.mergeOriginData(this.props);
    }

    render() {
        let {
            type
        } = this.props.info;

        let componentInfo = componentLoader.getAbstractComponent(type);

        if (!componentInfo) {
            return <pre>{`can not find component of type: ${type}`}</pre>;
        }

        let info = _.cloneDeep(this.props.info);

        if (this.props.$data) {
            info.data = this.props.$data.toObject();
        }

        let compiled = compileValueExpress<BasicConfig, Object>(info, {
            $data: this.props.$data.toObject(),
            $global: this.context.$global
        });

        let {
            component,
            componentInterface
        } = componentInfo;

        let childProps = {
            info: compiled,
            $data: this.props.$data,
            $setData: this.props.setData,
            $setDataList: this.props.setDataList,
            $removeData: this.props.removeData,
            onChange: this.handleChange
        };

        let retComponent = createElement<BasicContainerPropsInterface>(component, componentInterface, childProps);

        if (hasColProps(this.props.info)) {
            retComponent = React.createElement(Col, {
                info: this.props.info
            }, retComponent);
        }

        return (
            <Spin spinning={!!this.props.$data.get('$loading')}>
                {retComponent}
            </Spin>
        );
    }

    private handleChange(key: string, value: any) {
        this.props.setData({
            type: key,
            newValue: value
        }, this.props.info.model!);
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

export default connect(mapStateToProps, mapDispatchToProps)(Container);