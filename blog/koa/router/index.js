
'use strict'
var fs = require('fs')
var util = require('util')
var _ = require('lodash')
var pug = require('pug')

var jadeTpl = fs.readFileSync( './koa/jade/index.jade', 'utf8' )
var getList = require('./../../util/blog_list.js')
var source = require('./../../router_config.js')

const loadfile = function(path){
    return source[path] || path
}
loadfile.source = source
loadfile.sourceStr = JSON.stringify(source)

module.exports = function (router, koaBody){
    router.get('/', function *(){
        const tpl = pug.render(jadeTpl,{ loadfile: loadfile})
        // console.log(tpl)
        this.body = tpl
    })
    .get('/about', function *(){
        console.log(this.cookies.get('___rl__test__cookies'));
        this.body = '关于'
    })
    .post('/newArticle',koaBody, function *(){

        // http://17koa.com/koa-generator-examples/http/get/query.html
        // query: 获取query body: 获取form 开启multipart 可以获取FormData
        console.log(this.query, this.type, this.method, this.originalUrl, this.ip, this.request.body );

        // 写入
        var data = _.cloneDeep( this.request.body.fields || {} , this.request.body.files || {} ,this.query )
        const filename = data.id || new Date().getTime()
        data.time = filename
        data.id = filename
        data.tags = data.tags.split(' ')
        fs.writeFileSync(`./koa/static/database/article/${filename}.json`, JSON.stringify( data ), 'utf-8');

        console.log('数据写入完成')

        // this.body = JSON.stringify( this.request.body )
        // 重定向
        // this.response.redirect('/#/')
        getList()
        this.body = JSON.stringify({status:{code:1001, msg: '发布成功'}, result: data })
    })
    .get('/article/del', function *(){
        var id = this.request.query.id
        fs.unlinkSync(`./koa/static/database/article/${id}.json`)
        getList()
        this.body = JSON.stringify({status:{code:1001, msg:'删除成功'}, result:{}})
    })
    .post('/upload', function *(){
        // 对于koa来说
        let req = this.req

        let data = ''
        let urlArr = yield new Promise(res => {
            let urlArr = []
            req.setEncoding('binary')
            req.on('data', (chunck)=>{
                data += chunck
                // data.push(chunck)
            })

            req.on('end', ()=>{
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

                arr.forEach(item => {
                    let line1_arr = item.match(/Content-Disposition[^\n]+/)
                    let line1_str = line1_arr ? line1_arr[0] : ''
                    let line2_arr = item.match(/Content-Type[^\n]+/)
                    let line2_str = line2_arr ? line2_arr[0] : ''

                    line1_str && (item = item.replace(line1_str, ''))
                    line2_str && (item = item.replace(line2_str, ''))


                    let obj = {content: item}
                    line1_str && line1_str.split(';').forEach(item => {
                        let arr = item.split(/=|:/)
                        if(arr.length != 2) return

                        let [key, value] = arr.map(item => item.trim())
                        if(key != 'Content-Disposition') value = value.slice(1, -1)
                        obj[key] = value
                    })
                    line2_str && line2_str.split(';').forEach(item => {
                        let arr = item.split(/=|:/)
                        if(arr.length != 2) return

                        let [key, value] = arr.map(item => item.trim())
                        if(key != 'Content-Disposition' && value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1)
                        obj[key] = value
                    })

                    if(obj['Content-Type']){
                        let ext = obj['Content-Type'].split('/')[1]
                        // ie post的数据竟然没有filename，卧槽
                        obj.filename = obj.filename || obj.name
                        obj.filename += new Date().getTime() + '.' + ext
                        fs.writeFileSync(`./koa/static/img/${obj.filename}`, obj.content.trim(), 'binary' );
                        urlArr.push(`/img/${obj.filename}`)
                    }
                    console.log('看看最终数据： ========================》', obj);
                })
                res(urlArr)

            })
        })


        this.body = JSON.stringify({url: urlArr})
    })
    .get('/*', function *(){
        console.log('执行到这里了？');
        const tpl = pug.render(jadeTpl,{ loadfile: loadfile})
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
