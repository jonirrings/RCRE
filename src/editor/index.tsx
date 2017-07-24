import * as React from 'react';
import * as CodeMirror from 'react-codemirror';

import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'

interface JSONEditorStateInterface {
    code: string;
}

class JSONEditor extends React.Component<{}, JSONEditorStateInterface> {
    constructor() {
        super();

        this.state = {
            code: ''
        };
    }

    updateCode(newCode: string) {
        this.setState({
            code: newCode
        })
    }

    render() {
        const options = {
            lineNumbers: true,
            mode: 'javascript'
        };

        return <CodeMirror
            value={this.state.code}
            onChange={this.updateCode.bind(this)}
            options={options}
        />
    }
}

export default JSONEditor;