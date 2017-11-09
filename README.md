# RCRE

RCRE 是一个JSON配置, 可灵活扩展的前端组件渲染引擎

通过RCRE, 你可以使用简洁,灵活的JSON配置文件, 来生成你所想要的页面.

RCRE设计了一套可靠的JSON配置规则, 可以很好的抽象页面的布局样式, 让你轻松使用JSON来进行搭建页面.

不过RCRE最独特的设计在于其对数据流的抽象. 写JSON配置一样可以像写redux一样, 控制每个组件的数据模型,
可以对用户的各个响应进行操作, 并赋予组件不同的行为和传递数据的方式. 

有了RCRE渲染引擎, 写了页面仅仅是写个JSON一样简单, 无需再像前端工程师一样去关心构建工具, 前端开发框架等问题. 


## 教程

1. [Helloworld](doc/guide/Helloworld.md)
2. [持有数据的组件](doc/guide/持有数据的组件.md)
3. [Expression String](doc/guide/Expression%20String.md)
4. [DataProvider](doc/guide/DataProvider.md)
5. [嵌套的Container组件](doc/guide/嵌套的Container组件.md)
6. [布局系统](doc/guide/布局系统.md)

## 组件文档
1. [Button](doc/components/button.md)

## 起源
RCRE借鉴了Redux单一对象状态管理的思想, 如果你有redux开发经验, 那么理解RCRE的json配置将变得跟打开你的mac一样简单.

## 安装
最简单的安装方式, 就是通过npm. 目前rcre 发布在公司内pnpm镜像源上, 需要预先对npm进行配置

```bash
npm config set @miskit:registry http://pnpm.baidu.com
```
然后再安装即可
```bash
npm install @miskit/rcre-core --save
```
