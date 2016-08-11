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

const ROOT_PATH = path.resolve(__dirname, './../../')
const ARTICLE_LIST_PATH = path.resolve(ROOT_PATH, `./static1/database/article/`)
let articleList = require('./util/blog_list')(ARTICLE_LIST_PATH)

let source = require(path.resolve(ROOT_PATH, 'router_config.js'))

const loadfile = function(path) {
    return source[path] || path
}
loadfile.source = source
loadfile.sourceStr = JSON.stringify(source)

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
            if (data.password === 'xiaofan223!@#') {
                this.cookies.set('__fuck_you__', 'fuck__you__xijinping', {
                    maxAge: 1000 * 60 * 60 * 24,
                    httpOnly: false,
                    secure: false,
                    overwrite: true
                })
                this.body = JSON.stringify({
                    status: {
                        code: 1001
                    },
                    result: '登陆成功'
                })
                return
            }
            this.body = `{status: {code: 4000}, result: '密码错误'}`
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
            this.body = JSON.stringify(articleList.data)
        })
        .post('/article/create', koaBody, function*() {
            if (!check_login(this)) {
                this.body = '你没有权限'
                return
            }

            // http://17koa.com/koa-generator-examples/http/get/query.html
            // query: 获取query body: 获取form 开启multipart 可以获取FormData
            console.log(this.query, this.type, this.method, this.originalUrl, this.ip, this.request.body);

            // 写入
            // var data = _.cloneDeep( this.request.body.fields || {} , this.request.body.files || {} ,this.query )
            let data = JSON.parse(this.request.body)
            const IS_CREATE = !data.id
            const filename = data.id || new Date().getTime()
            data.time = filename
            data.id = filename
            data.tags = data.tags.split(' ')

            const FILE_PATH = path.resolve(ARTICLE_LIST_PATH, `${filename}.json`)
            fs.writeFileSync(FILE_PATH, JSON.stringify(data), 'utf-8');

            console.log('数据写入完成')
            IS_CREATE ? articleList.post(data) : articleList.put(data)
            // this.body = JSON.stringify( this.request.body )
            // 重定向
            // this.response.redirect('/#/')
            this.body = JSON.stringify({
                status: {
                    code: 1001,
                    msg: '发布成功'
                },
                result: data
            })
        })
        .post('/article/del', koaBody, function*() {
            if (!check_login(this)) {
                this.body = '你没有权限'
                return
            }
            let data = JSON.parse(this.request.body)
            var id = data.id

            const FILE_PATH = path.resolve(ARTICLE_LIST_PATH, `${id}.json`)
            fs.unlinkSync(FILE_PATH)

            articleList.delete(id)

            this.body = JSON.stringify({
                status: {
                    code: 1001,
                    msg: '删除成功'
                },
                result: {}
            })
        })
        .post('/upload', function*() {
            if (!check_login(this)) {
                this.body = '你没有权限'
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
                                let ext = obj['Content-Type'].split('/')[1]
                                    // ie post的数据竟然没有filename，卧槽
                                obj.filename = obj.name
                                obj.filename += `${new Date().getTime()}${index}`
                                obj.content = obj.content.trim()

                                const FILE_PATH = path.resolve(ROOT_PATH, `./static1/img/${obj.filename}.${ext}`)
                                    // 本地缓存一份
                                fs.writeFileSync(FILE_PATH, obj.content, 'binary')

                                // 获取图片大小
                                const dimensions = sizeOf(FILE_PATH)

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
