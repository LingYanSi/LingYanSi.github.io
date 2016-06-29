
'use strict'
var fs = require('fs')
var util = require('util')
var _ = require('lodash')
var pug = require('pug')

var jadeTpl = fs.readFileSync( './koa/jade/index.jade', 'utf8' )
var getList = require('./../../blog_list.js')
var fileRouter = require('./../../router_config.js')

Object.keys(fileRouter).map(item=>{
    fileRouter[item] = item
})

module.exports = function (router, koaBody){
    router.get('/', function *(){
        const tpl = pug.render(jadeTpl,{MIN: '', router: fileRouter})
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
