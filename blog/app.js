var koa = require('koa');
var router = require('koa-router')(),
    koaBody = require('koa-body')({multipart: true});
var serve = require('koa-static');
var app = koa();

// 路由
require('./koa/router/index.js')(router, koaBody)

app
  .use(router.routes())
  .use(router.allowedMethods());

// 开启静态服务器
app.use( serve('./koa/static/') )
app.use( serve('./database/') )

app.listen(3000);
console.log(new Date().toString(), '3000端口');
