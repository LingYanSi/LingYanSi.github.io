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
    let ajax = function(url, options = {}){
        // 一般而言，method/body 就够使用了
        // 因此在这里把cache复写
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()

            // 事件监听
            xhr.addEventListener('progress',(event)=>{
                // 下载进度条
                options.progress && options.progress(event.loaded/event.total)
                // console.log('progress', event);
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
            xhr.open(options.method || 'GET', url, true)
            options.contentType && xhr.setRequestHeader("Content-Type", options.contentType);

            // 注意，非get请求参数，通过json字符串发送数据
            // 如果是FromData则发送FormData
            let body = options.body
            // if(! body instanceof window.FormData){
            //     body = JSON.stringify(body)
            // }
            xhr.responseType = 'text'
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
            // 性能调优
            requestAnimationFrame ? requestAnimationFrame( ()=>{ that.fn() } ) : that.fn()
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
            // console.log(cache );
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
    // 获取cdn图片路径
    getImageCDNSrc(url, options = {}){
        // 获取
        let a = document.createElement('a')
        a.href = url
        url = a.pathname
        a = null

        options = this.assign({
            q: 75,
            format: Utils.__webp_surport__ ? 'webp' : ''
        }, options)

        let optionsStr = Object.keys(options).map(key=>{
            return options[key] ? `/${key}/${options[key]}` : ''
        }).reduce((a, b)=>{
            return a+b
        })
        // merge一下就可以了
        return this.CDN.qiniu + url + '?imageView2/2' + optionsStr
    },
    assign(target = {}, ...arr){
        arr.forEach(item => {
            for(let key in item){
                target[key] = item[key]
            }
        })

        return target
    },
    // 返回cdn域名
    CDN: (function(){
        let fn = function(){
            // 返回一个随机域名
            let index = Math.round( Math.random()* len )
            index = Math.max(index, 0)
            return fn.all[index]
        }
        fn.qiniu = `http://o9fl7r0ix.bkt.clouddn.com`
        fn.all = [fn.qiniu]
        var len = fn.all.length - 1

        return fn
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
                    $ele.removeAttribute('data-lazy-img')
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

                return new Promise((resolve, reject) => {
                    if(__webp_surport__ === true){
                        resolve(true)
                        return
                    }
                    if(__webp_surport__ === false){
                        resolve(false)
                        return
                    }

                    let $img = new Image()
                    $img.onload = function(){
                        Utils.__webp_surport__  = __webp_surport__ = true
                        resolve(true)
                        $img = null
                    }
                    $img.onerror = function(){
                        __webp_surport__= false
                        resolve(false)
                        $img = null
                    }

                    $img.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vlAAAA='
                })
            }
        })(),
    },
    // 加载图片
    loadImage(){
        console.log(Utils.__webp_surport__);
        // 优化
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

            // 根据是不是支持webp， 对图片做一些处理，加载图片
            this.loadImageUtil.webp().then(webp => {
                const options = {
                    format: webp ? 'webp' : ''
                }
                // 修改文件路径
                $img.src = data.url = this.getImageCDNSrc(src, options)
                // 图片已经加载过
                if($img.width || $img.height || $img.complete){
                    // console.log('fuck');
                    $img.onload = $img.onerror = $img.onabort = null
                    $img = null
                    this.loadImageUtil.setSrc($ele, data)
                }
            })

        })
    },
    // ajax/fetch
    fetch: __fetch,

    getKey(data){
        return new Promise(res => {
            fetch('http://dev.weipaitang.com/manage/getUploadUrl?package='+ JSON.stringify(data))
                .then(res => res.json())
                .then(data => {
                    res(data.requestUrl);
                })
        })
    },
    upload( files = [], fn = {}){
        let {onStart, onEnd, onError, onProgress} = fn
        let f = new FormData()
        Promise.all(Array.from(files).map(file => {
            return this.zip(file, 1)
        })).then(res => {
            res.forEach((file, index) => {
                // 对文件名进行编码，避免中文乱码
                // file.name = encodeURIComponent(file.name)
                f.append(`file${index}`, file)
            })

            onStart && onStart()
            // Utils.fetch('/upload', {
            //     method: 'POST',
            //     body: f,
            //     uploadProgress:(percent)=>{
            //         onProgress && onProgress(percent)
            //     }
            // }).then(res => {
            //     onEnd && onEnd(res)
            // })
            // return

            let file = f = res[0]


            const option = {
                dataSize: file.size,
                fileName: file.name ,
                fileSha: '9c4de28f4ac0bf5d75a2f537ad61df1e2c0a60e9',
                fileSize: file.size ,
                fileType: file.type.split('/')[1].toUpperCase() ,
                offset: 0,
            }


            const TYPE = file.type
            this.getKey(option).then(uploadUrl => {
                console.log('服务器地址', uploadUrl);
                uploadUrl = uploadUrl.replace('https://', 'http://')
                let query = this.query(uploadUrl)

                query = this.assign({}, query, {
                    utype: 1,
                    notifyUrl: 'http://dev.weipaitang.com/manage/videoCallback',
                    name: query.fileName,
                    isScreenshot: 1,
                    isTranscode: 1,
                    isWatermark: 1,
                })

                let search = this.sort(query, ['Action', 'Nonce', 'Region', 'SecretId', 'Timestamp', 'dataSize', 'fileName', 'fileSha', 'fileSize', 'fileType', 'isScreenshot', 'isTranscode', 'isWatermark', 'name', 'notifyUrl', 'offset', 'utype', 'Signature'])

                uploadUrl = uploadUrl.slice(0, uploadUrl.indexOf('?')) + '?' + search

                console.log('文件大小', f.size/1024/1024)
                // f = f.slice(0, 500)
                f = f.slice(0, 950*1024 )

                Utils.fetch(uploadUrl, {
                    method: 'POST',
                    body: f,
                    contentType: 'application/octet-stream',
                    uploadProgress:(percent)=>{
                        onProgress && onProgress(percent)
                    }
                }).then(res => {
                    onEnd && onEnd(res)
                })

                // let sth = new FileReader()
                // sth.readAsArrayBuffer(f)
                //
                // sth.onloadend  = function(res){
                //
                //     let f = res.target.result
                //
                //     console.log(f instanceof ArrayBuffer);
                //
                //
                // }
            })


        })
    },
    sort(obj, arr){
        let str = arr.map(item => {
            return item + '=' + (obj[item] || '')
            return obj[item] ? (item + '=' + obj[item] ): ''
        }).filter(item => item).join('&')

        return str
    },
    query(url){
        url = new URL(url)
        const search = url.search.slice(1)
        let query = {}
        search.split('&').map(item => {
            let [key, value] = item.split('=')
            query[key] = value
        })
        return query
    },
    // 图片压缩，文件类型转换 etc
    zip(file, quality = .01){
        // canvas toBlob polyfill
        if (!HTMLCanvasElement.prototype.toBlob) {
            Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
                value: function(callback, type, quality) {

                    var binStr = atob(this.toDataURL(type, quality).split(',')[1]),
                        len = binStr.length,
                        arr = new Uint8Array(len);

                    for (var i = 0; i < len; i++) {
                        arr[i] = binStr.charCodeAt(i);
                    }

                    callback(new Blob([arr], {
                        type: type || 'image/png'
                    }));
                }
            });
        }

        // 对于大于1.5M的图片做一个强制压缩
        const SIZE = file.size/1024/1024
        if(quality != 1 && SIZE >= 1.5){
            quality = .5
        }

        return new Promise(function(resolve, reject){
            // alert(file.type)
            // 对于非图片文件，直接上传
            if(SIZE < 1.5 || quality >= 1 || quality <= 0 || !file.type.startsWith('image/')) return resolve(file)
            let canvas = document.createElement('canvas')

            // 获取到图片的宽高
            const url = window.URL.createObjectURL(file)
            // console.log('图片路径', url, file);
            // alert(file.type)
            let $img = document.createElement('img')
            $img.onload = function(){
                let {width, height} = $img
                canvas.width = width
                canvas.height = height
                // document.body.appendChild(canvas)
                let cxt = canvas.getContext('2d')
                cxt.drawImage($img, 0, 0,canvas.width,canvas.height);
                $img = null
                canvas.toBlob(function(Bob){
                    resolve(Bob)
                }, file.type || "image/jpeg" , quality)
            }

            // 加载错误，不是图片类型，直接返回原文件
            $img.onerror = function(){
                resolve(file)
            }
            $img.src = url
        })
    },
    init(){
        return new Promise(res => {
             Utils.loadImageUtil.webp().then(webp => {
                Utils.scroll.listen('lazy-load-img', Utils.loadImage.bind(Utils) )
                res('异步执行完')
            })
        })
    }
}

// 在加载图片前，先加载校验是不是支持webp
