import * as React from 'react';
import {lexer, parse, parser} from 'marked';
import * as _ from 'lodash';
import {CodeBox} from './CodeBox';
import {Col} from 'antd';

export interface ComponentPreviewPropsInterface {
    activeKey: string;
    map: any;
}

export type DemoItem = {
    title: string;
    desc: string;
    code: string;
    language: string;
};

export class ComponentPreview extends React.Component<ComponentPreviewPropsInterface, {}> {
    constructor() {
        super();
    }

    render() {
        let activeKey = this.props.activeKey;
        if (!this.props.map) {
            console.error('can not find matched doc from activeKey', activeKey);
            return <div/>;
        }

        let info = this.props.map[activeKey];
        let homeDoc: string = info.index;

        let {
            title,
            api
        } = this.getHomeChunks(homeDoc);

        let demos = info.demo;
        let leftGroup: DemoItem[] = [];
        let rightGroup: DemoItem[] = [];

        let count = 0;
        _.each(demos, (demo) => {
            let demoInfo: DemoItem = this.parseDemo(demo);

            if (count % 2 === 0) {
                leftGroup.push(demoInfo);
            } else {
                rightGroup.push(demoInfo);
            }

            count++;
        });

        return (
            <div className="preview-container">
                <div className="markdown" dangerouslySetInnerHTML={{__html: parse(title)}}/>
                <Col span={12} style={{padding: '0 15px'}}>
                    {
                        leftGroup.map((demo, index) => {
                            return (
                                <CodeBox
                                    key={index}
                                    title={demo.title}
                                    desc={demo.desc}
                                    code={demo.code}
                                    language={demo.language}
                                />
                            );
                        })
                    }
                </Col>
                <Col span={12}>
                    {
                        rightGroup.map((demo, index) => {
                            return (
                                <CodeBox
                                    key={index}
                                    title={demo.title}
                                    desc={demo.desc}
                                    code={demo.code}
                                    language={demo.language}
                                />
                            );
                        })
                    }
                </Col>
                <div className="markdown" dangerouslySetInnerHTML={{__html: parse(api)}}/>
            </div>
        );
    }

    private getHomeChunks(homeDoc: string) {
        const matchRegex = /{{demo}}/;

        if (!matchRegex.test(homeDoc)) {
            return {
                title: homeDoc,
                api: ''
            };
        }

        const homeChunks = homeDoc.split(matchRegex);

        return {
            title: homeChunks[0],
            api: homeChunks[1]
        };
    }

    private parseDemo(demoDoc: string): DemoItem {
        let tokens: any = lexer(demoDoc, {
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: true
        });
        let title = '';
        let desc = '';
        let code = '';
        let language = '';
        let otherTokens: any = [];

        tokens.map((token: any) => {
            switch (token.type) {
                case 'heading': {
                    title = token.text;
                    break;
                }
                case 'code': {
                    code = token.text;
                    language = token.lang;
                    break;
                }
                default:
                    otherTokens.push(token);
                    break;
            }
        });
        
        otherTokens.links = tokens.links;
        
        desc = parser(otherTokens);

        return {
            title: title,
            desc: desc,
            code: code,
            language: language
        };
    }
}