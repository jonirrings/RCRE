import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import App from './App';
import {Render} from './render/index';
import './index.css';
// import {actionCreators} from './render/core/Container/action';
//
// ReactDOM.render(
//     <App/>,
//     document.getElementById('root') as HTMLElement
// );

const json = {
    body: [
        {
            type: 'container',
            model: 'textField',
            data: {
                name: 1
            },
            dataProvider: {
                mode: 'ajax',
                initialLoad: {
                    url: 'http://cp01-ebg-nativeads-50.cp01.baidu.com:8088/dataquality/datarule/ruledetaillist',
                    method: 'GET'
                }
            },
            children: [
                {
                    type: 'container',
                    model: 'innerTextField',
                    data: {
                        name: '$parent.name'
                    },
                    children: [
                        {
                            type: 'text',
                            text: '$data.name'
                        }
                    ]
                }
            ]
        }
    ]
};

ReactDOM.render(
    <Render code={JSON.stringify(json)} global={{proxy: 'http://localhost:8800/proxy'}}/>,
    document.getElementById('app') as HTMLElement
);

// console.log(store.getState());
//
// store.dispatch(actionCreators.clearData());
// console.log(store.getState());

// ReactDOM.render(
//     <Render code={JSON.stringify(json)} />,
//     document.getElementById('root') as HTMLElement
// );