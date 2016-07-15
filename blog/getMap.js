'use strict'
var fs = require('fs')

var dir = fs.readdirSync('./js')

// 获取文件名，然后去生成map app_sth.js
var obj = {}
var PRE = './js/'
dir.forEach(item=>{
    if(item.indexOf('_')>0){
        let fileType = item.slice(item.lastIndexOf('.'))
        let filename = item.split('_')[0]
        obj[PRE+filename+fileType] = PRE+item
    }else{
        obj[PRE+item] = PRE+item
    }
})

var str = `module.exports=${JSON.stringify(obj)}`
fs.writeFileSync('./router_config.js', str)
