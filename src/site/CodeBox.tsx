import * as React from 'react';
import './CodeBox.css';
import {Render} from '../render/index';
let unExpand = require('./img/unExpand.svg');
let expanded = require('./img/expanded.svg');
import * as hightlight from 'highlight.js';
import {Tooltip} from 'antd';

import 'highlight.js/styles/xcode.css';

interface CodeBoxPropsInterface {
    title: string;
    desc: string;
    code: string;
    language: string;
}

interface CodeBoxStateInterface {
    expand: boolean;
}

export class CodeBox extends React.Component<CodeBoxPropsInterface, CodeBoxStateInterface> {
    constructor() {
        super();
        
        this.state = {
            expand: false
        };
        
        this.handleClick = this.handleClick.bind(this);
    }
    
    private handleClick() {
        this.setState({
            expand: !this.state.expand
        });
    }
    
    componentDidMount() {
        hightlight.initHighlightingOnLoad();
    }
    
    render() {
        return (
            <div className="codebox">
                <div className="codebox-demo">
                    <Render code={this.props.code} />    
                </div>
                
                <div className="codebox-markdown">
                    <div className="codebox-title">{this.props.title}</div>
                    <div className="codebox-content" dangerouslySetInnerHTML={{__html: this.props.desc}} />
                    <span className="expand-icon" onClick={this.handleClick}>
                        <Tooltip title="show code">
                            <img style={{display: !this.state.expand ? 'block' : 'none'}} src={unExpand} />
                        </Tooltip>
                        <Tooltip title="hide code">
                            <img style={{display: this.state.expand ? 'block' : 'none'}} src={expanded} />
                        </Tooltip>
                    </span>
                </div>
                <div style={{display: this.state.expand ? 'block' : 'none'}} className="codeblock-wrapper">
                    <pre><code className="json">{this.props.code.trim()}</code></pre>
                </div>
            </div>
        );        
    }
}