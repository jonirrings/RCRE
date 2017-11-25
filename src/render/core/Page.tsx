/**
 * @file 引擎入口
 * @author dongtiancheng
 */

import * as React from 'react';
import {BasicConfig} from './Container/types';
import {IsDefined, IsString} from 'class-validator';
import * as PropsTypes from 'prop-types';
import {createChild} from '../util/createChild';
import * as URL from 'url';
import * as querystring from 'querystring';

export class PageProps {
    @IsString()
    title?: string;

    @IsDefined()
    body: BasicConfig[] | BasicConfig | string;

    // 外部注入的全局对象
    global?: Object;

    // 调试模式
    debug: boolean;

    // 报错的信息语言
    lang: string;
}

class Page extends React.Component<PageProps, {}> {
    static defaultProps = {
        title: '',
        debug: false,
        global: {},
        lang: 'zh_CN'
    };

    static childContextTypes = {
        $global: PropsTypes.object,
        $location: PropsTypes.object,
        $query: PropsTypes.object,
        debug: PropsTypes.bool,
        lang: PropsTypes.string
    };

    static getLocationService() {
        let $location = URL.parse(location.href);
        let $query = {};

        if ($location.query) {
            $query = querystring.parse($location.query);
        }

        return {
            $location,
            $query
        };
    }

    constructor() {
        super();
    }

    getChildContext() {
        let {
            $location,
            $query
        } = Page.getLocationService();

        return {
            $global: this.props.global,
            $location,
            $query,
            debug: this.props.debug
        };
    }

    render() {
        let body;

        if (!Array.isArray(this.props.body)) {
            return <p>body props is not array</p>;
        }

        body = this.props.body.map((item, index) => {
            return createChild(item, {
                info: item,
                key: index
            });
        });

        let pageHeader = this.props.title ? (
            <div className="page-header">
                <h1>{this.props.title}</h1>
            </div>
        ) : '';

        return (
            <div className="page-container">
                {pageHeader}
                <div className="page-body">
                    {body}
                </div>
            </div>
        );
    }
}

export default Page;