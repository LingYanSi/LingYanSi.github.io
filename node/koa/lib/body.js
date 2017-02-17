
let path = require('path')
let fs = require('fs')

const FBL = `file betond limit`
const FBL_BODY = JSON.stringfiy({status: {code: 4000, msg:'文件过大'}})
const ERROR_BODY = JSON.stringfiy({status: {code: 4000, msg:'接收出错'}})

// 图片上传
var upload =  function(ctx, DIR, LIMIT){
    let req = ctx.req
    let data = []
    return new Promise(res => {
        let urlArr = [] , requestSize = 0
        // 文件为二进制流

        // 接收文件
        let receiveData = chunk => {
            data.push(chunk)
            requestSize += chunk.length/1024/1024

            // requestSize记录了接受了多大的文件流，可以做limit限制
            console.log('上传中。。。。');
            if(LIMIT && requestSize > LIMIT){
                data = null
                ctx.body = UPLOAD_ERROR
                res(FBL)
                // 移出事件监听
                removeListener()
            }
        }

        // 文件接收结束
        let receiveEnd = () => {
            // this.body 写在这里会报错
            let str = ''
            // 如果是
            const CT = req.headers['content-type'] || ''

            // from表单上传，文本
            if (CT.startsWith('application/x-www-form-urlencoded') ) {
                let obj = {}
                str = Buffer.concat(data).toString('binary')

                // 字符串转json
                str.split('&').filter(item => item.trim()).forEach(item => {
                    let [key, value] = item.split('=').filter(item => item.trim())
                    key && value && (obj[key] = value)
                })

                res(obj)
                return
            }

            // 文本类型
            if (CT.startsWith('text/plain')) {
                str = Buffer.concat(data).toString('utf8')
                // 字符串转json
                let obj = {}
                try{
                    obj = JSON.parse(str)
                }catch(err){
                    console.log('数据不合法');
                    obj = {}
                }
                res(obj)
                return
            }

            // blob image/video/txt etc

            // 没有json类型
            if (CT.startsWith('application/json')) {
                str = Buffer.concat(data).toString('utf8')
                let data = {}
                try {
                    data = JSON.parse(str)
                } catch (e) {

                } finally {
                    res(data)
                }
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
            console.log('数据文件大小', Buffer.concat(data).length/1024/1024, requestSize);

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

                    item = item.trim()
                    let obj = {
                        content: item,
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

                    // 内容不为空，写入文件
                    if (obj['Content-Type'] && obj.content) {
                        const IS_IMG = obj['Content-Type'].startsWith('image')
                        let ext = obj['Content-Type'].split('/')[1]
                        // 把quicktime转成MP4
                        obj.ext = ext = ext == 'quicktime' ? 'mp4' : ext
                            // ie post的数据竟然没有filename，卧槽
                        obj.filename = `${new Date().getTime()}${index}` + obj.filename
                        obj.content = obj.content.trim()

                        // 文件大小
                        obj.size = new Buffer(item, 'binary').length/1024/1024

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

            // 数组转对象
            arr.forEach(item => {
                const key = item.path ? 'files' : 'text'
                let store = obj[key]
                const name = item.name

                // 如果是文件的话，默认是数组
                if(key == 'files') {
                    store[name] = store[name] || []
                    store[name].push({
                        path: item.content,
                        type: item['Content-Type'],

                    })
                }else {
                    store[name] = item.content
                }
            })

            res(obj)
        }

        // 文件接收出错
        let receiveError = () => {
            ctx.body = ERROR_BODY
            res(FBL)
            removeListener()
        }

        let removeListener = () => {
            req.removeListener('data', receiveData)
            req.removeListener('end', receiveEnd)
            req.removeListener('end', receiveError)
        }
        try{
            req.on('data', receiveData)
            req.on('error', receiveError)
            req.on('end', receiveEnd)
        }catch(err) {
            console.log(err);
        }

    })
}


var Upload = function *(next){

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

    // 如果是合法的content-type 就接受并解析数据
    // 我们还需要限制文件大小，不然容易被攻击吧，那如何确定文件大小呢？
    if(CTS.some(item => contentType.startsWith(item))){
        this.req.body = yield upload(this, './src/', Upload.limit)
        // 如果文件大小超出限制
        if(this.req.body === FBL){
            return
        }
    }

    console.log('内容', this.req.body);

    yield next
}

Upload.option = function(option){
    Upload.limit = option.limit
}

module.exports = Upload
