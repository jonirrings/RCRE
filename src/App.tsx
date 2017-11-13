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

// let buttonMarked = require('raw-loader!./components/Button/Button.md');

// let helloworldGuide = 
// let dataComponentGuide = 
// let expressionStringGuide = require('raw-loader!./guide/ExpressionString.md');
// let dataProviderGuide = require('raw-loader!./guide/DataProvider.md');
// let nestContainerGuide = require('raw-loader!./guide/NestContainer.md');
// let layoutSystemGuide = require('raw-loader!./guide/LayoutSystem.md');

const {
    Header,
    Footer,
    Sider,
    Content
} = Layout;

const SubMenu = Menu.SubMenu;

// let basicContainerConfig = require('./demo/basic/basic.json');
// let buttonConfig = require('./demo/basic/button.json');
// let nestContainerConfig = require('./demo/basic/nestContainer.json');
// let dataProviderConfig = require('./demo/basic/provider.json');
// let layoutConfig = require('./demo/basic/layout.json');
// let inputConfig = require('./demo/basic/input.json');
// let lineChartConfig = require('./demo/basic/linechart.json');
// let checkboxConfig = require('./demo/basic/checkbox.json');
// let selectConfig = require('./demo/basic/select.json');
// let radioConfig = require('./demo/basic/radio.json');
// let datePickerConfig = require('./demo/basic/datepicker.json');
// let tableConfig = require('./demo/basic/table.json');
// let cascaderConfig = require('./demo/basic/cascader.json');
// let iconConfig = require('./demo/basic/icon.json');
// let modalConfig = require('./demo/basic/modal.json');
// let submitConfig = require('./demo/basic/submit.json');
// let tabsConfig = require('./demo/basic/tabs.json');
//
// let onlineDemo1 = require('./demo/online/demo1.json');
// let product = require('./demo/online/product.json');

const pageConfig = {
    'HelloWorld': require('raw-loader!./guide/Helloworld.md'),
    'ContainerComponent': require('raw-loader!./guide/ContainerComponent.md'),
    'ExpressionString': require('raw-loader!./guide/ExpressionString.md'),
    'DataProvider': require('raw-loader!./guide/DataProvider.md'),
    'NestContainer': require('raw-loader!./guide/NestContainer.md'),
    'LayoutSystem': require('raw-loader!./guide/LayoutSystem.md')
};

console.log(pageConfig);

interface AppStateInterface {
    activeMenu: string;
    activeKey: string;
}

class App extends React.Component<{}, AppStateInterface> {
    constructor() {
        super();

        this.state = {
            // code: jsonformat(tableConfig)
            activeMenu: '',
            activeKey: 'HelloWorld'
        };

        // this.onJSONEditorChange = this.onJSONEditorChange.bind(this);
        // this.changeConfig = this.changeConfig.bind(this);
    }

    // onJSONEditorChange(code: string) {
    //     this.setState({
    //         code
    //     });
    // }

    // changeConfig(config: Object) {
    //     return () => {
    //         this.setState({
    //             code: jsonformat(config)
    //         });
    //     };
    // }

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
        
        let html = pageConfig[this.state.activeKey];
        
        if (!html) {
            console.error('invalid activeKey');
        }
        
        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">文档与教程</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Layout style={{ padding: '24px 0', background: '#fff' }}>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['HelloWorld']}
                                defaultOpenKeys={['guide']}
                                style={{ height: '100%' }}
                                onSelect={param => {
                                    this.setState({
                                        activeKey: param.key
                                    });
                                }}
                            >
                                <SubMenu key="guide" title={<span><Icon type="book" />教程</span>}>
                                    <Menu.Item key="HelloWorld">HelloWorld</Menu.Item>
                                    <Menu.Item key="ContainerComponent">持有数据的组件</Menu.Item>
                                    <Menu.Item key="ExpressionString">Expression String</Menu.Item>
                                    <Menu.Item key="DataProvider">DataProvider</Menu.Item>
                                    <Menu.Item key="NestContainer">嵌套的Container组件</Menu.Item>
                                    <Menu.Item key="LayoutSystem">布局系统</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{ padding: '0 40px', minHeight: 280 }}>
                            <div dangerouslySetInnerHTML={{__html: parse(html) }} />
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    RCRE ©2017 Created by dongtiancheng@baidu.com
                </Footer>
            </Layout>
        );
        
    }
}

export default App;
