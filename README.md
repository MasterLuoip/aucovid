# miniaucovid

A Mpvue mini program project.
UI Library: weui
本人第一款基于Mpvue 框架开发的微信小程序，提供澳洲COVID-19疫情每日更新。因API域名未经过ICP备案，项目无法提交审批。又因此程序不是来自医疗卫生机构，审批也无法通过，所以此小程序无法发布。


## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
