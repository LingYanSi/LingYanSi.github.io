let http = require('http')
let co = require('./co')
let cookie = require('./cookie')

module.exports = function(){
    let server = http.Server((req, res) => { 
        // 新建一个上下文
        let ctx = new Ctx(req, res)
        ctx.url = req.url
        // 用户ip地址
        ctx.ip = req.connection.remoteAddress ||  req.socket.remoteAddress || req.connection.socket.remoteAddress
        // 自动执行Generator函数
        co.call(ctx, app.middleware)
    })

    let app = {
        use(fn) {
            this.mds.push(fn)
        },
        // 存储中间价
        mds: [],
        // compose中间件
        fuck(){
            let mds = this.mds
            mds.reverse()
            return function *(next){
                mds.forEach(md => {
                    next = md.call(this, next)
                })
                yield next
            }
        },
        // 启动服务
        listen(...args){
            this.middleware = this.fuck()
            server.listen(...args)
        }
    }

    // 使用cookie中间件
    app.use(cookie)

    return app
}

// 中间件上下文
function Ctx(req, res){
    this.req = req
    this.res = res
    // this.body = sth 返回请求结果
    Object.defineProperty(this, 'body',{
        get(){
            return 'fuck you'
        },
        set(value){
            // value只能是String JSON_Object， Content-Length必须要是buffer的长度
            this.res.setHeader('Content-Length', Buffer.byteLength(value, 'utf8'))
            this.res.write(value)
            this.end()
        }
    })
}

Ctx.prototype = {
    // 重定向
    redirect( url ){
        this.res.statusCode = 302
        this.res.setHeader('location', url)
        this.end()
    },
    end(){
        this.res.end()
    }
}
