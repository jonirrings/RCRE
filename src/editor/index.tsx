import * as React from 'react'
import * as CodeMirror from 'react-codemirror'
import * as NativeCodeMirror from 'codemirror'

class JSONEditor extends React.Component<{}, {}> {
    private editorRef: ReactCodeMirror.ReactCodeMirror;

    constructor() {
        super();
    }

    componentDidMount() {
        this.editorRef.focus();
        this.editorRef.getCodeMirror();
    }

    render() {
        const options = {
            lineNumbers: true,
            readOnly: false,
            mode: "json"
        };

        const codeMirrorWrapper = 'code-mirror-wrapper';
        const hook = document.getElementById(codeMirrorWrapper);

        if (!hook) {
            return <div id={codeMirrorWrapper}></div>;
        }

        const onChange = (value: any) => console.log(value);
        const onFocusChange = (focused: boolean) => console.log(focused);
        const onScroll = (scrollInfo: CodeMirror.ScrollInfo) => console.log(scrollInfo.top);
        const codeMirrorInstance = NativeCodeMirror(hook);

        return (
            <div id={codeMirrorWrapper}>
                <CodeMirror className="test-codemirror"
                    codeMirrorInstance={codeMirrorInstance}
                    onChange={onChange}
                    onFocusChange={onFocusChange}
                    onScroll={onScroll}
                    options={options}
                    path="editor"
                    ref={(r: ReactCodeMirror.ReactCodeMirror) => this.editorRef = r}
                    value="foo bar" />
            </div>
        )
    }
}

export default JSONEditor