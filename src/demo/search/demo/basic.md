## 搜索github项目

输入项目名称，搜索结果

```json
{
    "body": [
        {
            "type": "container",
            "model": "search",
            "dataCustomer": {
                "customers": [
                    {
                        "mode": "pass",
                        "name": "passQueryData",
                        "config": {
                            "model": "table",
                            "assign": {
                                "query": "#ES{$trigger.passQueryData.query}"
                            }
                        }
                    }
                ]
            },
            "children": [
                {
                    "type": "row",
                    "width": 400,
                    "children": [
                        {
                            "type": "input",
                            "name": "query",
                            "prefix": "search",
                            "gridCount": 5,
                            "placeholder": "search github repos ..."
                        },
                        {
                            "type": "button",
                            "text": "search",
                            "gridPosition": "left-center",
                            "trigger": [
                                {
                                    "event": "onClick",
                                    "targetCustomer": "passQueryData",
                                    "params": {
                                        "query": "#ES{$data.query}"
                                    }
                                }
                            ]
                        }   
                    ]
                }
            ]
        },
        {
            "type": "container",
            "model": "table",
            "data": {
                "query": ""
            },
            "dataProvider": [
                {
                    "mode": "ajax",
                    "namespace": "github",
                    "config": {
                        "url": "https://api.github.com/search/repositories",
                        "method": "GET",
                        "data": {
                            "q": "#ES{$data.query}"
                        }
                    }
                }
            ],
            "children": [
                {
                    "type": "table",
                    "loading": "#ES{$data.$loading}",
                    "columns": [
                        {
                            "dataIndex": "id",
                            "title": "ID"
                        },
                        {
                            "dataIndex": "name",
                            "title": "项目名称"
                        },
                        {
                            "dataIndex": "language",
                            "title": "主要语言"
                        },
                        {
                            "dataIndex": "created_at",
                            "title": "创建时间"
                        },
                        {
                            "dataIndex": "html_url",
                            "title": "项目地址"
                        }
                    ],
                    "dataSource": "#ES{$data.github.items}",
                    "customerColumnControls": [
                        {
                            "dataIndex": "id",
                            "controls": [
                                {
                                    "type": "text",
                                    "text": "#ES{$item.id}",
                                    "thousands": true
                                }
                            ]
                        },
                        {
                            "dataIndex": "html_url",
                            "controls": [
                                {
                                    "type": "text",
                                    "text": "点击跳转",
                                    "textType": "link",
                                    "href": "#ES{$item.html_url}"
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