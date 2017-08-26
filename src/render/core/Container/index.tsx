import * as React from 'react';
import * as _ from 'lodash';
import componentLoader from '../../util/componentLoader';
import createElement from '../../util/createElement';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface, ContainerProps} from './types';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {actionCreators, IAction, SET_DATA_PAYLOAD} from './action';
import {RootState} from '../../data/reducers';
import axios from 'axios';
import {Map} from 'immutable';
import ParamsInjector from '../../util/injector';
import Col, {hasColProps} from '../Layout/Col/Col';
import {compileValueExpress, filterExpressionData, isExpression} from '../../util/vm';

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

        if (this.props.info.data && this.props.info.model) {
            let initData = {};

            _.each(this.props.info.data, (item, key) => {
                if (!isExpression(item)) {
                    initData[key] = item;
                }
            });

            this.props.initData({
                model: this.props.info.model,
                data: initData
            });

            if (this.props.info.initialLoad) {
                this.mergeOriginData(this.props);
            }
        }
    }

    componentDidUpdate(nextProps: ContainerProps) {
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
            $data: this.props.$data.toObject()
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
            onChange: this.handleChange
        };

        let retComponent = createElement<BasicContainerPropsInterface>(component, componentInterface, childProps);

        if (hasColProps(this.props.info)) {
            retComponent = React.createElement(Col, {
                info: this.props.info
            }, retComponent);
        }

        return retComponent;
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
            if (payloads.length > 0) {
                this.props.setDataList(payloads, this.props.info.model!);
            }
        });
    }

    private loadData() {
        let initialLoad = this.props.info.initialLoad;
        let requestConfig = null;

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
                    $query: this.context.$query
                });

                Object.assign(initialLoad.data, compiledRet);
            }

            filterExpressionData(initialLoad.data);

            if (!initialLoad.method || /^get$/i.test(initialLoad.method)) {
                initialLoad.params = initialLoad.data;
            }

            requestConfig = initialLoad;
        }

        if (!requestConfig || _.isEqual(requestConfig, this.prevRequestData)) {
            return Promise.resolve({});
        }

        this.prevRequestData = _.cloneDeep(requestConfig);

        return axios(requestConfig.url!, requestConfig);
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
    initData: actionCreators.initData
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Container);