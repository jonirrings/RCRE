import * as React from 'react';
import componentLoader from '../../util/componentLoader';
import createElement from '../../util/createElement';
import {BasicContainer, ContainerProps} from './types';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {actionCreators, IAction, SET_DATA_PAYLOAD} from './action';
import {RootState} from '../../data/reducers';
// import { Map } from 'immutable';
import ParamsInjector from '../../util/injector';
// import { each, isString } from 'lodash';
// import {parseObjectPropertyExpress} from '../../util/vm';

class Container extends BasicContainer<ContainerProps, {}> {
    static WrappedComponent: string;
    static displayName: string;

    constructor() {
        super();

        this.emitChange = this.emitChange.bind(this);
        this.loadData = this.loadData.bind(this);
    }

    componentWillMount() {
        if (this.props!.info.data) {
            this.props.initData(this.props!.info.data);
            this.mergeOriginData(this.props);
        }
    }

    public emitChange(payload: SET_DATA_PAYLOAD) {
        this.props.setData(payload);
    }

    private emitAPIRequest() {
        if (!this.props.info.initialLoad) {
            console.error('You can not get data through api request if you did\' provide api address');
            return;
        }
    }

    // private compileValueExpress(props: ContainerProps, $data: Map<string, any>) {
    //     let retProps = {};
    //    
    //     each(props, (item, key) => {
    //         if (isString(item) && item.indexOf('$data') === 0) {
    //            
    //         }
    //        
    //         retProps[key] = item;
    //     });
    //    
    //     return retProps;
    // }

    loadData() {
        if (this.props.info.initialLoad) {
            return fetch(this.props.info.initialLoad).then(ret => ret.json());
        }

        return Promise.resolve({});
    }

    private mergeOriginData(props: ContainerProps) {
        let injector = new ParamsInjector(props, this.loadData);

        injector.finished((payloads: SET_DATA_PAYLOAD[]) => {
            payloads.forEach(this.props.setData);
        });
    }

    render() {
        let {
            type
        } = this.props.info;
        
        let componentInfo = componentLoader.getComponent(type);
        
        if (!componentInfo) {
            return <div />;
        }

        // let compiledProps = this.compileValueExpress(this.props, this.props.$data);
        
        let {
            component,
            componentInterface
        } = componentInfo;

        return createElement<ContainerProps>(component, componentInterface, {
            info: this.props.info,
            $data: this.props.$data,
            setData: this.emitChange,
            initData: this.props.initData,
            requestAPI: this.emitAPIRequest
        });
    }
}

const mapStateToProps = (state: RootState, ownProps: any) => {
    return {
        $data: state.container.get('data')
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => bindActionCreators({
    setData: actionCreators.setData,
    initData: actionCreators.initData
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Container);