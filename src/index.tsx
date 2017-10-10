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
    <Render code={JSON.stringify(json)}/>,
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