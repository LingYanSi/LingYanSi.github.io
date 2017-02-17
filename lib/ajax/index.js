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

    function paramsToString(obj) {
        let str = ''
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                let value = obj[key]

                key = encodeURIComponent(key)
                value = encodeURIComponent(JSON.stringify(value))

                str += `&${key}=${value}`
            }
        }

        return str
    }

    // object -> string
    // key=value&key[key1]=value
    function commonToString(object, prev = '', arr = []) {
        for (var variable in object) {
            if (object.hasOwnProperty(variable)) {

                let value = object[variable]
                let key = prev ? `${prev}[${variable}]` : variable

                if(typeof object[variable] == 'object') {
                    commonToString(value, key, arr)
                } else {
                    [key, value] = [key, value].map(encodeURIComponent)
                    arr.push(`${key}=${value}`)
                }
            }
        }

        return arr.join('&')
    }

    // 唯一字符串
    function uuid() {
        let now = Date.now()
        return '__jsonp__' + now + Math.round(now * Math.random())
    }

    // 请求进度条，可以通过ajax进度条实现
    let ajax = function(url = '', options = {}){
        // 一般而言，method/body 就够使用了
        // 因此在这里把cache复写

        let {method = 'get', dataType = 'json', body = '', onProgress, timeout} = options

        // 支持jsonp
        if (dataType == 'jsonp') {
            return new Promise((resolve, reject) => {
                let script = document.createElement('script')

                if (typeof body == 'object') {
                    body = commonToString(body)
                    console.log(body)
                } else {
                    encodeURIComponent(body)
                }

                // 获取唯一的函数名
                let callback = uuid()
                // 注册函数，用来接收返回值
                window[callback] = (response)=>{
                    resolve(response)
                }

                body += `&type=${method}&callback=${callback}`

                console.log(body)

                script.src = url + '?' + body

                script.addEventListener('load', ()=>{
                    document.head.removeChild(script)
                })

                script.onerror = script.onabort = (msg)=>{
                    reject({
                        type: 'error',
                        msg
                    })
                }
                document.head.appendChild(script)
            })
        }

        // xhr
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()

            xhr.addEventListener('abort',(msg)=>{
                console.log('abort', msg);
                reject({
                    type: 'error',
                    msg
                })
            }, false)

            xhr.addEventListener('error',(msg)=>{
                console.log('error', msg);
                reject({
                    type: 'error',
                    msg
                })
            }, false)

            xhr.upload && (xhr.upload.onprogress = function(event){
                onProgress && onProgress(event)
                console.log('文件上传中', event);
            })

            xhr.open(options.method || 'Get', url, true)

            // 注意，非get请求参数，通过json字符串发送数据
            // 如果是FromData则发送FormData
            // 如果body不是formdata/string 就JSON.stringify一下
            if(!(body instanceof window.FormData) && typeof body != 'string'){
                body = JSON.stringify(body)
            }

            // 监听state变化
            xhr.addEventListener('readystatechange', (state) => {
                if (xhr.readyState == 4) {
                    let result = xhr.responseText
                    dataType == 'json' ? resolve(JSON.parse(result)) : resolve(result)
                }
            })

            // 超时
            timeout && setTimeout(()=>{
                reject({
                    type: 'timeout'
                })
            }, timeout)

            xhr.send(body)
        })

    }

    ajax.origin = __fetch

    return ajax

})(window.fetch)
 
