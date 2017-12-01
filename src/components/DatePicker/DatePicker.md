# DatePicker 时间选择器

用于选择年月日。

## 代码演示

{{demo}}

## API

| 属性        | 说明     | 类型               | 是否必须  | 默认值   |
| --------- | ------ | ---------------- | ----- | ----- |
| name | Datepicker的数据模型Key | string | true | - |
| disabled | 是否禁用 | boolean | false | false |
| startTime | 开始时间 | string, number | false | -
| endTime | 结束时间 | string,number | false | -
| placeholder | 输入框提示文字 | string | false | -
| format | 展示的日期格式，配置参考 moment.js | string | false | -
| showToday | 是否展示“今天”按钮 | boolean | false | true | 
| size | 输入框大小 | large, small | false | -
| defaultValue | 初始日期 | ExpressionString | false | - |