// 简单的文件加载管理

;
(function() {
    window.JSM = {
        cache: {},
        // 添加路由配置
        addCache: function(cache) {
            this.cache = cache
            // 添加一个静态表，表加载成功后，初始化加载
            this.init()
        },
        // 匹配数据
        // s1: /about/11/22 s2: /about/:id/:name
        // 返回 {id: 11, name: 22}
        match: function(s1, s2) {
            var arr1 = s1.trim().split('/')
            var arr2 = s2.trim().split('/')
            // 长度不相等，肯定不匹配
            if(arr1.length != arr2.length) return
            // 匹配Parma
            var parma = {}
            var correct = arr1.every((item, index) => {
                var arr2Item = arr2[index]
                if (item === arr2Item) return true
                if (arr2Item.startsWith(':')) {
                    parma[arr2Item.slice(1)] = item
                    return true
                }
            })
            if (correct) return parma
            // 长度相等，但元素不匹配
            return false
        },
        // 加载js文件
        load: function(url, fun) {
            // 把url放到cache中进行匹配
            var parma , isUrlExist = false ;
            for (var route in JSM.cache) {
                parma = parma || JSM.match(url, route)
                url = parma ? route : url
                if(parma){
                    isUrlExist = true
                    break
                }
            }
            // 页面不存在
            if(!isUrlExist) url = '*'

            var item = JSM.cache[url]
            if (!item) return
            // 重定向
            if(item.redirect){
                this.redirect(item.redirect)
                return
            }

            // 判断是已经加载过了
            if (item.state) {
                // 执行模块
                item.init(parma)
                fun && fun()
                return
            }

            // 没有加载去就加载
            var script = document.createElement('script')
            script.src = item.src
            document.head.appendChild(script)

            // js加载成功
            script.onload = function() {
                // 修改状态为已加载
                item.state = 1
                item.init(parma)
                fun && fun()
            }

            // js加载失败
            script.onerror = function(){
                item.error ? item.error() : JSM.handleError && JSM.handleError()
            }

            // 文件停止加载
            script.onabort = function(){

            }
        },
        // 重定向
        redirect(targetUrl){
            location.href = '#'+targetUrl
        },
        // 路由发生变化时的处理
        routeChange: function() {
            var route = location.hash.slice(1)
            JSM.load(route)
        },
        // 为指定路由，添加文件加载前事件，文件加载后事件
        listen: function(url, events) {
            var item = this.cache[url]
        },
        // 初始化
        init: function() {
            /*
             * 当路由转换时，会去加载js文件，然后js文件执行
             * 但如果文件已经加在过，此时他就不会再执行，因此js文件内的代码应该是一个函数
             * 加载完毕后，会把函数注册到一个全局cache中，函数对应的key与url有映射关系
             */
            // 定义一个加载器，接受两个参数 @url: 路由 @fun: 函数
            window.define = function(url, fun) {
                JSM.cache[url] && (JSM.cache[url].init = fun)
            }

            this.routeChange()
            // 时间监听
            window.onhashchange = this.routeChange
        }
    }
})();

// 被加载文件，还依赖其他文件的做法也很简单，就是等被依赖文件加载完成后再执行这个文件即可
JSM.addCache({
    '': {
        redirect: '/home'
    },
    '/bit': {
        redirect: '/home'
    },
    '/home': {
        src: './a.js', // 需要加载的js文件
        state: 0 , // 文件是否已经加载过
        redirect: '', // 重定向地址
        error: function(){  // 处理文件加载失败
            $('#content').textContent = '首页加载失败'
        }
    },
    '/about/:id/:sth': {
        src: './b.js'
    },
    // 对于未配置路由
    '*': {
        src: './c.js'
    }
})

JSM.handleError = function(){
    // 处理请求文件请失败情况
    $('#content').textContent = '请求不到数据'
}
