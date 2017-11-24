## 基本使用

表单验证

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
                    "name": "basicForm",
                    "trigger": [
                        {
                            "event": "onSubmit",
                            "targetCustomer": "formSubmit",
                            "params": {
                                "name": "#ES{$args.data.name}"
                            }
                        }
                    ],
                    "children": [
                        {
                            "type": "input",
                            "name": "name",
                            "errmsg": "请输入姓名",
                            "required": true,
                            "formItem": true
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