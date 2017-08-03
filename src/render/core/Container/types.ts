import * as React from 'react';
import {IsDefined, IsNotEmpty, IsString} from 'class-validator';
import { Map } from 'immutable';
import { SET_DATA_PAYLOAD } from './action';

export type rawJSONType = string | number | null | boolean | Object;
export type originJSONType = rawJSONType | rawJSONType[];

export type defaultData = {
    [s: string]: originJSONType
};

export class ContainerBasicPropsInterface {
    @IsString()
    @IsDefined()
    type: string;
    
    @IsString()
    api?: string;
    
    @IsNotEmpty()
    data?: defaultData;
}

export class ContainerProps extends ContainerBasicPropsInterface {
    '$data': Map<string, any>;
    setData: (payload: SET_DATA_PAYLOAD) => void;
}

export class BasicContainer <T extends ContainerBasicPropsInterface, P> extends React.Component<T, P> {
    constructor() {
        super();
    }
    
    emitChange(payload: any) {
        console.error('emitChange 没有被实现');
    }
}