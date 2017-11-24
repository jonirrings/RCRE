import * as React from 'react';
import {CSSProperties} from 'react';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {IsBoolean} from 'class-validator';
import componentLoader from '../../render/util/componentLoader';
import {Slider} from 'antd';
import {SliderProps} from 'antd/lib/slider';
import {parseExpressString} from '../../render/util/vm';

export class SliderConfig extends BasicConfig {
    /**
     * Slider组件的数据模型Key
     */
    name: string;

    /**
     * 初始化默认值
     */
    defaultValue: number | [number, number];

    /**
     * 是否禁用 默认false
     */
    @IsBoolean()
    disabled?: boolean;

    /**
     * 是否只能拖拽到刻度上, 默认false
     */
    @IsBoolean()
    dots?: boolean;

    /**
     * marks 不为空对象时有效，值为 true 时表示值为包含关系，false 表示并列
     */
    @IsBoolean()
    included?: boolean;

    /**
     * 刻度标记，key 的类型必须为 number 且取值在闭区间 min, max 内，每个标签可以单独设置样式
     */
    marks: Object;

    /**
     * 最大值
     */
    max: number;

    /**
     * 最小值
     */
    min: number;

    /**
     * 双滑块模式
     */
    @IsBoolean()
    range?: boolean;

    /**
     * Slider 会把当前值传给 tipFormatter，并在 Tooltip 中显示 tipFormatter 的返回值
     */
    step: number | void;

    /**
     * 使用ExpressString来格式化显示的值
     */
    tipFormat: string;

    /**
     * 设置当前取值.
     */
    value: number | [number, number] | undefined;

    /**
     * 设置为垂直方向
     */
    @IsBoolean()
    vertical?: boolean;

    /**
     * 内联CSS属性
     */
    style?: CSSProperties;
}

export class SliderPropsInterface extends BasicContainerPropsInterface {
    info: SliderConfig;
}

export class SliderStateInterface {

}

export class AbstractSlider extends BasicContainer<SliderPropsInterface, SliderStateInterface> {
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

    private mapSliderProps(info: SliderConfig): SliderProps {
        return {
            disabled: info.disabled,
            dots: info.dots,
            included: info.included,
            max: info.max,
            min: info.min,
            range: info.range,
            step: info.step,
            value: info.value,
            vertical: info.vertical
        };
    }

    /**
     * 对于onChange事件，要进行直接同步值到数据模型中
     * @param {number} value
     * @return {void}
     */
    private handleChange(value: number) {
        // 写入值到数据模型
        if (this.props.$setData) {
            this.props.$setData(this.props.info.name, value);
        }
    }

    render() {
        // 注意这里要把tipFormat给忽略掉，tipFormat要用自定义的方式来处理
        let info = this.getPropsInfo(this.props.info, this.props, ['tipFormat']);
        let sliderProps = this.mapSliderProps(info);
        
        // slider组件涉及到数据更改，有onChange回调，所以就需要name属性来设置数据模型Key
        if (!info.name) {
            const msg = 'name property is required for Slider Component';
            if (this.context.debug) {
                return <div>{msg}</div>;
            } else {
                console.error(msg);
            }
            return <div />;
        }
        
        // 数据模型是从container组件那里来的
        if (!this.props.$data) {
            const msg = 'slider component should be under container component';
            if (this.context.debug) {
                return <div>{msg}</div>;
            } else {
                console.error(msg);
            }
            return <div />;
        }
        
        // 从数据模型获取当前组件的值
        let storeValue = this.props.$data.get(info.name);
        
        // 使用Expression String来格式化输出
        if (info.tipFormat) {
            sliderProps.tipFormatter = (value: number) => {
                let runTime = this.getRuntimeContext();
                return parseExpressString(info.tipFormat, {
                    ...runTime,
                    $value: value
                });
            }; 
        }
        
        return (
            <Slider
                {...sliderProps}
                value={storeValue}
                onAfterChange={(value: number) => {
                    this.commonEventHandler('onAfterChange', {
                        value: value
                    });
                }}
                onChange={this.handleChange}
            />
        );
    }
}

componentLoader.addComponent('slider', AbstractSlider, SliderPropsInterface);