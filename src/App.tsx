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

// let basicConfig = require('./demo/basic.json');
// let lineChartConfig = require('./demo/linechart.json');
// let treeConfig = require('./demo/tree.json');
// let tableConfig = require('./demo/table.json');
// let layoutConfig = require('./demo/layout.json');
// let searchConfig = require('./demo/searchList.json');
// let treeEditConfig = require('./demo/treeEdit.json');
// let todomvcConfig = require('./demo/todomvc.json');
// let approvalConfig = require('./demo/approvel.json');
// let authListConfig = require('./demo/authList.json');
// let authorifyListConfig = require('./demo/authorityList.json');
// let ruleTemplateListConfig = require('./demo/ruleTemplateList.json');
// let addRuleTemplateConfig = require('./demo/addRuleTemplate.json');
// let dynamicSelectConfig = require('./demo/dynamicSelect.json');

let basicContainerConfig = require('./demo/basic/basic.json');
let nestContainerConfig = require('./demo/basic/nestContainer.json');
let dataProviderConfig = require('./demo/basic/provider.json');
let layoutConfig = require('./demo/basic/layout.json');
let inputConfig = require('./demo/basic/input.json');
let lineChartConfig = require('./demo/basic/linechart.json');
let checkboxConfig = require('./demo/basic/checkbox.json');
let selectConfig = require('./demo/basic/select.json');
let radioConfig = require('./demo/basic/radio.json');

interface AppStateInterface {
    code: string;
}

class App extends React.Component<{}, AppStateInterface> {
    constructor() {
        super();

        this.state = {
            code: jsonformat(radioConfig)
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
            ['basicContainer', basicContainerConfig],
            ['nestContainer', nestContainerConfig],
            ['ajaxDataProvider', dataProviderConfig],
            ['layoutConfig', layoutConfig],
            ['inputConfig', inputConfig],
            ['lineChartConfig', lineChartConfig],
            ['checkboxConfig', checkboxConfig],
            ['selectConfig', selectConfig],
            ['radioConfig', radioConfig]
        ];
        
        return (
            <div>
                <div className="config-panel">
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
