import 'reflect-metadata';
import * as React from 'react';
import Page, {PageProps} from './core/Page';
import paramCheck from './util/paramCheck';
import store from './data/store';
import {Provider} from 'react-redux';
import {actionCreators} from './core/Container/action';

import './index.css';

interface RenderPropsInterface {
    code: string;
}

export class Render extends React.Component<RenderPropsInterface, {}> {
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
    
    componentWillUpdate(nextProps: RenderPropsInterface) {
        if (nextProps.code !== this.props.code) {
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
            <div className="render">
                <Provider store={store}>
                    <Page
                        title={info.title}
                        body={info.body}
                        theme={info.theme}
                    />
                </Provider>
            </div>
        );
    }
}

window.RCRE = Render;