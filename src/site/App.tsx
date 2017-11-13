/// <reference path="../global.d.ts" />
/// <reference path="../types/echarts.d.ts" />

import * as React from 'react';
import {Layout, Menu, Icon} from 'antd';
import {parse} from 'marked';
import './App.css';
import {Link, RouteComponentProps} from 'react-router-dom';
import {ComponentPreview} from './ComponentPreview';

const {
    Sider,
    Content
} = Layout;

const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

const pageConfig = {
    'HelloWorld': require('raw-loader!../guide/Helloworld.md'),
    'ContainerComponent': require('raw-loader!../guide/ContainerComponent.md'),
    'ExpressionString': require('raw-loader!../guide/ExpressionString.md'),
    'DataProvider': require('raw-loader!../guide/DataProvider.md'),
    'NestContainer': require('raw-loader!../guide/NestContainer.md'),
    'LayoutSystem': require('raw-loader!../guide/LayoutSystem.md')
};

interface AppStateInterface {
    activeMenu: string;
    activeKey: string;
}

interface AppProps {
    activeKey: string;
    group: string;
}

class App extends React.Component<RouteComponentProps<AppProps>, AppStateInterface> {
    constructor() {
        super();

        this.state = {
            activeMenu: '',
            activeKey: 'HelloWorld'
        };
    }

    render() {
        let match = this.props.match;
        let params = match.params;
        let activeKey = params.activeKey || 'HelloWorld';
        let group = params.group;

        let content = <div/>;

        if (group === 'guide') {
            let html = pageConfig[activeKey];

            if (!html) {
                console.error('invalid activeKey');
                return <div />;
            }
            
            content = <div className="markdown" dangerouslySetInnerHTML={{__html: parse(html)}}/>;
        } else if (group === 'component') {
            content = <ComponentPreview activeKey={activeKey}/>;
        }

        return (
            <Layout style={{padding: '24px 0', background: '#fff'}}>
                <Sider width={200} style={{background: '#fff'}}>
                    <Menu
                        mode="inline"
                        selectedKeys={[activeKey]}
                        defaultOpenKeys={[group]}
                        style={{height: '100%'}}
                    >
                        <SubMenu key="guide" title={<span><Icon type="book"/>教程</span>}>
                            <Item key="HelloWorld"><Link to={'/guide/HelloWorld'}>HelloWorld</Link></Item>
                            <Item key="ContainerComponent"><Link to={'/guide/ContainerComponent'}>持有数据的组件</Link></Item>
                            <Item key="ExpressionString">
                                <Link to={'/guide/ExpressionString'}>
                                    Expression String
                                </Link>
                            </Item>
                            <Item key="DataProvider"><Link to={'/guide/DataProvider'}>DataProvider</Link></Item>
                            <Item key="NestContainer"><Link to={'/guide/NestContainer'}>嵌套的Container组件</Link></Item>
                            <Item key="LayoutSystem"><Link to={'/guide/LayoutSystem'}/>布局系统</Item>
                        </SubMenu>
                        <SubMenu key="component" title={<span><Icon type="appstore-o"/>组件</span>}>
                            <Item key="button"><Link to={'/component/button'}>Button</Link></Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Content style={{padding: '0 40px', minHeight: 280}}>
                    {content}
                </Content>
            </Layout>
        );

    }
}

export default App;
