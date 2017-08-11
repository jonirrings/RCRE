import * as React from 'react';
// import { CreateContainer } from './Container/index';
import WrappedContainer from './Container/index';
import {ContainerBasicPropsInterface} from './Container/types';
import {IsString, IsDefined} from 'class-validator';
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
        let driver = themeDriver.getTheme(this.props.theme);

        return {
            driver: driver
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
                return React.createElement(WrappedContainer, Object.assign(item, {
                    key: index,
                    $depth: 0,
                    $uuid: `0_${index}`
                }));
            });
        } else {
            body = React.createElement(WrappedContainer, Object.assign(this.props.body, {
                $uuid: `0_0`,
                $depth: 0
            }));
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