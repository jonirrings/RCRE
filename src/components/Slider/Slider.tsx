import * as React from 'react';
import {CSSProperties} from 'react';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {IsBoolean} from 'class-validator';
import componentLoader from '../../render/util/componentLoader';
import {Slider} from 'antd';
import {SliderProps} from 'antd/lib/slider';

export class SliderConfig extends BasicConfig {
    /**
     * 初始值
     */
    defaultValue: number | [number, number] | undefined;

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

    /*
     * Slider 会把当前值传给 tipFormatter，并在 Tooltip 中显示 tipFormatter 的返回值
     */
    step: number | void;

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
    }

    private mapSliderProps(info: SliderConfig): SliderProps {
        return {
            defaultValue: info.defaultValue,
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

    render() {
        let info = this.getPropsInfo(this.props.info);

        let sliderProps = this.mapSliderProps(info);

        return (
            <Slider
                {...sliderProps}
                onAfterChange={(value: number) => {
                    this.commonEventHandler('onAfterChange', {
                        value: value
                    });
                }}
                onChange={(value: number) => {
                    this.commonEventHandler('onChange', {
                        value: value
                    });
                }}
            />
        );
    }
}

componentLoader.addComponent('Slider', AbstractSlider, SliderPropsInterface);