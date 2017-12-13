# RCRE
[![Build Status](https://travis-ci.org/andycall/RCRE.svg?branch=master)](https://travis-ci.org/andycall/RCRE)
> 有了RCRE，以后写后台页面再也不用去求前端了。

RCRE是一个使用JSON来生成单页应用程序的渲染引擎。

它不光是仅仅使用JSON来生成用户想要的页面结构，它最大的不同之处在于用户可以直接使用JSON来配置整个页面的交互和数据操作。

现在，只要有了RCRE，一个非前端专业的工程师，也能在一天之内配置出一个专业前端工程师要耗费一周才能制作出来的CMS系统。

## 特性
1. 简单好用的布局系统
2. 提供基于Ant.design的组件库，功能完善，能应对大部分常见需求
3. 能直接使用JSON来配置出组件的数据获取，数据操作，以及数据提交功能
4. 支持事件捕获，能直接配置出用户触发鼠标键盘操作后的一系列行为
5. 可灵活扩展，可使用自定义React组件
6. 方便调试，可使用React Devtools和Redux Devtools来进行调试
7. 方便的表单功能，10分钟写出复杂的提交表单不是梦

## 快速使用

**安装**
```bash
npm install rcre-core --save
```

**引入**
```javascript
import React from 'react';
import {Render} from 'rcre-core';

class Demo extends React.Component {
    render() {
        const config = {
            body: [
                {
                    type: 'text',
                    text: 'helloworld'
                }
            ]
        };
        
        return <Render 
            code={JSON.stringify(config)}
        />
    }
}
```

## 教程

1. [Helloworld](src/guide/Helloworld.md)
2. [持有数据的组件](src/guide/ContainerComponent.md)
3. [Expression String](src/guide/ExpressionString.md)
4. [DataProvider](src/guide/DataProvider.md)
5. [嵌套的Container组件](src/guide/NestContainer.md)
6. [布局系统](src/guide/LayoutSystem.md)

### 运行此项目

```bash
npm install
npm start
```
