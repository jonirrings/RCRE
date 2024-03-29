import * as React from 'react';
import * as _ from 'lodash';
import paramsCheck from './paramCheck';
import {ValidationError} from 'class-validator';

export default function createElement<T>(component: React.ComponentClass<T>,
                                         componentInterFace?: Object,
                                         props?: React.Attributes & T, children?: React.ReactNode) {
    let validateResults: ValidationError[] = [];
    if (componentInterFace) {
        validateResults = paramsCheck(props, componentInterFace);    
    }

    if (validateResults.length > 0) {
        let errmsg = '';
        
        validateResults.forEach(item => {
            _.each(item.constraints, (msg, name) => {
                errmsg += `${name}: ${msg}\n`;
            });
        });
        return React.createElement('pre', props, errmsg); 
    }

    return React.createElement<T>(component, props, children);
}