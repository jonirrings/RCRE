import * as React from 'react';
import Page from './core/Page';

interface RenderPropsInterface {
    code: string;    
}

class Render extends React.Component<RenderPropsInterface, {}> {
    constructor() {
        super();
    }
    
    recursionRende(json: {}) {
    }
    
    render() {
        let json = JSON.parse(this.props.code);
        
        if (json.type === 'page') {
            return <Page title={json.title}>
                {this.recursionRende(json.body)}
            </Page>
        }
        
        return (
            <div>this is render</div>
        );
    }
}

export default Render;