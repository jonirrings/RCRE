# 事件

> 渲染出的用户界面, 可以通过绑定事件的方式来响应用户的操作行为

事件绑定是专门用户处理用户的鼠标键盘等操作的，在RCRE中，触发的所有事件最终都要传递给当前组件所在`container`组件下的`dataCustomer`来进行处理。

大致的流程如下:

![QQ20171204-135907](https://ws3.sinaimg.cn/large/006tKfTcly1fm4pt0q6zkj30g407vdg4.jpg)

当用户点击`container`组件下面的某一个普通组件的时候，普通组件上面绑定的`trigger`属性就会被执行，并把响应的信号发送到配置的`targetCustomer`下面，然后再由注册的`DataCustomer`来运行对应的逻辑处理。

## 事件的绑定

细心的用户看了上面例子的代码就会发现，相比之前的例子，配置中多了`trigger`属性。

`trigger`属性值是一个数组，数组中每一个元素都是一个普通对象值。一个对象就代表着一个事件的绑定配置。

如果想给一个组件绑定多个事件，就只需要在`trigger`属性中添加多个事件配置即可。

例如, 加入我们想给一个按钮添加鼠标按钮按下和鼠标按钮松开的事件：

那么就需要在Button组件的trigger属性上，同时添加2个对象。

一个对象的event属性是onMouseDown，一个对象的event属性是onMouseUp。

`event`属性是指当前组件所支持的事件名称，不同的组件会有不同的事件触发名称和机制，请参考组件文档来获取具体的使用场景。

除了event属性之外，还需要一个targetCustomer属性。

`targetCustomer`是指当前事件触发之后，会移交给哪一个`DataCustomer`来进行处理。

先上demo，其他待会解释。

```json
{
    "body": [
        {
            "type": "container",
            "model": "buttonZone",
            "data": {
                "mouseStatus": "none"
            },
            "children": [
                {
                    "type": "button",
                    "text": "点个按钮试试看",
                    "trigger": [
                        {
                            "event": "onMouseDown",
                            "targetCustomer": "$this",
                            "params": {
                                "mouseStatus": "down"
                            }
                        },
                        {
                            "event": "onMouseUp",
                            "targetCustomer": "$this",
                            "params": {
                                "mouseStatus": "up"
                            }
                        }
                    ]
                },
                {
                    "type": "text",
                    "text": "mouse status: #ES{$data.mouseStatus}"
                }
            ]
        }   
    ]
}
```

上面的这个例子，

当配置中还有`params`的时候，传递给`targetCustomer`所指向的`DataCustomer`不光光是一个通知，还有`params`这个属性所表述的值。

在`params`这个对象中，支持使用Expression String来动态获取当前所属的container中数据模型的值。

## DataCustomer

事件触发之后必定需要执行一些需要的逻辑操作。在RCRE中，任何和数据流相关的逻辑操作都可以使用DataCustomer来实现。

### 定义

DataCustomer是一个container组件的扩展属性，主要用于将container所持有的数据传递到其他地方，如其他container组件，或者是调用ajax，或者是其他输出数据的渠道。

对于不同的数据输出方式，都可以对DataCustomer功能进行扩展来进行实现。

`dataCustomer`属性的值一个对象，对象中必须要含有customers属性，用来配置具体的逻辑操作。

对于成组的逻辑操作，还有提供`groups`属性，可以让不同的逻辑操作按照一定的顺序来执行。

下面我们来做一个简单的点击跨container组件传值的样例。

#### 分析

想要实现点击跨container组件传值，需要以下2个步奏。

1. 在按钮上绑定点击事件，并把点击之后的`targetCustomer`指向第二步定义的DataCustomer
2. 在container组件上定义dataCustomer,设置mode为`pass`，并指定目标container的model值和传递的数据字段

**绑定点击事件**

假如被点击的对象是一个按钮，那么就直接在按钮上添加`trigger`属性就可以了。

```text
{
    "type": "button",
    "text": "点击传递数据",
    "trigger": [
        {
            "event": "onClick",
            "targetCustomer": "passData",
            "params": {
                "text": "data from dataPass"
            }
        }
    ]
}
```

**定义DataCustomer**

上面onClick所指向的targetCustomer的值，就是现在我们要去定义的dataCustomer配置。这样才能让点击有真正的效果。

每一个DataCustomer配置都需要遵循一下的规范：

| 字段名称   | 类型     | 是否必须 | 说明                                       |
| ------ | ------ | ---- | ---------------------------------------- |
| mode   | string | true | 运行模式，不同的运行模型执行不同的逻辑操作                    |
| name   | string | true | 名称，trigger的targetCustomer所指向的值，同时也是写入到Redux数据模型的Key |
| config | Object | true | DataCustomer的配置，不同的mode会有不同的配置字段。详细配置请看API手册 |

在这个例子中，我们的DataCustomer配置就是下面的这样, 

对于mode为pass的DataCustomer配置，需要指定以下的字段，其他DataCustomer配置请看API手册。

| 字段名称   | 类型     | 是否必须 | 说明                      |
| ------ | ------ | ---- | ----------------------- |
| model  | string | true | 需要写入的container组件model名称 |
| assign | Object | true | 传递给container组件的数据对象     |


**例子**
```text
{
    "dataCustomer": {
        "customers": [
            {
                "mode": "pass",
                "name": "passData",
                "config": {
                    "model": "receiveData",
                    "assign": {
                        "text": "#ES{$trigger.passData.text}"
                    }
                }
            }
        ]
    }
}
```

结合以上说明，我们就能实现一下的功能了。
```json
{
    "body": [
        {
            "type": "container",
            "model": "dataPass",
            "dataCustomer": {
                "customers": [
                    {
                        "mode": "pass",
                        "name": "passData",
                        "config": {
                            "model": "receiveData",
                            "assign": {
                                "text": "#ES{$trigger.passData.text}"
                            }
                        }
                    }
                ]
            },
            "children": [
                {
                    "type": "button",
                    "text": "点击传递数据",
                    "trigger": [
                        {
                            "event": "onClick",
                            "targetCustomer": "passData",
                            "params": {
                                "text": "data from dataPass"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "type": "container",
            "model": "receiveData",
            "data": {
                "text": "empty"
            },
            "children": [
                {
                    "type": "text",
                    "text": "container text data: #ES{$data.text}"
                }
            ]
        }
    ]
}
```
## $this

DataCustomer的功能很强大，能适应不同的业务场景，但是配置起来缺有些繁琐。

尤其是对于单个container组件内部的组件，通过事件触发更新自身container组件的数据模型中的值。

为了简化操作，每一个container组件，都会有一个内置的DataCustomer配置，专门用于写入自身的数据模型的值。

所以，如果一个组件的trigger属性中targetCustomer的目标是父级的container组件的话，就不需要再到container组件上进行任何定义，只需要把

targetCustomer的值赋值为`$this`就OK了。

我们来看一个简单的例子 —— 实现一个递增或者递减的计数器。

```json
{
    "body": [
        {
            "type": "container",
            "model": "counter",
            "data": {
                "total": 0
            },
            "children": [
                {
                    "type": "row",
                    "children": [
                        {
                            "type": "text",
                            "text": "value: #ES{$data.total}"
                        }
                    ]
                },
                {
                    "type": "row",
                    "width": 200,
                    "children": [
                        {
                            "type": "button",
                            "text": "+1",
                            "trigger": [
                                {
                                    "event": "onClick",
                                    "targetCustomer": "$this",
                                    "params": {
                                        "total": "#ES{$data.total + 1}"
                                    }
                                }
                            ]
                        },
                        {
                            "type": "button",
                            "text": "-1",
                            "trigger": [
                                {
                                    "event": "onClick",
                                    "targetCustomer": "$this",
                                    "params": {
                                        "total": "#ES{$data.total - 1}"
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
```

当用户点击了左边的按钮，它会把当前数据模型中total的值加1，点击了右边的按钮，就会减去1。