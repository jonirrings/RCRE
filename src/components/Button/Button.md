# Button 按钮

## 基础使用

```json
{
    "type": "button",
    "text": "helloworld"
}
```

主要的属性都是基于Ant.design的Button组件来实现的, 并做了一些简单的整合. 关于每个字段的详细使用方式, 可以参考: https://ant.design/components/button-cn/

## API

|         属性          |                说明                |                    类型                    |   默认值   |
| :-----------------: | :------------------------------: | :--------------------------------------: | :-----: |
|        text         |               按钮文字               |                  string                  |    -    |
|      antd.type      |               按钮类型               | 'primary' 'dashed' 'danger' 'ghost' |    -    |
|      htmlType       |            按钮的HTML类型             | 设置 `button` 原生的 `type` 值，可选值请参考 [HTML 标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) | button  |
|       confirm       |            点击之后弹一个确认框            |                  object                  |    -    |
|    confirm.title    |              确定框的标题              |                  string                  |    -    |
|   confirm.okText    |              确认按钮文字              |                  string                  |   确认    |
| confirm. cancelText |              取消按钮文字              |                  string                  |   取消    |
|        icon         |             按钮的图标类型              |                  string                  |    -    |
|        shape        |    设置按钮形状，可选值为 `circle` 或者不设     |                  string                  |    -    |
|        size         | 设置按钮大小，可选值为 `small` `large` 或者不设 |                  string                  | default |
|       loading       |             设置按钮载入状态             |                 boolean                  |  false  |
|        ghost        |           幽灵属性，使按钮背景透明           |                 boolean                  |  false  |
|      disabled       |               禁用按钮               |                 boolean                  |  false  |
|      className      |           按钮的CSS class           |                  string                  |    -    |
|        style        |             内联CSS属性              |                  object                  |    -    |