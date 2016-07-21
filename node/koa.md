# koa使用

## 一般app.js
```js
let koa = require('koa')
let app = koa()
// 静态服务
let static = require('koa-static')
// 路由匹配
let router = require('koa-router')()
// 获取post数据，但无法获取到Formdata数据
let body = require('koa-body')()

// 引入路由
require('./server/router/index')(router, body)

// 启动静态服务
app.use( static('./static/') )

// 启用路由
app.use( router.routes() )
app.use( router.allowedMethods() )

// 启动服务器
app.listen('10240')
console.log('服务器已启动，监听10240端口');

```
