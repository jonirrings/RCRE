import * as React from 'react';
import './CodeBox.css';
import {Render} from '../render/index';
import {Tooltip} from 'antd';

let unExpand = require('./img/unExpand.svg');
let expanded = require('./img/expanded.svg');
let Highlight = require('react-highlight');

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
                    <Highlight className="json">
                        {this.props.code.trim()}
                    </Highlight>
                </div>
            </div>
        );        
    }
}