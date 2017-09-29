import * as React from 'react';
import {BasicFormItemConfig, BasicFormItemPropsInterface} from '../Form/types';
import {IsBoolean, IsDefined, IsString, Validate} from 'class-validator';
import {IsPageInfo, IsValidEnums} from '../../render/util/validators';
import {BasicFormItem} from '../Form/FormItem';
import Trigger from '../../render/core/Trigger/Trigger';
import {isExpression, runInContext} from '../../render/util/vm';
import * as _ from 'lodash';

export class SelectConfig extends BasicFormItemConfig {
    /**
     * 下拉框模式
     * @public
     * @default ''
     */
    @IsString()
    mode?: 'multiple' | 'tags' | 'combobox';

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
     * 下拉框列表
     */
    @IsDefined()
        // TODO Option validate
    options: OptionConfig[];

    /**
     * 下拉框字段重写
     */
    optionsMapping: OptionConfig;
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

export class SelectPropsInterface extends BasicFormItemPropsInterface {
    @Validate(IsPageInfo, [SelectConfig])
    info: SelectConfig;
}

class AbstractSelect extends BasicFormItem<SelectPropsInterface, {}> {
    constructor() {
        super();
    }

    render() {
        let info = _.cloneDeep(this.props.info);

        if (info.optionsMapping && !isExpression(info.options)) {
            info.options = info.options.map((item, index) => this.applyMapping(item, info.optionsMapping, index));
        }

        if (isExpression(info.options)) {
            info.options = [];
        }

        let childProps = Object.assign({}, this.props, {
            value: this.getChildValue(),
            onChange: this.handleChange,
            info: info
        });

        let children = React.createElement(Trigger, childProps);

        return this.renderChildren(children);
    }

    private applyMapping<T>(data: T, mappingConfig: T, index: number): T {
        let copy = data;

        _.each<T>(mappingConfig, (expression: keyof T, key: string) => {
            let ret = runInContext(expression, {
                $iterator: copy,
                $index: index
            });

            if (!_.isNil(ret)) {
                copy[key] = ret;
            }
        });

        return copy;
    }
}

export default AbstractSelect;