var maps = {
    '/': '/fuck.js',
    '/home': '/home.js'
}
// 还需要增加一个路由匹配规则

Router = (function(){

    window.cache = {}

    // 是否使用hash做路由
    const USE_HASH = true

    var router = {
        loadScript: function(url){
            filepath = '/dist/js/pages'+maps[url]

            return new Promise(function(resolve, reject){
                if(!cache[url]){
                    console.log('从网络加载js文件', filepath);
                    var script = document.createElement('script')
                    script.src = filepath
                    document.head.appendChild(script)

                    script.onload = function(){
                        // promise实现
                        resolve('加载成功')
                        script = null
                    }

                    script.onerror = script.onabort = function(){
                        // promise实现
                        resolve('加载失败')
                        script = null
                    }
                }else{
                    console.log('js文件已经加载过', filepath);
                    resolve('加载成功')
                }
            })
        },
        render: function(component){
            // 渲染组件
            ReactDOM.render(component, document.querySelector('#app'))
        },
        load: function(url){
            url = url || '/'

            this.loadScript(url).then(()=>{
                this.render(cache[url])
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
        }
    }
    router.init()

    return router
})()
