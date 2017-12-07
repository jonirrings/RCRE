# Popover 弹出框

点击/鼠标移入元素，弹出气泡式的卡片浮层。

## 代码演示

{{demo}}

## API
|         属性          |                说明                |                    类型                    |  是否必须 | 默认值   |
| :-----------------: | :------------------------------: | :--------------------------------------: | :-----: | :-----: | 
| content | 自定义弹出框内容 | string,BasicConfig | true | - |
| children | 被挂载的自定义组件 | BasicConfig[] | true | - | 
| name | 数据模型Key | string | false | - |
| placement | 弹框位置 | 'topLeft' , 'top' , 'topRight', 'left' , 'leftTop' , 'leftBottom', 'rightTop' , 'right' , 'rightBottom', 'bottomLeft' , 'bottom' , 'bottomRight' | false | 'top'|
| title | 标题 | string | false | - |
| triggerType | 弹框触发类型 | hover,click,focus | false| hover|
