import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as keycode from 'keycode';
import * as ReactDOM from 'react-dom';

import './index.css';

interface JSONEditorPropsInterface {
    code: string;
    onChange: (code: string) => void;
}

interface JSONEditorStateInterface {
    code: string;
}

class JSONEditor extends React.Component<JSONEditorPropsInterface, JSONEditorStateInterface> {
    constructor() {
        super();

        this.state = {
            code: ''
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.editorDidMount = this.editorDidMount.bind(this);
    }

    componentWillMount() {
        if (this.props.code.length > 0) {
            this.setState({
                code: this.props.code
            });
        }
    }
    
    handleChange(code: string) {
        this.setState({
            code
        });
    }

    componentWillReceiveProps(nextProps: JSONEditorStateInterface) {
        if (nextProps.code !== this.props.code) {
            this.setState({
                code: nextProps.code
            });
        }
    }
    
    componentDidMount() {
        ReactDOM.findDOMNode(this).addEventListener('keydown', (e: KeyboardEvent) => {
            let code = e.keyCode;
            let command = keycode(code);
            
            // TODO windows control support
            if ((e.metaKey && command === 's') || (e.ctrlKey && command === 's')) {
                e.preventDefault();
                this.props.onChange(this.state.code);
            }
        }, true);
    }

    editorDidMount(editor: monaco.editor.ICodeEditor, monacoModule: typeof monaco) {
        editor.focus();
    }

    render() {
        const code = this.state.code;
        const options = {
            selectOnLineNumbers: true,
            minimap: {
                enabled: false
            }
        };

        return (
            <div className="editor-wrapper">
                <MonacoEditor
                    width="700"
                    height="700"
                    language="json"
                    theme="vs-light"
                    value={code}
                    options={options}
                    onChange={this.handleChange}
                    editorDidMount={this.editorDidMount}
                />
            </div>
        );
    }
}

export default JSONEditor;