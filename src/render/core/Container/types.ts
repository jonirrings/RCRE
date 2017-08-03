import * as React from 'react';
import {IsDefined, IsNotEmpty, IsString} from 'class-validator';

type defaultData = {
    [s: string]: any
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

export class BasicContainer <T extends ContainerBasicPropsInterface, P> extends React.Component<T, P> {
    constructor() {
        super();
    }
}