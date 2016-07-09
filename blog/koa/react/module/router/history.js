
// 监听hash变化
window.addEventListener('hashchange', ()=>{
    Router.urlChange(location.hash.slice(1))
})

// 监听url变化
hist = {
    push(stateObj, title, url){
        // 当pushState浏览器url1改变为url2,url2跳转到其他url3，再回退到url2时，popstate被触发的event对象中的state指向stateObj。 好绕/(ㄒoㄒ)/~~
        window.history.pushState(stateObj, title, url)
        // title && (document.title = title)
    },
    replace(stateObj, title, url){
        window.history.replaceState(stateObj, title, url)
        // title && (document.title = title)
    }
}

window.addEventListener('popstate', (event)=>{
    console.log(event.state);
})
