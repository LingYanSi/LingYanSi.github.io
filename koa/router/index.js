
'use strict' ;
var fs = require('fs')
var path = require('path')
var util = require('util')

var rt = require('koa-router')
var ejs = require('ejs')
var md5 = require('blueimp-md5')
var formidable = require('formidable')
var upload = require('../md/upload.js')


var home = fs.readFileSync('./template/home.ejs').toString();

// 读取fileMap 即模板中的资源文件路径 与真实路径的映射
var fileMap = JSON.parse( fs.readFileSync('./fileMap.json').toString() );
//
function render(that, data){
    // 路径转换
    data.jsFile = fileMap['./static/'+data.jsFile].slice(9)
    that.body = ejs.render(home, data, ejsOption)
}

var ejsOption = {
    filename: true ,
    // delimiter: '$' , // <$ $>
};

// 版本号实现，根据文件内容生成md5
// 上线之后，触发钩子，文件名被修改，然后把此数据插入到指定文件中
var router = new rt()
router.get('/', function *(){
    this.body = 'what the fuck'
})
.get('/sex', function *(){
    var str = md5( fs.readFileSync('./template/home.ejs').toString() )
    this.body = str+'波多野结衣'
})
.del('/sex', function *(){
    this.body = JSON.stringify({
        msg: '爽了吧'
    })
})
.get('/sex/japan', function *(){
    let ejsData = {}
    ejsData.jsFile = 'js/home/a.js'
    ejsData.data = {
            nav: '亚洲有吗',
            body: '李小龙',
            foot: 'bt下载'
        }
    render(this,ejsData)
})
.get('/sex/taiwan', function *(){
    let ejsData = {}
    ejsData.jsFile = 'js/home/b.js'
    ejsData.data = {
            nav: '国产五码',
            body: '黄诚.avi',
            foot: '下载'
        }
    render(this,ejsData)
})
.post('/upload', function *(){
    console.log('数据进来了', new Date().toString() );

    var req = this.req
    var arr = []

    req.on('data', function(chunck){
        try { 
            arr.push(chunck)

        } catch (e) {

        }
    })

    req.on('end', ()=>{
        console.log('图片接收完毕---')
        var str = Buffer.concat( arr).toString('binary');
        var nima = str.split(/----[^\r]+\r\n/g)
        nima = nima.slice(1,-1)
        upload(nima)
        this.body = 'sss'
    })

})



module.exports = router ;
