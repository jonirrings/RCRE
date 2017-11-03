# 如何贡献代码

## 项目安装
项目运行需要npm v5版本, 如果npm版本过低,
需要升级npm
```
sudo npm install -g npm
```

安装依赖包
```bash
npm install
```

启动本地开发服务
```
npm start
```

## 项目说明
此项目基于`TypeScript-React-Starter`构建, 集成Typescript, React, Webpack, tslint
扩展命令请看![README_usage.md](./README_usage.md)

## 开发说明
此项目采用typescript作为开发语言, 同时使用tslint来进行代码格式检查. 
执行`npm start`之后, 会启动一个本地开发服务, 之后的代码开发都是会自动进行编译

## 开发F&Q
![image](doc/static/QQ20170724-120015@2x.png)
这种问题是tslint检测到你的代码有格式问题. 请按照提示,到指定的文件和行号, 修改你的代码

## 目录结构说明

+ `src` 整个搭建平台的源代码
+ `doc` 文档目录

注: 单元测试也同样放在`src`目录下, 以`.test.ts`或者`.test.tsx`为文件结尾

## 代码规范
本项目采用tslint才进行代码规范检测, 详细配置请看tslint配置项

## 开发手册

详情请看: [开发手册](doc/developer_guide.md)

## 项目迭代规划

配置化平台大事件

+ 7月20日: 天成邀请大家参与项目讨论, 给出了整个配置化平台的需求和设计思路. 并请大家吃了披萨
+ 7月23日: 平台渲染引擎第一行代码开始提交
+ 8月24日: 平台渲染引擎累计提交次数达到100次, 日均提交为3次
+ 8月25日: 平台接入第一个业务需求, 数据地图和数据监控
+ 9月1日: 平台alpha 1.0 准备完毕, 即将上线. 第一期业务需求也联调完成.