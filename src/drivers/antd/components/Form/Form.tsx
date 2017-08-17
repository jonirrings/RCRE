import * as React from 'react';
import { Form } from 'antd';
import {FormConfig, FormPropsInterface} from '../../../../abstractComponents/Form/Form';
import {FormProps} from 'antd/lib/form/Form';

export default class AntForm extends React.Component<FormPropsInterface, {}> {
    constructor() {
        super();
    }
    
    private mapOptions(props: FormConfig): FormProps {
        return {
            layout: 'horizontal'
        };
    }

    render() {
        let options = this.mapOptions(this.props.info);
        return (
            <Form {...options}>
                {this.props.children}
            </Form>
        );
    }
}