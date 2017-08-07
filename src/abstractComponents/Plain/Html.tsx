import * as React from 'react';
import { IsString, IsDefined } from 'class-validator';

export class HtmlPropsInterface {
    @IsString()
    @IsDefined()
    type: string;
    
    @IsString()
    @IsDefined()
    html: string;
}

class Html extends React.Component<HtmlPropsInterface, {}> {
    constructor() {
        super();
    }
    
    render() {
        
        return (
            <div dangerouslySetInnerHTML={{__html: this.props.html}} />
        );
    }
}

export default Html;