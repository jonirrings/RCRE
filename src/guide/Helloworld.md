# Helloworld

> RCRE是一个灵活组件表述引擎。 它内置一个JSON风格的结构表述语言。 可以让你使用非常简单的语法和结构, 来构建你的网页应用程序。



这里有一些资料可以让你来快速入门



+ 尝试RCRE



## 尝试RCRE

如果你想快速尝试RCRE的特性, 并感受RCRE所带来强大的开发效率和优雅的开发体验。 

你可以直接使用[Helloworld Example Code](http://icode.baidu.com/repo/baidu%2Fnative-ads%2Frcre-singleton-demo/files/master/tree/). 无需安装任何代码, 就能直接在浏览器中运行. 你可以直接简单修改代码, 然后刷新浏览器查看运行结果.

如果你想在真实的生产环境中使用。 下面也有一个例子。 来演示如何在一个经典的React项目工程中使用RCRE。



## 集成在React项目中

目前RCRE项目已经打包并发布在http://pnpm.baidu.com. 可以直接通过npm工具进行安装

```shell
npm install @miskit/rcre-core --save --registry=http://pnpm.baidu.com
```

这有一个完整的样例。 采用webpack进行构建。 目前FIS3构建理论上也可以运行, 不过由于时间有限, 暂时只提供基于webpack的构建demo。 
[rcre-integration-react](http://icode.baidu.com/repo/baidu%2Fnative-ads%2Frcre-integration-react/files/master/tree/)