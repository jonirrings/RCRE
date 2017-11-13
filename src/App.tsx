/// <reference path="./global.d.ts" />
/// <reference path="./types/echarts.d.ts" />

import * as React from 'react';
// import JSONEditor from './editor/index';
// import {Render} from './render/index';
// import * as jsonformat from 'json-format';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import {Layout, Menu, Icon} from 'antd';
import {parse} from 'marked';
import './App.css';
import {Link, RouteComponentProps} from 'react-router-dom';

const {
    Sider,
    Content
} = Layout;

const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

const pageConfig = {
    'HelloWorld': require('raw-loader!./guide/Helloworld.md'),
    'ContainerComponent': require('raw-loader!./guide/ContainerComponent.md'),
    'ExpressionString': require('raw-loader!./guide/ExpressionString.md'),
    'DataProvider': require('raw-loader!./guide/DataProvider.md'),
    'NestContainer': require('raw-loader!./guide/NestContainer.md'),
    'LayoutSystem': require('raw-loader!./guide/LayoutSystem.md'),
    'button': require('raw-loader!./components/Button/Button.md')
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
            // code: jsonformat(tableConfig)
            activeMenu: '',
            activeKey: 'HelloWorld'
        };
    }

    render() {
        // // 这样每次保存就能重新完整渲染render
        // class Preview extends Render {
        //     constructor() {
        //         super();
        //     }
        //
        //     render() {
        //         const globalOptions = {
        //             pageId: '4567',
        //             username: 'dongtiancheng',
        //             proxy: 'http://localhost:8800/proxy'
        //         };
        //        
        //         return <Render code={this.props.code} global={globalOptions}/>;
        //     }
        // }
        //
        // let configList = [
        //     ['basic', basicContainerConfig],
        //     ['button', buttonConfig],
        //     ['nestContainer', nestContainerConfig],
        //     ['ajaxDataProvider', dataProviderConfig],
        //     ['layout', layoutConfig],
        //     ['input', inputConfig],
        //     ['lineChart', lineChartConfig],
        //     ['checkbox', checkboxConfig],
        //     ['select', selectConfig],
        //     ['radio', radioConfig],
        //     ['datePicker', datePickerConfig],
        //     ['table', tableConfig],
        //     ['cascader', cascaderConfig],
        //     ['icon', iconConfig],
        //     ['modal', modalConfig],
        //     ['tabs', tabsConfig],
        //     ['submit', submitConfig]
        // ];
        //
        // let onlineConfig = [
        //     ['onlineDemo1', onlineDemo1],
        //     ['product', product]
        // ];
        //
        // return (
        //     <div>
        //         <div className="config-panel">
        //             <span>基础样例: </span>
        //             {
        //                 configList.map(item => {
        //                     let name = item[0];
        //                     let value = item[1];
        //                    
        //                     return (
        //                         <a key={name} onClick={this.changeConfig(value)}>{name}</a>
        //                     );
        //                 })
        //             }
        //         </div>
        //         <div className="config-panel">
        //             <span>真实业务样例</span>
        //             {
        //                 onlineConfig.map(item => {
        //                     let name = item[0];
        //                     let value = item[1];
        //
        //                     return (
        //                         <a key={name} onClick={this.changeConfig(value)}>{name}</a>
        //                     );
        //                 })
        //             }
        //         </div>
        //         <div className="App">
        //             <Preview code={this.state.code}/>
        //         </div>
        //         <JSONEditor
        //             code={this.state.code}
        //             onChange={this.onJSONEditorChange}
        //         />
        //     </div>
        // );
        
        let match = this.props.match;
        let params = match.params;
        let activeKey = params.activeKey || 'HelloWorld';
        let group = params.group;

        console.log(params);
        
        let html = pageConfig[activeKey];

        if (!html) {
            console.error('invalid activeKey');
        }
        
        return (
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        selectedKeys={[activeKey]}
                        defaultOpenKeys={[group]}
                        style={{ height: '100%' }}
                    >
                        <SubMenu key="guide" title={<span><Icon type="book" />教程</span>}>
                            <Item key="HelloWorld"><Link to={'/guide/HelloWorld'}>HelloWorld</Link></Item>
                            <Item key="ContainerComponent"><Link to={'/guide/ContainerComponent'}>持有数据的组件</Link></Item>
                            <Item key="ExpressionString"><Link to={'/guide/ExpressionString'}>Expression String</Link></Item>
                            <Item key="DataProvider"><Link to={'/guide/DataProvider'}>DataProvider</Link></Item>
                            <Item key="NestContainer"><Link to={'/guide/NestContainer'}>嵌套的Container组件</Link></Item>
                            <Item key="LayoutSystem"><Link to={'/guide/LayoutSystem'}/>布局系统</Item>
                        </SubMenu>
                        <SubMenu key="component" title={<span><Icon type="appstore-o" />组件</span>}>
                            <Item key="button"><Link to={'/component/button'}>Button</Link></Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Content style={{ padding: '0 40px', minHeight: 280 }}>
                    <div className="markdown" dangerouslySetInnerHTML={{__html: parse(html) }} />
                </Content>
            </Layout>
        );
        
    }
}

export default App;
