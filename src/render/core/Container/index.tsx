import * as React from 'react';
import componentLoader from '../../util/componentLoader';
import createElement from '../../util/createElement';
import {BasicContainer, ContainerProps, defaultData} from './types';
import {connect} from 'react-redux';
import {Dispatch, bindActionCreators} from 'redux';
import {actionCreators, IAction, SET_DATA_PAYLOAD} from './action';
import {RootState} from '../../data/reducers';
import ParamsInjector from '../../util/injector';

class Container extends BasicContainer<ContainerProps, {}> {
    static WrappedComponent: string;
    static displayName: string;

    constructor() {
        super();

        this.emitChange = this.emitChange.bind(this);
        this.loadData = this.loadData.bind(this);
    }

    componentWillMount() {
        if (this.props!.data) {
            this.props.initData(this.props!.data);
            let infoData = this.props!.data;
            if (infoData) {
                this.mergeOriginData(infoData);
            }
        }
    }

    public emitChange(payload: SET_DATA_PAYLOAD) {
        this.props.setData(payload);
    }

    private emitAPIRequest() {
        if (!this.props.initialLoad) {
            console.error('You can not get data through api request if you did\' provide api address');
            return;
        }
    }

    loadData() {
        if (this.props.initialLoad) {
            return fetch(this.props.initialLoad).then(ret => ret.json());
        }

        return Promise.resolve({});
    }

    private mergeOriginData(data: defaultData) {
        let injector = new ParamsInjector(data, this.loadData);

        injector.finished((payloads: SET_DATA_PAYLOAD[]) => {
            payloads.forEach(this.props.setData);
        });
    }

    render() {
        let {
            type
        } = this.props;
        
        let componentInfo = componentLoader.getComponent(type);
        
        if (!componentInfo) {
            return <div />;
        }
        
        let {
            component,
            componentInterface
        } = componentInfo;
        
        return createElement<{}>(component, componentInterface!, Object.assign({}, this.props, {
            $data: this.props.$data,
            setData: this.emitChange,
            initData: this.props.initData,
            requestAPI: this.emitAPIRequest
        }));
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