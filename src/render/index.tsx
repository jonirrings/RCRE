import * as React from 'react';
import Page, {PageProps} from './core/Page';
import paramCheck from './util/paramCheck';

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
                <Page
                    title={info.title}
                    body={info.body}
                    theme={info.theme}
                />
            </div>
        );
    }
}