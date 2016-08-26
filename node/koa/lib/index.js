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
        co.call(ctx, app.mix())
    })

    let app = {
        use(fn) {
            this.mds.push(fn)
        },
        // 存储中间价
        mds: [],
        // 将所有的中间件转成一个Generator函数，以交给co执行
        mix(){
            if (!app.reversed) {
                app.reversed = true
                // 把next参数，存储到__next上
                app.mds.reverse()
                app.handle = app.mds.reduce((prev, current) => {
                    current.__next = prev
                    return current
                })
            }
            return app.handle
        },
        // 启动服务
        listen(...args){
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
