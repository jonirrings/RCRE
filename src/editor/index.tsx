import * as React from 'react';
import * as CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

import './index.css';

interface JSONEditorPropsInterface {
    code: string;
    onChange: (code: string) => void;
}

class JSONEditor extends React.Component<JSONEditorPropsInterface, {}> {
    constructor() {
        super();
    }

    render() {
        const options = {
            lineNumbers: true,
            mode: 'javascript',
            viewportMargin: Infinity
        };

        return (
            <div className="editor-wrapper">
                <CodeMirror
                    value={this.props.code}
                    onChange={(code: string) => this.props.onChange(code)}
                    options={options}
                />
            </div>
        );
    }
}

export default JSONEditor;