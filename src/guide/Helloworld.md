# Helloworld

> RCRE是一个灵活组件表述引擎。 它内置一个JSON风格的结构表述语言。 可以让你使用非常简单的语法和结构, 来构建你的网页应用程序。

```json
{
    "body": [
        {
            "type": "text",
            "text": "helloworld"
        }
    ]
}
```

## 尝试RCRE
RCRE最简单的使用方式就是直接使用一个编译好的js文件来使用，用户无需关心任何前端构建工具和环境配置。

而且能够使用RCRE 100%的功能和特性。
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>RCRE DEMO</title>
    <link rel="stylesheet" href="http://miskit.cdn.bcebos.com/miskit/rcre_lastest.css">
</head>
<body>
    <div id="main"></div>
</body>
<script src="https://cdn.bootcss.com/react/15.6.1/react.min.js"></script>
<script src="https://cdn.bootcss.com/react/15.6.1/react-dom.min.js"></script>
<script src="http://miskit.cdn.bcebos.com/miskit/rcre_0.11.0.js"></script>
<script>
    var config = {
        "title": "helloworld",
        "body": [
            {
                "type": "text",
                "text": "this is a simple demo"
            }
        ]
    };
    
    var engine = React.createElement(RCRE, {
        code: JSON.stringify(config)
    });
    
    var dom = document.getElementById('main');
    ReactDOM.render(engine, dom);
</script>
</html>
```

## 集成在React项目中
对于高级用户，想在一个采用webpack构建的项目中使用rcre，可以直接使用npm来安装rcre。

```bash
npm install rcre-core --save
```

再引入`Render`函数就可以使用了。

```javascript
import {Render} from 'rcre-core';
import React from 'react';

class Demo extends React.Component {
    render() {
        const config = {
            body: [
                {
                    type: 'text',
                    text: 'helloworld'
                }
            ]
        }
        
        return <Render 
            code={JSON.stringify(config)}
        />
    }
}
```