# Row 布局系统 

简单好用的布局系统，

相关教程：[Go](/guide/LayoutSystem)

在最外层添加`debug: true`就可以显示布局外边框

## 代码演示

{{demo}}

## Row API

|         属性          |                说明                |                    类型                    |  是否必须 | 默认值   |
| :-----------------: | :------------------------------: | :--------------------------------------: | :-----: | :-----: | 
| width | 容器总宽度 | number,string | false | 100% |
| minHeight | 容器最小高度 | number | false | 30 |
| style |   内联CSS属性     | CSSProperties | false | - |
| className | 嵌入的CSS 类 | string | false | - |

## Row 内部元素API 
|         属性          |                说明                |                    类型                    |  是否必须 | 默认值   |
| :-----------------: | :------------------------------: | :--------------------------------------: | :-----: | :-----: | 
| gridWidth | 容器的宽度 | number | false | - |
| gridCount | 容器的相对宽度 | number | false | - |
| gridPosition | 容器的相对定位 | top-left,top-center,top-right,middle-left,middle-center,middle-right,bottom-left,bottom-center,bottom-right | false | middle-left |
| gridLeft | 容器的相对X偏移 | number | false | 0 |
| gridTop | 容器的相对Y偏移 | number | false | 0 |