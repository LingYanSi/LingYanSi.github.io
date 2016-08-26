let fs = require('fs')
let path = require('path')

const CT = {
    js: 'application/javascript; charset=utf-8',
    css: 'text/css; charset=utf-8',
    html: 'text/html; charset=utf-8',
    jpg: 'image|jpg',
    webp: 'image|webp',
    png: 'image|png',
    gif: 'image|png',
    jpeg: 'image|jpeg',
    mp4: 'video|mp4',
    mp3: 'audio|mp3'
}

module.exports = function(dir, option){

    return function *(next) {
        // console.log('访问静态文件', this.url, dir, this.req.headers, path.resolve(this.url.slice(1)));
        let filepath = this.url.slice(1)

        if(filepath.startsWith(dir)){
            // 先判断文件是否存在
            if( fs.existsSync(filepath) ){
                // 读取文件信息
                let STAT = fs.statSync(filepath)

                // 设置缓存
                option.maxAge && this.res.setHeader('Cache-Control', `max-age=${option.maxAge}`)
                // 设置文件类型
                let arr = filepath.split('.')
                let ext = arr[arr.length - 1]
                this.res.setHeader('Content-Type', CT[ext])
                // 设置最后一次修改时间
                this.res.setHeader('Last-Modified', new Date(STAT.mtime).toUTCString())

                // 以流的形式返回文件
                fs.ReadStream(filepath).pipe(this.res)
            } else {
                this.body = '文件不存在'
            }
        }else{
            yield next
        }
    }
}
