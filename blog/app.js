let koa = require('koa')
let router = require('koa-router')()
let koaBody = require('koa-body')({multipart: true})
let serve = require('koa-static')
let app = koa()
var compress = require('koa-compress')

// 开启gzip
app.use(compress({
  filter: function (content_type) {
    //  console.log('类型====》',content_type,/(application\/javascript|text\/css)/i.test(content_type));
    return /(application\/javascript|text\/css)/i.test(content_type)
  },
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}))

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
app.use( serve(config.static[0], {
    gzip: true,
    maxage: 1000*60*60*24*30
}) )

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
console.log(new Date().toString(), '3000端口');
