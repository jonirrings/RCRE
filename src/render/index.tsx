import 'reflect-metadata';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Page, {PageProps} from './core/Page';
import paramCheck from './util/paramCheck';
import configureStore from './data/store';
import {Provider} from 'react-redux';

import './index.css';

type globalOptions = {
    [s: string]: any
};

interface RenderPropsInterface {
    code: string;
    global?: globalOptions;
}

let store = configureStore();

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

    componentWillMount() {
        store = configureStore();
    }
    
    componentWillUpdate(nextProps: RenderPropsInterface) {
        store = configureStore();
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
            <div className="render">
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

window.RCRE = Render;
window.RCRE_React = React;
window.RCRE_ReactDOM = ReactDOM;