# Input 输入框

通过键盘或者鼠标来输入内容，结合`FormItem`+`container`组件就能实现完整的表单验证功能

提示：
推荐使用[Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?utm_source=chrome-ntp-icon)来实时查看当前输入框的数据模型数据。

## 代码演示

{{demo}}

-----
## API

|         属性          |                说明                |                    类型                    |  是否必须 | 默认值   |
| :-----------------: | :------------------------------: | :--------------------------------------: | :-----: | :-----: | 
| name | Input的数据模型Key | string | true | -
| inputType | 输入框类型 | text, number, password, email, search | false | text
| id | 输入框ID | string | false | -
| size | 输入框大小 | default, large, small | false | default
| disabled | 是否禁用 | boolean | false | false
| addonBefore | 带标签的 input，设置前置标签 | string | false |-
| addonAfter |  带标签的 input，设置后置标签 | string | false | -
| placeholder | 没有输入展示的文字 | string | false |-
| readOnly | 设置只读 | boolean | false | false 
| prefix | 前置图标 | string | false | -
| suffix | 后置图标 | string | false | -
| spellCheck | 拼写检查 | boolean | false | false
| className | CSS Class | string | false | -
| style | 内联CSS属性 | CSSProperties | false | -
| autoFocus | 自动聚焦 | boolean | false | false


