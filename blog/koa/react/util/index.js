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
                console.log('progress', event);
            }, false)
            // 上传停止
            xhr.addEventListener('abort',(xx)=>{
                // console.log('abort', xx);
                reject()
            }, false)
            // 上传失败
            xhr.addEventListener('error',(xx)=>{
                // console.log('error', xx);
                reject()
            }, false)
            // 上传成功
            xhr.addEventListener('load',(xx)=>{
                // console.log('load', xx);
            }, false)

            // 上传进度条
            xhr.upload.onprogress = function(event){
                // console.log('文件上传中', event);
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
                // console.log(xhr.readyState, xhr.responseText, xhr.status);
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

// 简单队列，只执行最后一次被触发的事件
let Queue = function(fn, time=0){
    this.queue = []
    this.fn = fn
    let that = this
    this.tick = function(){
        this.queue.forEach(clearTimeout)
        this.queue.push( setTimeout(function(){
            that.fn()
        },time) )
    }
}

var Utils = {
    // 关于时间
    time: {
        toString(time){
            var date = new Date(+time)
            return `${date.getFullYear()}-${this.fillZero(date.getMonth()+1)}-${this.fillZero(date.getDate())} ${this.fillZero(date.getHours())}:${this.fillZero(date.getMinutes())}:${this.fillZero(date.getSeconds())}`
        },
        fillZero(num){
            if(num < 10) {
                return `0${num}`
            }
            return `${num}`
        }
    },
    lastPosition: {
        set(key, value){
            let lastPosition = Utils.getSessionStorage('lastPosition')
            lastPosition[key] = value
            Utils.setSessionStorage('lastPosition',lastPosition)
        },
        get(key){
            let lastPosition = Utils.getSessionStorage('lastPosition')
            let value = lastPosition[key] || {}
            return value
        }
    },
    getSessionStorage(key){
        let value = window.sessionStorage.getItem(key) || '{}'
        try {
            value = JSON.parse(value)
        } catch (e) {
            value = {}
        }
        return value
    },
    setSessionStorage(key, value){
        window.sessionStorage.setItem(key, JSON.stringify(value))
    },
    // scrill事件统一派发
    scroll: (function(){
        let cache = {}
        let fn = function(){
            console.log(cache );
            for(let key in cache){
                cache[key] && cache[key]()
            }
        }
        // 队列延时
        let fuck = new Queue(fn, 50)
        // 是不是应该把scrollTop给出来
        window.addEventListener('scroll',()=>{
            fuck.tick()
        })

        let scroll =  {
            listen(key, callback){
                cache[key] = callback
                return {
                    detory(){
                        scroll.remove(key)
                    } ,
                    key
                }
            },
            remove(key){
                delete cache[key]
            },
            // 立即执行
            trigger: fn,
            // 延时50ms执行
            tick: fuck.tick.bind(fuck)
        }

        return scroll
    })(),
    // 加载图片工具
    loadImageUtil: {
        // 获取懒加载类型，与资源路径
        data($ele){
            let data = $ele.dataset
            let src = data['lazyImg']
            if(src){
                return {
                    type: 'layzImg',
                    url: src
                }
            }

            let bgd = data['lazyBgd']
            if(bgd){
                return {
                    type: 'lazyBgd',
                    url: bgd
                }
            }

            let poster = data['lazyPoster']
            if(poster){
                return {
                    type: 'lazyPoster',
                    url: poster
                }
            }
        },
        // 设置资源路径
        setSrc($ele, data){
            console.log(data.type);
            switch(data.type){
                case 'layzImg':
                    $ele.src = data.url
                    break
                case 'lazyBgd':
                    $ele.style.backgroundImage = `url(${data.url})`
                    break
                case 'lazyPoster':
                    $ele.poster = data.url
                    break
            }
        },
        //

        webp: (function(){
            let __webp_surport__

            return function(){
                console.log('what the fuck', __webp_surport__);
                return new Promise((resolve, reject) => {
                    if(__webp_surport__ === true){
                        resolve()
                        return
                    }
                    if(__webp_surport__ === false){
                        reject()
                        return
                    }

                    let $img = new Image()
                    $img.onload = function(){
                        __webp_surport__ = true
                        resolve()
                    }
                    $img.onerror = function(){
                        __webp_surport__= false
                        reject()
                    }

                    $img.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vlAAAA='
                })
            }
        })(),
    },
    // 加载图片
    loadImage(){
        let $eles = Array.from(document.querySelectorAll('.lazy-load-img'))
        if(!$eles.length){
            return
        }

        $eles.some($ele => {
            let data = this.loadImageUtil.data($ele)

            let src = data.url
            if(!src){
                return
            }
            // 图片在上面

            let TOP = $ele.getBoundingClientRect().top
            let eleHeight = $ele.clientHeight

            if(TOP < -eleHeight ){
                return
            }
            // 图片在下面，如果图片在视窗下面的话，就不用加载了
            if(TOP > window.innerHeight){
                return true
            }

            let $img = new Image()

            $img.onload = $img.onerror = $img.onabort = ()=>{
                // console.log('家再吃个盖饭');
                $img.onload = $img.onerror = $img.onabort = null
                $img = null
                // console.log('loaded====>',data);
                this.loadImageUtil.setSrc($ele, data)
            }
            // 移除掉class，下一次就不加载了
            $ele.classList.remove('lazy-load-img')

            // 加载图片
            this.loadImageUtil.webp(src).then(resMsg => console.log('支持WEBP!!!!!!!!!!!!!'), rejMsg => console.log('不支持WEBP'))
            $img.src = src

            // 图片已经加载过
            if($img.width || $img.height || $img.complete){
                // console.log('fuck');
                $img.onload = $img.onerror = $img.onabort = null
                $img = null
                this.loadImageUtil.setSrc($ele, data)
            }
        })
    },
    // ajax/fetch
    fetch: __fetch,

}

Utils.scroll.listen('lazy-load-img', Utils.loadImage.bind(Utils) )
