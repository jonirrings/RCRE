树组件使用文档
=============

## 简述

树组件的`type`是`tree`, 可以通过设置`type`为tree来加载

树需要通过指定数据模型才能正常工作, 所以需要提供`data`属性值.

`data`的值同样可以通过指定api的方式来进行加载, 只需要指定`initialLoad`属性即可,
然后可以通过变量表达式`$response`来挂载到`data`上面

树型组件也需要执行字级元素 ---- `children`属性
children属性可以直接设置固定的值

树组件的子级可以通过指定`type: 'treeNode'`来定义

```json
{
    "type": "tree",
    "data": {
        "tree": "$response.tree",
        "show": "$response.show"
    },
    "initialLoad": "http://cp01-rdqa-dev420-dongtiancheng.epc.baidu.com:8094/tree",
    "children": [
        {
            "type": "treeNode",
            "title": "helloworld",
            "key": "aaa"
        }
    ]
}
```