import * as React from 'react';
import {lexer, parser} from 'marked';
import {CodeBox} from './CodeBox';

interface GuidePreviewPropsInterface {
    md: string;
}

export class GuidePreview extends React.Component<GuidePreviewPropsInterface, {}> {
    static defaultProps = {
        md: ''
    };
    
    constructor() {
        super();
    }
    
    private parseRcreCodeBlock(md: string) {
        let tokens: any = lexer(md, {
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: true
        });
        let raw: any = [[]];
        let groupIndex = 0;
        let links = tokens.links;
        
        tokens.forEach((token: any) => {
            switch (token.type) {
                case 'code':
                    let lang = token.lang || 'text';
                    let code = token.text;
                    
                    raw[++groupIndex] = {
                        language: lang,
                        code: code
                    };
                    raw[++groupIndex] = [];
                    break;
                default:
                    raw[groupIndex].push(token);          
            }
        });
        
        return {
            raw,
            links
        };
    }
    
    render() {
        let md = this.props.md;
        let groupInfo = this.parseRcreCodeBlock(md);
        let raw = groupInfo.raw;
        let links = groupInfo.links;
        let elements = raw.map((group: any) => {
            if (group.language && group.code) {
                return (
                    <CodeBox 
                        title={group.title} 
                        desc={group.desc} 
                        code={group.code}
                        mode={'content'}
                        language={group.language}
                    />
                );
            } else {
                group.links = links;
                return <div dangerouslySetInnerHTML={{__html: parser(group)}} />;
            }
        });
        
        return (
            <div className="markdown">
                {elements}
            </div>
        );
    }
}