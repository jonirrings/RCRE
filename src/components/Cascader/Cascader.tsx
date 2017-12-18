import * as React from 'react';
import {CSSProperties} from 'react';
import componentLoader from '../../render/util/componentLoader';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {IsBoolean, IsDefined, IsString} from 'class-validator';
import {CascaderOptionType, CascaderProps} from 'antd/lib/cascader';
import {Cascader, Spin} from 'antd';
import {compileValueExpress} from '../../render/util/vm';
import * as _ from 'lodash';

export class CascaderConfig extends BasicConfig {
    /**
     * Checkbox的数据模型Key
     */
    @IsDefined()
    name: string;

    /**
     * 是否支持清除
     */
    allowClear?: boolean;

    /**
     * CSS class
     */
    @IsString()
    className?: string;

    /**
     * 内联CSS属性
     */
    style?: CSSProperties;

    /**
     * 禁用
     */
    @IsBoolean()
    disabled?: boolean;

    /**
     * 次级菜单的展开方式，可选 'click' 和 'hover'
     */
    expandTrigger?: 'click' | 'hover';

    /**
     * 可选项数据源
     */
    options: CascaderOptionType[];

    /**
     * 自定义浮层类名
     */
    popupClassName?: string;

    /**
     *  浮层预设位置：`bottomLeft` `bottomRight` `topLeft` `topRight`
     */
    popupPlacement?: string;

    /**
     * 输入框占位文本
     */
    placeholder?: string;

    /**
     * 输入框大小，可选 `large` `default` `small`
     */
    size?: string;

    /**
     * 在选择框中显示搜索框
     */
    showSearch?: boolean;

    /**
     * options属性映射
     */
    optionsMapping?: CascaderOptionType;

    /**
     * 组件加载初始值
     */
    defaultValue: (string | number)[];

    /**
     * 选择即改变
     */
    changeOnSelect?: boolean;
}

export class CascaderPropsInterface extends BasicContainerPropsInterface {
    info: CascaderConfig;

    /**
     * 当标签页展开，用于自定义扩展
     */
    onPopupVisibleChange?: (popupVisible: boolean) => Object;

    /**
     * 当数据更新
     */
    onChange?: (value: string[], selectedOptions?: CascaderOptionType[]) => Object;
}

export class AbstractCascader extends BasicContainer<CascaderPropsInterface, {}> {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        if (this.props.info.defaultValue && this.props.$setData) {
            const $setData = this.props.$setData;
            setTimeout(() => {
                $setData(this.props.info.name, this.props.info.defaultValue);
            });
        }
    }

    private mapCascaderOptions(info: CascaderConfig): CascaderProps {
        return {
            style: info.style,
            className: info.className,
            popupClassName: info.popupClassName,
            popupPlacement: info.popupPlacement,
            placeholder: info.placeholder,
            size: info.size,
            disabled: info.disabled,
            allowClear: info.allowClear,
            expandTrigger: info.expandTrigger,
            showSearch: info.showSearch,
            changeOnSelect: info.changeOnSelect,
            options: []
        };
    }

    private handleChange(value: string[], selectedOptions?: CascaderOptionType[]) {
        if (this.props.$setData) {
            this.props.$setData(this.props.info.name, value);
        }
        
        this.commonEventHandler('onChange', {
            value, 
            selectedOptions
        });
    }

    private mapOptions(options: CascaderOptionType[], optionsMapping: CascaderOptionType) {
        return options.map(op => {
            let runTime = this.getRuntimeContext(this.props, this.context);
            let newObj = compileValueExpress(optionsMapping, {
                ...runTime,
                $item: op
            })!;

            if (_.isArray(op.children) && op.children.length > 0) {
                op.children = this.mapOptions(op.children, optionsMapping);
            }

            return Object.assign(op, newObj);
        });
    }

    render() {
        let info = this.getPropsInfo(this.props.info, this.props, ['optionsMapping']);

        if (!info.name) {
            return <div>name property is required for Cascader Element</div>;
        }

        if (!this.props.$data) {
            if (this.context.debug) {
                return <div>Cascader Element is out of RCRE control, please put it inside container component</div>;
            } else {
                return <div/>;
            }
        }

        let $loading = this.props.$data.get('$loading') || false;

        if (!Array.isArray(info.options)) {
            if (this.context.debug) {
                return <div>options props is required for Cascader Element</div>;
            } else {
                return (
                    <Spin spinning={$loading}>
                        <Cascader
                            options={[]}
                            style={
                                {
                                    width: '100%'
                                }
                            }
                        />
                    </Spin>
                );
            }
        }

        let $data = this.props.$data;
        let value = $data.get(info.name);
        let options = info.options;

        if (_.isPlainObject(info.optionsMapping)) {
            options = this.mapOptions(options, info.optionsMapping!);
        }

        let cascaderOptions = this.mapCascaderOptions(info);

        let cascaderElement = React.createElement(Cascader, {
            ...cascaderOptions,
            options: options,
            value: value,
            onChange: this.handleChange,
            onPopupVisibleChange: (popupVisible: boolean) => {
                this.commonEventHandler('onPopupVisibleChange', {
                    popupVisible
                });
            }
        });

        return (
            <Spin spinning={$loading} wrapperClassName="rcre-spin">
                {cascaderElement}
            </Spin>
        );
    }
}

componentLoader.addComponent('cascader', AbstractCascader, CascaderPropsInterface);