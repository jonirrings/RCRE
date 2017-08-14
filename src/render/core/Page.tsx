import * as React from 'react';
import WrappedContainer from './Container/index';
import {ContainerBasicPropsInterface} from './Container/types';
import {IsDefined, IsString} from 'class-validator';
import {Provider} from 'react-redux';
import themeDriver from '../../drivers/index';
import * as PropsTypes from 'prop-types';
import store from '../data/store';

export class PageProps {
    @IsString()
    title?: string;

    @IsString()
    theme: string;

    @IsDefined()
    body: ContainerBasicPropsInterface[] | ContainerBasicPropsInterface | string;
}

class Page extends React.Component<PageProps, {}> {
    static defaultProps = {
        title: '标题',
        theme: 'antd'
    };

    static childContextTypes = {
        driver: PropsTypes.object
    };

    getChildContext() {
        themeDriver.setTheme(this.props.theme);
        
        return {
            driver: themeDriver
        };
    }

    constructor() {
        super();
    }

    render() {
        let body;

        if (typeof this.props.body === 'string') {
            body = this.props.body;
        } else if (Array.isArray(this.props.body)) {
            body = this.props.body.map((item, index) => {
                return React.createElement(WrappedContainer, {
                    info: item,
                    key: index,
                    $depth: 0,
                    $uuid: `0_${index}`
                });
            });
        } else {
            body = React.createElement(WrappedContainer, {
                info: this.props.body,
                $uuid: `0_0`,
                $depth: 0
            });
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