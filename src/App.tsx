/// <reference path="./global.d.ts" />
/// <reference path="./types/echarts.d.ts" />

import * as React from 'react';
import JSONEditor from './editor/index';
import * as jsonformat from 'json-format';
import {Render} from './render/index';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import './App.css';

let basicContainerConfig = require('./demo/basic/basic.json');
let buttonConfig = require('./demo/basic/button.json');
let nestContainerConfig = require('./demo/basic/nestContainer.json');
let dataProviderConfig = require('./demo/basic/provider.json');
let layoutConfig = require('./demo/basic/layout.json');
let inputConfig = require('./demo/basic/input.json');
let lineChartConfig = require('./demo/basic/linechart.json');
let checkboxConfig = require('./demo/basic/checkbox.json');
let selectConfig = require('./demo/basic/select.json');
let radioConfig = require('./demo/basic/radio.json');
let datePickerConfig = require('./demo/basic/datepicker.json');
let tableConfig = require('./demo/basic/table.json');
let cascaderConfig = require('./demo/basic/cascader.json');
let iconConfig = require('./demo/basic/icon.json');
let modalConfig = require('./demo/basic/modal.json');
let submitConfig = require('./demo/basic/submit.json');
let tabsConfig = require('./demo/basic/tabs.json');

let onlineDemo1 = require('./demo/online/demo1.json');
let product = require('./demo/online/product.json');

interface AppStateInterface {
    code: string;
}

class App extends React.Component<{}, AppStateInterface> {
    constructor() {
        super();

        this.state = {
            code: jsonformat(tableConfig)
        };

        this.onJSONEditorChange = this.onJSONEditorChange.bind(this);
        this.changeConfig = this.changeConfig.bind(this);
    }

    onJSONEditorChange(code: string) {
        this.setState({
            code
        });
    }

    changeConfig(config: Object) {
        return () => {
            this.setState({
                code: jsonformat(config)
            });
        };
    }

    render() {
        // 这样每次保存就能重新完整渲染render
        class Preview extends Render {
            constructor() {
                super();
            }

            render() {
                const globalOptions = {
                    pageId: '4567',
                    username: 'dongtiancheng',
                    proxy: 'http://localhost:8800/proxy'
                };
                
                return <Render code={this.props.code} global={globalOptions}/>;
            }
        }

        let configList = [
            ['basic', basicContainerConfig],
            ['button', buttonConfig],
            ['nestContainer', nestContainerConfig],
            ['ajaxDataProvider', dataProviderConfig],
            ['layout', layoutConfig],
            ['input', inputConfig],
            ['lineChart', lineChartConfig],
            ['checkbox', checkboxConfig],
            ['select', selectConfig],
            ['radio', radioConfig],
            ['datePicker', datePickerConfig],
            ['table', tableConfig],
            ['cascader', cascaderConfig],
            ['icon', iconConfig],
            ['modal', modalConfig],
            ['tabs', tabsConfig],
            ['submit', submitConfig]
        ];
        
        let onlineConfig = [
            ['onlineDemo1', onlineDemo1],
            ['product', product]
        ];
        
        return (
            <div>
                <div className="config-panel">
                    <span>基础样例: </span>
                    {
                        configList.map(item => {
                            let name = item[0];
                            let value = item[1];
                            
                            return (
                                <a key={name} onClick={this.changeConfig(value)}>{name}</a>
                            );
                        })
                    }
                </div>
                <div className="config-panel">
                    <span>真实业务样例</span>
                    {
                        onlineConfig.map(item => {
                            let name = item[0];
                            let value = item[1];

                            return (
                                <a key={name} onClick={this.changeConfig(value)}>{name}</a>
                            );
                        })
                    }
                </div>
                <div className="App">
                    <Preview code={this.state.code}/>
                </div>
                <JSONEditor
                    code={this.state.code}
                    onChange={this.onJSONEditorChange}
                />
            </div>
        );
    }
}

export default App;
