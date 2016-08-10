let koa = require('koa')
let router = require('koa-router')()
let koaBody = require('koa-body')({multipart: true})
let serve = require('koa-static')
let app = koa()
var compress = require('koa-compress')

// 开启gzip
app.use(compress({
  filter: function (content_type) {
    //  js/css/json/image
    return /(application\/javascript|text\/css|application\/json|image\/jpeg|image\/png|image\/gif|image\/webp)/i.test(content_type)
  },
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}))

const ENV = require('./app_config')

const __congif = {
    pro : {
        static: ['./static', './static1']
    },
    dev: {
        static: ['./koa/static', './static1']
    }
}

const config = __congif[ENV]

// 路由
require('./koa/router/index.js')(router, koaBody)

// 开启静态服务器
config.static.forEach(function(item){
    app.use( serve(item, {
        gzip: true,
        // dev env dont set browser cache
        maxage: ENV == 'dev' ? 0 : 1000*60*60*24*30
    }) )
})
// app.use(function *(next){
//     yield next
//     console.log('卧槽', this.cookies.get('fuck_you'))
// })


// app.use(function *(next){
//
//     console.log('哈哈哈===》', this.cookies.get('fuck_you'))
//
//     yield next
// })

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
console.log(new Date().toString(), '3000端口');
