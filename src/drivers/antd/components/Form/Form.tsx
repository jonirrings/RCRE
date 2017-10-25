// import * as React from 'react';
// import {Form} from 'antd';
// import {FormConfig, FormPropsInterface} from '../../../../components/Form/Form';
// import {FormProps} from 'antd/lib/form/Form';
//
// export default class AntForm extends React.Component<FormPropsInterface, {}> {
//     constructor() {
//         super();
//
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//    
//     private mapOptions(props: FormConfig): FormProps {
//         return {
//             layout: 'horizontal'
//         };
//     }
//
//     render() {
//         let options = this.mapOptions(this.props.info);
//
//         return (
//             <Form
//                 onSubmit={this.handleSubmit}
//                 {...options}
//             >
//                 {this.props.children}
//             </Form>
//         );
//     }
//
//     private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//         event.preventDefault();
//         this.props.onSubmit(event);
//     }
// }