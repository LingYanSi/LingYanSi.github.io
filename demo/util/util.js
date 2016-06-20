var util = {
    // webp相关
    testWebp: function (){
        var webp = new Image(callback)
        webp.onload = function(){
            console.log('支持webp');
            callback && callback(true)
        }
        webp.onerror = function(){
            console.log('不支持webp')
            callback && callback(false)
        }
        webp.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vlAAAA='
    },
    toWebp: function(imageUrl){
        return imageUrl+'.webp'
    },
    // 获取设备信息
    device: (function(){
        return {
            width: window.innerWidth ,
            height: window.innerHeight
        }
    })(),
    // UA相关
    testUA: function(){
        var ua = navigator.userAgent.toLowerCase()

        var iphone = !!ua.match(/iphone/g) ,
            ipad = !!ua.match(/ipad/g),
            android = !!ua.match(/android/g),
            app = !!ua.match(/app/g)

        // 需要不同系统版本
        return {
            ios: iphone || ipad ,
            android: android,
            ipad: ipad,
            android: android,
            iphone: iphone
        }
    },
    // url search hash
    // cookie
    fetch: (function(){
        var isAjaxing = false ;
        return function(){
            if(isAjaxing){
                console.log('正在请求中');
                return
            }

            isAjaxing = true

            setTimeout(function(){
                isAjaxing = false
            },5000)
            //
        }
    }())

}
