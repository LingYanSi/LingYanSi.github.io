'use strict'
let fs = require('fs')
let path = require('path')
let util = require('util')
let sizeOf = require('image-size') // 获取图片大小

let _ = require('lodash')
let pug = require('pug')

let jadeTpl = fs.readFileSync('./koa/jade/index.jade', 'utf8')
let check_login = require('./util/check_login')
let cdn = require('./util/cdn')
let IP = require('./util/ip')()

const ROOT_PATH = path.resolve(__dirname, './../../')
const ARTICLE_LIST_PATH = path.resolve(ROOT_PATH, `./static1/database/article/`)
let articleList = require('./util/blog_list')(ARTICLE_LIST_PATH)

let source = require(path.resolve(ROOT_PATH, 'router_config.js'))

const loadfile = function(path) {
    return source[path] || path
}
loadfile.source = source
loadfile.sourceStr = JSON.stringify(source)

let DB = require('./db/connect')

console.log(`打开 http://${IP}:3000`);

module.exports = function(router, koaBody) {
    router.get('/', function*() {
            // 是否登录
            const state = check_login(this)
            // 全局信息
            let __global__ = {
                login: state,
                username: '灵岩',
                avatar: ''
            }
            const tpl = pug.render(jadeTpl, {
                    loadfile: loadfile ,
                    __global__: JSON.stringify(__global__)
                })
                // console.log(tpl)
            this.body = tpl
        })
        .get('/about', function*() {
            console.log(this.cookies.get('___rl__test__cookies'));
            this.body = '关于'
        })
        .post('/login', koaBody, function*() {
            let data = JSON.parse(this.request.body)
                // 登录
            if (data.password === 'lingyan1023!@#') {
                this.cookies.set('__fuck_you__', 'fuck__you__xijinping', {
                    maxAge: 1000 * 60 * 60 * 24,
                    httpOnly: false,
                    secure: false,
                    overwrite: true
                })
                this.body = JSON.stringify({
                    status: {
                        code: 1001,
                        msg: '登陆成功'
                    },
                    result: {

                    }
                })
                return
            }
            this.body = JSON.stringify({status: {code: 4000}, result: '密码错误'})
        })
        .post('/signout', function*() {
            this.cookies.set('__fuck_you__', '', {
                maxAge: -1,
                httpOnly: false,
                secure: false,
                overwrite: true
            })
            this.body = JSON.stringify({
                status: {
                    code: 1001
                },
                result: '已退出'
            })
        })
        .get('/article/list', function *() {
            // this.body = JSON.stringify(articleList.data)
            let list = yield DB.select()
            list = (list || []).sort((a, b) => {
                return b.create_time - a.create_time
            })
            this.body = JSON.stringify({status: {code: 1001}, result: {list}})
        })
        .get('/article/:id', function *(){
            console.log('文章id', this.params.id)
            const id = +this.params.id
            let data = yield DB.select(`SELECT * from article where id=${id}`)
            this.body = JSON.stringify({status: {code: 1001}, result: data[0] || {}})
        })
        .post('/article/create', koaBody, function*() {
            if (!check_login(this)) {
                this.body = JSON.stringify({status: {code: 4000}, result: '无权限'})
                return
            }

            // http://17koa.com/koa-generator-examples/http/get/query.html
            // query: 获取query body: 获取form 开启multipart 可以获取FormData
            console.log(this.query, this.type, this.method, this.originalUrl, this.ip, this.request.body);

            // 写入
            // var data = _.cloneDeep( this.request.body.fields || {} , this.request.body.files || {} ,this.query )
            let data = JSON.parse(this.request.body)
            const IS_CREATE = !data.id

            data.author = '灵岩'
            data.update_time = new Date().getTime()
            data.create_time = IS_CREATE ? data.update_time : data.create_time
            data.summary = data.content

            if(IS_CREATE){
                let result = yield DB.insert(`INSERT INTO article SET ? `, data)
            }else {
                let result = yield DB.update(`UPDATE article SET content = ?, update_time = ?, tags = ?, summary= ?, title = ?  WHERE id = ?`, [data.content, data.update_time, data.tags, data.summary, data.title, data.id])
            }

            // this.body = JSON.stringify( this.request.body )
            // 重定向
            // this.response.redirect('/#/')
            this.body = JSON.stringify({
                status: {
                    code: 1001,
                    msg: '发布成功'
                },
                result: IS_CREATE ? '发布成功' : '修改成功'
            })
        })
        .post('/article/del', koaBody, function*() {
            if (!check_login(this)) {
                this.body = JSON.stringify({status: {code: 4000}, result: '无权限'})
                return
            }
            let data = JSON.parse(this.request.body)
            var id = data.id

            yield DB.delete(`DELETE FROM article WHERE id = ${id}`)

            this.body = JSON.stringify({
                status: {
                    code: 1001,
                    msg: '删除成功'
                },
                result: '删除成功'
            })
        })
        .post('/upload', function*() {
            if (!check_login(this)) {
                this.body = JSON.stringify({status: {code: 4000}, result: '无权限'})
                return
            }

            // 对于koa来说
            let req = this.req

            let data = ''
            let urlArr = yield new Promise(res => {
                let urlArr = []
                req.setEncoding('binary')
                req.on('data', (chunck) => {
                    data += chunck
                    console.log(chunck);
                })

                req.on('end', () => {
                    // this.body 写在这里会报错
                    let str = data
                        // 截取有用字段
                        /*
                        ------WebKitFormBoundaryUXitzBkPaZRnyeXg
                        Content-Disposition: form-data; name="file"; filename="F2E.png"
                        Content-Type: image/png

                        ------WebKitFormBoundaryUXitzBkPaZRnyeXg--
                        */
                    var BIAOZHI = str.match(/-{6}[^\n]+/)[0]

                    str = str.slice(BIAOZHI.length, -BIAOZHI.length - 2)

                    let regexp = new RegExp(`${BIAOZHI}[^\n]*`, 'g');

                    let arr = str.split(regexp).map(item => item.trim()).filter(item => item)

                    let NUM_CDN_UPLOADED = 0
                    const ARR_LEN = arr.length
                    // let sth = yield Promise.all(
                    arr.map((item, index) => {
                            let line1_arr = item.match(/Content-Disposition[^\n]+/)
                            let line1_str = line1_arr ? line1_arr[0] : ''
                            let line2_arr = item.match(/Content-Type[^\n]+/)
                            let line2_str = line2_arr ? line2_arr[0] : ''

                            line1_str && (item = item.replace(line1_str, ''))
                            line2_str && (item = item.replace(line2_str, ''))


                            let obj = {
                                content: item
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
                                obj.filename = obj.name
                                obj.filename += `${new Date().getTime()}${index}`
                                obj.content = obj.content.trim()

                                const FILE_PATH = path.resolve(ROOT_PATH, `./static1/img/${obj.filename}.${ext}`)
                                    // 本地缓存一份
                                fs.writeFileSync(FILE_PATH, obj.content, 'binary')
                                console.log(obj.content);

                                // 获取图片大小
                                const dimensions = IS_IMG ? sizeOf(FILE_PATH) : {}

                                // 再把图片上传到cdn
                                const d = new Date()
                                const CDN_URL = `/img/${d.getFullYear()}/${obj.filename}.${dimensions.width}x${dimensions.height}.${ext}`

                                // 上传到CDN
                                cdn(FILE_PATH, CDN_URL).then(CND_URL => {
                                    // console.log('上传成功啦', CND_URL);
                                    urlArr.push(CDN_URL)
                                    NUM_CDN_UPLOADED++
                                    // console.log(NUM_CDN_UPLOADED, ARR_LEN);
                                    NUM_CDN_UPLOADED === ARR_LEN && res(urlArr)
                                })
                            }
                            // })

                            // console.log('看看最终数据： ========================》', obj);
                        })
                        // )



                })
            })


            this.body = JSON.stringify({
                url: urlArr
            })
        })
        .get('/*', function*() {
            const tpl = pug.render(jadeTpl, {
                    loadfile: loadfile
                })
                // console.log(tpl)
            this.body = tpl
        })
}

// Async的应用

// function *ajax(url){
//     var result = yield fetch(url)
//     console.log( result )
// }
//
// var g = ajax('index.html')
// g.next().value.then(response=> response.text()).then(data=>g.next(data))

// yield不断回调，直到状态变为done
// async function fuck(url='index.html'){
//     var sb = await fetch(url)
//     var text = await sb.then(res => res.text())
//     return await text.then(data=> data)
// }
//
// fuck().then(data=>console.log)
//
//
// co(function *ajax(){
//     console.log('第一步');
//     var f1 = yield fetch('index.html')
//     console.log('第二部');
//     var text1 = yield f1.text()
//     console.log(text1);
//
//         console.log('第3步');
//     var f2 = yield fetch('push.sh')
//         console.log('第4步');
//     var text2 = yield f2.text()
//     console.log(text2);
//
//     return {
//         text1: text1,
//         text2: text2
//     }
// }).then(function(msg){
//     console.log(msg)
// }, function(msg){
//     console.log('出错了', msg);
// })
