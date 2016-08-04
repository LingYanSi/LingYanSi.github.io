let koa = require('koa');
let router = require('koa-router')(),
    koaBody = require('koa-body')({multipart: true});
let serve = require('koa-static');
let app = koa();
const ENV = process.argv.slice(2)[0] == 'production' ? 'pro' : 'dev'

const __congif = {
    pro : {
        static: ['./static']
    },
    dev: {
        static: ['./koa/static']
    }
}

const config = __congif[ENV]

// 路由
require('./koa/router/index.js')(router, koaBody)

// 开启静态服务器
app.use( serve(config.static[0]) ) 

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
console.log(new Date().toString(), '3000端口');
