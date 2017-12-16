/**
 * @file 网站入口
 * @author dongtiancheng
 */

// 引擎入口在 ./render/index.tsx

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './site/App';
import './index.css';
import 'highlight.js/styles/xcode.css';
import {BrowserRouter, Redirect, Route} from 'react-router-dom';
import {Layout, Menu} from 'antd';

const {
    Header,
    Footer,
    Content
} = Layout;

const Item = Menu.Item;

const IndexRoute = () => {
    return <Redirect to={'/guide/HelloWorld'}/>;
};

const Index = (
    <BrowserRouter>
        <Layout>
            <Header className="header">
                <div className="logo">RCRE</div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{lineHeight: '64px'}}
                >
                    <Item key="1">文档与教程</Item>
                </Menu>
            </Header>
            <Content style={{padding: '0 50px'}}>
                <Route path="/:group/:activeKey" component={App}/>
                <Route path="/" strict={true} exact={true} component={IndexRoute}/>
            </Content>
            <Footer style={{textAlign: 'center'}}>
                RCRE ©2017 Created by dongtiancheng@baidu.com
            </Footer>
        </Layout>
    </BrowserRouter>
);

ReactDOM.render(
    Index,
    document.getElementById('root') as HTMLElement
);