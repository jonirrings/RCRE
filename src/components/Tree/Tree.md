# Tree 树状结构

使用树控件可以完整展现其中的层级关系，并具有展开收起选择等交互功能。

## 代码演示

{{demo}}

## API

### 树配置

| 属性        | 说明                              | 类型             | 是否必须  | 默认值   |
| --------- | ------------------------------- | -------------- | ----- | ----- |
| name      | 数据模型Key，会自动处理onSelect事件，并自动同步数据 | string         | false | -     |
| options   | 节点配置，具体配置请看树节点配置                | TreeNodeConfig | true  | -     |
| checkable | 是否支持添加多选框                       | boolean        | false | false |
| multiple  | 是否支持多次选择                        | boolean        | false | false |
| showLine  | 是否添加连接线                         | boolean        | false | false |

### 树节点配置

| 属性              | 说明    | 类型               | 是否必须  | 默认值   |
| --------------- | ----- | ---------------- | ----- | ----- |
| title           | 节点名称  | string           | true  | -     |
| key             | 节点的值  | string           | true  | -     |
| children        | 字级节点  | TreeNodeConfig[] | true  | -     |
| disableCheckbox | 禁用多选  | boolean          | false | false |
| disabled        | 禁用    | boolean          | false | false |
| selectable      | 是否可点击 | boolean          | false | false |

## Event

### onSelect 点击树节点
在默认情况下，添加了name属性的tre组件会自动处理onSelect事件，并将数据同步在所绑定的container组件上

| 参数           | 类型            | 描述           | 例如    |
| ------------ | ------------- | ------------ | ----- |
| selectedKeys | Array<string> | 被选中的Key组成的数组 | ['a'] |

### onCheck 点击节点复选框

| 参数          | 类型            | 描述            | 例如    |
| ----------- | ------------- | ------------- | ----- |
| checkedKeys | Array<string> | 被点击的多选框选中的Key | ['a'] |

