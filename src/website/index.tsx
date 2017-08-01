import * as React from 'react';
import { parse } from 'marked'; 

import './index.css';

let plan = require('../doc/plan.md');
let developerGuide = require('../doc/developer_guide.md');
let formItem = require('../doc/formItem.md');

interface GaeaDocStateInterface {
    html: string;
}

class GaeaDoc extends React.Component<{}, GaeaDocStateInterface> {
    constructor() {
        super();
        this.state = {
            html: ''
        };
    }
    
    async getDocContent(sourceUrl: string) {
        try {
            let res = await fetch(sourceUrl);
            let text = await res.text();
            return parse(text);
        } catch (e) {
            console.error(e);
            return '';
        }
    }
    
    async componentWillMount() {
        let html = await this.getDocContent(plan);
        
        this.setState({
            html
        });
    }
    
    switchDoc(docType: string) {
        return async () => {
            let html = await this.getDocContent(docType);
            
            this.setState({
                html: html
            });
        };
    }
    
    render() {
        return (
            <div className="doc-wrapper">
                <ul>
                    <li><a onClick={this.switchDoc(plan)}>Plan</a></li>
                    <li><a onClick={this.switchDoc(developerGuide)}>DeveloperGuide</a></li>
                    <li><a onClick={this.switchDoc(formItem)}>formItem</a></li>
                </ul>
                
                <div dangerouslySetInnerHTML={{__html: this.state.html}} />    
            </div>
        );
    }
}

export default GaeaDoc;