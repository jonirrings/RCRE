import * as React from 'react';
import {Render, store} from '../render/index';
import * as renderer from 'react-test-renderer';
// import {Map} from 'immutable';
import {actionCreators} from '../render/core/Container/action';
import {configure, render} from 'enzyme';

let Adapter = require('enzyme-adapter-react-15');

configure({
    adapter: new Adapter()
});

describe('Container SnapShot Test', () => {
    beforeEach(() => {
        store.dispatch(actionCreators.clearData());
    });

    // it('simple snapshot', () => {
    //     const json = {
    //         body: [
    //             {
    //                 type: 'container',
    //                 model: 'textField',
    //                 children: [
    //                     {
    //                         type: 'text',
    //                         text: 'helloworld'
    //                     }
    //                 ]
    //             }
    //         ]
    //     };
    //    
    //     class RCRE extends React.Component {
    //         render() {
    //             return <Render code={JSON.stringify(json)} />;
    //         }
    //     }
    //
    //     const element = <RCRE />;
    //     const component = renderer.create(element);
    //     let tree = component.toJSON();
    //     expect(tree).toMatchSnapshot();
    //
    //     let state: any = store.getState();
    //     expect(state.container).toBeInstanceOf(Map);
    //     expect(state.container.get('textField')).toBeInstanceOf(Map);
    //     expect(state.container.get('textField').size).toBe(0);
    // });
    //
    // it('$parent props parse', () => {
    //     const json = {
    //         body: [
    //             {
    //                 type: 'container',
    //                 model: 'textField',
    //                 data: {
    //                     name: 1
    //                 },
    //                 children: [
    //                     {
    //                         type: 'container',
    //                         model: 'innerTextField',
    //                         data: {
    //                             name: '$parent.name'
    //                         },
    //                         children: [
    //                             {
    //                                 type: 'text',
    //                                 text: 'helloworld'
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             }
    //         ]
    //     };
    //
    //     const element = <Render code={JSON.stringify(json)} />;
    //     const component = renderer.create(element);
    //     let tree = component.toJSON();
    //     expect(tree).toMatchSnapshot();
    //
    //     let state: any = store.getState();
    //     expect(state.container).toBeInstanceOf(Map);
    //     expect(state.container.get('textField')).toBeInstanceOf(Map);
    //     expect(state.container.get('textField').size).toBe(1);
    //     expect(state.container.get('textField').get('name')).toBe(1);
    //     expect(state.container.get('innerTextField').get('name')).toBe(1);
    // });

    it('container child props parse', async () => {
        store.dispatch(actionCreators.clearData());
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
                                    text: '$data.text'
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        const element = <Render code={JSON.stringify(json)} />;
        const component = renderer.create(element);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
        let state = store.getState();
        expect(state.container.get('textField').get('name')).toBe(1);
        expect(state.container.get('innerTextField').get('name')).toBe(1);

        store.dispatch(actionCreators.clearData());

        const wrapper = render(element);
        console.log(wrapper);
    });
});