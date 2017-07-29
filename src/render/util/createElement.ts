import * as React from 'react';
import paramsCheck from './paramCheck';

export default function createElement<T>(component: React.ComponentClass<T>,
                                         componentInterFace: Object,
                                         props?: React.Attributes & T) {
    let validateResults = paramsCheck(props, componentInterFace);

    if (validateResults.length > 0) {
        validateResults.forEach(item => {
            console.error(item);
        });
    }

    return React.createElement<T>(component, props);
}