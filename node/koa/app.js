let path = require('path')

// 配置常用路径
global.FUCK = {
    lib: path.resolve('./lib'),
    base: path.resolve('.')
}

let app = require('./lib/index')()
let router = require('./router/index')
let static = require('./lib/static')
let url = require('url')
let queryParse = require('./lib/query')

// 设置文件流大小限制
let body = require('./lib/body').option({limit: 1})



// 默认的 request.url /axx?aaa=www 这显然与我们所期望的路径是不一样，因此需要重新解析一下
app.use(function *(next){
    const URL = url.parse( this.req.headers.host + this.req.url)
    this.query = queryParse( URL.query || '' )
    this.url = URL.pathname
    console.log( 'query:', this.query);
    yield next
})

// 设置静态服务
app.use(static('src', {
    maxAge: 60*60*24*30
}))


app.use(function *(next){
    yield 11

    yield next
})

app.use(router.routers )


app.use(function*(next) {
    // console.log('第二层', this.user);
    let he = yield next

    console.log('回到-->第二层', he);

    return '孙小飞'
})

app.use(function*(next) {
    // console.log('第三层');
    return '你好吗'
})

app.listen(10240, () => {
    console.log(new Date().toString(), 'listen 10240 port');
})
