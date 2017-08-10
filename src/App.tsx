/// <reference path="./global.d.ts" />

import * as React from 'react';
import JSONEditor from './editor/index';
import Render from './render/index';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import './App.css';

interface AppStateInterface {
    code: string;
}

class App extends React.Component<{}, AppStateInterface> {
    constructor() {
        super();

        this.state = {
            code: `{
    "title": "实验平台",
    "body": [
        {
            "type": "button",
            "label": "click me",
          	"icon": "cloud",
          	"buttonType": "primary"
        },
        {
            "type": "form",
            "title": "test form",
            "data": {
                "name": "andycall",
                "age": "21",
                "mixed": {
                    "foo": "1234"
                },
                "remoteErrno": "$response.data.data_list[0].plan_id"
            },
            "initialLoad": "http://127.0.0.1:8080/package.json",
            "submitUrl": "/",
            "controls": [
                {
                    "type": "text",
                    "name": "name",
                    "errorMsg": "名字不能为空",
                    "required": true,
                    "preAddon": "姓名",
                    "initValue": "$data.age"
                },
                {
                    "type": "password",
                    "name": "password",
                    "preAddon": "密码",
                    "required": true,
                    "errorMsg": "密码不能为空"
                },
                {
                    "type": "email",
                    "name": "email",
                    "preAddon": "邮箱",
                    "required": true,
                    "errorMsg": "邮箱格式不正确"
                },
                {
                    "type": "select",
                    "name": "sex",
                    "preAddon": "性别",
                    "options": ["男", "女", "不知道"]
                },
                {
                    "type": "select",
                    "name": "region",
                    "preAddon": "省份",
                    "value": "002",
                    "options": [{"label":"北京","value":"001"},{"label":"上海","value":"002"}]
                },
                {
                    "type": "submit",
                    "name": "submit",
                    "value": "submit"
                }
            ]
        }
    ]
}`
        };

        this.onJSONEditorChange = this.onJSONEditorChange.bind(this);
    }

    onJSONEditorChange(code: string) {
        this.setState({
            code
        });
    }

    render() {
        return (
            <div className="App">
                <JSONEditor
                    code={this.state.code}
                    onChange={this.onJSONEditorChange}
                />
                <Render code={this.state.code}/>
            </div>
        );
    }
}

export default App;
