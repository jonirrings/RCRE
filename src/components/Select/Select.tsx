import * as React from 'react';
import {BasicConfig, BasicContainer, BasicContainerPropsInterface} from '../../render/core/Container/types';
import {IsArray, IsBoolean, IsDefined, IsString, Validate} from 'class-validator';
import {IsValidEnums} from '../../render/util/validators';
import componentLoader from '../../render/util/componentLoader';
import {compileValueExpress} from '../../render/util/vm';
import {Select} from 'antd';
import {OptionProps, SelectProps, SelectValue} from 'antd/lib/select';
import {CSSProperties} from 'react';

const Option = Select.Option;
export class SelectConfig extends BasicConfig {
    /**
     * Select的数据模型Key
     */
    @IsDefined()
    name: string;
    
    /**
     * 下拉框模式
     * @public
     * @default ''
     */
    @IsString()
    mode?: 'default' | 'multiple' | 'tags' | 'combobox';

    /**
     * 支持清除
     * @public
     * @default false
     */
    @IsBoolean()
    allowClear?: boolean;

    /**
     * 输入框默认文字
     * @public
     * @default ''
     */
    @IsString()
    placeholder?: string;

    /**
     * 选择框大小，可选 large small default
     * @public
     * @default default
     */
    @Validate(IsValidEnums, ['large', 'small', 'default'])
    size?: 'default' | 'large' | 'small';

    /**
     * 是否禁用
     * @public
     * @default false
     */
    @IsBoolean()
    disabled?: boolean;

    /**
     * 回填到选择框的 Option 的属性值，默认是 Option 的子元素。比如在子元素需要高亮效果时，此值可以设为 value。
     */
    @IsString()
    optionLabelProp?: string;

    /**
     * 下拉菜单和选择器同宽
     */
    @IsBoolean()
    dropdownMatchSelectWidth?: boolean;

    /**
     * 搜索时过滤对应的 option 属性，如设置为 children 表示对内嵌内容进行搜索
     */
    @IsString()
    optionFilterProp?: string;

    /**
     * 是否默认高亮第一个选项。
     */
    @IsString()
    defaultActiveFirstOption?: boolean;

    /**
     * 在 tags 和 multiple 模式下自动分词的分隔符
     */
    @IsArray()
    tokenSeparators: string[];

    /**
     * 是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 string 变为 {key: string, label: ReactNode} 的格式
     */
    @IsBoolean()
    labelInValue?: boolean;

    /**
     * CSS样式
     */
    style?: CSSProperties;

    /**
     * CSS class
     */
    @IsString()
    className?: string;
    /**
     * 下拉框列表
     */
    @IsDefined()
    options: OptionConfig[];

    /**
     * 下拉框字段重写
     */
    optionsMapping?: OptionConfig;
}

export class OptionConfig {
    /**
     * 下拉框展示的内容
     * @public
     */
    @IsDefined()
    @IsString()
    key: string;

    /**
     * 下拉框提交的内容
     * @public
     */
    @IsString()
    @IsDefined()
    value: string;

    /**
     * 是否禁用
     * @public
     * @default false
     */
    @IsBoolean()
    disabled: boolean;
}

export class SelectPropsInterface extends BasicContainerPropsInterface {
    info: SelectConfig;
}

export default class AbstractSelect extends BasicContainer<SelectPropsInterface, {}> {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
    }

    private handleChange(value: SelectValue) {
        if (this.props.$setData) {
            this.props.$setData(this.props.info.name, value);
        }
    }

    private applyMapping<T>(data: T, mappingConfig: T, index: number): T {
        let context = {
            $iterator: data,
            $index: index,
            $data: {}
        };

        if (this.props.$data) {
            context.$data = this.props.$data.toObject();
        }

        let newObj = compileValueExpress(mappingConfig, context);
        return Object.assign(data, newObj);
    }

    private mapSelectOptions(info: SelectConfig): SelectProps {
        return {
            mode: info.mode,
            optionLabelProp: info.optionLabelProp,
            dropdownMatchSelectWidth: info.dropdownMatchSelectWidth,
            optionFilterProp: info.optionFilterProp,
            defaultActiveFirstOption: info.defaultActiveFirstOption,
            labelInValue: info.labelInValue,
            tokenSeparators: info.tokenSeparators,
            className: info.className
        };
    }

    private mapOptionOptions(op: OptionConfig): OptionProps {
        return {
            disabled: op.disabled,
            value: op.value
        };
    }

    render() {
        let info = this.getPropsInfo(this.props.info);

        if (!info.name) {
            return <div>name property is required for Select Element</div>;
        }

        if (!this.props.$data) {
            return <div>Select Element is out of RCRE control, please put it inside container component</div>;
        }
        
        let options: OptionConfig[] = info.options || [];
        if (info.optionsMapping && Array.isArray(info.options)) {
            options = info.options.map((item, index) => this.applyMapping(item, info.optionsMapping, index)!);
        }
        
        let Options = options.map(op => {
            let opOptions = this.mapOptionOptions(op);
            
            return React.createElement(Option, {
                key: op.key,
                ...opOptions
            }, op.key);
        });
        
        let selectOptions = this.mapSelectOptions(info);
        
        let value = this.props.$data.get(info.name);
        
        return React.createElement(Select, {
            onChange: this.handleChange,
            value: value,
            style: {
                width: '100%',
                ...info.style
            },
            onSelect: (val: SelectValue, option: Object) => {
                this.commonEventHandler('onSelect', [val, option]);
            },
            onDeselect: (val: SelectValue) => {
                this.commonEventHandler('onDeselect', [val]);
            },
            onBlur: () => {
                this.commonEventHandler('onBlur', [], true);
            },
            onFocus: () => {
                this.commonEventHandler('onFocus', [], true);
            },
            ...selectOptions
        }, Options);
    }
    
    private commonEventHandler(eventName: string, args: any[], mute: boolean = false) {
        if (this.props.eventHandle) {
            this.props.eventHandle(eventName, args);
        } else if (!mute) {
            console.error('Event System only can work with container component');
        }
    }
}

componentLoader.addComponent('select', AbstractSelect, SelectPropsInterface);
