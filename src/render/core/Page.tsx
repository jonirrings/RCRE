import * as React from 'react';

interface PagePropsInterface {
    title?: string;
}

class Page extends React.Component<PagePropsInterface, {}> {
    constructor() {
        super();
    }
    
    render() {
        return (
            <div>
                <div className="page-header">
                    <h1>{this.props.title}</h1>
                </div>
                <div className="page-body">
                    {this.props.children} 
                </div>
            </div>
        );
    }
}

export default Page;