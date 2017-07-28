import * as React from 'react';
import JSONEditor from './editor/index';
import Render from './render/index';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';

interface AppStateInterface {
    code: string;
}

class App extends React.Component<{}, AppStateInterface> {
    constructor() {
        super();
        
        this.state = {
            code: `{
  "title": "helloworld",
  "body": [
    {
      "type": "form",
      "title": "test form",
      "controls": [
        {
            "type": "text",
            "name": "name",
            "label": "Text"
        },
        {
            "type": "password",
            "name": "password",
            "label": "Password"
        },
        {
            "type": "email",
            "name": "email",
            "label": "Email"
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
            </div>
        );
    }
}

export default App;
