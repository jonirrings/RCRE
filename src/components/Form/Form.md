# Form 表单容器

表单容器

## 代码演示

{{demo}}

## API

**Form**

| 属性        | 说明     | 类型               | 是否必须  | 默认值   |
| --------- | ------ | ---------------- | ----- | ----- |
| children | 子级元素 | BasicConfig[] | true | - |

**FormGroup**

| 属性        | 说明     | 类型               | 是否必须  | 默认值   |
| --------- | ------ | ---------------- | ----- | ----- |
| control | 控制的表单组件，只能放置一个组件 | BasicConfig | true | - |
| label | 表单描述文字 | string | false | - |
| labelGrid.gridCount | 描述文字的相对布局 | number | false | 2 |
| labelGrid.gridWidth | 描述文字的宽度 | number | false | - |
| labelGrid.gridLeft | 描述文字的相对左偏移 | number | false | - |
| labelGrid.gridTop | 描述文字的相对上偏移 | number | false| - |
| labelStyle | 描述文字的自定义CSS样式 | CSSProperties | false | - |

## 事件

**Form**


| 事件名称        | 触发条件   | 参数   |
| ----------- | ------ | ---- |
| onSubmit     | 当表单提交   | $args，字段参数根据表单内定义的name字段来判别  |