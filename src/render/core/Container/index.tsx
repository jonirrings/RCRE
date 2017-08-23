import * as React from 'react';
import * as _ from 'lodash';
import componentLoader from '../../util/componentLoader';
import createElement from '../../util/createElement';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface, ContainerProps} from './types';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {actionCreators, IAction, SET_DATA_PAYLOAD} from './action';
import {RootState} from '../../data/reducers';
import ParamsInjector from '../../util/injector';
// import {runInContext} from '../../util/vm';
import Col from '../Layout/Col/Col';
import {isExpression, runInContext} from '../../util/vm';

class Container extends BasicContainer<ContainerProps, {}> {
    static WrappedComponent: string;
    static displayName: string;

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
            this.mergeOriginData(this.props);
        }
    }

    private loadData() {
        if (this.props.info.initialLoad) {
            return fetch(this.props.info.initialLoad).then(ret => ret.json());
        }

        return Promise.resolve({});
    }

    private handleChange(key: string, value: any) {
        this.props.setData({
            type: key,
            newValue: value
        }, this.props.info.model!);
    }

    private compileValueExpress(props: BasicConfig, componentInterface: Object): BasicConfig {
        if (!this.props.$data) {
            return props;
        }

        _.each(props, (item, key) => {
            if (_.isString(item) && item.indexOf('$') >= 0) {
                let parseRet = runInContext(item, {
                    $data: this.props.$data.toObject()
                });

                if (parseRet && parseRet[0] !== '$') {
                    props[key] = parseRet;
                } else {
                    // TODO use class-validator to reflect types and set default values
                }
            } else {
                props[key] = item;
            }
        });

        return props;
    }

    private mergeOriginData(props: ContainerProps) {
        let injector = new ParamsInjector(props, this.loadData);

        injector.finished((payloads: SET_DATA_PAYLOAD[]) => {
            this.props.setDataList(payloads, this.props.info.model!);
        });
    }

    render() {
        let {
            type
        } = this.props.info;

        let componentInfo = componentLoader.getAbstractComponent(type);

        if (!componentInfo) {
            console.error(`can not find component of type: ${type}`);
            return <div/>;
        }

        let compiled = this.compileValueExpress(this.props.info, componentInfo.componentInterface);

        let {
            component,
            componentInterface
        } = componentInfo;

        if (this.props.$data) {
            compiled.data = this.props.$data.toObject();
        }

        let childProps = {
            info: compiled,
            $data: this.props.$data,
            $global: this.props.$global,
            $setData: this.props.setData,
            $setDataList: this.props.setDataList,
            onChange: this.handleChange
        };

        let retComponent = createElement<BasicContainerPropsInterface>(component, componentInterface, childProps);

        if (typeof this.props.info.colSpan !== 'undefined') {
            retComponent = React.createElement(Col, {
                info: this.props.info
            }, retComponent);
        }

        return retComponent;
    }
}

const mapStateToProps = (state: RootState, ownProps: any) => {
    return {
        $data: state.container.get(ownProps.info.model),
        $global: state.container
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => bindActionCreators({
    setData: actionCreators.setData,
    setDataList: actionCreators.setDataList,
    initData: actionCreators.initData
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Container);