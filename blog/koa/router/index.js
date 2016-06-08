
'use strict'
var fs = require('fs')
var util = require('util')
var _ = require('lodash')
var pug = require('pug')
var jadeTpl = fs.readFileSync( './koa/jade/index.jade', 'utf8' )
var getList = require('./../../blog_list.js')

module.exports = function (router, koaBody){
    router.get('/', function *(){
        const tpl = pug.render(jadeTpl)
        // console.log(tpl)
        this.body = tpl
    })
    .get('/about', function *(){
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
        fs.writeFileSync(`./koa/static/database/article/${filename}.json`, JSON.stringify( data ), 'utf-8');

        console.log('数据写入完成')

        // this.body = JSON.stringify( this.request.body )
        // 重定向
        // this.response.redirect('/#/')

        this.body = JSON.stringify({status:{code:1001, msg: '发布成功'}, result: data })
    })
    .get('/getList', function *(){
        this.body = getList()
    })
    .get('/article/del', function *(){
        var id = this.request.query.id
        fs.unlinkSync(`./koa/static/database/article/${id}.json`)
        this.body = JSON.stringify({status:{code:1001, msg:'删除成功'}, result:{}})
    })
}
