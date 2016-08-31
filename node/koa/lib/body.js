// body 用来处理post请求


let path = require('path')
let fs = require('fs')

// 图片上传
var upload =  function(req, DIR){
    let data = []
    return new Promise(res => {
        let urlArr = []
        // 文件为二进制流
        try{
            req.on('data', chunk => {
                data.push(chunk)
                console.log('上传中。。。。');
            })

            req.on('end', () => {
                // this.body 写在这里会报错
                let str = ''
                // 如果是
                const CT = req.headers['content-type'] || ''

                // from表单上传，文本
                if (CT.startsWith('application/x-www-form-urlencoded') ) {
                    str = Buffer.concat(data).toString('binary')
                    res(str)
                    return
                }

                // 文本类型
                if (CT.startsWith('text/plain')) {
                    str = Buffer.concat(data).toString('utf8')
                    res(str)
                    return
                }

                // 没有json类型
                if (CT.startsWith('text/json')) {
                    str = Buffer.concat(data).toString('utf8')
                    res(str)
                    return
                }
                    // 截取有用字段
                    /*
                    ------WebKitFormBoundaryUXitzBkPaZRnyeXg
                    Content-Disposition: form-data; name="file"; filename="F2E.png"
                    Content-Type: image/png

                    ------WebKitFormBoundaryUXitzBkPaZRnyeXg--
                    */
                // form-data上传
                if(!CT.startsWith('multipart/form-data')){
                    res(Buffer.concat(data).toString('utf8'))
                    return
                }

                // 我就是一个大傻逼，不知道把标志符号trim一下
                str = Buffer.concat(data).toString('binary')
                const BIAOZHI = str.slice(0, str.indexOf('\n')).trim()
                let regexp = new RegExp(`[^\n]*${BIAOZHI}[^\n]*`)
                // 分割/过滤数据
                let arr = str.split(regexp)
                    .map(item => item.trim())
                    .filter(item => item)
                    .map((item, index) => {
                        let line1_arr = item.match(/Content-Disposition[^\n]+/)
                        let line1_str = line1_arr ? line1_arr[0] : ''
                        let line2_arr = item.match(/Content-Type[^\n]+/)
                        let line2_str = line2_arr ? line2_arr[0] : ''

                        line1_str && (item = item.replace(line1_str, ''))
                        line2_str && (item = item.replace(line2_str, ''))


                        let obj = {
                            content: item.trim()
                        }
                        line1_str && line1_str.split(';').forEach(item => {
                            let arr = item.split(/=|:/)
                            if (arr.length != 2) return

                            let [key, value] = arr.map(item => item.trim())
                            if (key != 'Content-Disposition') value = value.slice(1, -1)
                            obj[key] = value
                        })
                        line2_str && line2_str.split(';').forEach(item => {
                            let arr = item.split(/=|:/)
                            if (arr.length != 2) return

                            let [key, value] = arr.map(item => item.trim())
                            if (key != 'Content-Disposition' && value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1)
                            obj[key] = value
                        })

                        // 异步
                        // return new Promise(res => {
                        if (obj['Content-Type'] && obj.content) {
                            const IS_IMG = obj['Content-Type'].startsWith('image')
                            let ext = obj['Content-Type'].split('/')[1]
                            // 把quicktime转成MP4
                            ext = ext == 'quicktime' ? 'mp4' : ext
                                // ie post的数据竟然没有filename，卧槽
                            obj.filename += `${new Date().getTime()}${index}`
                            obj.content = obj.content.trim()

                            const FILE_PATH = path.resolve('', `${DIR}/${obj.filename}.${ext}`)
                                // 本地缓存一份
                            fs.writeFileSync(FILE_PATH, obj.content, 'binary')
                            // console.log(obj.content);
                            obj.path = obj.content = FILE_PATH
                        }

                        return obj
                        // console.log('看看最终数据： ========================》', obj);
                    })
                    .filter(item => item.content && item.name)

                let obj = {
                    files: {},
                    text: {}
                }

                arr.forEach(item => {
                    const key = item.path ? 'files' : 'text'
                    let store = obj[key]
                    const name = item.name

                    // 如果是文件的话，默认是数组
                    if(key == 'files') {
                        store[name] = store[name] || []
                        store[name].push(item.content)
                    }else {
                        store[name] = item.content
                    }
                })

                res(obj)
            })
        }catch(err) {
            console.log(err);
        }

    })
}

module.exports = function *(next){

    let req = this.req
    // console.log(Object.keys(req));
    const contentType = this.req.headers['content-type'] || ''

    let ENCODE = 'uft8'
    console.log('content-type', contentType);

    // 可接受的content-type
    const CTS = [
        'multipart/form-data',
        'text/plain',
        'application/x-www-form-urlencoded'
    ]

    if(CTS.some(item => contentType.startsWith(item))){
        this.req.body = yield upload(req, './src/')
    }

    console.log('内容', this.req.body);

    yield next
}
