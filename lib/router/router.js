// 路由应该有一下功能
// url匹配，参数传递

/*
url = /xxx/:id/:xxx
可使用参数，参数支持正则匹配
*/

const MAPS = {
    '/': {title: '首恶', src: '/src/index.js'},
    '/a/:id': {title: '首页啊', src:'/src/a.js' },
    '/b': {title:'你的呀额' , src:'/src/b.js' },
    '/about/detail/:id/': {title: '哈哈'},
    '/a/:c/:b/': {title: '你说什么呢'},
    '/friend': {title: '朋友'},
    '/friend/fuck': {title: 'fuck friend'},
    '*': {title: '匹配全部'}
}

function register(url, component){
    if (MAPS[url]) {
        console.log(url, component);
        MAPS[url].component = component
    } else {
        console.error('路由未注册');
    }
}

var router = (function(maps){
    // parser 的作用在于对字符串进行分析
    // :id 表示变量
    // ::dd=^\d+\b+ 表示正则匹配

    // 解析url
    function parser(url) {
        var router = {}
        //
        let orign = url
        //
        url = url.trim()
        url = url.replace(/\/+/g, '/')
        // 掐头去尾
        url = url.replace(/(^\/)|(\/$)/g, '')

        let arr = url.split('/').map(item => {
            item = item.trim()
            if(!/:.+/.test(item)) {
                // 字符串
                return {
                    type: 'string',
                    value: item
                }
            } else if (/:[^:]+/.test(item)) {
                // 变量
                return {
                    type: 'var',
                    value: item.slice(1)
                }
            } else {
                // 正则表达式
                let [key, reg] = item.slice(2).split('=')
                return {
                    type: 'reg',
                    value: key,
                    reg
                }
            }
        })

        return arr
    }

    // 单个匹配
    function compare(router, url_arr) {
        let router_arr = parser(router)

        let params = {}

        if( router_arr.length != url_arr.length) {
            return false
        }
        let matched = url_arr.some( (item, index) => {
            let {type, value, reg} = router_arr[index]

            switch (type) {
                case 'string':
                    if(value !== item.value) {
                        return true
                    }
                    break;
                case 'var':
                    if(undefined === item.value) {
                        return true
                    }
                    params[value] = item.value
                    break;
                case 'reg':
                    if(undefined === item.value) {
                        return true
                    }
                    params[value] = item.value
                    break;
                default:

            }
        })

        return !matched && params
    }
    // 使用url去匹配router object
    function compareArr(url, routerObject) {
        let url_arr = parser(url).map(item => {
            item.value = decodeURIComponent(item.value)
            return item
        })
        const routerArr = Object.keys(routerObject)

        let result, path, params
        result = routerArr.some(router => {
            path = router
            // 匹配全部
            if(router == '*') {
                params = {}
                return params
            }
            params = compare(router, url_arr)
            return params
        })

        return result && {
            path ,
            orign: url,
            params,
            value: routerObject[path]
        }
    }

    var history = []
    var id = 0
    var currentId = id
    var router = {
        // 历史跳转
        go(index){
            // 以当前为基准
            let position = this.getCurrentIndex()

            let item = history[position + index]
            console.log(history, position);
            if (item) {
                currentId = item.id
                let url = item.url
                this.handle(url)
            } else {
                console.log('不存在');
            }

        },
        // 获取当前url在history中的index
        getCurrentIndex(){
            let position
            history.some((item, index) => {
                 item.id === currentId && (position = index)
                return item.id === currentId
            })
            return position
        },
        handle(url){
            let result = compareArr(url, maps)
            console.log(result)

            let src = result.value.src
            let path = result.path
            let params = result.params
            let props = {
                params
            }

            // 对于已经加载过的文件，直接渲染
            if(maps[path].component) {
                console.log('文件已被夹在过')
                document.querySelector('#app').innerHTML = maps[path].component.render(props)
            } else {
                console.log('加载新文件');
                this.loadScript(src).then(success => {
                    document.querySelector('#app').innerHTML = maps[path].component.render(props)
                }, fail => {

                })
            }
        },
        loadScript(src){
            return new Promise((resolve, reject) => {
                let script = document.createElement('script')
                script.async = true
                script.onload = function(){
                    resolve()
                }
                script.onerror = script.onabort = function(){
                    reject()
                }
                script.src = src
                document.head.appendChild(script)
            })
        },
        href(url){
            // 如果new url 与 old url相同就不刷新了
            if (!history.length || url != history[history.length - 1].url) {
                let position = this.getCurrentIndex()
                currentId = ++id
                // href到新链接时候，需要把当前链接后面的数据清除掉
                history.splice(position+1, history.length, {
                    id ,
                    url
                })

                this.handle(url)
            }
        },
        back(){
            this.go(-1)
        },
        forward(){
            this.go(1)
        },
        history
    }

    return router
})(MAPS)

// pushstate改变的url，发生变化
window.addEventListener('popstate', function(){
    let url = location.pathname
    router.href(url)
})

// 劫持a标签
document.body.addEventListener('click', function(event){
    let $target = event.target
    if ($target.tagName.toLowerCase() == 'a') {
        let url = ($target.pathname || '').trim()
        if (!url) return

        event.preventDefault()
        history.pushState('state', 'title', url)
        router.href(url)
    }
})
