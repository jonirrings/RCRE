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
import {actionCreators} from './render/core/Container/action';
import store from './render/data/store';

let basicConfig = require('./demo/basic.json');
let formConfig = require('./demo/form.json');
let lineChartConfig = require('./demo/linechart.json');
let treeConfig = require('./demo/tree.json');
let tableConfig = require('./demo/table.json');
let layoutConfig = require('./demo/layout.json');
let searchConfig = require('./demo/searchList.json');
let mvvmConfig = require('./demo/mvvm.json');

interface AppStateInterface {
    code: string;
}

class App extends React.Component<{}, AppStateInterface> {
    constructor() {
        super();

        this.state = {
            code: jsonformat(treeConfig)
        };

        this.onJSONEditorChange = this.onJSONEditorChange.bind(this);
        this.changeConfig = this.changeConfig.bind(this);
    }

    onJSONEditorChange(code: string) {
        store.dispatch(actionCreators.clearData());
        
        this.setState({
            code
        });
    }

    changeConfig(config: Object) {
        return () => {
            store.dispatch(actionCreators.clearData());
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
                return <Render code={this.props.code}/>;
            }
        }

        return (
            <div>
                <div className="config-panel">
                    <a onClick={this.changeConfig(basicConfig)}>Basic</a>
                    <a onClick={this.changeConfig(formConfig)}>Form</a>
                    <a onClick={this.changeConfig(layoutConfig)}>Layout</a>
                    <a onClick={this.changeConfig(searchConfig)}>Search</a>
                    <a onClick={this.changeConfig(lineChartConfig)}>LineChart</a>
                    <a onClick={this.changeConfig(treeConfig)}>Tree</a>
                    <a onClick={this.changeConfig(mvvmConfig)}>MVVM example</a>
                    <a onClick={this.changeConfig(tableConfig)}>Table</a>
                </div>
                <div className="App">
                    <JSONEditor
                        code={this.state.code}
                        onChange={this.onJSONEditorChange}
                    />
                    <Preview code={this.state.code}/>
                </div>
            </div>
        );
    }
}

export default App;
