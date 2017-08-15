import * as React from 'react';
import * as CodeMirror from 'react-codemirror';
import * as keycode from 'keycode';
import * as ReactDOM from 'react-dom';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

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
                    onChange={this.handleChange}
                    options={options}
                />
            </div>
        );
    }
}

export default JSONEditor;