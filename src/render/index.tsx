import * as React from 'react';
import Page from './core/Page';
import { PageInterface } from './provider/page';

interface RenderPropsInterface {
    code: string;    
}

function parseWrapper(code: string): PageInterface {
    return JSON.parse(code);
}

class Render extends React.Component<RenderPropsInterface, {}> {
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
        let json = parseWrapper(this.props.code);
        
        return (
            <div className="render">
                <Page title={json.title}>
                    1234
                </Page>
            </div>
        );
    }
}

export default Render;