import * as React from 'react';
import { CreateContainer } from './Container/index';
import { ContainerBasicPropsInterface } from './Container/types';
import { Provider } from 'react-redux';
import store from '../data/store';

export class PageProps {
    title?: string;
    body: ContainerBasicPropsInterface[] | ContainerBasicPropsInterface | string;
}

export class PageStates {
    helloworld: string;
}

class Page extends React.Component<PageProps, PageStates> {
    constructor() {
        super();
    }
    
    render() {
        let body;
        
        if (typeof this.props.body === 'string') {
            body = this.props.body;
        } else if (Array.isArray(this.props.body)) {
            body = this.props.body.map((item, index) => {
                return CreateContainer(Object.assign(item, {
                    key: index
                }));
            });
        } else {
            body = CreateContainer(this.props.body);
        }
        
        return (
            <Provider store={store}>
                <div className="page-container">
                    <div className="page-header">
                        <h1>{this.props.title}</h1>
                    </div>
                    <div className="page-body">
                        {body}
                    </div>
                </div>
            </Provider>
        );
    }
}

export default Page;