# Button 按钮

主要的属性都是基于Ant.design的Button组件来实现的, 并做了一些简单的整合. 关于每个字段的详细使用方式, 可以参考: https://ant.design/components/button-cn/

## 代码演示

{{demo}}

-----
## API

|         属性          |                说明                |                    类型                    | 是否必须  |   默认值   |
| :-----------------: | :------------------------------: | :--------------------------------------: | :---: | :-----: |
|        text         |               按钮文字               |                  string                  | true  |  false  |
|     buttonType      |               按钮类型               | 'primary','dashed','danger','ghost', 'default' | false | default |
|      htmlType       |            按钮的HTML类型             | 设置 `button` 原生的 `type` 值，可选值请参考 [HTML 标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) | false | button  |
|       confirm       |            点击之后弹一个确认框            |                  object                  | false |    -    |
|    confirm.title    |              确定框的标题              |                  string                  | false |    -    |
|   confirm.okText    |              确认按钮文字              |                  string                  | false |   确认    |
| confirm. cancelText |              取消按钮文字              |                  string                  | false |   取消    |
|        icon         |             按钮的图标类型              |                  string                  | false |    -    |
|        shape        |    设置按钮形状，可选值为 `circle` 或者不设     |                  string                  | false |    -    |
|        size         | 设置按钮大小，可选值为 `small` `large` 或者不设 |                  string                  | false | default |
|       loading       |             设置按钮载入状态             |                 boolean                  | false |  false  |
|        ghost        |           幽灵属性，使按钮背景透明           |                 boolean                  | false |  false  |
|      disabled       |               禁用按钮               |                 boolean                  | false |  false  |
|      className      |           按钮的CSS class           |                  string                  | false |    -    |
|        style        |             内联CSS属性              |                  object                  | false |    -    |

## 事件

| 事件名称        | 触发条件   | 参数   |
| ----------- | ------ | ---- |
| onClick     | 鼠标点击   | 无    |
| onMouseDown | 鼠标按钮按下 | 无    |
| onMouseUp   | 鼠标按钮松开 | 无    |
| onConfirm   | 再次点击确认 | 无    |
| onCancel    | 确认取消   | 无    |