
function router() {
    let router
    return router = {
        get(...args){
            this.cache.push(['get', ...args])
            return this
        },
        post(...args){
            this.cache.push(['post', ...args])
            return this
        },
        delete(...args){
            this.cache.push(['delete', ...args])
            return this
        },
        put(...args){
            this.cache.push(['put', ...args])
            return this
        },
        all(...args){
            this.cache.push(['all', ...args])
            return this
        },
        cache: [],
        routers: function *(next){
            console.log('进入路由匹配');
            // 执行
            const METHOD = this.req.method.toLowerCase()
            const URL = this.url
            let cb
            // 匹配路由
            router.cache.some(item => {
                const method = item[0]
                const url = item[1]
                const fn = item[2]

                if(METHOD == method || method == 'all' ){
                    if(url == URL || url == '*'){
                        cb = fn
                        return true
                    }
                }
            })

            console.log('没有定义？', cb);

            // 执行参数
            cb.__next = next
            yield cb
            // yield next
        }
    }
}

module.exports = router
