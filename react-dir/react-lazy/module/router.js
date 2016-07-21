var maps = {
    '/': '/fuck.js',
    '/home': '/home.js',
    '/home/:id': '/home.js',
    '*': '/notfound.js'
}
// 还需要增加一个路由匹配规则

var match = (function(){
    let cache = {}

    return function match(url, maps){
        if(cache[url]){
            return cache[url]
        }

        let param = {}
        let filepath = maps['*']
        let path = ''

        Object.keys(maps).some(item => {
            if(item == '*') return

            // 两者完全相等
            let url_arr = url.split('/')
            let item_array = item.split('/')
            const url_arr_length = url_arr.length
            const item_array_length = item_array.length

            if(item_array_length > url_arr_length) return

            if(item_array_length == url_arr_length){
                let isMatch = url_arr.every((ele, index) => {

                    let item_ele = item_array[index]
                    if(/:.+/.test(item_ele)){
                        param[item_ele.slice(1)] = url_arr[index]
                        return 1
                    }

                    if(item_ele == ele){
                        return 1
                    }
                })

                return isMatch && (path = item) && (filepath = maps[item])
            }

            if(item_array[item_array_length-1] == '*' && item_array_length < url_arr_length){
                let isMatch = item_array.every((ele, index) => {
                    if(index < item_array_length - 1) {
                        let url_ele = url_arr[index]
                        if(/:.+/.test(ele)){
                            param[ele] = url_ele
                            return 1
                        }

                        if(url_ele == ele){
                            return 1
                        }
                    }
                    return 1
                })

                return isMatch && (path = item) && (filepath = maps[item])
            }
        })

        return cache[url] = {
            param ,
            filepath,
            path
        }
    }
})()

// console.log('路由匹配', match('/about/sthssssss/22222', maps) );


window.cache = {}

window.Router = (function(cache, maps){
    console.log(cache, maps);
    // 是否使用hash做路由
    const USE_HASH = true

    let changeFunCache = []

    var router = {
        loadScript: function(url){
            let {filepath, param, path} = match(url, maps)
            let matchObj = {filepath, param}
            filepath = '/dist/js/pages'+filepath

            // 触发url change事件
            this.change(path)

            return new Promise(function(resolve, reject){
                if(!cache[path]){
                    console.log('从网络加载js文件', filepath);

                    var script = document.createElement('script')
                    script.src = filepath
                    document.head.appendChild(script)

                    script.onload = function(){
                        // promise实现
                        resolve(matchObj)
                        script = null
                    }

                    script.onerror = script.onabort = function(){
                        // promise实现
                        resolve('加载失败')
                        script = null
                    }
                }else{
                    console.log('js文件已经加载过', filepath);
                    resolve(matchObj)
                }
            })
        },
        render: function(component, param){
            console.log('渲染', component, param);
            // 强制渲染组件，没有dom-diff
            ReactDOM.render(React.createElement(component, {param}, null), document.querySelector('#app'))
        },
        load: function(url){
            url = url || '/'

            this.loadScript(url).then((matchObj)=>{
                this.render(cache[matchObj.filepath], matchObj.param)
            },function(){
                console.log('加载失败');
            })
        },
        events: function(){
            // 可以监听url变化, history.pushState history.replaceState 不会触发popstate事件
            window.addEventListener('popstate', ()=>{
                this.load( this.getCurrentPath() )
            })
        },
        getCurrentPath(){
            return USE_HASH ? location.hash.slice(1) : location.pathname
        },
        init(){
            this.load( this.getCurrentPath() )
            this.events()
        },
        pushState: function(url){
            USE_HASH ? (location.href = `#${url}`) : history.pushState(null, '', url)
            USE_HASH || this.load(url)
        },
        addChangeListener(fun){
            changeFunCache.push(fun)
        },
        removeChangeListener(fun){
            changeFunCache = changeFunCache.filter(item => item !== fun)
        },
        change(path){
            changeFunCache.forEach(item => {
                item(path)
            })
        }
    }
    router.init()

    return router
})(window.cache, maps)
