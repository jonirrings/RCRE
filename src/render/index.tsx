import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Page from './core/Page';
import configureStore from './data/store';
import {actionCreators} from './core/Container/action';
import {Provider} from 'react-redux';
import componentDriver from './util/componentLoader';
import {BasicContainer} from './core/Container/types';
import {providerLoaderInstance as providerLoader} from './core/DataProvider/loader';
import {customerLoaderInstance as customerLoader} from './core/DataCustomer/loader';
import {createChild} from './util/createChild';
import {Store} from 'redux';
import {RootState} from './data/reducers';

import './index.css';

export type globalOptions = {
    [s: string]: any
};

export interface RenderPropsInterface {
    code: string;
    global?: globalOptions;
}

export let store: Store<RootState> = configureStore();

export class Render extends React.Component<RenderPropsInterface, {}> {
    static defaultProps = {
        code: '{"title": "空数据", "body": []}',
        global: {}
    };
    
    constructor() {
        super();
    }

    shouldComponentUpdate(nextProps: RenderPropsInterface, nextState: {}) {
        return this.props.code !== nextProps.code;
    }

    componentWillUnmount() {
        store.dispatch(actionCreators.clearData());
    }

    render() {
        let info;
        try {
            info = JSON.parse(this.props.code);
        } catch (e) {
            console.error(e);
        }

        if (!info) {
            return <h1>JSON 解析异常</h1>;
        }

        // 保证每次render的数据模型都很纯净， 所以要每次渲染新的code
        // 之前要全部清空， 重新来一遍
        class UpdatePage extends Page {
        }

        return (
            <Provider store={store}>
                <UpdatePage
                    title={info.title}
                    body={info.body}
                    debug={info.debug}
                    lang={info.lang}
                    global={this.props.global}
                />
            </Provider>
        );
    }
}

export {
    BasicContainer,
    componentDriver as componentLoader, 
    providerLoader, 
    customerLoader,
    createChild
};

window.React = React;
window.ReactDOM = ReactDOM;
window.RCRE = Render;
window.RCRE_React = React;
window.RCRE_ReactDOM = ReactDOM;
window.RCRE_componentDriver = componentDriver;
window.RCRE_BasicContainer = BasicContainer;
window.RCRE_providerLoader = providerLoader;
window.RCRE_customerLoader = customerLoader;