# Modal 弹框

模态对话框

组件基于 https://ant.design/components/modal-cn/

Modal组件需要配合`container`才能正常工作。需要依靠`container`组件来控制模态框的显示和隐藏。

模态框点击确认或者取消都只会触发`onOk`事件和`onCancel`事件。 

所以说， 如果不对事件进行任何处理。模态框是只能点开，而无法消失滴。


## 代码演示

{{demo}}

## API

|         属性          |                说明                |                    类型                    |  是否必须 | 默认值   |
| :-----------------: | :------------------------------: | :--------------------------------------: | :-----: | :-----: | 
| visible | 对话框是否可见 | boolean | true | false
| name | Modal的数据模型Key，可以用来取代visible属性 | string | false | - |
| children | 模态框内部的内容 | BasicConfig[] | true | -
| confirmLoading | 确定按钮 loading | boolean | false | false
| title | 标题 | string | false | -
| closable | 是否显示右上角的关闭按钮 | boolean | false | true
| width | 宽度 | number | false | -
| footer | 底部内容 | BasicConfig[] | false | -
| okText | 确认按钮文字 | string | false | 确认
| okType | 确认按钮类型 |primary,ghost,dashed,danger | false | -
|  cancelText | 取消文字 | string | false | 取消
| maskClosable | 点击蒙层是否允许关闭 | boolean | false | true
| wrapClassName | 对话框外层容器的类名 | string | false | -
| zIndex | 设置 Modal 的 z-index | number | false | 100