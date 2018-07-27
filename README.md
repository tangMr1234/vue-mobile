# 冷王冷链APP框架页【app-main】数据格式：

## Index

``` bash
{
    "code": 0,
    "msg": "操作成功",
    "data": {
        "info": {
            "unit_name": "闵行疾控",
            "user_name": "hello,测试180515"
        },
        "ads": {
            "top_slider": {
                "width": 1024,
                "height": 569,
                "content": [
                    {
                        "id": "1",
                        "img": "\/\/cdn-static.coldyun.net\/images\/wap\/top_silder01.jpg",
                        "fallbackImg": "\/static\/images\/wap\/top_slider_loading.gif",
                        "title": "智慧医疗",
                        "url": "",
                        "frameurl": ""
                    }
                ]
            },
            "marquee": {
                "type": "marquee",
                "title": "<span style=\"color: rgb(204, 31, 93);\">快讯<img src=\"\/\/cdn-static.coldyun.net\/images\/home_news.png\" style=\"height: 20px;\n    width: auto;\n    display: inline-block;\n    vertical-align: middle;margin-bottom: 3px;\"><\/span>",
                "content": {
                    "1": {
                        "id": 1,
                        "content": "国产14价HPV疫苗、13价肺炎疫苗拟纳入优先审评 或将加速上市",
                        "url": "",
                        "frameurl": ""
                    }
                }
            },
            "ad1": {
                "type": "html",
                "content": "欢迎光临",
                "url": "mainframe",
                "frameurl": "https:\/\/baidu.com"
            },
            "ad2": {
                "type": "html",
                "content": "<img alt=\"AD1\" src=\"\/\/cdn-static.coldyun.net\/images\/wap\/home01_saas.jpg\" style=\"width:100%;\">",
                "url": "",
                "frameurl": ""
            },
            "ad3": {
                "type": "html",
                "content": "<img src=\"\/\/cdn-static.coldyun.net\/images\/wap\/home02.gif\" style=\"width:100%;\">",
                "url": "",
                "frameurl": ""
            },
            "ad4": {
                "type": "html",
                "content": "<img src=\"\/\/cdn-static.coldyun.net\/images\/wap\/home03.jpg\" style=\"width:100%;\">",
                "url": "",
                "frameurl": ""
            }
        },
        "apps": {
            "frequently": {
                "name": "常用应用",
                "grid": {    //注：每个group最多只能放5条数据
                    "group1": [
                        {
                            "id": "1",
                            "label": "实时温湿度",
                            "icon": "\/\/cdn-static.coldyun.net\/images\/icon\/icon_ll_sswsd.png",
                            "url": "mainframe",
                            "frameurl": "\/\/dev4.coldyun.com\/mobile\/cc\/app_sswsd\/",
                            "warning": "dot"
                        }
                    ],
                    "group2": [
                        {
                            "id": "7",
                            "label": "冷链报表",
                            "icon": "\/\/cdn-static.coldyun.net\/images\/icon\/icon_ll_sjbb.png",
                            "url": "mainframe",
                            "frameurl": "\/\/dev4.coldyun.com\/mobile\/report\/"
                        }
                    ]
                }
            },
            "grid": [
                {
                    "name": "冷链资源管理",
                    "grid": [
                        {
                            "id": "1",
                            "label": "实时温湿度",
                            "icon": "\/\/cdn-static.coldyun.net\/images\/icon\/icon_ll_sswsd.png",
                            "url": "mainframe",
                            "frameurl": "\/\/dev4.coldyun.com\/mobile\/cc\/app_sswsd\/",
                            "warning": "dot"
                        }
                    ]
                },
                {
                    "name": "疫苗协同管理",
                    "grid": [
                        {
                            "id": "4",
                            "label": "疫苗档案",
                            "icon": "\/\/cdn-static.coldyun.net\/images\/icon\/icon_sw_ymda.png",
                            "url": "mainframe",
                            "frameurl": "\/\/dev4.coldyun.com\/mobile\/bpms\/app_ymda"
                        }
                    ]
                }
            ],
            "list": {
                "name": "推荐应用",
                "type": "1",
                "grid": [
                    {
                        "id": 1,
                        "src": "\/\/cdn-static.coldyun.net\/images\/icon\/icon_list_appstore.png",
                        "title": "应用中心",
                        "desc": "发现更多功能，享用更多便利",
                        "link": "mainframe",
                        "frameurl": "\/\/dev4.coldyun.com\/mobile\/app_store\/"
                    }
                ]
            }
        }
    }
}
```

## 其他

1. vux - git问题集锦论坛：[https://github.com/airyland/vux/issues?q=is%3Aissue+is%3Aopen](https://github.com/airyland/vux/issues?q=is%3Aissue+is%3Aopen)
2. 基于vue的滑动引导页插件：[https://cnodejs.org/topic/59465560325c502917ef0b25](https://cnodejs.org/topic/59465560325c502917ef0b25)
3. 基于vue的scroll滑动插件：[https://juejin.im/entry/59ace2c4518825243a78f1c3](https://juejin.im/entry/59ace2c4518825243a78f1c3)
