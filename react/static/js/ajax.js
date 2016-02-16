function Ajax(obj) {
    return new _Ajax(obj)
}

function _Ajax(obj) {
    /*{
        type: post/get ,
        url: '/ssss',
        async: true/fase, // 是否同步
        data: formData/{},
        dataType: 'string/json/jsonp',
        timeout: 1000 ,
        upload: function
    }*/
    var type = obj.type || 'get',
        url = this.proxy ? this.proxy(obj.url) : obj.url,
        isSync = obj.sync,
        data = obj.data  ,
        dataType = obj.dataType || 'string',
        statechange = obj.statechange ,
        isFormData = data instanceof FormData ,
        upload = obj.upload

    // 返回字符串
    function toParams(obj, isEncodeURI){
        if(!obj) return
        if( isFormData ) return obj
        var arr = []
        for ( var key in obj) {
            // 这个定方恨不完美，如果是数组/对象呢？怎么破
            arr.push( key+'='+obj[key] )
        }
        // 对数据进行转码
        return isEncodeURI ? encodeURI( arr.join('&') ) : arr.join('&')
    }

    // 返回一个promise对象
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();

        isFormData && upload && xhr.upload.addEventListener("progress", (sth)=>{
            // console.log( '上传进度条：',Math.floor(sth.loaded/sth.total*100)+'%')
            upload( Math.floor(sth.loaded/sth.total*100) )
        }, false);

        // 如果是get请求，就把数据加到url后面
        url = type=='get' && toParams(data) ? url + '?'+ toParams(data, true) : url

        xhr.open(type, url, !isSync)

        xhr.onreadystatechange = function() {
            statechange && statechange(this.readyState)
            // readyState结束
            if (this.readyState !== 4) {
                return;
            }
            /*200 表示请求成功 300重定向 400找不到服务 500服务器错误 100握手成功
            status等于后端 writeHead的status
            writeHead(status, {
                'Content-Type': 'text/text;charset=utf-8;'
            })*/
            if (this.status === 200) {
                console.log(this.responseText)
                var data;
                switch (dataType) {
                    case 'string':
                        data = this.responseText
                        break;
                    case 'json':
                        // 对返回数据进行解析
                        try {
                            data = JSON.parse(this.responseText)
                        } catch (e) {
                            console.warn('返回的数据格式不正确')
                            data = {}
                        }
                        break;
                    default:
                }
                resolve(data)
            }else{
                reject(`请求出错,status:${this.status},0:超时,300:重定向,400:找不到服务,500:服务器错误`)
                this.abort()
            }
        }

        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        // 超时处理
        obj.timeout ? (xhr.timeout = obj.timeout) : '';

        // 经测试只有 type=get的时候，后端接收不到 xhr.send 的消息
        xhr.send( type!='get'?toParams(data):'' );
    })
}

_Ajax.prototype = {
    // 用来处理代理请求
    proxyUrl: function(url) {
        return url
        return url + '/songxiaofan'
    },
    proxyData: function(data) {
        return data
    }
}
