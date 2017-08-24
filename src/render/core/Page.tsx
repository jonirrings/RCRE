import * as React from 'react';
import * as _ from 'lodash';
import WrappedContainer from './Container/index';
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

export class PageProps {
    @IsString()
    title?: string;

    @IsString()
    theme: string;

    @IsDefined()
    body: BasicConfig[] | BasicConfig | string;

    $global: Map<string, any>;

    $setDataList: typeof actionCreators.setDataList;
}

class Page extends React.Component<PageProps, {}> {
    static defaultProps = {
        title: '',
        theme: 'antd'
    };

    static childContextTypes = {
        driver: PropsTypes.object,
        $global: PropsTypes.object,
        $setDataList: PropsTypes.func
    };

    getChildContext() {
        themeDriver.setTheme(this.props.theme);

        return {
            driver: themeDriver,
            $global: this.props.$global,
            $setDataList: this.props.$setDataList
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
                return createChild(item, {
                    info: item,
                    key: index
                });
            });
        } else if (_.isPlainObject(this.props.body)) {
            body = React.createElement(WrappedContainer, {
                info: this.props.body
            });
        }

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
        $global: state.container
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => bindActionCreators({
    $setDataList: actionCreators.setDataList
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Page);