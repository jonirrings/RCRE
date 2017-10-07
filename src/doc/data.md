RCRE数据流设计思想
================

## 核心概念

+ 持有数据的组件
+ 静态变量解析


## 触发Container数据组件更新的三种情况

1. Container组件初始化, 通过initialLoad来加载数据, 并更新
2. 外部组件通过Trigger组件, 写入到当前Container组件的store对象中, 需要触发Container更新. 
同时或许会触发initialLoad, 发送请求之后再次更新组件
3. 组件的父级组件的数据模型发生改变, 组件组件传递给字级的$parent属性发生更改, 需要触发initiaLoad,
发送请求之后再次更新组件


## 表单元素受控场景

1. Form > FormItem > Input
2. Form > FormItem > AbstractContainer > Input
3. AbstractContainer > Input