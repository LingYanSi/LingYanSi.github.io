var pug = require('pug')
var fs = require('fs')
var tpl = fs.readFileSync('./koa/jade/index.jade')
var router = require('./router_config.js')

const loadfile = function(path){
    return router[path] || path
}

fs.writeFileSync('./index.html', pug.render(tpl, {router:loadfile }))
