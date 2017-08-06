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
        }
        
        componentWillMount() {
            if (info.data) {
                this.mergeOriginData(info.data);
            }
        }

        public emitChange(payload: SET_DATA_PAYLOAD) {
            this.props.setData(payload);
        }
        
        private emitAPIRequest() {
            if (!this.props.api) {
                console.error('You can not get data through api request if you did\' provide api address');
                return;
            }
        }
        
        loadData() {
            return new Promise<any>((resolve, reject) => {
                setTimeout(function() {
                    resolve({
                        errno: 1,
                        errmsg: 'ok',
                        data: []
                    });
                }, 100);
            });
        }
        
        private mergeOriginData(data: defaultData) {
            let injector = new ParamsInjector(data);
            injector.setResourceProvider(this.loadData());
            
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    if (!ParamsInjector.isInjector(data[key])) {
                        this.props.setData({
                            type: key,
                            newValue: data[key]
                        });   
                    }
                }
            }
            
            injector.finished(() => {
                 console.log('finished');
            });
        }

        render() {
            if (!component) {
                return null;
            }

            return createElement<ContainerProps>(component, componentInterface, Object.assign(info, {
                $data: this.props.$data,
                setData: this.emitChange,
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
    }, dispatch);

    let wrappedComponent = connect(mapStateToProps, mapDispatchToProps)(Container);

    return React.createElement<ContainerBasicPropsInterface>(wrappedComponent, Object.assign(info, {
        key: displayName
    }));
}