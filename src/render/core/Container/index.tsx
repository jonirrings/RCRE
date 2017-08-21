import * as React from 'react';
import componentLoader from '../../util/componentLoader';
import createElement from '../../util/createElement';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface, ContainerProps} from './types';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {actionCreators, IAction, SET_DATA_PAYLOAD} from './action';
import {RootState} from '../../data/reducers';
// import {Map} from 'immutable';
import ParamsInjector from '../../util/injector';
import {each, isString} from 'lodash';
import {runInContext} from '../../util/vm';
import Col from '../Layout/Col/Col';

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
            this.props.initData({
                model: this.props.info.model,
                data: this.props.info.data
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
        console.log(key, value);
    }

    private compileValueExpress(props: BasicConfig, componentInterface: Object): BasicConfig {
        if (!this.props.$data) {
            return props;
        }
        
        each(props, (item, key) => {
            if (isString(item) && item.indexOf('$') >= 0) {
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
            return <div />;
        }

        let compiled = this.compileValueExpress(this.props.info, componentInfo.componentInterface);
        
        let {
            component,
            componentInterface
        } = componentInfo;

        let childProps = {
            info: compiled,
            $data: this.props.$data,
            onChange: this.handleChange
        };

        let retComponent = createElement<BasicContainerPropsInterface>(component, componentInterface, childProps);

        if (typeof this.props.info.colSpan !== 'undefined') {
            return React.createElement(Col, {
                info: this.props.info
            }, retComponent);
        }

        return retComponent;
    }
}

const mapStateToProps = (state: RootState, ownProps: any) => {
    return {
        $data: state.container.get(ownProps.info.model)
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => bindActionCreators({
    setData: actionCreators.setData,
    setDataList: actionCreators.setDataList,
    initData: actionCreators.initData
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Container);