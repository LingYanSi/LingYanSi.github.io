// body 用来处理post请求


let path = require('path')
let fs = require('fs')

// 图片上传
var upload =  function(req, ENCODE, DIR){
    let data = ''
    return new Promise(res => {
        console.log('开始接收文件');
        let urlArr = []
        // 文件为二进制流
        try{
            req.setEncoding(ENCODE)
            req.on('data', (chunck) => {
                data += chunck
                console.log('上传中。。。。');
            })

            req.on('end', () => {
                // this.body 写在这里会报错
                let str = data

                // console.log(str, ENCODE);
                if (ENCODE == 'utf8') {
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

                // var BIAOZHI = (str.match(/-{6}[^\n]+/) || [])[0] 


                const BIAOZHI = str.slice(0, str.indexOf('\n'))
                let regexp = new RegExp(`-*${BIAOZHI}-*[^\n]*`, 'g');

                let arr = str.split(regexp).map(item => item.trim()).filter(item => item)
                // console.log(arr);
                // return


                let NUM_CDN_UPLOADED = 0
                const ARR_LEN = arr.length
                // let sth = yield Promise.all(
                arr = arr.map((item, index) => {
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
                        if (obj['Content-Type']) {
                            const IS_IMG = obj['Content-Type'].startsWith('image')
                            let ext = obj['Content-Type'].split('/')[1]
                            // 把quicktime转成MP4
                            ext = ext == 'quicktime' ? 'mp4' : ext
                                // ie post的数据竟然没有filename，卧槽
                            obj.filename += `${new Date().getTime()}${index}`
                            obj.content = obj.content.trim()

                            const FILE_PATH = path.resolve('', `${DIR}/${obj.filename}.${ext}`)
                                // 本地缓存一份
                            fs.writeFileSync(FILE_PATH, obj.content, ENCODE)
                            // console.log(obj.content);
                            obj.path = FILE_PATH
                            delete obj.content
                        }

                        console.log(obj);

                        return obj
                        // console.log('看看最终数据： ========================》', obj);
                    })



                res(arr)
            })
        }catch(err) {
            console.log(err);
        }

    })
}

module.exports = function *(next){

    let req = this.req
    console.log(Object.keys(req));
    const contentType = this.req.headers['content-type']

    let ENCODE = 'uft8'
    console.log('content-type', contentType);
    if(contentType.startsWith('multipart') || contentType.startsWith('application/x-www-form-urlencoded')){
        ENCODE = 'binary'
    }
    this.req.body = yield upload(req, ENCODE, './src/')

    console.log('内容', this.req.body);

    yield next
}
