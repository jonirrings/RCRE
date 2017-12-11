import * as React from 'react';
import './CodeBox.css';
import {Render} from '../render/index';
import {Tooltip, Tabs} from 'antd';
import {HighLight} from './HighLight';
import classNames from 'classnames';

const TabPane = Tabs.TabPane;

let unExpand = require('./img/unExpand.svg');
let expanded = require('./img/expanded.svg');

interface CodeBoxPropsInterface {
    title: string;
    desc: string;
    code: string;
    language: string;
    mode?: string;
}

interface CodeBoxStateInterface {
    expand: boolean;
}

export class CodeBox extends React.Component<CodeBoxPropsInterface, CodeBoxStateInterface> {
    static defaultProps = {
        mode: 'demo'
    };
    
    constructor() {
        super();

        this.state = {
            expand: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        let mode = 'exec';
        
        if (this.props.language !== 'json') {
            mode = 'preview';
        }
        let classText = classNames({
            [this.props.language]: true,
            'codeblock-wrapper': true
        });
        
        if (mode === 'preview') {
            return (
                <HighLight className={this.props.language}>
                    {this.props.code.trim()}
                </HighLight>
            );
        }
        
        let extendBox = (
            <div className="codebox-markdown">
                {this.props.title && <div className="codebox-title">{this.props.title}</div>}
                {
                    this.props.desc &&
                        <div className="codebox-content" dangerouslySetInnerHTML={{__html: this.props.desc}} />
                }
                <span className="expand-icon" onClick={this.handleClick}>
                    <Tooltip title="show code">
                        <img style={{display: !this.state.expand ? 'block' : 'none'}} src={unExpand}/>
                    </Tooltip>
                    <Tooltip title="hide code">
                        <img style={{display: this.state.expand ? 'block' : 'none'}} src={expanded}/>
                    </Tooltip>
                </span>
            </div>
        );
        
        let renderZone;
        
        if (this.props.mode === 'content') {
            renderZone = (
                <div className={'codebox'}>
                    <Tabs defaultActiveKey="1" animated={false}>
                        <TabPane tab="渲染结果" key="1">
                            <Render code={this.props.code}/>
                        </TabPane>
                        <TabPane tab="Code" key="2">
                            <div className={'codeblock-wrapper'}>
                                <HighLight className={classText}>
                                    {this.props.code.trim()}
                                </HighLight>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            );
        } else {
            renderZone = (
                <div className="codebox">
                    <div className={'codebox-' + this.props.mode}>
                        <Render code={this.props.code}/>
                    </div>
                    {
                        this.props.mode === 'demo' && extendBox
                    }
                    <div style={{display: this.state.expand ? 'block' : 'none'}} className="codeblock-wrapper">
                        <HighLight className={this.props.language}>
                            {this.props.code.trim()}
                        </HighLight>
                    </div>
                </div>
            );
        }
        
        return renderZone;
    }

    private handleClick() {
        this.setState({
            expand: !this.state.expand
        });
    }
}