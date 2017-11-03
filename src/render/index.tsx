import 'reflect-metadata';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Page, {PageProps} from './core/Page';
import paramCheck from './util/paramCheck';
import configureStore from './data/store';
import {actionCreators} from './core/Container/action';
import {Provider} from 'react-redux';
import componentDriver from './util/componentLoader';
import {BasicContainer} from './core/Container/types';

import './index.css';

type globalOptions = {
    [s: string]: any
};

interface RenderPropsInterface {
    code: string;
    global?: globalOptions;
}

export const store = configureStore();

export class Render extends React.Component<RenderPropsInterface, {}> {
    static defaultProps = {
        code: '{"title": "空数据", "body": []}',
        global: {}
    };
    
    constructor() {
        super();
    }

    shouldComponentUpdate(nextProps: RenderPropsInterface, nextState: {}) {
        try {
            JSON.parse(nextProps.code);
            return true;
        } catch (e) {
            // TODO Error Report
            return false;
        }
    }

    componentWillUnmount() {
        store.dispatch(actionCreators.clearData());
    }

    componentWillReceiveProps(nextProps: RenderPropsInterface) {
        if (this.props.code !== nextProps.code) {
            store.dispatch(actionCreators.clearData());   
        }
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

        let ret = paramCheck(info, PageProps);
        if (ret.length > 0) {
            console.error(ret);
            // TODO json property error log
        }

        // TODO: 每次JSON更新都会整体重渲染, 性能很烂
        return (
            <div className="rcre-render">
                <Provider store={store}>
                    <Page
                        title={info.title}
                        body={info.body}
                        theme={info.theme}
                        global={this.props.global}
                    />
                </Provider>
            </div>
        );
    }
}

export {componentDriver, BasicContainer};

window.RCRE = Render;
window.RCRE_React = React;
window.RCRE_ReactDOM = ReactDOM;