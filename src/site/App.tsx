/// <reference path="../global.d.ts" />
/// <reference path="../types/echarts.d.ts" />

import * as React from 'react';
import {Icon, Layout, Menu} from 'antd';
import './App.css';
import {Link, RouteComponentProps} from 'react-router-dom';
import {ComponentPreview} from './ComponentPreview';
import {GuidePreview} from './GuidePreview';
import guideList from '../guide/index';
import docList from '../components/doc';
import demoList from '../demo/index';
import * as _ from 'lodash';

const {
    Sider,
    Content
} = Layout;

const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

export interface AppStateInterface {
    activeMenu: string;
    activeKey: string;
}

export interface AppProps {
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
            let html = guideList[activeKey];
            
            if (!html) {
                console.error('invalid activeKey');
                return <div/>;
            }

            let markdown = html.md;
            content = <GuidePreview md={markdown} />;
        } else if (group === 'component') {
            content = <ComponentPreview map={docList} activeKey={activeKey}/>;
        } else if (group === 'demo') {
            content = <ComponentPreview map={demoList} activeKey={activeKey}/>;
        }

        return (
            <Layout style={{padding: '24px 0', background: '#fff'}}>
                <Sider width={200} style={{background: '#fff'}}>
                    <Menu
                        mode="inline"
                        selectedKeys={[activeKey]}
                        defaultOpenKeys={['guide', 'component', 'demo']}
                        style={{height: '100%'}}
                    >
                        <SubMenu key="guide" title={<span><Icon type="book"/>教程</span>}>
                            {
                                _.map(guideList, (info, name) => {
                                    return <Item key={name}>
                                        <Link to={`/guide/${name}`}>
                                            {info.title}
                                        </Link>
                                    </Item>;
                                })
                            }
                        </SubMenu>
                        <SubMenu key="component" title={<span><Icon type="appstore-o"/>组件</span>}>
                            {
                                _.map(docList, (info, name) => {
                                    return <Item key={name}>
                                        <Link to={`/component/${name}`}>
                                            {name.substring(0, 1).toUpperCase() + name.substring(1)}
                                        </Link>
                                    </Item>;
                                })
                            }
                        </SubMenu>
                        <SubMenu key="demo" title={<span><Icon type="solution"/>样例</span>}>
                            {
                                _.map(demoList, (info, name) => {
                                    return <Item key={name}>
                                        <Link to={`/demo/${name}`}>
                                            {name}
                                        </Link>
                                    </Item>;
                                })
                            }
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
