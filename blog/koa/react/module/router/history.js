
// 监听hash变化

let __listenHash = true
let __callback

window.addEventListener('hashchange', ()=>{
    __listenHash && __callback && __callback(location.hash.slice(1))
})

window.addEventListener('popstate', ()=>{
    !__listenHash && __callback && __callback(location.pathname)
})

export default function(listenHash, callback){
    __listenHash = listenHash == 'hash'
    __callback = callback

    return {
            changeUrl: function(url){
                if(__listenHash){
                    location.href = `#${url}`
                }else{
                    history.pushState(null, '', url)
                }
            },
            getPath: function(){
                return __listenHash ? location.hash.slice(1) : location.pathname
            }
    }
}
