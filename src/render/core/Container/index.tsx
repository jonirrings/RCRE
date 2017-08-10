import * as React from 'react';
import componentLoader from '../../util/componentLoader';
import createElement from '../../util/createElement';
import {BasicContainer, ContainerBasicPropsInterface, ContainerProps, defaultData} from './types';
import {connect} from 'react-redux';
import {Dispatch, bindActionCreators} from 'redux';
import {actionCreators, IAction, SET_DATA_PAYLOAD} from './action';
import {RootState} from '../../data/reducers';
import ParamsInjector from '../../util/injector';

export function CreateContainer(info: ContainerBasicPropsInterface) {
    let componentInfo = componentLoader.getComponent(info.type);

    if (!componentInfo) {
        console.error(`can not find component of type: ${info.type}`);
        return null;
    }

    let {
        component,
        componentInterface
    } = componentInfo;

    const wrappedComponentName = component.displayName || component.name || 'ContainerComponent';
    const displayName = `Container(${wrappedComponentName})`;

    class Container extends BasicContainer<ContainerProps, {}> {
        static WrappedComponent: string;
        static displayName: string;
        
        constructor() {
            super();
            
            this.emitChange = this.emitChange.bind(this);
            this.loadData = this.loadData.bind(this);
        }
        
        componentWillMount() {
            if (info.data) {
                this.props.initData(info.data);
                this.mergeOriginData(info.data);
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
            if (!component) {
                return null;
            }

            return createElement<ContainerProps>(component, componentInterface, Object.assign(info, {
                $data: this.props.$data,
                setData: this.emitChange,
                initData: this.props.initData,
                requestAPI: this.emitAPIRequest
            }));
        }
    }

    Container.WrappedComponent = wrappedComponentName;
    Container.displayName = displayName;

    const mapStateToProps = (state: RootState, ownProps: any) => {
        return {
            $data: state.form.get('data')
        };
    };

    const mapDispatchToProps = (dispatch: Dispatch<IAction>) => bindActionCreators({
        setData: actionCreators.setData,
        initData: actionCreators.initData
    }, dispatch);

    let wrappedComponent = connect(mapStateToProps, mapDispatchToProps)(Container);

    return React.createElement<ContainerBasicPropsInterface>(wrappedComponent, Object.assign(info, {
        key: displayName
    }));
}