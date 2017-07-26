import * as React from 'react';
import './App.css';
import JSONEditor from './editor/index';
import Render from './render/index';

interface AppStateInterface {
    code: string;
}

class App extends React.Component<{}, AppStateInterface> {
    constructor() {
        super();
        
        this.state = {
            code: `
            {
                "title": "helloworld",
                "type": "page",
                "body": [
                    {
                        
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
