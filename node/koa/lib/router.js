let compose = require('./compose')

let METHODS = ['get', 'post', 'delete', 'post', 'all']
let router = {
    cache: [],
    routers: function *(next){
        // 执行
        const METHOD = this.req.method.toLowerCase()
        const URL = this.url
        let cb
        // 匹配路由
        router.cache.some(item => {
            const method = item[0]
            const url = item[1]
            const middleware = item.slice(2)

            if(METHOD == method || method == 'all' ){
                if(url == URL || url == '*'){
                    cb = middleware
                    return true
                }
            }
        })

        // 执行参数
        yield compose(cb).call(this,next)
        // yield next
    }
}

METHODS.forEach(method => {
    router[method] = function(...args){
        this.cache.push([method, ...args])
        return this
    }
})

module.exports = router
