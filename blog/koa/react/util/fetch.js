// fetch pollify

// 加入缓存机制，cache会被放在sessionStorage里面，如果真实请求的数据和缓存数据一样，则不更新视图
let __fetch = (function(__fetch){
    // 根据 type url data dataType 来作为key
    let cache = {}

    // options = {
    //     method: post/get/delete/put/head etc
    //     body: string/formdata/bob/array etc
    //     header: 自定义头
    //     mode: cros/same-cros/no-cros 跨域相关
    //     cache: default etc缓存相关
    // }

    // 请求进度条，可以通过ajax进度条实现
    let ajax = function(url, options){
        // 一般而言，method/body 就够使用了
        // 因此在这里把cache复写
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()

            // 事件监听
            xhr.addEventListener('progress',(event)=>{
                // 下载进度条
                options.progress && options.progress(event.loaded/event.total)
                console.log('process', event);
            }, false)
            xhr.addEventListener('abort',(xx)=>{
                console.log('abort', xx);
            }, false)
            xhr.addEventListener('error',(xx)=>{
                console.log('error', xx);
            }, false)
            xhr.addEventListener('load',(xx)=>{
                console.log('load', xx);
            }, false)

            // 上传进度条
            xhr.upload.onprogress = function(event){
                console.log('文件上传中', event);
                options.uploadProgress && options.uploadProgress(event.loaded/event.total)
            }

            xhr.open(options.method || 'Get', url, true)

            // 注意，非get请求参数，通过json字符串发送数据
            // 如果是FromData则发送FormData
            let body = options.body
            if(! body instanceof window.FormData){
                body = JSON.stringify(body)
            }

            // 监听state变化
            xhr.addEventListener('readystatechange', (state) => {
                console.log(xhr.readyState, xhr.responseText, xhr.status);
                if(xhr.readyState == 4){
                    resolve(xhr.responseText)
                }
            })

            // 发送post数据
            xhr.send(body)
        })

    }

    ajax.origin = __fetch

    return ajax

})(window.fetch)

module.exports = __fetch
