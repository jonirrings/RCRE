## 基本使用

使用formGroup组件，就可以让表单元素按照规整的布局进行排版。

```json
{
    "body": [
        {
            "type": "container",
            "model": "form",
            "dataCustomer": {
                "customers": [
                    {
                        "mode": "submit",
                        "name": "formSubmit",
                        "config": {
                            "url": "https://api.github.com/repos/ApolloAuto/apollo",
                            "method": "GET",
                            "data": {
                                "name": "#ES{$trigger.formSubmit.name}"
                            }
                        }
                    }
                ] 
            },
            "children": [
                {
                    "type": "form",
                    "trigger": [
                        {
                            "event": "onSubmit",
                            "targetCustomer": "formSubmit",
                            "params": {
                                "name": "#ES{$args.name}"
                            }
                        }
                    ],
                    "children": [
                        {
                            "type": "formGroup",
                            "label": "姓名",
                            "control": {
                                "type": "input",
                                "name": "name",
                                "errmsg": "请输入姓名",
                                "placeholder": "请输入姓名",
                                "required": true  
                            }
                        },
                        {
                            "type": "button",
                            "text": "submit",
                            "htmlType": "submit"
                        }
                    ]
                }
            ]
        }
    ]
}
```