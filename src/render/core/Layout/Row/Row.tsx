import * as React from 'react';
import * as PropTypes from 'prop-types';
import {BasicConfig, ContainerBasicPropsInterface, ContainerProps} from '../../Container/types';
import {IsNumber, Validate} from 'class-validator';
import {IsValidEnums} from '../../../util/validators';
import Container from '../../Container/index';
import {Row} from 'antd';
import {DriverController} from "../../../../drivers/index";
import createElement from "../../../util/createElement";
import FormItem, {FormItemPropsInterface} from '../../../../abstractComponents/Form/FormItem';

export class RowConfig extends BasicConfig {
    /**
     * flex 布局下的垂直对齐方式：top middle bottom
     * @public
     * @default top
     */
    @Validate(IsValidEnums, ['top', 'middle', 'bottom'])
    align?: 'top' | 'middle' | 'bottom';

    /**
     * flex 布局下的水平排列方式：start end center space-around space-between
     * @public
     * @default start
     */
    @Validate(IsValidEnums, ['start', 'end', 'center', 'space-around', 'space-between'])
    justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';

    /**
     * 栅格间隔
     * @public
     * @default 0
     */
    @IsNumber()
    gutter?: number;

    /**
     * 自定义样式属性
     */
    style?: React.CSSProperties;

    /**
     * 字级container组件
     */
    children: BasicConfig[];
}

export class RowPropsInterface extends ContainerBasicPropsInterface {
    info: RowConfig;
}

export class AntRowProps {
    align?: 'top' | 'middle' | 'bottom';
    justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
    gutter?: number;
    type?: 'flex';
}

export default class AbstractRow extends React.Component<RowPropsInterface, {}> {
    static contextTypes = {
        driver: PropTypes.object,
        form: PropTypes.bool
    };

    constructor() {
        super();
    }

    private mapOptions(info: RowConfig): AntRowProps {
        return {
            align: info.align,
            justify: info.justify,
            gutter: info.gutter,
            type: 'flex'
        };
    }

    render() {
        let children = this.props.info.children.map((item, index) => {
            let driver: DriverController = this.context.driver;
            let Wrapper;
            let WrapperInterface;

            // Wrapper container component which have data properties
            if (item.data) {
                Wrapper = Container;
                WrapperInterface = ContainerProps;
            } else {
                let componentInfo = driver.getComponent(item.type);
                if (!componentInfo) {
                    console.error(`can not find component of type ${item.type}`);
                    return <div key={index} />;
                }
                
                Wrapper = componentInfo.component;
                WrapperInterface = componentInfo.componentInterface;
            }
            
            let childProps = {
                info: item,
                key: index
            }; 
            
            let child = createElement(Wrapper, WrapperInterface, childProps);
            
            if (this.context.form) {
                return createElement(FormItem, FormItemPropsInterface, childProps, child);
            }

            return child;
        });

        const defaultStyle = {
            marginTop: 10,
            marginBottom: 10
        };

        return (
            <div style={Object.assign(defaultStyle, this.props.info.style || {})}>
                {React.createElement(Row, this.mapOptions(this.props.info), children)}
            </div>
        );

    }
}