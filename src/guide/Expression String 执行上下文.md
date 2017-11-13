# Expression Sring 执行上下文

在不同的场景下, RCRE给Expression String注入的上下文变量也是不同的.

这章将会按照不同的场景进行依次的讲解.

## 场景1: Container渲染字级组件

`container`组件通过`children`属性渲染的任意子级组件, 都会在渲染的时候, 将`container`的数据模型通过`$data`这个变量传递到底层任意组件, 组件的开发者将会实现不同的处理逻辑, 来将各自组件使用Expression String的属性, 计算出所需要的值. 由于在不同场景下, 每个组件开发者对于`$data`的处理方式都是不相同的.本章只会从RCRE官方配套的组件库 —— rcre-theme-antd来进行介绍.

