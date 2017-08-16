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

const pageConfig = {
    'title': '实验平台',
    'theme': 'antd',
    'body': [
        {
            'type': 'row',
            'align': 'center',
            'justify': 'space-around',
            'children': [
                {
                    'type': 'button',
                    'label': 'one',
                    'icon': 'cloud',
                    'buttonType': 'primary',

                },
                {
                    'type': 'button',
                    'label': 'two',
                    'buttonType': 'primary',
                    'colSpan': 6
                },
            ]
        },
        {
            'type': 'row',
            'children': [
                {
                    'type': 'tree',
                    'colSpan': 8,
                    // 'checkable': true,
                    'data': {
                        'tree': '$response.tree',
                        'show': 'Object.keys($response.show)'
                    },
                    'initialLoad': 'http://cp01-rdqa-dev420-dongtiancheng.epc.baidu.com:8094/tree',
                    'children': '$data.tree',
                    'childMapping': {
                        'title': '$iterator.title',
                        'key': '$iterator.key',
                        'children': '$iterator.children',
                        'isLeaf': '$iterator.isLeaf',
                        'disableCheckbox': '$iterator.disableCheckbox',
                        'disabled': '$data.show.indexOf($iterator.key) >= 0'
                    }
                },
                {
                    'type': 'rcre.lineChart',
                    'title': '测试图表',
                    'colSpan': 8,
                    'initialLoad': 'http://cp01-rdqa-dev420-dongtiancheng.epc.baidu.com:8094/linechart',
                    'data': {
                        'category': '$response.data.categories',
                        'series': '$response.data.series'
                    },
                    'categories': '$data.category',
                    'series': '$data.series'
                }
            ]
        }

        // {
        //     'type': 'form',
        //     'title': 'test form',
        //     'data': {
        //         'name': 'andycall',
        //         'age': '21',
        //         'mixed': {
        //             'foo': '1234'
        //         },
        //         'remoteErrno': '$response.data.data_list[0].plan_id'
        //     },
        //     'initialLoad': 'http://cp01-rdqa-dev420-dongtiancheng.epc.baidu.com:8094/',
        //     'submitUrl': '/',
        //     'controls': [
        //         {
        //             'type': 'text',
        //             'name': 'name',
        //             'errorMsg': '名字不能为空',
        //             'required': true,
        //             'preAddon': '姓名'
        //         },
        //         {
        //             'type': 'password',
        //             'name': 'password',
        //             'preAddon': '密码',
        //             'required': true,
        //             'errorMsg': '密码不能为空'
        //         },
        //         {
        //             'type': 'email',
        //             'name': 'email',
        //             'preAddon': '邮箱',
        //             'required': true,
        //             'errorMsg': '邮箱格式不正确'
        //         },
        //         {
        //             'type': 'select',
        //             'name': 'sex',
        //             'preAddon': '性别',
        //             'options': ['男', '女', '不知道']
        //         },
        //         {
        //             'type': 'select',
        //             'name': 'region',
        //             'preAddon': '省份',
        //             'value': '002',
        //             'options': [
        //                 {
        //                     'label': '北京',
        //                     'value': '001'
        //                 }, {
        //                     'label': '上海',
        //                     'value': '002'
        //                 }
        //             ]
        //         },
        //         {
        //             'type': 'submit',
        //             'name': 'submit',
        //             'initValue': 'submit'
        //         }
        //     ]
        // }
    ]
};

interface AppStateInterface {
    code: string;
}

class App extends React.Component<{}, AppStateInterface> {
    constructor() {
        super();

        this.state = {
            code: jsonformat(pageConfig)
        };

        this.onJSONEditorChange = this.onJSONEditorChange.bind(this);
    }

    onJSONEditorChange(code: string) {
        this.setState({
            code
        });
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
            <div className="App">
                <JSONEditor
                    code={this.state.code}
                    onChange={this.onJSONEditorChange}
                />
                <Preview code={this.state.code}/>
            </div>
        );
    }
}

export default App;
