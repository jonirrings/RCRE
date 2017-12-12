import * as hljs from 'highlight.js';
import * as React from 'react';

export interface HighLightPropsInterface {
    innerHTML?: string;
    className?: string;
}

export class HighLight extends React.Component<HighLightPropsInterface, {}> {
    private domE: HTMLPreElement;
    
    constructor() {
        super();
    }
    
    componentDidMount() {
        this.highlightCode();
    }
    
    componentDidUpdate() {
        this.highlightCode();
    }

    highlightCode() {
        const nodes = this.domE.querySelectorAll('pre code');

        for (let i = 0; i < nodes.length; i++) {
            hljs.highlightBlock(nodes[i]);
        }
    }
    
    render() {
        const refHook = (dom: HTMLPreElement) => {
            if (dom) {
                this.domE = dom;
            }
        };
        
        return (
            <pre ref={refHook}>
                <code className={this.props.className}>{this.props.children}</code>
            </pre>
        );
    }
}