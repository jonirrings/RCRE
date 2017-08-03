import * as React from 'react';
import componentLoader from '../../util/componentLoader';
import createElement from '../../util/createElement';
import {BasicContainer, ContainerBasicPropsInterface, ContainerProps } from './types';
import {connect} from 'react-redux';
import {Dispatch, bindActionCreators} from 'redux';
import {actionCreators, IAction, SET_DATA_PAYLOAD} from './action';
import {RootState} from '../../data/reducers';

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

        emitChange(payload: SET_DATA_PAYLOAD) {
            this.props.setData(payload);
        }

        render() {
            if (!component) {
                return null;
            }

            return createElement<ContainerProps>(component, componentInterface, Object.assign(info, {
                data: this.props.data,
                setData: this.emitChange
            }));
        }
    }

    Container.WrappedComponent = wrappedComponentName;
    Container.displayName = displayName;

    const mapStateToProps = (state: RootState, ownProps: any) => {
        return {
            data: state.form.data
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