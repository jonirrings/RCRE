# Cascader 级联选择

级联选择器, 移植于ant.design的Cascader组件 https://ant.design/components/cascader-cn/

## 代码演示

{{demo}}

----
## API

|         属性          |                说明                |           类型         |   是否必须 | 默认值   |
| :-----------------: | :------------------------------: | :--------------------------------------: | :-----: | :-----: |
| name | Cascader的数据模型Key | string | true| -
| allowClear | 是否支持清除 | boolean | false |-
| className | CSS class | string | false | -
| style | CSS 内联属性 | CSSProperties | false | -
| disabled | 禁用 | boolean | false | false
| expandTrigger | 次级菜单的展开方式，可选 'click' 和 'hover' | string | false | 'click'
| options | 选项数据源 | CascaderOptionType[] | false | -
| popupClassName | 自定义浮层类名 | string | false | -
| popupPlacement | 浮层预设位置：`bottomLeft` `bottomRight` `topLeft` `topRight` | string | false | -
| placeholder | 输入框占位文本 | string | false | -
| size | 输入框大小，可选 `large` `default` `small` | 'large', 'default', 'small' | false| default
| optionsMapping | options属性值映射 | CascaderOptionType | false | -


## 选项数据源API
|         属性          |                说明                |                    类型             | 是否必须|   默认值   |
| :-----------------: | :------------------------------: | :--------------------------------------: | :-----: | :-----: |
| value | 选项的值 | string | true | -
| label | 选项显示出来的名称 | string | true | -
| disabled | 是否禁用 | boolean | false | -
| children | 字级选项 | CascaderOptionType | false | -