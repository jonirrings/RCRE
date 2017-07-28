import * as React from 'react';
import Page, {PageProps} from './core/Page';

interface RenderPropsInterface {
    code: string;
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
        let info: PageProps = JSON.parse(this.props.code);

        return (
            <div className="render">
                <Page
                    title={info.title}
                    body={info.body}
                />
            </div>
        );
    }
}

export default Render;