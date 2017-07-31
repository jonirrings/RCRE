import * as React from 'react';
import JSONEditor from './editor/index';
import Render from './render/index';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';
import {
    Link
} from 'react-router-dom';

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
            "type": "form",
            "title": "test form",
            "api": "/test/submitAPI",
            "controls": [
                {
                    "type": "text",
                    "name": "name",
                    "label": "Text",
                    "required": true
                },
                {
                    "type": "password",
                    "name": "password",
                    "label": "Password"
                },
                {
                    "type": "email",
                    "name": "email",
                    "label": "Email",
                    "required": true
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
                <Render code={this.state.code} />
                <Link to="/doc">Doc</Link>
            </div>
        );
    }
}

export default App;
