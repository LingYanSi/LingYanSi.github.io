
搭建基础环境


安装 npm & node;

// 安装 mac 包管理工具 homebrew 浏览器下载，点击安装
http://brew.sh/index_zh-cn.html

brew install wget ; // 安装wget,wget用来下载文件

wget http://nodejs.org/dist/v0.12.4/node-v0.12.4.pkg // 下载node
open node-v0.12.4.pkg ; // 打开node
安装 node 全局工具：

  npm i gulp -g; // 安装gulp到全局
  npm i webpack -g; // 安装webpack

  npm i nodemon -g;// 可选

  /*
    nodemon
    在我们开发php，java等web项目的时候，修改了项目代码，服务器都会自动重启，让我们的改动生效，但是node并不会这样，必须手动去重启一下，这样很烦人的啊，很浪费时间，于是就有大神开发了自动重启的工具——nodemon，很简单的。
  */

git clone this repo; // git clone 项目

cd f-day;

// 安装相关依赖
npm install;


// --------------------------------------------
搭建 php 和 nginx 环境

  // 安装 mac 包管理工具 homebrew
  http://brew.sh/index_zh-cn.html

  // 安装 nginx
  brew install nginx

  // 在 nginx 中添加一个 server，
  // 将项目下的 fday.com.conf 的 server 拷贝到 nginx.conf 中
  // nginx的配置文件，可参考本文件夹下的 server.conf

  // 启动 php
  sudo php-fpm

  // 启动 Nginx
  sudo nginx

//-------------------------------------------------

跑起来

// 实时编译打包功能
npm run pack

访问： localhost/shop/setting/blacklist

提交代码：
  gulp commit -f filepath

//--------------------------------------------------------
// 这里面还牵扯到gulp的 gulpfiles.js 的配置 示例见Gulpfile.js
// webpack 文件的配置  示例见 webpack.config.js
// PHP路由的配置

开发说明
  UI demo: /ui 示例中相关的 UI 组件

Commit 信息规范
`username`: 提交的简要说明（本行总字数小于等于50字）

本次提交较详细的说明，如新增哪些内容、修改了哪些内容等。

* 注释（可选）

Fix #{Issue number}
例：

yefei: 修改基础样式

添加表单基础样式；小店后台UI视觉规范中添加“控件规范”。
页面创建规则
页面创建在app/pages目录下，由文件夹区分；
文件夹名全小写，单词由连字符“-”分割，如postage-home；
文件夹内第一层需包含视图文件，文件名为文件夹名转为大驼峰后拼上'View.jsx'，如PostageHomeView.jsx；
生成的路由为文件夹名去掉连字符，如domain/postageHome，不区分大小写。
