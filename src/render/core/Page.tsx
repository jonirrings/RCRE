import * as React from 'react';
import {BasicConfig} from './Container/types';
import {IsDefined, IsString} from 'class-validator';
import themeDriver from '../../drivers/index';
import * as PropsTypes from 'prop-types';
import {createChild} from '../util/createChild';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import {RootState} from '../data/reducers';
import {bindActionCreators, Dispatch} from 'redux';
import {actionCreators, IAction} from './Container/action';
import * as URL from 'url';
import * as querystring from 'querystring';

export class PageProps {
    @IsString()
    title?: string;

    @IsString()
    theme: string;

    @IsDefined()
    body: BasicConfig[] | BasicConfig | string;

    // redux root对象
    $store: Map<string, any>;

    // 外部注入的全局对象
    global: Object;

    $setDataList: typeof actionCreators.setDataList;

    $triggerListData: typeof actionCreators.triggerListData;
}

class Page extends React.Component<PageProps, {}> {
    static defaultProps = {
        title: '',
        theme: 'antd'
    };

    static childContextTypes = {
        driver: PropsTypes.object,
        $store: PropsTypes.object,
        $global: PropsTypes.object,
        $setDataList: PropsTypes.func,
        $initData: PropsTypes.func,
        $triggerListData: PropsTypes.func,
        $location: PropsTypes.object,
        $query: PropsTypes.object
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
        themeDriver.setTheme(this.props.theme);

        let {
            $location,
            $query
        } = Page.getLocationService();

        return {
            driver: themeDriver,
            $store: this.props.$store,
            $global: this.props.global,
            $setDataList: this.props.$setDataList,
            $triggerListData: this.props.$triggerListData,
            $location,
            $query
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

const mapStateToProps = (state: RootState, ownProps: any) => {
    return {
        $store: state.container
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => bindActionCreators({
    $setDataList: actionCreators.setDataList,
    $triggerListData: actionCreators.triggerListData
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Page);