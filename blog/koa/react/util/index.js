
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
            trigger: fn
        }

        return scroll
    })(),
    loadAsyn($ele){
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
    loadImage(){
        let $eles = Array.from(document.querySelectorAll('.lazy-load-img'))
        if(!$eles.length){
            return
        }

        $eles.some($ele => {
            let data = this.loadAsyn($ele)

            let src = data.url
            if(!src){
                return
            }
                // console.log($ele.getBoundingClientRect().top);
                // 图片在上面
            if($ele.getBoundingClientRect().top < -$ele.clientHeight ){
                return
            }
            // 图片在下面
            if($ele.getBoundingClientRect().top > window.innerHeight){
                return true
            }
            let $img = new Image()
            $img.onload = $img.onerror = $img.onabort = ()=>{
                // console.log('家再吃个盖饭');
                $img.onload = $img.onerror = $img.onabort = null
                $img = null
                // console.log('loaded====>',data);
                this.setSrc($ele, data)
                $ele.classList.remove('lazy-load-img')
            }

            $img.src = src

            // 图片已经加载过
            if($img.with || $img.height || $img.complete){
                // console.log('fuck');
                $img.onload = $img.onerror = $img.onabort = null
                $img = null
                this.setSrc($ele, data)
                $ele.classList.remove('.lazy-load-img')
            }
        })
    }
}

Utils.scroll.listen('lazy-load-img', Utils.loadImage.bind(Utils) )
