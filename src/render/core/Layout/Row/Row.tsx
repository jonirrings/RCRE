import * as React from 'react';
import * as PropTypes from 'prop-types';
import {BasicConfig, BasicContainerPropsInterface, ContainerProps} from '../../Container/types';
import {IsNumber, Validate} from 'class-validator';
import {IsValidEnums} from '../../../util/validators';
import Container from '../../Container/index';
import {Row} from 'antd';
import createElement from '../../../util/createElement';
import componentLoader from '../../../util/componentLoader';

// import FormItem, {FormItemPropsInterface} from '../../../../abstractComponents/Form/FormItem';

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

export class RowPropsInterface extends BasicContainerPropsInterface {
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
            justify: info.justify || 'space-between',
            gutter: info.gutter,
            type: 'flex'
        };
    }

    render() {
        let children = this.props.info.children.map((item, index) => {
            let Wrapper;
            let WrapperInterface;

            // Wrapper container component which have data properties
            if (item.data && !this.context.form) {
                Wrapper = Container;
                WrapperInterface = ContainerProps;
            } else {
                let componentInfo = componentLoader.getAbstractComponent(item.type);
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

            return createElement(Wrapper, WrapperInterface, Object.assign({}, this.props, childProps));
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