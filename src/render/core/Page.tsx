import * as React from 'react';
import { CreateContainer, ContainerProps } from './Container';

export class PageProps {
    title?: string;
    body: ContainerProps[] | ContainerProps | string;
}

class Page extends React.Component<PageProps, {}> {
    constructor() {
        super();
    }
    
    render() {
        let body;
        
        if (typeof this.props.body === 'string') {
            body = this.props.body;
        } else if (Array.isArray(this.props.body)) {
            body = this.props.body.map(item => {
                return CreateContainer(item);
            });
        } else {
            body = CreateContainer(this.props.body);
        }
        
        return (
            <div>
                <div className="page-header">
                    <h1>{this.props.title}</h1>
                </div>
                <div className="page-body">
                    {body}
                </div>
            </div>
        );
    }
}

export default Page;