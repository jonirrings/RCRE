# Tabs 标签页

Tab 卡片切换组件

## 代码演示

{{demo}}

## API

| 属性        | 说明     | 类型               | 是否必须  | 默认值   |
| --------- | ------ | ---------------- | ----- | ----- |
| tabs | 标签页列表 | TabItem[] | true | -| 
| tabType | 标签类型 | line,card | false | line |
| name | Tabs数据模型的Key | string | false | -
| animated | 是否使用动画切换 Tabs | boolean | false | true
| size | 大小，提供 default 和 small 两种大小 | default,small | false | default
| tabBarStyle | tab bar 的样式对象 | CSSProperties | false | -
| tabPosition | 页签位置 | left,top,bottom,right | false | top


## 单个标签页属性(TabItem)
| 属性        | 说明     | 类型               | 是否必须  | 默认值   |
| --------- | ------ | ---------------- | ----- | ----- |
| title | 标签页标题 | string | true | -
| children | 标签页内容 | BasicConfig | true | -